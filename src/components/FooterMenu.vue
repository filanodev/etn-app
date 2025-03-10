<template>
    <!-- <div v-show="!isOpenLoading && $route.name !='support' && $route.name !='message'" id="footer-bar" class="footer-bar-6 footer_menu_hide" style="bottom: 30px;width: 70%;margin: auto;border-radius: 50px;background-color: rgba(0,0,0,0.4);">
        <router-link :to="{ name: 'index'}" class="link home" @click="openingHome"><i class="fa-solid fa-house"></i><em></em>
        </router-link>
        <router-link class="cart link" :to="{ name: 'cart'}">
        	<div style="height: 25px;color: #fff;">
                <i class="fa-solid fa-cart-shopping"><span class="custom_badge nb_cart">{{user && user.cart?user.cart.length:0}}</span></i>
            </div>
        	<em></em>
        </router-link>
        <router-link class="shippings link" :to="{ name: 'shippings'}"><i class="fa-solid fa-truck-fast"></i><em></em></router-link>
        <router-link class="link my-account" :to="{ name: 'my-account'}"><i class="fa-solid fa-user"></i><em></em></router-link>
        <router-link :to="{ name: 'publish'}" class="publish circle-nav link"><i class="fa-solid fa-plus"></i><strong></strong><em></em></router-link>
    </div> -->
    <div v-show="!isOpenLoading && $route.name !='support' && $route.name !='message'" id="footer-bar" class="tw:w-full mx-auto footer-bar-6 footer_menu_hide" style="background-color: white;">
        <router-link :to="{ name: 'index'}" class="link home" @click="openingHome">
            <!-- <i class="fa-solid fa-house color-piketplace"></i> -->
            <svg class="mx-auto" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" :stroke="'#000'" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 18H9" :stroke="'#000'" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            <span v-if="menu_link_title_active" class="title">{{$t('message.home')}}</span>
            <!-- <img class="mx-auto w-[30px] h-[30px]" src="/home.svg"> -->
            <em v-if="menu_link_bar_active"></em>
        </router-link>
        <router-link class="cart link" :to="{ name: 'cart'}">
            <div class="tw:w-[30px] tw:h-[30px] tw:relative tw:text-white mx-auto" style="">
                <!-- <i class="fa-solid fa-cart-shopping color-piketplace"><span class="custom_badge nb_cart">{{user && user.cart?user.cart.length:0}}</span></i> -->
                <svg class="mx-auto" width="30px" height="30px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z" stroke="#a63289" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z" stroke="#a63289" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94" stroke="#a63289" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg><span class="custom_badge nb_cart">{{user && user.cart?user.cart.length:0}}</span>
            </div>
            <span v-if="menu_link_title_active" class="title">{{$t('message.panier')}}</span>
            <em v-if="menu_link_bar_active"></em>
        </router-link>
        <router-link :to="{ name: 'publish'}" class="publish circle-nav link">
            <!-- <i class="fa-solid fa-plus"></i> -->
            <svg class="mx-auto tw:inline tw:align-[text-top!important]" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 14H12M12 14H14M12 14V16M12 14V12" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            <strong class="mx-auto"></strong>
            <span v-if="menu_link_title_active" class="title">{{$t('message.publish')}}</span>
            <em v-if="menu_link_bar_active"></em>
        </router-link>
        <router-link class="shippings link" :to="{ name: 'shippings'}">
            <!-- <i class="fa-solid fa-truck-fast color-piketplace"></i> -->
            <svg class="mx-auto" fill="#a63289" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Delivery_Truck" data-name="Delivery Truck"> <g> <path d="M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z"></path> <path d="M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"></path> </g> </g> </g></svg>
            <span v-if="menu_link_title_active" class="title">{{$t('message.shippings')}}</span>
            <em v-if="menu_link_bar_active"></em>
        </router-link>
        <router-link class="link my-account" :to="{ name: 'my-account'}">
            <!-- <i class="fa-solid fa-user color-piketplace"></i> -->
            <svg class="mx-auto" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span v-if="menu_link_title_active" class="title">{{$t('message.side_menu.my_account')}}</span>
            <em v-if="menu_link_bar_active"></em>
        </router-link>
        
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
    data() {
        return {
            show: true,
            isOpenLoading: false,
            menu_link_title_active: true,
            menu_link_bar_active: false,
        };
    },
    computed: {
        ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'connecting']),
    },
    methods: {
        visible(value = true){
            this.show = value
        },
        openingHome(){
            this.$router.push({name: 'index'})
            //console.log('openingHome',this.$route.name)
            //alert('openingHome')
            //this.isOpenLoading = false
            /*if (this.$route.name=='product') {
                this.$router.back()
            }else{
                this.$router.push('/')
            }*/
        },
    }
}
</script>

<style scoped>
    .custom_badge{
        right: -25px;
        top: -50px;
      width: 30px;
      height: 30px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 4px;
    }

    .title{
        color: black;
    }
    .active-nav .title{
        color: #a63289;
    }
    .link svg, .link path{
        stroke: black;
    }
    .circle-nav svg, .circle-nav path{
        stroke: white!important;
    }
    .active-nav svg, .active-nav path{
        /*fill: red;*/
        stroke: #a63289;
    }
    .active-nav em{
        background-image: linear-gradient(to bottom,#a63289 0,#a63289 100%) !important;
    }
</style>
