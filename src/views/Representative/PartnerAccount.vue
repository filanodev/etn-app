<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.representative_account" :hide_settings_icon="true"/>
        <div class="page-content">
            <div v-if="data!==null && !isLoading">
                <h3 v-if="partnerAccount" style="text-align: center;">
                    {{country_name}}
                    {{$functions.isoToEmoji(partnerAccount.country_code)}}
                </h3>
                <div class="card card-style btn-dark-piketplace" style="border-radius: 10px!important;margin-bottom: 10px;">
                    <div class="content">
                        <div style="text-align: left;color: #fff;">
                            <span class="color-white font-600">{{$t('message.estimated_incomes')}}</span>
                        </div>
                        <div>
                            <div v-if="data.today_amount!=undefined" style="display: inline-block;width: 50%;">
                                <h1 class="font-18 mt-2 color-white">
                                    <i class="font-10 font-100">{{$t('message.today')}}</i><br>
                                    <sup class="price-sup font-12">{{$currency}}</sup>
                                    {{ data.today_amount.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ data.today_amount.toString().split(".")[1]==null?"00":data.today_amount.toString().split(".")[1]}}</sup>
                                </h1>
                            </div>
                            <div v-if="data.yesterday_amount!=undefined" style="display: inline-block;width: 50%;">
                                <h1 class="font-18 mt-2 color-white">
                                    <i class="font-10 font-100">{{$t('message.yesterday')}}</i><br>
                                    <sup class="price-sup font-12">{{$currency}}</sup>
                                    {{ data.yesterday_amount.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ data.yesterday_amount.toString().split(".")[1]==null?"00":data.yesterday_amount.toString().split(".")[1]}}</sup>
                                </h1>
                            </div>
                            <div v-if="data.this_month_amount!=undefined" style="display: inline-block;width: 50%;">
                                <h1 class="font-18 mt-2 color-white">
                                    <i class="font-10 font-100">{{$t('message.this_month')}}</i><br>
                                    <sup class="price-sup font-12">{{$currency}}</sup>
                                    {{ data.this_month_amount.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ data.this_month_amount.toString().split(".")[1]==null?"00":data.this_month_amount.toString().split(".")[1]}}</sup>
                                </h1>
                            </div>
                            <div v-if="data.last_month_amount!=undefined" style="display: inline-block;width: 50%;">
                                <h1 class="font-18 mt-2 color-white">
                                    <i class="font-10 font-100">{{$t('message.last_month')}}</i><br>
                                    <sup class="price-sup font-12">{{$currency}}</sup>
                                    {{ data.last_month_amount.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ data.last_month_amount.toString().split(".")[1]==null?"00":data.last_month_amount.toString().split(".")[1]}}</sup>
                                </h1>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="card card-style btn-dark-piketplace" v-if="partnerAccount" style="border-radius: 10px!important;margin-bottom: 10px;">
                    <div class="content">
                        <div style="text-align: left;color: #fff;">
                            <span class="color-white font-600">{{$t('message.side_menu.balance')}}</span>
                        </div>
                        <h1 class="font-20 mt-4 color-white">
                            <sup class="price-sup font-12">{{$currency}}</sup>
                            {{ partnerAccount.balance.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ partnerAccount.balance.toString().split(".")[1]==null?"00":partnerAccount.balance.toString().split(".")[1]}}</sup>
                        </h1>
                    </div>
                </div>
                <div class="card card-style">
                    <div class="content">
                        &#9711;&nbsp;
                        <i18n-t keypath="message.partner_minimum_balance_withdrawal" tag="span">
                            <template #amount>
                              <a class="color-piketplace" style='font-weight:600;'>{{$functions.amount_format(10, $currency)}}</a>
                            </template>
                        </i18n-t>
                        <!-- <br>
                        &#9711;&nbsp;
                        <i18n-t keypath="message.partner_withdrawal_wallet_address" tag="span">
                            <template #wallet_address>
                              <a class="color-piketplace" style='font-weight:600;'>{{wallet_address}}</a>
                            </template>
                        </i18n-t>
                        <i @click="$router.push('set-partner-wallet-address')" class="fa fa-edit color-green-dark fa-2x"></i>
                        <hr>-->
                        <div class="row">
                            <div class="d-flex">
                                <div class="ms-auto me-auto" style="text-align:center;">
                                    <h6 style="text-align: center;">
                                        {{nb_orders}}
                                    </h6>
                                    <router-link :to="{ name: 'partner-orders'}" class="shareToFacebook external-link icon icon-l btn-dark-piketplace rounded-s shadow-xl"><i class="fas fa-shopping-bag font-22"></i><br></router-link>
                                    <p class="font-11 text-center opacity-70">{{$t('message.orders')}}</p>
                                </div>
                            </div>
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

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../../stores'

    export default{

      data: function () {
        return {
          data: null,
          isLoading: false,
          balance: 0,
          nb_orders: 0,
          settings: [],
          partnerAccount: null,
          wallet_address: '',
          country_name: '',
        }
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'isOpenLoading', 'connecting']),
        },
        mounted() {
            this.getData();
            this.$functions.scrollToTop();
        },
        methods: {
            ...mapActions(useStore, ['getCountryNameByCode']),
            reload(){
                this.getData();
            },
            async getData() {
                let uid = this.user.uid;
                this.isLoading = true
                await axios.get('/partner/get-partner-account')
                .then(res => {
                    console.log("/get-partner-account", res.data)
                    this.isLoading = false
                    this.data = res.data
                    this.partnerAccount = res.data.partnerAccount
                    this.country_name = this.getCountryNameByCode(this.partnerAccount.country_code)
                    this.nb_orders = res.data.nb_orders
                    if (this.partnerAccount && this.partnerAccount.wallet_address) {
                        this.wallet_address = this.partnerAccount.wallet_address
                    }
                })
                .catch(err => {
                    this.isLoading = false
                })
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
