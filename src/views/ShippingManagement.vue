<template>
    <div class="page-content">
        <Header ref="header" pageTitle="message.shipping_confirmation" :hide_settings_icon="true"/>
        <div id="show-image-modal" class="rounded-m content menu menu-box-bottom rounded-m" data-menu-effect="menu-over" style="display: block; height: 100%;width: 100%;margin: auto;">
            <a class="close-menu" @click="$hide_modal.all" style="float: right;">
                <i class="fa fa-times-circle color-red-dark fa-2x"></i>
            </a>
            <img style="width: 100%;height: 97%;object-fit: contain;" :src="selected_image">
        </div>
        <div v-if="isLoggedIn && line_order" style="">
            <div id="menu-option-selection-modal" class="menu menu-box-modal rounded-m" data-menu-height="300" data-menu-width="350" style="display: block; width: 350px; height: 300px;">
                <h1 class="text-center mt-4">
                    <i class="fa fa-3x fa-info-circle scale-box color-blue-dark shadow-xl rounded-circle"></i>
                </h1>
                <h3 class="text-center mt-3 font-700">{{$t('message.confirmation.you_sure')}}</h3>
                <!-- <p class="boxed-text-xl opacity-70">
                    You can continue with your previous actions.<br> Easy to attach these to success calls.
                </p> -->
                <div class="row mb-0 me-3 ms-3">
                    <div class="col-6">
                        <a @click="$hide_modal.hide_modal('menu-option-selection-modal');cancel()" class="btn close-menu btn-full btn-m color-red-dark border-red-dark font-600 rounded-s">{{$t('message.confirmation.no_cancel')}}</a>
                    </div>
                    <div class="col-6">
                        <a @click="selection();" class="btn close-menu btn-full btn-m color-green-dark border-green-dark font-600 rounded-s">{{$t('message.confirmation.yes_continue')}}</a>
                    </div>
                </div>
            </div>
            <div class="card card-style">
                <div class="card mb-0" data-card-height="150" style="height: 150px;background-repeat: no-repeat;background-size: contain!important;background-image: url(/images/pictures/17.jpg);"></div>
                <div class="content">
                    <h4 class="font-700">{{$t('message.status.text')}}</h4>
                    <p class="mt-n2 color-piketplace mb-3">{{$t('message.shipping_completion_status')}}</p>
                    <div class="progress rounded-l" style="height:28px">
                        <div :class="'progress-bar bg-'+line_order.statusColor+'-dark text-start ps-3 color-white'" role="progressbar" :style="'width: '+(line_order.statusPercent==0?10:line_order.statusPercent)+'%'" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                            {{line_order.statusPercentDisplay}}%
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-style" v-if="line_order!=null">
                <div class="accordion" id="accordion-1">
                    <div class="mb-0">
                        <button class="btn accordion-btn no-effect color-theme collapsed" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false">
                            <div class="content" style="display: inline-block;margin: 0;">
                                <h2>{{$t('message.product_info')}}</h2>
                            </div>
                            <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id="collapse2" class="collapse" data-bs-parent="#accordion-1" style="">
                            <div class="pt-1 pb-2 ps-3 pe-3">
                                <ShippingCard :line_order="line_order" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-style">
                <div class="content">
                    <h3>{{$t('message.confirmation_text')}}</h3>
                    <p>
                        {{$t('message.shipping_status_confirmation')}}
                    </p>
                    <p v-if="line_order.order.pi_users_id==user.id">
                        {{$t('message.you_the_buyer')}}
                    </p>
                    <p v-if="line_order.product.user.id==user.id">
                        {{$t('message.you_the_seller')}}
                    </p>
                    <p v-if="line_order.deliver_pi_users_id==user.id">
                        {{$t('message.you_the_deliver')}}
                    </p>
                    <div v-if="line_order.hasDeliver">
                        <!--START SELLER TO DELIVER-->
                        <div v-if="!line_order.shipped_at && line_order.order.paid && line_order.product.user.id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'seller_to_deliver' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.seller_to_deliver" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.seller_to_deliver">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="seller_to_deliver" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.seller_to_deliver')}}</h5>
                            </div>
                            <div v-if="line_order.product.user.id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.seller_to_deliver_at==null" class="custom-control ios-switch">
                                    <input :disabled="!line_order.order.paid || !line_order.hasAtLeastOneSellerToDeliverImage" type="checkbox" class="ios-input" id="seller_to_deliver" @click="display_confirmation('seller_to_deliver')" v-model="line_order.seller_to_deliver_at">
                                    <label class="custom-control-label" for="seller_to_deliver"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.seller_to_deliver_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="collapse" id="collapseExample1">
                            <p class="mb-0 pb-0 pt-2">This is just a text. You can add any content you want inside toggles. It will work like a charm.</p>
                        </div> -->
                        <div class="divider mt-3 mb-3"></div>
                        <!--END SELLER TO DELIVER-->
                        <!--START DELIVER FROM SELLER-->
                        <div v-if="!line_order.shipped_at && line_order.seller_to_deliver_at!=null && line_order.deliver_from_seller_at==null && line_order.deliver_pi_users_id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'deliver_from_seller' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.deliver_from_seller" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.deliver_from_seller">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="deliver_from_seller" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.deliver_from_seller')}}</h5>
                            </div>
                            <div v-if="line_order.deliver_pi_users_id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.deliver_from_seller_at==null" class="custom-control ios-switch">
                                    <input :disabled="line_order.seller_to_deliver_at==null || !line_order.hasAtLeastOneDeliverFromSellerImage" type="checkbox" @click="display_confirmation('deliver_from_seller')" class="ios-input" id="deliver_from_seller" v-model="line_order.deliver_from_seller_at">
                                    <label class="custom-control-label" for="deliver_from_seller"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.deliver_from_seller_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="collapse" id="collapseExample2">
                            <p class="mb-0 pb-0 pt-2">This is just a text. You can add any content you want inside toggles. It will work like a charm.</p>
                        </div> -->
                        <div class="divider mt-3 mb-3"></div>
                        <!--END DELIVER FROM SELLER-->
                        <!--START DELIVER TO BUYER-->
                        <div v-if="!line_order.shipped_at && line_order.deliver_from_seller_at!=null && line_order.deliver_to_buyer_at==null && line_order.deliver_pi_users_id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'deliver_to_buyer' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.deliver_to_buyer" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.deliver_to_buyer">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="deliver_to_buyer" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.deliver_to_buyer')}}</h5>
                            </div>
                            <div v-if="line_order.deliver_pi_users_id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.deliver_to_buyer_at==null" class="custom-control ios-switch">
                                    <input :disabled="line_order.seller_to_deliver_at==null || !line_order.hasAtLeastOneDeliverToBuyerImage" type="checkbox" @click="display_confirmation('deliver_to_buyer')" class="ios-input" id="deliver_to_buyer" v-model="line_order.deliver_to_buyer_at">
                                    <label class="custom-control-label" for="deliver_to_buyer"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.deliver_to_buyer_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="collapse" id="collapseExample3">
                            <p class="mb-0 pb-0 pt-2">This is just a text. You can add any content you want inside toggles. It will work like a charm.</p>
                        </div> -->
                        <div class="divider mt-3 mb-3"></div>
                        <!--END DELIVER TO BUYER-->
                        <!--START BUYER FROM DELIVER-->
                        <div v-if="!line_order.shipped_at && line_order.deliver_to_buyer_at!=null && line_order.buyer_from_deliver_at==null && line_order.order.pi_users_id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'buyer_from_deliver' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.buyer_from_deliver" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.buyer_from_deliver">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="buyer_from_deliver" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.buyer_from_deliver')}}</h5>
                            </div>
                            <div v-if="line_order.order.pi_users_id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.buyer_from_deliver_at==null" class="custom-control ios-switch">
                                    <input :disabled="line_order.deliver_to_buyer_at==null || !line_order.hasAtLeastOneBuyerFromDeliverImage" type="checkbox" @click="display_confirmation('buyer_from_deliver')" class="ios-input" id="buyer_from_deliver" v-model="line_order.buyer_from_deliver_at">
                                    <label class="custom-control-label" for="buyer_from_deliver"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.buyer_from_deliver_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <!--END BUYER FROM DELIVER-->
                        <!-- <div class="collapse" id="collapseExample3">
                            <p class="mb-0 pb-0 pt-2">This is just a text. You can add any content you want inside toggles. It will work like a charm.</p>
                        </div> -->
                    </div>
                    <div v-else>
                        <!--START SELLER TO BUYER-->
                        <div v-if="!line_order.shipped_at && line_order.order.paid && line_order.product.user.id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'seller_to_buyer' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.seller_to_buyer" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.seller_to_buyer">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="seller_to_buyer" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.seller_to_buyer')}}</h5>
                            </div>
                            <div v-if="line_order.product.user.id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.seller_to_buyer_at==null" class="custom-control ios-switch">
                                    <input :disabled="!line_order.order.paid || !line_order.hasAtLeastOneSellerToBuyerImage" type="checkbox" class="ios-input" id="seller_to_buyer" @click="display_confirmation('seller_to_buyer')" v-model="line_order.seller_to_buyer_at">
                                    <label class="custom-control-label" for="seller_to_buyer"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.seller_to_buyer_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="divider mt-3 mb-3"></div>
                        <!--END SELLER TO BUYER-->
                        <!--START BUYER FROM SELLER-->
                        <div v-if="!line_order.shipped_at && line_order.seller_to_buyer_at!=null && line_order.order.pi_users_id==user.id" class="d-flex no-effect">
                            <router-link :to="{ name: 'add-update-shipping-images', params: { type: 'buyer_from_seller' } }" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                {{$t('message.add')}}
                            </router-link>
                        </div>
                        <div v-if="line_order.shipping_images && line_order.shipping_images.buyer_from_seller" class="d-flex no-effect" style="padding: 10px;background-color: #f0f0f0;border-radius: 10px;justify-content: center;">
                            <div v-for="(im, index) in line_order.shipping_images.buyer_from_seller">
                                <img :src="im.lien" @click="showImage(im.lien)" style="width: 100px;height: 100px;object-fit: cover;margin: auto 3px;border-radius: 5px;" />
                            </div>
                        </div>
                        <div class="d-flex no-effect" data-trigger-switch="buyer_from_seller" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
                            <div class="pt-1">
                                <h5 class="font-600 font-14">{{$t('message.buyer_from_seller')}}</h5>
                            </div>
                            <div v-if="line_order.order.pi_users_id==user.id" class="ms-auto me-4 pe-2">
                                <div v-if="line_order.buyer_from_seller_at==null" class="custom-control ios-switch">
                                    <input :disabled="line_order.seller_to_buyer_at==null || !line_order.hasAtLeastOneBuyerFromSellerImage" type="checkbox" @click="display_confirmation('buyer_from_seller')" class="ios-input" id="buyer_from_seller" v-model="line_order.buyer_from_seller_at">
                                    <label class="custom-control-label" for="buyer_from_seller"></label>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                            <div v-else class="ms-auto me-4 pe-2">
                                <div v-if="line_order.buyer_from_seller_at==null" class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-gray-dark"><i class="fa fa-minus"></i></a>
                                </div>
                                <div v-else class="custom-control ios-switch">
                                    <a class="icon icon-l border-green-dark color-green-dark"><i class="fa fa-check"></i></a>
                                </div>
                            </div>
                        </div>
                        <!--END BUYER FROM SELLER-->
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="isLoading" style="text-align: center;">
            <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
        </div>
        <div v-else-if="!isLoggedIn">
            <div style="text-align: center;">
                {{$t('message.you_logged_out_click_to_login')}}
            </div>
            <div style="width: 100%;text-align: center;">
                <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in')}}
                </button>
            </div>
        </div>
        <div v-else>
            <div style="width: 100%;text-align: center;">
                <button @click="reload" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.reload')}}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import ShippingCard from '../components/ShippingCard.vue'

    export default{
        components: {
            ShippingCard
        },
        data() {
            return {
                id: 0,
                function_to_execute: '',
                line_order: null,
                selected_image: '',
                isLoading: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'saving']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted(){
            this.id = this.$route.params.id;
            this.getLineOrder();
        },
        methods: {
            ...mapActions(useStore, ['login', 'set_line_order']),
            reload(){
                this.getLineOrder()
            },
            async getLineOrder(){
                this.isLoading = true
                let id = this.id;
                await axios.get('/line-orders-api/'+id).then(res => {
                    
                    this.line_order = res.data.line_order;
                    this.set_line_order(this.line_order)
                    console.log(this.line_order);
                    console.log(this.user);
                    this.isLoading = false
                })
                .catch(error => {
                    this.isLoading = false
                });
            },
            seller_to_deliver(){
                let data = {seller_to_deliver_at: 1};
                this.update(data);
            },
            deliver_from_seller(){
                let data = {deliver_from_seller_at: 1};
                this.update(data);
            },
            deliver_to_buyer(){
                let data = {deliver_to_buyer_at: 1};
                this.update(data);
            },
            buyer_from_deliver(){
                let data = {buyer_from_deliver_at: 1};
                this.update(data);
            },
            seller_to_buyer(){
                let data = {seller_to_buyer_at: 1};
                this.update(data);
            },
            buyer_from_seller(){
                let data = {buyer_from_seller_at: 1};
                this.update(data);
            },
            update(data){
                this.saving = true
                axios.put('/line-orders-api/'+this.id, data)
                .then(response => {
                    this.saving = false
                    console.log(response);
                    if (response.data.status === true) {
                        this.line_order = response.data.line_order;
                        //this.$forceUpdate()
                        if (response.data.line_order.shipped_at) {
                            this.$functions.msg_box(this, 'success', this.$t('message.info'), this.$t('message.shipped_sucessfully'))
                        }else{
                            this.$functions.msg_box(this, 'success', this.$t('message.saved'), this.$t('message.selected'))
                        }
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                }).catch(function (error) {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    console.log(error.response)
                })
            },
            display_confirmation(function_to_execute){
                this.function_to_execute = function_to_execute;
                let img = '/site_images/confirm.PNG'
                let btn = {
                    yes: this.$t('message.yes'),
                    no: this.$t('message.confirmation.no_cancel'),
                }
                let title = this.$t('message.info')
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: title,
                      message: msg,
                      button: btn,
                      html: true
                        ,
                        /**
                        * Callback Function
                        * @param {Boolean} confirm
                        */
                        callback: confirm => {
                          if (confirm) {
                            
                            this.selection()
                          }else{
                            this.cancel()
                          }
                        }
                    }
                )
                /*document.getElementById('menu-option-selection-modal').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');*/
            },
            isValid(function_to_execute){
                if (function_to_execute == "seller_to_deliver") {
                    return this.line_order.hasAtLeastOneSellerToBuyerImage;
                }
                if (function_to_execute == "deliver_from_seller") {
                    this.deliver_from_seller();
                }
                if (function_to_execute == "deliver_to_buyer") {
                    this.deliver_to_buyer();
                }
                if (function_to_execute == "buyer_from_deliver") {
                    this.buyer_from_deliver();
                }
                if (function_to_execute == "seller_to_buyer") {
                    return this.line_order.hasAtLeastOneSellerToBuyerImage;
                }
                if (function_to_execute == "buyer_from_seller") {
                    return this.line_order.hasAtLeastOneBuyerFromSellerImage;
                }
            },
            selection() {
                this.$hide_modal.hide_modal('menu-option-selection-modal');
                if (this.function_to_execute == "seller_to_deliver") {
                    this.seller_to_deliver();
                }
                if (this.function_to_execute == "deliver_from_seller") {
                    this.deliver_from_seller();
                }
                if (this.function_to_execute == "deliver_to_buyer") {
                    this.deliver_to_buyer();
                }
                if (this.function_to_execute == "buyer_from_deliver") {
                    this.buyer_from_deliver();
                }
                if (this.function_to_execute == "seller_to_buyer") {
                    this.seller_to_buyer();
                }
                if (this.function_to_execute == "buyer_from_seller") {
                    this.buyer_from_seller();
                }
            },
            cancel(){
                console.log('in cancel')
                if (this.function_to_execute == "seller_to_deliver") {
                    this.line_order.seller_to_deliver_at = null;
                }
                if (this.function_to_execute == "deliver_from_seller") {
                    this.line_order.deliver_from_seller_at = null;
                }
                if (this.function_to_execute == "deliver_to_buyer") {
                    this.line_order.deliver_to_buyer_at = null;
                }
                if (this.function_to_execute == "buyer_from_deliver") {
                    this.line_order.buyer_from_deliver_at = null;
                }
                if (this.function_to_execute == "seller_to_buyer") {
                    this.line_order.seller_to_buyer_at = null;
                }
                if (this.function_to_execute == "buyer_from_seller") {
                    this.line_order.buyer_from_seller_at = null;
                }
                this.$forceUpdate()
            },
            showImage(im) {
                this.selected_image = im
                this.$show_modal.show_modal({id:'show-image-modal'})
            }
        }
    }
</script>

<style scoped>
</style>
