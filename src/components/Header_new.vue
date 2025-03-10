<template>
    <div class="header header-fixed header-logo-center" style="opacity: .8;overflow: hidden;">
        <div class="tw-inline-block" style="width: 5%;height: 100%;background-color: red">
                <div style="">
                    <i class="fas fa-angle-left font-18 color-white" style="margin: auto;border-radius: 3px;"></i>
                </div>
        </div>
        <div class="tw-inline-block" style="width: 85%;height: 100%;background-color: green">
            
        </div>
        <div class="tw-inline-block" style="width: 5%;height: 100%;background-color: blue">
            
        </div>
        <div class="tw-inline-block" style="width: 5%;height: 100%;background-color: yellow">
            
        </div>
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
                show_dropdown: false,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'header_type', 'show_filter', 'hide_notifications_icon', 'hide_settings_icon', 'show_page_title']),
        },
        mounted() {
            console.log('mounting header home', this.user)
            /*$(document).click(function(e){
              $('.dropdown-content').fadeOut(300);
            })
            
            $( document ).ready(function() {
                $('.dropdown-content').blur(function(){
                    alert('yh')  
                })
            });*/
        },
        methods: {
            ...mapActions(useStore, ['login', 'signOut', 'clearCache']),
            onClickOutside(){
                //alert('outside')
                this.show_dropdown = false
            },
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
