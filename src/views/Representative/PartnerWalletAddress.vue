<template>
    <div>
        <Header ref="header" pageTitle="message.partner_wallet_address" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="card card-style" v-if="partnerAccount!==null" style="min-height: 500px;">
                <form class="content mt-0 mb-0">
                    <div class="input-style no-borders has-icon mb-4" style="margin-bottom: 5px!important;color: #bdb6b6 !important">
                        {{$t('message.withdrawal.wallet_address')}}
                        <input type="text" class="form-control" id="wallet_address" :placeholder="$t('message.withdrawal.wallet_address')" v-model="wallet_address" style="display: inline;width: 100%;padding-left: 0px;">
                    </div>
                    <button @click.prevent="save" :disabled="isLoading || saving" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.profilForm.save')}}</button>
                </form>
            </div>
            <div v-else-if="!isLoading && !isLoggedIn">
                <div style="width: 100%;text-align: center;">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">{{$t('message.loading')}}
            </div>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../../stores'

    export default{

      data: function () {
        return {
          partnerAccount: null,
          wallet_address: "",
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('mounting')
            this.getData()
            this.$functions.scrollToTop();
        },
        watch: {
        },
        methods: {
            ...mapActions(useStore, ['login']),
            async getData() {
                this.isLoading = true
                await axios.get('/partner/set-partner-wallet-address')
                .then(res => {
                    console.log("set-partner-wallet-address", res.data)
                    this.isLoading = false
                    if (res.data.status === true) {
                        this.partnerAccount = res.data.partnerAccount
                        if (this.partnerAccount.wallet_address) {
                            this.wallet_address = this.partnerAccount.wallet_address
                        }
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(err => {
                    this.isLoading = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                })
            },
            async save() {
                this.saving = true
                await axios.post('/partner/set-partner-wallet-address', {wallet_address: this.wallet_address})
                .then(res => {
                    this.saving = false
                    if (res.data.status === true) {
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.saved"))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(err => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
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
