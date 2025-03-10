<template>
    <div class="page-content" style="padding-top: 0!important;border-top-left-radius: 0px;">
        <Header ref="header" :pageTitle="$t('message.hello_user', {name: user?user.firstname:''})" :show_user_flag="true" :show_email="true" :show_profile_image="true"/>
        <div class="tw:w-full tw:h-full tw:bg-white tw:text-center" style="">
            <h2 class="mt-2">Registration</h2>
            <div class="">
                <div class="" style="">
                    <div class="" style="text-align: center;">
                        <form class="content mb-0" id="produit-form" onsubmit="return validateMyForm();">
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="text" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_firstname')" v-model="form.firstname" maxlength="40" required="">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_firstname') }}</label>
                            </div>
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="text" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_lastname')" v-model="form.lastname" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_lastname') }}</label>
                            </div>
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="email" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_email')" v-model="form.email" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_email') }}</label>
                            </div>
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="password" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_password')" v-model="form.password" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_password') }}</label>
                            </div>
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="password" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_password_confirmation')" v-model="form.password_confirmation" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_password_confirmation') }}</label>
                            </div>
                            <div @click="register"
                            class="btn btn-3d btn-m btn-full mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 0px;">
                                {{$t('message.sign_up')}}
                            </div>
                        </form>
                        <div class="tw:w-full tw:flex">
                            <div class="tw:w-full tw:leading-[14px]">
                                <div class="tw:text-right mx-3">
                                    <router-link to="/my-account" class="color-piketplace font-14">
                                        {{ $t('message.sign_in') }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div style="width: 100%;text-align: center;">
                        <a @click="open_language_select">
                            <svg class="tw:inline tw:m-[10px] mx-auto" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.9198 22.0001C14.1198 22.0001 11.8398 19.7301 11.8398 16.9201C11.8398 14.1201 14.1098 11.8401 16.9198 11.8401C19.7198 11.8401 21.9998 14.1101 21.9998 16.9201C21.9998 19.7301 19.7298 22.0001 16.9198 22.0001Z" fill="#a63289"></path> <path opacity="0.4" d="M5.02 2H8.94C11.01 2 12.01 2.99999 11.96 5.01999V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z" fill="#a63289"></path> <path d="M9.00969 8.25992C8.69969 8.25992 8.40969 8.13991 8.13969 7.93991C8.38969 7.53991 8.5697 7.08991 8.6597 6.59991H8.99969C9.40969 6.59991 9.74969 6.25991 9.74969 5.84991C9.74969 5.43991 9.40969 5.09991 8.99969 5.09991H8.00969C7.99969 5.09991 7.9897 5.09991 7.9897 5.09991H7.9697H7.7097C7.6697 4.71991 7.3597 4.41992 6.9697 4.41992C6.5797 4.41992 6.26969 4.71991 6.22969 5.09991H4.9397C4.5297 5.09991 4.1897 5.43991 4.1897 5.84991C4.1897 6.25991 4.5297 6.59991 4.9397 6.59991H7.1097C6.8097 7.55991 5.94969 8.25992 4.92969 8.25992C4.51969 8.25992 4.17969 8.59992 4.17969 9.00992C4.17969 9.41992 4.51969 9.75992 4.92969 9.75992C5.73969 9.75992 6.4897 9.48992 7.1097 9.03992C7.6597 9.49992 8.31969 9.75992 8.99969 9.75992C9.40969 9.75992 9.74969 9.41992 9.74969 9.00992C9.74969 8.59992 9.41969 8.25992 9.00969 8.25992Z" fill="#a63289"></path> <path d="M9 22.75C4.73 22.75 1.25 19.27 1.25 15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15C2.75 17.96 4.81 20.44 7.58 21.09L7.31 20.64C7.1 20.28 7.21001 19.82 7.57001 19.61C7.92001 19.4 8.39001 19.51 8.60001 19.87L9.64999 21.62C9.78999 21.85 9.79 22.14 9.66 22.37C9.52 22.6 9.27 22.75 9 22.75Z" fill="#a63289"></path> <path d="M22.0004 9.75C21.5904 9.75 21.2504 9.41 21.2504 9C21.2504 6.04 19.1904 3.56 16.4204 2.91L16.6904 3.35999C16.9004 3.71999 16.7904 4.18001 16.4304 4.39001C16.0804 4.60001 15.6104 4.49001 15.4004 4.13L14.3504 2.38C14.2104 2.15 14.2104 1.86 14.3404 1.63C14.4704 1.39 14.7204 1.25 14.9904 1.25C19.2604 1.25 22.7404 4.73 22.7404 9C22.7504 9.41 22.4104 9.75 22.0004 9.75Z" fill="#a63289"></path> <path d="M19.7296 18.3301L17.5896 14.0601C17.4596 13.8101 17.1996 13.6401 16.9196 13.6401C16.6396 13.6401 16.3796 13.8001 16.2496 14.0501L14.1096 18.3201C13.9196 18.6901 14.0696 19.1401 14.4496 19.3301C14.5596 19.3801 14.6696 19.4101 14.7796 19.4101C15.0496 19.4101 15.3196 19.2601 15.4496 19.0001L15.6196 18.6601H18.2096L18.3796 19.0001C18.5696 19.3701 19.0196 19.5201 19.3896 19.3401C19.7696 19.1501 19.9196 18.7001 19.7296 18.3301ZM16.3796 17.1601L16.9295 16.0701L17.4796 17.1601H16.3796Z" fill="#a63289"></path> </g></svg>
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

    import { decodeCredential, googleTokenLogin } from 'vue3-google-login'

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
                nb_messages: 0,
                logging: false,
                /*form: {
                    lastname: "",
                    firstname: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                },*/
                form: {
                    lastname: "hgghh",
                    firstname: "hjjh",
                    email: "sewovonjess@gmail.com",
                    password: "Sewovon@2025",
                    password_confirmation: "Sewovon@2025",
                },
                username_password_login_active: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'isPiBrowser', 'pibrowser_verification', 'user', 'saving']),
        },
        mounted(){
            this.initLoaders()
            this.$functions.scrollToTop()
            if (this.session_expired === true) {
                this.session_expired = false
                this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.session_expired'))
            }
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache', 'showPiAdsRewarded', 'showPiAdsInterstitial', 'setBalance', 'initLoaders', 'setLoggedIn', 'setToken']),
            open_language_select() {
                this.$hide_modal.hide_modal('menu-main');

                document.getElementById('menu-language').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            reInitForm() {
                this.form.lastname = ""
                this.form.firstname = ""
                this.form.email = ""
                this.form.password = ""
                this.form.password_confirmation = ""
            },
            validateMyForm(){
                alert('validateMyForm')
            },
            register() {
                this.saving = true
                //this.form.firstname = ""
                axios.post(`/front/register`, this.form)
                .then(res => {
                    this.saving = false
                    console.log('front_register', res.data)
                    //if (res.data.status == "success") {
                    if (res.data.status) {
                        let message_register = 'message.register_successfull'
                        this.$functions.msg_box(this, 'success', this.$t('message.connection'), this.$t(message_register), '/registration-success')
                    }/*else if(res.data.message){
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }*/else if(res.data.message && res.data.message.firstname){
                        //alert('email error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.enter_your_firstname"))
                    }else if(res.data.message && res.data.message.lastname){
                        //alert('email error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.enter_your_lastname"))
                    }else if(res.data.message && res.data.message.email){
                        //alert('email error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.enter_email_with_valid_format"))
                    }else if(res.data.message && res.data.message.password){
                        //this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                        if (res.data.message.password.includes("The given password has appeared in a data leak. Please choose a different password.")) {
                            //alert('choose a different password')
                            this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.choose_different_password"))
                        }else{
                            //alert('password error min length 8, contains ')
                            this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.password_min_length_uppercase_lowercase_number_symbol"))
                        }
                    }else if(res.data.message && res.data.message.password_confirmation){
                        //alert('password_confirmation error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.password_confirmation_must_match_password"))
                    }else if(res.data.message){
                        //alert('password_confirmation error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
        },
        watch:{
            user(newVal, oldVal){
                console.log('sidemenu in watch')
                this.avatar = newVal?newVal.avatar:null;
            },
        }
    }
</script>


<style scoped>
    .message-badge {
      color: white;
      background-color: red;
      border-radius: 50%;
      margin-left: -8px;
    }
    .lg-content{
        padding: 3px 4px;
    }
    .m-content{
        padding: 1px 4px;
    }
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