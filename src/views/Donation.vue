<template>
    <div>
        <Header ref="header" pageTitle="message.donate.donation" :hide_settings_icon="true"/>
        <PayWith @payPiketplace="pay_piketplace_call_set_pin_code" @payPinetwork="pay_pi_network_wallet" />
        <div class="page-content" style="margin-top: 64px">
            <div class="card card-style" style="min-height: 400px;" v-if="isLoggedIn">
                <form class="content mt-0 mb-0">
                    <!-- <div style="text-align: center;" class="mt-2 mb-2">
                        <img src="Piketplace.png" style="width: 50px;height: 50px;border-radius: 50%;text-align: center;margin: auto;">
                    </div> -->
                    <h1 class="" style="margin: 20px;text-align: center;">
                        To support Piketplace
                    </h1>
                    <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;">
                        <!-- <i class="fas fa-donate"></i> -->
                        <img src="/site_images/pi.png" style="width: 15px;height: 15px;border-radius: 50%;display: inline;">
                        <input type="text" inputmode="decimal" class="form-control" id="amount" :placeholder="$t('message.donate.amount')" v-model="form.amount" style="display: inline;width: 90%;padding-left: 10px;">
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <em>{{$currency}}</em>
                    </div>
                    <div class="row mt-2 mb-1 mt-4" style="display: flex;justify-content: center;">
                        <div class="col-6">
                            <a @click.prevent="pay_with" class="btn btn-full mb-1 font-700 rounded-xl shadow-s btn-dark-piketplace" style="">{{$t('message.donate.donate')}}</a>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else-if="!isLoggedIn && !isLoading">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, i18n: $i18n, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { v4 as uuidv4 } from 'uuid';
    import PayWith from '../components/PayWith.vue';

    export default{
      components: {
            PayWith
      },
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
          //isLoading: false,
          //verifierPayment: null,
          form: {amount: ''},
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'maintenance_mode', 'payment_from', 'saving', 'uniqueId', 'pi_balance', 'piket_balance', 'piket_wallet_frontend_url']),
      },
      created () {
            //this.verifyIfPaymentDone();
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        beforeUnmount () {
            this.setUniqueId('')
            this.clearPaymentVerifier()
        },
        mounted() {
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.setUniqueId('')
            //////////////////////////////////////////////
            //document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
            this.$hide_modal.hide_modal('menu-main');
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
            ...mapActions(useStore, ['login', 'clearPaymentVerifier', 'setUniqueId', 'launchPaymentVerifier', 'piPayment', 'getCities']),
            pay_with(){
                if (this.form.amount == '' || !this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t("message.donate.fill_amount_field"))
                    return 0;
                }
                document.getElementById('select-wallet').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            pay_piketplace_wallet(){
                this.$hide_modal.hide_modal('select-wallet')
                /*if (this.user.balance < this.form.amount) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.not_enough_amount',{'amount': this.user.balance}))
                    return 0;
                }*/
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
                            this.pay_piketplace_call_set_pin_code()
                        }
                      }
                    }
                )
            },
            pay_piketplace_call_set_pin_code(){
                this.$hide_modal.hide_modal('select-wallet')
                this.$confirm({
                  auth: true,
                  message: '<span class="font-900 font-16">'+this.$t('message.put_your_code_pin')+'</span><br><br>'+this.$t('message.create_your_code_pin')+'<i class="fa fa-hand-point-right me-1 ms-1"></i><a class="" style="color: darkblue" href="'+this.piket_wallet_frontend_url+'" target="_blank">Piket Wallet</a><br><br>',
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
                        //alert('transfer start')
                        this.pay_piketplace_call(password)
                    }
                  }
                })
            },
            async pay_piketplace_call(code_pin){
                this.saving = true
                let amount = this.form.amount
                let user_id = this.user.id
                await axios.post(`/donate-piketplace-wallet`, {user_id:user_id, amount:amount, code_pin:code_pin})
                    .then(res => {
                        this.saving = false
                        //this.order = res.data.order;
                        console.log("verifier", res.data, res.data.payment);
                        if (res.data.status) {
                            this.form.amount = ""
                            this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.donate.donation_thanks'))
                        }else if(res.data.message == 'not_enough_amount'){
                            let balance_amount = this.$functions.amount_format(this.pi_balance, this.$currency);
                            this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': balance_amount}))
                        }else if(res.data.message){
                            this.$functions.msg_box(this, 'error', 'Info', this.$t(res.data.message))
                        }else{
                            this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.saving = false
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    });
            },
            pay_pi_network_wallet(){
                this.$hide_modal.hide_modal('select-wallet');
                //alert(this.uniqueId)
                if (this.uniqueId == '') {
                    this.setUniqueId(uuidv4());
                    this.verifyIfPaymentDone();
                }
                let dataPay = {
                    userId: this.user.id,
                    uniqueId: this.uniqueId,
                    type: 4,//DONATION
                    memo: this.$t('message.balance.memo_donate_from',{
                        amount: this.$functions.amount_format(this.form.amount, this.$currency),
                        from:'Piketplace'
                    }),
                    amount: this.form.amount,
                };
                this.form.amount = "";
                //this.$hide_modal.hide_modal('donate');alert('jess')
                this.piPayment(dataPay);
            },
            verifyIfPaymentDone () {
                this.payment_from = "donation"
                let data = {
                    uniqueId: this.uniqueId,
                    self: this,
                }
                this.launchPaymentVerifier(data)
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
b