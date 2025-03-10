<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.mining" :hide_settings_icon="true"/>
        <div class="page-content">
            <Adsense v-if="activate_google_ads"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div class="card card-style gradient" v-if="isLoggedIn && !isLoading" style="min-height: 300px;border-radius: 8px 8px 30px;padding: 30px;margin-top: 20px;">
                <div class="content">
                    <div style="text-align: center;">
                        <i class="fa fa-industry color-piketplace fa-3x" style=""></i>
                    </div>
                    <!-- <div class="row mt-2 mb-1">
                        <div class="col-12">
                            <h1 class="font-20 text-center mt-4 color-white">
                                <vue-countdown v-if="mining_remaining_time>0" :time="mining_remaining_time" :interval="100" v-slot="{ totalSeconds  }">
                                    <sup class="price-sup font-16 color-white">PIKET</sup>
                                    {{ ((3600*24-totalSeconds)*(mining_rate)/3600).toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup v-if="((3600*24-totalSeconds)*(mining_rate)/3600).toString().split('.').length>0">{{ $functions.scientific_annotation_to_decimal((3600*24-totalSeconds)*(mining_rate)/3600).toString().split(".")[1].substring(0, 20)}}</sup>
                                </vue-countdown>
                            </h1>
                        </div>
                    </div> -->
                    <div class="row mt-2 mb-1">
                        <div class="col-12">
                            <h1 class="font-20 text-center mt-4" v-if="mining_remaining_time>0">
                                <i18n-t keypath="message.mining.remaining_time" tag="span">
                                    <template #time>
                                        <vue-countdown :time="mining_remaining_time" :interval="100" v-slot="{ days, hours, minutes, seconds, milliseconds }" class="color-piketplace">
                                            {{ hours<10?'0':'' }}{{ hours }}:{{ minutes<10?'0':'' }}{{ minutes }}:{{ seconds<10?'0':'' }}{{ seconds }}.{{ Math.floor(milliseconds / 100) }} 
                                        </vue-countdown>
                                    </template>
                                </i18n-t>
                                <br/>
                                <i18n-t keypath="message.mining.rate" tag="span">
                                    <template #rate>
                                        <span class="color-piketplace">
                                            {{mining_rate.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}{{mining_rate.toString().split(".")[1]}}
                                        </span>
                                    </template>
                                </i18n-t>
                            </h1>
                            <div v-else style="text-align: center;">
                                <button @click="mining" class="btn btn-3d btn-m mb-3 rounded-xl font-600 btn-dark-piketplace">
                                    {{$t('message.mining.mine')}}
                                </button>
                            </div>
                            <div style="text-align: center;">
                                <a target="_blank" :href="piket_wallet_frontend_url" class="font-300 color-gray font-22" style="color: #999;">
                                    <i class="fa fa-wallet font-22 color-piketplace"></i>
                                    {{$t('message.balance.see_wallet')}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
            <InArticleAdsense v-if="activate_google_ads"
              ins-style="display:inline-block;width:360px;height:300px"
              data-ad-client="ca-pub-3962442438023665"
              data-ad-format="horizontal"
              data-ad-slot="9955946331">
            </InArticleAdsense>
            <Adsense v-if="activate_google_ads"
              ins-style="display:inline-block;width:180px;height:500px;"
              data-ad-client="ca-pub-3962442438023665"
              data-ad-format="vertical"
              data-ad-slot="8165279527">
            </Adsense>
            <Adsense v-if="activate_google_ads"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
      /*components: {
          DropFile,
      },*/
      data: function () {
        return {
          mining_remaining_time: 0,
          mining_rate: 0,
          seconds: 0,
          //user: null,
          data: null,
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'saving', 'mining_activation', 'piket_wallet_frontend_url', 'activate_google_ads']),
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
            
            this.checkMining()

            if (!this.mining_activation) {
                let msg = this.$t('message.access_denied')
                this.$functions.msg_box(this, 'error', this.$t('message.info'), msg, -1)
                return
            }
            //this.showPiAds('interstitial')
            this.$functions.scrollToTop();
        },
        methods: {
            ...mapActions(useStore, ['showPiAdsInterstitial', 'showPiAdsRewarded', 'showPiAds']),
            checkMining(){
                this.isLoading = true
                axios.get('/check-mining')
                .then(res => {
                    console.log('checking mining res.data', res.data);
                    this.saving = false
                    this.isLoading = false
                    this.mining_remaining_time = res.data.mining_remaining_time
                    console.log('mining_remaining_time',this.mining_remaining_time)
                    if (res.data.wallet_user && res.data.wallet_user.mining_data && res.data.wallet_user.mining_data.mining_rate) {
                        this.mining_rate = res.data.wallet_user.mining_data.mining_rate
                    }
                })
                .catch(err => {
                    this.saving = false
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            async mining() {
                this.saving = true
                await axios.post('/mining')
                .then(res => {
                    if (res.data.message == "session_running") {
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.side_menu.mining_session_running'))
                    }
                    if (res.data.wallet_user && res.data.wallet_user.mining_data && res.data.wallet_user.mining_data.mining_rate) {
                        this.mining_rate = res.data.wallet_user.mining_data.mining_rate
                    }
                    if (res.data.mining_remaining_time==3600*24*1000) {
                        //Remove 1 second to permit mining countdown start
                        this.mining_remaining_time = res.data.mining_remaining_time-1
                    }else if (res.data.mining_remaining_time<3600*24*1000){
                        this.mining_remaining_time = res.data.mining_remaining_time
                    }
                    console.log('mining mining res.data', res.data);
                    this.saving = false
                    //this.showPiAdsInterstitial(false)
                    //this.showPiAdsRewarded("after-mining")
                    //this.showPiAds('interstitial')
                })
                .catch(err => {
                    this.saving = false
                    this.isLoading = false
                    this.not_found = true;
                })
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
