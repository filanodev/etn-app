<template>
    <div>
        <div class="page-content">
            <div class="card card-style" style="min-height: 500px;">
                <div class="content mb-0">
                    <div class="row mb-3">
                        <div class="col-12 pt-1">
                            <h3 style="text-align: center;">We on maintenance <span v-if="isLoading">...</span></h3>
                            <div style="text-align: center;margin-top: 50px;">
                                <!-- <img src="/Piketplace.png" style="width: 50%;margin: auto;"> -->
                                <img src="/site_images/under_maintenance.jpg" style="width: 90%;margin: auto;border-radius: 10%;">
                            </div>
                            <!-- <div style="width: 100%;text-align: center;margin-top: 10px;">
                                <a @click="$router.push(prevRoute.path)" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                                    {{$t('message.go_back')}}
                                </a>
                            </div> -->
                        </div>
                    </div>
                </div>
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
        data: function () {
            return {
              //prevRoute: null,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'connecting']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted(){
            this.pageTitle = 'Maintenance';
            
            $('.link').on('click', function() {
                if (!$(this).hasClass('active-nav')) {
                    $('.link').removeClass('active-nav')
                    $(this).addClass('active-nav')
                    $('#preloader').removeClass('preloader-hide')
                }
                //$('#preloader').removeClass('preloader-hide')
                //$('#preloader').addClass('preloader-hide')
            });
            $( document ).ready(function() {
                $('#preloader').addClass('preloader-hide')
            });
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        methods: {
            
        }
    }
</script>

<style scoped>
</style>
