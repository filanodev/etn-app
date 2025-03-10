<template>
    <div v-show="!isOpenLoading && $route.name !='support' && $route.name !='message'" id="footer-bar" class="footer-bar-6 footer_menu_hide">
        <router-link class="active-nav link home" to="/" @click="openingHome"><i class="fa fa-home"></i><span>{{ $t('message.home') }}</span><em></em></router-link>
        <router-link class="cart link" to="/cart">
        	<div style="height: 25px;">
                <i class="fa fa-shopping-cart"><span class="custom_badge nb_cart">{{user && user.cart?user.cart.length:0}}</span></i>
            </div>
        	<span>{{ $t('message.panier') }}</span>
        	<em></em>
        </router-link>
        
        <!-- <a @click="showMenu" class="button-menu"><i class="fa fa-bars"></i><span>{{ $t('message.menu') }}</span></a> -->
        <router-link class="shippings link" to="/shippings"><i class="fas fa-shipping-fast"></i><span>{{ $t('message.shippings') }}</span><em></em></router-link>
        <router-link to='/publish' class="publish circle-nav link"><i class="fa fa-plus"></i><span>{{ $t('message.publish') }}</span><strong></strong><em></em></router-link>
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
            this.isOpenLoading = false
            this.$router.push('/')
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
