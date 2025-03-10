<template>
    <div>
        <div class="page-content">
            <div class="card card-style">
                <div class="content mb-0">
                    <div v-for="contact in contacts" class="">
                        <router-link :to="{name: 'support', params: {corresponding_id: contact.id}}" class="d-flex mb-3">
                            <div>
                                <img :src="contact.avatar" width="40" height="40" class="me-3" style="border-radius: 50%;">
                            </div>
                            <div>
                                <h5 class="font-16 font-600">{{contact.fullnameOrUsername}}</h5>
                                <p class="line-height-s mt-1 opacity-70">{{contact.last_message.message}}</p>
                            </div>
                            <i class="" style="float: right;color: lightgray;">{{$filters.formatDate(contact.last_message.created_at)}}</i>
                        </router-link>
                        <div class="divider mb-3"></div>
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
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data: () => ({
            id: null,
            contacts: [],
            updateContacts: null,
        }),
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'header_type', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'isOpenLoading', 'connecting']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        created () {
            this.updateFunction();
        },
        beforeUnmount () {
            clearInterval(this.updateContacts);//Break the setInterval
        },
        mounted(){
            this.$hide_modal.hide_modal('menu-main');
            this.pageTitle = 'Support contacts';
            this.header_type = "header_with_back_btn"
            this.getContacts()
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
            async getContacts(){
                let id = this.user.id
                await axios.get(`/support-contacts`)
                .then(res => {
                    this.isLoading = false;
                    //this.contacts.push(...res.data.contacts)
                    this.contacts = res.data.contacts
                    //console.log(this.contacts)
                })
                .catch(error => {});
            },
            updateFunction () {
                this.updateContacts = setInterval(() => {
                    //alert('update')
                    this.getContacts()
                }, 10000)
            }
        }
    }
</script>

<style scoped>
</style>
