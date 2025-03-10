<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_profile" :hide_settings_icon="true"/>
        <SelectCountry @propagation_country="selected_one"/>
        <div class="page-content" style="background-color: transparent;">
            <div class="card card-style" v-if="isLoggedIn && !isLoading" style="min-height: 500px;">
                <!-- <div style="text-align: center;margin: 10px;">       
                    <i18n-t keypath="message.referral_link" tag="div">
                        <template #link>
                            <input id="referral_link" type="text" :value="'pi://mainnet.piketplace.com?referral='+user.username" style="background-color: #f0f0f0;width: 300px;border-radius: 5px;" disabled>
                            &nbsp;
                            <i @click="copyText" class="fa fa-copy">&nbsp;{{$t('message.copy')}}</i>
                        </template>
                    </i18n-t>
                </div> -->
                <input type="hidden" name="">
                <Adsense v-if="activate_google_ads"
                    data-ad-client="ca-pub-3962442438023665"
                    data-ad-slot="3809835226" data-full-width-responsive="true">
                </Adsense>
                
                <form class="content mb-0" id="produit-form" enctype="multipart/form-data">
                    <!-- <h3>{{ $t('message.publish') }}</h3> -->
                    <div class="pt-2 pb-4">
                        <img class="tw:inline" v-if="userForm.avatar!='site_images/pi.png'" id="avatar" :src="userForm.avatar" style="width: 80px;height: 80px;object-fit: cover;border-radius: 50%;" alt="No avatar">
                        <img class="tw:inline" v-else id="avatar" src="/site_images/default_avatar.png" style="width: 100px;height: 100px;object-fit: cover;border-radius: 50%;" alt="No avatar">
                        <input id="file_avatar" type="file" v-on:change="onFileChangeAvatar" name="" style="display: none;" accept="image/jpeg, image/gif, image/png">
                        <i @click="choosing_avatar" class="fa fa-edit color-green-dark fa-2x"></i>
                    </div>
                    <div class="input-style has-borders validate-field mb-4">
                        <input type="text" class="form-control validate-name" id="firstname" :placeholder="$t('message.profilForm.firstname')" v-model="userForm.firstname" maxlength="40">
                        <label for="form1" class="color-highlight">{{ $t('message.profilForm.firstname') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                    </div>
                    <div class="input-style has-borders validate-field mb-4">
                        <input type="text" class="form-control validate-name" id="lastname" :placeholder="$t('message.profilForm.lastname')" v-model="userForm.lastname" maxlength="40">
                        <label for="form1" class="color-highlight">{{ $t('message.profilForm.lastname') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                    </div>
                    <div class="input-style has-borders validate-field mb-4">
                        <input type="text" maxlength="15" class="form-control validate-name" id="shop_name" :placeholder="$t('message.shopForm.shop_name')" v-model="userForm.shop_name">
                        <label for="form1" class="color-highlight">{{ $t('message.shopForm.shop_name') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                    </div>
                    <!-- <span>Gender</span>
                    <div class="input-style has-borders validate-field mb-4">
                        <select name="gender" id="gender">
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="U">Unspecified</option>
                        </select>
                    </div> -->
                    <span>{{$t('message.profilForm.my_country')}}</span>
                    <div>
                        <div @click="call_select_country_my_country" style="background-color: #e9ecef;padding: 5px;border-radius: 5px;margin-bottom: 10px;display: inline-block;width: 100%;">
                            <label v-if="userForm.user_country" class="color-piketplace" style="margin-left: 2px;">{{ userForm.user_country.name }}</label>
                            <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country') }}</label>
                            <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                        </div>
                    </div>
                    <span>{{$t('message.phone_number')}}</span>
                    <div>
                        <div @click="call_select_country_phone_code" class="input-style has-borders validate-field mb-4" style="display: inline-block;width: 30%;">
                            <input type="text" maxlength="15" class="form-control validate-name" id="shop_name" placeholder="Code" v-model="userForm.phone_code" readonly>
                            <label for="form1" class="color-highlight">Code</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                        </div>
                        <div class="input-style has-borders validate-field mb-4" style="display: inline-block;width: 70%;">
                            <input type="text" inputmode="decimal" maxlength="15" class="form-control validate-name" id="shop_name" :placeholder="$t('message.phone_number')" v-model="userForm.phone_number">
                            <label for="form1" class="color-highlight">{{ $t('message.phone_number') }}</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                        </div>
                    </div>
                    <div @click="update" :loading="isLoading"
                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                        {{ $t('message.profilForm.save') }}
                    </div>
                </form>
                <div class="content mb-0" id="email-form">
                    <div class="input-style has-borders validate-field mb-0" style="margin-bottom: 0!important;">
                        <input type="email" maxlength="50" class="form-control validate-name" id="email" :placeholder="$t('message.profilForm.email')" v-model="email">
                        <label for="email" class="color-highlight">{{$t('message.profilForm.email')}}</label>

                        <!-- <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i> -->
                    </div>
                    <em style="font-size: 11px">
                        {{$t('message.profilForm.email_for_notifications')}}
                    </em>
                    <!-- <VueLoadingButton :disabled="email==user.email" @click.native="updateEmail" :loading="isLoading" :styled="true"
                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                        {{ $t('message.verify_email') }}
                    </VueLoadingButton> -->
                    <button :disabled="email==user.email" @click="updateEmail" class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;width: 100%">
                        {{ $t('message.verify_email') }}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" id="breathing">
                <img src="/site_images/Piketplace.png" style="width: 50%;">
            </div>
            <div v-else>
                <div style="text-align: center;">
                    {{$t('message.you_logged_out_click_to_login')}}
                </div>
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
        </div>
        <!-- <div v-if="saving || connecting || disconnecting" class="loader-background" style="">
            <div style="text-align: center;width: 100%;margin-top: 150px;">
                <img src="/site_images/transparent-gif/loading3.gif" style="width: 75px;margin-top: 20px;border-radius: 10%;">
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    //import { Dropzone } from "dropzone";
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import locales from '../locales/datepicker-locales.js'

    import SelectCountry from '../components/SelectCountry.vue'

    export default{
      components: {
        //Header,
        SelectCountry,
      },
      data: function () {
        return {
          errors: [],
          email: '',
          set_for: '',
          isLoading: false,
          userForm: {},
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'saving', 'selected_country', 'activate_google_ads']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.email = this.user.email
            this.userForm = this.user
            this.$functions.scrollToTop();
        },
        methods: {
            ...mapActions(useStore, ['login', 'setUserCountry', 'setSelectedCountry']),
            copyText() {
                var copyText = document.getElementById("referral_link");

              // Select the text field
              copyText.select();
              copyText.setSelectionRange(0, 99999); // For mobile devices

               // Copy the text inside the text field
              navigator.clipboard.writeText(copyText.value);
              // Alert the copied text
              //alert("Copied the text: " + copyText.value);
              this.$functions.msg_box(this, 'success', 'Info', this.$t('message.link_copied'))
            },
            choosing_avatar() {
                $( "#file_avatar" ).trigger( "click" );
            },
            onFileChangeAvatar(e) {
                //console.log(e.target.files[0]);
                this.filename_avatar = "Selected File: " + e.target.files[0].name;
                this.file_avatar = e.target.files[0];
                $( "#avatar" ).attr("src", URL.createObjectURL(this.file_avatar));
                //console.log(this.form);
            },
            selected_one(newVal){
                if (newVal === undefined) {
                    return
                }
                if (this.user && this.user.username == "djedje00") {
                    //alert("selected_country "+JSON.stringify(newVal)+"-"+JSON.stringify(oldVal))
                }
                console.log('profil selected_country', newVal)
                if (this.set_for=="phone_code") {
                    if (this.user && this.user.username == "djedje00") {
                        //alert("in phone_code")
                    }
                    if (newVal!==null) {
                        let code = newVal.phone_code
                        if (!code.includes('+')) {
                            code = "+"+newVal.phone_code
                        }
                        this.userForm.phone_code = code
                        this.set_for=""
                    }
                }
                if (this.set_for=="my_country") {
                    if (this.user && this.user.username == "djedje00") {
                        //alert("in my_country")
                    }
                    this.userForm.user_country = newVal
                    this.set_for=""
                }
            },
            call_select_country_phone_code(){
                this.set_for='phone_code'
                this.$show_modal.show_modal({id: 'select-country'})
                //this.setSelectedCountry(null)
            },
            call_select_country_my_country(){
                this.set_for='my_country'
                this.$show_modal.show_modal({id: 'select-country'})
                //this.setSelectedCountry(null)
            },
            update() {
                let phone_code = this.userForm.phone_code=='' || this.userForm.phone_code==null?'':this.userForm.phone_code;
                let phone_number = this.userForm.phone_number=='' || this.userForm.phone_number==null?'':this.userForm.phone_number;
                if (phone_code=="" || phone_number=="") {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t('message.set_phone_code_and_phone_number'))
                    return
                }
                const config = {
                    headers: {
                    'content-type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    }
                }
                //$('#preloader').removeClass('preloader-hide')
                this.saving = true;
                let formData = new FormData();
                formData.append('avatar', this.file_avatar);
                
                let firstname = this.userForm.firstname=='' || this.userForm.firstname==null?'':this.userForm.firstname;
                let lastname = this.userForm.lastname=='' || this.userForm.lastname==null?'':this.userForm.lastname;
                let shop_name = this.userForm.shop_name=='' || this.userForm.shop_name==null?'':this.userForm.shop_name;
                let email = this.userForm.email=='' || this.userForm.email==null?'':this.userForm.email;

                formData.append('firstname', firstname);
                formData.append('lastname', lastname);
                formData.append('shop_name', shop_name);
                formData.append('phone_code', phone_code);
                formData.append('phone_number', phone_number);
                formData.append('email', email);
                formData.append('pi_users_id', this.userForm.id);
                formData.append('user_country', JSON.stringify(this.userForm.user_country));
                console.log('formData', formData);
                axios.post('/profil', formData, {//
                    headers: {
                        //"Content-type": "application/json",
                        "Content-type": "multipart/form-data",
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    }
                })
                .then(res => {
                    this.saving = false;
                    console.log('profil', res.data)
                    if (res.data.status === true) {
                        this.userForm = this.user
                        //this.setUserCountry(this.user.user_country)
                        this.$functions.msg_box(this, 'success', 'Info', this.$t('message.saved'))
                    } else if(res.data.message && res.data.message.email.includes("email_exists")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_exists'))
                    } else if(res.data.message && res.data.message.email.includes("email_format_incorrect")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_format_incorrect'))
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
            },
            async updateEmail() {
                if (this.user.remainingTimeEmailVerification>0) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.remaining_time_for_new_email_validation', {time: this.user.remainingTimeEmailVerification}))
                    return;
                }
                this.saving = true
                let user_id = this.user.id;
                await axios.post('/send-email-validation', {email:this.email})
                .then(res => {
                    this.saving = false
                    if (res.data.status === true) {
                        //this.$functions.msg_box(this, 'success', 'Info', this.$t('message.email_send_with_code'))
                        this.$router.push({name: 'email-verification-code', params: {email: this.email}})
                    } else if(res.data.message && res.data.message.email.includes("email_required")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_required'))
                    } else if(res.data.message && res.data.message.email.includes("email_exists")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_exists'))
                    } else if(res.data.message && res.data.message.email.includes("email_format_incorrect")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_format_incorrect'))
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(err => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            }
        },
        watch: {
            /*selected_country(newVal, oldVal){
                if (newVal === undefined) {
                    return
                }
                if (this.user && this.user.username == "djedje00") {
                    //alert("selected_country "+JSON.stringify(newVal)+"-"+JSON.stringify(oldVal))
                }
                console.log('profil selected_country', newVal)
                if (this.set_for=="phone_code") {
                    if (this.user && this.user.username == "djedje00") {
                        //alert("in phone_code")
                    }
                    if (newVal!==null) {
                        let code = newVal.phone_code
                        if (!code.includes('+')) {
                            code = "+"+newVal.phone_code
                        }
                        this.userForm.phone_code = code
                        this.set_for=""
                    }
                }
                if (this.set_for=="my_country") {
                    if (this.user && this.user.username == "djedje00") {
                        //alert("in my_country")
                    }
                    this.userForm.user_country = newVal
                    this.set_for=""
                }
                this.setSelectedCountry(undefined)
            },*/
            'userForm.phone_number': function (newVal, oldVal){
                if (newVal===null) {
                    return
                }
                if (this.userForm.phone_number===null) {
                    this.userForm.phone_number = ""
                }
                // Remove any non-numeric characters except the dot
                this.userForm.phone_number = this.userForm.phone_number.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.userForm.phone_number.match(/\./g);
                if (dots && dots.length > 1) {
                    this.userForm.phone_number = this.userForm.phone_number.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let amountTab = newVal.toString().split('.')
                if (amountTab[1] && amountTab[1].length>7) {
                    this.userForm.phone_number = oldVal
                }
            },
        },
    }
</script>

<style scoped>
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
