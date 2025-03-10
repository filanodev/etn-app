<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_store" :hide_settings_icon="true"/>
        
        <div class="page-content">
            <AddStock @add_stock_send_request="add_stock_send_request"/>
            <div class="card card-style" v-if="products.length>0">
                <div class="content mt-1 mb-0" style="margin: auto 0;">
                    <div style="background-image: url('site_images/shop_back.jpg');height: 100px;width: 100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
                    <img v-if="user && user.avatar!='pi.png'" :src="user.avatar" class="" style="width: 70px;height: 70px;border-radius: 50%;object-fit: cover;margin-top: -35px;margin-left: 10px;">
                    <img v-else src="/site_images/pi.png" class="" style="width: 70px;height: 70px;border-radius: 50%;margin-top: -35px;margin-left: 10px;">
                    <!-- <p class="color-highlight font-600 mb-n1">Appkit Pages for</p> -->
                    <h1 style="margin-top: 5px;margin-left: 20px;">{{$t('message.side_menu.my_store')}}</h1>
                    <!-- <p>
                    Highlight your products with style. These pages are great if you plan to connect Appkit to a CMS
                    </p> -->
                    <div class="divider mb-0"></div>
                    <div class="tab-controls mb-1" style="width: 100%;margin: auto;">
                        <a v-if="user && user.hasShop" class="no-effect" @click="activeHomeTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.home')}}
                            <span v-if="home_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                        <a class="no-effect" @click="activeProductsTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.products')}}
                            <!-- <span style="min-width: 19px;height: 19px;border-radius: 50%;color: rgb(255, 255, 255);background-color: rgb(0, 0, 0);display: inline-block;padding-bottom: 20px;">382</span> -->
                            <span v-if="products_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                        <!-- <a class="no-effect" @click="activeSalesTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.sales')}}
                            <span v-if="sales_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                        <a class="no-effect" @click="activePreOrderTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.pre_orders')}}
                            <span v-if="pre_order_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a> -->
                    </div>
                    <div class="divider mb-0"></div>
                    <div v-show="home_tab_active && user && user.hasShop" style="min-height: 20px;">
                        <div class="card card-style" style="border-radius: 5px;background-color: transparent;">
                            <div class="row" style="margin-left: 0;margin-right: 0;margin-bottom: 11px;">
                                <div class="col-10">
                                    <span style="font-weight: bold;line-height: 40px;">New products</span>
                                </div>
                                <div class="col-12" style="padding-left: 0;padding-right: 0;">
                                    <carousel :paginationEnabled="false" :per-page="3">
                                        <slide v-for="product in last_products" :key="product.id" style="margin: 10px;" v-if="product && product.image">
                                          <img :src="product.imageFirst" class="img-fluid" style="width: 100px;height: 100px;object-fit: cover;border-radius: 50%;border:1px solid gray;">
                                          <span class="break-word-shopname" style="text-align: center;">{{product.libelle}}</span>
                                        </slide>
                                    </carousel>
                                </div>
                                <!-- <router-link to="/shop-registration" class="font-700 color-blue-light">{{$t('message.register_my_shop')}}</router-link> -->
                            </div>
                        </div>

                        <div class="card card-style" style="border-radius: 5px;background-color: transparent;">
                            <div class="row" style="margin-left: 0;margin-right: 0;" v-for="category in categories" :key="category.id">
                                <div class="col-2">
                                    <img :src="'images/'+category.img" style="width: 100%;height: 35px;margin-top: 5px;object-fit: contain;">
                                </div>
                                <div class="col-10">
                                    <span class="break-word" style="font-weight: bold;line-height: 24px;">{{$t('message.categories.'+category.code)}}</span>
                                    <div style="line-height: 0;margin-top: -6px;">
                                    </div>
                                </div>
                                <div class="col-12" style="padding-left: 0;padding-right: 0;">
                                    <carousel :paginationEnabled="false" :per-page="3" v-if="category.products.length > 0">
                                        <slide v-for="(product, index) in category.products" :key="product.id" style="margin: 10px;" v-if="index<5">
                                          <img :src="product.imageFirst" class="img-fluid" style="width: 100px;height: 100px;object-fit: cover;border-radius: 10px;">
                                          <span class="break-word-productname">{{product.libelle}}</span>
                                        </slide>
                                    </carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="products_tab_active && user" style="min-height: 20px;">
                        <div class="content mb-0" v-if="products.length>0">
                            <masonry-wall :items="products" :ssr-columns="1" :column-width="300" :gap="15" :min-columns="2" :max-columns="2">
                                <template #default="{ item, index }">
                                    <ProductCard @submit_for_review_event="submit_for_review" @update_visibility_event="update_product_visibility_conf" @add_stock="add_stock" :product="item" :index="index" :isOwner="true" :approbation_active="approbation_active"/>
                                    <Adsense
                                      v-if="activate_google_ads && (index+1) % 9 === 0"
                                      ins-style="display:inline-block;width:180px;height:500px;margin-top: 22px;"
                                      data-ad-client="ca-pub-3962442438023665"
                                      data-ad-format="vertical"
                                      data-ad-slot="8165279527">
                                    </Adsense>
                                </template>
                            </masonry-wall>
                        </div>
                        <div v-else-if="!isLoading" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                            {{$t('message.no_data')}}
                        </div>
                        <div v-observe-visibility="handleScrolledToBottom">
                            <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid" style="display: block;">
                            <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                                {{$t('message.no_more_data')}}
                            </div>
                        </div>
                    </div>
                    <div v-show="user && sales_tab_active" style="min-height: 20px;">
                        <div class="row mt-2 mb-0 me-3 ms-3">
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" name="sales" @click="getAll" id="all" checked>
                                    <label class="form-check-label" for="all">{{$t('message.all')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-highlight"></i>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check icon-check">
                                    <input class="form-check-input" type="radio" name="sales" @click="getShipped" id="shipped" >
                                    <label class="form-check-label" for="shipped">{{$t('message.shipped')}}</label>
                                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                                    <i class="icon-check-2 far fa-check-circle font-16 color-highlight"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card card-style mb-1" v-for="(line, index) in sales_line_orders" style="padding: 0px 10px;margin: 0 0 20px;border-radius: 10px;" v-if="sales_line_orders.length>0">
                            <div v-if="line && !line.cancelled">
                                <div>
                                    <div style="text-align: left;width: 49%;display: inline-block;">
                                        <label v-if="line.shipped && line.noshipping">{{$t('message.confirmed')}}</label>
                                        <label v-else-if="line.shipped">{{$t('message.shipped')}}</label>
                                        <label v-else>{{$t('message.ordered')}}</label>
                                    </div>
                                    <div style="text-align: right;width: 49%;display: inline-block;">
                                        <em v-if="line.shipped" style="font-size: 11px;">{{$filters.formatDate(line.shipped_at, $i18n.locale)}}</em>
                                        <em v-else style="font-size: 11px;">{{$filters.formatDate(line.order.ordered_at, $i18n.locale)}}</em>
                                    </div>
                                </div>
                                <div class="divider mb-1"></div>
                                <div>
                                    <a style="text-align: left;width: 49%;display: inline-block;color: #000;">
                                        <label>
                                            <img :src="line.order.user.avatar" class="" style="width: 15px;height: 15px;border-radius: 50%;object-fit: cover;">&nbsp;{{line.order.user.fullnameOrUsername}} <i class="fa fa-angle-right"></i></label>
                                    </a>
                                    <div v-if="!line.order.noshipping" style="text-align: right;width: 49%;display: inline-block;" @click="show_full_address(line.order.shipping)">
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
                                        <h4 class="font-700 font-15 color-yellow-piketplace">{{$currency}}{{ line.product.price_str.split('.')[0]}}.<sup>{{line.product.price_str.split('.')[1]}}</sup>
                                            <span style="float: right;" class="mb-0 color-piketplace font-14">{{line.quantity}}x Item</span>
                                        </h4>
                                        <h5 class="font-500 font-12" v-if="line.shipping_info!=null && line.shipping_info.final_free_shipping">
                                            {{$t('message.free_shipping.text')}}
                                        </h5>
                                        <h5 class="font-500 font-12" v-if="!line.noshipping && line.fee!=0">
                                            {{$t('message.shipping_cost', {'amount': $functions.amount_format(line.fee, $currency)})}}
                                        </h5>
                                        <h5 class="font-500 font-12" v-else-if="line.noshipping">
                                            {{$t('message.address.no_shipping')}}
                                        </h5>
                                        <h5 class="font-600 font-13 color-yellow-piketplace" style="text-align: right;">
                                            {{$t('message.total_display', {'amount': $functions.amount_format(line.total+line.fee, $currency)})}}
                                        </h5>
                                        <router-link :to="{ name: 'message', params: { corresponding_id: line.order.user.id, line_order_id: line.id } }" class="color-piketplace">
                                            <i class="fa fa-comments-o font-14"></i>
                                            <span class="font-14">{{$t('message.discuss_with_buyer')}}</span>
                                        </router-link>
                                        <router-link class="font-700 btn btn-dark-piketplace rounded-xl" @click="" style="font-size: 12px;margin-right: 0;width: 100%;padding: 2px;" :to="{ name: 'shipping_management', params: { id: line.id } }"><i class="fas fa-shipping-fast"></i> {{$t('message.shipping_confirmation')}}</router-link>
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
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
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
                prevRoute: null,

                isLoading: false,
                noMoreData: false,

                shipped: false,
                approbation_active: false,
                products_id: 0,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'activate_google_ads', 'saving']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            if (!this.user.hasShop) {
                this.activeProductsTab()
                //this.getMyProducts();
            }else{
                this.getData();
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'submit_for_review']),
            async getData() {
                let res = await axios.get(`/category/products?id=${this.user.id}`);
                    /*.then(res => this.products.push(...res.data))
                    .catch(error => {});*/
                this.categories = res.data.categories;
                this.last_products = res.data.products;
                console.log("ncbcbcb nnnn", this.categories, this.last_products);
            },
            async getMyProducts() {
                this.isLoading = true;
                let res = await axios.get(`/my-products?userIdStore=${this.user.id}&page=${this.current_page}`)
                    .then(res => {
                        this.approbation_active = res.data.approbation_active
                        this.data_pagination = res.data.products
                        //this.products.push(...res.data.products.data)
                        this.products = [...this.products, ...res.data.products.data]
                        this.last_page = this.data_pagination.last_page;
                        this.isLoading = false;
                        console.log("this_store.products", this.products, this.data_pagination);
                    })
                    .catch(error => {
                        this.isLoading = false;
                        console.log(error);
                    });
            },
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
                    this.sales_line_orders.push(...res.data.sales_line_orders.data);
                    this.last_page = this.data_pagination.last_page;
                    console.log("this_store.sales_line_orders", this.sales_line_orders);
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
            update_product_visibility(product_id, force_hide = false){
                let data = {
                    product_id: product_id,
                    force_hide: force_hide,
                }
                console.log("update_product_visibility", data)
                this.saving = true
                axios.post('/update-product-visibility', data)
                .then(res => {
                    this.saving = false;
                    if (res.data.status === true) {
                        if (res.data.product && res.data.product.visible) {
                            this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.product_visible_now"))
                        }else{
                            this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.product_hidden_now"))
                        }
                        this.product = res.data.product
                        this.updateList(res.data.product)
                    }else if(res.data.message == "has_precommand"){
                        let yes = this.$t('message.continue')
                        let btn = {
                            yes: yes,
                            no: this.$t('message.confirmation.no_cancel'),
                        }
                        let img = '/site_images/confirm.PNG'
                        let msg = this.$t('message.this_product_contains_precommands')
                        msg = msg+'<br>'+this.$t('message.cancel_precommands_and_hide')
                        msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                        this.$confirm({
                          title: this.$t('message.info'),
                          message: msg,
                          button: btn,
                          html: true,
                            callback: async confirm => {
                                if (confirm) {
                                    this.update_product_visibility(product_id, true)
                                }
                            }
                        })
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(function (error) {
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
            async update_product_visibility_conf(product){
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.you_going_display_product')
                if (product.visible) {
                    msg = this.$t('message.you_going_hide_product')
                }
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
                      callback: async confirm => {
                        if (confirm) {
                            this.update_product_visibility(product.id)
                        }
                      }
                    }
                )
            },
            updateList(product){
                let index = this.products.findIndex(el => el.id === product.id);
                this.products[index] = product
            },
            submit_for_review(id){
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
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
                          this.submit_for_review({id:id, self: this})
                        }
                      }
                    }
                )
            },
            handleScrolledToBottom(isVisible){
                //alert('handleScrolledToBottom')
                console.log('products tab')
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (!this.products_tab_active) {return}
                //this.isLoading = true;
                if (this.current_page >= this.last_page) {
                    this.isLoading = false;
                    this.noMoreData = true;
                    return;
                }

                this.current_page++
                this.getMyProducts();
                //$('.loader').css('display', 'none');
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
            activeHomeTab(){
                this.home_tab_active = true;
                this.products_tab_active = false;
                this.sales_tab_active = false;
                this.pre_order_tab_active = false;
                this.reinitPaginationParam()
            },
            activeProductsTab(){
                this.home_tab_active = false;
                this.products_tab_active = true;
                this.sales_tab_active = false;
                this.pre_order_tab_active = false;
                this.products = []
                this.reinitPaginationParam()
                this.getMyProducts();
            },
            activeSalesTab(){
                this.home_tab_active = false;
                this.products_tab_active = false;
                this.sales_tab_active = true;
                this.pre_order_tab_active = false;
                this.sales_line_orders = []
                this.reinitPaginationParam()
                this.getSales();
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
            /*show_full_address(full){
                let title = "<div style='text-align:center;'>"+this.$t("message.address.full_shipping_address")+"</div>"
                let name = this.$t('message.address.name')+" : <strong>"+full.name+"</strong>";
                let country_name = this.$t('message.address.country_name')+" : <strong>"+full.country_name+"</strong>";
                let city = this.$t('message.address.city')+" : <strong>"+full.city+"</strong>";
                let address = this.$t('message.address.address')+" : <strong>"+full.address+"</strong>";
                let msg = title+"<br>"+name+"<br>"+country_name+"<br>"+city+"<br>"+address;
                this.$functions.msg_box(this.$t("message.info"), "<div style='text-align:left;'>"+msg+"</div>");
            },*/
            show_full_address(full){
                let title = "<div style='text-align:center;'>"+this.$t("message.address.full_shipping_address")+"</div>"
                let name = this.$t('message.address.name')+" : <strong>"+full.name+"</strong>";
                let country_name = this.$t('message.address.country_name')+" : <strong>"+full.country_name+"</strong>";
                let city = this.$t('message.address.city')+" : <strong>"+full.city+"</strong>";
                let address = this.$t('message.address.address')+" : <strong>"+full.address+"</strong>";
                let phone_number = this.$t('message.address.phone_number')+" : <strong>"+full.phone_number+"</strong>";
                let msg = title+"<br>"+name+"<br>"+country_name+"<br>"+city+"<br>"+address+"<br>"+phone_number;
                this.$functions.msg_box(this.$t("message.info"), "<div style='text-align:left;'>"+msg+"</div>");
            },
            getAll(){
                this.shipped = false
                this.page = 1
                this.sales_line_orders = []
                this.getSales()
            },
            getShipped(){
                this.shipped = true
                this.page = 1
                this.sales_line_orders = []
                this.getSales()
            },
            add_stock(products_id){
                this.products_id = products_id
                this.$show_modal.show_modal({id:'add-stock'})
            },
            add_stock_send_request(quantity){
                //alert(quantity)
                this.$hide_modal.hide_modal('add-stock')

                this.saving = true
                let data = {
                    products_id: this.products_id,
                    quantity: quantity,
                }
                axios.post('/add-stock', data)
                .then(res => {
                    this.saving = false;
                    if (res.data.status === true) {
                        this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.stock_added_successfully"))
                        this.product = res.data.product
                        this.updateList(res.data.product)
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(function (error) {
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

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
</style>
<style scoped>
/* Apply Masonry layout styles */
.masonry {
  column-count: 2; /* Set the number of columns as needed */
  column-gap: 0px; /* Adjust the gap between columns */
}

 /* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .masonry {
      column-count: 3; /* Set the number of columns as needed */
      column-gap: 0px; /* Adjust the gap between columns */
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .masonry {
      column-count: 4; /* Set the number of columns as needed */
      column-gap: 0px; /* Adjust the gap between columns */
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .masonry {
      column-count: 5; /* Set the number of columns as needed */
      column-gap: 0px; /* Adjust the gap between columns */
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .masonry {
      column-count: 6; /* Set the number of columns as needed */
      column-gap: 0px; /* Adjust the gap between columns */
    }
} 

.masonry-item {
  break-inside: avoid; /* Prevent items from breaking inside columns */
  margin-bottom: 20px; /* Adjust item margin as needed */
}

.masonry-item img {
  width: 100%; /* Ensure images fill their container */
  display: block;
}
</style>