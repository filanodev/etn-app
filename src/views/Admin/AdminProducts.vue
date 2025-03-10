<template>
    <div>
        <Header ref="header" pageTitle="Admin Products" :hide_settings_icon="true"/>
        <Reasons @updateReasons="updateReasons"/>
        <div class="page-content">
            <div class="card card-style" v-if=user>
                <div class="content mt-1 mb-0" style="margin: auto 0;">
                    <br>
                    <label for="tout">Tout</label>
                    <input id="tout" class="form-check-input" type="radio" name="type" value="" @change="loadData" v-model="status">
                    <label for="attente">En attente</label>
                    <input id="attente" class="form-check-input" type="radio" name="type" value="pending" @change="loadData" v-model="status">
                    <label for="valide">Validé</label>
                    <input id="valide" class="form-check-input" type="radio" name="type" value="validated" @change="loadData" v-model="status">
                    <label for="rejete">Rejeté</label>
                    <input id="rejete" class="form-check-input" type="radio" name="type" value="rejected" @change="loadData" v-model="status">
                    <div v-if="products.length>0" class="row text-center mb-0" v-masonry transition-duration="0.3s" item-selector=".item">
                        <div v-masonry-tile class="item col-6 col-sm-3 col-md-3 col-lg-2 mb-4" v-for="(product, index) in products" style="padding: 0 10px;">
                            <ProductCard @validate_product_event="validate_product" :product="product" :isOwner="user.id==product.user.id" :approbation_active="approbation_active" />
                        </div>
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
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../../stores'

    import i18ns from '../../i18n'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import ProductCard from '../../components/ProductCard.vue'
    import Reasons from '../../components/Reasons.vue'

    export default{
        components: {
            Carousel, Slide, Pagination, Navigation, ProductCard, Reasons
        },
        data() {
            return {
                products: [],
                data_pagination: null,
                last_products: [],
                categories: [],
                current_page: 0,
                last_page: 1,
                country_code: '',
                country_code_iso3: '',
                //user: null,

                isLoading: false,
                noMoreData: false,
                status: 'pending',
                search: '',
                validation_data: null,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'http_request_status']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.$hide_modal.hide_modal('menu-main');
            
            this.getData();
            //this.getMyProducts();
            console.log('Component mounted.')
        },
        methods: {
            ...mapActions(useStore, ['validate_product_store']),
            loadData(){
                this.reinitPaginationParam()
                this.getData()
            },
            async getData() {
                this.isLoading = true
                let res = await axios.get(`/product-reloading?page=${this.current_page}&search=${this.search}&connected_user_id=${this.user.id}&status=${this.status}&request_from=admin`)
                .then(res => {
                    console.log('admin data-loading', res.data)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.products_pagination = res.data.products;
                    this.products.push(...res.data.products.data);
                    this.last_page = res.data.products.last_page;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.isOpenLoading = false;
                });
            },
            validate_product(data){
                this.validation_data = data
                if (data.status == 'rejected') {
                    this.$show_modal.show_modal({id: 'reasons'})
                    return
                }
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
                          this.validate_product_store(data)
                        }
                      }
                    }
                )
            },
            updateReasons(reasons){
                let tab = []
                reasons.forEach(val=>{
                    if (val.selected) {
                        tab.push(val.code)
                    }
                })
                this.validation_data.reasons = tab
                this.validate_product(this.validation_data)
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
            reinitPaginationParam(){
                this.current_page = 0;
                this.last_page = 1;
                this.isLoading = false;
                this.noMoreData = false
                this.products = []
            }
        },
        watch: {
            http_request_status(val, old){
                if (val == 'success') {
                    this.products = []
                    this.getData()
                }
            }
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
