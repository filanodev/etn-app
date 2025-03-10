<template>
    <div class="page-content" style="padding-top: 0!important;border-top-left-radius: 0px;">
        <Header ref="header" :pageTitle="$t('message.hello_user', {name: user?user.firstname:''})" :show_user_flag="true" :show_email="true" :show_profile_image="true"/>
        <div class="tw:w-full tw:h-full tw:bg-white tw:text-center" style="">
            <h2 class="mt-2"></h2>
            <div class="">
                Registration success
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
                form: {
                    lastname: "",
                    firstname: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
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
                this.form.firstname = ""
                axios.post(`/front/register`, this.form)
                .then(res => {
                    this.saving = false
                    console.log('front_register', res.data)
                    //if (res.data.status == "success") {
                    if (res.data.status) {
                        this.reInitForm()
                        this.setLoggedIn(true)
                        this.setToken(res.data.token)
                        let message_register = 'message.register_successfull'
                        this.$functions.msg_box(this, 'success', this.$t('message.connection'), this.$t(message_register), '/registration-success')
                    }/*else if(res.data.message){
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }*/else if(res.data.message && res.data.message.email){
                        alert('email error')
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }else if(res.data.message && res.data.message.password){
                        //this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                        if (res.data.message.password.includes("The given password has appeared in a data leak. Please choose a different password.")) {
                            alert('choose a different password')
                        }else{
                            alert('password error min length 8, contains ')
                        }
                    }else if(res.data.message && res.data.message.password_confirmation){
                        alert('password_confirmation error')
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