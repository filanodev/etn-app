<template>
    <div v-show="!isOpenLoading && $route.name !='support' && $route.name !='message'" id="footer-bar" class="footer-bar-6 footer_menu_hide" style="bottom: 30px;width: 70%;margin: auto;border-radius: 50px;background-color: rgba(0,0,0,0.4);">
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
    	right: -19px;
		top: -23px;
		background-color: red;
		color: white;
		border-radius: 50%;
		padding: 4px;
    }

    /*.footer-bar-6 .circle-nav strong {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      left: 50%;
      top: -23px;
      z-index: 0;
      transform: translateX(-50%);
      box-shadow: 0 5px 15px 0 rgba(0,0,0,.09);
      animation: footerAni 1s infinite;
      background-image: linear-gradient(to bottom,#812a6b 0,#812a6b 100%) !important;
    }*/
</style>
