<template>
    <div>
        <div class="page-content">
            <div class="card card-style" v-if="isLoggedIn">
                <input type="date" name="">
                <div class="content mb-0" id="produit-form" v-if="user.settings && user.settings.length > 0">
                    <div v-for="(setting, index) in user.settings">
                        <div v-if="setting.type=='boolean'">
                            <SwitchButton :id="setting.name" :label="$t('message.user_settings.')+setting.name" v-model:checked="setting.value" />
                        </div>
                    </div>
                    <button @click="save_settings"
                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                        {{$t('message.profilForm.save')}}
                    </button>
                </div>
            </div>
            <div v-else>
                <div style="text-align: center;">
                    {{$t('message.you_logged_out_click_to_login')}}
                </div>
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-if="isLoading" style="text-align: center;">
                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import SwitchButton from '../components/SwitchButton.vue'

    export default{
      components: {
        SwitchButton,
      },
      data: function () {
        return {
          data: null,
          /*data: {
            balance: 0,
            sales_not_approved: 0,
            shippings_not_approved: 0,
            withdrawal: 0,
          },*/
          balance: 0,
          settings: [],
          data: [],
          isLoading: false,
        }
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'saving']),
        },
        mounted() {
            //ALTER TABLE `pi_users` ADD `settings` LONGTEXT NULL AFTER `user_country`; 
            this.$hide_modal.hide_modal('menu-main');
            this.pageTitle = 'message.side_menu.settings';
            this.getData();
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        methods: {
            ...mapActions(useStore, ['login']),
            reload(){
                this.getData();
            },
            async getData() {
                let user_id = this.user.id;
                this.isLoading = true
                await axios.get('/piketplace', {params: {user_id}})
                .then(res => {
                    this.isLoading = false
                    this.data = res.data.data;
                    this.settings = res.data.settings;
                    this.balance = this.settings.find(element=>
                         element.name === 'balance'
                    ).value;
                    console.log('settingds', this.balance, res.data.settings);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            async save_settings() {
                let settings = this.settings;
                let id = this.user.id;
                this.saving = true
                await axios.post('/save-settings', {id:id, settings:settings})
                .then(res => {
                    this.saving = false
                    this.user = res.data.user
                    this.settings = res.data.settings
                    if (res.data.status === true) {
                        this.$functions.msg_box(this, 'success', '', this.$t('message.saved'))
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(err => {
                    this.saving = false
                    //this.not_found = true;
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
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
