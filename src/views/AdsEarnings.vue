<template>
    <div class="page-content">
        <Header ref="header" pageTitle="message.ads_earnings" :hide_settings_icon="true"/>
        <div v-if="!isLoading && isLoggedIn" class="card" style="background-color: transparent;">

            <div class="card card-style btn-dark-piketplace" style="border-radius: 10px!important;">
                <!-- <img src="/site_images/transparent-gif/star-12967_128.gif"> -->
                <div class="content">
                    <div style="text-align: left;color: #fff;">
                        <span class="color-white font-600">{{$t('message.estimated_incomes')}}</span>
                    </div>
                    <div>
                        <div v-if="1" style="display: inline-block;width: 50%;">
                            <h1 class="font-18 mt-2 color-white">
                                <i class="font-11 font-100">{{$t('message.total_ads_views')}}</i><br>
                                <sup class="price-sup font-600 font-16">{{user?user.number_ads_views:0}}</sup>
                            </h1>
                        </div>
                        <div v-if="1" style="display: inline-block;width: 50%;">
                            <h1 class="font-18 mt-2 color-white">
                                <i class="font-11 font-100">{{$t('message.cost_per_ads')}}</i><br>
                                <sup class="price-sup font-14">{{$currency}}</sup>
                                <span v-if="cost_per_pi>0" class="ms-1">{{ cost_per_pi.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ cost_per_pi.toString().split(".")[1]==null?"00":cost_per_pi.toString().split(".")[1]}}</sup></span>
                                <span v-else class="ms-1 font-14">? coming soon</span>
                            </h1>
                        </div>
                        <div v-if="1" style="display: inline-block;width: 50%;">
                            <h1 class="font-18 mt-2 color-white">
                                <i class="font-11 font-100">{{$t('message.cart.total')}}</i><br>
                                <sup class="price-sup font-14">{{$currency}}</sup>
                                <span v-if="cost_per_pi>0" class="ms-1">{{ total.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ total.toString().split(".")[1]==null?"00":total.toString().split(".")[1]}}</sup></span>
                                <span v-else class="ms-1 font-14">? coming soon</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div v-if="show_reward_gif" style="margin-top: -171px;width: 100%;height: 222px;">
                    <img src="/site_images/transparent-gif/6ob.gif">
                </div>
            </div>
            <div class="content" style="padding: 0 22px;">
                <p :style="'text-align:'+($i18n.locale=='ar'?'right':'left')" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 20px 20px;">
                    <i class="fas fa-info-circle" style="color: #000;"></i>
                    {{$t('message.view_ads_to_be_rewarded_in_pi_or_piket')}}
                </p>
                <p v-if="rewarded_ads_data && rewarded_ads_data.limit_reached===true && rewarded_ads_data.remaining_time" class="text-center" @click="loadData">
                    <i class="fa fa-undo font-22 me-1"></i>
                    <span class="font-14">{{$t('message.reload')}}</span>
                </p>
                <p v-else style="text-align: center;">
                    <i class="fa fa-hand-point-down font-22"></i>
                </p>
                <!-- <p v-if="rewarded_ads_data && rewarded_ads_data.limit_reached===true" :style="'text-align:'+($i18n.locale=='ar'?'right':'left')" style="background-color: transparent;color: red;padding: 10px;border-radius: 10px;margin: 20px 20px;">
                    {{$t('message.rewarded_ads_daily_limit_reached', {max :rewarded_ads_data.max})}}
                </p> -->
                <p v-if="rewarded_ads_data && rewarded_ads_data.limit_reached===true && rewarded_ads_data.remaining_time" style="color: red;">
                    <vue-countdown :time="rewarded_ads_data.remaining_time*1000" v-slot="{ days, hours, minutes, seconds }">
                        {{$t('message.rewarded_ads_availble_in', {hours: hours, minutes: minutes, seconds: seconds})}}
                    </vue-countdown>
                </p>
                <!-- <p v-if="rewarded_ads_data!==null">
                    {{JSON.stringify(rewarded_ads_data)}}
                </p> -->
                <div v-if="isLoggedIn" class="row mb-2 mt-3" style="background-color: transparent;border-radius: 10px;margin-bottom: 5px;">
                        <a @click="displayAd()" class="btn btn-full btn-3d btn-m mb-1 rounded-m font-600 shadow-s btn-dark-piketplace">
                            View Pi Ads
                        </a>
                </div>
                <div v-if="!isLoggedIn">
                    <div style="width: 100%;text-align: center;margin-top: 20px">
                        <button @click="login({confirm: $confirm, i18n: $i18n, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                            {{$t('message.log_in_first')}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading" style="text-align: center;">
            <img style="width: 50px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto"> {{$t('message.loading')}}
        </div>
        <div v-else-if="!isLoggedIn" class="loader-background" style="">
            <div style="width: 100%;text-align: center;padding-top: 100px;">
                <button @click="isLoading=true;login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in_first')}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        data() {
            return {
                cost_per_pi: 0,
                number_ads_views: 0,
                isLoading: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'activate_pi_rewarded_ads', 'show_reward_gif', 'saving', 'rewarded_ads_data', 'failed_rewarded_ads']),
            total(){
                return this.$functions.scientific_annotation_to_decimal(this.cost_per_pi*this.user.number_ads_views)
            }
        },
        mounted(){
            /*if (this.activate_pi_rewarded_ads === false) {
                this.$router.back();
            }*/
            this.avatar = this.user?this.user.avatar:null;
            this.hide_settings_icon = true;
            this.loadData()
        },
        methods:{
            ...mapActions(useStore, ['login', 'showPiAds', 'showPiAdsRewarded', 'set_activate_pi_rewarded_ads', 'set_failed_rewarded_ads']),
            async loadData(){
                this.isLoading = true;
                await axios.get('/load-ads-data', {params: {failed_rewarded_ads: this.failed_rewarded_ads}})
                .then(res => {
                    this.isLoading = false;
                    console.log('/load-ads-data', res.data)
                    this.rewarded_ads_data = res.data.ads_data
                    this.set_failed_rewarded_ads([])
                    if (res.data.status === true) {
                        this.cost_per_pi = res.data.cost_per_pi
                        this.set_activate_pi_rewarded_ads(res.data.activate_pi_rewarded_ads)
                        //this.total = this.$functions.scientific_annotation_to_decimal(this.cost_per_pi*this.number_ads_views)
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            displayAd(){
                if (this.activate_pi_rewarded_ads === false) {
                    this.$functions.msg_box_new(this.$confirm, 'error', this.$t('message.info'), this.$t("message.rewarded_ads_deactivated_temporarily"))
                    return
                }
                if (this.rewarded_ads_data!==null && this.rewarded_ads_data.remaining_time <= 0) {
                    this.loadData()
                    return
                }
                if (this.rewarded_ads_data.limit_reached) {
                    this.$functions.msg_box_new(this.$confirm, 'error', this.$t('message.info'), this.$t("message.ads_unavailable"))
                    return
                }
                this.showPiAdsRewarded("rewarded-page")
            }
        },
        watch:{
            rewarded_ads_data(after, before){

            }
        }
    }
</script>


<style scoped>
    .list-custom-small a i:first-child {
      margin-top: 0;
    }
    .list-custom-small {
      line-height: 30px;
    }
    .list-custom-small a i:first-child {
      margin-left: 0;
    }
    .break-name{
        width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        padding-bottom: 0px;
        margin-bottom: -7px!important;
    }
    .icon-l i {
      width: 30px;
      line-height: 30px;
      font-size: 17px;
      color: #fff;
    }
    .card {
      margin-bottom: 20px;
    }
    .row {
      --bs-gutter-x:0;
    }
    .menu-title{
        margin-left: 11px;
    }
    .piketplace-menu-shadow{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        border-radius: 20px;
        margin-top: 10px;
    }

</style>