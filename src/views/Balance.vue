<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.balance" :hide_settings_icon="true"/>
        <div id="deposit" class="menu menu-box-bottom rounded-m" data-menu-height="150" data-menu-effect="menu-over" style="display: block; height: 200px;">
            <div class="menu-title">
                <h1 class="font-24">{{$t('message.balance.deposit')}}</h1>
                <a class="close-menu"><i class="fa fa-times-circle"></i></a>
            </div>
            <form class="content mt-0 mb-0">
                <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;">
                    <img src="/site_images/pi.png" style="width: 15px;height: 15px;border-radius: 50%;display: inline;">
                        <input type="text" inputmode="decimal" class="form-control" id="amount" :placeholder="$t('message.donate.amount')" v-model="form.amount" style="display: inline;width: 90%;padding-left: 10px;">
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                    <em>{{$currency}}</em>
                </div>
                <label id="invalid-value" class="color-red-dark font-11 font-500" style="display: none;">Invalid value</label>
                <button @click.prevent="deposit" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.cart.proceed')}}</button>
            </form>
        </div>
        <div id="transfer" class="menu menu-box-bottom rounded-m" data-menu-height="200" data-menu-effect="menu-over" style="display: block; height: 250px;">
            <div class="menu-title">
                <h1 class="font-20">{{$t('message.balance.transfer')}}</h1>
                <a class="close-menu"><i class="fa fa-times-circle"></i></a>
            </div>
            <form class="content mt-0 mb-0">
                <h5 v-if="transfer_fee_piket_activation===true" style="text-align: center;" class="color-piketplace">
                    {{$t('message.balance.transfer_fee_piket_or_pi_network', {amount_piket: $functions.amount_format(transfer_fee_piket, 'Piket'),amount_pi_network: $functions.amount_format(transfer_fee_pi_network, $currency)})}}
                </h5>
                <h5 v-else style="text-align: center;" class="color-piketplace">
                    {{$t('message.balance.transfer_fee_pi_network', {amount: $functions.amount_format(transfer_fee_pi_network, $currency)})}}
                </h5>
                <!-- <div v-if="transfer_fee_piket_activation===true" class="form-check icon-check" style="text-align: center;">
                    <input class="form-check-input" type="checkbox" id="allow_pi_fee_pay" value="yes" v-model="form.allow_pi_fee_pay">
                    <label class="form-check-label" for="allow_pi_fee_pay">
                        {{$t('message.balance.allow_pi_network_fee_pay', {currency: $currency})}}
                    </label>
                    <i class="icon-check-1 far fa-square color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-square font-16 color-piketplace"></i>
                </div> -->
                <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;">
                    <img src="/site_images/pi.png" style="width: 15px;height: 15px;border-radius: 50%;display: inline;">
                    <input type="text" inputmode="decimal" class="form-control" id="amount" :placeholder="$t('message.donate.amount')" v-model="form.amount" style="display: inline;width: 90%;padding-left: 10px;">
                    <input type="text" class="form-control" id="amount" :placeholder="''+$t('message.username')" v-model="form.username" style="display: inline;width: 100%;padding-left: 0px;">
                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                    <i class="fa fa-check disabled valid color-green-dark"></i>
                    <em style="margin-top: -37px;">{{$currency}}</em>
                </div>
                <label id="invalid-value" class="color-red-dark font-11 font-500" style="display: none;">Invalid value</label>
                <button @click.prevent="pre_transfer" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.cart.proceed')}}</button>
            </form>
        </div>
        <div class="page-content" style="margin-top: 64px;">
            <div class="card card-style" v-if="isLoggedIn && data">
                <div class="content">
                    <div style="text-align: center;">
                        <i class="fa fa-chart-line color-piketplace fa-3x" style=""></i>
                    </div>
                    <Adsense
                        data-ad-client="ca-pub-3962442438023665"
                        data-ad-slot="3809835226" data-full-width-responsive="true">
                    </Adsense>
                    <!-- <h1 class="text-center pt-4 font-30 mb-n1">{{$t('message.side_menu.balance')}}</h1> -->
                    <!-- <h1 class="font-40 text-center mt-4">
                        <sup class="price-sup font-14">{{$currency}}</sup>
                        {{ Math.floor(data.balance)}}{{$t('message.balance.decimal_separator')}}<sup>{{(data.balance % 1).toFixed(2).substring(2)}}</sup>
                    </h1> -->
                    <div class="row mt-2 mb-1">
                        <div class="col-6">
                            <h1 class="font-20 text-center mt-4">
                                <Amount :amount="user.balance" class="font-600 tw-inline"/>
                            </h1>
                        </div>
                        <div class="col-6">
                            <h3 class="font-16 text-center mt-4">
                                <Amount :amount="user.tokenTotal" type="piket" class="font-600 tw-inline"/>
                            </h3>
                        </div>
                    </div>
                    <div class="row mt-2 mb-1">
                        <div class="col-4">
                            <a @click="open_deposit_modal" data-menu="deposit" class="btn btn-full mb-1 text-uppercase font-700 shadow-s bg-green-light" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;"><i class="fa fa-long-arrow-down" style="margin: auto;"></i></a>
                            <div style="display: block;text-align: center;">{{$t('message.balance.deposit')}}</div>
                        </div>
                        <div class="col-4">
                            <router-link to="withdrawal" class="btn btn-full mb-1 text-uppercase font-700 shadow-s bg-red-light" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;"><i class="fa fa-long-arrow-up" style="margin: auto;"></i>
                            </router-link>
                            <div style="display: block;text-align: center;">{{$t('message.balance.withdrawal')}}</div>
                        </div>
                        <div class="col-4">
                            <router-link to="transfer" class="btn btn-full mb-1 text-uppercase font-700 shadow-s bg-blue-light" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;"><i class="fa fa-exchange" style="margin: auto;"></i>
                            </router-link>
                            <div style="display: block;text-align: center;">{{$t('message.balance.transfer')}}</div>
                        </div>
                        <!-- <div class="col-4">
                            <a @click="open_transfer_modal" class="btn btn-full mb-1 text-uppercase font-700 shadow-s bg-blue-light" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;"><i class="fa fa-exchange" style="margin: auto;"></i></a>
                            <div style="display: block;text-align: center;">{{$t('message.balance.transfer')}}</div>
                        </div> -->
                    </div>
                    <div class="content" style="background-color: lightgray;margin: 4px;padding: 10px 5px;border-radius: 5px;">
                        <h5 style="font-weight: 100;">{{$t('message.balance.history')}}</h5>
                        <div v-for="(p, i) in payments.filter((val,i) => i < 15)">
                            <div class="vcard-field line-height-l pb-1" v-if="p.type==1" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                <a class="color-green-dark" style="">+<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/><br></a><i class="fa fa-long-arrow-down" style="opacity: 1;color: #8cc152 !important;"></i>
                            </div>
                            <div class="vcard-field line-height-l pb-1" v-else-if="p.type==2" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount,$currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a><i class="fa fa-long-arrow-up mt-n2" style="opacity: 1;color: red;"></i>
                            </div>
                            <div class="vcard-field line-height-l pb-1" v-if="p.type==3" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>

                                <i18n-t :keypath="p.from_wallet && user.id==p.from_wallet.holder_pi_users_id?'message.balance.transfer_to_username':'message.balance.transfer_from_username'" tag="span">
                                    <template #amount>
                                      <a class="color-blue-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>
                                    </template>
                                    <template #username>
                                      <span v-if="p.from_wallet && user.id==p.from_wallet.holder_pi_users_id">@{{p.meta.recipient}}</span>
                                      <span v-else>@{{p.from_wallet.holder_pi_users_username}}</span>
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
                                      <a class="color-red-dark" style="">-<!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount"  class="font-600 tw-inline"/></a>
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
                                      <a class="color-red-dark" style='font-weight:600;'>-<!-- {{$functions.amount_format(p.amount, p.is_piket?'Piket':$currency)}} --><Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/></a>
                                      <i class="fa fa-long-arrow-up mt-n2" style="opacity: 1;color: red;"></i>
                                    </template>
                                </i18n-t>
                            </div>
                            <div class="vcard-field line-height-l pb-1" v-if="p.type==11" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(p.created_at, $i18n.locale)}}</strong>
                                <a class="color-green-dark" style=""><!-- {{$functions.amount_format(p.amount, $currency)}} --><Amount :amount="p.amount" class="font-600 tw-inline"/></a>

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
                                    <Amount :amount="p.amount" :type="p.is_piket?'piket':''" class="font-600 tw-inline"/></a>
                                <span>
                                    {{$t('message.handling_fee_cancellation')}}
                                </span>
                                <!-- <span>{{$t('message.cancel_pledging_amount', {amount: $functions.amount_format(p.amount, $currency})}}</span> -->
                            </div>
                        </div>

                    </div>
                    <div style="text-align: center;" v-if="payments.length>15">
                        <router-link to="/transactions" class="btn btn-3d btn-m mb-3 rounded-xl font-600 shadow-s btn-dark-piketplace-outline">
                            {{$t('message.balance.view_all')}}
                        </router-link>
                    </div>
                    <div class="divider mt-4"></div>
                </div>
                
            </div>
            <div v-else-if="!isLoggedIn && !isLoading">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { v4 as uuidv4 } from 'uuid';

    export default{
      /*components: {
          DropFile,
      },*/
      data: function () {
        return {
          //user: null,
          data: null,
          /*data: {
            balance: 0,
            sales_not_approved: 0,
            shippings_not_approved: 0,
            withdrawal: 0,
          },*/
          //isLoading: true,
          verifierPayment: null,
          form: {
            amount: '',
            username: '',
            allow_pi_fee_pay: false,
          },
          payments: [],
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'payment_from', 'saving', 'uniqueId', 'transfer_fee_pi_network', 'transfer_fee_piket', 'transfer_fee_piket_activation']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
      created () {
            //this.verifyIfPaymentDone();
            //window.addEventListener('scroll', this.handleScroll);
        },
        beforeUnmount () {
            this.setUniqueId('')
            this.clearPaymentVerifier()
        },
        mounted() {
            this.$hide_modal.hide_modal('menu-main');
            //////////////////////////////////////////////
            /*document.getElementById('menu-main').classList.remove('menu-active');
            document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');*/
            this.getBalance();
            //window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        watch: {
            uniqueId(newVal, oldVal){
                this.getBalance();
            },
            'form.amount': function (newVal, oldVal){

                 // Remove any non-numeric characters except the dot
                this.form.amount = this.form.amount.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.form.amount.match(/\./g);
                if (dots && dots.length > 1) {
                    this.form.amount = this.form.amount.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let amountTab = newVal.toString().split('.')
                if (amountTab[1] && amountTab[1].length>7) {
                    this.form.amount = oldVal
                }
            },
        },
        methods: {
            ...mapActions(useStore, ['login', 'setUniqueId', 'launchPaymentVerifier', 'piPayment', 'clearPaymentVerifier']),
            reload(){
                this.getBalance();
            },
            async getBalance() {
                this.isLoading = true
                let user_id = this.user.id;
                await axios.get('/balance', {params: {user_id}})
                .then(res => {
                    console.log('balance res.data', res.data);
                    this.isLoading = false
                    this.data = res.data;
                    this.payments = res.data.payments;
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            ask_withdrawal(){
                this.$functions.msg_box(this, 'error', 'Info', this.$t('message.balance.empty_balance'))
            },
            deposit(){
                this.verifyIfPaymentDone();
                let amount = this.form.amount;
                //alert(parseFloat(amount));
                amount = amount.replaceAll(',', '.');
                let amount_converted = parseFloat(amount);
                if (this.form.amount == '' || !this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'info', 'Info', this.$t("message.donate.fill_amount_field"))
                    return 0;
                }
                this.uniqueId = uuidv4();
                this.setUniqueId(this.uniqueId);
                let dataPay = {
                    userId: this.user.id,
                    uniqueId: this.uniqueId,
                    type: 1,//DEPOSIT
                    memo: this.$t('message.balance.memo_deposit_of_from',{amount:this.$functions.amount_format(amount_converted, this.$currency),
                        from: 'Piketplace'
                    }),
                    amount: amount_converted,
                };
                this.form.amount = "";
                this.$hide_modal.hide_modal('deposit');
                this.piPayment(dataPay);
            },
            pre_transfer(){
                let amount = this.form.amount;
                //alert(parseFloat(amount));
                //amount = amount.replaceAll(',', '.');
                let amount_converted = parseFloat(amount);
                if (this.form.amount == '' || this.form.username == '') {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t("message.donate.fill_all_fields"))
                    return 0;
                }
                if (!this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t("message.numeric_value_required_for_amount"))
                    return 0;
                }
                if (this.user.username===this.form.username) {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t("message.balance.cannot_transfer_to_yourself"))
                    return 0;
                }
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                          this.transfer()
                        }
                      }
                    }
                )
            },
            transfer(){
                let amount = this.form.amount
                let username = this.form.username
                let allow_pi_fee_pay = this.form.allow_pi_fee_pay
                //alert(allow_pi_fee_pay)
                let user_id = this.user.id
                this.saving = true
                axios.post(`/transfer`, {user_id:user_id, username:username, amount:amount, allow_pi_fee_pay:allow_pi_fee_pay})
                .then(res => {
                    this.saving = false
                    //this.order = res.data.order;
                    console.log("tr", res.data)
                    amount = this.$functions.amount_format(amount, this.$currency);
                    if (res.data.status) {
                        this.payments = res.data.payments
                        this.$functions.msg_box(this, 'success', 'Info', this.$t('message.balance.transfer_success',{'name':username, 'amount':amount}))
                        this.form.amount = ""
                        this.form.username = ""
                        this.$hide_modal.hide_modal('transfer')
                    }else if(res.data.message=="not_enough_amount"){
                        let balance_amount = this.$functions.amount_format(res.data.user.balance, this.$currency);
                        this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': balance_amount}))
                    }else if(res.data.message=="not_enough_amount_piket"){
                        let balance_amount = this.$functions.amount_format(res.data.user.token, 'Piket');
                        this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': balance_amount}))
                    }else if(res.data.message=="cannot_transfer_to_yourself"){
                        this.$functions.msg_box(this, 'error', 'Info', this.$t('message.balance.'+res.data.message))
                    }else{
                        this.$functions.msg_box(this, 'error', 'Info', this.$t('message.balance.user_not_exists',{'name': this.form.username}))
                    }
                })
                .catch(error => {
                    this.saving = false
                    console.log(error);
                    //this.$show_modal.show_modal('comment_sent');
                });
            },
            clear_invalid(){
                $('#invalid-value').css('display', 'none');
            },
            open_deposit_modal(){
                this.$show_modal.show_modal({id:'deposit'});
            },
            open_transfer_modal(){
                this.$show_modal.show_modal({id:'transfer'});
            },
            verifyIfPaymentDone () {
                this.payment_from = "balance";
                let uniqueId = this.uniqueId;
                let data = {
                    uniqueId:this.uniqueId,
                    self:this,
                }
                this.launchPaymentVerifier(data)
            },
            handleScroll (event) {
              // Any code to be executed when the window is scrolled
              alert("handleScroll")
            }
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    #dropzone{
        border-radius: 10px;
        border-width: 1px;
    }


    .error-message {
      display: none;
      color: red;
    }

    /* ✨ The magic ✨ */
    form.errors {
      :invalid {
        border-color: red;
      }
      .error-message {
        display: block;
      }
    }
</style>
