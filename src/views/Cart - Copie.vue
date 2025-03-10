<template>
    <div style="">
        <Header ref="header" pageTitle="message.panier" :hide_settings_icon="true"/>
        <div id="select-address" class="menu menu-box-bottom rounded-m" data-menu-height="400" data-menu-effect="menu-over" style="display: block; height: 365px;">
            <div class="menu-title">
                <h1 class="font-24 color-piketplace pb-0">
                    {{$t('message.address.shipping_address')}}<br />
                    <span class="btn btn-xxs mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace align-middle" @click="open_add"><i class="fa fa-plus"></i>&nbsp;{{$t('message.new')}}</span>
                    &nbsp;<span class="btn btn-xxs mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace align-middle" @click="$router.push('/my-addresses')"><i class="fa fa-address-card"></i></span>
                </h1>
                <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
            </div>
            <div class="me-4 ms-3 mt-0">
                <div class="list-group list-custom-small" v-if="user && user.addresses != undefined && user.addresses!==null && user.addresses.length > 0">
                    <a :data-id="index" class="close-menu" v-for="(address, index) in user.addresses" v-on:click="select_address(index)">
                      
                      <span>{{address.address}}/{{address.city}}-{{address.country_name}}</span>
                    </a>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div id="new-address" class="menu menu-box-bottom rounded-m" data-menu-height="495" data-menu-effect="menu-over" style="display: block;background-color: rgba(255,255,255,.9);">
            <div class="menu-title">
                <p class="color-piketplace">{{$t('message.address.new_address')}}</p>
                <h1 class="font-24">{{$t('message.address.address')}}</h1>
                <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
            </div>
            <form class="content mt-0 mb-0">
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-name" :placeholder="$t('message.address.name')" v-model="form.name" v-on:input="hide_error_field('name')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.name')}}</label>
                </div>
                <div @click="call_country_select" class="no-borders has-icon validate-field mb-4" style="padding-left: 25px;">
                    <label class="color-gray font-11 font-500">{{country_city!=''?country_city:$t('message.select_country')}}</label>
                    <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                </div>
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-address" :placeholder="$t('message.address.street_address')" v-model="form.address" v-on:input="hide_error_field('address')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.street_address')}}</label>
                </div>
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-phone_number" :placeholder="$t('message.address.phone_number')" v-model="form.phone_number" v-on:input="hide_error_field('phone_number')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.phone_number')}}</label>
                </div>
                <div class="no-borders has-icon validate-field mb-4">
                    <SwitchButton id="as_default" label_color="#5b5757" label_font="font-300" :label="$t('message.set_as_default')" v-model:checked="form.is_default" style="padding-left: 10px;margin-top: 4px;"/>
                </div>
                <button @click.prevent="save_address" type="submit" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.add')}}</button>
            </form>
        </div>
        <div id="select-address-country" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 365px;">
            <div class="content" id="tab-group-3">
                <div class="tab-controls tabs-small tabs-rounded" data-highlight="bg-green-dark">
                    <a class="no-effect" @click="country_tab_active=true">
                        {{$t('message.select_country')}}
                        <span v-if="country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                    <a class="no-effect no-click">
                        {{$t('message.select_city')}}
                        <span v-if="!country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                </div>
            </div>
            <div v-if="country_tab_active" class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a v-for="country in countries" :key="country.id" @click="select_country(country.iso2)">
                      
                      <span>{{country.name}}</span>
                      <i v-html="$functions.isoToEmoji(country.iso2)" style="line-height: 34px;opacity: 1;"></i>
                    </a>
                </div>
                <div class="clear"></div>
            </div>
            <div v-else class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword_city" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="cities.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a class="close-menu" v-for="city in cities" :key="city.id" v-on:click="select_city(city.name)">
                      <span>{{city.name}}</span>
                    </a>
                </div>
                <div v-else-if="isLoadingCities" style="text-align: center;">
                    <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">
                </div>
                <div v-else-if="cities.length == 0" style="text-align: center;">
                    <div class="no_more_data" style="">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <PayWith @payPiketplace="pay_piketplace_wallet" @payPinetwork="pay_pi_network_wallet" />
        <div class="page-content">
            <!-- <AdSense/> -->
            <Adsense style="margin-bottom: 20px;"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            
            <div v-if="isLoggedIn && cart.length > 0">
                <div class="card card-style mb-2" v-for="(c,index) in cart" :key="index" :id="'content-'+c.product.id" style="padding: 20px 15px;">
                    <em v-if="c.product.quantity<c.quantity" class="color-piketplace" style="font-size: 11px;">
                        {{$t('message.cart.qty_insufficient', {quantity: c.product.quantity})}}
                    </em>
                    <div class="d-flex">
                        <div style="margin: auto;">
                            <i v-if="!c.pre_order || c.noshipping" class="fa fa-check-circle color-green-dark" style="height: 21px;margin-right: 5px;"></i>
                            <i v-else class="fa fa-times-circle color-piketplace" style="height: 21px;margin-right: 5px;"></i>
                        </div>
                        <div>
                            <img @click="$router.push('/product/'+c.product.id)" :src="c.product.imageFirst" class="rounded-sm" width="150" style="border:1px solid lightgray;">
                        </div>
                        <div class="w-100 ms-3 pt-1">
                            <h6 class="font-500 font-14 pb-2">{{c.product.libelle}}</h6>
                            <Amount :amount="c.product.price" class="font-700 font-14 color-yellow-piketplace" />
                            <!-- <h5 class="font-500 font-12" v-if="c.final_free_shipping">
                                Le vendeur vous apportera le produit
                            </h5> -->
                            <h5 class="font-500 font-12" v-if="c.final_paid_shipping && !c.noshipping">
                                <!-- <span v-if="c.paid_shipping_info.selected">
                                    {{$t('message.shipping_cost',{'amount': $functions.amount_format(c.paid_shipping_info.selected.fee, $currency)})}}
                                </span> -->
                                <i18n-t keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                    <template #amount>
                                      <Amount :amount="c.paid_shipping_info.selected.fee" class=""/>
                                    </template>
                                </i18n-t>
                            </h5>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="edit_space stepper rounded-s float-start">
                            <a class="stepper-sub" @click="decrement(c.product.id)" style="height: 30px;">
                                <i class="fa fa-minus color-theme opacity-40"></i>
                            </a>
                            <input type="number" min="1" max="99" v-model="c.quantity" @input="total_func" style="height: 30px;">
                            <a class="stepper-add" @click="increment(c.product.id)" style="height: 30px;">
                                <i class="fa fa-plus color-theme opacity-40"></i>
                            </a>
                        </div>
                        <a class="float-start mt-1 ms-4 color-theme font-9" style="margin-left: 10px!important;">
                            <i class="fa fa-trash color-piketplace me-1" @click="removeConfirmation(c.product.id);">&nbsp;{{ $t('message.cart.remove') }}</i> 
                        </a>
                        <SwitchButton v-if="!c.final_free_shipping" :id="c.product.id" :label="$t('message.address.no_shipping')" v-model:checked="c.noshipping" @change="has_shipping()" style="padding-left: 10px;float: right;margin-top: 4px;"/>
                        <span v-else class="noshipping float-start mt-1 ms-4 font-11 color-theme font-12" style="">
                            <label style="">
                                {{ $t('message.free_shipping.text') }}
                            </label>
                        </span>
                    </div>
                    <p v-if="c.noshipping" class="mb-1 mt-1" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;">
                        <i class="fas fa-info-circle" style="color: #000;"></i>
                        {{$t('message.no_shipping_getting_product_from_seller')}}
                    </p>
                    <div class="divider mb-1"></div>
                    <div v-show="!c.direct_free_shipping && !c.noshipping">
                        <h4 class="font-12" v-if="c.in_a_freezone_city"><!-- Are you in free shipping zone ? {{c.free_shipping_info.zone}} -->
                            {{$t('message.are_you_in_free_shipping_zone',{'zone': c.free_shipping_info})}}
                        </h4>
                        <div class="row mt-0 mb-0 me-3 ms-3" v-show="c.in_a_freezone_city">
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="yes" :id="'in_free_shipping_zone_yes'+c.product.id" v-model="c.in_free_shipping_zone" @change="pre_order_process(index)">
                                    <label class="form-check-label" :for="'in_free_shipping_zone_yes'+c.product.id">{{$t('message.yes')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="no" :id="'in_free_shipping_zone_no'+c.product.id" v-model="c.in_free_shipping_zone" @change="pre_order_process(index)">
                                    <label class="form-check-label" :for="'in_free_shipping_zone_no'+c.product.id">{{$t('message.no')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-12" style="text-align: left;" v-if="c.in_free_shipping_zone=='yes'">
                                <p style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 0 0 20px 0;">
                                    <i class="fas fa-info-circle" style="color: #000;"></i> {{$t('message.free_shipping.seller_will_ship_free')}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="!c.direct_paid_shipping && !c.direct_free_shipping && !c.noshipping">
                        <h4 class="font-12" v-if="(c.in_free_shipping_zone=='no' && c.in_a_paidzone_city) || (c.in_a_paidzone_city && !c.in_a_freezone_city)"><!-- Are you in paid shipping zone ? {{c.paid_shipping_info.zone}} -->
                            {{$t('message.are_you_in_paid_shipping_zone',{'zone': c.paid_shipping_info?c.paid_shipping_info.zone_list:''})}}
                        </h4>
                        <div class="row mt-0 mb-0 me-3 ms-3" v-if="(c.in_free_shipping_zone=='no' && c.in_a_paidzone_city) || (c.in_a_paidzone_city && !c.in_a_freezone_city)">
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="yes" :id="'in_paid_shipping_zone_yes'+c.product.id" v-model="c.in_paid_shipping_zone" @change="pre_order_process(index)">
                                    <label class="form-check-label" :for="'in_paid_shipping_zone_yes'+c.product.id">{{$t('message.yes')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="no" :id="'in_paid_shipping_zone_no'+c.product.id" v-model="c.in_paid_shipping_zone" @change="pre_order_process(index)">
                                    <label class="form-check-label"  :for="'in_paid_shipping_zone_no'+c.product.id">{{$t('message.no')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-12" style="text-align: left;" v-if="c.in_paid_shipping_zone=='yes'">
                                <h3>{{$t('message.choose_shipping_zone')}}</h3>
                                <div v-for="zone in c.product.shipping_zone.filter(x=>x.country_code==address.country_code)" @click="zone_select(index, zone)" style="background-color: lightgray;color: black;padding: 10px;border-radius: 10px;margin: 10px  10px 0;display: inline-block;">
                                    {{zone.zone}} : + {{$functions.amount_format(zone.fee, $currency)}}
                                    <i v-if="c.paid_shipping_info.selected && zone.zone==c.paid_shipping_info.selected.zone" class="fa fa-check-circle color-green-dark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="addressSet && c.pre_order && !c.noshipping" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;line-height: 20px;">
                        <i class="fas fa-info-circle" style="color: #000;"></i>
                        {{$t('message.preorder_registration_message')}}
                    </p>
                    <strong class="no-effect color-theme mt-1" :class="!in_apply_form?'break-word':''" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" style="display: block;line-height: 18px;">
                        <i class="fas fa-map-marker-alt me-2 color-piketplace" style="font-size: 18px;"></i><em>{{$t('message.product_address')}}</em> :
                        {{getCountryNameByCode(c.product.country_code)}}/{{c.product.city}}
                    </strong>
                </div>
                <div class="card card-style">
                    <div class="content mb-2 mt-3">
                        <div class="">
                            <div class=" w-60">
                                <span class="font-600 color-piketplace mb-0 font-13">{{ $t('message.handling_fee') }}</span>
                                <!-- <span class="font-600 font-13">+{{handling_fee_percentage}}%</span> -->
                                <Amount :amount="handling_fee_percentage" type="percentage" class="font-900 font-13 tw-inline tw-float-right"/>
                            </div>
                            <div class=" w-60">
                                <span class="font-600 color-piketplace mb-0 font-13">{{ $t('message.cart.total') }}</span>
                                <!-- <span class="font-600 font-12 tw-float-right">
                                    {{$currency}}{{$functions.get_before_dot_part(totalFee, 7)}}<sup>.{{$functions.get_after_dot_part(totalFee, 7)}}</sup>
                                    /
                                    {{$currency}}{{$functions.get_before_dot_part(total, 7)}}<sup>.{{$functions.get_after_dot_part(total, 7)}}</sup>+{{handling_fee_piket}}Piket
                                </span> -->
                                <span class="font-600 font-12 tw-float-right">
                                    <Amount :amount="totalFee" class="font-900 tw-inline"/>
                                    /
                                    <Amount :amount="total" class="font-900 tw-inline"/><span class="font-900 tw-font-sans">+{{handling_fee_piket}}Piket</span>
                                </span>
                            </div>
                            <div class="w-100 pt-1" v-if="!noShipping">
                                <h6 class="font-600 font-14">
                                    {{ $t('message.address.shipping') }}
                                    <span class="float-end color-piketplace" @click="add_address" style="cursor: pointer;">
                                        <i class="fa fa-pencil"></i>
                                    </span>
                                </h6>
                                <div class="divider mb-2 mt-1"></div>
                                <h6 class="font-800 font-14">
                                    {{ $t('message.address.name') }}
                                    <span class="font-600 float-end color-piketplace">
                                        {{address.name}}
                                    </span>
                                </h6>
                                <h6 class="font-800 font-14">
                                    {{ $t('message.address.country') }}
                                    <span class="font-600 float-end color-piketplace">
                                        {{address.country_name}}
                                    </span>
                                </h6>
                                <h6 class="font-800 font-14">
                                    {{ $t('message.address.city') }}
                                    <span class="font-600 float-end color-piketplace">
                                        {{address.city}}
                                    </span>
                                </h6>
                                <h6 class="font-800 font-14">
                                    {{ $t('message.address.street_address_shorten') }}
                                    <span class="font-600 float-end color-piketplace">
                                        {{address.address}}
                                    </span>
                                </h6>
                                <h6 class="font-800 font-14">
                                    {{ $t('message.address.phone_number_shorten') }}
                                    <span class="font-600 float-end color-piketplace">
                                        {{address.phone_number}}
                                    </span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center;" class="color-piketplace" v-if="at_least_one_product_qty_insufficient">
                    {{ $t('message.cart.one_more_product_qty_insufficient') }}
                </div>
                <div v-else>
                    <div v-if="can_pay">
                        <a v-if="!confirmed" class="close-menu btn btn-margins btn-full btn-dark-piketplace-outline font-13 btn-l font-600 mt-3 rounded-sm" @click="confirm_cart">{{ $t('message.confirm')}}</a>
                        <a v-else class="btn btn-margins btn-full btn-dark-piketplace font-13 btn-l font-600 mt-3 rounded-sm" @click="pay_with">{{ $t('message.cart.proceed_to_checkout')}}</a>
                    </div>
                    <a v-else class="close-menu btn btn-margins btn-full btn-dark-piketplace-outline font-13 btn-l font-600 mt-3 rounded-sm" @click="pre_command()">{{ $t('message.save_as_preorder')}}</a>
                </div>
            </div>
            <div v-else-if="!isLoggedIn && !isLoading">
                <div style="width: 100%;text-align: center;margin-top: 20px">
                    <button @click="login({confirm: $confirm, i18n: $i18n, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
            <div style="text-align: center;" v-else-if="cart.length == 0 && isLoggedIn">
                <a class="no_more_data">{{ $t('message.cart.empty_cart') }}</a>
            </div>
            <div v-else-if="error_message != '' && !isLoading">
                <a @click="reload" class="color-black" style="text-transform: capitalize;">{{$t('message.reload')}} <i class="fa fa-undo color-piketplace"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    //import VueLoadingButton from "vue-loading-button";
    import { v4 as uuidv4 } from 'uuid';
    import {functions} from '../functions.js'
    import PayWith from '../components/PayWith.vue';
    import SwitchButton from '../components/SwitchButton.vue'
    //import AdSense from '../components/AdSense.vue'
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        name: "Cart",
        components: {
            //VueLoadingButton,
            PayWith,
            SwitchButton, 
            //AdSense
        },
        data() {
            return {
                form: {
                    name: "",
                    country_code: "",
                    country_name: "",
                    city: "",
                    address: "",
                    phone_number: "",
                    is_default: false
                },
                address: {
                    name: "",
                    country_code: "",
                    country_name: "",
                    city: "",
                    address: "",
                    phone_number: "",
                    is_default: false
                },
                isLoadingCountry: false,
                title: 'Cart',
                cart: [],
                total: 0,
                totalFee: 0,
                //user: null,
                edit_status: false,
                order_id: 0,
                isNewAddress: 'true',
                noShipping: false,
                freeShipping: true,
                addressSet: false,
                submit: false,
                confirmed: false,
                can_pay: false,
                connected: false,
                verifierPayment: null,
                forRemoveId: 0,
                errors: [],
                cities: [],
                country_tab_active: true,
                keyword: "",
                keyword_city: "",
                country_city: "",
                error_message: "",
                isLoading: false,
                countries: [],
                handling_fee_percentage: 0,
                handling_fee_piket: 0,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'uniqueId', 'locale', 'prevRoute', 'error', 'connecting', 'deleting', 'maintenance_mode', 'isOpenLoading', 'purchase_activation', 'country_cities', 'payment_from', 'at_least_one_product_qty_insufficient', 'countries_db', 'isLoadingCities', 'country_cities','saving']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        created () {
            this.verifyIfPaymentDone();
        },
        beforeUnmount () {
            this.setUniqueId('')
            this.clearPaymentVerifier()
        },
        mounted() {
            console.log('mount start')
            if (this.maintenance_mode) {
                this.$router.push('/maintenance')
            }
            this.countries = this.countries_db
            this.initLoaders()
            /*if (this.isLoggedIn) {
                if (this.memory_data) {
                    this.cart = this.memory_data.cart_data.cart
                    this.total = this.memory_data.cart_data.total
                    this.total_func()
                }
                this.getCart()//Getting user cart from the server
            }*/
            if (this.isLoggedIn) {
                this.getCart()//Getting user cart from the server
            }
            
            this.$functions.scrollToTop()

            this.newCountryLoading();
            //this.showPiAds()
        },
        watch: {
            keyword(after, before) {
                //this.getResults();
                //this.search();
                this.newCountryLoading()
            },
            keyword_city(after, before) {
                //this.getResults();
                this.search_city();
            },
            locale(after, before) {
                //this.getResults();
                this.newCountryLoading();
            },
            isLoggedIn(newVal, oldVal){
                if (newVal) {
                    this.reload();
                    this.loadDefaultAddress()
                }
            },
            country_cities(n, o){
                this.cities = this.country_cities
            },
            at_least_one_product_qty_insufficient(newVal, oldVal){
                if (newVal === true) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.cart.one_more_product_qty_insufficient"))
                }
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'clearPaymentVerifier', 'initLoaders', 'launchPaymentVerifier', 'piPayment', 'getCities', 'getCountryNameByCode', 'setUniqueId', 'showPiAds']),
            search_city(){
                this.cities = this.country_cities
                this.cities = this.cities.filter(el => {
                    let name = el.name.toLowerCase()
                    name = this.$functions.removeAccentCharacter(name)

                    let search = this.keyword_city.toLowerCase()
                    search = this.$functions.removeAccentCharacter(search)
                    return name.includes(search)
                });
            },
            async getProduct(id) {
                let res = await axios.get(`/product/${id}`);
                    /*.then(res => this.products.push(...res.data))
                    .catch(error => {});*/
                return res.data.products;
            },
            reload(){
                this.isLoading = true;
                this.getCart();
            },
            loadDefaultAddress(){
                let address = this.form
                if (this.isLoggedIn && this.user.addresses) {
                    for (var i = 0; i < this.user.addresses.length; i++) {
                        this.user.addresses[i]
                        if (this.user.addresses[i].is_default === true) {
                            address = this.user.addresses[i]
                            break
                        }
                    }
                    this.address = address
                    this.addressSet = true
                    this.cart_addresses_comparison()
                }

            },
            async getCart() {
                this.error_message = "";
                this.isLoading = true;
                let username = this.user.username;
                let res = await axios.get(`/product/cart`, {params: {username}})
                .then(res => {
                    console.log('ccarrt ', res.data);
                    this.isLoading = false;
                    this.total = res.data.total;
                    this.cart = res.data.cart;
                    this.user = res.data.user;
                    this.handling_fee_percentage = res.data.handling_fee_percentage;
                    //this.update_memory_data({cart_data: {cart: this.cart, total: this.total}});
                    this.has_shipping();
                    //this.has_free_shipping();
                    //console.log(this.cart);
                    this.loadDefaultAddress()
                })
                .catch(error => {
                    this.isLoading = false;
                    this.error_message = this.$i18n.t('message.an_error_occured');
                });
            },
            removeConfirmation(id){
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
                          this.remove(id)
                        }
                      }
                    }
                )
            },
            remove(id) {
                this.deleting = true
                let username = this.user.username;
                let res = axios.post(`/product/delete-line-cart`, {id:id, username:username})
                    .then(res => {
                        this.deleting = false
                        console.log("after delete", res.data.cart);
                        if (res.data.status === true) {
                            this.total = res.data.total;
                            this.cart = res.data.cart;
                            this.update_memory_data({cart_data: {cart: this.cart}})
                            this.cart_addresses_comparison()
                        }
                        //this.$hide_modal.hide_modal('menu-option-delete-modal');
                    })
                    .catch(error => {
                        this.deleting = false
                    });
            },
            increment(id) {
                /*if (!this.edit_status) {
                    return;
                }*/

                var index = this.cart.findIndex(obj => { return obj.product.id === id });
                this.cart[index].quantity++;
                this.total_func();
            },
            decrement(id) {
                /*if (!this.edit_status) {
                    return;
                }*/
                var index = this.cart.findIndex(obj => { return obj.product.id === id });
                /*if (this.cart[index].quantity < 1) {
                    this.cart[index].quantity = 1;
                    return;
                }*/
                let old = parseInt(this.cart[index].quantity);
                if (isNaN(old) || old <= 1) {return;}
                this.cart[index].quantity--;
                this.total_func();
            },
            total_func(){
                let total = 0;
                this.at_least_one_product_qty_insufficient=false
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].product.quantity<this.cart[i].quantity) {
                        this.at_least_one_product_qty_insufficient=true
                    }
                    if (this.cart[i].pre_order && !this.cart[i].noshipping) {
                        continue
                    }
                    /*if (this.cart[i].pre_order) {
                        continue
                    }*/
                    if (this.cart[i].final_paid_shipping && !this.cart[i].noshipping) {
                        total += parseFloat(this.cart[i].paid_shipping_info.selected.fee);
                    }
                    let subTotal = parseFloat(this.cart[i].product.price) * parseInt(this.cart[i].quantity);
                    total += subTotal;
                }
                //this.total = Number(total).toFixed(7);
                this.total = total
                this.handling_fee_piket = total*1000*this.handling_fee_percentage/100
                let handling_fee = total*this.handling_fee_percentage/100
                total+=handling_fee
                //this.totalFee = Number(total).toFixed(7);
                this.totalFee = total
                this.confirmed = false
            },
            change_edit_status() {
                if (this.edit_status) {
                    $('.edit_space').addClass('unactive');
                    $('#btn_edit').css('display', 'block');
                    $('#btn_done').css('display', 'none');
                    $('.noshipping input').attr('disabled', 'disabled');
                    this.edit_status = false;
                    this.edit();
                }else{
                    $('.edit_space').removeClass('unactive');
                    $('#btn_edit').css('display', 'none');
                    $('#btn_done').css('display', 'block');
                    $('.noshipping input').removeAttr('disabled');
                    this.edit_status = true;
                }
                
            },
            edit() {
                let username = this.user.username;
                let cart = this.cart.map(function(idx, elem) {
                    let ret = {'id': idx.product.id, 'quantity': idx.quantity, 'noshipping': idx.noshipping};
                    if (idx.product.free_shipping) {
                        ret['free_shipping'] = true;
                        ret['in_free_shipping_zone'] = false;
                    }
                    if (idx.in_free_shipping_zone) {
                        ret['in_free_shipping_zone'] = true;
                    }
                    return {'id': idx.product.id, 'quantity': idx.quantity, 'noshipping': idx.noshipping};
                });

                axios.post(`/product/cart/edit`, {username:username, cart:cart})
                .then(res => {
                    this.total = res.data.total;
                    this.cart = res.data.cart;
                    this.verif();
                })
                .catch(error => {});
                /*values = [1, 2, 3],
                associated = keys.reduce(function (previous, key, index) {
                    previous[key] = values[index];
                    return previous
                }, {})*/
            },
            add_address(){
                this.submit = false;
                document.getElementById('select-address').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            has_shipping(){
                this.confirmed = false;
                this.can_pay = false;
                this.total_func()
                for (var i = 0; i < this.cart.length; i++) {
                    if (!this.cart[i].noshipping) {
                        this.noShipping = false;
                        //console.log('hg', this.cart[i].noshipping);
                        return true;
                    }
                }
                //alert('has_shipping eeee')
                this.noShipping = true;
                this.can_pay = true;

                return false;
            },
            has_free_shipping(){
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].final_free_shipping) {
                        return true;
                    }
                }
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].product.free_shipping && this.cart[i].in_free_shipping_zone) {
                        return true;
                    }
                }
                this.freeShipping = false;
                return false;
            },
            pay_with(){
                if (!this.purchase_activation) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.purchase_deactivated"))
                    return
                }
                document.getElementById('select-wallet').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            pay_piketplace_wallet(){
                if (!this.purchase_activation) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.purchase_deactivated"))
                    return
                }
                this.submit = true;
                if (!this.noShipping && !this.addressSet) {
                    document.getElementById('select-address').classList.add('menu-active');
                    document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
                    return 0;
                }
                if (this.edit_status) {
                    this.$show_modal.show_modal({
                        id:'menu-warning-modal',
                        title:this.$t('message.publishForm.error'),
                        message:this.$t('message.cart.save_edit_mode'),
                        btn_text:this.$t('message.Ok'),
                    });
                    return 0;
                }
                if (this.user.balance < this.total) {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': this.$functions.amount_format(this.user.balance, this.$currency)}))
                    return 0;
                }
                this.$hide_modal.hide_modal('select-wallet')
                //if (!this.noShipping) {
                    let dataPay = {
                        user_id: this.user.id,
                        isNewAddress: this.isNewAddress,
                        total: this.total,
                        address: this.address,
                        handling_fee_percentage: this.handling_fee_percentage,
                    }
                    this.saving = true
                    /*console.log('dataPay', dataPay)
                    return*/
                    axios.post('/payment-piketplace-wallet', dataPay)
                    .then(res=>{
                        this.saving = false
                        //this.jh = res.data
                        //let address = JSON.parse(res.data.address)
                        //console.log(address)
                        console.log(res.data)
                        if (res.data.status===true) {
                            /*$('.nb_notif').html(res.data.nb_notifications);
                            $('.nb_cart').html('0');
                            this.$show_modal.show_modal({
                                id:'menu-success-modal',
                                title:this.$t('message.cart.success'),
                                message:this.$t('message.cart.payment_done'),
                                btn_text:this.$t('message.Ok'),
                            });
                            this.$router.push('/my-orders');*/
                            this.$functions.msg_box(this, 'success', 'Info', this.$t('message.cart.payment_done'), '/my-orders')
                        }else{
                            let amount = this.$functions.amount_format(res.data.user.balance, this.$currency)
                            this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, {'amount': amount, 'libelle': res.data.data?'"'+res.data.data.product.libelle+'"':'', 'quantity_left': res.data.data?res.data.data.product.quantity:''}))
                        }
                    })
                    .catch(error=>{
                        this.saving = false
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                        console.log(error);
                    })
                //}
            },
            pay_pi_network_wallet(){
                if (!this.purchase_activation) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.purchase_deactivated"))
                    return
                }
                this.submit = true;
                if (!this.noShipping && !this.addressSet) {
                    /*return this.$show_modal.show_modal({
                        id:'select-address',
                        title:'',
                        message:'',
                    });*/
                    document.getElementById('select-address').classList.add('menu-active');
                    document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
                    return 0;
                }
                if (this.edit_status) {
                    this.$show_modal.show_modal({
                        id:'menu-warning-modal',
                        title:this.$t('message.publishForm.error'),
                        message:this.$t('message.cart.save_edit_mode'),
                        btn_text:this.$t('message.Ok'),
                    });
                    return 0;
                }
                this.$hide_modal.hide_modal('select-wallet')
                //this.uniqueId = uuidv4();
                if (this.uniqueId == '') {
                    this.setUniqueId(uuidv4());
                    this.verifyIfPaymentDone();
                }
                let data = {
                    //orderId: 3,
                    uniqueId: this.uniqueId,
                    type: 5,//PURCHASE
                    memo: this.$t('message.product_purchase'),
                    amount: this.total,
                    total: this.total,
                    userId: this.user.id,
                    isNewAddress: this.isNewAddress,
                    handling_fee_percentage: this.handling_fee_percentage,
                };
                if (!this.noShipping) {
                    data.address_obj = this.address
                }
                if (this.user.token < this.handling_fee_piket) {
                    data.amount = this.totalFee
                    data.handling_fee = this.total*this.handling_fee_percentage/100
                    data.is_piket = 'false'
                }else{
                    data.handling_fee_piket = this.handling_fee_piket
                    data.is_piket = 'true'
                }
                this.piPayment(data);
                //this.$store.dispatch('payment', data);
                /*this.submit = true;
                if (this.noShipping) {
                    this.store_order();
                }else{
                    if (this.addressSet) {
                        this.store_order();
                    }else
                        this.$show_modal.show_modal('select-address');
                }*/
            },
            call_country_select(){
                this.country_tab_active = true;
                this.$hide_modal.hide_modal('new-address');
                //this.$show_modal.show_modal('select-address-country');
                document.getElementById('select-address-country').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            open_add(){
                this.$hide_modal.hide_modal('select-address');
                //this.$show_modal.show_modal('new-address');
                document.getElementById('new-address').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            newCountryLoading() {
                this.countries = this.countries_db
                this.countries.forEach((val, index) => {
                    let nm = val.translations[this.locale]
                    val.name = nm==undefined?val.translations.en:nm
                    val.sortname = this.$functions.removeAccentCharacter(val.name.toLowerCase())
                })
                this.countries.sort((a, b) => {
                  var nameA = a.sortname.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.sortname.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  // names must be equal
                  return 0;
                });
                if (this.keyword && this.keyword != '') {
                    this.countries=this.countries.filter((val) => {
                        return val.sortname.toUpperCase().includes(this.keyword.toUpperCase()) || val.iso2.toUpperCase().includes(this.keyword.trim().toUpperCase()) || val.iso3.toUpperCase().includes(this.keyword.trim().toUpperCase())
                    })
                }
            },
            getResults() {
                this.isLoadingCountry = true
                let locale = this.$i18n.locale;
                axios.get('/livesearch-country', { params: { keyword: this.keyword, locale } })
                    .then(res => {
                        this.isLoadingCountry = false
                        this.countries = res.data
                    })
                    .catch(error => {
                        this.isLoadingCountry = false
                    });
            },
            select_country(code){
                let index = this.countries_db.findIndex(el => el.iso2 === code);
                let country = this.countries_db[index]
                this.form.country_code = code;
                this.form.country_name = country.name;
                this.country_tab_active = false;
                this.country_cities = []
                this.getCities({code:code, self:this})
                this.form.city = ''
                this.keyword_city = ""
            },
            select_city(city){
                this.form.city = city
                this.country_city = this.form.country_name+", "+city
                this.$hide_modal.hide_modal('select-address-country');
                //this.$show_modal.show_modal('new-address');
                document.getElementById('new-address').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            save_address(){
                if (!this.is_valid()) {
                    let messages = this.errors;
                    for (var i = 0; i < messages.length; i++) {

                        let text = messages[i].replace('required-', '');
                        text = this.$t('message.address.'+text);
                        console.log(messages[i], text);
                        $('#'+messages[i]).addClass('red-placeholder');
                        $('#'+messages[i]).attr('placeholder', text+' - '+this.$t('message.required_text'));
                        //messages[i]
                    }
                    return false;
                }
                this.address = this.form;
                this.addressSet = true;
                this.isNewAddress = 'true';
                /*if (this.submit) {
                    this.store_order();
                }*/
                this.$hide_modal.hide_modal('new-address');
                this.cart_addresses_comparison()
                //this.pay();
            },
            hide_error_field(id){
                $('#required-'+id).removeClass('red-placeholder');
                $('#required-'+id).attr('placeholder', this.$t('message.address.'+id));
            },
            is_valid(){
                this.errors = [];
                if(this.form.name == ""){
                    this.errors.push('required-name');
                }
                if(this.form.country_name == ""){
                    this.errors.push('required-country_name');
                }
                if(this.form.city == ""){
                    this.errors.push('required-city');
                }
                if(this.form.address == ""){
                    this.errors.push('required-address');
                }
                if(this.form.phone_number == ""){
                    this.errors.push('required-phone_number');
                }
                return this.errors.length == 0;
            },
            async store_order(){
                let uid = this.user.uid;
                let cart = this.cart;
                let address = this.address;
                let isNewAddress = this.isNewAddress;
                await axios.post(`/storeOrder`, {uid:uid, cart:cart, address:address,isNewAddress:isNewAddress})
                    .then(res => {
                        this.order_id = res.data.order.id;
                        this.user = res.data.user;
                        //console.log(res);
                        let data = {
                            orderId: this.order_id,
                            type: 'purchase',
                            memo: 'purchase',
                            amount: this.total,
                            userId: this.user.id,
                        };
                        this.$pay.payment(data);
                    })
                    .catch(error => {
                        this.$show_modal.show_modal('comment_sent');
                    });
            },
            async save_cart(){
                console.log('fgdffdfd gv', this.cart)
                this.saving = true
                let user_id = this.user.id;
                let cart = this.cart;
                let address = this.address;
                let isNewAddress = this.isNewAddress;
                await axios.post(`/save-cart`, {user_id:user_id, cart:cart, address: address})
                    .then(res => {
                        this.saving = false
                        if (res.data.status) {
                            this.user = res.data.user;
                            this.confirmed = true;
                            this.$functions.msg_box(this, 'success', '', this.$t('message.cart.confirmed_successfully'))
                        }else if(res.data.message == "message.invalid_address"){
                            this.$functions.msg_box(this, 'error', '', this.$t('message.invalid_address'))
                            //console.log(res.data)
                        }else{
                            let product = res.data.data.product
                            let libelle = product.libelle
                            let quantity_selling = product.quantity_selling?product.quantity_selling:0
                            let quantity_left = product.quantity-quantity_selling
                            this.$functions.msg_box(this, 'error', '', this.$t('message.cart.quantity_insufficient', {'libelle': libelle, 'quantity_left': quantity_left}))
                            //console.log(res.data)
                        }
                        
                        /*this.$show_modal.show_modal({
                            id:'menu-success-modal',
                            title:this.$t('message.cart.success'),
                            message:"confirmed",
                            hide: true,
                            time: 2000,
                            height: 250,
                        });*/
                        //console.log(res);
                    })
                    .catch(error => {
                        this.saving = false
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    });
            },
            async store_precommand_confirmation(){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
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
                            this.store_precommand()
                        }
                      }
                    }
                )
            },
            async store_precommand(){
                this.saving = true
                let user_id = this.user.id;
                let cart = this.cart;
                let address = this.address;
                let isNewAddress = this.isNewAddress;
                axios.post(`/store-precommand`, {user_id:user_id, cart:cart, address:address,isNewAddress:isNewAddress})
                    .then(res => {
                        this.saving = false
                        //console.log('res.data store-precommand', res.data)
                        if (res.data.status===true) {
                            this.user = res.data.user;
                            this.$functions.msg_box(this, 'success', '', this.$t("message.pre_command_successfully"), '/my-orders')
                        }else{
                            this.cart = res.data.cart
                            this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, {libelle: res.data.data.product.libelle, quantity_left: res.data.data.product.quantity}))
                        }
                    })
                    .catch(error => {
                        this.saving = false
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    });
            },
            select_address(index){
                let addresses =this.user.addresses;
                console.log(addresses);
                this.address = addresses[index];
                this.isNewAddress = 'false';
                this.addressSet = true;
                this.$hide_modal.hide_modal('select-address');
                this.cart_addresses_comparison()
                if (this.submit) {
                    //this.pay();
                }
            },
            cart_addresses_comparison(){
                for (var i = 0; i < this.cart.length; i++) {
                    this.cart[i].free_shipping_info = "";
                    this.cart[i].paid_shipping_info = {};
                    ///////////////////////////////////////////////
                    this.cart[i].final_free_shipping = false;
                    this.cart[i].final_paid_shipping = false;
                    ///////////////////////////////////////////////
                    let c = this.cart[i]
                    this.cart[i].pre_order = false;
                    this.cart[i].direct_free_shipping = false;
                    this.cart[i].direct_paid_shipping = false;
                    if (c.free_shipping) {
                        let in_a_freezone_city = false;
                        for (var j = 0; j < c.product.free_shipping_zone.length; j++) {
                            ////////////////////////////////////
                            if (c.product.free_shipping_zone[j].country_code==this.address.country_code) {
                                if (c.product.free_shipping_zone[j].city==null || (c.product.free_shipping_zone[j].city==this.address.city && c.product.free_shipping_zone[j].zone=="") || (c.product.free_shipping_zone[j].city==this.address.city && c.product.free_shipping_zone[j].zone==this.address.address)) {
                                    this.cart[i].direct_free_shipping = true;
                                    this.cart[i].free_shipping_info = c.product.free_shipping_zone[j];
                                    break;
                                }else if(c.product.free_shipping_zone[j].city==this.address.city && c.product.free_shipping_zone[j].zone!=this.address.address){
                                    in_a_freezone_city = true;
                                    this.cart[i].free_shipping_info = c.product.free_shipping_zone.map((item) => item.zone).join(', ')
                                    break;
                                }
                            }
                            ////////////////////////////////////
                            /*if (c.product.free_shipping_zone[j].country_code==this.form.country_code && c.product.free_shipping_zone[j].city=="") {
                                this.cart[i].direct_free_shipping = true;
                                this.cart[i].free_shipping_info = c.product.free_shipping_zone[j];
                                break;
                            }
                            if (c.product.free_shipping_zone[j].country_code==this.form.country_code && c.product.free_shipping_zone[j].city==this.form.city && c.product.free_shipping_zone[j].zone=="") {
                                this.cart[i].direct_free_shipping = true;
                                this.cart[i].free_shipping_info = c.product.free_shipping_zone[j];
                                break;
                            }
                            if (c.product.free_shipping_zone[j].country_code==this.form.country_code && c.product.free_shipping_zone[j].city==this.form.city && c.product.free_shipping_zone[j].zone!="") {
                                in_a_freezone_city = true;
                                this.cart[i].free_shipping_info = c.product.free_shipping_zone[j];
                                break;
                            }*/
                        }
                        this.cart[i].in_a_freezone_city = in_a_freezone_city;
                    }
                    if (c.product.shipping_zone.length>0) {
                        let in_a_paidzone_city = false;
                        for (var j = 0; j < c.product.shipping_zone.length; j++) {
                            //////////////////////////////////////
                            if (c.product.shipping_zone[j].country_code==this.address.country_code) {
                                console.log('country match')
                                if (c.product.shipping_zone[j].city==null || (c.product.shipping_zone[j].city==this.address.city && c.product.shipping_zone[j].zone=="") || (c.product.shipping_zone[j].city==this.address.city && c.product.shipping_zone[j].zone==this.address.address)) {
                                    this.cart[i].direct_paid_shipping = true;
                                    this.cart[i].paid_shipping_info.selected = c.product.shipping_zone[j];
                                    console.log('country match city null')
                                    break;
                                }else if(c.product.shipping_zone[j].city==this.address.city && c.product.shipping_zone[j].zone!=this.address.address){
                                    this.cart[i].in_a_paidzone_city = true;
                                    this.cart[i].paid_shipping_info.zone_list = c.product.shipping_zone.filter(x=>x.country_code==this.address.country_code).map((item) => item.zone).join(', ');
                                    break;
                                }
                            }
                            //////////////////////////////////////
                            /*if (c.product.shipping_zone[j].country_code==this.form.country_code && c.product.shipping_zone[j].city=="") {
                                this.cart[i].direct_paid_shipping = true;
                                this.cart[i].paid_shipping_info = c.product.shipping_zone[j];
                                break;
                            }
                            if (c.product.shipping_zone[j].country_code==this.form.country_code && c.product.shipping_zone[j].city==this.form.city && c.product.shipping_zone[j].zone=="") {
                                this.cart[i].direct_paid_shipping = true;
                                this.cart[i].paid_shipping_info = c.product.shipping_zone[j];
                                break;
                            }
                            if (c.product.shipping_zone[j].country_code==this.form.country_code && c.product.shipping_zone[j].city==this.form.city && c.product.shipping_zone[j].zone!="") {
                                this.cart[i].in_a_paidzone_city = true;
                                this.cart[i].paid_shipping_info = c.product.shipping_zone[j];
                                break;
                            }*/
                        }
                    }
                    if (!c.free_shipping && c.product.shipping_zone.length==0) {
                        //alors pre order
                        this.cart[i].pre_order = true;
                    }
                    c.in_free_shipping_zone = ""
                    c.in_paid_shipping_zone = ""
                    if (!c.direct_free_shipping && !c.direct_paid_shipping && !c.in_a_freezone_city && !c.in_a_paidzone_city) {
                        this.cart[i].pre_order = true;
                    }
                    if (!c.direct_free_shipping && !c.direct_paid_shipping) {
                        this.cart[i].pre_order = true;
                    }
                    c.final_free_shipping = c.direct_free_shipping
                    c.final_paid_shipping = c.direct_paid_shipping
                }
                this.refreshCart()
            },
            pre_order_process(index){
                this.confirmed = false
                let c = this.cart[index]
                if (this.addressSet && ((c.in_a_freezone_city && c.in_free_shipping_zone=='no' && !c.in_a_paidzone_city) || (c.in_a_paidzone_city && c.in_paid_shipping_zone!='yes') || (!c.in_a_freezone_city && !c.in_a_paidzone_city))) {
                    this.cart[index].pre_order = true
                }else{
                    this.cart[index].pre_order = false
                }

                this.cart[index].final_free_shipping = false;
                if (this.cart[index].in_free_shipping_zone=='yes') {
                    this.cart[index].final_free_shipping = true;
                    this.cart[index].pre_order = false
                }

                this.cart[index].final_paid_shipping = false;
                if (this.cart[index].in_paid_shipping_zone=='yes' && this.cart[index].paid_shipping_info.selected) {
                    this.cart[index].final_paid_shipping = true;
                    this.cart[index].pre_order = false
                }
                    
                this.refreshCart()
            },
            zone_select(index, zone){
                this.cart[index].paid_shipping_info.selected=zone;
                this.pre_order_process(index)
            },
            refreshCart(){
                let tmp = this.cart;
                this.cart = [];
                this.cart = tmp;
                this.total_func();
                this.can_pay = false;
                for (var i = 0; i < this.cart.length; i++) {
                    if (!this.cart[i].pre_order && this.cart[i].paid_shipping_info.selected) {
                        this.can_pay = true;
                        break
                    }
                }
                console.log("compa", this.cart)
            },
            confirm_cart(){
                /*alert(this.addressSet)
                alert(this.noShipping)*/
                if (!this.addressSet && !this.noShipping) {
                    this.$functions.msg_box(this, 'info', 'Info', this.$t("message.set_address_before_continue"))
                    return 0;
                }
                this.save_cart()
            },
            pre_command(){
                if (!this.addressSet) {
                    this.$functions.msg_box(this, 'info', 'Info', this.$t("message.set_address_before_continue"))
                    return 0;
                }
                this.store_precommand_confirmation()
            },
            /*update_shipping(id){
                let element = document.getElementById('noshipping'+id);
                let checked = element.checked;
                document.getElementById(id).setAttribute('data-noshipping', checked?1:0);
                console.log(checked);

                var index = this.cart.findIndex(obj => { return obj.product.id === id });
                this.cart[index].noshipping = checked;
            }*/
            verifyIfPaymentDone () {
                this.payment_from = "cart";
                //let uniqueId = this.uniqueId;
                let data = {
                    uniqueId: this.uniqueId,
                    self: this,
                }
                this.launchPaymentVerifier(data)
            },
            display_confirmation(id){
                this.forRemoveId = id;
                document.getElementById('menu-option-delete-modal').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            jjuu(i){
                alert(i)
            },
            tttt(i){
                alert(i)
            }
        },
    }
</script>

<style scoped>
    .unactive{
        background-color: #ddd;
    }
    .red-placeholder::placeholder{
        color: red;
    }
</style>
