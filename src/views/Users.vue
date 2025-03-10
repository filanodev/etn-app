<template>
    <div>
        <Header ref="header" pageTitle="Users" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="card card-style">
                <div class="content mt-3 mb-0">
                    <h1>Users</h1>
                    <div class="">
                        <input type="text"  v-model="keyword" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;border:1px solid gray;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                    </div>
                    <span>{{data_pagination?data_pagination.total:0}} registered users</span>
                    <div class="divider mb-0"></div>
                    <div class="list-group list-custom-small list-icon-0 check-visited" v-if="users.length > 0">
                        <a v-for="(user, index) in users" :key="user.id">
                            <!-- <i class="fa fa-user rounded-sm bg-red-dark"></i> -->
                            <img :src="user.avatar" class="tw-inline" style="width: 30px;height: 30px;border-radius: 40%;object-fit: cover;">
                            <span class="font-11">@{{user.username}} {{user.fullname!=''?' / '+user.fullname:''}}|ads: {{user.number_ads_views}}</span>
                            <i class="">{{user.locale}}{{$functions.isoToEmoji(user.user_country && user.user_country.iso2!=undefined?user.user_country.iso2:'')}}</i>
                        </a>
                        <div v-observe-visibility="handleScrolledToBottom">
                            <img v-if="isLoading" src="/site_images/ae51e1395e87cc72c6021df5445cc5f8.gif" class="rounded-sm img-fluid">
                            <div v-if="noMoreData" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                                {{$t('message.no_more_data')}}
                            </div>
                        </div>
                    </div>
                    <div v-else-if="isLoading" style="text-align: center;">
                        <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script>
export default {
    
    
    methods: {
        getResults() {
            axios.get('/livesearch-country', { params: { keyword: this.keyword } })
                .then(res => this.countries = res.data)
                .catch(error => {});
            require('../../../public/template/scripts/bootstrap.min.js');
            
            const _0x77b9x42 = document[_0x962d[24]](_0x962d[119]);
            _0x77b9x42[_0x962d[22]]((_0x77b9xc) => {
                return _0x77b9xc[_0x962d[37]](_0x962d[64], (_0x77b9xb) => {
                    const _0x77b9x37 = document[_0x962d[24]](_0x962d[101]);
                    for (let _0x77b9xa = 0; _0x77b9xa < _0x77b9x37[_0x962d[12]]; _0x77b9xa++) {
                        _0x77b9x37[_0x77b9xa][_0x962d[4]][_0x962d[18]](_0x962d[16]);
                    }
                    for (let _0x77b9xa = 0; _0x77b9xa < _0x77b9x36[_0x962d[12]]; _0x77b9xa++) {
                        _0x77b9x36[_0x77b9xa][_0x962d[20]][_0x962d[112]] = _0x962d[115] + 0 + _0x962d[114];
                    }
                });
            });
        },
        select_country(id){
            let libelle = $('a[data-country-id='+id+']').attr('data-country-libelle')
            let src = $('a[data-country-id='+id+']').attr('data-country-src')
            $('#country_selected_id').val(id)
            $('#country_selected_label').html(libelle)

            $('#required-countries_id').css('display', 'none')
        }
    }
}
</script> -->

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        data() {
            return {
                keyword: '',
                users: [],
                data_pagination: null,
                current_page: 1,
                last_page: 2,
                noMoreData: false,
                isLoadingMore: false,
                isLoading: false,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'prevRoute']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.isLoading = true;
            this.loadUsers();
        },
        watch: {
            keyword(after, before) {
                this.current_page = 1
                this.users = []
                this.loadUsers();
            }
        },
        methods: {
            ...mapActions(useStore, ['login']),
            async loadUsers() {
                this.isLoadingMore = true
                let username = this.user.username;
                if(username != 'djedje00' && username != 'Filano'){
                    return;
                }
                await axios.get('/users', { params: { keyword: this.keyword, page: this.current_page}})
                .then(res => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.data_pagination = res.data.users
                    this.users.push(...res.data.users.data)
                    this.last_page = this.data_pagination.last_page;
                    //console.log(this.users);
                })
                .catch(err => {
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.not_found = true;
                })
            },
            handleScrolledToBottom(isVisible){
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoadingMore = false;
                    this.noMoreData = true;
                    return;
                }
                this.current_page++
                this.loadUsers();
                //$('.loader').css('display', 'none');
            },
        }
    }
</script>

<style scoped>

</style>
