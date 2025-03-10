<template>
    <div class="page-content">
        <Header ref="header" pageTitle="message.side_menu.settings" :hide_settings_icon="true"/>
        <div class="card" style="background-color: transparent;">
            <div class="content" style="margin-top: 20px;padding: 22px">
                <div v-if="isLoggedIn" class="row mb-2 mt-3" style="background-color: transparent;border-radius: 10px;margin-bottom: 5px;">
                    <div class="d-flex">
                        <router-link :to="{ name: 'profil'}" class="" style="text-align:left;display: block;">
                            <span class="external-link icon icon-l rounded-s mb-1">
                                <i class="fas fa-user font-20 color-piketplace"></i>
                            </span>
                            <span class="color-black font-14 text-center opacity-70 mb-2 align-text-top" style="line-height: 11px;">{{$t('message.side_menu.profile')}}</span>
                        </router-link>
                    </div>
                    <hr>
                </div>
                <div v-if="isLoggedIn" class="row mb-2 mt-3" style="background-color: transparent;border-radius: 10px;margin-bottom: 5px;">
                    <div class="d-flex">
                        <router-link :to="{ name: 'my-addresses'}" class="" style="text-align:left;display: block;">
                            <span class="external-link icon icon-l rounded-s mb-1">
                                <i class="color-piketplace fas fa-address-card-o font-20"></i>
                            </span>
                            <span class="color-black font-14 text-center opacity-70 mb-2 align-text-top" style="line-height: 11px;">{{$t('message.side_menu.addresses')}}</span>
                        </router-link>
                    </div>
                    <hr>
                </div>
                <div class="row mb-2 mt-3" style="background-color: transparent;border-radius: 10px;margin-bottom: 5px;">
                    <div class="d-flex">
                        <a @click="open_language_select()" class="" style="text-align:left;display: block;">
                            <span class="external-link icon icon-l rounded-s mb-1">
                                <i class="fa fa-language font-20 color-piketplace"></i>
                            </span>
                            <span class="color-black font-14 text-center opacity-70 mb-2 align-text-top" style="line-height: 11px;">{{$t('message.side_menu.language')}}</span>
                        </a>
                    </div>
                    <hr>
                </div>
                <!-- <div class="row mb-2 mt-3" style="background-color: transparent;border-radius: 10px;margin-bottom: 5px;">
                    <div class="d-flex">
                        <div @click="clearCache($confirm)" class="" style="text-align:left;display: block;">
                            <span class="external-link icon icon-l rounded-s mb-1">
                                <i class="fa fa-eraser font-20 color-piketplace"></i>
                            </span>
                            <span class="color-black font-14 text-center opacity-70 mb-2 align-text-top" style="line-height: 11px;">{{$t('message.side_menu.clear_cache')}}</span>
                        </div>
                    </div>
                    <hr>
                </div> -->
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
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'mining_activation', 'user_country', 'session_expired', 'hide_settings_icon']),
        },
        mounted(){
            this.avatar = this.user?this.user.avatar:null;
            this.hide_settings_icon = true;
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache']),
            open_language_select() {
                this.$hide_modal.hide_modal('menu-main');

                document.getElementById('menu-language').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            logout() {
                this.$hide_modal.hide_modal('menu-main');
                this.$functions.msg_box(this, 'confirm', this.$t('message.deconnection'), this.$t('message.confirmation.you_sure'), 'logout')
            },
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