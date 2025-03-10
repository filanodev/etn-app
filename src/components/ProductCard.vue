<template>
  <div style="line-height: 14px;margin-bottom: 0;">      
    	<div class="tw:w-full tw:relative" style="" @click="$router.push({ name: 'product', params: { id: product.id } })">
              <div class="font-9" v-if="product.isBoosted" style="float: right;position: absolute;z-index: 1;right: -2px;top: 5px;border-top-left-radius: 5px;border-bottom-left-radius: 5px;padding: 0px 8px;font-family: 'Roboto', sans-serif;">
                <span class="fa-stack fa-lg color-red-dark" style="color: red;">
                  <i class="fa fa-square fa-stack-2x"></i>
                  <i class="fa fa-rocket fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <div class="font-9" v-else-if="product.isNew" style="float: right;position: absolute;z-index: 1;right: -2px;top: 5px;background-color: yellow;border-top-left-radius: 5px;border-bottom-left-radius: 5px;color: black;padding: 4px 20px;font-family: 'Roboto', sans-serif;">{{this.$t('message.new')}}</div>
              <ProgressiveImage object-cover placeholder-src="/site_images/transparent-gif/loading3.gif" :src="product.imageFirst" :key="product.id" class="shadow-xl img-fluid tw:min-h-40 tw:max-h-45" style="border-top-right-radius: 5px;border-top-left-radius: 5px;border-radius: 5px;width: 100%;line-height: 14px;" :class="[fixed_dimension?'fixed-dimension':'']" />
              <div class="p-1 font-sans" style="padding-top: 0!important;">
                  <p class="tw:text-sm tw:text-gray-700 tw:tw:text-lg mb-2" style="line-height: 1;">{{show_country?$functions.isoToEmoji(product.country_code):''}} <strong class="color-black font-18">•</strong><span class="font-13 break-libelle-product"> {{product.libelle}}</span></p>
                  <div style="margin: 5px auto;">
                      <!-- <span class="font-600 font-17 tw:text-gray-700" style="line-height: 1rem;">{{$currency}}{{ product.price_str.split(".")[0]}}<sup class="font-600 font-12">.{{ product.price_str.split(".")[1]}}</sup></span> -->
                      <Amount :amount="product.price" class="font-600 tw:text-gray-700 font-14" style="line-height: 1rem;"/>
                      <span v-if="!product.is_digital" class="ms-1 badge bg-red-dark" :dir="$i18n.locale=='ar'?'rtl':'ltr'" style="background-color: red;color: #fff;font-size: 9px;border-radius: 3px;"><i v-if="product.quantity==0" class="fa fa-warning" style="color: yellow;"></i>
                          {{$t('message.publishForm.instock', {quantity: product.quantity})}}
                      </span>
                      <span v-else class="ms-1 badge bg-red-dark" :dir="$i18n.locale=='ar'?'rtl':'ltr'" style="background-color: red;color: #fff;font-size: 9px;border-radius: 3px;">
                          {{$t('message.digital')}}
                      </span>
                      <span @click.stop="addStock" v-if="isOwner && !product.is_digital && (product.quantity==0 || product.quantity==null)" class="btn btn-dark-piketplace font-10 ms-1" style="padding: 1px 5px;">
                          {{$t('message.add_stock')}}
                      </span>
                  </div>
                  <p class="tw:text-gray-700" v-if="!product.is_digital">
                      <span v-if="product.shippingCountries.length>0 && product.freeShippingCountries.length>0" class="tw:text-gray-700 color-red-dark" style="font-size: 12px;color: gray">
                          <i class="fas fa-shipping-fast color-red-dark"></i>{{$t('message.publishForm.paid_free_shipping')}}
                      </span>
                      <span v-else-if="product.shippingCountries.length>0" class="tw:text-gray-700 color-red-dark" style="font-size: 12px;color: gray">
                          <i class="fas fa-shipping-fast color-red-dark"></i>{{$t('message.publishForm.paid_shipping')}}
                      </span>
                      <span v-else-if="product.freeShippingCountries.length>0" class="tw:text-gray-700 color-red-dark" style="font-size: 12px;color: gray">
                          <i class="fas fa-shipping-fast color-red-dark"></i>{{$t('message.free_shipping.text')}}
                      </span>
                  </p>
              </div>
              <!-- <div class="px-1 pt-1 pb-1 border-t border-gray-300 bg-gray-300" style="background-color: #fafafa;">
                  <span class="text-gray-700 text-gray-900" style="font-size: 12px;"><i class="fas fa-shipping-fast text-gray-900"></i>Paid shipping</span>
                  <i class="fa fa-info-circle" style="float: right;"></i>
              </div> -->
              <div v-if="isOwner && approbation_active" class="align-self-right" style="text-align: right;color: gray;padding-right: 10px;">
                  {{$t('message.'+product.status)}}
              </div>
              <!-- <div v-if="!product.is_digital">
                <div v-if="product.shippingCountries.length==1 && product.freeShippingCountries.length==1 && product.shippingCountries[0]==product.freeShippingCountries[0] && product.shippingCountries[0]==product.country_code" class="color-piketplace">
                    <i class="fas fa-shipping-fast"></i>
                    {{$t('message.publishForm.paid_free_shipping')}}
                </div>
                <div v-else-if="product.shippingCountries.length>0 || product.freeShippingCountries.length>0" class="color-piketplace">
                    <div v-if="product.shippingCountries.length>0" class="color-piketplace">
                        <i class="fas fa-shipping-fast"></i>
                        {{$t('message.publishForm.paid_shipping')}}
                        <span v-if="show_country" v-for="iso in product.shippingCountries">
                            <span v-if="iso!=product.country_code">
                                {{$functions.isoToEmoji(iso)}}
                            </span>
                        </span>
                    </div>
                    <div v-if="product.freeShippingCountries.length>0" class="color-piketplace">
                        <i class="fas fa-shipping-fast"></i>
                        {{$t('message.free_shipping.text')}}
                        <span v-if="show_country" v-for="iso in product.freeShippingCountries">
                            <span v-if="iso!=product.country_code">
                               {{$functions.isoToEmoji(iso)}}
                            </span>
                        </span>
                    </div>
                </div>
              </div> -->
              <div v-if="isOwner && product.last_validation && product.last_validation.reasons && product.last_validation.reasons.length>0 && product.last_validation.status=='rejected'" style="color: gray;">
                  <!-- <strong>{{$t('message.product_'+product.status)}}</strong> -->
                  <h2 class="text-center" style="line-height: 14px;">{{$t('message.product_rejected_for_reasons')}}</h2>
                  <ul class="mt-1 mb-1" style="list-style-type: disc;">
                      <li style="color: #000;" v-for="reason in product.last_validation.reasons">
                          {{reasons[$i18n.locale][reasons[$i18n.locale].findIndex((x) => x.code === reason)].text}}
                      </li>
                  </ul>
              </div>
              <!-- <AdSense type="produits" v-if="index % 17 === 0" /> -->
              <!-- <AdSense type="produits" v-if="index % 7 === 0 || index % 17 === 0" /> -->
      </div>
      <!-- <a v-if="isOwner && !product.is_digital" class="" style="">
          {{$t('message.add_stock')}}
      </a> -->
      <div style="text-align: center;">
          <!-- <router-link class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" >
                {{$t('message.update_product')}}
          </router-link> -->
          <i v-if="isOwner && from!='shop'" class="fa ms-1 me-1 font-16" :class="[product.visible?'fa-eye-slash':'fa-eye']" @click="update_visibility"></i>
          <i v-if="isOwner && from!='shop'" class="fa fa-edit font-16 color-green-dark ms-1 me-1" @click="$router.push({ name: 'product-update', params: { id: product.id } })"></i>
          <i v-if="isOwner && from!='shop'" class="fa fa-rocket font-16 color-blue-dark ms-1 me-1" @click="set_show_boost_panel(true),$router.push({ name: 'product', params: { id: product.id } })"></i>
          <!-- <i class="fa fa-trash color-red-dark ms-1 me-1"></i> -->
          <!-- <a v-if="isOwner && from!='shop' && product.status=='rejected' && !product.validation_product_updated_at" @click="submit_for_review" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace-outline" style="">
              {{$t('message.submit_for_review')}}
          </a> -->
      </div>
      <div class="" v-if="from!='shop'">
        <i v-can="'validate_products'" v-if="product.status!='rejected'" class="fa fa-trash color-red-dark" @click="validation_status='rejected';validate_products(product.id)">
            Rejeter produits
        </i>
        <i v-can="'validate_products'" v-if="product.status!='validated'" class="fa fa-check color-green-dark" @click="validation_status='validated';validate_products(product.id)">
            Valider produits
        </i>
      </div>
  </div>
