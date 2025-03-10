<template>
    <div>
        <Header ref="header" pageTitle="message.applying" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: 64px;">
            <Adsense v-if="activate_google_ads" style="margin-bottom: 20px;"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226">
            </Adsense>
            <div v-if="line">
                <div class="card card-style mb-2" style="background-color: #fafafa;">
                    <ShippingCard :line_order="line" :in_apply_form="true" />
                </div>
                <div class="card card-style">
                    <form class="content mb-0" id="produit-form">
                        <div class="input-style has-borders validate-field mb-4">
                            <input v-on:input="errors_obj.fee_type=false" type="text" inputmode="decimal" class="form-control validate-name" :class="(errors_obj.fee_required && form.fee=='') || errors_obj.fee_type?'border-error':''" id="form1" :placeholder="$t('message.shipping_cost_proposal')+'('+ $currency+')'" v-model="form.fee" maxlength="40">
                            <label for="form1" class="color-piketplace">{{ $t('message.shipping_cost_proposal') }} ({{$currency}})</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                            <div id="required-fee" style="color: red;display: none;">{{ $t('message.required.fee') }}</div>
                            <div id="type-fee" style="color: red;display: none;">{{ $t('message.type.fee') }}</div>
                        </div>
                        <div class="input-style has-borders validate-field mb-4" style="width: 49%;display: inline-block;">
                            <input v-on:input="errors_obj.time_type=false" type="text" inputmode="numeric" class="form-control validate-name" :class="(errors_obj.time_required && form.time=='') || errors_obj.time_type?'border-error':''" id="form1" :placeholder="$t('message.time_to_deliver')" v-model="form.time" required="">
                            <label for="form1" class="color-piketplace">{{ $t('message.time_to_deliver') }}</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                            <div id="required-time" style="color: red;display: none;">{{ $t('message.required.time') }}</div>
                            <div id="type-time" style="color: red;display: none;">{{ $t('message.type.time') }}</div>
                        </div>
                        <div class="input-style has-borders no-icon mb-4 input-style-active" style="width: 48%;display: inline-block;">
                            <label for="form5" class="color-piketplace" style="border-radius: 5px;">{{$t('message.select')}}</label>
                            <select id="form5" v-model="form.period" v-on:input="hide_error_field('period')">
                                <option value="default" disabled="" selected="">Select</option>
                                <option value="1">{{ $t('message.time.minute') }}</option>
                                <option value="2">{{ $t('message.time.hour') }}</option>
                                <option value="3">{{ $t('message.time.day') }}</option>
                                <option value="4">{{ $t('message.time.month') }}</option>
                            </select>
                            <div id="required-period" style="color: red;display: none;">{{ $t('message.required.period') }}</div>
                            <span class="disabled"><i class="fa fa-chevron-down"></i></span>
                        </div>
                        <div @click="confirmation()"
                        class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                            {{$t('message.apply')}}
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="isLoading" style="text-align: center;">
                <img style="width: 50px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto"> {{$t('message.loading')}}
            </div>
            <div v-else-if="!isLoggedIn" class="loader-background" style="">
                <div style="width: 100%;text-align: center;padding-top: 100px;">
                    <button @click="doLogin" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in_first')}}
                    </button>
                </div>
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

    import ShippingCard from '../components/ShippingCard.vue'

    export default{
      components: {
        ShippingCard
      },
      data: function () {
        return {
          form: {
            //name: "",
            fee: "",
            time: "",
            period: "",
          },
          errors: [],
          errors_obj: {},
          id: 0,
          line: null,
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'saving', 'activate_google_ads']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.saving = false
            this.id = this.$route.params.id;
            if (this.isLoggedIn && !this.is_user_profil_set()) {
                this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.complete_profil_first"), '/profil')
                return
            }
            this.loadLineProduct(this.id);
            this.$functions.scrollToTop()
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                if (newVal && this.line.pre_order_pi_users_id==this.user.id) {
                    this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.no_apply_own_shipping'), '/shippings')
                }
                if (newVal) {
                    this.$functions.agreement(this, this.agreements, 'shipping')
                }
            },
            'form.fee': function (newVal, oldVal){

                 // Remove any non-numeric characters except the dot
                this.form.fee = this.form.fee.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.form.fee.match(/\./g);
                if (dots && dots.length > 1) {
                    this.form.fee = this.form.fee.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let feeTab = newVal.toString().split('.')
                if (feeTab[1] && feeTab[1].length>7) {
                    this.form.fee = oldVal
                }
            },
        },
        methods: {
            ...mapActions(useStore, ['login', 'is_user_profil_set']),
            doLogin(){
                this.login({confirm: this.$confirm, self: this})
            },
            loadLineProduct(id) {
                this.isLoading = true
                axios.get('/get-line', {params: {id}})
                .then(res => {
                    this.isLoading = false;
                    this.line = res.data.line;
                    console.log('this.line', this.line);
                    if (this.isLoggedIn) {
                        this.$functions.agreement(this, res.data.agreements, 'shipping')
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            invalidateForm() {
              this.errors = true;
            },
            hide_error_field(id){
                //alert('#required-'+id)
                $('#required-'+id).css('display', 'none')
                $('#length-'+id).css('display', 'none')
                $('#type-'+id).css('display', 'none')
            },
            is_valid(){
                this.errors = [];
                /*if(this.form.name == ""){
                    this.errors.push('required-name');
                }
                if(this.form.name.length > 40){
                    this.errors.push('length-name');
                }*/
                if(this.form.fee == ""){
                    //this.errors.push('required-fee');
                    this.errors_obj.fee_required = true
                    return false
                }
                if(!this.$functions.is_decimal_not_zero(this.form.fee)){
                    //this.errors.push('type-fee');
                    this.errors_obj.fee_type = true
                    return false
                }
                if(this.form.time == ""){
                    //this.errors.push('required-time');
                    this.errors_obj.time_required = true
                    return false
                }
                if(!this.$functions.is_entier_not_zero(this.form.time)){
                    //this.errors.push('type-time');
                    this.errors_obj.time_type = true
                    return false
                }
                if(this.form.period == ""){
                    //this.errors.push('required-period');
                    this.errors_obj.period_required = true
                    return false
                }
                return this.errors.length == 0;
            },
            confirmation() {
                console.log(this.user.id);
                this.form.line_orders_id = this.line.id;
                this.form.user_id = this.user.id;
                if (!this.is_valid()) {
                    let messages = this.errors;
                    for (var i = 0; i < messages.length; i++) {
                        $('#'+messages[i]).css('display', 'block')
                        //messages[i]
                    }
                    /*this.$show_modal.show_modal({
                        id:'menu-warning-modal',
                        title:this.$t('message.publishForm.error'),
                        message:this.$t('message.publishForm.error_message'),
                        btn_text:this.$t('message.Ok'),
                    });*/
                    this.$functions.msg_box(this, 'error', 'Info', this.$t('message.publishForm.error_message'))
                    return;
                }
                //////////////////////////////////////////
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            this.store()
                        }
                      }
                    }
                )
            },
            store() {
                this.saving = true;
                axios.post('/shipping_applies', this.form, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    console.log(res.data.errors);
                    /*console.log(res.data.errors)
                    console.log(this.$t(res.data.errors[0]))*/
                    //$('#preloader').addClass('preloader-hide')
                    this.saving = false;
                    if (res.data.status) {
                        /*this.$show_modal.show_modal({
                            id:'menu-success-modal',
                            title:this.$t('message.applied'),
                            message:this.$t('message.application_message'),
                            btn_text:this.$t('message.Ok'),
                        });*/
                        this.$functions.msg_box(this, 'success', this.$t('message.applied'), this.$t('message.application_message'), '/my/shipping/apply')
                    } else if(res.data.message) {
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t(res.data.message))
                    }else {
                        let messages = res.data.errors
                        for (var i = 0; i < messages.length; i++) {
                            $('#'+messages[i]).css('display', 'block')
                            //messages[i]
                        }
                        //this.$show_modal.show_modal('menu-warning-1');
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(err => {
                    this.saving = false;
                    this.not_found = true;
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                })
            },
        }
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
