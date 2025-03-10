<template>
    <div>
        <Header ref="header" pageTitle="message.my_transactions" :hide_settings_icon="true"/>
        <div class="page-content" v-if="isLoggedIn">
            <Adsense
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div class="card card-style" v-if="payments.length>0" style="min-height: 500px;">
                <div class="content mt-3 mb-0">
                    <div class="list-group list-custom-small list-icon-0 check-visited" v-if="payments.length > 0" style="line-height: 15px;">
                        <div class="content">
                            <h5 style="font-weight: 900;color: #000;">{{$t('message.balance.history')}}</h5>
                            <div v-for="(p, i) in payments">
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==1" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark" style="">+<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/><br></a><i class="fa fa-long-arrow-down mt-n2" style="color: #8cc152;opacity: 1"></i>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-else-if="p.type==2" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount,$currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a><i class="fa fa-long-arrow-up mt-n2" style="color: red;opacity: 1"></i>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==3" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>

                                    <i18n-t keypath="message.balance.transfer_to_username" tag="span">
                                        <template #amount>
                                          <a class="color-blue-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                        </template>
                                        <template #username>
                                          <span>@{{p.meta.recipient}}</span>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==4" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <i18n-t keypath="message.balance.donate_from" tag="span">
                                        <template #amount>
                                          <a class="color-blue-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                        </template>
                                        <template #from>
                                          <span>{{p.origin==1?'Piketplace':'PiNetwork'}}</span>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==5" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>

                                    <i18n-t keypath="message.product_purchase_from" tag="span">
                                        <template #amount>
                                          <a class="color-blue-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                        </template>
                                        <template #from>
                                          <span>{{p.origin==1?'Piketplace':'PiNetwork'}}</span>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==6" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.payback_product_purchase', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==7" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.order_cancelled', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==8" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.shipping_pledge_amount_for', {for: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==9" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>

                                    <i18n-t keypath="message.balance.pi_network_fee" tag="span">
                                        <template #fee>
                                          <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                          <i class="fa fa-long-arrow-up mt-n2" style="opacity: 1;color: red;"></i>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==10" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>

                                    <i18n-t keypath="message.balance.transfer_fee" tag="span">
                                        <template #fee>
                                          <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, p.is_piket?'Piket':$currency)}} --><Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/></a>
                                          <i class="fa fa-long-arrow-up mt-n2" style="opacity: 1;color: red;"></i>
                                        </template>
                                    </i18n-t>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==11" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/></a>

                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.refund_pledging', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==12" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>

                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.sales_commission', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==13" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>

                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.shippings_commission', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==14" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>

                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.payment_deliver', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==15" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark font-600" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    <span>{{$t('message.shipping_fee')}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==16" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark font-600" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    
                                    <span v-if="p.line_order && p.line_order.product">{{$t('message.order_auto_cancelled', {product_name: p.line_order.product.libelle})}}</span>
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==17" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark me-1" style="">+<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount amount="32.686" class="font-600 tw-inline"/></a>

                                    <span>
                                        {{$t('message.pledging_cancellation')}}
                                    </span>
                                    <!-- <span>{{$t('message.cancel_pledging_amount', {amount: $functions.amount_format(p.amount, $currency})}}</span> -->
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==18" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-red-dark me-1" style="">-<!-- {{$functions.amount_format(p.amount, p.is_piket?'Piket':$currency)}} --><Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/></a>
                                    <span>
                                        {{$t('message.handling_fee')}}
                                    </span>
                                    <!-- <span>{{$t('message.cancel_pledging_amount', {amount: $functions.amount_format(p.amount, $currency})}}</span> -->
                                </div>
                                <div class="vcard-field line-height-l pb-1" v-if="p.type==19" style="background-color: #fff;padding-left: 5px;">
                                    <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                    <a class="color-green-dark me-1" style="">+<!-- {{$functions.amount_format(p.amount, p.is_piket?'Piket':$currency)}} -->
                                        <Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/>
                                    </a>
                                    <span>
                                        {{$t('message.handling_fee_cancellation')}}
                                    </span>
                                    <!-- <span>{{$t('message.cancel_pledging_amount', {amount: $functions.amount_format(p.amount, $currency})}}</span> -->
                                </div>
                            </div>
                            <div v-observe-visibility="handleScrolledToBottom">
                                <img v-if="isLoadingMore" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                                <div v-if="noMoreData" class="no_more_data" style="text-align: center;background-color: lightgray;color: #fff;">
                                    {{$t('message.no_more_transactions')}}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div v-else-if="!isLoading">
                        {{$t('message.no_transactions')}}
                    </div>
                    <div class="divider mb-0"></div>
                </div>
                
            </div>
            <div v-else-if="!isLoading">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        components: {
        },
        data: () => ({
            isLoadingMore: false,
            noMoreData: false,
            product: [],
            not_found: false,
            id: 0,
            //user: null,
            payments: [],
            current_page: 1,
            last_page: 2,
            data_pagination: null,
            isLoading: false,
        }),
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'maintenance_mode']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.isLoading = false
            if (this.isLoggedIn) {
                this.isLoading = true
                this.loadPayments();
            }
            this.$functions.scrollToTop()
        },
        methods: {
            ...mapActions(useStore, ['login']),
            async loadPayments() {
                this.isLoadingMore = true
                let user_id = this.user.id;
                let page = this.current_page;
                await axios.get('/payments', {params: {user_id,page}})
                .then(res => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.data_pagination = res.data.payments;
                    this.payments.push(...res.data.payments.data);
                    this.last_page = this.data_pagination.last_page;
                    console.log("res.data.payments");
                    console.log(res.data.payments);
                })
                .catch(err => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.not_found = true;
                })
            },
            handleScrolledToBottom(isVisible, entry){
                console.log('in handleScrolledToBottom')
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                this.isLoadingMore = true
                if (this.current_page >= this.last_page) {
                    this.isLoadingMore = false
                    this.noMoreData = true
                    return;
                }

                this.current_page++
                //this.getProducts();
                this.loadPayments();
                //$('.loader').css('display', 'none');
            },
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                if (newVal) {
                    this.loadPayments();
                }
            }
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .no_more_data{
        /*display: none;*/
        margin: 10px;
        padding: 10px;
        text-align: center;
        color: #f0f0f0;
        background-color: #fff;
        border-radius: 10px;
    }
    .vcard-field i {
      top: 10px;
      opacity: 1;
    }
</style>