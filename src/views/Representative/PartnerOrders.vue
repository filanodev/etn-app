<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.orders_verification" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="tab-controls" style="width: 60%;margin: auto;">
                <a class="no-effect" @click="activeOrdersTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.in_progress')}}
                    <span v-if="order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
                <a class="no-effect" @click="activeShippedTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.shipped')}}
                    <span v-if="shipped_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a>
                <!-- <a class="no-effect" @click="activePreOrderTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                    {{$t('message.pre_orders')}}
                    <span v-if="pre_order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                </a> -->
            </div>
            <div v-show="order_tab_active" style="min-height: 200px">
                <div v-for="(line, index) in line_orders">
                    <div class="card card-style mb-2" style="padding: 10px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="line_orders.length > 0 && !line.cancelled_at">
                        <div>
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
                        <div>
                            <router-link :to="{ name: 'store', params: { shop_user_id: user.id } }" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"><i class="fas fa-store color-piketplace"></i> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else class="break-username-word"><i class="fas fa-store color-piketplace"></i> {{line.product.user?line.product.user.fullnameOrUsername:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <div v-if="!line.noshipping && line.order.shipping" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.order.shipping)">
                                <label v-if="!line.product.is_digital"><i class="fa fa-map-marker"></i> {{line.order.shipping.country_name+", "+line.order.shipping.city}}</label>
                                <label v-else><i class="fa fa-map-marker"></i> {{line.order.shipping.email}}</label>
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
                                <h5 class="font-500 font-12" v-if="!line.noshipping && line.fee!=0">
                                    {{$t('message.shipping_cost',{'amount': $functions.amount_format(line.fee, $currency)})}}
                                </h5>
                                <h5 class="font-500 font-12" v-else-if="line.noshipping">
                                    {{$t('message.address.no_shipping')}}
                                </h5>
                                <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                    {{$t('message.total_display',{'amount':$functions.amount_format(line.total+line.fee, $currency)})}}
                                </h5>
                                <div class="row" style="margin-bottom: 0;">
                                    <div class="col-12">
                                        <a class="font-700 rounded-xl" style="font-size: 12px;margin-right: 0;width: 100%;padding: 2px;">
                                            <i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}} <span class="color-yellow-piketplace">{{line.statusPercentDisplay}}%</span>
                                        </a>
                                    </div>
                                    <div class="col-12">
                                        <span v-if="line.product.user" class="color-piketplace">Seller: @{{line.product.user.username}}</span><br>
                                        <span v-if="line.order.user" class="color-piketplace">Buyer: @{{line.order.user.username}}</span>
                                    </div>
                                    <div v-if="!line.noshipping && line.order.shipping" class="col-12">
                                        <span v-if="line.order.user" class="color-piketplace">{{$functions.getFullStringAddress(line.order.shipping)}}</span>
                                    </div>
                                </div>
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
                    <div class="card card-style mb-2" style="padding: 10px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="line_orders.length > 0">
                        <div>
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
                        <div>
                            <router-link :to="{ name: 'store', params: { shop_user_id: user.id } }" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"><i class="fas fa-store color-piketplace"></i> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else><i class="fas fa-store color-piketplace"></i> @{{line.product.user?line.product.user.username:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <div v-if="!line.noshipping && line.order.shipping" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.order.shipping)">
                                <label v-if="!line.product.is_digital"><i class="fa fa-map-marker"></i> {{line.order.shipping.country_name+", "+line.order.shipping.city}}</label>
                                <label v-else><i class="fa fa-map-marker"></i> {{line.order.shipping.email}}</label>
                            </div>
                            <div v-else style="text-align: right;width: 49%;display: inline-block;font-size: 12px;">
                                <label>{{$t('message.customer_shipping')}}</label>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div>
                                <img :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                            </div>
                            <div class="w-100 ms-3 pt-1">
                                <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                <h4 class="font-700 font-15 color-yellow-piketplace">{{$currency}}{{ line.price.toString().split('.')[0]}}.<sup>{{line.price.toString().split('.')[1]}}</sup>
                                    <span style="float: right;" class="mb-0 color-piketplace font-14">{{line.quantity}}x Item</span>
                                </h4>
                                <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_free_shipping">
                                    {{$t('message.free_shipping.text')}}
                                </h5>
                                <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_paid_shipping">
                                    {{$t('message.shipping_cost',{'amount': $functions.amount_format(line.shipping_info.fee, $currency)})}}
                                </h5>
                                <h5 class="font-500 font-12" v-if="line.noshipping">
                                    {{$t('message.address.no_shipping')}}
                                </h5>
                                <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                    {{$t('message.total_display',{'amount': $functions.amount_format(line.price*line.quantity, $currency)})}}
                                </h5>
                                <!-- <div class="row" style="margin-bottom: 0px;">
                                    <div class="col-12">
                                        <a class="font-700 btn btn-dark-piketplace rounded-xl" style="font-size: 12px;margin-right: 0;width: 100%;padding: 2px;">
                                            <i class="fas fa-shipping-fast"></i> {{$t('message.confirmation_text')}}
                                        </a>
                                    </div>
                                </div> -->
                                <div class="divider mb-0"></div>
                                <div class="row" style="margin-bottom: 0;">
                                    <div class="col-12">
                                        <span v-if="line.product.user" class="color-piketplace">Seller: @{{line.product.user.username}}</span><br>
                                        <span v-if="line.order.user" class="color-piketplace">Buyer: @{{line.order.user.username}}</span>
                                    </div>
                                    <div v-if="!line.noshipping && line.order.shipping" class="col-12">
                                        <span v-if="line.order.user" class="color-piketplace">{{$functions.getFullStringAddress(line.order.shipping)}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <div class="card card-style mb-2" style="padding: 10px 10px;margin: 0 15px 20px;border-radius: 10px;" v-if="pre_orders.length > 0">
                        <div>
                            <div style="text-align: left;width: 49%;display: inline-block;">
                            </div>
                            <div style="text-align: right;width: 49%;display: inline-block;">
                                <label>{{$filters.formatDate(line.created_at, $i18n.locale)}}</label>
                            </div>
                        </div>
                        <div class="divider mb-1"></div>
                        <div>
                            <router-link :to="{ name: 'store', params: { shop_user_id: user.id } }" style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                <label v-if="line.product.user.hasShop" style="cursor: pointer;"><i class="fas fa-store color-piketplace"></i> {{line.product.user.shop.shopname}} <i class="fa fa-angle-right"></i></label>
                                <label v-else><i class="fas fa-store color-piketplace"></i> @{{line.product.user?line.product.user.username:'anonymous'}} <i class="fa fa-angle-right"></i></label>
                            </router-link>
                            <div style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.pre_order_address)">
                                <label><i class="fa fa-map-marker"></i> {{line.pre_order_address.country_name+", "+line.pre_order_address.city}}</label>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div>
                                <img :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                            </div>
                            <div class="w-100 ms-3 pt-1">
                                <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                <h4 class="font-700 color-yellow-piketplace">{{$currency}}{{ line.product.price_str.split('.')[0]}}.<sup>{{line.product.price_str.split('.')[1]}}</sup>
                                    <span style="float: right;" class="mb-0 color-piketplace font-14">{{line.quantity}}x Item</span>
                                </h4>
                                <h5 v-if="line.canPayOnPreorder" class="font-600 font-14" style="text-align: right;">
                                    {{$t('message.shipping_cost',{'amount': line.fee})}}
                                </h5>
                                <h5 class="font-600 font-14 color-yellow-piketplace" style="text-align: right;">
                                    {{$t('message.total_display',{'amount': $functions.amount_format(!line.canPayOnPreorder?line.total:line.total+line.fee, $currency)})}}
                                    <!-- Total : {{$currency}}{{!line.canPayOnPreorder?line.total:line.total+line.fee}} -->
                                </h5>
                                
                                <div class="row">
                                    <div class="col-6">
                                        <a v-if="line.applications_count==0" class="font-700 color-piketplace" style="font-size: 10px;margin-right: 0;width: 100%;">{{$t('message.shipping_applying_form.no_application')}}</a>
                                        <router-link v-else class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace-outline" @click="" style="font-size: 10px;margin-right: 0;width: 100%;" :to="{ name: 'line_order_application', params: { id: line.id } }">{{$t('message.proposal_list')}}<i class="fas fa-shipping-fast"></i></router-link>
                                    </div>
                                    <div v-if="line.canPayOnPreorder" class="col-6">
                                        <a @click="pay(index)" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace" style="font-size: 12px;font-size: 12px;margin-right: 0;width: 100%;" >{{$t('message.pay')}}</a>
                                    </div>
                                </div>
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
    import { useStore } from '../../stores'

    export default {
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
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'payment_from', 'saving', 'connecting', 'maintenance_mode']),
        },
        mounted() {
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.isLoading = true;
            this.loadOrders();
        },
        methods: {
            ...mapActions(useStore, ['login', 'setUniqueId', 'piPayment', 'launchPaymentVerifier']),
            reload(){
                this.loadOrders();
            },
            async loadOrders() {
                this.isLoading = true;
                let user_id = this.user.id;
                let page = this.current_page;
                let request_type = 'progressing';
                await axios.get('/partner/get-orders-partner', {params: {page, request_type}})
                .then(res => {
                    console.log("partner orders", res.data);
                    this.isLoading = false;
                    this.data_pagination = res.data.orders;
                    this.line_orders.push(...res.data.orders.data);
                    this.last_page = this.data_pagination.last_page;
                    //console.log("uuuuuuu",this.line_orders);
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
                let request_type = 'shipped';
                await axios.get('/partner/get-orders-partner', {params: {page, request_type}})
                .then(res => {
                    console.log("loadOrdersShipped", res.data)
                    this.isLoading = false;
                    this.data_pagination = res.data.orders;
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
                await axios.get('/partner/get-preorders-partner', {params: {pre_order_user_id, page}})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.orders;
                    this.pre_orders.push(...this.data_pagination.data);
                    this.last_page = this.data_pagination.last_page;
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
            cancel_confirmation(index){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
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

</style>
