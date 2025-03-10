<template>
    <div class="page-content" style="background-color: #000;min-height: 800px;">
        <Header ref="header" pageTitle="FAQ" :hide_settings_icon="true"/>
        <Adsense v-if="activate_google_ads"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226" data-full-width-responsive="true">
        </Adsense>
        <div class="card card-style mt-1">
            <div class="content" style="margin-top: 20px;">
                <div class="card card-style" v-for="(line, index) in tab">
                    <div class="accordion">
                        <div class="mb-0">
                            <button class="btn accordion-btn no-effect color-theme collapsed" data-bs-toggle="collapse" :data-bs-target="'#faq'+index" aria-expanded="false" style="padding-bottom: 0;">
                                <div class="content tw:inline-block" style="margin: 0;">
                                    <h2 class="font-14">{{line.q}}</h2>
                                </div>
                                <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                            </button>
                            <div :id="'faq'+index" class="collapse" style="">
                                <div class="pt-1 pb-1 ps-3 pe-3">
                                    <div class="content mt-0 mb-1">
                                        {{line.a}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                tab: [
                    {
                        "q":"What is Piketplace?",
                        "a":"A marketplace platform based on Pi Network"
                    },
                    {
                        "q":"How to mine Piket?",
                        "a":"Go to My account and search Mining"
                    },
                ]
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'mining_activation', 'user_country', 'session_expired', 'hide_notifications_icon', 'hide_settings_icon', 'activate_google_ads']),
        },
        mounted(){
            this.avatar = this.user?this.user.avatar:null;
            //this.$functions.scrollToTop()
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache']),
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

</style>