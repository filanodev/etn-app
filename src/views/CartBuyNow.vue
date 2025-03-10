<template>
    <div v-if="isLoggedIn" class="page-content">
        <Header ref="header" pageTitle="message.product.buy_now" :hide_settings_icon="true"/>
        <ETNPay :qrImgUrl="etn_data.qrImgUrl" :link="link"/>
        <div id="select-address" class="menu menu-box-bottom rounded-m" data-menu-height="400" data-menu-effect="menu-over" style="display: block; height: 365px;">
            <div class="menu-title">
                <h1 class="font-24 color-piketplace pb-0">
                    {{$t('message.address.shipping_address')}}<br>
                    <span class="btn btn-xxs mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace " @click="open_add"><i class="fa fa-plus"></i>&nbsp;{{$t('message.new')}}</span>
                    &nbsp;<span class="btn btn-xxs mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace " @click="$router.push({name: 'my-addresses'})"><i class="fa fa-address-card"></i></span>
                </h1>
                <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
            </div>
            <div class="me-4 ms-3 mt-0">
                <div class="list-group list-custom-small" v-if="addresses && addresses.length > 0">
                    <a :data-id="index" class="close-menu" v-for="(address, index) in addresses" v-on:click="select_address(index)">
                      
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
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 230px;">
                    <a v-for="country in countries" :key="country.id" v-on:click="select_country(country.iso2)">
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
                <div class="list-group list-custom-small" v-if="cities.length > 0" style="overflow-y: scroll;height: 230px;">
                    <a class="close-menu" v-for="city in cities" :key="city.id" @click="select_city(city.name)">
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
        <PayWith @payPiketplace="pay_piketplace_wallet_set_pin_code" @payPinetwork="pay_pi_network_wallet" @payEtn="pay_with_etn" />
        <div v-if="product">
            <Adsense v-if="activate_google_ads" style="margin-bottom: 20px;"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <!-- <div id="preloader"><div class="spinner-border color-piketplace" role="status"></div></div> -->
            <div class="card card-style mb-2" style="padding: 20px 15px;">
                <em v-if="!product.is_digital && product.quantity<qty" class="color-piketplace" style="font-size: 11px;">
                    {{$t('message.cart.qty_insufficient', {quantity: product.quantity})}}
                </em>
                <div class="d-flex">
                    <div>
                        <img @click="$router.push({ name: 'product', params: { id: product.id } })" :src="product.imageFirst" class="rounded-sm" width="150" style="border:1px solid lightgray;">
                    </div>
                    <div class="w-100 ms-3 pt-1">
                        <h6 class="font-500 font-14 pb-2">{{product.libelle}}</h6>
                        <!-- <h4 class="font-800 font-16 color-yellow-piketplace">{{$currency}}{{product.price_str.split('.')[0]}}.<sup>{{product.price_str.split('.')[1]}}</sup></h4> -->
                        <Amount :amount="product.price" class="font-700 font-14 color-yellow-piketplace" />
                        <h5 class="font-500 font-12" v-if="!product.is_digital && (direct_paid_shipping || in_paid_shipping_zone=='yes') && !noShipping">
                            <!-- <span v-if="paid_shipping_info.selected">
                                {{$t('message.shipping_cost',{'amount': $functions.amount_format(paid_shipping_info.selected.fee, $currency)})}}
                            </span> -->
                            <i18n-t v-if="paid_shipping_info.selected" keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                <template #amount>
                                  <Amount :amount="paid_shipping_info.selected.fee" class=""/>
                                </template>
                            </i18n-t>
                        </h5>
                    </div>
                </div>
                <div class="card mb-2" v-if="!product.is_digital">
                    <div class="mt-2">
                        <div class="stepper rounded-s float-start">
                            <a class="stepper-sub" @click="decrement(product.id)">
                                <i class="fa fa-minus color-theme opacity-40"></i>
                            </a>
                            <input type="number" min="1" max="99" id="qty"  v-model="qty" @input="total_func">
                            <a class="stepper-add" @click="increment(product.id)">
                                <i class="fa fa-plus color-theme opacity-40"></i>
                            </a>
                        </div>
                        <!-- <span v-if="!direct_free_shipping && (!in_a_freezone_city || in_free_shipping_zone!='yes')" class="noshipping float-start mt-1 ms-4 font-11 color-theme font-12" style="">
                            <input class="form-check-input" type="checkbox" value="" style="border:1px solid black;" v-model="noShipping" v-bind:id="product.id">
                            <label class="font-600" :for="product.id" style="cursor: pointer;">
                                {{ $t('message.address.no_shipping') }}
                            </label>
                        </span> -->
                        <SwitchButton v-if="!direct_free_shipping && (!in_a_freezone_city || in_free_shipping_zone!='yes')" :id="product.id" :label="$t('message.address.no_shipping')" v-model:checked="noShipping" style="padding-left: 10px;float: right;margin-top: 4px;"/>
                        <span v-else class="noshipping float-start mt-1 ms-4 font-11 color-theme font-12" style="">
                            <label style="cursor: pointer;">
                                {{ $t('message.free_shipping.text') }}
                            </label>
                        </span>
                    </div>
                    <p v-if="noShipping" class="mb-1 mt-1" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;">
                        <i class="fas fa-info-circle" style="color: #000;"></i>
                        {{$t('message.no_shipping_getting_product_from_seller')}}
                    </p>
                    <div class="divider mb-1"></div>
                    <div v-if="!direct_free_shipping && in_a_freezone_city && !noShipping">
                        <h4 class="font-12" v-if="in_a_freezone_city"><!-- Are you in free shipping zone ? {{free_shipping_info.zone}} -->
                            {{$t('message.are_you_in_free_shipping_zone',{'zone': free_shipping_info})}}
                        </h4>
                        <div class="row mt-0 mb-0 me-3 ms-3" v-if="in_a_freezone_city">
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="yes" id="in_free_shipping_zone_yes" name="in_free_shipping_zone" v-model="in_free_shipping_zone" @change="pre_order_process()">
                                    <label class="form-check-label" for="in_free_shipping_zone_yes">{{$t('message.yes')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="no" id="in_free_shipping_zone_no" name="in_free_shipping_zone" v-model="in_free_shipping_zone" @change="pre_order_process()">
                                    <label class="form-check-label" for="in_free_shipping_zone_no">{{$t('message.no')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-12" style="text-align: left;" v-if="in_free_shipping_zone=='yes'">
                                <p style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 0 0 20px 0;">
                                    <i class="fas fa-info-circle" style="color: #000;"></i> {{$t('message.free_shipping.seller_will_ship_free')}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="!direct_paid_shipping && !direct_free_shipping && in_a_paidzone_city && !noShipping">
                        <h4 class="font-12" v-if="(in_free_shipping_zone=='no' && in_a_paidzone_city) || (in_a_paidzone_city && !in_a_freezone_city)"><!-- Are you in paid shipping zone ? {{paid_shipping_info.zone}} -->
                            {{$t('message.are_you_in_paid_shipping_zone',{'zone': paid_shipping_info.zone_list})}}
                        </h4>
                        <div class="row mt-0 mb-0 me-3 ms-3" v-if="(in_free_shipping_zone=='no' && in_a_paidzone_city) || (in_a_paidzone_city && !in_a_freezone_city)">
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="yes" id="in_paid_shipping_zone_yes" name="in_paid_shipping_zone" v-model="in_paid_shipping_zone" @change="pre_order_process()">
                                    <label class="form-check-label" for="in_paid_shipping_zone_yes">{{$t('message.yes')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" value="no" id="in_paid_shipping_zone_no" name="in_paid_shipping_zone" v-model="in_paid_shipping_zone" @change="pre_order_process()">
                                    <label class="form-check-label" for="in_paid_shipping_zone_no">{{$t('message.no')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                                </div>
                            </div>
                            <div class="col-12" style="text-align: left;" v-if="in_paid_shipping_zone=='yes'">
                                <h3>{{$t('message.choose_shipping_zone')}}</h3>
                                <div v-for="zone in product.shipping_zone.filter(x=>x.country_code==address.country_code)" @click="zone_select(zone)" style="background-color: lightgray;color: black;padding: 10px;border-radius: 10px;margin: 10px  10px 0;display: inline-block;">
                                    {{zone.zone}} : + <!-- {{$functions.amount_format(zone.fee, $currency)}} --><Amount :amount="zone.fee"/>
                                    <i v-if="paid_shipping_info.selected && zone.zone==paid_shipping_info.selected.zone" class="fa fa-check-circle color-green-dark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="pre_order && !noShipping" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;line-height: 20px;">
                        <i class="fas fa-info-circle" style="color: #000;"></i>
                        {{$t('message.preorder_registration_message')}} 
                    </p>
                    <strong class="no-effect color-theme mt-1" :class="!in_apply_form?'break-word':''" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" style="display: block;line-height: 18px;">
                        <i class="fas fa-map-marker-alt me-2 color-piketplace" style="font-size: 18px;"></i><em>{{$t('message.product_address')}}</em> :
                        {{getCountryNameByCode(product.country_code)}}/{{product.city}}
                    </strong>
                </div>
            </div>
            <div class="card card-style">
                <div class="content mb-2 mt-3">
                    <div class="">
                        <div v-if="product.is_digital">
                            <form class="mb-0 mt-1">
                                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                                    <input type="text" class="form-control validate-number" id="email" v-model="email" placeholder="Eg. test@test.com">
                                    <label for="email" class="color-piketplace font-500">E-mail</label>
                                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                                    <i class="fa fa-check disabled valid color-green-dark"></i>
                                </div>
                            </form>
                        </div>
                        <div class=" w-60">
                            <span class="font-600 color-piketplace mb-0 font-13">{{ $t('message.handling_fee') }}</span>
                            <!-- <span class="font-600 font-13 tw:float-right">+{{handling_fee_percentage}}%</span> -->
                            <Amount :amount="handling_fee_percentage" type="percentage" class="font-900 font-13 tw:inline tw:float-right"/>
                        </div>
                        <div class=" w-60">
                            <span class="font-600 color-piketplace mb-0 font-13">{{ $t('message.cart.total') }}</span>
                            <!-- <span class="font-600 font-12 tw:float-right">
                                {{$currency}}{{$functions.get_before_dot_part(totalFee, 7)}}<sup>.{{$functions.get_after_dot_part(totalFee, 7)}}</sup>
                                /
                                {{$currency}}{{$functions.get_before_dot_part(total, 7)}}<sup>.{{$functions.get_after_dot_part(total, 7)}}</sup>+{{handling_fee_piket}}Piket
                            </span> -->
                            <span class="font-12 tw:float-right">
                                <Amount :amount="totalFee" class="font-900 tw:inline"/>
                                /
                                <Amount :amount="total" class="font-900 tw:inline"/><span class="font-900 tw:font-sans">+{{handling_fee_piket}}Piket</span>
                            </span>
                        </div>
                        <div v-if="!product.is_digital">
                            <div class="w-100 pt-1" v-if="(product.free_shipping && in_free_shipping_zone=='true') || !noShipping">
                                <h6 class="font-14 font-600">
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
            </div>
            <!-- <a class="close-menu btn btn-margins btn-full gradient-blue font-13 btn-l font-600 mt-3 rounded-sm" @click="pay">{{ $t('message.cart.proceed_to_checkout')}}</a> -->
            <div style="text-align: center;" class="color-piketplace" v-if="!product.is_digital && product.quantity<qty">
                {{$t('message.cart.qty_insufficient', {quantity: product.quantity})}}
            </div>
            <div v-else>
                <div v-if="can_pay || (product && product.is_digital)">
                    <a class="close-menu btn btn-margins btn-full btn-dark-piketplace font-13 btn-l font-600 mt-3 rounded-sm" @click="pay_with">{{ $t('message.cart.proceed_to_checkout')}}</a>
                </div>
                <a v-else class="close-menu btn btn-margins btn-full btn-dark-piketplace-outline font-13 btn-l font-600 mt-3 rounded-sm" @click="pre_command()">{{ $t('message.save_as_preorder')}}</a>
            </div>
            <Adsense v-if="activate_google_ads" style="margin-bottom: 20px;"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
        </div>
        <div v-else-if="!isLoggedIn">
            <div style="width: 100%;text-align: center;">
                <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in')}}
                </button>
            </div>
        </div>
        <div v-if="isLoading" style="text-align: center;">
            <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { v4 as uuidv4 } from 'uuid';
    import {payment_verifier} from '../functions.js'
    import PayWith from '../components/PayWith.vue';
    import ETNPay from '../components/ETNPay.vue';
    import SwitchButton from '../components/SwitchButton.vue'

    export default{
        components: {
            PayWith,
            ETNPay,
            SwitchButton,
        },
        data() {
            return {
                form: {
                    name: "",
                    country_name: "",
                    country_code: "",
                    city: "",
                    address: "",
                    phone_number: "",
                    email: "",
                    is_default: false
                },
                address: {
                    name: "",
                    country_name: "",
                    country_code: "",
                    city: "",
                    address: "",
                    phone_number: "",
                    email: "",
                    is_default: false
                },
                id: 0,
                product: null,
                //user: null,
                total: 0,
                totalFee: 0,
                qty: 1,
                noShipping: false,
                addressSet: false,
                submit: false,
                verifierPayment: null,
                can_pay: false,
                confirmed: false,

                in_free_shipping_zone: "",
                in_paid_shipping_zone: "",
                in_a_freezone_city: false,
                in_a_paidzone_city: false,
                direct_free_shipping: false,
                direct_paid_shipping: false,
                pre_order: false,
                free_shipping_info: [],
                paid_shipping_info: [],

                cities: [],
                country_tab_active: true,
                keyword: "",
                keyword_city: "",
                country_city: "",
                isNewAddress: false,
                isLoading: false,
                countries: [],
                email: '',
                handling_fee_percentage: 0,
                handling_fee_piket: 0,
                addresses: [],
                etn_data: {
                    amountETN: 0,
                    outlet: "",
                    paymentId: "",
                },
                link: "",
                etn_project: true,
            };
        },
        beforeUnmount () {
            this.setUniqueId('');
            this.clearPaymentVerifier();
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'locale', 'countries_db', 'country_cities', 'purchase_activation', 'saving', 'email', 'uniqueId', 'payment_from', 'productBuyNow', 'isLoadingCities', 'pi_balance', 'piket_balance', 'activate_google_ads', 'piket_wallet_frontend_url']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        created () {
            this.verifyIfPaymentDone();
        },
        mounted() {
            if (this.isLoggedIn && !this.is_user_profil_set()) {
                this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.complete_profil_first"), '/profil')
                return
            }
            if (this.user && this.user.email) {
                this.email = this.user.email
            }
            this.id = this.$route.params.id;
            this.in_free_shipping_zone = this.$route.params.in_free_shipping_zone;
            
            this.countries = this.countries_db
            this.loadProduct(this.id);
            //this.getResults();
            this.newCountryLoading();
            //this.$functions.scrollToTop()
        },
        watch: {
            isLoggedIn(after, before) {
                if (after) {
                    this.isLoading = true
                    this.loadProduct(this.$route.params.id)
                    this.loadDefaultAddress()
                }
            },
            keyword(after, before) {
                this.newCountryLoading()
                //this.getResults();
                //this.search();
            },
            keyword_city(after, before) {
                //this.getResults();
                this.search_city();
            },
            locale(n, o){
                this.newCountryLoading()
            },
            country_cities(n, o){
                this.cities = this.country_cities
            },
            noShipping(after, before) {
                this.can_pay = false
                if (after) {
                    this.can_pay = true
                }
                this.total_refresh()
            },
            in_free_shipping_zone(after, before) {
                if (after=="yes") {
                    this.total = this.product.price*this.qty
                }
            },
            in_paid_shipping_zone(after, before) {
                this.total = this.product.price*this.qty
                if (after=="yes") {
                    this.total += parseFloat(this.paid_shipping_info.fee)
                }
            },
            productBuyNow(after, before){
                this.product = after
            },
            pre_order(after, before){
                if (after === true) {
                    this.total = 0
                }
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'clearPaymentVerifier', 'setUniqueId', 'launchPaymentVerifier', 'piPayment', 'getCities', 'getCountryNameByCode', 'setBalance', 'is_user_profil_set']),
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
            loadProduct(id) {
                this.isLoading = true
                axios.get('/products/'+id)
                .then(res => {
                    this.isLoading = false
                    console.log("res.data dsds", res.data)
                    this.product = res.data.product;
                    this.addresses = res.data.addresses;
                    this.handling_fee_percentage = res.data.handling_fee_percentage;
                    this.total = this.qty * this.product.price;
                    let handling_fee = this.total * this.handling_fee_percentage/100;
                    this.handling_fee_piket = this.total*1000*this.handling_fee_percentage/100
                    this.totalFee = this.total + handling_fee;
                    if (this.product.is_digital) {
                        this.form.email = this.email
                        this.total = this.product.price;
                        let handling_fee = this.total * this.handling_fee_percentage/100;
                        this.totalFee = this.total + handling_fee;
                        this.handling_fee_piket = this.total*1000*this.handling_fee_percentage/100
                    }else{
                        this.loadDefaultAddress();
                    }
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            loadDefaultAddress(){
                console.log('this.addresses', this.addresses)
                let address = this.form
                if (this.isLoggedIn && this.addresses) {
                    for (var i = 0; i < this.addresses.length; i++) {
                        this.addresses[i]
                        if (this.addresses[i].is_default == 1) {
                            address = this.addresses[i]
                            break
                        }
                    }
                    this.address = address
                    this.addressSet = true
                    this.cart_addresses_comparison()
                }
                if (this.email == "" && this.address.email) {
                    this.email = this.address.email
                }
            },
            increment(id) {
                this.qty = parseInt(this.qty) + 1;
                this.total_refresh();
                
            },
            decrement(id) {
                let old = parseInt(this.qty);
                if (isNaN(old) || old <= 1) {return;}

                this.qty = parseInt(this.qty) - 1;
                this.total_refresh();
            },
            total_func(){
                this.total = parseFloat(this.product.price) * parseInt(this.qty);
                let handling_fee = this.total * this.handling_fee_percentage/100;
                this.totalFee = this.total + handling_fee;
            },
            add_address(){
                this.submit = false;
                document.getElementById('select-address').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            call_country_select(){
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
            select_address(index){
                let addresses = this.addresses;
                //console.log('"addresses"', addresses)
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
                this.reinit()
                if (this.product.free_shipping) {
                    for (var j = 0; j < this.product.free_shipping_zone.length; j++) {
                        if (this.product.free_shipping_zone[j].country_code==this.address.country_code) {
                            if (this.product.free_shipping_zone[j].city==null || (this.product.free_shipping_zone[j].city==this.address.city && this.product.free_shipping_zone[j].zone=="") || (this.product.free_shipping_zone[j].city==this.address.city && this.product.free_shipping_zone[j].zone==this.address.address)) {
                                this.direct_free_shipping = true;
                                this.free_shipping_info = this.product.free_shipping_zone[j];
                                this.can_pay = true
                                break;
                            }else if(this.product.free_shipping_zone[j].city==this.address.city && this.product.free_shipping_zone[j].zone!=this.address.address){
                                this.in_a_freezone_city = true;
                                this.free_shipping_info = this.product.free_shipping_zone.map((item) => item.zone).join(', ')
                                break;
                            }
                        }
                    }
                }
                if (this.product.shipping_zone.length>0) {
                    for (var j = 0; j < this.product.shipping_zone.length; j++) {
                        if (this.product.shipping_zone[j].country_code==this.address.country_code) {
                            if (this.product.shipping_zone[j].city=="" || (this.product.shipping_zone[j].city==this.address.city && this.product.shipping_zone[j].zone=="") || (this.product.shipping_zone[j].city==this.address.city && this.product.shipping_zone[j].zone==this.address.address)) {
                                this.direct_paid_shipping = true;
                                this.paid_shipping_info = this.product.shipping_zone[j];
                                this.total = this.product.price*this.qty+parseFloat(this.product.shipping_zone[j].fee)
                                this.can_pay = true
                                break;
                            }else if(this.product.shipping_zone[j].city==this.address.city && this.product.shipping_zone[j].zone!=this.address.address){
                                this.in_a_paidzone_city = true;
                                let list_zone = this.product.shipping_zone.filter(x=>x.country_code==this.address.country_code)
                                this.paid_shipping_info.zone_list = list_zone.map((item) => item.zone).join(', ')
                                break;
                            }
                        }
                    }
                }
                this.in_free_shipping_zone = ""
                this.in_paid_shipping_zone = ""
                if (!this.product.free_shipping && this.product.shipping_zone.length==0) {
                    //alors pre order
                    this.pre_order = true;
                }
                if (!this.direct_free_shipping && !this.direct_paid_shipping && !this.in_a_freezone_city && !this.in_a_paidzone_city) {
                    this.pre_order = true;
                }
                if (!this.direct_free_shipping && !this.direct_paid_shipping) {
                    this.pre_order = true;
                }
                this.total_refresh()
            },
            pre_order_process(){
                this.confirmed = false
                this.can_pay = false
                if (this.addressSet && ((this.in_a_freezone_city && this.in_free_shipping_zone=='no' && !this.in_a_paidzone_city) || (this.in_a_paidzone_city && this.in_paid_shipping_zone!='yes') || (!this.in_a_freezone_city && !this.in_a_paidzone_city))) {
                    this.pre_order = true
                }else{
                    this.pre_order = false
                }

                if (this.in_free_shipping_zone=='yes') {
                    //this.direct_free_shipping = true;
                    this.pre_order = false
                    this.can_pay = true
                    this.in_paid_shipping_zone = ''
                    return;
                }

                if (this.in_paid_shipping_zone=='yes' && this.paid_shipping_info.selected) {
                    //this.direct_paid_shipping = true;
                    this.pre_order = false
                    this.can_pay = true
                }
                    
                this.total_refresh()
            },
            zone_select(zone){
                this.paid_shipping_info.selected=zone;
                this.pre_order_process()
            },
            total_refresh(){
                if (this.pre_order === true && this.noShipping === false) {
                    this.total = 0;
                    this.totalFee = 0;
                    return
                }
                this.total = this.product.price*this.qty
                if (this.direct_paid_shipping) {
                    this.total += parseFloat(this.paid_shipping_info.selected.fee)
                }
                if (this.in_a_paidzone_city && this.in_paid_shipping_zone=='yes') {
                    this.total += parseFloat(this.paid_shipping_info.selected.fee)
                }
                if (this.noShipping) {
                    this.total = this.product.price*this.qty
                }
                if (this.product.is_digital) {
                    this.total = this.product.price
                }
                let handling_fee = this.total * this.handling_fee_percentage/100;
                this.totalFee = this.total + handling_fee;
                this.handling_fee_piket = this.total*1000*this.handling_fee_percentage/100
            },
            reinit(){
                this.in_free_shipping_zone = ""
                this.in_paid_shipping_zone = ""
                this.in_a_freezone_city = false
                this.in_a_paidzone_city = false
                this.direct_free_shipping = false
                this.direct_paid_shipping = false
                this.pre_order = false
                this.noShipping = false
                this.can_pay = false
                this.free_shipping_info = []
                this.paid_shipping_info = []
            },
            select_country(code){
                let index = this.countries_db.findIndex(el => el.iso2 === code);
                let country = this.countries_db[index]
                this.form.country_code = code;
                this.form.country_name = country.name;
                this.country_cities = []
                this.country_tab_active = false;
                this.getCities({code:code, self:this})
                this.form.city = ""
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
            pay_with(){
                if (!this.purchase_activation) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.purchase_deactivated"))
                    return
                }
                if (this.product.is_digital && !this.$functions.is_an_email(this.form.email)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.email_required_with_format'))
                    return 0;
                }
                if (this.etn_project === true) {
                    this.pay_with_etn()
                    return
                }
                document.getElementById('select-wallet').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            pay_piketplace_wallet_set_pin_code(){
                this.$confirm({
                  auth: true,
                  message: '<span class="font-900 font-16">'+this.$t('message.put_your_code_pin')+'</span><br><br>'+this.$t('message.create_your_code_pin')+'<i class="fa fa-hand-point-right me-1 ms-1"></i><a class="" style="color: darkblue" href="'+this.piket_wallet_frontend_url+'" target="_blank">Piket Wallet</a><br><br>',
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
                        this.pay_piketplace_wallet(password)
                    }
                  }
                })
            },
            pay_piketplace_wallet(code_pin){
                this.submit = true;
                if (!this.product.is_digital && !this.noShipping && !this.addressSet) {
                    document.getElementById('select-address').classList.add('menu-active');
                    document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
                    return 0;
                }
                if (this.edit_status) {
                    this.$functions.msg_box(this, 'error', this.$t('message.publishForm.error'), this.$t('message.cart.save_edit_mode'))
                    return 0;
                }
                if (this.pi_balance < this.total) {
                    this.$functions.msg_box(this, 'error', 'Info', this.$t('message.donate.not_enough_amount',{'amount': this.pi_balance}))
                    return 0;
                }
                this.$hide_modal.hide_modal('select-wallet')
                //if (!this.noShipping) {
                    if (this.product.is_digital === true) {
                        this.address.email = this.email
                    }
                    let product = {
                        id: this.product.id,
                        quantity: this.qty,
                        noshipping: this.noShipping,
                        /*in_free_shipping_zone: this.in_free_shipping_zone,
                        in_paid_shipping_zone: this.in_paid_shipping_zone,*/
                        direct_free_shipping: this.direct_free_shipping,
                        direct_paid_shipping: this.direct_paid_shipping
                    }
                    let dataPay = {
                        //user_id: this.user.id,
                        code_pin: code_pin,
                        isNewAddress: this.isNewAddress,
                        total: this.total,
                        address: this.address,
                        product: product,
                        isBuyNow: true,
                        handling_fee_percentage: this.handling_fee_percentage,
                    }
                    /*console.log("jnjn", dataPay)
                    return*/
                    this.saving = true
                    axios.post('/payment-piketplace-wallet', dataPay)
                    .then(res=>{
                        this.saving = false
                        //this.jh = res.data
                        //let address = JSON.parse(res.data.address)
                        //console.log(address)
                        console.log("buy_now", res.data)
                        if (res.data.status===true) {
                            this.$functions.msg_box(this, 'success', this.$t('message.cart.success'), this.$t('message.cart.payment_done'), '/my-orders')
                        }else if(res.data.message == "message.invalid_address"){
                            this.$functions.msg_box(this, 'error', '', this.$t('message.invalid_address'))
                            //console.log(res.data)
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
                //}
            },
            pay_pi_network_wallet(){
                this.submit = true;
                if (!this.product.is_digital && !this.noShipping && !this.addressSet) {
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
                if (this.product.is_digital === true) {
                    this.address.email = this.email
                }
                let dataPay = {
                    //orderId: 3,
                    uniqueId: this.uniqueId,
                    type: 5,//PURCHASE
                    memo: this.$t('message.product_purchase'),
                    total: this.total,
                    amount: this.total,
                    userId: this.user.id,
                    product: {
                        id: this.product.id,
                        quantity: this.qty,
                        noshipping: this.noShipping,
                    },
                    isNewAddress: this.isNewAddress,
                    handling_fee_percentage: this.handling_fee_percentage,
                };
                if (!this.noShipping) {
                    dataPay.address_obj = this.address
                }
                /*if (this.piket_balance < this.handling_fee_piket) {
                    dataPay.amount = this.totalFee
                    dataPay.handling_fee = this.total*this.handling_fee_percentage/100
                    dataPay.is_piket = 'false'
                }else{
                    dataPay.handling_fee_piket = this.handling_fee_piket
                    dataPay.is_piket = 'true'
                }*/
                dataPay.handling_fee = this.total*this.handling_fee_percentage/100
                dataPay.is_piket = 'false'
                this.piPayment(dataPay);
            },
            pay_with_etn(){
                let amount = this.totalFee
                axios.get('/get-etn-payment-data', { params: { amount } })
                .then(res => {
                    console.log('/get-etn-payment-data', res.data)
                    if (res.data.status) {
                        this.etn_data.amountETN = res.data.amountETN
                        this.etn_data.outlet = res.data.outlet
                        this.etn_data.paymentId = res.data.paymentId
                        this.etn_data.qrImgUrl = res.data.qrImgUrl
                        this.link = 'etn-it-'+this.etn_data.outlet+'/'+this.etn_data.paymentId+'/'+this.etn_data.amountETN
                        this.$hide_modal.all();
                        this.$show_modal.show_modal({id: 'etn-pay'});
                    }
                })
                .catch(error => {
                    this.isLoadingCountry = false
                });
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
                
                //console.log('jhjhjhh', file_countries_cities)
                //this.countries = file_countries_cities
            },
            pre_command(){
                if (!this.addressSet) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.set_address_to_continue'))
                    return 0;
                }
                this.store_precommand_confirmation()
            },
            store_precommand_confirmation(){
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
                            this.store_precommand()
                        }
                      }
                    }
                )
            },
            async store_precommand(){
                this.saving = true
                let user_id = this.user.id;
                let isBuyNow = true;
                let cart = [{
                    id: this.product.id,
                    product: this.product,
                    quantity: this.qty,
                    noshipping: false,
                }];
                var address = this.address;
                console.log('kkiii', address)
                let isNewAddress = this.isNewAddress;
                /*alert('jjjjjjjj prec : '+ user_id)
                alert('jjjjjjjj this.product.id : '+ this.product.id)
                alert('jjjjjjjj this.qty : '+ this.qty)
                alert('jjjjjjjj this.noShipping : '+ this.noShipping)*/
                await axios.post(`/store-precommand`, {user_id:user_id, cart:cart, isBuyNow:isBuyNow, address:address,isNewAddress:isNewAddress})
                    .then(res => {
                        this.saving = false
                        if (res.data.status===true) {
                            this.$functions.msg_box(this, 'success', '', this.$t("message.pre_command_successfully"), '/my-orders')
                        }else{
                            this.product = res.data.cart[0].product
                            this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, {libelle: res.data.data.product.libelle, quantity_left: res.data.data.product.quantity}))
                        }
                        
                        console.log("store res", res);
                    })
                    .catch(error => {
                        //alert(error.response.status)
                        //alert(error.message)
                        console.log("nnnnnnnnnnn", error);
                        if (typeof error === 'object' && error !== null) {
                            alert(error.toString())
                        }
                        if (typeof error === 'string') {
                            alert(error)
                        }
                        this.saving = false
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    });
            },
            verifyIfPaymentDone () {
                this.payment_from = "cart";
                //let uniqueId = this.uniqueId;
                let data = {
                    uniqueId: this.uniqueId,
                    productId: this.$route.params.id,
                    self: this,
                }
                this.launchPaymentVerifier(data)
            },
        },
    }
</script>

<style scoped>
    
</style>
