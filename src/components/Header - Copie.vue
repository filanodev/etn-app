<template>
    <div class="header header-fixed header-logo-center" style="background-color: rgba(255, 255, 255, 0.9);overflow: hidden;">
        <div class="header-icon header-icon-1" style="width: 400px;text-align: left;white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;">
            <div @click="back" style="width: 10%;display: inline-block;text-align: left;" class="">
                <span style="vertical-align: sub;">
                    <i class="fas fa-angle-left font-18 color-white" :class="colorWhite===true?'color-piketplace':'color-white'" style="margin: auto;padding: 10px;border-radius: 3px;"></i>
                </span>
            </div>
            <!-- <img class="tw-inline me-1" v-show="show_profile_image" :src="profile_img" alt="avatar" style="width: 30px;height: 30px;border-radius: 50%;object-fit: cover;"> -->
            <div v-if="show_page_title && user" class="tw-inline-block align-middle">
                <img v-if="show_profile_image" :src="user.avatar" style="width: 30px;height: 30px;float: left;margin-right: 10px;border-radius: 50%;object-fit: cover;">
                <div style="">
                    <h2 class="font-600 font-18 color-black">
                        {{pageTitle.includes('message.')?$i18n.t(pageTitle):pageTitle}}
                    </h2>
                    <h3 v-if="show_email && user" class="font-300 font-11 color-gray" style="line-height: 1;">{{user.email}}</h3>
                </div>
            </div>
            <div class="tw-inline-block" style="">
                <!-- <strong v-show="show_page_title" id="titre" class="font-18 color-black align-middle" style="">
                    {{pageTitle.includes('message.')?$i18n.t(pageTitle):pageTitle}}
                </strong> -->
                <div v-show="!show_page_title" class="tw-inline" style="margin-right: 10px;margin-left: 0px;margin-top: 0;margin-bottom: 10px;">
                    <input class="search-input" type="text" :value="modelValue" @input="handleInput" :placeholder="$t('message.search_product')" style="display: inline;height: 34px;background-color: #fff;border-radius: 21px;padding-right: 40px;padding-left: 15px;padding-top: auto;font-size: 14px !important;color: #000;border: 1px solid #a63289!important;">
                    <div class="btn btn-dark-piketplace tw-inline-block" style="margin-left: -20px;margin-left: -41px;padding: 2px 8px;text-align: center;margin-bottom: 3px;border-radius: 15px!important;background-color: #000!important;">
                        <i class="fas fa-search align-text-bottom color-white" style="font-size: 20px;" @click="call_search"></i>
                    </div>
                    <div @click="$show_modal.show_modal({id:'filter'});" class="tw-inline" style="width: 20%;padding: 5px 5px 5px 11px;cursor: pointer;margin-left: 0px;text-align: right;">
                        <span class="align-middle" v-if="selected_country_search && selected_country_search.iso2!='all'" v-html="$functions.isoToEmoji(selected_country_search.iso2)"></span>
                        <img v-else class="tw-inline align-middle" src="/site_images/w.png" style="width: 15px;vertical-align: middle;">
                        <h5 class="font-10 tw-inline">{{selected_country_search && selected_country_search.iso3!='all'?selected_country_search.iso3:$t('message.all')}}</h5>&nbsp;
                        <i class="fas fa-angle-down align-middle"></i>
                    </div>
                </div>
            </div>
        </div>
        <!-- <span class="header-icon header-icon-3" style="height: 100%;">
            <span @click="change_filter" style="height: 80%;margin-right: 10px;display: inline-block;vertical-align: middle;">
                <i class="fa fa-filter color-piketplace" style="font-size: 16px;"></i>
            </span>
        </span> -->
        <!-- <span class="header-icon header-icon-4" style="height: 100%;">
             <div class="dropdown">
                <button class="dropbtn">Dropdown
                  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a>
                </div>
              </div>
        </span> -->
        <span v-if="user && user.user_country && show_user_flag" v-show="!hide_notifications_icon" class="header-icon font-18" :class="!hide_settings_icon?'header-icon-3':'header-icon-4'" style="height: 100%;">
            {{$functions.isoToEmoji(user.user_country.iso2)}}
        </span>
        <span v-show="isLoggedIn" class="header-icon" :class="'header-icon-4'" style="height: 100%;">
            <span @click="$router.push({ name: 'notifications'})" style="height: 80%;margin-right: 10px;display: inline-block;vertical-align: middle;">
                <a style="display: block;">
                    <i class="fas fa-bell color-piketplace" style="font-size: 16px;"></i>
                </a>
                <span class="badge nb_notif">{{user && user.nbNotification?user.nbNotification:0}}</span>
            </span>
        </span>
        <!-- <span v-show="!hide_settings_icon" class="header-icon header-icon-5" style="height: 100%;">
            <span @click="$router.push('/user-settings')" style="height: 80%;margin-right: 10px;display: inline-block;vertical-align: middle;">
                <a style="display: block;">
                    <i class="fas fa-cog color-piketplace" style="font-size: 16px;"></i>
                </a>
            </span>
        </span> -->
        <span v-show="isLoggedIn" class="header-icon header-icon-5" style="height: 100%;">
            <span @click="$router.push({ name: 'profil'})" style="height: 80%;margin-right: 10px;display: inline-block;vertical-align: middle;">
                <a style="display: block;">
                    <i class="fas fa-user-circle-o color-piketplace" style="font-size: 20px;"></i>
                </a>
            </span>
        </span>
        <!-- <span class="header-icon header-icon-5 settings" v-click-outside="onClickOutside" style="height: 100%;">
            <span class="icon" style="height: 80%;margin-right: 10px;display: inline-block;vertical-align: middle;">
                <i @click="dropdown" class="fa fa-cog color-piketplace font-18" style=""></i>
            </span>
            <div v-show="show_dropdown" class="dropdown">
                <div class="dropdown-content">
                  <a v-if="isLoggedIn">
                      <i class="fa fa-cog color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.settings')}}
                  </a>
                  <router-link v-if="isLoggedIn" to="/profil">
                      <i class="fa fa-user color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.profile')}}
                  </router-link>
                  <router-link v-if="isLoggedIn" to="my-addresses">
                      <i class="fa fa-address-card-o color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.addresses')}}
                  </router-link>
                  <a @click="$show_modal.show_modal({id:'menu-language'})">
                      <i class="fa fa-language color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.language')}}
                  </a>
                  <a @click="clearCache($confirm)">
                      <i class="fa fa-eraser color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.clear_cache')}}
                  </a>
                  <a v-if="isLoggedIn" @click="logout">
                      <i class="fa fa-sign-out color-piketplace" style="font-size: 16px;"></i>
                      {{$t('message.side_menu.log_out')}}
                  </a>
                </div>
            </div>
        </span> -->
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    export default {
        props: {
          modelValue: String,
          pageTitle: {
              type: String,
              default(){
                  return ""
              }
          },
          show_page_title: {
              type: Boolean,
              default(){
                  return true
              }
          },
          show_user_flag: {
              type: Boolean,
              default(){
                  return false
              }
          },
          show_email: {
              type: Boolean,
              default(){
                  return false
              }
          },
          hide_settings_icon: {
              type: Boolean,
              default(){
                  return false
              }
          },
          hide_notifications_icon: {
              type: Boolean,
              default(){
                  return false
              }
          },
          show_profile_image: {
              type: Boolean,
              default(){
                  return false
              }
          },
        },
        data: function () {
            return {
                profile_img: '',
                route: '',
                isOpenLoading: false,
                isLoading: false,
                colorWhite: true,
                show_dropdown: false,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'show_filter', 'selected_country_search']),
        },
        mounted() {
            console.log('mounting header home', this.user)
            if (this.user && this.user.avatar) {
                this.profile_img = this.user.avatar
            }else{
                this.profile_img = "/site_images/default_avatar.png"
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'signOut', 'clearCache']),
            handleInput(event) {
              console.log('Input event:', event.target.value);
              this.$emit('update:modelValue', event.target.value);
            },
            onClickOutside(){
                //alert('outside')
                this.show_dropdown = false
            },
            async call_search(){
                //alert('iffk')
                this.$emit('search', event.target.value);
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
            },
            change_filter(){
                if (this.show_filter === true) {
                    this.show_filter = false
                }else{
                    this.show_filter = true
                }
            },
            dropdown(){
                if (this.show_dropdown === true) {
                    this.show_dropdown = false
                }else{
                    this.show_dropdown = true
                }
                //let attr = $('#dropdown-content').attr('style')
                /*let attr = $(".dropdown-content").css('display')
                if (attr === 'block') {
                    //alert('block')
                    //$('#dropdown-content').addClass('hide')
                    attr = $(".settings:hover .dropdown-content").css('display')
                    if (attr === 'block') {
                        //alert('block 2')
                        $('.dropdown-content').attr('style', 'display: none!important');
                    }
                }else{
                    //alert('else')
                    //$('#dropdown-content').removeClass('hide')
                    $('.dropdown-content').removeAttr('style');
                }*/
            },
            logout() {
                this.$hide_modal.hide_modal('menu-main');
                this.$functions.msg_box(this, 'confirm', this.$t('message.deconnection'), this.$t('message.confirmation.you_sure'), 'logout')
            },
        },
        watch: {
            
        }
    }

    
</script>

<style scoped>
    .badge {
      position: relative;
      top: -61px;
      right: -16px;
      border-radius: 50%;
      background: red;
      color: white;
    }

/* The dropdown container */
.dropdown {
  float: right;
  overflow: hidden;
  border-radius: 5px;
}

/* Add a red background color to navbar links on hover */
/*.navbar a:hover, .dropdown:hover .dropbtn, .settings .icon:hover {
  background-color: red;
}*/

/* Dropdown content (hidden by default) */
.dropdown-content {
  /*display: none;*/
  /*position: absolute;*/
  background-color: #ddd;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  /*top: 30px;*/
}

/* Links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  line-height: 20px;
}

/* Add a grey background color to dropdown links on hover */
.settings a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
/*.settings:hover .dropdown-content {
  display: block!important;
}*/
</style>
