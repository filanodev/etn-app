<template>
    <div>
        <div class="page-content" v-if="isLoggedIn" style="margin-top: -10px;">
            <div class="card card-style" style="min-height: 500px;">
                <div class="mt-2" v-if="failed_payments.length>0">
                    <div class="content" style="background-color: lightgray;margin: 4px;padding: 10px 5px;border-radius: 5px;min-height: 400px;">
                        <!-- <h5 style="font-weight: 100;">{{$t('message.withdrawal.withdrawal_history')}}</h5> -->
                        <div v-for="(payment, index) in failed_payments">
                            <div class="vcard-field line-height-l pb-1" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(payment.created_at, $i18n.locale)}}</strong>
                                <a href="tel:+1 234 567 890">{{$functions.scientific_annotation_to_decimal(payment.amount, 7)}} {{$currency}} </a>&bull;<span>{{payment.typeLib}}</span>&bull;<span>{{payment.user.username}}</span> <i v-if="!payment.confirmed_at" @click="delete_paymental(payment.id)" class="fa fa-undo color-red-dark mt-n2" style="font-size: 22px;opacity: 1!important;right: 10px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!isLoading">
            <div style="width: 100%;text-align: center;">
                <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in')}}
                </button>
            </div>
        </div>
        <div v-if="isLoading">
            <div id="breathing" class="no_more_data">
                <h1 style="text-align: center;text-transform: uppercase;">{{$t('message.loading')}} ...</h1>
                <img src="/site_images/Piketplace.png" style="width: 50%;">
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
          failed_payments: [],
          /*data: {
            balance: 0,
            sales_not_approved: 0,
            shippings_not_approved: 0,
            withdrawal: 0,
          },*/
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['pageTitle', 'header_type', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'deleting', 'saving']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('mounting')
            this.pageTitle = 'Failed payments';
            this.header_type = "header_with_back_btn"
            //////////////////////////////////////////////
            //document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
            //this.$hide_modal.hide_modal('menu-share-thumbs');
            console.log('mounting A')
            $('.link').on('click', function() {
                if (!$(this).hasClass('active-nav')) {
                    $('.link').removeClass('active-nav')
                    $(this).addClass('active-nav')
                    $('#preloader').removeClass('preloader-hide')
                }
                //$('#preloader').removeClass('preloader-hide')
                //$('#preloader').addClass('preloader-hide')
            });
            this.isLoading = true
            this.error = ''
            this.getFailedPayments();
            $( document ).ready(function() {
                $('#preloader').addClass('preloader-hide')
                $('.link').removeClass('active-nav');
            });
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        watch: {
        },
        methods: {
            ...mapActions(useStore, ['login']),
            reload(){
                this.getFailedPayments();
            },
            async getFailedPayments() {
                let user_id = this.user.id;
                await axios.get('/failed-payments')
                .then(res => {
                    console.log('getBalance res')
                    this.isLoading = false
                    this.data = res.data;
                    this.failed_payments = res.data.failed_payments;
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            ask_withdrawal_confirmation(){
                let amount = this.form.amount.replace(',', '.')
                if (this.form.wallet_address == '' || this.form.amount == '') {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.donate.fill_all_fields"))
                    return 0;
                }
                if (!this.$functions.is_decimal_not_zero(amount)) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.type.price"))
                    return 0;
                }
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.balance.withdrawal_pi_network_fee',{fee: this.$functions.amount_format(0.01, this.$currency)})
                msg = '<br><img src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
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
                let amount = this.form.amount.replace(',', '.')
                if (this.form.wallet_address == '' || this.form.amount == '') {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.donate.fill_all_fields"))
                    return 0;
                }
                if (!this.$functions.is_decimal_not_zero(amount)) {
                    this.$functions.msg_box(this, 'error', '', this.$t("message.type.price"))
                    return 0;
                }
                /*this.$show_modal.show_modal({
                    id:'menu-warning-modal',
                    title:this.$t('message.publishForm.error'),
                    message:this.$t('message.balance.empty_balance'),
                    btn_text:this.$t('message.Ok'),
                });*/
                this.saving = true
                let wallet_address = this.form.wallet_address;
                let user_id = this.user.id;
                this.form.user_id = this.user.id;
                this.form.amount = amount;
                axios.post(`/withdrawal-request`, this.form)
                .then(res => {
                    console.log('withdraw', res.data)
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
                    }else if(res.data.message=="not_enough_amount_total"){
                        amount = this.$functions.amount_format(res.data.user.balance, this.$currency);
                        let total = this.$functions.amount_format(res.data.required_amount, this.$currency);
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.not_enough_balance_with_fee',{'amount': amount, 'total': total}))
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
            },
            delete_withdrawal(id){
                let img = '/site_images/confirm.PNG'
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
                                }
                            })
                            .catch(error => {
                                this.deleting = false
                                this.error = this.$t('message.an_error_occured')
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
