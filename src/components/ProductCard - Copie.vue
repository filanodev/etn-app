<template>
  <div :class="product.isNew?'ribbon':''" class="">
      <span class="ribbon1" style="float: right;position: relative;z-index: 1;right: -31px;top: 13px;"></span>
      <div v-if="!isOwner" style="bottom: -13px;position: relative;text-align: left;width: 35px;border-top-left-radius: 15px;border-bottom-right-radius: 15px;margin-left: 10px;z-index: 1">
          <!-- <img v-if="product.user.avatar!='' && product.user.avatar!=null" id="avatar" :src="'images/avatars/'+product.user.avatar" style="width: 25px;height: 25px;object-fit: cover;border-radius: 50%;border-color: white;margin: 5px;" alt="No avatar">
          <img v-else id="avatar" src="default_avatar.png" style="width: 25px;height: 25px;object-fit: cover;border-radius: 50%;border-color: white;margin: 5px;" alt="No avatar"> -->
          <router-link :to="user && user.id == product.user.id?'my-store':'store/'+product.user.id">
          <i style="font-size: 18px;" class="fas fa-store color-piketplace"></i></router-link>
      </div>
    	<router-link :to="{ name: 'product', params: { id: product.id } }" class="" @click="$emit('redirector', product)">
          <div class="gradient-product" style="border-radius: 10px;border-bottom-right-radius: 25px;box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;text-align: center;">
              <a>
                  <!-- <img :src="product.imageFirst" :alt="product.libelle" class="shadow-xl img-fluid" style="min-height: 150px;object-fit: cover;border-top-left-radius: 12px;border-top-right-radius: 12px;"> -->
                  <ProgressiveImage placeholder-src="/site_images/transparent-gif/loading3.gif" :src="product.imageFirst" class="shadow-xl img-fluid" style="min-height: 50px;object-fit: cover;border-top-left-radius: 9px;border-top-right-radius: 9px;width: 100%;" />
                  <!-- <img v-lazyload :data-srcset="product.imageFirst" class="shadow-xl img-fluid" style="min-height: 150px;object-fit: cover;border-top-left-radius: 12px;border-top-right-radius: 12px;"> -->
              </a>

              <a class="align-self-center" style="color: black;font-weight: 400;">
                  
                  <!-- <span v-if="!isOwner"> -->
                  <span>
                    <img :src="product.user.avatar" :alt="product.libelle" class="" style="width: 20px;height: 20px;border-radius: 50%;object-fit: cover;">
                    {{product.user.shopNameShow}}
                  </span>
                  {{show_country?$functions.isoToEmoji(product.country_code):''}}
                  <i v-if="product.user.verified==1" class="fa fa-check-circle color-green-dark"></i>
              </a>
              <!-- <div class="align-self-right">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-comment"></i>
                  <i class="fa fa-shopping-cart"></i>
              </div> -->
              <div v-if="isOwner && approbation_active" class="align-self-right" style="text-align: right;color: gray;padding-right: 10px;">
                  {{$t('message.'+product.status)}}
              </div>
              <a href="#" class="d-block mt-2">
                  <i class="fa fa-star color-yellow-dark"></i>
                  <i class="fa fa-star color-yellow-dark"></i>
                  <i class="fa fa-star color-yellow-dark"></i>
                  <i class="fa fa-star color-yellow-dark"></i>
                  <i class="fa fa-star color-yellow-dark"></i><!-- <br> -->&nbsp;&nbsp;
                  <span class="font-12 mt-n1 color-piketplace">
                      {{product.comments_count}}&nbsp;<i class="fa fa-comment"></i><!-- <br> -->
                  </span>
                  <!-- <span class="font-10 d-block mt-n1" style="color: #812a6b;">{{product.comments.length!=0?product.comments.length+' '+$t('message.comments'):$t('message.no_comments')}}</span> -->
              </a>
              <a href="#">
                  <h5 class="mt-1">{{product.libelle}}
                    <span v-if="!product.is_digital" class="font-10" style="color: rgb(223, 166, 49);">{{product.quantity}} {{$t('message.publishForm.enstock')}}</span>
                  </h5>
              </a>
              <h1 class="mt-1 mb-n2 font-600 font-16" style="color: #000;">{{$currency}}{{ product.price_str.split(".")[0]}}<sup class="font-600 font-12">.{{ product.price_str.split(".")[1]}}</sup></h1>
              <!-- <h1 class="mt-1 mb-n2 font-800">π{{ Math.floor(product.price)}}<sup class="font-300 font-16">.{{(product.price % 1).toString().substring(2)}}</sup></h1> -->
              <!-- <span class="opacity-50 font-11"><del>π299<sup>.99</sup></del> (- 40%)</span> -->
              <!-- <span class="" style="color: #812a6b" v-if="product.free_shipping">
                <i class="fas fa-shipping-fast"></i> {{$t('message.free_shipping.text')}}
              </span> -->
              <div v-if="!product.is_digital">
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
              </div>
              <div v-if="isOwner" style="color: gray;">
                  <strong>{{$t('message.product_'+product.status)}}</strong>
                  <ul v-if="product.last_validation && product.last_validation.reasons && product.last_validation.reasons.length>0 && product.last_validation.status=='rejected'">
                      <li style="color: #000;" v-for="reason in product.last_validation.reasons">
                          {{reasons[$i18n.locale][reasons[$i18n.locale].findIndex((x) => x.code === reason)].text}}
                      </li>
                  </ul>
              </div>
              <!-- <AdSense type="produits" v-if="index % 17 === 0" /> -->
              <!-- <AdSense type="produits" v-if="index % 7 === 0 || index % 17 === 0" /> -->
          </div>
      </router-link>
      <!-- <a v-if="isOwner && !product.is_digital" class="" style="">
          {{$t('message.add_stock')}}
      </a> -->
      <div style="text-align: center;">
          <router-link v-if="isOwner && from!='shop'" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" :to="'/product-update/'+product.id">
                {{$t('message.update_product')}}
          </router-link>
          <a v-if="isOwner && from!='shop' && product.status=='rejected' && !product.validation_product_updated_at" @click="submit_for_review" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace-outline" style="">
              {{$t('message.submit_for_review')}}
          </a>
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
                default: false
            },
            index: {
                type: Number,
                default: false
            },
            isOwner: {
                type: Boolean,
                default: false
            },
            from: {
                type: String,
                default: ''
            }
        },
        /*components: {
            AdSense
        },*/
        data: function () {
	        return {
	        	libelle: '',
            validation_status: '',
            isLoading: true,
	        }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'show_country', 'saving', 'reasons']),
        },
        mounted() {
            //this.libelle = "'"+this.$t('message.'+this.product.status)+"'"
            this.libelle = this.product.isNew?"'"+this.$t('message.new')+"'":''
            // console.log(this.index)
        },
        methods: {
          ...mapActions(useStore, ['setProduct']),
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
          
        },
        watch:{
            locale(val, old){
                //this.libelle = "'"+this.$t('message.'+this.product.status)+"'"
                this.libelle = this.product.isNew?"'"+this.$t('message.new')+"'":''
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

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
    .ribbon .card__containerrr{
      padding : 2rem;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 1rem;
    }
    .ribbon::before{
      position: relative;
      content: '';
      background: orange;
      height: 14px;
      width: 18px;
      top: 38px;
      right: -9px;
      transform : rotate(45deg);
      z-index: 0;
      display: block;
      float: right;
    }
    .ribbon1::before{
      position: relative;
      content: v-bind(libelle);
      top: 11px;
      right: -2px;
      padding: 0;
      width: 63px;
      border-radius: 5px;
      font-size: 9px;
      height: 22px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: orange;
      color: #000;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      box-shadow: 4px 4px 15px rgba(26, 35, 126, 0.2);
      vertical-align: top;
      display: block;
    }
    .gradient-product {
      background: #f8f8f8;
      background: linear-gradient(
        to top,
        #f8f8f8,#fbc7d4
      );
    }
</style>
