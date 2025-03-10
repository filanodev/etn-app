<template>
    <div>
        <Header ref="header" pageTitle="Shop" :hide_settings_icon="true"/>
        <div class="page-content">
            <Adsense
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div class="card card-style" v-if="userShop!=null">
                <div class="content mt-3 mb-0">
                    <div style="background-image: url('/site_images/shop_back.jpg');height: 100px;width: 100%;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
                    
                    <div v-if="userShop !=null">
                        <img v-if="userShop.avatar!='site_images/pi.png'" :src="userShop.avatar" class="" style="width: 70px;height: 70px;border-radius: 50%;object-fit: cover;margin-top: -35px;margin-left: 10px;">
                        <img v-else src="/site_images/pi.png" class="" style="width: 70px;height: 70px;border-radius: 50%;margin-top: -35px;margin-left: 10px;">
                    </div>
                    <!-- <p class="color-highlight font-600 mb-n1">Appkit Pages for</p> -->
                    <h1 style="margin-top: 10px;">{{user && shop_user_id==user.id?$t('message.side_menu.my_store'):(userShop.shop_name?userShop.shopNameShow:userShop.username+' store')}}</h1>
                    <!-- <p>
                    Highlight your products with style. These pages are great if you plan to connect Appkit to a CMS
                    </p> -->
                    <div class="divider mb-0"></div>
                    <div class="tab-controls mb-1" style="width: 100%;margin: auto;">
                        <a v-show="userShop.hasShop" class="no-effect" @click="activeHomeTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{ $t('message.home') }}
                            <span v-if="home_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                        <a class="no-effect" @click="activeProductsTab" style="background-color: transparent!important;border:none!important;font-weight: bold;">
                            {{$t('message.products')}}
                            <span v-if="products_tab_active" style="width: 60%;height: 4px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                        </a>
                    </div>
                    <div class="divider mb-0"></div>
                    <div v-show="home_tab_active && userShop.hasShop">
                        <div class="card card-style" style="border-radius: 5px;background-color: transparent;">
                            <div class="row" style="margin-left: 0;margin-right: 0;margin-bottom: 11px;">
                                <div class="col-10">
                                    <span style="font-weight: bold;line-height: 40px;">New products</span>
                                </div>
                                <div class="col-12" style="padding-left: 0;padding-right: 0;">
                                    <carousel :paginationEnabled="false" :per-page="3">
                                        <slide v-for="prod in userShop.products" :key="prod.id" style="margin: 10px;">
                                          <img :src="prod.imageFirst" class="img-fluid" style="width: 100px;height: 100px;object-fit: cover;border-radius: 50%;border:1px solid gray;">
                                          <span class="break-word-shopname" style="text-align: center;">{{prod.libelle}}</span>
                                        </slide>
                                    </carousel>
                                </div>
                                <!-- <router-link to="/shop-registration" class="font-700 color-blue-light">{{$t('message.register_my_shop')}}</router-link> -->
                            </div>
                        </div>

                        <div class="card card-style" style="border-radius: 5px;background-color: transparent;">
                            <div class="row" style="margin-left: 0;margin-right: 0;" v-for="category in categories" :key="category.id">
                                <div class="col-2">
                                    <img :src="'/images/'+category.img" style="width: 100%;height: 35px;margin-top: 5px;object-fit: contain;">
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
                    <div v-show="products_tab_active" style="min-height: 300px;">
                        <div class="">
                            <masonry-wall :items="products" :ssr-columns="1" :column-width="300" :gap="15" :min-columns="2" :max-columns="2">
                                <template #default="{ item, index }">
                                    <ProductCard :product="item" :index="index" from="shop" />
                                    <Adsense
                                      v-if="(index+1) % 9 === 0"
                                      ins-style="display:inline-block;width:180px;height:500px;margin-top: 22px;"
                                      data-ad-client="ca-pub-3962442438023665"
                                      data-ad-format="vertical"
                                      data-ad-slot="8165279527">
                                    </Adsense>
                                </template>
                            </masonry-wall>
                        </div>
                        <div v-observe-visibility="handleScrolledToBottom">
                            <img v-if="isLoadingMore" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                            <div v-if="current_page>=last_page" class="" style="text-align: center;">
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
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    import i18ns from '../i18n'
    import ProductCard from '../components/ProductCard.vue'
    export default{
        components: {
            Carousel, Slide, Pagination, Navigation, ProductCard
        },
        data() {
            return {
                products: [],
                categories: [],
                home_products: [],
                current_page: 1,
                last_page: 0,
                data_pagination: null,
                country_code: '',
                country_code_iso3: '',
                //user: null,
                userShop: null,
                shop_user_id: 0,

                isLoading: false,
                isLoadingMore: false,
                noMoreData: false,

                home_tab_active: false,
                products_tab_active: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isOpenLoading']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.shop_user_id = this.$route.params.shop_user_id;
            this.isLoading = true
            this.getUserShop(this.shop_user_id);
            //this.getProducts();
            console.log('Component mounted.')
        },
        methods: {
            async getProducts() {
                this.isLoadingMore = true
                await axios.get(`/index-loading?page=${this.current_page}&status=validated&shop_user_id=${this.shop_user_id}`)
                .then(res => {
                    //console.log('fgfgfgf', res.data.products.data)
                    //this.products.push(...res.data.products.data)
                    this.products = [...this.products, ...res.data.products.data]
                    this.data_pagination = res.data.products;
                    this.last_page = this.data_pagination.last_page;
                    this.isLoadingMore = false
                })
                .catch(error => {
                    this.isLoadingMore = false
                });
                
            },
            handleScrolledToBottom(isVisible){
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.noMoreData = true
                    return;
                }
                this.current_page++
                this.getProducts();
                //$('.loader').css('display', 'none');
            },
            async getUserShop(shop_user_id){
                this.isLoading = true
                await axios.get('/get-user-shop/'+shop_user_id).then(res => {
                    this.isLoading = false
                    this.userShop = res.data.userShop;
                    this.categories = res.data.categories;
                    if (this.userShop.hasShop) {
                        this.activeHomeTab()
                    }else{
                        this.activeProductsTab()
                    }
                    //this.$refs.header.setData({title: "this.userShop.fullnameOrUsername"})
                })
                .catch(error => {
                    this.isLoading = false
                });
            },
            activeHomeTab(){
                this.home_tab_active = true;
                this.products_tab_active = false;
                this.home_products = []
                this.home_products = this.userShop.products
            },
            activeProductsTab(){
                this.home_tab_active = false;
                this.products_tab_active = true;
                this.home_products = []
                this.getProducts();
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