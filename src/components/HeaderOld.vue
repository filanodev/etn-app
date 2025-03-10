<template>
    <div v-show="header_type=='header_with_cart' && $route.name !='message'" class="header header-fixed header-logo-center" style="opacity: 1;overflow: hidden;">
        <!-- <a href="index.html" class="header-title">Piketplace</a> -->
        <!-- <form class="header-title">
            <input type="text" v-model="search" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;" @click="searching"></i>
            <button @click.prevent="searching"></button>
        </form> -->

        <a class="header-icon header-icon-1" style="width: 250px;text-align: left;white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;">
            <!-- <span v-if="route.path!=undefined && route.path!=null" @click="back" style="padding: 10px;">
                <i class="fas fa-arrow-left font-18" style="margin: auto;padding: 10px;background-color: #f0f0f0;border-radius: 3px;"></i>
            </span>&nbsp;&nbsp; -->
            <span @click="$show_modal.show_modal({id: 'menu-main'})" style="padding: 10px;">
                <i class="fa fa-bars font-18 color-piketplace" style="margin: auto;padding: 10px;background-color: transparent;border-radius: 3px;"></i>
                <!-- <span class="fa-stack fa-2X" style="vertical-align: baseline;">
                  <i class="fa fa-minus" style="display: block;font-size: 6px;width: 60px;"></i>
                  <i class="fa fa-minus" style="display: block;font-size: 6px;width: 60px;margin-left: 10px;"></i>
                  <i class="fa fa-minus" style="display: block;font-size: 6px;width: 60px;"></i>
                </span> -->
            </span>&nbsp;&nbsp;
            <img v-show="img" :src="'/'+img" alt="avatar" style="width: 20px;height: 20px;border-radius: 50%;object-fit: cover;">&nbsp;
            <strong id="titre" class="font-18" style="">
                {{$i18n.t(pageTitle)}}
            </strong>
        </a>
        <!-- <router-link :to="route.path">
            <i v-if="route!=null && route!='' && route!='/'"  class="fa fa-angle-left"></i>&nbsp;{{title}}
        </router-link> -->
        <!-- <a href="#" data-toggle-theme class="header-icon header-icon-4 show-on-theme-dark">
            <i class="fas fa-sun"></i>
        </a> -->
        <span class="header-icon header-icon-4 cart" style="height: 100%;">
            <router-link to="/cart" style="display: block;">
                <i class="fa fa-shopping-cart color-piketplace" style="font-size: 16px;"></i>
            </router-link>
            <span class="badge nb_cart">{{user && user.cart?user.cart.length:0}}</span>
        </span>
        <span class="header-icon header-icon-3" style="height: 100%;">
            <router-link to="/notifications" style="display: block;">
                <i class="fas fa-bell color-piketplace" style="font-size: 16px;"></i>
            </router-link>
            <span class="badge nb_notif">{{user && user.nbNotification?user.nbNotification:0}}</span>
            
        </span>
    </div>
    <div v-if="header_type=='header_with_back_btn'" class="header header-fixed header-logo-center" style="opacity: 1; border: none;" :style="colorWhite===true?'background-color: #F1F7FF':'background-color: #fb70c9'">
        <a class="header-icon header-icon-1" style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <div @click="back" style="width: 30%;display: inline-block;text-align: left;" class="">
                <span>
                    <i class="fas fa-angle-left font-18 color-white" :class="colorWhite===true?'color-piketplace':'color-white'" style="margin: auto;padding: 10px;border-radius: 3px;"></i>
                </span>
            </div>
            <div style="width: 39%;display: inline-block;">
                <strong class="font-18" :class="colorWhite===true?'color-piketplace':'color-white'">
                    {{$i18n.t(pageTitle)}}
                </strong>
            </div>
            <div style="width: 30%;display: inline-flex;">
                
            </div>
        </a>
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    export default {
        data: function () {
            return {
                search: '',
                img: null,
                route: '',
                isOpenLoading: false,
                isLoading: false,
                colorWhite: true,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'header_type']),
        },
        mounted() {
            console.log('mounting header home', this.user)
        },
        methods: {
            async searching(){
                this.$session.set('search', this.search);
                this.$session.set('sub', this.search);
                if (this.$router.currentRoute.path != '/') {
                    this.$router.push('/');
                }
                
            },
            setData(data){
                /*if (data.title!=undefined) {
                    this.title = data.title
                }*/
                if (data.route!=undefined) {this.route = data.route}
                if (data.img!=undefined) {this.img = data.img}
            },
            linkLoad(link){
                this.$router.push(link)
            },
            back(){
                this.$router.go(-1);
                //this.$router.push(this.route?this.route.path:"");
                /*let session = this.$session;
                let r = session.get("list_routes");
                let path = r[r.length-2];
                console.log("rrr", r, path)
                session.set("list_routes", r.splice(-1));
                this.$router.push(path!=undefined?path:"");*/
            },
        }
    }

    
</script>

<style scoped>
    .badge {
      position: relative;
      top: -65px;
      right: -16px;
      border-radius: 50%;
      background: red;
      color: white;
    }
</style>
