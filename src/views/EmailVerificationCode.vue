<template>
    <div>
        <Header ref="header" pageTitle="message.email_verification" :hide_settings_icon="true"/>
        <div v-show="!isLoading" class="page-content" style="margin-top: -10px;">
            <span @click="goBack()" style="padding: 0 10px;cursor: pointer;margin-top: -77px;">
                <i class="fas fa-arrow-left font-21" style="margin: auto;padding: 0 10px;background-color: #f0f0f0;border-radius: 3px;"></i>
            </span>
            <div class="card card-style" style="min-height: 400px;padding-top: 40px;">
                <h5 style="text-align: center;" class="color-piketplace">{{$t('message.email_verification_message')}}</h5>
                <form class="content mb-5" id="produit-form">
                    <div class="input-style has-borders validate-field mb-1" style="margin-bottom: 0!important;">
                        <input type="number" maxlength="50" class="form-control validate-name" id="code" :placeholder="$t('message.enter_verification_code')" v-model="code">
                        <label for="code" class="color-highlight">{{$t('message.enter_verification_code')}}</label>

                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                    </div>
                </form>
                <div style="width: 100%;text-align: center;padding-top: 0px;">
                    <a @click="goBack" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace-outline" style="min-width: 100px;margin: 5px;">
                        {{$t('message.go_back')}}
                    </a>
                    <button :disabled="code==''" @click="setEmailValidation" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: 5px;">
                        {{$t('message.verify')}}
                    </button>
                </div>
            </div>
        </div>
        <div v-if="isLoading" id="breathing">
            <img src="/site_images/Piketplace.png" style="width: 50%;">
        </div>
        <div v-if="!isLoggedIn" class="loader-background" style="">
            <div style="width: 100%;text-align: center;padding-top: 100px;">
                <button @click="isLoading=true;login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in_first')}}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data: function () {
        return {
          code: '',
          email: '',
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'maintenance_mode', 'saving']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('prevRoute', this.prevRoute)
            this.email = this.$route.params.email;
            
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }            
            //this.$functions.scrollToTop()
        },
        methods: {
            ...mapActions(useStore, ['login']),
            setEmailValidation() {
                this.saving = true;
                let data = {email: this.email,code: this.code}
                axios.post('/set-email-validation', data, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    this.saving = false;
                    console.log('res', res.data)
                    if (res.data.status === true) {
                        let msg = this.$t('message.email_verified_successfully')
                        this.$functions.msg_box(this, 'success', this.$t('message.info'), msg, '/profil')
                    } else if(res.data.message == "email_code_expired") {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_code_expired'))
                    } else if(res.data.message == "incorrect_email_code") {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.incorrect_email_code'))
                    } else if(res.data.message && res.data.message.email.includes("email_format_incorrect")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_format_incorrect'))
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            goBack() {
                // Go back one step in the browser history
                this.$router.back();
                //this.$router.go(-1);
                //alert('rf')
            }
        }
    }
</script>

<style scoped>
    #dropzone{
        border-radius: 10px;
        border-width: 1px;
        display: block;
        width: 900px;
        height: 50px;
    }


    .error-message {
      display: none;
      color: red;
    }
    .border-error{
        border: 1px solid red!important;
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
