<template>
    <div>
        <Header ref="header" pageTitle="Administration" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="card card-style" v-if="settings.length > 0 && !isLoading">
                <div class="content">
                    <div style="text-align: center;">
                        <i class="fa fa-chart-line color-violet fa-3x" style="color: #583e77!important;"></i>
                    </div>
                    <h1 class="font-40 text-center mt-4">
                        <sup class="price-sup font-14">{{$currency}}</sup>
                        {{ balance.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ balance.toString().split(".")[1]==null?"00":balance.toString().split(".")[1]}}</sup>
                    </h1>
                    <h1 class="font-30 text-center mt-4">
                        <sup class="price-sup font-12">PIKET (Total distribué)</sup>
                        {{ data.total_token_amount.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ data.total_token_amount.toString().split(".")[1]==null?"00":data.total_token_amount.toString().split(".")[1]}}</sup>
                    </h1>
                    <h1 class="font-14 font-600 text-center mt-0">
                        Ads views: {{$functions.thousandSeprator(data.nb_rewarded_ads)}}
                        &nbsp;&nbsp;&nbsp;<i class="fa fa-undo color-piketplace" @click="getData"></i>
                    </h1>
                    <hr>
                    <div class="row mt-2">
                        <div class="d-flex">
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_settings}}</h6>
                                <router-link to="/settings" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fa fa-cog font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Paramètres</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_daily_active_users}}/{{data.nb_users}}</h6>
                                <router-link to="/users" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fa fa-users font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Utilisateurs</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_products_pending}}/{{data.nb_products}}</h6>
                                <router-link to="/admin-products" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-box font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Produits</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">
                                    {{data.nb_orders_shipped}}/{{data.nb_orders}}
                                </h6>
                                <router-link to="/admin-orders" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-shopping-bag font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Commandes</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_failed_payments}}</h6>
                                <router-link to="/failed-payments" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-store font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Paiements échoués</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_contacts}}</h6>
                                <router-link to="/support-contacts" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fa fa-address-book-o font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Contacts</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">{{data.nb_withdrawal}}</h6>
                                <router-link to="/admin-withdrawals" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-shopping-bag font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Retraits</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <h6 style="text-align: center;">93</h6>
                                <router-link to="/users" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-store font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Boutiques</p>
                            </div>
                            <div class="ms-auto me-auto" style="text-align:center;">
                                <router-link to="/partners-payment" class="shareToFacebook external-link icon icon-l bg-facebook rounded-s shadow-xl"><i class="fas fa-dollar font-22"></i><br></router-link>
                                <p class="font-11 text-center opacity-70">Partner Payment</p>
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
          /*data: {
            balance: 0,
            sales_not_approved: 0,
            shippings_not_approved: 0,
            withdrawal: 0,
          },*/
          isLoading: false,
          balance: 0,
          settings: [],
          data: [],
          prevRoute: null,
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
            this.$hide_modal.hide_modal('menu-main');
            this.getData();
        },
        methods: {
            reload(){
                this.getData();
            },
            async getData() {
                let uid = this.user.uid;
                this.isLoading = true
                await axios.get('/piketplace', {params: {uid}})
                .then(res => {
                    console.log('Administration data', res.data)
                    this.isLoading = false
                    this.data = res.data.data;
                    this.settings = res.data.settings;
                    this.balance = this.settings.find(element=>
                         element.name === 'balance'
                    ).value;
                    console.log(this.balance, res.data.settings);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.not_found = true;
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
