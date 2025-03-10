<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_shipping_applications" :hide_settings_icon="true"/>
        <div class="page-content">
            <p style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 0 20px 20px;">
                <i class="fas fa-info-circle" style="color: #000;"></i>
                {{$t('message.application_accept_message')}}
            </p>
            <div class="tab-controls" style="width: 80%;margin: auto;">
                <a class="no-effect" @click="activeAllTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.all')}}
                    <span v-if="all_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
                <a class="no-effect" @click="activeSelectedTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.selected_text')}}
                    <span v-if="selected_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
            </div>
            <div style="min-height: 300px;">
                <div v-if="shipping_applies.length > 0">
                    <div class="card card-style mb-2" v-for="(one, i) in shipping_applies" style="background-color: #fafafa;">
                        <div class="content" v-if="one.line_order!=null && one.line_order.preOrderCountry!=null">
                            <strong class="no-effect color-theme" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
                                <img class="tw:inline tw:w-[20px]" src="/site_images/svg/marker-blue.svg"><em>{{$t('message.from')}}</em> :
                                {{one.line_order.product.country.libelle}}/{{one.line_order.product.address}}
                            </strong><br/>
                            <strong class="no-effect color-theme" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
                                <img class="tw:inline tw:w-[20px]" src="/site_images/svg/marker-red.svg"><em>{{$t('message.to')}}</em> :
                                {{one.line_order.pre_order_address.country_name+' - '+one.line_order.pre_order_address.city}}/{{one.line_order.pre_order_address.address}}
                            </strong>
                            <div class="d-flex" style="margin-top: 10px;">
                                <div>
                                    <img :src="one.line_order.product.imageFirst" class="rounded-sm" width="100">
                                </div>
                                <div class="w-100 ms-3 pt-1">
                                    <h6 class="font-500 font-14 pb-2">{{one.line_order.product.libelle}}</h6>
                                    <h4 class="font-700" style="color: #f6bb42;"><!-- {{$currency}}{{ Math.floor(one.line_order.product.price)}}.<sup>{{(one.line_order.product.price % 1).toString().substring(2)}}</sup> -->
                                        <Amount :amount="one.line_order.product.price" class="color-yellow-piketplace tw:inline"/>
                                        <span style="float: right;" class="mb-0 color-gray font-12 color-piketplace">{{one.line_order.quantity}}x Item</span>
                                    </h4>
                                    <h5 class="font-600 font-14" style="text-align: right;">
                                        <!-- Total : {{$currency}}{{one.line_order.total}} -->
                                        <i18n-t keypath="message.total_display" tag="span" class="font-600 font-14 color-yellow-piketplace">
                                            <template #amount>
                                              <Amount :amount="one.line_order.total" class="font-600 font-14 color-yellow-piketplace tw:inline"/>
                                            </template>
                                        </i18n-t>
                                    </h5>
                                </div>
                            </div>
                            <div class="list-group list-custom-small" style="width: 100%;">
                                <a class="external-link">
                                    <span>
                                        <span v-if="one.status=='applied'">{{$t('message.status.applied')}}
                                        <i class="fas fa-minus color-gray-dark" style="font-size: 18px;"></i></span>
                                        <span v-if="one.status=='selected'">{{$t('message.status.selected')}}
                                        <i class="fas fa-check color-green-dark" style="font-size: 18px;"></i></span>
                                        <span v-if="one.status=='rejected'">{{$t('message.status.not_selected')}}
                                        <i class="fas fa-times color-red-dark" style="font-size: 18px;"></i></span>
                                    </span>
                                </a>
                                <!-- <a class="external-link">
                                <i class="fas font-14 fa-donate" style="color: darkviolet;"></i>
                                <span>{{one.fee}} {{$currency}}</span>
                                <span class="badge bg-highlight" style="text-transform: uppercase;">{{$t('message.shipping_cost_proposal')}}</span>
                                <i class="fa fa-angle-right"></i>
                                </a> -->
                               
                                <a class="external-link color-piketplace font-12" style="">
                                    <i class="fas font-11 fa-shipping-fast" style="margin-top: 5px;margin-right: 0;"></i>
                                    <!-- {{$t('message.nb_amount_for_time',{'amount':$functions.amount_format(one.fee, $currency), 'time': one.time, 'period': $t('message.time.'+$delivery_period.get(one.period))})}} -->
                                    <i18n-t keypath="message.nb_amount_for_time" tag="span" class="">
                                        <template #amount>
                                            <Amount :amount="one.fee" class="font-600 font-14 color-piketplace tw:inline"/>
                                        </template>
                                        <template #time>
                                            {{one.time}}
                                        </template>
                                        <template #period>
                                            {{$t('message.time.'+$delivery_period.get(one.period))}}
                                        </template>
                                    </i18n-t>
                                    <i v-if="one.status=='selected' && one.confirmed" class="fas font-14 fa-check color-green-dark"></i>
                                    <span v-else-if="one.status=='selected' && one.confirmed_at==null" class="badge btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;margin-top: 4px!important" @click="shipping_confirmation(one, i)">{{$t('message.confirm')}}</span>
                                    <span v-else-if="one.status=='selected' && one.confirmed_at" class="" style="cursor: pointer;padding: 7px;font-size: 12px; font-weight: 100;">| Confirmed at 
                                        {{$filters.formatDate(one.confirmed_at, $i18n.locale)}}
                                        <span v-if="one.line_order && one.line_order.is_pre_order===true" class="badge btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;margin-top: 4px!important" @click="pledging_cancellation(one, i)">
                                            {{$t('message.cancel')}}
                                        </span>
                                    </span>

                                    <!-- <router-link to="/balance" v-else-if="one.status=='selected'" class="badge btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;margin-top: 4px !important;">{{$t('message.balance.deposit')}}</router-link> -->
                                </a>
                            </div>
                            <a class="external-link">
                                <router-link :to="{'name': 'shipping_management', 'params': {'id': one.line_order.id}}" v-if="one.line_order.canStartShipping" class="color-blue-dark" style="cursor: pointer;padding: 7px;font-size: 12px;"><i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}}</router-link>
                                <router-link v-if="one.status=='selected' && one.confirmed_at && one.line_order.order && one.line_order.order.paid===true" :to="{ name: 'message', params: { corresponding_id: one.line_order.product.user.id, line_order_id: one.line_order.id } }" class="color-piketplace" style="cursor: pointer;padding: 7px;font-size: 7px;">
                                    <i class="fa fa-comments-o fa-2x"></i>
                                    <span class="font-12">{{$t('message.discuss_with_seller')}}</span>
                                </router-link>
                            </a>
                            <!-- <p v-if="one.status=='selected' && one.confirmed_at==null && user.balance<one.line_order.total" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 10px 0;">
                                <i class="fas fa-info-circle" style="color: #000;"></i>
                                <i18n-t keypath="message.not_enough_amount_piketplace_for_shipping" tag="span">
                                    <template #amount>
                                        <strong class="color-black">
                                            {{$functions.amount_format(one.line_order.total, $currency)}}
                                            <Amount :amount="one.line_order.total" class="font-600 font-14 color-black tw:inline"/>
                                        </strong>
                                    </template>
                                </i18n-t>
                            </p> -->
                        </div>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottom">
                    <img v-if="isLoading" src="/site_images/index_loader.gif" class="loader rounded-sm img-fluid m-auto" style="display: block;width: 70px;">
                    <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data() {
            return {
                shipping_applies: [],
                noMoreData: false,

                all_tab_active: true,
                selected_tab_active: false,

                current_page: 1,
                last_page: 0,
                data_pagination: null,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'saving', 'pi_balance', 'piket_balance']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted(){
            this.getMyApplications();
            //this.setConfDialog(this.$confirm)
            this.$functions.scrollToTop();
        },
        methods: {
            ...mapActions(useStore, ['setConfDialog', 'setBalance']),
            reload(){
                this.getMyApplications();
            },
            async getMyApplications(){
                let page = this.current_page;
                let selected = this.selected_tab_active
                let data = {params: {page}}
                if (this.selected_tab_active) {
                    data = {params: {page, selected}}
                }
                this.isLoading = true;
                await axios.get(`/get-applications-by-user`, data)
                .then(res => {
                    this.isLoading = false;
                    //this.shipping_applies = res.data.shipping_applies;
                    this.data_pagination = res.data.shipping_applies
                    this.shipping_applies.push(...res.data.shipping_applies.data)
                    this.last_page = this.data_pagination.last_page;
                    this.noMoreData = this.shipping_applies.length==0;
                    //console.log(this.cart);
                    console.log("getMyApplications", res.data);
                })
                .catch(error => {});
            },
            pledging_cancellation(application, index){
                let title = this.$t('message.confirmation.you_sure')
                let img = '/site_images/confirm.PNG'
                let btn = {
                    yes: this.$t('message.yes'),
                    //no: self.$t('message.no'),
                    no: this.$t('message.confirmation.no_cancel'),
                }
                let msg = this.$t('message.cancel_pledging_amount',{'amount': this.$functions.amount_format(application.line_order.total, this.$currency)})
                let data = {cancel_pledging: true}
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: title,
                      message: msg,
                      button: btn,
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            let res = this.shipping_application_update('cancel_pledging', application, index);
                            console.log('pledging_cancellation', res)
                        }
                      }
                    }
                )
            },
            shipping_confirmation(application, index){
                let id = application.id
                let title = this.$t('message.confirmation.you_sure')
                let img = '/site_images/confirm.PNG'
                let btn = {
                    yes: this.$t('message.yes'),
                    //no: self.$t('message.no'),
                    no: this.$t('message.confirmation.no_cancel'),
                }
                let msg = this.$t('message.shipping_pledging',{'amount': this.$functions.amount_format(application.line_order.total, this.$currency)})
                if (application.line_order.deliverIsSeller) {
                    title = this.$t('message.info')
                    msg = this.$t('message.confirmation.you_sure')
                }
                let data = {confirmed: true}
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: title,
                      message: msg,
                      button: btn,
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            this.pay_piketplace_call_set_pin_code(application, index)
                        }
                      }
                    }
                )
            },
            pay_piketplace_call_set_pin_code(application, index){
                this.$confirm({
                  auth: true,
                  message: this.$t('message.put_your_code_pin'),
                  button: {
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.confirmation.no_cancel')
                  },
                  /**
                   * Callback Function
                   * @param {Boolean} confirm
                   * @param {String} password
                   */
                  callback: (confirm, password) => {
                    if (confirm && password) {
                        let res = this.shipping_application_update('shipping_confirmation', application, index, password);
                        console.log('shipping_confirmation', res)
                    }
                  }
                })
            },
            shipping_application_update(type, application, index, code_pin=''){
                let id = application.id
                let data = {confirmed: true, code_pin:code_pin}
                if (type=="cancel_pledging") {
                    data = {cancel_pledging: true}
                }     
                this.saving = true
                data._method = "patch"
                axios.post(`/shipping_applies/${id}`, data)
                .then(res => {
                    this.saving = false
                    if (res.data.status === true) {
                        this.shipping_applies[index].confirmed_at= res.data.application.confirmed_at
                        /*this.shipping_applies[index] = res.data.application
                        let tmp = this.shipping_applies;
                        this.shipping_applies = []
                        this.shipping_applies = tmp*/
                        console.log("shipping_confirmation", res.data);
                        this.$functions.msg_box(this, 'success', '', this.$t('message.saved'))
                    }else if(res.data.message == "already_paid"){
                        this.$functions.msg_box(this, 'error', '', this.$t('message.impossible_pledging_cancellation_buyer_already_paid'))
                    }else if(res.data.message){
                        this.setBalance()
                        let amount = this.$functions.amount_format(this.pi_balance, this.$currency)
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, {'amount': amount, 'libelle': res.data.data?'"'+res.data.data.product.libelle+'"':'', 'quantity_left': res.data.data?res.data.data.product.quantity:''}))
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                    this.$forceUpdate()
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                });
            },
            activeAllTab(){
                this.all_tab_active = true
                this.selected_tab_active = false
                this.reinitPaginationParam()
                this.getMyApplications()
            },
            activeSelectedTab(){
                this.all_tab_active = false
                this.selected_tab_active = true
                this.reinitPaginationParam()
                this.getMyApplications()
            },
            reinitPaginationParam(){
                this.current_page = 1;
                this.last_page = 0;
                this.shipping_applies = []
            },
            handleScrolledToBottom(isVisible){
                
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                this.isLoading = true
                if (this.current_page>=this.last_page || this.last_page<=1) {
                    this.isLoading = false
                    this.noMoreData = true
                    return;
                }
                this.current_page++
                this.getMyApplications();
                //$('.loader').css('display', 'none');
            },
        }
    }
</script>

<style scoped>
</style>
