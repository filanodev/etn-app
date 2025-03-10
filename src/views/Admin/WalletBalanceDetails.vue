<template>
    <div>
        <Header ref="header" :pageTitle="username+'\'s balance details'" :hide_settings_icon="true"/>
        <div class="page-content" style="margin-top: 64px;">
            <div class="card card-style" v-if="isLoggedIn && data">
                <h1 class="font-40 text-center mt-4">
                      <sup class="price-sup font-14">{{$currency}}</sup>
                      {{ balance.toString().split(".")[0]}}{{$t('message.balance.decimal_separator')}}<sup>{{ balance.toString().split(".")[1]==null?"00":balance.toString().split(".")[1]}}</sup>
                  </h1>
            </div>
            <div v-else-if="!isLoggedIn && !isLoading">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-if="isLoading" style="text-align: center;">
                <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../../stores'

    import { v4 as uuidv4 } from 'uuid';

    export default{
      /*components: {
          DropFile,
      },*/
      data: function () {
        return {
          isLoading: false,
          data: null,
          username: '',
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.username = this.$route.params.username;
            this.getBalance();
            //window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        methods: {
            ...mapActions(useStore, ['login']),
            async getBalance() {
                this.isLoading = true
                let username = this.username;
                console.log('username', username)
                await axios.get('/get-admin-wallet-details', {params: {username}})
                .then(res => {
                    console.log('balance res.data', res.data);
                    this.isLoading = false
                    this.data = res.data;
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    #dropzone{
        border-radius: 10px;
        border-width: 1px;
    }


    .error-message {
      display: none;
      color: red;
    }

    /* ✨ The magic ✨ */
    form.errors {
      :invalid {
        border-color: red;
      }
      .error-message {
        display: block;
      }
    }
</style>
