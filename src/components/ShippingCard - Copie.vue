<template>
    <div class="content" v-if="line_order" style="margin: 10px;">
        
        <div v-if="requestFrom=='my-store'">
            <a v-if="line_order.pre_order_user" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                <label>
                    <img :src="line_order.pre_order_user.avatar" class="tw-inline" style="width: 15px;height: 15px;border-radius: 50%;object-fit: cover;">&nbsp;{{line_order.pre_order_user.fullnameOrUsername}} <i class="fa fa-angle-right"></i></label>
            </a>
            <a style="text-align: right;width: 49%;display: inline-block;color: #000;">
                <em style="font-size: 11px;">{{$filters.formatDate(line_order.created_at, $i18n.locale)}}</em>
            </a>
        </div>
        <div v-if="requestFrom=='my-store'" class="divider mb-1"></div>
        <strong v-if="requestFrom=='shippings'" class="no-effect color-theme" :class="!in_apply_form?'break-word':''" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" style="display: block;">
            <i class="fas fa-map-marker-alt me-2 color-blue-dark" style="font-size: 18px;"></i><em>{{$t('message.from')}}</em> :
            {{$i18n.locale=='en'?line_order.product.country.name:line_order.product.country.translations[$i18n.locale]}}/{{line_order.product.city}}/{{line_order.product.address}}
            <i v-can="'validate_products'" v-if="line_order.product.user">{{line_order.product.user.phone_code+' '+line_order.product.user.phone_number}}</i>
        </strong>
        <strong v-if="line_order.is_pre_order" class="no-effect color-theme" :class="!in_apply_form?'break-word':''" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
            <i class="fas fa-map-marker-alt color-red-dark me-2" style="font-size: 18px;"></i><em>{{$t('message.to')}}</em> :
            {{$i18n.locale=='en'?line_order.preOrderCountry.name:line_order.preOrderCountry.translations[$i18n.locale]}}/{{line_order.pre_order_address.city}}/{{line_order.pre_order_address.address}}
            <i v-can="'validate_products'" v-if="line_order.pre_order_user">{{line_order.pre_order_user.phone_code+' '+line_order.pre_order_user.phone_number}}</i>
        </strong>
        <strong v-else class="no-effect color-theme" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false">
            <i class="fas fa-map-marker-alt color-red-dark me-2" style="font-size: 18px;"></i><em>{{$t('message.to')}}</em> :
            <span v-if="line_order.order.noshipping==1"></span>
            {{line_order.order.noshipping==1?'----------':line_order.order.shipping.country_name+'/'+line_order.order.shipping.city+'/'+line_order.order.shipping.address}}
            <i v-can="'validate_products'" v-if="line_order.order.user">{{line_order.order.user.phone_code+' '+line_order.order.user.phone_number}}</i>
        </strong>
        <div class="d-flex" style="margin-top: 0px;">
            <div>
                <img @click="$router.push({ name: 'product', params: { id: line_order.product.id } })" :src="line_order.product.imageFirst" class="rounded-sm" width="150">
            </div>
            <div class="w-100 ms-3 pt-0">
                <h6 class="font-500 font-14 pb-0">{{line_order.product.libelle}}</h6>
                <h5 class="font-700">
                    <!-- {{$currency}}{{ line_order.product.price_str.split(".")[0]}}.<sup>{{ line_order.product.price_str.split(".")[1]}}</sup> -->
                    <Amount :amount="line_order.product.price" class="color-yellow-piketplace tw-inline"/>
                    <span style="float: right;" class="mb-0 color-piketplace font-12">{{line_order.quantity}}x Item</span>
                </h5>
                <h5 v-if="line_order.is_pre_order" style="text-align: right;">
                    <!-- {{$t('message.total_display', {'amount': $functions.amount_format(line_order.product.price*line_order.quantity, $currency)})}} -->
                    <i18n-t keypath="message.total_display" tag="span" class="font-600 font-14 color-yellow-piketplace">
                        <template #amount>
                          <Amount :amount="line_order.product.price*line_order.quantity" class="font-600 font-14 color-yellow-piketplace tw-inline"/>
                        </template>
                    </i18n-t>
                </h5>
                <h5 v-else style="text-align: right;">
                    <!-- {{$t('message.total_display', {'amount': $functions.amount_format(line_order.total, $currency)})}} -->
                    <i18n-t keypath="message.total_display" tag="span" class="font-600 font-14 color-yellow-piketplace">
                        <template #amount>
                          <Amount :amount="line_order.total" class="font-600 font-14 color-yellow-piketplace tw-inline"/>
                        </template>
                    </i18n-t>
                </h5>
            </div>
        </div>
        <div v-if="line_order.is_pre_order && !in_apply_form">
            <div class="list-group list-custom-small" style="width: 100%;">
                <a class="external-link">
                    <span v-if="isLoggedIn && !isPreOrderOwner()">
                        <router-link :to="{ name: 'shipping_apply', params: { id: line_order.id } }" v-if="!hasAlreadyApplied()" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="float: right;">{{$t('message.apply')}}
                        </router-link>
                        <span v-else>{{$t('message.status.applied')}}
                        <i class="fas fa-minus color-gray-dark" style="font-size: 18px;"></i></span>
                        <span v-if="line_order.current_user_application && line_order.current_user_application.status=='selected'">{{$t('message.status.selected')}}
                        <i class="fas fa-check color-green-dark" style="font-size: 18px;"></i></span>
                        <span v-if="line_order.current_user_application && line_order.current_user_application.status=='rejected'">{{$t('message.status.not_selected')}}
                        <i class="fas fa-times color-red-dark" style="font-size: 18px;"></i></span>
                    </span>
                    <router-link v-else :to="{ name: 'shipping_apply', params: { id: line_order.id } }" class="btn btn-xxs mb-0 rounded-s font-900 shadow-s btn-dark-piketplace" style="float: right;">
                        {{$t('message.apply')}}
                    </router-link>
                    <!-- <a v-else @click="signInAndApply(line_order.id)" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="float: right;">{{$t('message.connect_and_apply')}}
                    </a> -->
                </a>
                <!-- <a class="external-link">
                <i class="fas font-14 fa-donate" style="color: darkviolet;"></i>
                <span>{{one.fee}} {{$currency}}</span>
                <span class="badge bg-highlight" style="text-transform: uppercase;">{{$t('message.shipping_cost_proposal')}}</span>
                <i class="fa fa-angle-right"></i>
                </a> -->
               
                <a class="external-link color-piketplace" v-if="user!=null && line_order.current_user_application">
                    <i18n-t keypath="message.nb_amount_for_time" tag="span" class="">
                        <template #amount>
                            <Amount :amount="line_order.current_user_application.fee" class="font-600 font-14 color-piketplace tw-inline"/>
                        </template>
                        <template #time>
                            {{line_order.current_user_application.time}}
                        </template>
                        <template #period>
                            {{$t('message.time.'+$delivery_period.get(line_order.current_user_application.period))}}
                        </template>
                    </i18n-t>
                </a>
                <a class="external-link color-piketplace" v-if="user!=null && line_order.application_selected && line_order.application_selected.pi_users_id==user.id">
                    <i class="fas font-14 fa-shipping-fast color-piketplace"></i>
                    <i v-if="line_order.application_selected && line_order.application_selected.confirmed_at" class="fas font-14 fa-check color-piketplace"></i>
                    <span v-else-if="line_order.application_selected && line_order.application_selected.confirmed_at==null" class="btn btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;" @click="shipping_confirmation(line_order.application_selected.id, i)">{{$t('message.confirmation_text')}}</span>
                    <span v-else-if="line_order.application_selected && line_order.application_selected.confirmed_at" class="" style="cursor: pointer;padding: 7px;font-size: 12px; font-weight: 100;">| Confirmed at {{$filters.formatDate(line_order.application_selected.confirmed_at, $i18n.locale)}}
                        <span v-if="line_order.is_pre_order===true" class="badge btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;margin-top: 4px!important" @click="pledging_cancellation(line_order.application_selected, i)">
                            {{$t('message.cancel_pledging')}}
                        </span>
                    </span>
                    <a  :href="piket_wallet_frontend_url" target="_blank" v-else-if="line_order.application_selected" class="btn btn-dark-piketplace" style="cursor: pointer;padding: 7px;font-size: 12px;">{{$t('message.balance.deposit')}}</a>
                </a>
            </div>
            <a class="external-link">
                <router-link :to="{'name': 'shipping_management', 'params': {'id': line_order.id}}" v-if="line_order.canStartShipping" class="color-blue-dark" style="cursor: pointer;padding: 7px;font-size: 12px;"><i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}}</router-link>
            </a>
            <p v-if="user!=null && line_order.application_selected && pi_balance<line_order.total" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 10px 0;">
                <i class="fas fa-info-circle" style="color: #000;"></i>
                <i18n-t keypath="message.not_enough_amount_piketplace_for_shipping" tag="span">
                    <template #amount>
                        <strong class="color-black" style='font-weight:600;'>
                            {{$functions.amount_format(line_order.total, $currency)}}
                        </strong>
                    </template>
                </i18n-t>
            </p>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios';

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    export default{
        props: {
            line_order: {
                type: Object,
                default () {
                    return null
                }
            },
            in_apply_form: {
                type: Boolean,
                default () {
                    return false
                }
            },
            isOwner: {
                type: Boolean,
                default () {
                    return false
                }
            },
            requestFrom: {
                type: String,
                default () {
                    return "shippings"
                }
            }
        },
        data: function () {
	        return {
	        	libelle: '',
                //user: null
	        }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'pi_balance', 'piket_wallet_frontend_url']),
        },
        mounted() {
        },
        methods: {
            isPreOrderOwner(){
                return this.user!==null && this.line_order.pre_order_user && this.line_order.pre_order_user.id==this.user.id
            },
            hasAlreadyApplied(){
                //console.log('hasAlreadyApplied', this.line_order.id, this.line_order.current_user_application)
                if (this.line_order.current_user_application==undefined) {
                    return false
                }
                return this.line_order.current_user_application !== null
            },
            pledging_cancellation(application, index){
                let res = this.shipping_application_update('cancel_pledging', application, index);
                console.log('pledging_cancellation', res)
            },
            shipping_confirmation(application, index){
                let res = this.shipping_application_update('shipping_confirmation', application, index);
                console.log('shipping_confirmation', res)
            },
            shipping_application_update(type, application, index){
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
                if (type=="cancel_pledging") {
                    msg = this.$t('message.cancel_pledging_amount',{'amount': this.$functions.amount_format(application.line_order.total, this.$currency)})
                    data = {cancel_pledging: true}
                }
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
                                }else{
                                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                                }
                                this.$forceUpdate()
                            })
                            .catch(error => {
                                this.saving = false
                                this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                            });
                        }
                      }
                    }
                )
            },
        },
        watch:{
            isLoggedIn(val, old){
                this.$forceUpdate()
            }
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .break-word{
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .break-word-shopname{
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .break-word-productname{
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .ribbon .card__containerrr{
      padding : 2rem;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 1rem;
    }
    .ribbon::before{
      position: absolute;
      content: '';
      background: orange;
      height: 14px;
      width: 18px;
      top: 22px;
      right: 0px;
      transform : rotate(45deg);
      z-index: -1;
    }
    .ribbon::after{
      position: absolute;
      content: v-bind(libelle);
      top: 11px;
      right: -2px;
      padding: 0;
      width: 63px;
      border-radius: 5px;
      font-size: 9px;
      height: 22px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: orange;
      color: #000;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      box-shadow: 4px 4px 15px rgba(26, 35, 126, 0.2);
    }
</style>