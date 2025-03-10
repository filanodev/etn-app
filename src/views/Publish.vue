<template>
    <div>
        <Header ref="header" :pageTitle="pageTitle" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: 64px;">
            <Adsense v-if="activate_google_ads"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div v-show="!isLoading" class="card card-style" style="margin-top: 20px;">
                <form class="content mb-0" id="produit-form" v-if="publish_form!=undefined">
                    <div @click="$show_modal.show_modal({id: 'select-category'})" style="background-color: #e9ecef;padding: 10px;border-radius: 10px;margin-bottom: 20px;" :class="errors_obj.category_required && selected_category==null?'border-error':''">
                        <i v-if="selected_category!==null" id="category_selected_img" v-for="icon in selected_category.icons.split(';')" :class="icon" style=""></i>
                        <label v-if="selected_category==null" id="category_selected_label" for="form5" class="color-piketplace" style="margin-left: 22px;">{{ $t('message.select_category') }}</label>
                        <label v-else id="category_selected_label" for="form5" class="color-piketplace" style="margin-left: 22px;">{{$t('message.categories.'+selected_category.code)}}</label>
                        <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                        <input type="hidden" id="category_selected_id">
                        <div id="required-categories_id" style="color: red;display: none;">{{ $t('message.required.categories_id') }}</div>
                    </div>
                    <div class="input-style has-borders validate-field mb-4">
                        <input v-on:input="hide_error_field('libelle')" type="text" class="form-control validate-name libelle" :class="errors_obj.libelle_required && publish_form.libelle==''?'border-error':''" id="libelle" :placeholder="$t('message.publishForm.libelle')" v-model="publish_form.libelle" maxlength="40" style="">
                        <label for="libelle" class="color-piketplace">{{ $t('message.publishForm.libelle') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <div id="required-libelle" style="color: red;display: none;">{{ $t('message.required.libelle') }}</div>
                        <div id="length-libelle" style="color: red;display: none;">{{ $t('message.required.libelle') }}</div>
                    </div>
                    <SwitchButton id="is_digital" :label="$t('message.publishForm.is_digital')" v-model:checked="publish_form.is_digital"/>
                    <!-- <div class="" style="width: 100%;">
                        <div class="pt-1">
                            <label for="is_digital" class="font-600 font-14" style="cursor: pointer;">{{ $t('message.publishForm.is_digital') }}</label>
                        </div>
                        <div class="ms-auto me-4 pe-2">
                            <div class="custom-control ios-switch">
                                <input type="checkbox" class="ios-input" id="is_digital" v-model="publish_form.is_digital">
                                <label for="is_digital" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div> -->
                    <p style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 0 0px 10px;">
                        <i class="fas fa-info-circle" style="color: #000;"></i>
                        {{ $t('message.publishForm.digital_product_message') }}
                    </p>
                    <div v-show="publish_form.is_digital" class="input-style has-borders validate-field mb-4" style="width: 100%;display: inline-block;padding-right: 5px;">
                        <input type="text" inputmode="decimal" class="form-control validate-name" :class="errors_obj.price_required && publish_form.price==''?'border-error':''" id="form1" :placeholder="$t('message.publishForm.prix')" v-model="publish_form.price" required="">
                        <label for="form1" class="color-piketplace">{{ $t('message.publishForm.prix') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <div id="required-price" style="color: red;display: none;">{{ $t('message.required.price') }}</div>
                        <div id="type-price" style="color: red;display: none;">{{ $t('message.type.price') }}</div>
                    </div>
                    <div v-show="!publish_form.is_digital" class="input-style has-borders validate-field mb-4" style="width: 50%;display: inline-block;padding-right: 5px;">
                        <input type="text" inputmode="decimal" class="form-control validate-name" :class="errors_obj.price_required && publish_form.price==''?'border-error':''" id="form1" :placeholder="$t('message.publishForm.prix')" v-model="publish_form.price" required="">
                        <label for="form1" class="color-piketplace">{{ $t('message.publishForm.prix') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <div id="required-price" style="color: red;display: none;">{{ $t('message.required.price') }}</div>
                        <div id="type-price" style="color: red;display: none;">{{ $t('message.type.price') }}</div>
                    </div>
                    <div v-show="!publish_form.is_digital" class="input-style has-borders validate-field mb-4" style="width: 50%;display: inline-block;padding-left: 5px;">
                        <input type="text" inputmode="numeric" class="form-control validate-name" :class="errors_obj.quantity_required && publish_form.quantity==''?'border-error':''" id="form1" :placeholder="$t('message.publishForm.instock')" v-model="publish_form.quantity" required="">
                        <label for="form1" class="color-piketplace">{{ $t('message.publishForm.enstock') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <div id="required-quantity" style="color: red;display: none;">{{ $t('mepublish_formssage.required.quantity') }}</div>
                        <div id="type-quantity" style="color: red;display: none;">{{ $t('message.type.quantity') }}</div>
                    </div>
                    <div class="input-style has-borders no-icon mb-4">
                        <textarea idpublish_form="form7" :placeholder="$t('message.publishForm.description')" maxlength="500" v-model="publish_form.description" :class="errors_obj.description_required && publish_form.description==''?'border-error':''"></textarea>
                        <label for="form7" class="color-piketplace">{{ $t('message.publishForm.description') }}</label>
                    </div>
                    <!-- <div :class="errors_obj.country_required && form.country_code==''?'border-error':''" data-menu="select-country" style="background-color: #e9ecef;padding: 10px;border-radius: 10px;margin-bottom: 20px;" @click="setCallerId('pc')">
                        <label v-if="form.productCountry" class="color-piketplacpublish_forme" style="margin-left: 2px;">{{ form.productCountry.name }}</label>
                        <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country') }}</label>
                        <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                        <div id="pc_required-country_code" style="color: red;display: none;">{{ $t('message.required.countries_id') }}</div>
                    </div> -->
                    <strong>{{$t('message.product_address')}}</strong>
                    <div>
                        <div style="padding-right: 5px;margin-bottom: 10px;display: inline-block;width: 100%;">
                            <div :class="errors_obj.country_required && publish_form.country_code==''?'border-error':''" @click="$show_modal.show_modal({id: 'select-country-city'});setCallerId('pc')" style="background-color: #e9ecef;border-radius: 5px;padding: 10px;">
                                <label v-if="publish_form.productCountry" class="color-piketplace" style="margin-left: 2px;">{{ publish_form.productCountry.name+' - '+(publish_form.city?publish_form.city:$t('message.everywhere_in_country')) }}</label>
                                <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country_city') }}</label>
                                <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-style has-borders validate-field mb-4">
                        <input v-on:input="hide_error_field('address')" type="text" class="form-control validate-name" :class="errors_obj.address_required && publish_form.address==''?'border-error':''" id="form1" :placeholder="$t('message.publishForm.adresse')" v-model="publish_form.address" maxlength="100">
                        <label for="form1" class="color-piketplace">{{ $t('message.publishForm.adresse') }}</label>
                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                        <div id="required-address" style="color: red;display: none;">{{ $t('message.required.address') }}</div>
                        <div id="length-address" style="color: red;display: none;">{{ $t('message.required.address') }}</div>
                    </div>

                    <div class="input-style has-borders validate-field mb-1" style="margin-bottom: 0!important;">
                        <input type="email" maxlength="50" class="form-control validate-name" id="email" :placeholder="$t('message.profilForm.email')" v-model="publish_form.email">
                        <label for="email" class="color-highlight">{{$t('message.profilForm.email')}}</label>

                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                        <i class="fa fa-check disabled valid color-green-dark"></i>
                    </div>
                    <em style="font-size: 11px">
                        {{$t('message.profilForm.email_for_notifications')}}
                    </em>

                    <div v-if="!publish_form.is_digital" style="padding: 10px;margin-bottom: 10px;background-color: #f5f5f5;border-radius: 5px;">
                        <span style="font-size: 14px;font-weight: bold;">{{$t('message.shipping_zones_and_fees')}}</span>
                        <!-- <span style="padding: 3px 10px;" class="btn bg-blue-dark" @click="add">Add</span> -->
                        <div class="content mt-1 mb-2" style="margin: 5px 10px 15px 10px">
                            <!-- <p class="font-600 mb-n1 color-piketplace">Call Us</p>
                            <h1 class="vcard-title font-24 font-700 text-capitalize">Phone</h1> -->
                            <div v-for="zone, index in publish_form.shipping_zone" class="vcard-field" style="line-height: 22px;">
                              <strong>{{zone.country_name}}, {{zone.city?zone.city:$t('message.everywhere_in_country')}}</strong>
                              <a><span v-if="zone.city">{{zone.zone!=""?zone.zone:(zone.city!=""?zone.city:zone.country_name)}}<br></span><span v-if="zone.fee!=''">{{$t('message.shipping_cost', {'amount': $functions.amount_format(zone.fee, $currency)})}}</span></a>
                              <i class="fa fa-trash color-red-dark mt-n2 opacity-1" @click="deleteZonePaidShipping(zone.index)"></i>
                            </div>
                        </div>
                        <a v-show="!add_shipping_zone_mode" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace-outline" @click="add_shipping_zone_mode=true" style="font-size: 12px;">{{$t('message.add')}}</a>
                        <fieldset v-show="add_shipping_zone_mode" style="padding-top: 10px;">
                            <div style="padding-right: 5px;margin-bottom: 10px;display: inline-block;width: 100%;">
                                <div @click="$show_modal.show_modal({id: 'select-country-city'});setCallerId('szc')" style="background-color: #e9ecef;padding: 10px;border-radius: 5px;">
                                    <label v-if="shippingZoneCountryData" class="color-piketplace" style="margin-left: 2px;">{{ shippingZoneCountryData.name+' - '+shippingZoneCountryData.city_label }}</label>
                                    <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country_city') }}</label>
                                    <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                                </div>
                            </div>
                            <div v-if="shippingZoneCountryData && shippingZoneCountryData.city" style="padding-right: 5px;display: inline-block;width: 50%;">
                                <div class="input-style has-borders validate-field mb-4" style="">
                                    <input id="szc_country_text_zone" type="text" class="form-control validate-name" :placeholder="$t('message.zone')" v-model="publish_form.tmp_s_zone" required="" style="height: 43px;border-radius: 5px!important;">
                                    <label for="szc_country_text_zone" class="color-piketplace">{{ $t('message.zone') }}</label>
                                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                                    <i class="fa fa-check disabled valid color-green-dark"></i>
                                </div>
                            </div>
                            <div style="padding-left: 5px;display: inline-block;" :style="!shippingZoneCountryData || !shippingZoneCountryData.city?'width: 100%;':'width: 50%;'">
                                <div class="input-style has-borders validate-field mb-4" style="">
                                    <input type="text" inputmode="decimal" class="form-control validate-name" :placeholder="$t('message.shipping_cost')+'('+$currency+')'" v-model="publish_form.tmp_fee" required="" style="height: 43px;border-radius: 5px!important;">
                                    <label for="form1" class="color-piketplace">{{$t('message.shipping_cost')+'('+$currency+')'}}</label>
                                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                                    <i class="fa fa-check disabled valid color-green-dark"></i>
                                </div>
                            </div>
                            <p style="background-color: khaki;color: black;padding: 5px;border-radius: 5px;margin-top: 0;margin-bottom: 10px;">
                                <i class="fas fa-info-circle" style="color: #000;"></i>
                                {{$t('message.publishForm.message_save_zone')}} 
                            </p>
                            <a class="btn btn-3d btn-m mb-1 rounded-xl text-uppercase font-700 shadow-s border-red-dark bg-red-light" @click="shipping_form_verification">{{$t('message.profilForm.save')}}</a>
                            <!-- <span style="padding: 4px;" class="btn" @click="remove(key)"><i class="fa fa-trash color-red-dark"></i></span> -->
                        </fieldset>
                    </div>

                    <!-- <div v-if="!publish_form.is_digital" class="d-flex no-effect" data-trigger-switch="free_shipping" data-bs-toggle="collapse" role="button" aria-expanded="false">
                        <div class="pt-1">
                            <label class="font-600 font-14" style="cursor: pointer;">{{ $t('message.publishForm.free_shipping') }}</label>
                        </div>
                        <div class="ms-auto me-4 pe-2">
                            <div class="custom-control ios-switch">
                                <input type="checkbox" class="ios-input" id="free_shipping" v-model="publish_form.free_shipping">
                                <label for="free_shipping" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div> -->
                    <SwitchButton v-if="!publish_form.is_digital" id="free_shipping" :label="$t('message.publishForm.free_shipping')" v-model:checked="publish_form.free_shipping"/>
                    <div v-show="publish_form.free_shipping && !publish_form.is_digital" style="padding: 10px;margin-bottom: 10px;background-color: #f5f5f5;border-radius: 5px;">
                        <span style="font-size: 14px;font-weight: bold;">{{$t('message.free_shipping_zones')}}</span>
                        <!-- <span style="padding: 3px 10px;" class="btn bg-blue-dark" @click="add">Add</span> -->
                        <div class="content mt-3 mb-2">
                            <!-- <p class="font-600 mb-n1 color-piketplace">Call Us</p>
                            <h1 class="vcard-title font-24 font-700 text-capitalize">Phone</h1> -->
                            <div v-for="zone, index in publish_form.free_shipping_zone" class="vcard-field" style="line-height: 22px;">

                              <strong>{{zone.country_name}}, {{zone.city?zone.city:$t('message.everywhere_in_country')}}</strong>
                              <a v-if="zone.city">{{zone.zone?zone.zone:(zone.city!=""?zone.city:zone.country_name)}}</a>
                              <a v-else>{{$t('message.everywhere_in_country')}}</a>
                              <i class="fa fa-trash color-red-dark mt-n2 opacity-1" @click="deleteZoneFreeShipping(zone.index)"></i>
                            </div>
                        </div>
                        <a v-show="!add_free_shipping_zone_mode" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace-outline" @click="add_free_shipping_zone_mode=true" style="font-size: 12px;">{{$t('message.add')}}</a>
                        <fieldset v-show="add_free_shipping_zone_mode" style="padding-top: 10px;">
                            <div style="padding-right: 5px;margin-bottom: 10px;display: inline-block;width: 100%;">
                                <div @click="$show_modal.show_modal({id: 'select-country-city'});setCallerId('fszc')" style="background-color: #e9ecef;padding: 10px;border-radius: 5px;">
                                    <label v-if="freeShippingZoneCountryData" class="color-piketplace" style="margin-left: 2px;">{{ freeShippingZoneCountryData.name+' - '+freeShippingZoneCountryData.city_label }}</label>
                                    <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country_city') }}</label>
                                    <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                                </div>
                            </div>
                            <div v-if="freeShippingZoneCountryData && freeShippingZoneCountryData.city" class="input-style has-borders validate-field mb-4" style="display: block;">
                                <input id="fszc_country_text_zone" type="text" class="form-control validate-name" :placeholder="$t('message.zone')" v-model="publish_form.tmp_fs_zone" required="" style="height: 43px;border-radius: 5px!important;">
                                <label for="fszc_country_text_zone" class="color-piketplace">{{ $t('message.zone') }}</label>
                                <i class="fa fa-times disabled invalid color-red-dark"></i>
                                <i class="fa fa-check disabled valid color-green-dark"></i>
                            </div>
                            <p style="background-color: khaki;color: black;padding: 5px;border-radius: 5px;margin-top: 0;margin-bottom: 10px;">
                                <i class="fas fa-info-circle" style="color: #000;"></i>
                                {{$t('message.publishForm.message_save_zone')}} 
                            </p>
                            <a class="btn btn-3d btn-m mb-1 rounded-xl text-uppercase font-700 shadow-s border-red-dark bg-red-light" @click="free_shipping_form_verification">{{$t('message.profilForm.save')}}</a>
                            <!-- <span style="padding: 4px;" class="btn" @click="remove(key)"><i class="fa fa-trash color-red-dark"></i></span> -->
                        </fieldset>
                    </div>
                    <!-- <UseDropzoneDemo /> -->
                    <DropFile :files="existingFiles" :files_uploaded_response="publish_form.photos" @files-uploaded="getFilesEmitted" />
                    <div id="required-image" style="color: red;display: none;">{{ $t('message.required.image') }}</div>

                    <SwitchButton id="product_available" class="mt-3" style="line-height: 16px;" :label_font_size="font-11" :required="true" :label="$t('message.i_agree_product_availability')" v-model:checked="product_available"/>
                    
                    <!-- <button type="submit" style="margin-top: 20px;"  @click.prevent="save" class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s bg-highlight">
                        {{ $t('message.publish') }}
                    </button> -->
                    <button @click="save" :disabled="!uploadDone"
                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s" :class="uploadDone?'btn-dark-piketplace':'btn-dark-piketplace-plus'" style="margin-top: 10px;">
                        {{ isUpdate?$t('message.update'):$t('message.publish') }}
                    </button>
                </form>
            </div>
            <div v-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
            <div v-else-if="!isLoggedIn" class="loader-background" style="">
                <div style="width: 100%;text-align: center;padding-top: 100px;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
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
    //import UseDropzoneDemo from '../components/UseDropzoneDemo.vue'
    //import { Dropzone } from "dropzone";
    //import VueLoadingButton from "vue-loading-button";
    import axios from 'axios';
    import { v4 as uuidv4 } from 'uuid';

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import DropFile from "../components/DropFile.vue";
    import SelectCountry from '../components/SelectCountry.vue'
    import SwitchButton from '../components/SwitchButton.vue'
    //import AdSense from '../components/AdSense.vue'

    //import file_countries_cities from "../Countries-States-Cities/countries+cities.json";

    /*import file_countries from "../Countries-States-Cities/countries.json";
    import file_states from "../Countries-States-Cities/states.json";
    import file_cities from "../Countries-States-Cities/cities.json";*/

    export default{
        name: "Publish",
        components: {
            DropFile, SelectCountry,
            SwitchButton,
            //AdSense
        },
        props: {
            product: {
                type: Object,
                defaut: null,
            }
        },
        data: function () {
        return {
          publish_form: {
              categories_id: "",
              libelle: "",
              is_digital: false,
              price: "",
              price_str: "",
              quantity: "",
              description: "",
              country_code: "",
              address: "",
              photos: [],
              shipping_zone: [
                  /*{
                    country_code: "US",
                    country_name: "United States",
                    city: "New York",
                    zone: "New York street",
                    fee: 1
                  }*/
              ],
              free_shipping: false,
              free_shipping_zone: [
                  /*{
                    country_code: "US",
                    country_name: "United States",
                    city: "Chicago",
                    zone: "Chicago band 345"
                  }*/
              ],
              tmp_fs_zone: '',
              tmp_s_zone: '',
              tmp_fee: '',
          },
          product_available: false,
          add_shipping_zone_mode: false,
          add_free_shipping_zone_mode: false,
          count: 1,
          zone_object: {
            countries_id: 0,
            countries_name: "",
            zone: "",
          },
          //isLoading: false,
          errors: [],
          errors_obj: {},
          //user: null,
          function_to_execute: "",
          connected: false,
          existingFiles: [],
          seleteced_tmp: '',
          shippingZoneCountryData: null,
          freeShippingZoneCountryData: null,
          isUpdate: false,
          in_penalties: false,
          isLoading: false,
          agreementsAlreadyDisplayed: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'saving', 'selected_category', 'selected_country', 'selected_city', 'selected_country_city', 'uploadDone', 'isPiBrowser', 'pibrowser_verification', 'countries_db', 'agreements', 'delivery_penalties_limit', 'country_cities', 'show_all_label', 'header_type', 'activate_google_ads']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        beforeUnmount() {
        },
        mounted() {
            //console.log('in publish', this.countries, this.isLoading)
            //this.adsenseAddLoad()
            this.countries = this.countries_db
            this.show_all_label = false
            if (this.isLoggedIn) {
                if (!this.is_user_profil_set()) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.complete_profil_first"), '/profil')
                    return
                }
                if (this.publish_form.email=='' || this.publish_form.email==null) {
                    this.publish_form.email = this.user.email
                }
                this.set_in_penalties()
                if (this.agreements && !this.in_penalties) {
                    this.agreementsAlreadyDisplayed = true
                    this.$functions.agreement(this, this.agreements, 'seller')
                }
            }

            this.initLoaders()
            this.uploadDone = true
            
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            
            this.files_uploaded = [];
            if (this.product == null) {
                this.pageTitle = 'message.publish';
                this.header_type = "header_with_cart"
                this.selected_category = null
            }else{
                this.isUpdate = true
                this.pageTitle = 'message.update';
                this.header_type = "header_with_back_btn"
                this.product.photos = []
                this.product.price = this.product.price_str
                this.publish_form = this.product
                console.log('formmm', this.publish_form)
                this.selected_category = this.product.category
                this.product.images.forEach((val, index)=>{
                    console.log('this.product.images.forEac', val, index)
                    this.existingFiles.push(new File([""], val.lien))
                    this.product.photos.push(val.lien)
                })
                let countries = this.countries
                this.publish_form.productCountry = countries.find((val, index) => {
                    return val.iso2 == this.product.country_code
                })
            }
            
            /*$('.link').on('click', function() {
                if (!$(this).hasClass('active-nav')) {
                    $('.link').removeClass('active-nav')
                    if (!this.isUpdate) {$(this).addClass('active-nav')}
                }
            })*/

            ///////////////////////////////////////////////////////////
            
            
            //////////////////////////////////////////////////////////
            /*var file = { size: 123, name: "Icon", type: "image/png" };
            var url = "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg";
            this.$refs.myVueDropzone.manuallyAddFile(file, url);*/
            console.log('Component mounted.')
            //MENU
            console.log('End.')

            //this.showPiAds('rewarded')
            //this.showPiAdsRewarded()
            
            this.$functions.scrollToTop()
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                if (newVal) {
                    this.set_in_penalties()
                    if (this.in_penalties) {return}
                    if (!this.agreementsAlreadyDisplayed && this.is_user_profil_set()) {
                        this.agreementsAlreadyDisplayed = true
                        this.$functions.agreement(this, this.agreements, 'seller')
                    }
                }
            },
            in_penalties(newVal, oldVal){
                if (newVal) {
                    this.$functions.msg_box(this, 'info', 'Penalties reached', this.$t('message.in_penalties'), -1)
                }
            },
            agreements(newVal, oldVal){
                if (newVal && this.isLoggedIn && !this.in_penalties && !this.agreementsAlreadyDisplayed && this.is_user_profil_set()) {
                    this.$functions.agreement(this, newVal, 'seller')
                }
            },
            selected_country_city(newVal, oldVal){
                console.log(newVal)
                let country = newVal.country
                let city = newVal.city
                let city_label = newVal.city_label
                if (this.seleteced_tmp == 'pc') {
                    this.publish_form.country_code = country.iso2
                    this.publish_form.productCountry = country
                    this.publish_form.city = city
                    this.publish_form.city_label = city_label
                }
                if (this.seleteced_tmp == 'szc') {
                    this.shippingZoneCountryData = country
                    this.shippingZoneCountryData.city = city
                    this.shippingZoneCountryData.city_label = city_label
                    //console.log("shippingZoneCountryData", this.shippingZoneCountryData)
                }
                if (this.seleteced_tmp == 'fszc') {
                    this.freeShippingZoneCountryData = country
                    this.freeShippingZoneCountryData.city = city
                    this.freeShippingZoneCountryData.city_label = city_label
                }

            },
            selected_country(newVal, oldVal){
                if (newVal == null) {return}
                let country = newVal
                if (this.seleteced_tmp == 'pc') {
                    this.publish_form.country_code = country.iso2
                    this.publish_form.productCountry = country
                }
                if (this.seleteced_tmp == 'szc') {
                    this.shippingZoneCountryData = country
                }
                if (this.seleteced_tmp == 'fszc') {
                    this.freeShippingZoneCountryData = country
                }
                /////////////////////////////////////////////
                if (this.seleteced_tmp == 'pc') {
                    this.publish_form.city = this.$t('message.select_city')
                }
                if (this.seleteced_tmp == 'szc') {
                    this.shippingZoneCountryData.city = this.$t('message.select_city')
                }
                if (this.seleteced_tmp == 'fszc') {
                    this.freeShippingZoneCountryData.city = this.$t('message.select_city')
                }
                /////////////////////////////////////////
                this.setSelectedCountry(null)
                this.setSelectedCity('')
            },
            selected_city(newVal, oldVal){
                if (newVal == '') {return}
                let city = newVal
                if (this.seleteced_tmp == 'pc') {
                    this.publish_form.city = city
                }
                if (this.seleteced_tmp == 'szc') {
                    this.shippingZoneCountryData.city = city!=''?city:this.$t('message.select_city')
                }
                if (this.seleteced_tmp == 'fszc') {
                    this.freeShippingZoneCountryData.city = city!=''?city:this.$t('message.select_city')
                }
                this.setSelectedCountry(null)
                this.setSelectedCity('')
            },
            'publish_form.price': function (newVal, oldVal){

                 // Remove any non-numeric characters except the dot
                this.publish_form.price = this.publish_form.price.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.publish_form.price.match(/\./g);
                if (dots && dots.length > 1) {
                    this.publish_form.price = this.publish_form.price.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let priceTab = newVal.toString().split('.')
                if (priceTab[1] && priceTab[1].length>7) {
                    this.publish_form.price = oldVal
                }
            },
            'publish_form.tmp_fee': function (newVal, oldVal){
                if (newVal==undefined) {return}
                 // Remove any non-numeric characters except the dot
                this.publish_form.tmp_fee = this.publish_form.tmp_fee.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.publish_form.tmp_fee.match(/\./g);
                if (dots && dots.length > 1) {
                    this.publish_form.tmp_fee = this.publish_form.tmp_fee.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let amountTab = newVal.toString().split('.')
                if (amountTab[1] && amountTab[1].length>7) {
                    this.publish_form.tmp_fee = oldVal
                }
            },
        },
        methods: {
            ...mapActions(useStore, ['login', 'initLoaders', 'setSelectedCountry', 'setSelectedCity', 'showPiAdsRewarded', 'showPiAds', 'is_user_profil_set']),
            setCallerId(lib){
                this.seleteced_tmp = lib
            },
            set_in_penalties(){
                if(this.delivery_penalties_limit>0 && this.delivery_penalties_limit<=this.user.delivery_penalties && this.product==null){
                    this.in_penalties = true
                }
            },
            save() {
                this.publish_form.pi_users_id = this.user.id;
                this.publish_form.pi_users_username = this.user.username;
                
                //alert(this.publish_form.price_str)
                if(this.publish_form.free_shipping_zone.length==0){
                    this.publish_form.free_shipping = false;
                }
                //this.publish_form.free_shipping_zone = [];
                //this.publish_form.free_shipping_zone.push(this.zone_object);
                if (!this.is_valid()) {
                    let messages = this.errors;
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.publishForm.error_message'))
                    return;
                }
                if (this.publish_form.photos.length == 0) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.publishForm.choose_at_least_one_image'))
                    return;
                }
                if(this.selected_category == null){
                    this.errors_obj.category_required = true
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.publishFormValidation.category_required'))
                    return
                }
                if(this.product_available === false){
                    this.$functions.msg_box(this, 'error', this.$t('message.product_availability'), this.$t('message.check_button_below_product_availability'))
                    return
                }
                //Convert scientific annotation to decimal number
                this.publish_form.price = this.$functions.scientific_annotation_to_decimal(this.publish_form.price)
                //this.publish_form.price = this.publish_form.price.replace(',', '.');
                this.publish_form.price_str = this.publish_form.price;

                this.publish_form.categories_id = this.selected_category.id;
                if (this.product==null) {
                    this.store()
                }else{
                    this.update()
                }
            },
            store() {
                this.saving = true;
                axios.post('/products', this.publish_form, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    /*console.log(res.data.errors)
                    console.log(this.$t(res.data.errors[0]))*/
                    this.saving = false;
                    if (res.data.status === true) {
                        let msg = this.$t('message.saved')
                        if (res.data.approbation == true) {
                            msg = this.$t('message.publishForm.submitted_for_approbation')
                        }
                        this.$functions.msg_box(this, 'success', this.$t('message.cart.success'), msg, '/product/'+res.data.product.id)
                    } else if(res.data.message_image =='message.publishForm.max_files_reached') {
                        this.$functions.msg_box(this, 'error', '', this.$t("message.publishForm.max_files_reached", {nb: res.data.nb}))
                    } else if(res.data.message && res.data.message=="message.price_invalid_seven_digits_exceeded") {
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message))
                    } else if(res.data.message && res.data.message=="message.shipping_fee_invalid_seven_digits_exceeded") {
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message))
                    } else if(res.data.message && res.data.message.email && res.data.message.email.includes("email_format_incorrect")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_format_incorrect'))
                    } else if(res.data.message) {
                        console.log(res.data.message)
                        this.backend_validator_message(res.data.message)
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            update() {
                this.saving = true;
                axios.put('/products/'+this.product.id, this.publish_form, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    console.log("put('/products/", res.data)
                    /*console.log(res.data.errors)
                    console.log(this.$t(res.data.errors[0]))*/
                    //$('#preloader').addClass('preloader-hide')
                    this.saving = false;
                    if (res.data.status) {
                        let msg = this.$t('message.saved')
                        if (res.data.approbation == true) {
                            msg = this.$t('message.publishForm.submitted_for_approbation')
                        }
                        this.$functions.msg_box(this, 'success', this.$t('message.cart.success'), msg, '/product/'+res.data.product.id)
                    } else if(res.data.message_image =='message.publishForm.max_files_reached') {
                        this.$functions.msg_box(this, 'error', '', this.$t("message.publishForm.max_files_reached", {nb: res.data.nb}))
                    } else if(res.data.message && res.data.message=="message.price_invalid_seven_digits_exceeded") {
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message))
                    } else if(res.data.message && res.data.message=="message.shipping_fee_invalid_seven_digits_exceeded") {
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message))
                    } else if(res.data.message && res.data.message.email && res.data.message.email.includes("email_format_incorrect")) {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.email_format_incorrect'))
                    } else if(res.data.message) {
                        console.log(res.data.message)
                        this.backend_validator_message(res.data.message)
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                }).catch(error=>{
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            backend_validator_message(message) {
                if (message.categories_id && message.categories_id.includes('category_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.category_required'))
                    return
                }
                if (message.libelle && message.libelle.includes('libelle_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.libelle_required'))
                    return
                }
                if (message.libelle && message.libelle.includes('libelle_max')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.libelle_max'))
                    return
                }
                if (message.price && message.price.includes('price_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.price_required'))
                    return
                }
                if (message.price && message.price.includes('price_regex_double')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.price_regex_double'))
                    return
                }
                if (message.price && message.price.includes('price_max')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.price_max'))
                    return
                }
                if (message.price && message.price.includes('price_not_in')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.price_not_in'))
                    return
                }
                if (message.quantity && message.quantity.includes('quantity_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.quantity_required'))
                    return
                }
                if (message.quantity && message.quantity.includes('quantity_integer')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.quantity_integer'))
                    return
                }
                if (message.quantity && message.quantity.includes('quantity_min')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.quantity_min'))
                    return
                }
                if (message.quantity && message.quantity.includes('quantity_not_in')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.quantity_not_in'))
                    return
                }
                if (message.description && message.description.includes('description_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.description_required'))
                    return
                }
                if (message.description && message.description.includes('description_max')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.description_max'))
                    return
                }
                if (message.country_code && message.country_code.includes('country_code_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.country_code_required'))
                    return
                }
                if (message.city && message.city.includes('city_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.city_required'))
                    return
                }
                if (message.address && message.address.includes('address_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.address_required'))
                    return
                }
                if (message.address && message.address.includes('address_max')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.address_max'))
                    return
                }
                if (message.photos && message.photos.includes('images_required')) {
                    this.$functions.msg_box(this, 'error', '', this.$t('message.publishFormValidation.images_required'))
                    return
                }
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
                if(this.selected_category == null){
                    this.errors_obj.category_required = true
                    return false
                }
                if(this.publish_form.libelle == ""){
                    this.errors_obj.libelle_required = true
                    return false
                }
                if(this.publish_form.libelle.length > 40){
                    this.errors_obj.libelle_length = true
                    return false
                }
                if(this.publish_form.price == ""){
                    this.errors_obj.price_required = true
                    return false
                }
                if(!this.$functions.is_decimal_not_zero(this.publish_form.price)){
                    this.errors_obj.price_type = true
                    return false
                }
                if(!this.publish_form.is_digital && this.publish_form.quantity == ""){
                    this.errors_obj.quantity_required = true
                    return false
                }
                if(!this.publish_form.is_digital && !this.$functions.is_entier_not_zero(this.publish_form.quantity)){
                    this.errors_obj.quantity_type = true
                    return false
                }
                if(this.publish_form.description == ""){
                    this.errors_obj.description_required = true
                    return false
                }
                if(this.publish_form.country_code == ""){
                    this.errors_obj.country_required = true
                    return false
                }
                /*if(this.publish_form.city == ""){
                    this.errors_obj.city_required = true
                    return false
                }*/
                if(this.publish_form.address == ""){
                    this.errors_obj.address_required = true
                    return false
                }
                if(this.publish_form.address.length > 100){
                    this.errors.push('length-address');
                }
                return true
            },
            addZonePaidShipping(){
                let country_code = this.shippingZoneCountryData.iso2
                let country_name = this.shippingZoneCountryData.name
                let city = this.shippingZoneCountryData.city
                let city_label = this.shippingZoneCountryData.city_label

                if (country_code=="") {
                  return 0;
                }

                this.publish_form.shipping_zone.push({
                    country_code: country_code,
                    country_name: country_name,
                    city: city==null?"":city,
                    zone: this.publish_form.tmp_s_zone==null?"":this.publish_form.tmp_s_zone,
                    fee: this.publish_form.tmp_fee,
                });
                this.empty_form("szc");
                this.add_shipping_zone_mode=false;
            },
            deleteZonePaidShipping(index){
                this.publish_form.shipping_zone.splice(index, 1);
            },
            addZoneFreeShipping(){
                let country_code = this.freeShippingZoneCountryData.iso2
                let country_name = this.freeShippingZoneCountryData.name
                let city = this.freeShippingZoneCountryData.city

                if (country_code=="") {
                  return 0;
                }

                this.publish_form.free_shipping_zone.push({
                    country_code: country_code,
                    country_name: country_name,
                    city: city==null?"":city,
                    zone: this.publish_form.tmp_fs_zone==null?"":this.publish_form.tmp_fs_zone,
                });
                this.empty_form("fszc");
                this.add_free_shipping_zone_mode=false;
            },
            deleteZoneFreeShipping(index){
                this.publish_form.free_shipping_zone.splice(index, 1);
            },
            shipping_form_verification(){
                let zone = this.publish_form.tmp_s_zone;

                if (this.shippingZoneCountryData == null) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.select_at_least_country'))
                  return 0;
                }
                if (!this.$functions.is_decimal_not_zero(this.publish_form.tmp_fee)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.publishForm.set_shipping_fee'))
                    return 0;
                }
                if (!this.isCompatibleRule("szc", this.publish_form.shipping_zone, zone)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.zone_exists_or_incompatible'))
                    return 0;
                }
                let message = [];
                if (this.shippingZoneCountryData.city=="") {
                    message.push(this.$t('message.address.city'));
                }
                if (this.publish_form.tmp_s_zone=="") {
                    message.push(this.$t('message.zone'));
                }
                if (this.publish_form.tmp_fee=="") {
                    message.push(this.$t('message.shipping_cost'));
                }
                message = message.join(', ');

                if (message!="") {
                    message = this.$t('message.do_you_want_to_add_without', {'param': message});
                    this.display_confirmation("addZonePaidShipping", message);
                }else{
                  this.addZonePaidShipping();
                }
            },
            free_shipping_form_verification(){                
                let zone = this.publish_form.tmp_fs_zone;

                if (this.freeShippingZoneCountryData==null) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.select_at_least_country'))
                  return 0;
                }
                if (!this.isCompatibleRule("fszc", this.publish_form.free_shipping_zone, zone)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.zone_exists_or_incompatible'))
                    return 0;
                }
                let city = this.freeShippingZoneCountryData.city
                let message = [];
                if (city=="") {
                    message.push(this.$t('message.address.city'));
                }
                if (this.publish_form.tmp_fs_zone=="") {
                    message.push(this.$t('message.zone'));
                }
                message = message.join(', ');

                if (message!="") {
                    message = this.$t('message.do_you_want_to_add_without', {'param': message});
                    this.display_confirmation("addZoneFreeShipping", message);
                }else{
                  this.addZoneFreeShipping();
                }
            },
            display_confirmation(function_to_execute, message){
                this.function_to_execute = function_to_execute;
                this.$confirm(
                  {
                    title: "Confirmation",
                    message: message,
                    button: {
                      no: this.$t('message.confirmation.no_cancel'),
                      yes: this.$t('message.confirmation.yes_continue')
                    },
                    /**
                    * Callback Function
                    * @param {Boolean} confirm
                    */
                    callback: confirm => {
                      if (confirm) {
                          if (this.function_to_execute=="addZonePaidShipping") {
                              this.addZonePaidShipping();
                          }
                          if (this.function_to_execute=="addZoneFreeShipping") {
                              this.addZoneFreeShipping();
                          }
                      }
                    }
                  }
                )
            },
            empty_form(label){
                if (label == 'szc') {
                    this.shippingZoneCountryData = null
                }
                if (label == 'fszc') {
                    this.freeShippingZoneCountryData = null
                }
                this.publish_form.tmp_fs_zone = "";
                this.publish_form.tmp_s_zone = "";
                this.publish_form.tmp_fee = "";
            },
            isCompatibleRule(label, tab, zone){
                let country_code = ''
                let country_name = ''
                let city = ""
                if (label == 'fszc') {
                    country_code = this.freeShippingZoneCountryData.iso2;
                    country_name = this.freeShippingZoneCountryData.name
                    city = this.freeShippingZoneCountryData.city
                }else if (label == 'szc') {
                    country_code = this.shippingZoneCountryData.iso2;
                    country_name = this.shippingZoneCountryData.name
                    city = this.shippingZoneCountryData.city
                }
                
                let res = tab.find(el => el.country_name==country_name && el.city==city && el.zone==zone);
                console.log(res);
                if (res) {
                    return false;
                }
                res = tab.find(el => el.country_name==country_name && el.city==city && el.zone=="");
                let res1 = tab.find(el => el.country_name==country_name && el.city=="" && el.zone=="");
                if (res || res1) {
                  return false;
                }
                return true;
            },
            getFilesEmitted(data) {
                console.log("getFilesEmitted", data, Object.values(data))
                this.publish_form.photos = data
                console.log("this.publish_form.photos", this.publish_form.photos)
                let index = this.errors.indexOf('required-image')
                this.errors.splice(index, 1)
            },
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
