<template>
    <div class="page-content" style="padding-top: 0!important;border-top-left-radius: 0px;">
        <Header ref="header" pageTitle="message.partnerships" :hide_settings_icon="true"/>
        <div v-if="isLoggedIn && !isLoading" class="card" style="background-color: #fff">
            <div class="content" style="margin-top: 0px;">
                <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw:inline-block border-piketplace mt-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600 font-16 mb-2" style="margin-left: 20px;">
                            {{$t('message.our_partnerships')}}
                        </h4>
                        <div class="d-flex mb-2" v-for="p in partnerships">
                            <div class="" style="text-align:center;width: 100%;display: inline-block;">
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{p.name}}</p>
                                <img style="height: 50px;width: 50px;border-radius: 50%;object-fit: cover;text-align: center;margin: auto;" class="tw:text-center" :src="getLogo(p)">
                                <p v-html="p.description" class="color-black font-11 text-center mb-2" style="line-height: 11px;"></p>
                                <hr>
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
</template>

<script>
    import axios from "axios";

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        data() {
            return {
                isLoading: true,
                partnerships: [],
            };
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'mining_activation', 'user_country', 'session_expired', 'project_type', 'pi_balance', 'piket_balance', 'piket_wallet_frontend_url', 'activate_pi_ads', 'referral_token_amount_sponsor', 'referral_token_amount_child']),
        },
        mounted(){
            this.initLoaders()
            this.$functions.scrollToTop()
            if (this.session_expired === true) {
                this.session_expired = false
                this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.session_expired'))
            }
            this.getPartnerships()
        },
        methods:{
            ...mapActions(useStore, ['login', 'initLoaders']),
            getPartnerships(){
                this.isLoading = true
                axios.get(`/get-partnerships`)
                .then(res => {
                    this.isLoading = false
                    this.partnerships = res.data.partnerships
                    console.log('res.data.partnerships', res.data.partnerships)
                })
                .catch(error => {
                    this.isLoading = false
                });
            },
            getLogo(p){
                /*if (p.logo_link==null || p.logo_link=="") {
                    
                    if (p.code == "pi-network") {
                        return '/site_images/pi.png'
                    }
                    if (p.code == "latin-chain") {
                        return '/site_images/partnerships/LatinChain.jpg'
                    }
                    if (p.code == "connectsocial") {
                        return '/site_images/partnerships/ConnectSocial.jpg'
                    }
                }*/
                return p.logo_link
            }
        },
        watch:{
            
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

    .icon-rounded-shape{
        background-color: rgba(171, 214, 227, 0.3);
        border-radius: 50% !important;
        width: 40px;
        height: 40px;
    }

</style>