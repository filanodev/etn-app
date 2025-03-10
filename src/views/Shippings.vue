<template>
    <div>
        <Header ref="header" pageTitle="message.shippings" :hide_settings_icon="true"/>
        <SelectCountry @propagation_country="selected_one"/>
        <div class="page-content" style="margin-top: 64px;">
            <!-- <AdSense/> -->
            <Adsense v-if="activate_google_ads"
                data-ad-client="ca-pub-3962442438023665"
                data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <!-- <div v-if="isLoading" style="text-align: center;">
                <img style="width: 40px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">
                {{$t('message.updating')}}
            </div> -->
            <p :style="'text-align:'+($i18n.locale=='ar'?'right':'left')" v-if="pre_orders_deadline" style="background-color: khaki;color: black;padding: 10px;border-radius: 10px;margin: 20px 20px;">
                <i class="fas fa-info-circle" style="color: #000;"></i>
                {{$t('message.check_shipping_available')}}<br/>
                {{$t('message.pre_orders_visibility_period', {'days': pre_orders_deadline})}}
            </p>
            <div style="background-color: #f8faf9;padding: 10px;border-radius: 0;width: 100%;" :class="show_shippings_filter?'delay-0':''">
                <div class="" style="">
                    <div @click="selected_box='from';country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.from')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span class="tw:inline" v-if="from_country!=='all' && from_country!==null" v-html="$functions.isoToEmoji(from_country.iso2)"></span>
                            <img class="tw:inline" v-else src="/site_images/svg/globe.svg" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{from_country!=='all' && from_country!==null?from_country.iso3:$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div @click="selected_box='to';country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.to')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span class="tw:inline" v-if="to_country!=='all' && to_country!==null" v-html="$functions.isoToEmoji(to_country.iso2)"></span>
                            <img class="tw:inline" v-else src="/site_images/svg/globe.svg" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{to_country!=='all' && to_country!==null?to_country.iso3:$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div style="display: inline-block;width: 10%;">
                        <button @click="search" class="btn color-piketplace border-piketplace"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
            <!-- <div style="background-color: white;margin: 10px;padding: 10px;border-radius: 10px;">
                <h3 class="font-600 color-piketplace"><i class="fa fa-filter color-piketplace" style="font-size: 16px;"></i>&nbsp;{{$t('message.filter')}}</h3>
                <div class="" style="">
                    <div @click="country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.from')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span v-if="'all'!='all'" v-html="$functions.isoToEmoji('tg')"></span>
                            <img v-else src="/site_images/w.png" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{'all'!='all'?'All':$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div @click="country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.to')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span v-if="'all'!='all'" v-html="$functions.isoToEmoji('tg')"></span>
                            <img v-else src="/site_images/w.png" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{'all'!='all'?'All':$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div style="display: inline-block;width: 10%;">
                        <button class="btn color-piketplace"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div> -->
            <div v-if="line_orders.length > 0" style="">
                <div v-for="(line, index) in line_orders" style="background-color: #fafafa;">
                    <!-- <AdSense type="shippings"/> -->
                    <div class="card card-style mb-1">
                        <ShippingCard v-if="line.preOrderCountry" :line_order="line" />
                    </div>
                    <div class="card card-style mb-1" v-if="activate_google_ads && (index + 1) % 7 === 0">
                        <InArticleAdsense
                          ins-style="display:inline-block;width:360px;height:300px"
                          data-ad-client="ca-pub-3962442438023665"
                          data-ad-format="horizontal"
                          data-ad-slot="9955946331">
                        </InArticleAdsense>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottom" style="text-align: center;">
                    <img v-if="isLoadingMore" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto" style="width: 70px;">
                    <div v-if="no_more_data" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
            <div v-else-if="error_message != ''" style="text-align: center;">
                <a @click="reload" class="color-black" style="text-transform: capitalize;">{{$t('message.reload')}} <i class="fa fa-undo color-piketplace"></i></a>
            </div>
            <div v-if="line_orders.length==0 && !isLoading">
                <div class="no_data" style="display: block;">
                    {{$t('message.no_shipping_data')}}
                </div>
            </div>
        </div>
        <!-- <div v-show="show_shippings_filter===false" style="position: fixed;top: 200px;left: 0;padding: 15px;background-color: rgba(0,0,0,0.4);border-radius: 10px;margin-left: -10px;">
            <i @click="show_shippings_filter?show_shippings_filter=false:show_shippings_filter=true" class="fa fa-search color-white" style="font-size: 20px;"></i>
        </div> -->
        <!-- <div v-if="show_shippings_filter" :class="show_shippings_filter?'filter-move':''" style="padding: 150px 10px 10px">
            <div style="background-color: white;padding: 10px;border-radius: 10px;width: 100%;" :class="show_shippings_filter?'delay-0':''">
                <i @click="show_shippings_filter=false" class="fa fa-times color-piketplace font-14" style="float: right;"></i>
                <h3 class="font-600 color-piketplace"><i class="fa fa-filter color-piketplace" style="font-size: 16px;"></i>&nbsp;{{$t('message.filter')}}</h3>

                <div class="" style="">
                    <div @click="selected_box='from';country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.from')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span v-if="from_country!==null" v-html="$functions.isoToEmoji(from_country.iso2)"></span>
                            <img v-else src="/site_images/w.png" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{from_country!==null?from_country.iso3:$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div @click="selected_box='to';country_select" style="display: inline-block;width: 45%;" class="color-piketplace">
                        {{$t('message.to')}}<br>
                        <div @click="country_select" style="background-color: #f0f0f0;border-radius: 5px;width: 95%;padding: 10px;">
                            <span v-if="to_country!==null" v-html="$functions.isoToEmoji(to_country.iso2)"></span>
                            <img v-else src="/site_images/w.png" style="width: 15px;">
                            <h5 style="font-size: 12px;display: inline;">{{to_country!==null?to_country.iso3:$t('message.all')}}</h5>&nbsp;
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                    <div style="display: inline-block;width: 10%;">
                        <button @click="search" class="btn color-piketplace border-piketplace"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import axios from "axios";
    import {delivery_period} from '../functions.js'
    import ShippingCard from '../components/ShippingCard.vue'
    //import AdSense from '../components/AdSense.vue'
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import SelectCountry from '../components/SelectCountry.vue'

    export default{
        name: "Shippings",
        components: {
            ShippingCard,
            SelectCountry,
            //AdSense
        },
        data() {
            return {
                //user: null,
                line_orders: [],
                connecting: false,
                isLoading: false,
                isLoadingMore: false,
                no_more_data: false,
                pre_orders_deadline: null,

                current_page: 1,
                last_page: 2,
                data_pagination: null,
                error_message: '',
                prevRoute: null,
                show_shippings_filter: false,
                selected_box: '',
                from_country: null,
                to_country: null,
            };
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        activated() {
            //alert('About has been activated')
            this.getLineOrders()
        },
        deactivated() {
            //alert('About has been deactivated')
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving', 'show_all_label', 'activate_google_ads']),
        },
        mounted(){
            this.show_all_label = true
            this.isLoading = true;
            this.getLineOrders();
            //this.showPiAdsInterstitial()
        },
        watch:{
            isLoggedIn(val, old){
                this.$forceUpdate()
            },
            /*selected_country(newVal, oldVal){
                if (newVal == "") {return}
                this.setSearchCountry(newVal)
            },*/
        },
        methods: {
            ...mapActions(useStore, ['showPiAdsInterstitial', 'showPiAds']),
            reload(){
                this.isLoading = true;
                this.getLineOrders();
            },
            selected_one(selected_country){
                console.log('shippings selected_country', selected_country)
                this.setSearchCountry(selected_country)
            },
            search(){
                this.saving = true;
                this.current_page = 1
                this.show_shippings_filter = false
                this.line_orders = []
                this.getLineOrders();
            },
            setSearchCountry(country){
                if (this.selected_box == 'from') {
                    this.from_country = country
                }
                if (this.selected_box == 'to') {
                    this.to_country = country
                }
            },
            async getLineOrders(){
                this.isLoadingMore = true;
                this.error_message = ''
                let user_applicant_id = this.user?this.user.id:'';
                let without_deliver = 1;
                let page = this.current_page;
                let from_country_code = this.from_country!=='all' && this.from_country!==null?this.from_country.iso2:'';
                let to_country_code = this.to_country!=='all' && this.to_country!==null?this.to_country.iso2:'';
                console.log("from_country_code", from_country_code)
                await axios.get(`/line-orders-shipping`, {params: {user_applicant_id, without_deliver, page, from_country_code, to_country_code}, headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }})
                .then(res => {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                    this.saving = false;
                    //this.line_orders = res.data.line_orders;
                    this.line_orders.push(...res.data.line_orders.data)
                    this.data_pagination = res.data.line_orders
                    this.pre_orders_deadline = res.data.pre_orders_deadline;
                    this.last_page = this.data_pagination.last_page;
                    this.$forceUpdate()
                    console.log("Shippings line_orders", this.line_orders);
                })
                .catch(error => {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                    this.saving = false;
                    this.error_message = this.$i18n.t('message.an_error_occured');
                });
            },
            shipping_confirmation(id, index){
                this.$confirm(
                    {
                      message: 'Are you sure?',
                      button: {
                        no: 'No',
                        yes: 'Yes'
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            axios.post(`/api/v1/shipping_applies/${id}`, {_method:"patch", confirmed: true})
                            .then(res => {
                                this.line_orders[index] = res.data.line_order;
                                let tmp = this.line_orders;
                                this.line_orders = [];
                                this.line_orders = tmp;
                                console.log("shipping_confirmation", res.data);
                            })
                            .catch(error => {});
                        }
                      }
                    }
                )
            },
            async signInAndApply(line_orders_id) {
                this.$confirm(
                    {
                      title: 'Confirmation',
                      message: this.$t('message.log_in_first'),
                      button: {
                        no: this.$t('message.confirmation.no_cancel'),
                        yes: this.$t('message.confirmation.yes_continue')
                      },
                      html: true
                        ,
                        /**
                        * Callback Function
                        * @param {Boolean} confirm
                        */
                        callback: confirm => {
                          if (confirm) {
                              //this.$store.dispatch('signInPiNetwork', {confirm: this.$confirm})
                              this.$router.push({ name: 'shipping_apply', params: { id: line_orders_id } })
                          }
                        }
                    }
                )
            },
            handleScrolledToBottom(isVisible){
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                $('.loader').css('display', 'block');
                if (this.current_page >= this.last_page) {
                    this.isLoading = false
                    this.no_more_data = true
                    $('.no_more_data').css('display', 'block');
                    return;
                }
                this.current_page++
                this.getLineOrders();
                //$('.loader').css('display', 'none');
            },
            country_select(){
                this.$show_modal.show_modal({id:'select-country'});
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .break-word{
        width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .no_data{
        display: none;margin: 10px;
        padding: 10px;
        text-align: center;
        background-color: #f0f0f0;
        border-radius: 10px;
    }

    .delay-0 {
      animation-name: move;
      animation-delay: 0s;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @keyframes move {
      /*from { left: 0px; }*/
      from { left: -100%; }
      /*to { left: 400px; }*/
      to { left: 0px; }
    }

    .delay-0 {
      background-color: orange;
      border-radius: 25px;
      position: relative;
    }
    .filter-move {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      border-radius: 5px;
      position: fixed;
      top: 0;
      left: 0;
    }
</style>
