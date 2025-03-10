<template>
    <div>
        <Header ref="header" pageTitle="message.withdrawal.title" :hide_settings_icon="true"/>
        <div class="page-content" v-if="isLoggedIn" style="margin-top: -10px;">
            <div class="card card-style" v-if="data" style="min-height: 500px;">
                <p v-show="user.hasOnePendingWithdrawal" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 10px 10px 0 10px;">
                    <i class="fas fa-info-circle" style="color: #000;"></i>
                    {{$t('message.withdrawal.you_have_pending_withdrawal')}} 
                </p>
                <form class="content mt-0 mb-0" v-show="!user.hasOnePendingWithdrawal">
                    <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;color: #bdb6b6 !important">
                        {{$t('message.donate.amount')}}<br>
                        <img src="/site_images/pi.png" style="width: 15px;height: 15px;border-radius: 50%;display: inline;">
                        <input type="text" inputmode="decimal" class="form-control" id="amount" :placeholder="$t('message.withdrawal.amount_placeholder')" v-model="form.amount" style="display: inline;width: 95%;padding-left: 10px;"><br><br>
                        {{$t('message.withdrawal.wallet_address')}}
                        <input type="text" class="form-control" id="wallet_address" :placeholder="$t('message.withdrawal.wallet_address')" v-model="form.wallet_address" style="display: inline;width: 100%;padding-left: 0px;">
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <em style="margin-top: -47px;">{{$currency}}</em>
                    </div>
                    <label id="invalid-value" class="color-red-dark font-11 font-500" style="display: none;">Invalid value</label>
                    <label :dir="locale=='ar'?'rtl':'ltr'" class="color-red-dark font-14 font-600" style="line-height: 16px;margin: 5px auto">{{$t('message.balance.withdrawal_ensure_correct_mainnet_address', {project_type: project_type})}}</label>
                    <label :dir="locale=='ar'?'rtl':'ltr'" class="color-red-dark font-14 font-600" style="line-height: 16px;margin: 5px auto">{{$t('message.balance.never_put_passprase')}}</label>
                    <button @click.prevent="ask_withdrawal_confirmation" :disabled="user.hasOnePendingWithdrawal" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.balance.ask_withdrawal')}}</button>
                </form>
                <div class="mt-2" v-if="withdrawal_requests.length>0">
                    <div class="content" style="background-color: lightgray;margin: 4px;padding: 10px 5px;border-radius: 5px;min-height: 400px;">
                        <h5 style="font-weight: 100;">{{$t('message.withdrawal.withdrawal_history')}}</h5>
                        <div v-if="last_cancelled_withdraw" class="vcard-field line-height-l pb-1" style="background-color: #fff;padding-left: 5px;">
                            <strong>
                                {{$filters.formatDate(last_cancelled_withdraw.created_at, $i18n.locale)}}
                            </strong>
                            <a>{{last_cancelled_withdraw.amount}} {{$currency}}</a>&bull;
                            <span v-if="last_cancelled_withdraw.cancelled_at" class="color-red-dark">
                                {{$t('message.canceled_on', {'date': $filters.formatDate(last_cancelled_withdraw.cancelled_at, $i18n.locale)})}}
                            </span>
                            <ul v-if="last_cancelled_withdraw.cancelled_at" class="tw-text-center">
                                <li style="list-style: circle inside;line-height: 16px;" v-for="reason in last_cancelled_withdraw.cancellation_reason" class="color-gray-dark">
                                    {{withdrawal_reasons[$i18n.locale][withdrawal_reasons[$i18n.locale].findIndex((x) => x.code === reason)].text}}
                                </li>
                            </ul>
                        </div>
                        <div v-for="(withdraw, index) in withdrawal_requests">
                            <div class="vcard-field line-height-l pb-1" style="background-color: #fff;padding-left: 5px;">
                                <strong>
                                    {{$filters.formatDate(withdraw.created_at, $i18n.locale)}}
                                </strong>
                                <a>{{withdraw.amount}} {{$currency}}</a>&bull;
                                <span v-if="withdraw.confirmed_at" class="color-green-dark">
                                    {{$t('message.confirmed_at', {'date': $filters.formatDate(withdraw.confirmed_at, $i18n.locale)})}}
                                </span>
                                <span v-else> {{$t('message.status.pending')}}</span>
                                <span v-if="withdraw.cancelled_at" class="color-green-dark">
                                    {{$t('message.cancelled_at', {'date': $filters.formatDate(withdraw.confirmed_at, $i18n.locale)})}}
                                </span>
                                <span v-if="withdraw.cancelled_at" class="color-green-dark">
                                    {{$t('message.'+withdraw.cancellation_reason)}}
                                </span>
                                <i v-if="!withdraw.confirmed_at" @click="delete_withdrawal(withdraw.id)" class="fa fa-trash-o color-red-dark mt-n2" style="font-size: 22px;opacity: 1!important;right: 10px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="!isLoading && !isLoggedIn">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
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
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{

      data: function () {
        return {
          //user: null,
          data: null,
          withdrawal_requests: [],
          withdrawal_reasons: [],
          /*data: {
            balance: 0,
            sales_not_approved: 0,
            shippings_not_approved: 0,
            withdrawal: 0,
          },*/
          form: {
            amount: '',
            wallet_address: '',
          },
          isLoading: false,
          last_cancelled_withdraw: null,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['project_type', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'deleting', 'saving']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('mounting')
            this.form.wallet_address = this.user.public_key;
            //////////////////////////////////////////////
            //document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
            //this.$hide_modal.hide_modal('menu-share-thumbs');
            console.log('mounting A')
            this.isLoading = true
            this.error = ''
            this.getBalance();
            this.$functions.scrollToTop();
        },
        watch: {
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
            ...mapActions(useStore, ['login']),
            reload(){
                this.getBalance();
            },
            async getBalance() {
                let user_id = this.user.id;
                await axios.get('/balance', {params: {user_id}})
                .then(res => {
                    console.log('getBalance res', res.data.last_cancelled_withdraw)
                    this.isLoading = false
                    this.data = res.data;
                    this.withdrawal_requests = res.data.withdrawal_requests;
                    this.withdrawal_reasons = res.data.withdrawal_reasons;
                    this.last_cancelled_withdraw = res.data.last_cancelled_withdraw;
                    this.project_type = res.data.project_type
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            /*ask_withdrawal(){
                let amount = this.form.amount.replace(',', '.')
                if (this.form.wallet_address == '' || this.form.amount == '') {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.donate.fill_all_fields"))
                    return 0;
                }
                if (!this.$functions.is_decimal_not_zero(amount)) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.type.price"))
                    return 0;
                }
                this.saving = true
                let wallet_address = this.form.wallet_address;
                let user_id = this.user.id;
                this.form.user_id = this.user.id;
                this.form.amount = amount;
                axios.post(`/withdrawal-request`, this.form)
                .then(res => {
                    this.saving = false
                    //this.order = res.data.order;
                    if (res.data.status) {
                        amount = this.$functions.amount_format(amount, this.$currency);
                        this.withdrawal_requests = res.data.withdrawal_requests
                        //this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.ask_withdrawal_success',{'amount':amount}))
                        this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.ask_withdrawal_success'))
                        this.form.amount = ""
                        this.form.username = ""
                        this.$hide_modal.hide_modal('transfer')
                    }else if(res.data.message=="not_enough_amount"){
                        amount = this.$functions.amount_format(res.data.user.balance, this.$currency);
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.not_enough_amount',{'amount': amount}))
                    }else{
                        //this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.balance.user_not_exists',{'name': username}))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.error = this.$t('message.an_error_occured')
                    console.log(error);
                    //this.$show_modal.show_modal('comment_sent');
                });
            },*/
            ask_withdrawal_confirmation(){
                //let amount = this.form.amount.replace(',', '.')
                let amount = this.form.amount
                this.form.amount = this.form.amount.toString().replace(',', '.');
                if (this.form.amount == '' || this.form.amount == null) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.donate.fill_amount_field"))
                    return 0;
                }
                if (this.form.wallet_address == '' || this.form.wallet_address == null) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.withdrawal.wallet_address_required"))
                    return 0;
                }
                if (!this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.type.price"))
                    return 0;
                }
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.balance.withdrawal_pi_network_fee',{fee: this.$functions.amount_format(0.01, this.$currency)})
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.confirmation.no_cancel'),
                        yes: this.$t('message.confirmation.yes_i_agree')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            this.ask_withdrawal()
                        }
                      }
                    }
                )
            },
            ask_withdrawal(){
                this.saving = true
                let wallet_address = this.form.wallet_address;
                let user_id = this.user.id;
                this.form.user_id = this.user.id;
                axios.post(`/withdrawal-request`, this.form)
                .then(res => {
                    console.log('withdraw', res.data)
                    this.saving = false
                    let amount = 0.0
                    //this.order = res.data.order;
                    if (res.data.status === true) {
                        amount = this.$functions.amount_format(amount, this.$currency);
                        this.withdrawal_requests = res.data.withdrawal_requests
                        this.last_cancelled_withdraw = res.data.last_cancelled_withdraw
                        //this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.ask_withdrawal_success',{'amount':amount}))
                        this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.ask_withdrawal_success'))
                        this.form.amount = ""
                        this.form.username = ""
                        this.$hide_modal.hide_modal('transfer')
                    }else if(res.data.message=="not_enough_amount"){
                        amount = this.$functions.amount_format(res.data.user.balance, this.$currency);
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.not_enough_amount',{'amount': amount}))
                    }else if(res.data.message.amount && res.data.message.amount.includes("amount_required")){
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.fill_amount_field'))
                    }else if(res.data.message.wallet_address && res.data.message.wallet_address.includes("wallet_address_required")){
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.withdrawal.wallet_address_required'))
                    }else if(res.data.message=="not_enough_amount_total"){
                        amount = this.$functions.amount_format(res.data.user.balance, this.$currency);
                        let total = this.$functions.amount_format(res.data.required_amount, this.$currency);
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.not_enough_balance_with_fee',{'amount': amount, 'total': total}))
                    }else{
                        //this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.balance.user_not_exists',{'name': username}))
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.error = this.$t('message.an_error_occured')
                    console.log(error);
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    //this.$show_modal.show_modal('comment_sent');
                });
            },
            delete_withdrawal(id){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
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
                            this.deleting = true
                            axios.post(`/withdrawal-request-delete`, {id:id, user_id: this.user.id})
                            .then(res => {
                                this.deleting = false
                                //this.order = res.data.order;
                                console.log(res.data);
                                if (res.data.status) {
                                    this.withdrawal_requests = res.data.withdrawal_requests
                                    this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.withdrawal_request_delete'))
                                    this.form.amount = ""
                                    this.form.username = ""
                                    this.$hide_modal.hide_modal('transfer')
                                }else{
                                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                                }
                            })
                            .catch(error => {
                                this.deleting = false
                                this.error = this.$t('message.an_error_occured')
                                this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                                console.log(error);
                            });
                        }
                      }
                    }
                )
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
                this.verifierPayment = setInterval(() => {
                    let uniqueId = this.uniqueId;
                    if (uniqueId == '' || uniqueId == null) {
                        return 0;
                    }
                    let userId = this.user.id;
                    axios.get(`/payment-verifier`, {params: {uniqueId, userId}})
                    .then(res => {
                        //this.order = res.data.order;
                        console.log("verifier", res.data.payment);
                        if (res.data.payment != null) {
                            this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.balance.deposit_success',{'amount': res.data.payment.amount}))
                            this.uniqueId = "";
                            //clearInterval(this.verifierPayment);//Break the setInterval
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        //this.$show_modal.show_modal('comment_sent');
                    });
                }, 3000)
            },
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
