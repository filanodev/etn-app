<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_orders" :hide_settings_icon="true"/>
        <PayWith @payPiketplace="pay_piketplace_wallet" @payPinetwork="pay_pi_network_wallet" />
        <div class="page-content">
            <Adsense v-if="activate_google_ads"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div class="tab-controls" style="width: 60%;margin: auto;">
                <a class="no-effect" @click="activeOrdersTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.in_progress')}}
                    <span v-if="order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
                <a class="no-effect" @click="activeShippedTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.shipped')}}
                    <span v-if="shipped_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
                <a class="no-effect" @click="activePreOrderTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.pre_orders')}}
                    <span v-if="pre_order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
            </div>
            <div v-show="order_tab_active" style="min-height: 200px">
                <div v-for="(line, index) in line_orders">
                    <div class="card card-style mb-2" style="padding: 5px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="line_orders.length > 0 && !line.cancelled_at">
                        <div style="line-height: 16px;">
                            <div style="text-align: left;width: 49%;display: inline-block;">
                                <strong v-if="line.shipped_at" class="color-piketplace">{{$t('message.shipped')}}</strong>
                                <strong v-else>{{$t('message.ordered')}}</strong>
                            </div>
                            <div style="text-align: right;width: 49%;display: inline-block;">
                                <em class="font-11" v-if="line.shipped_at">{{$filters.formatDate(line.shipped_at, $i18n.locale)}}</em>
                                <em class="font-11" v-else>{{$filters.formatDate(line.order.ordered_at, $i18n.locale)}}</em>
                            </div>
                        </div>
                        <div class="divider mb-1"></div>
                        <div v-if="line.reference" style="line-height: 16px;">
                            <em class="font-11"># {{line.reference}}</em>
                            <div class="divider mb-1"></div>
                        </div>
                        <div>
                            <router-link class="tw:align-top" v-if="line.product.user" :to="{name: 'store', params: { shop_user_id: line.product.user.id }}" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <svg class="tw:inline" width="13px" height="13px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>store</title> <g id="store-Filled"> <path id="store-Filled-2" data-name="store-Filled" class="cls-1" d="M20.5,18A3.5,3.5,0,0,1,17,21.5H14.53V19a2.5,2.5,0,0,0-5,0v2.5H7A3.5,3.5,0,0,1,3.5,18V13.35A5.634,5.634,0,0,0,5.99,14,4.409,4.409,0,0,0,9,12.78a4.3,4.3,0,0,0,6,0A4.409,4.409,0,0,0,18.01,14a5.634,5.634,0,0,0,2.49-.65Zm.974-9.158L20.386,5.577A4.494,4.494,0,0,0,16.117,2.5H7.883A4.494,4.494,0,0,0,3.614,5.577L2.526,8.842A.5.5,0,0,0,2.5,9a3.5,3.5,0,0,0,3.49,3.5A3.853,3.853,0,0,0,9,11.034a3.809,3.809,0,0,0,6.006,0A3.854,3.854,0,0,0,18.01,12.5,3.5,3.5,0,0,0,21.5,9,.5.5,0,0,0,21.474,8.842Z"></path> </g> </g></svg>
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else> {{line.product.user?line.product.user.fullnameOrUsername:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <div class="break-username-word" v-if="!line.noshipping && line.order.shipping" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.order.shipping)">
                                <img class="tw:inline" src="/site_images/svg/marker-color-piketplace.svg">
                                <label class="color-piketplace" v-if="!line.product.is_digital"> {{line.order.shipping.country_name+", "+line.order.shipping.city}}</label>
                                <label class="color-piketplace" v-else> {{line.order.shipping.email}}</label>
                            </div>
                            <div v-else style="text-align: right;width: 49%;display: inline-block;font-size: 12px;">
                                <label>{{$t('message.customer_shipping')}}</label>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div>
                                <img @click="$router.push({ name: 'product', params: { id: line.product.id } })" :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                            </div>
                            <div class="w-100 ms-3 pt-1">
                                <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                <h4 class="font-700 font-15 color-yellow-piketplace">{{$currency}}{{ line.price.toString().split('.')[0]}}.<sup>{{line.price.toString().split('.')[1]}}</sup>
                                    <span style="float: right;" class="mb-0 color-piketplace font-14">{{line.quantity}}x Item</span>
                                </h4>
                                <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_free_shipping">
                                    {{$t('message.free_shipping.text')}}
                                </h5>
                                <h5 class="font-500 font-12" v-else-if="!line.noshipping && line.fee!=0">
                                    <!-- {{$t('message.shipping_cost',{'amount': $functions.amount_format(line.fee, $currency)})}} -->
                                    <i18n-t keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                        <template #amount>
                                          <Amount :amount="line.fee" class=""/>
                                        </template>
                                    </i18n-t>
                                </h5>
                                <h5 class="font-500 font-12" v-else-if="line.noshipping">
                                    {{$t('message.address.no_shipping')}}
                                </h5>
                                <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                    {{$t('message.total_display',{'amount':$functions.amount_format(line.total+line.fee, $currency)})}}
                                </h5>
                                <router-link :to="{ name: 'message', params: { corresponding_id: line.product.user.id, line_order_id: line.id } }" class="color-piketplace" v-if="line.shipped_at===null">
                                    <i class="fa fa-comments-o font-14"></i>
                                    <span class="font-14">{{$t('message.discuss_with_seller')}}</span>&nbsp;<i class="line-height-s mt-1 opacity-70 message-badge" :class="[line.messages_count>10?'lg-content':'m-content']">{{line.messages_count}}</i>
                                </router-link>
                                <div class="row confirm-cancel" style="margin-bottom: 0;">
                                    <div :class="!line.shipped_at && !line.cancelled_at?'col-8':'col-12'">
                                        <router-link class="font-700 btn btn-dark-piketplace rounded-xl font-11" :to="{ name: 'shipping_management', params: { id: line.id } }" style="margin-right: 0;width: 100%;padding: 2px;"><i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}} <span class="color-yellow-piketplace">{{line.statusPercentDisplay}}%</span></router-link>
                                    </div>
                                    <div v-if="!line.shipped_at && !line.cancelled_at" class="col-4">
                                        <a class="font-700 btn rounded-xl btn-dark-piketplace-outline font-11" @click="cancel_confirmation(index)" style="margin-right: 0;width: 100%;padding: 2px;"><i class="fas fa-times"></i> {{$t('message.cancel')}}</a>
                                    </div>
                                </div>
                                <!-- <h5 class="font-500 font-12" v-if="c.final_free_shipping">
                                    Le vendeur vous apportera le produit
                                </h5> -->
                            </div>
                        </div>
                        <div class="divider mb-0"></div>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottomOrders">
                    <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                    <div v-if="no_more_data" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
            </div>
            <div v-show="shipped_tab_active" style="min-height: 200px;">
                <div v-for="(line, index) in line_orders">
                    <div class="card card-style mb-2" style="padding: 5px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="line_orders.length > 0">
                        <div style="line-height: 16px;">
                            <div style="text-align: left;width: 49%;display: inline-block;">
                                <strong v-if="line.shipped_at" class="color-piketplace">{{$t('message.shipped')}}</strong>
                                <strong v-else>{{$t('message.ordered')}}</strong>
                            </div>
                            <div style="text-align: right;width: 49%;display: inline-block;">
                                <em class="font-11" v-if="line.shipped_at">{{$filters.formatDate(line.shipped_at, $i18n.locale)}}</em>
                                <em class="font-11" v-else>{{$filters.formatDate(line.order.ordered_at, $i18n.locale)}}</em>
                            </div>
                        </div>
                        <div class="divider mb-1"></div>
                        <div v-if="line.reference" style="line-height: 16px;">
                            <em class="font-11"># {{line.reference}}</em>
                            <div class="divider mb-1"></div>
                        </div>
                        <div>
                            <router-link class="tw:align-top" v-if="line.product.user" :to="{ name: 'store', params: { shop_user_id: line.product.user.id } }" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <svg class="tw:inline" width="13px" height="13px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>store</title> <g id="store-Filled"> <path id="store-Filled-2" data-name="store-Filled" class="cls-1" d="M20.5,18A3.5,3.5,0,0,1,17,21.5H14.53V19a2.5,2.5,0,0,0-5,0v2.5H7A3.5,3.5,0,0,1,3.5,18V13.35A5.634,5.634,0,0,0,5.99,14,4.409,4.409,0,0,0,9,12.78a4.3,4.3,0,0,0,6,0A4.409,4.409,0,0,0,18.01,14a5.634,5.634,0,0,0,2.49-.65Zm.974-9.158L20.386,5.577A4.494,4.494,0,0,0,16.117,2.5H7.883A4.494,4.494,0,0,0,3.614,5.577L2.526,8.842A.5.5,0,0,0,2.5,9a3.5,3.5,0,0,0,3.49,3.5A3.853,3.853,0,0,0,9,11.034a3.809,3.809,0,0,0,6.006,0A3.854,3.854,0,0,0,18.01,12.5,3.5,3.5,0,0,0,21.5,9,.5.5,0,0,0,21.474,8.842Z"></path> </g> </g></svg>
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else> {{line.product.user?line.product.user.fullnameOrUsername:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <div class="" v-if="!line.noshipping && line.order.shipping" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.order.shipping)">
                                <img class="tw:inline" src="/site_images/svg/marker-color-piketplace.svg">
                                <label class="color-piketplace" v-if="!line.product.is_digital"> {{line.order.shipping.country_name+", "+line.order.shipping.city}}</label>
                                <label class="color-piketplace" v-else> {{line.order.shipping.email}}</label>
                            </div>
                            <div v-else style="text-align: right;width: 49%;display: inline-block;font-size: 12px;">
                                <label>{{$t('message.customer_shipping')}}</label>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div>
                                <img @click="$router.push({ name: 'product', params: { id: line.product.id } })" :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                            </div>
                            <div class="w-100 ms-3 pt-1">
                                <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                <h4 class="font-700 font-15 color-yellow-piketplace">{{$currency}}{{ line.price.toString().split('.')[0]}}.<sup>{{line.price.toString().split('.')[1]}}</sup>
                                    <span style="float: right;" class="mb-0 color-piketplace font-14">{{line.quantity}}x Item</span>
                                </h4>
                                <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_free_shipping">
                                    {{$t('message.free_shipping.text')}}
                                </h5>
                                <h5 class="font-500 font-12" v-else-if="line.shipping_info!=null && line.shipping_info.final_paid_shipping">
                                    <!-- {{$t('message.shipping_cost',{'amount': $functions.amount_format(line.shipping_info.fee, $currency)})}} -->
                                    <i18n-t keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                        <template #amount>
                                          <Amount :amount="line.shipping_info.fee" class=""/>
                                        </template>
                                    </i18n-t>
                                </h5>
                                <h5 class="font-500 font-12" v-else-if="line.noshipping">
                                    {{$t('message.address.no_shipping')}}
                                </h5>
                                <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                    {{$t('message.total_display',{'amount': $functions.amount_format(line.price*line.quantity, $currency)})}}
                                </h5>
                                <div class="row" style="margin-bottom: 0px;">
                                    <div class="col-12">
                                        <router-link class="font-700 btn btn-dark-piketplace rounded-xl" :to="{ name: 'shipping_management', params: { id: line.id } }" style="font-size: 12px;margin-right: 0;width: 100%;padding: 2px;"><i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}} <span class="color-yellow-piketplace">{{line.statusPercentDisplay}}%</span></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="divider mb-0"></div>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottomOrdersShipped">
                    <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                    <div v-if="no_more_data" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
            </div>
            <div v-show="pre_order_tab_active" style="min-height: 200px;">
                <div v-for="(line, index) in pre_orders">
                    <div class="card card-style mb-2" style="padding: 5px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="pre_orders.length > 0">
                        <div style="line-height: 16px;">
                            <div style="text-align: left;width: 49%;display: inline-block;">
                            </div>
                            <div style="text-align: right;width: 49%;display: inline-block;">
                                <em class="font-11">{{$filters.formatDate(line.created_at, $i18n.locale)}}</em>
                            </div>
                        </div>
                        <div class="divider mb-1"></div>
                        <div>
                            <router-link class="tw:align-top" v-if="line.product.user" :to="{ name: 'store', params: { shop_user_id: line.product.user.id } }" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <svg class="tw:inline" width="13px" height="13px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>store</title> <g id="store-Filled"> <path id="store-Filled-2" data-name="store-Filled" class="cls-1" d="M20.5,18A3.5,3.5,0,0,1,17,21.5H14.53V19a2.5,2.5,0,0,0-5,0v2.5H7A3.5,3.5,0,0,1,3.5,18V13.35A5.634,5.634,0,0,0,5.99,14,4.409,4.409,0,0,0,9,12.78a4.3,4.3,0,0,0,6,0A4.409,4.409,0,0,0,18.01,14a5.634,5.634,0,0,0,2.49-.65Zm.974-9.158L20.386,5.577A4.494,4.494,0,0,0,16.117,2.5H7.883A4.494,4.494,0,0,0,3.614,5.577L2.526,8.842A.5.5,0,0,0,2.5,9a3.5,3.5,0,0,0,3.49,3.5A3.853,3.853,0,0,0,9,11.034a3.809,3.809,0,0,0,6.006,0A3.854,3.854,0,0,0,18.01,12.5,3.5,3.5,0,0,0,21.5,9,.5.5,0,0,0,21.474,8.842Z"></path> </g> </g></svg>
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else> {{line.product.user?line.product.user.fullnameOrUsername:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <a class="break-username-word" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.pre_order_address)">
                                <label class="color-piketplace"><img class="tw:inline" src="/site_images/svg/marker-color-piketplace.svg"> {{line.pre_order_address.country_name+", "+line.pre_order_address.city}}</label>
                            </a>
                        </div>
                        <div class="d-flex">
                            <div>
                                <img @click="$router.push({ name: 'product', params: { id: line.product.id } })" :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                            </div>
                            <div class="w-100 ms-3 pt-1">
                                <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                <h4 class="font-700 color-yellow-piketplace"><!-- {{$currency}}{{ line.product.price_str.split('.')[0]}}.<sup>{{line.product.price_str.split('.')[1]}}</sup> -->
                                    <Amount :amount="line.product.price" class="font-700 color-yellow-piketplace"/>
                                    <span style="float: right;" class="mb-0 color-piketplace font-12">{{line.quantity}}x Item</span>
                                </h4>
                                <h5 v-if="line.canPayOnPreorder" class="font-600 font-12" style="text-align: left;">
                                    <!-- {{$t('message.shipping_cost',{'amount': line.fee})}} -->
                                    <i18n-t keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                        <template #amount>
                                          <Amount :amount="line.fee" class=""/>
                                        </template>
                                    </i18n-t>
                                </h5>
                                <h5 v-if="line.canPayOnPreorder" class="font-600 font-12" style="text-align: right;">
                                    <span class="font-600 color-black mb-0 me-1 font-13">{{ $t('message.handling_fee') }}: </span>
                                    <!-- <span class="font-600 font-13 tw:float-right">+{{handling_fee_percentage}}%</span> -->
                                    <Amount :amount="handling_fee_percentage" type="percentage" class="font-600 font-13 color-black tw:float-right"/>
                                </h5>
                                <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                    <!-- {{$t('message.total_display',{'amount': $functions.amount_format(!line.canPayOnPreorder?line.total:line.total+line.fee, $currency)})}} -->
                                    <i18n-t keypath="message.total_display" tag="span" class="font-600 font-13 color-yellow-piketplace">
                                        <template #amount>
                                            <Amount :amount="getLineTotalFee(line)" class="font-900 font-13 color-yellow-piketplace tw:inline"/>
                                            /
                                            <Amount :amount="!line.canPayOnPreorder?line.total:getLineTotalFee(line)" class="font-900 tw:inline"/><span class="font-900 tw:font-sans">+{{getLineHandlingFeePiket(line)}}Piket</span>
                                        </template>
                                    </i18n-t>
                                </h5>
                                <div class="">
                                    <div class="col-6 tw:inline-block" :class="!line.canPayOnPreorder?'col-12':'col-6'">
                                        <a v-if="line.applications_count==0" class="font-700 color-piketplace" style="font-size: 10px;margin-right: 0;width: 100%;">{{$t('message.shipping_applying_form.no_application')}}</a>
                                        <router-link v-else class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace-outline" @click="" style="font-size: 10px;margin-right: 0;width: 100%;" :to="{ name: 'line_order_application', params: { id: line.id } }">{{$t('message.proposal_list')}}<i class="fas fa-shipping-fast"></i></router-link>
                                    </div>
                                    <div v-if="line.canPayOnPreorder" class="col-6 tw:inline-block ps-1">
                                        <a @click="pay(index)" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace" style="font-size: 12px;font-size: 12px;margin-right: 0;width: 100%;" >{{$t('message.pay')}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="line.application_selected" class="w-100">
                            <div class="w-100 font-11" style="line-height: 14px;">
                                <span class="badge btn-dark-piketplace tw:inline" v-if="line.deliver_pi_users_id==line.application_selected.user.id">{{$t('message.selected_text')}} <i class="fa fa-check-circle"></i></span>
                                <h5 class="tw:inline font-600 ms-1 me-1" style="font-size: 12px;margin-bottom: 0;">@{{line.application_selected.user.username}}</h5>
                                <!-- {{$t('message.nb_amount_for_time',{'amount':$functions.amount_format(line.application_selected.fee, $currency), 'time': line.application_selected.time, 'period': $t('message.time.'+$delivery_period.get(line.application_selected.period))})}} -->
                                <i18n-t keypath="message.nb_amount_for_time" tag="span" class="">
                                    <template #amount>
                                        <Amount :amount="line.application_selected.fee" class="font-400 font-14 color-black tw:inline"/>
                                    </template>
                                    <template #time>
                                        {{line.application_selected.time}}
                                    </template>
                                    <template #period>
                                        {{$t('message.time.'+$delivery_period.get(line.application_selected.period))}}
                                    </template>
                                </i18n-t>
                                <span class="font-12" v-if="line.application_selected.confirmed_at"> | {{$t('message.confirmed_at',{'date': $filters.formatDate(line.application_selected.confirmed_at, $i18n.locale)})}} <i class="fa fa-check-circle color-piketplace"></i></span>
                                <span class="font-10" style="color: #aaa;" v-else-if="line.application_selected.status=='selected'"> | {{$t('message.not_yet_confirmed')}}</span>
                                <!-- <p class="color-piketplace font-12 pt-1 mb-3" style="line-height: 20px;margin-top: 0;padding-top: 0;margin-bottom: 0!important;">{{$t('message.nb_amount_for_time',{'amount':$functions.amount_format(application.fee, $currency), 'time': application.time, 'period': $t('message.time.'+$delivery_period.get(application.period))})}}
                                    <br/>
                                    <span class=" font-10" style="color: #adb5bd!important;">
                                        {{$t('message.applied_on',{'date': $filters.formatDate(application.created_at)})}}
                                    </span>
                                </p>
                                <span v-if="!line.hasDeliver || application.status!='selected'" @click="display_confirmation(application.id)" class="btn badge font-12 btn-dark-piketplace">{{$t('message.select')}}</span>
                                <span v-if="line.deliver_pi_users_id==application.user.id">{{$t('message.selected_text')}} <i class="fa fa-check-circle color-piketplace"></i></span>
                                <span v-if="application.confirmed_at"> | {{$t('message.confirmed_at',{'date': $filters.formatDate(application.confirmed_at, $i18n.locale)})}} <i class="fa fa-check-circle color-piketplace"></i></span>
                                <span v-else-if="application.status=='selected'"> | {{$t('message.not_yet_confirmed')}}</span> -->
                            </div>
                        </div>
                        <div class="divider mb-0"></div>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottomPreOrders">
                    <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                    <div v-if="no_more_data" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
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

    import { v4 as uuidv4 } from 'uuid';
    import PayWith from '../components/PayWith.vue';

    export default {
        components: {
            PayWith
        },
        data: () => ({
            no_more_data: false,
            product: [],
            not_found: false,
            id: 0,
            //user: null,
            orders: [],
            line_orders: [],
            pre_orders: [],

            order_tab_active: true,
            shipped_tab_active: false,
            pre_order_tab_active: false,

            verifierPayment: null,

            current_page: 1,
            last_page: 2,
            data_pagination: null,

            selected_index: -1,
            isLoading: false,
            handling_fee_percentage: 0,
        }),
        created () {
            this.verifyIfPaymentDone();
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'saving', 'paid', 'maintenance_mode', 'payment_from', 'pi_balance', 'piket_balance', 'activate_google_ads']),
        },
        mounted() {
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.isLoading = true;
            this.loadOrders();
        },
        watch: {
            paid(newVal, oldVal){
                if (newVal === true) {
                    this.activeOrdersTab()
                }
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'clearPaymentVerifier', 'setUniqueId', 'launchPaymentVerifier', 'piPayment', 'setBalance']),
            reload(){
                this.loadOrders();
            },
            getLineTotalFee(line_order){
                let total = line_order.total
                if (line_order.canPayOnPreorder) {
                    total = line_order.total+line_order.fee
                }
                return this.$functions.scientific_annotation_to_decimal(total)
            },
            getLineTotalAll(line_order){
                let total = this.getLineTotalFee(line_order)
                let handling_fee = total*this.handling_fee_percentage/100
                return this.$functions.scientific_annotation_to_decimal(total+handling_fee)
            },
            getLineHandlingFeePiket(line_order){
                let total = this.getLineTotalFee(line_order)
                let handling_fee_piket = total*1000*this.handling_fee_percentage/100
                return this.$functions.scientific_annotation_to_decimal(handling_fee_piket)
            },
            async loadOrders() {
                this.isLoading = true;
                let user_id = this.user.id;
                let page = this.current_page;
                let not_shipped = true
                await axios.get('/orders', {params: {user_id, not_shipped, page}})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.line_orders;
                    this.line_orders.push(...res.data.line_orders.data);
                    this.last_page = this.data_pagination.last_page;
                    console.log("uuuuuuu",this.line_orders);
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                    //alert('error')
                })
            },
            async loadOrdersShipped() {
                this.isLoading = true;
                let user_id = this.user.id;
                let page = this.current_page;
                await axios.get('/shipped-line-orders', {params: {user_id, page}})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.line_orders;
                    this.line_orders.push(...this.data_pagination.data);
                    this.last_page = this.data_pagination.last_page;
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            async loadPreOrders() {
                this.isLoading = true;
                let pre_order_user_id = this.user.id;
                let page = this.current_page;
                await axios.get('/pre-orders', {params: {pre_order_user_id, page}})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.pre_orders;
                    this.pre_orders.push(...this.data_pagination.data);
                    this.last_page = this.data_pagination.last_page;
                    this.handling_fee_percentage = res.data.handling_fee_percentage;
                    console.log("this.pre_orders", this.pre_orders);
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            activeOrdersTab(){
                if (this.order_tab_active) {return}
                this.order_tab_active = true;
                this.shipped_tab_active = false;
                this.pre_order_tab_active = false;
                this.line_orders = [];
                this.reinitPaginationParam()
                //this.loadOrders()
            },
            activeShippedTab(){
                if (this.shipped_tab_active) {return}
                this.order_tab_active = false;
                this.shipped_tab_active = true;
                this.pre_order_tab_active = false;
                this.line_orders = [];
                this.reinitPaginationParam()
                //this.loadOrdersShipped()
            },
            activePreOrderTab(){
                if (this.pre_order_tab_active) {return}
                this.order_tab_active = false;
                this.shipped_tab_active = false;
                this.pre_order_tab_active = true;
                this.pre_orders = [];
                this.reinitPaginationParam()
                //this.loadPreOrders();
            },
            /*show_full_address(full){
                let msg = "<div style='text-align:center;'>"+this.$t("message.address.full_shipping_address")+"</div>"
                if (full.name!='' && full.name!='null') {
                    msg += "<br>"+this.$t('message.address.name')+" : <strong>"+full.name+"</strong>"
                }
                if (full.country_name!='' && full.country_name!='null') {
                    msg += "<br>"+this.$t('message.address.country_name')+" : <strong>"+full.country_name+"</strong>"
                }
                if (full.city!='' && full.city!='null') {
                    msg += "<br>"+this.$t('message.address.city')+" : <strong>"+full.city+"</strong>"
                }
                if (full.address!='' && full.address!='null') {
                    msg += "<br>"+this.$t('message.address.address')+" : <strong>"+full.address+"</strong>"
                }
                if (full.email!='' && full.email!='null') {
                    msg += "<br>E-mail"+" : <strong>"+full.email+"</strong>"
                }
                this.$functions.msg_box(this, 'info', this.$t("message.info"), "<div style='text-align:left;'>"+msg+"</div>");
            },*/
            show_full_address(full){
                let title = "<div style='text-align:center;'>"+this.$t("message.address.full_shipping_address")+"</div>"
                let name = this.$t('message.address.name')+" : <strong>"+full.name+"</strong>";
                let country_name = this.$t('message.address.country_name')+" : <strong>"+full.country_name+"</strong>";
                let city = this.$t('message.address.city')+" : <strong>"+full.city+"</strong>";
                let address = this.$t('message.address.address')+" : <strong>"+full.address+"</strong>";
                let phone_number = this.$t('message.address.phone_number')+" : <strong>"+full.phone_number+"</strong>";
                let msg = title+"<br>"+name+"<br>"+country_name+"<br>"+city+"<br>"+address+"<br>"+phone_number;
                this.$functions.msg_box(this, 'info', this.$t("message.info"), "<div style='text-align:left;'>"+msg+"</div>");
            },
            handleScrolledToBottomOrders(isVisible){
                
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoading = false
                    this.no_more_data = true
                    return;
                }
                this.current_page++
                this.loadOrders();
                //$('.loader').css('display', 'none');
            },
            handleScrolledToBottomOrdersShipped(isVisible){
                
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoading = false
                    this.no_more_data = true
                    return;
                }
                this.current_page++
                this.loadOrdersShipped();
                //$('.loader').css('display', 'none');
            },
            handleScrolledToBottomPreOrders(isVisible){
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoading = false
                    this.no_more_data = true
                    return;
                }
                this.current_page++
                this.loadPreOrders();
                //$('.loader').css('display', 'none');
            },
            reinitPaginationParam(){
                this.current_page = 0;
                this.last_page = 1;
            },
            pay(index){
                this.selected_index = index;
                this.$show_modal.show_modal({id:'select-wallet'})
            },
            pay_piketplace_wallet(){//Payment on preorder
                if (this.pi_balance < this.total) {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': this.pi_balance}))
                    return 0;
                }
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
                            this.pay_piketplace_call_set_pin_code()
                        }
                      }
                    }
                )
            },
            pay_piketplace_call_set_pin_code(){
                this.$confirm({
                  auth: true,
                  message: this.$t('message.put_your_code_pin'),
                  button: {
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.confirmation.no_cancel')
                  },
                  /**
                   * Callback Function
                   * @param {Boolean} confirm
                   * @param {String} password
                   */
                  callback: (confirm, password) => {
                    if (confirm && password) {
                        //alert('transfer start')
                        this.pay_piketplace_call(password)
                    }
                  }
                })
            },
            pay_piketplace_call(code_pin){//Payment on preorder
                this.$hide_modal.hide_modal('select-wallet')
                let preorder = this.pre_orders[this.selected_index]
                let dataPay = {
                    line_order_id: preorder.id,
                    code_pin: code_pin,
                    amount: preorder.total+preorder.fee,
                    user_id: this.user.id,
                    handling_fee_percentage: this.handling_fee_percentage,
                };
                this.saving = true
                axios.post('/pay-piketplace-wallet-preorder', dataPay)
                .then(res=>{
                    //this.jh = res.data
                    //let address = JSON.parse(res.data.address)
                    //console.log(address)
                    this.saving = false
                    console.log('pay-piketplace-wallet-preorder', res.data)
                    if (res.data.status===true) {
                        this.$functions.msg_box(this, 'success', this.$t('message.cart.success'), this.$t('message.cart.payment_done'))
                        //this.loadPreOrders()
                        this.activeOrdersTab()
                    }else if(res.data.message==='already_paid'){
                        this.$functions.msg_box(this, 'error', '', this.$t('message.already_paid'))
                    }else if(res.data.message){
                        this.$functions.msg_box(this, 'error', 'Info', this.$t(res.data.message))
                    }else{
                        this.setBalance()
                        let amount = this.$functions.amount_format(this.pi_balance, this.$currency)
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, {'amount': amount, 'libelle': res.data.data?'"'+res.data.data.product.libelle+'"':'', 'quantity_left': res.data.data?res.data.data.product.quantity:''}))
                    }
                })
                .catch(error=>{
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    console.log(error);
                })
            },
            pay_pi_network_wallet(){//Payment on preorder
                this.$hide_modal.hide_modal('select-wallet')
                this.uniqueId = uuidv4();
                this.setUniqueId(this.uniqueId);
                let preorder = this.pre_orders[this.selected_index]
                let memo_data = {
                    amount: this.$functions.amount_format(preorder.total, this.$currency),
                    fee: this.$functions.amount_format(preorder.fee, this.$currency)
                }
                this.paid = false
                let dataPay = {
                    //orderId: 3,
                    uniqueId: this.uniqueId,
                    line_order_id: preorder.id,
                    is_pre_order: true,
                    type: 5,//PURCHASE
                    memo: this.$t('message.product_purchase_with_shipping_fee_from_piketplace', memo_data),
                    amount: preorder.totalFee,
                    userId: this.user.id,
                };
                this.piPayment(dataPay);
            },
            cancel_confirmation(index){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto tw:inline" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
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
                          this.cancel_order(index)
                        }
                      }
                    }
                  )
            },
            cancel_order(index){
                this.saving = true
                let id = this.line_orders[index].id;
                let data = {cancelled: true}
                axios.put('/line-orders-api/'+id, data)
                .then(response => {
                    this.saving = false
                    console.log(response);
                    if (response.data.status===true) {
                        //this.line_order = response.data.line_order;
                        this.line_orders.splice(index, 1);
                        /*let tmp = this.line_orders;
                        this.line_orders = [];
                        this.line_orders = tmp;*/
                        this.$functions.msg_box(this, 'success', '', this.$t('message.saved'))
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                    
                }).catch(function (error) {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    console.log(error.response)
                })
            },
            verifyIfPaymentDone () {
                //let preorder = this.pre_orders[this.selected_index]
                this.payment_from = "cart";
                let uniqueId = this.uniqueId;
                let data = {
                    uniqueId:this.uniqueId,
                    //productId:preorder.product.id,
                    self:this,
                }
                this.launchPaymentVerifier(data)
            },
        }
    }
</script>

<style scoped>
    .message-badge {
      color: white;
      background-color: red;
      border-radius: 50%;
    }
    .lg-content{
        padding: 3px 4px;
    }
    .m-content{
        padding: 1px 4px;
    }
</style>
