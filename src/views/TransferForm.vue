<template>
    <div>
        <Header ref="header" :pageTitle="pageTitle" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: 64px;">
            <div class="card card-style" v-if="isLoggedIn">
                <div class="content">
                    <div class="content">
                        <form class="content mt-0 mb-0">
                            <h5 v-if="transfer_fee_piket_activation===true" style="text-align: center;" class="color-piketplace">
                                {{$t('message.balance.transfer_fee_piket_or_pi_network', {amount_piket: $functions.amount_format(transfer_fee_piket, 'Piket'),amount_pi_network: $functions.amount_format(transfer_fee_pi_network, $currency)})}}
                            </h5>
                            <h5 v-else style="text-align: center;" class="color-piketplace">
                                {{$t('message.balance.transfer_fee_pi_network', {amount: $functions.amount_format(transfer_fee_pi_network, $currency)})}}
                            </h5>
                            <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;">
                                <img src="/site_images/pi.png" style="width: 15px;height: 15px;border-radius: 50%;display: inline;">
                                <input type="text" inputmode="decimal" class="form-control" id="amount" :placeholder="$t('message.donate.amount')" v-model="form.amount" style="display: inline;width: 90%;padding-left: 10px;">
                                <i class="fa fa-times disabled invalid color-red-dark"></i>
                                <i class="fa fa-check disabled valid color-green-dark"></i>
                                <em style="margin-top: -37px;">{{$currency}}</em>
                            </div>
                            <label id="invalid-value" class="color-red-dark font-11 font-500" style="display: none;">Invalid value</label>
                            <button @click.prevent="pre_transfer" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.cart.proceed')}}</button>
                        </form>
                    </div>
                </div>
            </div>
            <div v-else>
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
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
          form: {
            amount: '',
            username: '',
            allow_pi_fee_pay: false,
          },
          payments: [],
          isLoading: false,
          pageTitle: "",
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
        mounted() {
            this.$hide_modal.hide_modal('menu-main');
            
            this.pageTitle = '@'+this.$route.params.username
            this.form.username = this.$route.params.username;
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
                        this.user = res.data.user
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
