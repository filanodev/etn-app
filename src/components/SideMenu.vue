<template>
    <div id="menu-main" class="menu menu-box-left gradient" data-menu-width="280" data-menu-active="nav-welcome" style="border-top-right-radius: 30px;border-bottom-right-radius: 30px;">
        
        <div style="background-color: rgba(255, 255, 255, 0.4);border-bottom-left-radius: 70px;padding-bottom: 30px;">
            <div style="text-align: center;height: 110px;border-bottom-left-radius: 70px;border-top-right-radius: 30px;background-color: rgba(255, 255, 255, 0.5);" class="">
                <div style="padding-top: 15px;">
                    <div style="width: 20%;display: inline-block;text-align: center;">
                        <i @click="open_language_select" class="fa fa-language font-22" style="color: gray;"></i>
                    </div>
                    <div style="width: 60%;display: inline-block;text-align: center;">
                        <i @click="$router.push('/profil')" class="fa fa-edit"></i>
                        <img v-if="avatar" class="" :src="avatar" alt="avatar" style="width: 60px;height: 60px;border-radius: 50%;margin: auto;object-fit: cover;">
                    </div>
                    <div style="width: 20%;display: inline-block;text-align: center;">
                        <i v-can="'browse_settings' && 'browse_settings'" @click="$router.push('/administration')" class="fa fa-cog font-22 to_hide" style="color: gray;"></i>
                    </div>
                </div>
                <div>
                    <label class="color-black ps-2 mb-n1 font-12 break-name" id="user_id" style="" v-html="user?user.fullnameOrUsername:''"></label>
                </div>
                
            </div>
            <div class="list-group list-custom-small list-menu" style="padding: 15px;">
                <router-link id="nav-welcome" to="/donation" style="border-radius: 20px;" class="">
                    <i style="margin-top: 0;" class="fas fa-donate color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.donate')}}</span>
                </router-link>
            </div>
            <div class="mt-2"></div>
            <div class="list-group list-custom-small list-menu">
                <div class="d-flex">
                    <div class="ms-auto me-auto" style="text-align:center;">
                        <router-link style="width: 32px;" to="/profil" class="external-link icon icon-l rounded-s shadow-xl"><i class="fas fa-user font-11 color-piketplace"></i><br></router-link>
                        <p class="font-600 font-11 text-center opacity-70 mb-0">{{$t('message.side_menu.my_profile')}}</p>
                    </div>
                    <div class="ms-auto me-auto" style="text-align:center;">
                        <router-link style="width: 32px;" to="/balance" class="external-link icon icon-l rounded-s shadow-xl"><i class="fas fa-chart-line font-11 color-piketplace"></i><br></router-link>
                        <p class="font-600 font-11 text-center opacity-70 mb-0">{{$t('message.side_menu.balance')}}</p>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="ms-auto me-auto" style="text-align:center;">
                        <router-link style="width: 32px;" to="/my-store" class="external-link icon icon-l rounded-s shadow-xl"><i class="fas fa-store font-11 color-piketplace"></i><br></router-link>
                        <p class="font-600 font-11 text-center opacity-70 mb-0">{{$t('message.side_menu.my_store')}}</p>
                    </div>
                    <div class="ms-auto me-auto" style="text-align:center;">
                        <router-link style="width: 32px;" to="/my-sales" class="external-link icon icon-l rounded-s shadow-xl"><i class="fas fa-store font-11 color-piketplace"></i><br></router-link>
                        <p class="font-600 font-11 text-center opacity-70 mb-0">{{$t('message.side_menu.my_sales')}}</p>
                    </div>
                </div>
                
                <!-- <a @click="open_language_select">
                    <i class="fa fa-globe color-piketplace"></i>
                    <span>{{$t('message.side_menu.language')}}</span>
                </a> -->
                
            </div>
            <div class="list-group list-custom-small list-menu" style="padding-left: 15px;">
                <router-link id="nav-welcome" to="/mining" v-if="mining_activation" class="" style="margin-top: 20px;">
                    <i class="fas fa-industry color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.mining')}}</span>
                </router-link>
                <router-link id="nav-homepages" to="/my-orders" class="" style="margin-top: 20px;">
                    <i class="fa fa-list-alt color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.my_orders')}}</span>
                </router-link>
                <router-link id="nav-homepages" to="/my/shipping/apply" class="" style="margin-top: 20px;">
                    <i class="fas fa-shipping-fast color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.my_shipping_applications')}}</span>
                </router-link>
                <a @click="support_func" id="nav-homepages" style="margin-top: 20px;" class="">
                    <i class="fa fa-headphones color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.support')}}</span>
                </a>
                <router-link id="nav-homepages" to="/info" class="" style="margin-top: 20px;">
                    <i style="margin-top: 0;" class="fas fa-info color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.terms_and_conditions')}}</span>
                </router-link>
                <a @click="logout" class="" style="margin-top: 20px;">
                    <i class="fa fa-sign-out color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.log_out')}}</span>
                </a>
                <a @click="clearCache" class="" style="margin-top: 20px;">
                    <i class="fa fa-eraser color-piketplace"></i>
                    <span class="color-piketplace">{{$t('message.side_menu.clear_cache')}}</span>
                </a>
            </div>
            <!-- <hr>
            <div class="list-group list-custom-small list-menu" style="padding-left: 15px;">
                <router-link v-can="'browse_users'" class="to_hide" id="users" to="/users">
                    <i class="fa fa-users color-piketplace"></i>
                    <span>Users</span>
                </router-link>
                <router-link v-can="'browse_settings' && 'browse_settings'" class="to_hide" id="administration" to="/administration" style="display: block;">
                    <i class="fa fa-cog color-piketplace"></i>
                    <span class="color-piketplace">Admin</span>
                </router-link>
            </div> -->
            
        </div>
        <div style="text-align: center;">
            <div class="social-media" style="height: 30px;margin-top: 12px;">
                <a target="_blank" href="https://www.facebook.com/Piketplace" class="icon icon-xs rounded-xl bg-facebook">
                    <i class="fab fa-facebook"></i>
                </a>&nbsp;
                <a target="_blank" href="https://instagram.com/piketplace?igshid=YmMyMTA2M2Y=" class="icon icon-xs rounded-xl instagram-bg">
                    <i class="fab fa-instagram"></i>
                </a>&nbsp;
                <a target="_blank" href="https://youtube.com/channel/UCT0Go6iqIjdFm7q_K4Yi54g" class="icon icon-xs rounded-xl bg-red-dark">
                    <i class="fab fa-youtube"></i>
                </a>&nbsp;
                <a target="_blank" href="https://twitter.com/piketplace?t=bdCmzk09mjZMAZkyQzuj9Q&s=09" class="icon icon-xs rounded-xl bg-twitter">
                    <i class="fab fa-twitter"></i>
                </a>&nbsp;
                <a target="_blank" href="https://t.me/+GgzdUoBysnw0ODY0" class="icon icon-xs rounded-xl bg-telegram">
                    <i class="fab fa-telegram"></i>
                </a>
            </div>
        </div>
        <div  v-if="!isLoggedIn" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,0.9);text-align: center;">
            <div class="social-media" style="height: 30px;margin-top: 12px;">
                <a target="_blank" href="https://www.facebook.com/Piketplace" class="icon icon-xs rounded-xl bg-facebook">
                    <i class="fab fa-facebook"></i>
                </a>&nbsp;
                <a target="_blank" href="https://instagram.com/piketplace?igshid=YmMyMTA2M2Y=" class="icon icon-xs rounded-xl instagram-bg">
                    <i class="fab fa-instagram"></i>
                </a>&nbsp;
                <a target="_blank" href="https://youtube.com/channel/UCT0Go6iqIjdFm7q_K4Yi54g" class="icon icon-xs rounded-xl bg-red-dark">
                    <i class="fab fa-youtube"></i>
                </a>&nbsp;
                <a target="_blank" href="https://twitter.com/piketplace?t=bdCmzk09mjZMAZkyQzuj9Q&s=09" class="icon icon-xs rounded-xl bg-twitter">
                    <i class="fab fa-twitter"></i>
                </a>&nbsp;
                <a target="_blank" href="https://t.me/+GgzdUoBysnw0ODY0" class="icon icon-xs rounded-xl bg-telegram">
                    <i class="fab fa-telegram"></i>
                </a>
            </div>
            <!-- <div class="vertical-center">
                <router-link to="/connexion" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="min-width: 100px;">
                    {{$t('message.log_in')}}
                </router-link>
            </div> -->
            <div class="vertical-center">
                <div style="width: 100%;">
                    <div style="width: 100%;text-align: center;">
                        <a @click="start_connexion" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;">
                            {{$t('message.log_in')}}
                        </a>
                    </div>
                    <div style="width: 100%;text-align: center;">
                        <a @click="open_language_select">
                            <i class="fa fa-language color-piketplace font-18"></i>
                            <!-- <span>{{$t('message.side_menu.language')}}</span> -->
                        </a>
                    </div>
                    <div style="width: 100%;text-align: center;">
                        <a @click="clearCache">
                            <i class="fa fa-eraser color-piketplace font-18"></i>
                            {{$t('message.side_menu.clear_cache')}}
                        </a>
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
                code: '',
                nb_support_messages: 0,
                avatar: null,
                /*user: {
                    fullnameOrUsername: '',
                    avatar: '',
                    nbNewMessages: 0,
                    isAdmin: false,
                },*/
                isDefault: true,
                isLoading: true,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'mining_activation']),
        },
        mounted(){
            this.avatar = this.user?this.user.avatar:null;
            console.log('this.avatar', this.avatar)
            //this.getCode();
            $('.link').on('click', function() {
                if (!$(this).hasClass('active-nav')) {
                    $('.link').removeClass('active-nav')
                    $(this).addClass('active-nav')
                    $('#preloader').removeClass('preloader-hide')
                }
            });
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache']),
            async getCode(){
                let res = await axios.get('https://ipapi.co/json')
                .then(res => {
                    this.code = res.data.country.toLowerCase();
                })
                .catch(error => {});
            },
            setData(data){
                if (data.nb_support_messages!=undefined) {
                    this.nb_support_messages = data.nb_support_messages
                }
                if (data.code!=undefined) {
                    this.code = data.code
                }
                if (data.user!=undefined && data.user!=null) {
                    //this.user = null;
                    this.user = data.user;
                    this.isDefault = false;
                }
            },
            setCode(code){
                if (code!=undefined) {
                    this.code = code
                }
            },
            setUser(user){
                if (user!=undefined && user!=null) {
                    //this.user = null;
                    this.user = user;
                    this.isDefault = false;
                }
            },
            redirect_function() {
                this.$router.push('/profil');
            },
            open_language_select() {
                this.$hide_modal.hide_modal('menu-main');

                document.getElementById('menu-language').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            logout() {
                this.$hide_modal.hide_modal('menu-main');
                this.$functions.msg_box(this, 'confirm', this.$t('message.deconnection'), this.$t('message.confirmation.you_sure'), 'logout')
            },
            start_connexion() {
                /*this.login({self: this})
                if (!this.isPiBrowser) {
                    this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.please_use_pi_browser'))
                    return
                }*/
                this.$router.push('/connexion');
            },
            support_func(){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.redirect_to_support')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                this.$confirm({
                  title: "Info",
                  message: msg,
                  button: {
                    //yes: 'OK'
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.no')
                  },
                  html: true
                    ,
                    /**
                    * Callback Function
                    * @param {Boolean} confirm
                    */
                    callback: confirm => {
                        if (confirm) {
                            window.open('https://piketplace.com', '_blank');
                        }
                    }
                })
            }
        },
        watch:{
            user(before, after){
                console.log('sidemenu in watch')
                this.avatar = this.user?this.user.avatar:null;
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
