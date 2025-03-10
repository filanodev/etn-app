<template>
    <div>
        <Header ref="header" pageTitle="message.notification.notifications" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: 64px;">
            <Adsense v-if="activate_google_ads"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div v-if="isLoggedIn && notifications.length>0" class="card card-style" style="min-height: 500px;">
                <div class="content mt-3 mb-0" v-if="notifications.length > 0">
                    <div class="list-group list-custom-small list-icon-0 check-visited" style="line-height: 15px;">
                        <div :style="'text-align:'+($i18n.locale=='ar'?'right':'left')" v-for="(notification, index) in notifications" :key="index" style="padding-top: 10px;padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
                            <div>
                                <i v-if="notification.is_new==1" class="btn-dark-piketplace" style="width: 60px;border-radius: 10px;padding: 5px;line-height: 30px;">{{$t('message.new')}}</i>
                                <i18n-t :keypath="notification.message" tag="span">
                                    <template #product_name>
                                      <strong class="color-black" style='font-weight:600;'>{{notification.datas!=null?notification.datas.product_name:''}}</strong>
                                    </template>
                                    <template v-if="notification.url && notification.url.name" #here>
                                      <router-link class="color-blue-dark" :to="notification.url">
                                          {{$t('message.here')}}
                                      </router-link>
                                    </template>
                                    <template #name>
                                      <strong class="color-black">
                                          {{user.username}}
                                      </strong>
                                    </template>
                                    <template #username>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.username:''}}
                                      </strong>
                                    </template>
                                    <template #applicant>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.applicant:''}}
                                      </strong>
                                    </template>
                                    <template #seller>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.seller:''}}
                                      </strong>
                                    </template>
                                    <template #buyer>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.buyer:''}}
                                      </strong>
                                    </template>
                                    <template #deliver>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.deliver:''}}
                                      </strong>
                                    </template>
                                    <template #from>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.from:''}}
                                      </strong>
                                    </template>
                                    <template #to>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.to:''}}
                                      </strong>
                                    </template>
                                    <template #nb_product>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.nb_product:''}}
                                      </strong>
                                    </template>
                                    <template #amount>
                                      <strong class="color-black">
                                          <!-- {{notification.datas!=null?$functions.amount_format(notification.datas.amount, $currency):''}} -->
                                          <Amount v-if="notification.datas!=null" :amount="notification.datas.amount" class="color-black"/>
                                      </strong>
                                    </template>
                                    <template #fee>
                                      <strong class="color-black">
                                          <!-- {{notification.datas!=null?$functions.amount_format(notification.datas.fee, $currency):''}} -->
                                          <Amount v-if="notification.datas!=null" :amount="notification.datas.fee" class="color-black"/>
                                      </strong>
                                    </template>
                                    <template #time>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.time:''}}
                                      </strong>
                                    </template>
                                    <template #period>
                                      <strong class="color-black">
                                          {{notification.datas!=null && notification.datas.period?$t('message.time.'+notification.datas.period):''}}
                                      </strong>
                                    </template>
                                    <template #amount_piket>
                                      <strong class="color-black">
                                          <!-- {{notification.datas!=null?notification.datas.amount_piket:''}} -->
                                          <Amount v-if="notification.datas!=null" :amount="notification.datas.amount_piket" type="piket" class="color-black"/>
                                      </strong>
                                    </template>
                                    <template #child>
                                      <strong class="color-black">
                                          {{notification.datas!=null?notification.datas.child:''}}
                                      </strong>
                                    </template>
                                </i18n-t>
                                <!-- <span class="color-black">{{$t(notification.message, {
                                    name: user.username, 
                                    applicant: notification.datas!=null?notification.datas.applicant:'',
                                    number: 3,
                                    seller: notification.datas!=null?notification.datas.seller:'',
                                    deliver: notification.datas!=null?notification.datas.deliver:'',
                                    from: notification.datas!=null?notification.datas.from:'',
                                    to: notification.datas!=null?notification.datas.to:'',
                                    url: notification.url,
                                    buyer: notification.datas!=null?notification.datas.buyer:'',
                                    nb_product: notification.datas!=null?notification.datas.nb_product:'',
                                    product_name: notification.datas!=null?notification.datas.product_name:'',
                                    amount: notification.datas!=null?$functions.amount_format(notification.datas.amount, $currency):'',
                                })}}<span v-if="notification.type && notification.type!=0 && notification.type!=3">, {{$t('message.notification.click_to_see')}} <router-link class="color-piketplace" :to="notification.url" v-if="notification.url!=null">{{$t('message.here')}}</router-link></span></span> -->
                            </div>
                            <sub>{{$filters.formatDate(notification.created_at, $i18n.locale)}}</sub>
                        </div>
                    </div>
                    <div v-observe-visibility="handleScrolledToBottom">
                        <img v-if="isLoadingMore" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                        <div v-if="noMoreData" class="no_more_data" style="text-align: center;background-color: lightgray;color: #fff;">
                            {{$t('message.no_more_notifications')}}
                        </div>
                    </div>
                    <div class="divider mb-0"></div>
                </div>
            </div>
            <div v-else-if="!isLoggedIn && !isLoading">
                <div style="width: 100%;text-align: center;margin-top: 20px">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="notifications.length==0 && !isLoading">
                <a href="#" class="close-menu btn btn-margins btn-full font-13 btn-l font-600 mt-3 rounded-sm btn-dark-piketplace">{{ $t('message.no_notifications') }}</a>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
            <Adsense v-if="activate_google_ads"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        components: {
        },
        data: () => ({
            isLoadingMore: false,
            noMoreData: false,
            product: [],
            not_found: false,
            id: 0,
            //user: null,
            notifications: [],
            prevRoute: null,
            current_page: 1,
            last_page: 2,
            data_pagination: null,
            isLoading: false,
        }),
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'maintenance_mode', 'hide_notifications_icon', 'activate_google_ads']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.initLoaders()
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.isLoading = false
            this.hide_notifications_icon = true
            if (this.isLoggedIn) {
                this.isLoading = true
                this.loadNotifications();
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'initLoaders']),
            async loadNotifications() {
                this.isLoadingMore = true
                let user_id = this.user.id;
                let page = this.current_page;
                await axios.get('/notifications', {params: {user_id,page}})
                .then(res => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.data_pagination = res.data.notifications;
                    this.notifications.push(...res.data.notifications.data);
                    this.last_page = this.data_pagination.last_page;
                    console.log("res.data.notifications");
                    console.log(res.data.notifications);
                })
                .catch(err => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.not_found = true;
                })
            },
            handleScrolledToBottom(isVisible, entry){
                console.log('in handleScrolledToBottom')
                //$('.loader').css('display', 'block');
                if (!isVisible) {return}
                this.isLoadingMore = true
                if (this.current_page >= this.last_page) {
                    this.isLoadingMore = false
                    this.noMoreData = true
                    return;
                }

                this.current_page++
                //this.getProducts();
                this.loadNotifications();
                //$('.loader').css('display', 'none');
            },
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                if (newVal) {
                    this.loadNotifications();
                }
            }
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .no_more_data{
        /*display: none;*/
        margin: 10px;
        padding: 10px;
        text-align: center;
        color: #f0f0f0;
        background-color: #fff;
        border-radius: 10px;
    }
</style>