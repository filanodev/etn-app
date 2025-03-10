<template>
    <div>
        <Header ref="header" pageTitle="message.messages" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="card card-style" v-if="isLoggedIn && !isLoading">
                <div class="content mb-0">
                    <div class="mb-2">
                        <input type="text"  v-model="search" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;border:1px solid gray;"><i @click="launch_search" class="fas fa-search" style="margin-left: -20px;"></i>
                    </div>
                    <div v-for="contact in contacts" class="">
                        <router-link :to="{ name: 'message', params: { corresponding_id: contact.product.pi_users_id, line_order_id: contact.id } }" class="d-flex mb-3">
                            <div style="width: 9%">
                                <!-- <img :src="contact.avatar" width="40" height="40" class="me-3" style="border-radius: 50%;"> -->
                                <span class="fa-stack color-piketplace">
                                    <i class="fa fa-circle-thin fa-stack-2x" style="opacity: 1;"></i>
                                    <i class="color-piketplace fas fa-shopping-basket fa-stack-1x" style="opacity: 1;"></i>
                                </span>
                            </div>
                            <div style="width: 91%">
                                <div>
                                    <h5 class="font-12 font-600 tw:inline">{{contact.reference??contact.id}}</h5>
                                    <i style="float: right;" class="line-height-s mt-1 opacity-70 font-9 tw:text-gray-500">{{$filters.formatDate(contact.last_message?contact.last_message.created_at:contact.created_at)}}</i>
                                </div>
                                <div v-if="contact.last_message">
                                    <p v-if="contact.last_message && contact.last_message.isImage" class="font-12 font-600 tw:inline"><i class="fa fa-picture-o font-12"></i>&nbsp;{{contact.last_message.imageName}}</p>
                                    <p v-else class="font-12 font-600 tw:inline">{{contact.last_message?contact.last_message.message:''}}</p>
                                    
                                    <i v-if="contact.messages_count>0" style="float: right;" class="line-height-s mt-1 opacity-70 message-badge" :class="[contact.messages_count>10?'lg-content':'m-content']">{{contact.messages_count}}</i>
                                </div>
                            </div>
                        </router-link>
                        <div class="divider mb-3"></div>
                    </div>
                </div>
                <div v-observe-visibility="handleScrolledToBottom" style="margin-top: 11px;text-align: center;">
                    <img v-if="isLoadingMore" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto" style="width: 80px;">
                    <div v-if="noMoreData && !isLoadingMore" class="no_more_data" style="">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data: () => ({
            id: null,
            contacts: [],
            prevRoute: null,
            updateContacts: null,
            isLoading: false,

            search: "",
            isLoadingMore: false,
            current_page: 1,
            last_page: 1,
            noMoreData: true,
        }),
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'error', 'connecting', 'saving', 'searching']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        created () {
            //this.updateFunction();
        },
        beforeUnmount () {
            //clearInterval(this.updateContacts);//Break the setInterval
        },
        mounted(){
            this.$hide_modal.hide_modal('menu-main');
            this.isLoading = true;
            this.getContacts()
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        methods: {
            async getContacts(){
                let id = this.user.id
                let search = this.search
                //alert(search)
                await axios.get(`/message-contacts?page=${this.current_page}`, {params: {search}})
                .then(res => {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                    this.searching = false;
                    console.log("this.contacts", res.data.contacts)
                    this.contacts.push(...res.data.contacts.data)
                    this.last_page = res.data.contacts.last_page
                    //console.log(this.contacts)
                })
                .catch(error => {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                    this.searching = false;
                });
            },
            handleScrolledToBottom(isVisible, entry){
                if (!isVisible) {return}
                this.isLoadingMore = true
                if (this.current_page >= this.last_page) {
                    this.isLoadingMore = false
                    this.noMoreData = true
                    return;
                }
                this.current_page = this.current_page+1
                //this.getProducts();
                this.getContacts();
                //this.load_new_products();
                //$('.loader').css('display', 'none');
            },launch_search(){
                this.current_page = 1
                this.searching = true
                this.contacts = []
                this.getContacts()
            },
            updateFunction () {
                this.updateContacts = setInterval(() => {
                    //alert('update')
                    this.getContacts()
                }, 10000)
            }
        },
        
        watch: {
            
        }
    }
</script>

<style scoped>
    .message-badge {
      color: white;
      background-color: red;
      border-radius: 50%;
      margin-left: -8px;
    }
    .lg-content{
        padding: 3px 4px;
    }
    .m-content{
        padding: 1px 4px;
    }
</style>
