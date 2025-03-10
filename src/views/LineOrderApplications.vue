<template>
    <div>
        <Header ref="header" pageTitle="message.shipping_applying_form.text" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: -10px;">
            <div id="menu-option-selection-modal" class="menu menu-box-modal rounded-m" data-menu-height="300" data-menu-width="350" style="display: block; width: 350px; height: 300px;">
                <h1 class="text-center mt-4">
                    <i class="fa fa-3x fa-info-circle scale-box color-blue-dark shadow-xl rounded-circle"></i>
                </h1>
                <h3 class="text-center mt-3 font-700">{{$t('message.confirmation.you_sure')}}</h3>
                <!-- <p class="boxed-text-xl opacity-70">
                    You can continue with your previous actions.<br> Easy to attach these to success calls.
                </p> -->
                <div class="row mb-0 me-3 ms-3">
                    <div class="col-6">
                        <a @click="$hide_modal.hide_modal('menu-option-selection-modal');" class="btn close-menu btn-full btn-m color-red-dark border-red-dark font-600 rounded-s">{{$t('message.confirmation.no_cancel')}}</a>
                    </div>
                    <div class="col-6">
                        <a @click="selection();" class="btn close-menu btn-full btn-m color-green-dark border-green-dark font-600 rounded-s">{{$t('message.confirmation.yes_continue')}}</a>
                    </div>
                </div>
            </div>
            <div class="card card-style mb-2" style="background-color: #fafafa;" v-if="line_order!=null">
                <ShippingCard :line_order="line_order" :in_apply_form="true" />
            </div>
            <div class="card card-style" v-if="shipping_applies.length>0">
                <div class="content tw:leading-5">
                    <h4 v-if="data_pagination.total>0">{{$t('message.nb_application_found', {'nb': data_pagination.total})}}</h4>
                    <h4 v-if="data_pagination.total==0">{{$t('message.no_application_found')}}</h4>
                    <p v-if="data_pagination.total>0">{{$t('message.applications_review_message')}}</p>
                    <div class="d-flex visited-link" v-for="application in shipping_applies" style="border-top: 1px solid #f0f0f0;padding-top: 10px;padding-bottom: 10px;">
                        <div class="w-35 border-right border-highlight" style="text-align: center;">
                            <!-- <img src="/delivery.png" class="bg-highlight rounded-circle" width="40"> -->
                            <img :src="application.user.avatar" class="rounded-circle" style="width: 50px;height: 50px;border-radius: 50%;object-fit: cover;">
                            <!-- <h6 class="font-14 font-600 mt-2 text-center">@Username</h6> -->
                            <!-- <p class="color-blue-dark mt-n3 font-9 font-400 text-center mb-0 pt-1">Pioneer</p> -->
                        </div>
                        <div class="w-65 ps-3">
                            <h5 style="font-size: 15px;margin-bottom: 0;">@{{application.user.username}}</h5>
                            <p class="color-piketplace font-12 pt-1 mb-3" style="line-height: 20px;margin-top: 0;padding-top: 0;margin-bottom: 0!important;"><!-- Proposition :  -->{{$t('message.nb_amount_for_time',{'amount':$functions.amount_format(application.fee, $currency), 'time': application.time, 'period': $t('message.time.'+$delivery_period.get(application.period))})}}
                                <br/>
                                <span class=" font-10" style="color: #adb5bd!important;">
                                    {{$t('message.applied_on',{'date': $filters.formatDate(application.created_at)})}}
                                </span>
                            </p>
                            <span v-if="!line_order.hasDeliver || application.status!='selected'" @click="display_confirmation(application.id)" class="btn badge font-12 btn-dark-piketplace">{{$t('message.select')}}</span>
                            <span v-if="line_order.deliver_pi_users_id==application.user.id">{{$t('message.selected_text')}} <i class="fa fa-check-circle color-piketplace"></i></span>
                            <span v-if="application.confirmed_at"> | {{$t('message.confirmed_at',{'date': $filters.formatDate(application.confirmed_at, $i18n.locale)})}} <i class="fa fa-check-circle color-piketplace"></i></span>
                            <span v-else-if="application.status=='selected'"> | {{$t('message.not_yet_confirmed')}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import ShippingCard from '../components/ShippingCard.vue'
    export default{
        components: {
            ShippingCard
        },
        data() {
            return {
                line_order: null,
                shipping_applies: [],
                id: 0,
                selectedApplicationId: 0,

                current_page: 0,
                last_page: 1,
                data_pagination: {total: 0},
                isLoading: false,
            };
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'prevRoute', 'error', 'connecting', 'saving']),
        },
        mounted(){
            this.id = this.$route.params.id;
            this.getApplications();
        },
        methods: {
            async getApplications(){
                let lineId = this.id;
                this.isLoading = true
                let page = 1
                await axios.get(`/get-applications-by-lineOrder`, {params: {lineId, page}})
                .then(res => {
                    this.isLoading = false
                    this.data_pagination = res.data.shipping_applies;
                    this.shipping_applies.push(...res.data.shipping_applies.data);
                    this.line_order = res.data.line_order;
                    this.last_page = this.data_pagination.last_page;
                    //console.log(this.cart);
                    console.log('this.line_order appli', res.data.shipping_applies, this.shipping_applies, lineId);
                })
                .catch(error => {
                    this.isLoading = false
                    console.log(error)
                });
            },
            display_confirmation(id){
                this.selectedApplicationId = id;

                let img = '/site_images/confirm.PNG'
                let btn = {
                    yes: this.$t('message.yes'),
                    no: this.$t('message.confirmation.no_cancel'),
                }
                let title = this.$t('message.info')
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: title,
                      message: msg,
                      button: btn,
                      html: true
                        ,
                        /**
                        * Callback Function
                        * @param {Boolean} confirm
                        */
                        callback: confirm => {
                          if (confirm) {
                            this.selection()
                          }
                        }
                    }
                )
                /*document.getElementById('menu-option-selection-modal').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');*/
            },
            selection() {
                this.saving = true
                let applicationId = this.selectedApplicationId;
                let lineId = this.line_order.id;
                let res = axios.post(`/line-order/application/select`, {lineId:lineId, applicationId:applicationId})
                    .then(res => {
                        this.saving = false
                        this.line_order = res.data.line_order
                        console.log(res.data.status);
                        this.$hide_modal.hide_modal('menu-option-selection-modal');
                        if (res.data.status) {
                            /*this.$show_modal.show_modal({
                                id:'menu-success-modal',
                                title:this.$t('message.saved'),
                                message:this.$t('message.selected'),
                                btn_text:this.$t('message.Ok'),
                            });*/
                            this.$functions.msg_box(this, 'success', '', this.$t('message.selected'))
                            this.shipping_applies = []
                            this.getApplications();
                        }else{
                            this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                        }
                        //location.reload();
                    })
                    .catch(error => {
                        this.saving = false
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    });
            }
        }
    }
</script>