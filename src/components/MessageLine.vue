<template>
	<div>
        <div v-if="message.sender_id==user.id || (message.admin_support_id!=null && message.admin_support_id==user.id)" class="speech-bubble speech-left btn-dark-piketplace">
            <img v-if="message.isImage" style="height: 100px;width: 100px;object-fit: contain;" :src="JSON.parse(message.message)[0].lien">
            <span v-else>{{message.message}}</span>
        </div>
        <div v-else class="speech-bubble speech-right color-black">
            <!-- <i v-if="message.line_order && message.line_order.deliver && message.sender_id==message.line_order.deliver.id" class="fas fa-shipping-fast"></i> -->
            <svg v-if="message.line_order && message.line_order.deliver && message.sender_id==message.line_order.deliver.id" class="tw:inline tw:m-[10px] mx-auto" width="15px" height="15px" fill="#a63289" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Delivery_Truck" data-name="Delivery Truck"> <g> <path d="M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z"></path> <path d="M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"></path> </g> </g> </g></svg>
            <!-- <i v-if="message.line_order && message.line_order.product && message.sender_id==message.line_order.product.user.id" class="fas fa-store"></i> -->
            <svg v-if="message.line_order && message.line_order.product && message.sender_id==message.line_order.product.user.id" class="tw:inline" width="13px" height="13px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>store</title> <g id="store-Filled"> <path id="store-Filled-2" data-name="store-Filled" class="cls-1" d="M20.5,18A3.5,3.5,0,0,1,17,21.5H14.53V19a2.5,2.5,0,0,0-5,0v2.5H7A3.5,3.5,0,0,1,3.5,18V13.35A5.634,5.634,0,0,0,5.99,14,4.409,4.409,0,0,0,9,12.78a4.3,4.3,0,0,0,6,0A4.409,4.409,0,0,0,18.01,14a5.634,5.634,0,0,0,2.49-.65Zm.974-9.158L20.386,5.577A4.494,4.494,0,0,0,16.117,2.5H7.883A4.494,4.494,0,0,0,3.614,5.577L2.526,8.842A.5.5,0,0,0,2.5,9a3.5,3.5,0,0,0,3.49,3.5A3.853,3.853,0,0,0,9,11.034a3.809,3.809,0,0,0,6.006,0A3.854,3.854,0,0,0,18.01,12.5,3.5,3.5,0,0,0,21.5,9,.5.5,0,0,0,21.474,8.842Z"></path> </g> </g></svg>
            <img v-if="message.line_order && message.line_order.order && message.sender_id==message.line_order.order.user.id" :src="message.line_order.order.user.avatar" class="tw:inline me-1" style="width: 15px;height: 15px;border-radius: 50%;">
            <em v-if="message.sender" style="font-size: 10px;">{{message.sender.fullnameOrUsername}}<br></em>
            <img v-if="message.isImage" style="height: 100px;width: 100px;object-fit: contain;" :src="JSON.parse(message.message)[0].lien">
            <span v-else>{{message.message}}</span>
        </div>
        <div class="clearfix"></div>
        <em v-if="message.sender_id==user.id || (message.admin_support_id!=null && message.admin_support_id==user.id)" class="speech-read mb-4">{{$filters.formatDate(message.created_at)}}</em>
        <em v-else class="speech-read speech-right mb-4">
            {{$filters.formatDate(message.created_at)}}
        </em>
        <div class="clearfix"></div>
    </div>
</template>

<script>
    import axios from 'axios';
    /*import AdSense from '../components/AdSense.vue'*/
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        props: {
            message: {
                type: Object,
                default: {}
            },
        },
        /*components: {
            AdSense
        },*/
        data: function () {
	        return {
	        	
	        }
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'connecting', 'saving', 'show_country', 'reasons']),
        },
        mounted() {
        },
        methods: {
          
        },
        watch:{
            
        }
    }
</script>

<style scoped>
    .speech-bubble {
      padding: 5px 10px;
      margin-bottom: 5px;
      line-height: 18px;
    }
</style>
