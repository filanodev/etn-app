<template>
    <div style="">
        <Header ref="header" v-model="before_search" @search="call_search" pageTitle="message.shop" :show_page_title="false" :hide_settings_icon="true"/>
        <div class="page-content" style="padding-top: 10px!important;" v-show="show_filter===false">
            <!-- <h1 class="font-15 font-600" style="line-height: 20px;width: 90%;text-align: center;margin: auto;">Welcome to Piketplace, a cryptocurrency e-commerce in the Pi Network Blockchain</h1> -->
            <marquee class="color-red-dark" :direction="locale=='ar'?'right':'left'">
                {{$t('message.announce.pi_ads')}}
            </marquee>
            <!-- <div class="" style="margin-right: 10px;margin-left: 10px;margin-top: 0;margin-bottom: 10px;">
                <input type="text" v-model="search" :placeholder="$t('message.search_product')" style="display: inline;width: 80%;height: 40px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 15px;padding-top: auto;font-size: 14px !important;"><i class="fas fa-search align-middle" style="margin-left: -20px;margin-left: -40px;font-size: 20px;color: #ec11b5;" @click="searching"></i>
                <div @click="country_select" class="tw:inline" style="width: 20%;padding: 5px 5px 5px 11px;cursor: pointer;margin-left: 15px;text-align: right;">
                    <span class="align-middle" v-if="country_product_search && country_product_search.iso2!='all'" v-html="$functions.isoToEmoji(country_product_search.iso2)"></span>
                    <img v-else class="tw:inline align-middle" src="/site_images/w.png" style="width: 15px;vertical-align: middle;">
                    <h5 class="font-10 tw:inline">{{country_product_search && country_product_search.iso3!='all'?country_product_search.iso3:$t('message.all')}}</h5>&nbsp;
                    <i class="fas fa-angle-down align-middle"></i>
                </div>
            </div> -->
            <Adsense v-if="activate_google_ads"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <!-- <a v-if="activate_pi_ads === true && can_show_add === true" @click="showPiAds('interstitial')" class="btn btn-full btn-3d btn-m mb-1 rounded-m font-600 shadow-s btn-dark-piketplace ms-2 me-2">
                View Pi Ads
            </a> -->
            <a v-if="activate_pi_interstital_ads === true" @click="launchAd" class="btn btn-full btn-3d btn-m mt-1 mb-1 rounded-m font-600 shadow-s btn-dark-piketplace ms-2 me-2">
                View Pi Ads
            </a>
            <a style="margin: 10px; padding: 8px 15px!important;" v-if="data_link && data_link.show" @click="linkLoad(data_link.link)" class="btn btn-full btn-3d btn-m mb-3 rounded-m font-600 shadow-s btn-dark-piketplace-outline">
                {{ data_link.text }}
            </a>
            <!-- <carousel v-show="show_index_slider" :wrapAround=true :autoplay=5000 :transition=2000 :pauseAutoplayOnHover=true dir=ltr>
                <slide style="text-align: center;">
                    <img src="/slides/cn.jpg" class="img-fluid" style="border-radius: 22px;height: 130px;width: 95%;object-fit: cover;padding: 10px;padding-top: 0;">
                </slide>
                <slide style="text-align: center;">
                    <img src="/slides/en.jpg" class="img-fluid" style="border-radius: 22px;height: 130px;width: 95%;object-fit: cover;padding: 10px;padding-top: 0;">
                </slide>
                <slide style="text-align: center;">
                    <img src="/slides/fr.jpg" class="img-fluid" style="border-radius: 22px;height: 130px;width: 95%;object-fit: cover;padding: 10px;padding-top: 0;">
                </slide>
            </carousel> -->
            <div v-show="product_tab_active">
                <div>
                    <carousel v-show="show_categories" :itemsToShow=5 :itemsToScroll=1 :autoplay=4000 :wrapAround=true :transition=2000 style="margin-bottom: 10px;">
                        <slide v-for="category in categories" :key="category.id" @click="sortByCategory(category)">
                          <!-- <img class="me-3 mt-2" :src="'images/'+category.img"> -->
                          <span v-if="category.icons" v-for="icon in category.icons.split(';')">
                              <i :class="icon"></i>
                          </span>
                        </slide>
                    </carousel>
                    <a>
                        <h4 v-if="filter.category != null" style="text-align: center;">
                            {{$t('message.categories.'+filter.category.code)}}
                            <i class="fa fa-times" style="color: red;cursor: pointer;" @click="sortByCategory()"></i>
                        </h4>
                    </a>
                    <div v-if="isLoading" style="text-align: center;">
                        <img style="width: 50px;margin: auto;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">
                        {{$t('message.loading')}}
                    </div>
                    <div class="content mb-0" v-if="products.length>0">
                        <!-- <div class="masonry" style="min-height: 200px;">
                            <div class="masonry-item" v-for="(product, index) in products" :key="product.id" style="padding: 0 10px;min-height: 200px;">
                                <ProductCard :product="product" :index="index" from="shop" />
                                <Adsense
                                  v-if="(index+1) % 9 === 0"
                                  ins-style="display:inline-block;width:180px;height:500px;margin-top: 22px;"
                                  data-ad-client="ca-pub-3962442438023665"
                                  data-ad-format="vertical"
                                  data-ad-slot="8165279527">
                                </Adsense>
                            </div>
                        </div> -->
                        <masonry-wall :items="products" :key="wallKey" :ssr-columns="1" :column-width="300" :gap="10" :min-columns="2" :max-columns="2">
                            <template #default="{ item, index }">
                                <ProductCard :product="item" :index="index" from="shop" />
                                <Adsense
                                  v-if="activate_google_ads && (index+1) % 7 === 0"
                                  ins-style="display:inline-block;width:180px;height:500px;margin-top: 22px;"
                                  data-ad-client="ca-pub-3962442438023665"
                                  data-ad-format="vertical"
                                  data-ad-slot="8165279527">
                                </Adsense>
                            </template>
                        </masonry-wall>
                        <div v-observe-visibility="handleScrolledToBottom" style="margin-top: 11px;text-align: center;">
                            <img v-if="isLoadingMore" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto" style="width: 80px;">
                            <div v-if="noMoreData && !isLoadingMore" class="no_more_data" style="">
                                {{$t('message.no_more_product_change_country_or_category')}}
                            </div>
                            <a v-if="noMoreData && !isLoadingMore" @click="getAll" class="btn btn-dark-piketplace color-black" style="text-transform: capitalize;">{{$t('message.see_all_items')}}</a>
                        </div>
                    </div>
                    <div v-else-if="!isLoading && products.length == 0" class="no_more_data" style="text-align: center;">
                        <a @click="getAll" class="btn btn-dark-piketplace color-black" style="text-transform: capitalize;">{{$t('message.see_all_items')}}</a><br>
                        <a @click="reload" class="color-black" style="text-transform: capitalize;">{{$t('message.reload')}} <i class="fa fa-undo color-piketplace"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <Filter @filter_update="emitFilter"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import i18ns from '../i18n';
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import ProductCard from '../components/ProductCard.vue'

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        name: "Index",
        components: {
            Carousel, Slide, Pagination, Navigation, ProductCard,
            //SelectCountry,
            //AdSense,
        },
        data() {
            return {
                tests: [{
                    nom: "dqeq",
                    src: "http://localhost:8000/storage/uploads/images/2023-11-14/6553a27a1437f_RD-How-To-Hide-Apps-on-an-iPhone_FT.jpg",
                    href: "http://localhost:8000/storage/uploads/images/2023-11-14/6553a27a1437f_RD-How-To-Hide-Apps-on-an-iPhone_FT.jpg"
                }],
                products_pagination: null,
                shops: [],
                current_page: 1,
                last_page: 2,
                iso3: '',
                country_code_product: 'all',//Selected country for showing products
                country_code_product_iso3: '',//Selected country for showing products
                country_code_product_flag: 'all',//Selected country flag code 
                keyword: '',
                isLoading: false,
                isLoadingMore: false,
                noMoreData: false,
                product_tab_active: true,
                service_tab_active: false,
                shop_tab_active: false,
                show_connexion_btn: false,
                show_index_slider: true,
                show_categories: true,
                products: [],

                before_search: '',
                wallKey: 1,
            };
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            //vm.prevRoute = from
            //vm.$store.state.prevRoute = from
          })
        },
        created(){
            //this.getCategories();
            //Pi.nativeFeaturesList()
        },
        beforeUnmount () {
            //this.products = []
        },
        activated() {
            if (this.force_index_refresh) {
                this.set_force_index_refresh(false)
                this.products = []
                this.index_load_opening()
            }
        },
        computed: {
            ...mapWritableState(useStore, ['user', 'isLoggedIn', 'locale', 'connecting', 'disconnecting', 'saving', 'deleting', 'isOpenLoading', 'selected_category', 'selected_country', 'data_link', 'categories', 'saved_products', 'selected_category_search', 'selected_country_search', 'search', 'searching', 'show_all_label', 'show_filter', 'user_country', 'filter', 'show_page_title', 'can_show_add', 'activate_pi_interstital_ads', 'activate_pi_rewarded_ads', 'activate_google_ads', 'user_already_referred', 'isPiBrowser', 'force_index_refresh'])
        },
        async mounted() {
            //alert(this.$route.path)
            this.iso3 = 'all'
            this.show_all_label = true
            this.show_filter = false
            this.setConfDialog(this.$confirm)
            this.initParams()
            //console.log('pinia', this.$pinia.state.value.appData, this.user)
            if (this.isLoggedIn && this.user) {
                this.$i18n.locale = this.user.locale?this.user.locale:'en';
            }
            
            /*if (this.selected_country_search && this.selected_country_search!='all') {
                this.country_code_product = this.selected_country_search.iso2
                this.iso3 = this.selected_country_search.iso3
            }*/
            /*if (this.user_country) {
                this.country_code_product = this.user_country.iso2
                this.iso3 = this.user_country.iso3
                this.setSelectedCountry(this.user_country)
            }*/

            if (this.user_country==null) {
                this.getUserLocation()
                //this.$router.push({ name: 'user-country'})
            }
            if (this.filter==null) {
                this.resetFilter()
            }else{
                this.before_search = this.filter.search
            }

            this.index_load_opening()

            //console.log('Component mounted.', this.$router.options)
            
            //this.showPiAds('interstitial')
        },
        methods: {
            ...mapActions(useStore, ['login', 'setReasons', 'initParams', 'setSettings', 'setConfDialog', 'update_memory_data', 'setSelectedCategorySearch', 'setSelectedCountrySearch', 'setSelectedCountry', 'setProduct', 'setLoggedIn', 'saveProduct', 'resetFilter', 'setFilter', 'showPiAdsInterstitial', 'showPiAds', 'getUserLocation', 'getReferrerUsername', 'setReferrerUsername', 'set_user_already_referred', 'showPiAdsRewarded', 'piPaymentLogin', 'set_force_index_refresh']),
            reload(){
                this.isLoading = true
                this.index_load_opening()
            },
            launchAd(){
                //this.showPiAdsInterstitial()
                if (this.isLoggedIn === false) {
                    this.piPaymentLogin()
                }
                this.showPiAdsRewarded("index-page")
            },
            load_header_and_menu(){
                if (this.user != null) {
                    let nb = this.user.cart?this.user.cart.length:0
                    /*this.$refs.footer.setData({nb:nb});
                    this.$refs.header.setData({nb:nb, nb_notif:this.user.nbNotification, title: 'message.shop', route: this.prevRoute});
                    this.$refs.menu.setData({
                        code:this.country_code_product_flag,
                        user:this.user
                    });*/
                    //console.log("this.prevRoute", this.prevRoute)
                    this.country_code = this.user.country;
                }else{
                    /*this.$refs.footer.setData({nb:0});
                    this.$refs.header.setData({nb:0, nb_notif:0, title: 'message.shop', route: this.prevRoute});
                    this.$refs.menu.setData({});*/
                }
            },
            async index_load_opening(){
                let self = this
                this.isLoading = true
                let connected_user_id = 0
                if (this.user && this.user.id) {
                    connected_user_id = this.user.id
                }
                /*let country_codes = {
                    iso2: this.country_code_product,
                    iso3: this.iso3,
                }*/
                console.log("this.filter index", this.filter)
                let idCategory = this.filter.category?this.filter.category.id:''
                let res = await axios.get(`/index-loading?page=${this.current_page}&search=${this.filter.search}&category=${idCategory}&locale=${this.$i18n.locale}&connected_user_id=${connected_user_id}&status=validated&verified_shops=1`, { params: { filter: this.filter } })
                .then(res => {
                    console.log('index data-loading', res.data)
                    /*if (res.data.products.data.length>0 && this.products.length>0 && res.data.products.data[0].id!=this.products[0].id) {
                        this.products = res.data.products.data;
                    }*/
                    this.products_pagination = res.data.products;
                    
                    this.last_page = res.data.products.last_page;
                    if (this.products_pagination.current_page === 1) {
                        this.categories = res.data.categories;
                        this.products = res.data.products.data;
                        /*if (this.random_product_display_activation===false) {
                            this.saveProduct(this.products);
                        }*/
                        this.show_index_slider = res.data.show_index_slider;
                        this.data_link = res.data.data_link;
                        if (res.data.currency) {
                            this.$currencyFunction.setCurrency(res.data.currency);
                            this.$currencyFunction.setCurrency("$ETN");
                        }
                        this.setSettings(res.data);
                        this.setReasons(res.data.reasons);
                    }else{
                        this.products = [...this.products, ...res.data.products.data]
                        this.wallKey++
                    }
                    this.isLoading = false
                    this.isLoadingMore = false
                })
                .catch(error => {
                    //console.log(error)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.isOpenLoading = false;
                    this.searching = false;
                });
            },
            async load_new_products(){
                try {
                //console.log('qdsqs load')
                let connected_user_id = 0
                if (this.user && this.user.id) {
                    connected_user_id = this.user.id
                }
                /*let country_codes = {
                    iso2: this.country_code_product,
                    iso3: this.iso3,
                }*/
                //this.isLoading = true
                let idCategory = this.filter.category?this.filter.category.id:''
                let res = await axios.get(`/product-reloading?page=${this.current_page}&search=${this.filter.search}&category=${idCategory}&locale=${this.$i18n.locale}&connected_user_id=${connected_user_id}&status=validated&verified_shops=1`, { params: { filter: this.filter } })
                //.then(res => {
                    console.log('index new data-loading', res.data)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.products_pagination = res.data.products;
                    this.products.push(...res.data.products.data);
                    this.last_page = res.data.products.last_page;
                //})
                } catch (error) {
                //.catch(error => {
                    //console.log(error)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.isOpenLoading = false;
                //});
                };
            },
            handleScrolledToBottom(isVisible, entry){
                //console.log('in handleScrolledToBottom')
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                this.isLoadingMore = true
                if (this.current_page >= this.last_page) {
                    this.isLoadingMore = false
                    this.noMoreData = true
                    return;
                }

                this.current_page = this.current_page+1
                //this.getProducts();
                this.index_load_opening();
                //this.load_new_products();
                //$('.loader').css('display', 'none');
            },
            async call_search(search){
                //this.search = this.before_search;
                this.filter.search = this.before_search;
                this.setFilter(this.filter);
                this.current_page = 1;
                this.products = [];
                this.isLoading = true
                this.searching = true
                this.index_load_opening();
            },
            async sortByCategory(category = null){
                this.current_page = 1;
                this.products = [];
                //this.selected_category = category;
                this.filter.category = category;
                this.setFilter(this.filter);
                this.isOpenLoading = true
                this.index_load_opening();
            },
            async getAll(){
                //$('.loader').css('display', 'block');
                this.current_page = 1;
                this.products = [];
                /*this.filter.category = null;
                this.filter.search = "";*/
                this.isLoading = true
                //this.search = ""//Empty search field
                this.before_search = ""//Empty search field
                //this.setSelectedCountry(null)
                //this.setSelectedCountrySearch(null)
                this.resetFilter()
                this.load_country('all');
            },
            activeProductsTab(){
                this.product_tab_active = true;
                this.service_tab_active = false;
                this.shop_tab_active = false;
            },
            activeServicesTab(){
                this.$confirm(
                    {
                        title: 'Information',
                        message: 'In development mode',
                        button: {
                            yes: 'OK',
                        },
                        /**
                        * Callback Function
                        * @param {Boolean} confirm
                        */
                        callback: confirm => {
                            if (confirm) {
                            // ... do something
                            }
                        }
                    }
                )
                return 0;
                //this.product_tab_active = false;
                //this.service_tab_active = true;
                //this.shop_tab_active = false;
            },
            activeShopsTab(){
                this.getShops();
                this.product_tab_active = false;
                this.service_tab_active = false;
                this.shop_tab_active = true;
            },
            country_select(){
                //this.$show_modal.show_modal({id:'select-country-products'});
                this.$show_modal.show_modal({id:'select-country'});
            },
            load_country(country_code) {
                this.current_page = 1
                this.last_page = 2
                this.keyword = ""
                this.country_code_product = country_code
                this.country_code_product_flag = country_code
                if (country_code=='all') {
                    this.iso3 = 'all'
                }
                if (country_code!='' && country_code.toLowerCase() == 'uk') {
                    this.country_code_product_flag = 'gb'
                }
                this.products = []
                this.isLoading = true
                this.index_load_opening()
                this.$hide_modal.hide_modal('select-country-products');
            },
            linkLoad(link){
                location.href=link//It works
                //window.open(link);//It works too
                //It works with both
            },
            emitFilter(filter){
                this.searching = true
                this.before_search = filter.search
                //this.setFilter(filter)
                this.setSelectedCountrySearch(filter)
                //this.filter = filter//It works
                //window.open(link);//It works too
                //It works with both
                this.current_page = 1
                this.products = []
                this.isLoading = true
                this.index_load_opening()
            },
        },
        watch: {
            user(after, before) {
                this.load_header_and_menu()
            },
            /*keyword(after, before) {
                this.getResults();
                //this.search();
            },*/
            search(newValue, old){
                //this.call_search();
                /*if (newValue != '') {
                    this.call_search();
                }*/
            },
            product_tab_active(a, b){

            },
            activate_pi_interstital_ads(after, before){
                if (after === true) {
                    //this.showPiAdsInterstitial()
                }
            },
            user_country(after, before){
                if (after !== null) {
                    this.load_country(after.iso2)
                }
            },
            /*saved_products(a, b){
                this.products = a
            }*/
            /*isLoading(newValue, old){
                $('#footer-bar').css('display', 'none');
                if (!newValue) {
                    $('#footer-bar').css('display', 'flex');
                }
            }*/
            /*selected_country(newVal, oldVal){
                console.log("selected_country", newVal)
                let country = newVal
                let country_code = country==null?'all':country.iso2
                this.country_product_search = {
                    iso2: country_code,
                    iso3: country==null?'all':country.iso3,
                    is_updated: true,
                }
                this.setCountryProductSearch(this.country_product_search)
                //this.setCountryProductSearch(country)
                this.load_country(country_code)
            },*/
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    .map-container {
        height: 100vh; /* Set the height of the container to 100% of the viewport height */
    }
    .no_more_data{
        /*display: none;*/
        margin: 10px;
        padding: 10px;
        text-align: center;
        background-color: #f0f0f0;
        border-radius: 10px;
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
    .carddd .card__containerrr{
      padding : 2rem;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 1rem;
    }
    .carddd::before{
      position: absolute;
      content: '';
      background: #283593;
      height: 14px;
      width: 18px;
      top: 22px;
      right: 0px;
      transform : rotate(45deg);
      z-index: -1;
    }
    .carddd::after{
      position: absolute;
      content: 'gfhhf';
      top: 11px;
      right: -2px;
      padding: 0;
      width: 55px;
      font-size: 9px;
      height: 22px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: #3949ab;
      color: white;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      box-shadow: 4px 4px 15px rgba(26, 35, 126, 0.2);
    }
/* Apply Masonry layout styles */

</style>