</template>

<script>
    import axios from 'axios';
    /*import AdSense from '../components/AdSense.vue'*/
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        props: {
            product: {
                type: Object,
                default: {}
            },
            approbation_active: {
                type: Boolean,
                default () {
                    return false
                }
            },
            index: {
                type: Number,
                default () {
                    return 0
                }
            },
            isOwner: {
                type: Boolean,
                default () {
                    return false
                }
            },
            from: {
                type: String,
                default () {
                    return ''
                }
            },
            fixed_dimension: {
                type: Boolean,
                default () {
                    return false
                }
            },
        },
        /*components: {
            AdSense
        },*/
        data: function () {
	        return {
            validation_status: '',
            isLoading: true,
	        }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'show_country', 'saving', 'reasons']),
        },
        mounted() {
        },
        methods: {
          ...mapActions(useStore, ['setProduct', 'set_show_boost_panel']),
          validate_products(id){
              let data = {
                id: id,
                status: this.validation_status,
                reasons: this.reasons,
                self: this
              }
              this.$emit('validate_product_event', data)
          },
          submit_for_review(){
              this.$emit('submit_for_review_event', this.product.id)
          },
          update_visibility(){
              this.$emit('update_visibility_event', this.product)
          },
          addStock(){
              this.$emit('add_stock', this.product.id)
          },
        },
        watch:{
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .fixed-dimension{
        height: 100px!important;
    }
    .break-libelle-product{
        width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .break-word{
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .break-word-shopname{
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .break-word-productname{
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
</style>
