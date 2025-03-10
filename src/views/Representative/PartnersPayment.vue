<template>
    <div>
        <Header ref="header" pageTitle="Partner payment" :hide_settings_icon="true"/>
        <div class="page-content">
            <div class="content">
                <div class="list-group list-custom-small list-icon-0 check-visited" v-if="data && data.length > 0">
                    <a v-for="(d, index) in data">
                        {{$functions.isoToEmoji(d.partnerAccount.country_code)}} {{d.partnerAccount.pi_username}}|{{d.last_month_amount}}
                    </a>
                </div>
                <button v-if="!isLoading" class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" @click="proceed">Proceed</button>
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
          data: null,
          isLoading: false,
          balance: 0,
          nb_orders: 0,
          settings: [],
          partnerAccount: null,
          wallet_address: '',
          country_name: '',
        }
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'isOpenLoading', 'connecting', 'saving']),
        },
        mounted() {
            this.getData();
            this.$functions.scrollToTop();
        },
        methods: {
            ...mapActions(useStore, ['getCountryNameByCode']),
            reload(){
                this.getData();
            },
            async getData() {
                let uid = this.user.uid;
                this.isLoading = true
                await axios.get('/partner/get-partners-payments-amount')
                .then(res => {
                    console.log("/get-partners-payments-amount", res.data.data)
                    this.isLoading = false
                    this.data = res.data.data
                })
                .catch(err => {
                    this.isLoading = false
                })
            },
            async proceed() {
                this.saving = true
                await axios.post('/partner/get-partners-payments-amount')
                .then(res => {
                    console.log("/get-partners-payments-amount", res.data)
                    this.saving = false
                    if (res.data.status === true) {
                        this.$functions.msg_box_new(this.$confirm, 'success', this.$t('message.info'), this.$t("message.successfully"))
                    }else{
                        this.$functions.msg_box_new(this.$confirm, 'error', this.$t('message.info'), this.$t(res.data.message))
                    }
                })
                .catch(err => {
                    this.saving = false
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
