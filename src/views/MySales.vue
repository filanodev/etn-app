<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_sales" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="card card-style" v-if=user>
                <div class="content mt-1 mb-0" style="margin: auto 0;">
                    <div style="background-image: url('site_images/sales_bg.PNG');height: 100px;width: 100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
                    <img v-if="user && user.avatar!='pi.png'" :src="user.avatar" class="" style="width: 70px;height: 70px;border-radius: 50%;object-fit: cover;margin-top: -35px;margin-left: 10px;">
                    <img v-else src="/site_images/pi.png" class="" style="width: 70px;height: 70px;border-radius: 50%;margin-top: -35px;margin-left: 10px;">
                    <!-- <p class="color-highlight font-600 mb-n1">Appkit Pages for</p> -->
                    <!-- <p>
                    Highlight your products with style. These pages are great if you plan to connect Appkit to a CMS
                    </p> -->
                    <div class="divider mb-0"></div>
                    <div class="tab-controls mb-1" style="width: 100%;margin: auto;">
                        <a class="no-effect" @click="activeSalesTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.sales')}}
                            <span v-if="sales_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                        <a class="no-effect" @click="activePreOrderTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.pre_orders')}}
                            <span v-if="pre_order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                    </div>
                    <div class="divider mb-0"></div>
                    <div v-show="user && sales_tab_active" style="min-height: 20px;">
                        <div class="row mt-2 mb-0 me-0 ms-0">
                            <div class="col-4 ps-1 pe-1">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" name="sales" @click="getInProgress" id="in_progress" checked>
                                    <label class="form-check-label" for="in_progress" style="padding-left: 30px;">{{$t('message.in_progress')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-highlight"></i>
                                </div>
                            </div>
                            <div class="col-4 ps-1 pe-1">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" name="sales" @click="getShipped" id="shipped" >
                                    <label class="form-check-label" for="shipped" style="padding-left: 30px;">{{$t('message.shipped')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-highlight"></i>
                                </div>
                            </div>
                            <div class="col-4 ps-1 pe-1">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" name="sales" @click="getAll" id="all">
                                    <label class="form-check-label" for="all" style="padding-left: 30px;">{{$t('message.all')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-highlight"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card card-style mb-1" v-for="(line, index) in sales_line_orders" style="padding: 0px 10px;margin: 0 0 20px;border-radius: 10px;" v-if="sales_line_orders.length>0">
                            <div v-if="line && !line.cancelled">
                                <div>
                                    <div style="text-align: left;width: 49%;display: inline-block;">
                                        <strong v-if="line.shipped" class="color-piketplace">{{$t('message.shipped')}}</strong>
                                        <strong v-else>{{$t('message.ordered')}}</strong>
                                    </div>
                                    <div style="text-align: right;width: 49%;display: inline-block;">
                                        <em v-if="line.shipped" style="font-size: 11px;">{{$filters.formatDate(line.shipped_at, $i18n.locale)}}</em>
                                        <em v-else style="font-size: 11px;">{{$filters.formatDate(line.order.ordered_at, $i18n.locale)}}</em>
                                    </div>
                                </div>
                                <div class="divider mb-1"></div>
                                <div v-if="line.reference">
                                    <div style="text-align: left;width: 90%;display: inline-block;">
                                        <strong class="color-piketplace font-12"># {{line.reference}}</strong>
                                    </div>
                                    <div class="divider mb-1"></div>
                                </div>
                                <div>
                                    <a style="text-align: left;width: 50%;display: inline-block;color: #000;" class="break-word-customer">
                                        <img :src="line.order.user.avatar" class="tw:inline tw:align-middle" style="width: 15px;height: 15px;border-radius: 50%;object-fit: cover;margin-right: 3px;">
                                        <span class="tw:align-middle" style="margin-right: 4px;">{{line.order.user.fullnameOrUsername}}</span>
                                        <i class="fa fa-angle-right tw:align-middle"></i>
                                    </a>
                                    <div v-if="!line.noshipping && line.order.shipping" class="break-word-customer" style="text-align: right;width: 50%;display: inline-block;" @click="show_full_address(line.order.shipping)">
                                        <img class="tw:inline" src="/site_images/svg/marker-color-piketplace.svg">
                                        <label class="color-piketplace" v-if="!line.product.is_digital"> {{line.order.shipping.country_name+", "+line.order.shipping.city}}</label>
                                        <label class="color-piketplace" v-else> {{line.order.shipping.email}}</label>
                                    </div>
                                    <div class="break-word-customer" v-else style="text-align: right;width: 50%;display: inline-block;font-size: 12px;">
                                        <span class="tw:align-middle">{{$t('message.customer_shipping')}}</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div>
                                        <img @click="$router.push({ name: 'product', params: { id: line.product.id } })" :src="line.product.imageFirst" class="rounded-sm" width="100" style="border:1px solid lightgray;">
                                    </div>
                                    <div class="tw:w-100 ms-3 pt-1">
                                        <h6 class="font-500 font-14 pb-2">{{line.product.libelle}}</h6>
                                        <h4 class="font-700 font-15 "><!-- {{$currency}}{{ line.product.price_str.split('.')[0]}}.<sup>{{line.product.price_str.split('.')[1]}}</sup> -->
                                            <Amount :amount="line.product.price" class="font-600 font-14 color-yellow-piketplace tw:inline" style="line-height: 1rem;"/>
                                            <span style="float: right;" class="mb-0 color-piketplace font-12">{{line.quantity}}x Item</span>
                                        </h4>
                                        <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_free_shipping">
                                            {{$t('message.free_shipping.text')}}
                                        </h5>
                                        <h5 class="font-500 font-12" v-if="!line.noshipping && line.fee!=0">
                                            <!-- {{$t('message.shipping_cost', {'amount': $functions.amount_format(line.fee, $currency)})}} -->
                                            <i18n-t keypath="message.shipping_cost" tag="span" class="font-700 font-14 color-black">
                                                <template #amount>
                                                  <Amount :amount="line.fee" class=""/>
                                                </template>
                                            </i18n-t>
                                        </h5>
                                        <h5 class="font-500 font-12" v-else-if="line.noshipping">
                                            {{$t('message.address.no_shipping')}}
                                        </h5>
                                        <h5 class="font-600 font-13" style="text-align: right;">
                                            <!-- {{$t('message.total_display', {'amount': $functions.amount_format(line.total+line.fee, $currency)})}} -->
                                            <i18n-t keypath="message.total_display" tag="span" class="font-600 font-13 color-yellow-piketplace">
                                                <template #amount>
                                                  <Amount :amount="line.total+line.fee" class="font-600 font-13 color-yellow-piketplace tw:inline"/>
                                                </template>
                                            </i18n-t>
                                        </h5>
                                        <router-link :to="{ name: 'message', params: { corresponding_id: line.order.user.id, line_order_id: line.id } }" class="color-piketplace" v-if="line.shipped_at===null">
                                            <i class="fa fa-comments-o font-14 tw:align-middle me-1"></i>
                                            <span class="font-14">{{$t('message.discuss_with_buyer')}}</span>&nbsp;<i class="line-height-s mt-1 opacity-70 message-badge" :class="[line.messages_count>10?'lg-content':'m-content']">{{line.messages_count}}</i>
                                        </router-link>
                                        <router-link class="font-700 btn btn-dark-piketplace rounded-xl" @click="" style="font-size: 12px;margin-right: 0;width: 100%;padding: 2px;" :to="{ name: 'shipping_management', params: { id: line.id } }"><i class="fas fa-shipping-fast"></i> {{$t('message.shipping_confirmation')}} <span class="color-yellow-piketplace">{{line.statusPercentDisplay}}%</span></router-link>
                                    </div>
                                </div>
                                <div class="divider mb-1"></div>
                            </div>
                        </div>
                        <div v-else-if="!isLoading" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                            {{$t('message.no_data')}}
                        </div>
                        <div v-observe-visibility="handleScrolledToBottomSales">
                            <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class=" rounded-sm img-fluid">
                            <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                                {{$t('message.no_more_data')}}
                            </div>
                        </div>
                    </div>
                    <div v-show="user && pre_order_tab_active" style="min-height: 20px;">
                        <div v-if="pre_orders.length>0" class="card card-style mb-2" v-for="(line, i) in pre_orders" style="background-color: #fafafa;margin: 0;">
                            <ShippingCard :line_order="line" requestFrom="my-store" />
                            
                        </div>
                        <div v-else-if="!isLoading" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                            {{$t('message.no_data')}}
                        </div>
                        <div v-observe-visibility="handleScrolledToBottomPreOrders">
                            <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid" style="display: block;">
                            <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                                {{$t('message.no_more_data')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    import i18ns from '../i18n'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import ProductCard from '../components/ProductCard.vue'
    import ShippingCard from '../components/ShippingCard.vue'

    export default{
        components: {
            Carousel, Slide, Pagination, Navigation, ProductCard, ShippingCard
        },
        data() {
            return {
                products: [],
                data_pagination: null,
                last_products: [],
                sales_line_orders: [],
                pre_orders: [],
                categories: [],
                current_page: 1,
                last_page: 0,
                country_code: '',
                country_code_iso3: '',
                //user: null,

                home_tab_active: true,
                products_tab_active: false,
                sales_tab_active: false,
                pre_order_tab_active: false,

                isLoading: false,
                noMoreData: false,

                shipped: "false",
                approbation_active: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.activeSalesTab();
            this.getInProgress();

            console.log('Component mounted.')
        },
        methods: {
            async getSales() {
                this.isLoading = true;
                let seller_id = this.user.id;
                let shipped = this.shipped;
                let page = this.current_page;
                let parameters = {seller_id, page}
                if (shipped) {
                    parameters = {seller_id, shipped, page}
                }
                await axios.get('/get-sales', {params: parameters})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.sales_line_orders;
                    let sales = res.data.sales_line_orders.data.filter(x=>x.order && x.order.user && x.product && x.product.user);
                    this.sales_line_orders.push(...sales);
                    this.last_page = this.data_pagination.last_page;
                    console.log("this_store.sales_line_orders", res.data, this.sales_line_orders);
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            async loadPreOrders() {
                this.isLoading = true;
                let seller_id = this.user.id;
                let page = this.current_page;
                await axios.get('/pre-orders', {params: {seller_id, page}})
                .then(res => {
                    this.isLoading = false;
                    this.data_pagination = res.data.pre_orders;
                    this.pre_orders.push(...res.data.pre_orders.data);
                    //this.pre_orders = res.data.pre_orders;
                    this.last_page = this.data_pagination.last_page;
                    $('.loader').css('display', 'none');
                    console.log("this_store.pre_orders", this.pre_orders);
                })
                .catch(err => {
                    this.isLoading = false;
                    this.not_found = true;
                })
            },
            handleScrolledToBottomSales(isVisible){
                //alert('handleScrolledToBottomSales')
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (!this.sales_tab_active) {return}
                //this.isLoading = true;
                if (this.current_page >= this.last_page) {
                    this.isLoading = false;
                    this.noMoreData = true;
                    return;
                }
                this.current_page++
                this.getSales();
                //$('.loader').css('display', 'none');
            },
            handleScrolledToBottomPreOrders(isVisible){
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (!this.pre_order_tab_active) {return}
                //this.isLoading = true;
                if (this.current_page >= this.last_page) {
                    this.isLoading = false;
                    this.noMoreData = true;
                    return;
                }
                this.current_page++
                this.loadPreOrders();
                //$('.loader').css('display', 'none');
            },
            activeSalesTab(){
                this.home_tab_active = false;
                this.products_tab_active = false;
                this.sales_tab_active = true;
                this.pre_order_tab_active = false;
                /*this.sales_line_orders = []
                this.reinitPaginationParam()
                this.getSales();*/
            },
            activePreOrderTab(){
                this.home_tab_active = false;
                this.products_tab_active = false;
                this.pre_order_tab_active = true;
                this.sales_tab_active = false;
                this.pre_orders = [];
                this.reinitPaginationParam()
                this.loadPreOrders()
            },
            reinitPaginationParam(){
                this.current_page = 1;
                this.last_page = 0;
                this.isLoading = false;
                this.noMoreData = false
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
            getAll(){
                this.shipped = "-1"
                this.current_page = 1
                this.sales_line_orders = []
                this.getSales()
            },
            getShipped(){
                this.shipped = "true"
                this.current_page = 1
                this.sales_line_orders = []
                this.getSales()
            },
            getInProgress(){
                this.shipped = "false"
                this.current_page = 1
                this.sales_line_orders = []
                this.getSales()
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

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

    .no_more_data{
        display: none;
        margin: 10px;
        padding: 10px;
        text-align: center;
        background-color: #f0f0f0;
        border-radius: 10px;
    }
    .card-style {
      box-shadow: none;
    }
    .break-word-customer{
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
</style>