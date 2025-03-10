<template>
    <div>
        <div class="page-content" style="margin-top: 64px">
            <div class="card card-style" style="min-height: 500px;">
                <div class="content mb-0">
                    <div class="row mb-3">
                        <div class="col-12 pt-1">
                            <h3 style="text-align: center;">{{$t('message.connection')}} <span v-if="isLoading">...</span></h3>
                            <!-- <div v-if="!isLoading" style="text-align: center;">
                                <img src="/Piketplace.png" style="width: 50%;margin: auto;">
                            </div> -->
                            <div v-if="isLoading" style="text-align: center;">
                                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">
                            </div>
                            <div v-if="isLoggedIn">
                                <div style="text-align: center;">
                                    {{$t('message.login_successfull')}}
                                </div>
                                <div id="profil" style="text-align: center;">
                                    <img v-if="user.avatar!='site_images/pi.png'" id="avatar" :src="user.avatar" style="width: 80px;height: 80px;object-fit: cover;border-radius: 50%;" alt="No avatar">
                                    <img v-else id="avatar" src="/site_images/default_avatar.png" style="width: 100px;height: 100px;object-fit: cover;border-radius: 50%;" alt="No avatar">
                                    <br>
                                    <strong style="color: #000;">{{user.fullnameOrUsername}} &nbsp;&nbsp;<router-link to="/profil" class="fas fa-edit color-green-dark" style="font-size: 16px;"></router-link></strong>
                                </div>
                                <div v-if="0" style="width: 100%;text-align: center;">
                                    <a @click="$router.push(prevRoute.path)" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="min-width: 100px;margin: auto;">
                                        {{$t('message.go_back')}}
                                    </a>
                                </div>
                            </div>
                            <div v-else-if="!isLoading && !isLoggedIn">
                                <div style="text-align: center;">
                                    {{$t('message.you_logged_out_click_to_login')}}
                                </div>
                                <div style="width: 100%;text-align: center;">
                                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                        {{$t('message.log_in')}}
                                    </button>
                                </div>
                            </div>
                            <div v-else-if="!isLoading && !isLoggedIn && error">
                                <div style="text-align: center;">
                                    {{$t('message.login_error')}}
                                </div>
                                <div style="width: 100%;text-align: center;">
                                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="min-width: 100px;margin: auto;">
                                        {{$t('message.try_again')}}
                                    </button>
                                </div>
                            </div>
                            <Adsense
                                data-ad-client="ca-pub-3962442438023665"
                                data-ad-slot="3809835226">
                            </Adsense>
                        </div>
                    </div>
                    <AdSense/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data: function () {
            return {
              //prevRoute: null,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'header_type', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'connecting']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted(){
            /*document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');*/
            this.pageTitle = 'message.connection';
            this.header_type = "header_with_back_btn"
            this.$hide_modal.hide_modal('menu-main');
            this.isLoading = true
            this.login({confirm: this.$confirm, self: this})
            $( document ).ready(function() {
                $('.link').removeClass('active-nav')
            });
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        watch: {
            user(after, before) {
                console.log('tggggg', this.user)
                /*if (this.user && this.user.state == 'new') {
                    this.$show_modal.show_modal({
                        id:'menu-language',
                    });
                }*/
            },
            isLoggedIn(after, before) {
                if (after === true) {
                    this.$router.push('/my-account')
                }
            },
        },
        methods: {
            ...mapActions(useStore, ['login']),
        }
    }
</script>

<style scoped>
</style>
