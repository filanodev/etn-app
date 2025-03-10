<template>
    <div>
        <Header ref="header" pageTitle="Admin withdrawals" :hide_settings_icon="true"/>
        <div id="reason_withdrawals" class="menu menu-box-modal rounded-m content" data-menu-height="400" data-menu-width="350" style="display: block; min-height: 330px;width: 90%;margin: auto;">
            <!-- <h1 class="text-center mt-2">
                <i class="fa fa-2x fa-info-circle scale-box color-blue-dark shadow-xl rounded-circle"></i>
            </h1> -->
            <h4 class="text-center mt-3 font-700" style="margin-right: 10px;margin-left: 10px;">Raisons {{withdrawal_reasons.length}}</h4>

            <div v-if="withdrawal_reasons[$i18n.locale] && withdrawal_reasons[$i18n.locale].length>0" class="row mt-2 mb-0 me-3 ms-3" style="height: 500px;overflow: scroll;">
                <div class="col-12" v-for="(reason, index) in withdrawal_reasons[$i18n.locale]">
                    <div class="form-check icon-check">
                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" :id="reason.code" v-model="reason.selected">
                        <label class="form-check-label" :for="reason.code">{{reason.text}}</label>
                        <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                        <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <a @click="continue_cancellation" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace" style="font-size: 12px;">Continue</a>
            </div>
        </div>
        <div class="page-content" v-if="isLoggedIn" style="margin-top: -10px;">
            <div class="card card-style" style="min-height: 500px;">
                <div class="mt-1 text-center">
                    <label for="pending">Pending</label>
                    <input id="pending" class="form-check-input" type="radio" name="type" value="pending" v-model="status">
                    <label for="confirmed">Confirmed</label>
                    <input id="confirmed" class="form-check-input" type="radio" name="type" value="confirmed" v-model="status">
                </div>
                <div class="input-style has-borders validate-field mb-4 ms-3 me-3">
                    <input style="width: 85%" type="text" class="form-control validate-name tw:inline" id="search" :placeholder="$t('message.search')" maxlength="40" v-model="search">
                    <label for="libelle" class="color-piketplace">{{ $t('message.search') }}</label>
                    <div style="width: 15%" class="tw:inline-block ps-1">
                        <button style="" class="btn btn-dark-piketplace" @click="loadData" ><i class="fa fa-search"></i></button>
                    </div>
                </div>
                
                <div class="mt-2" v-if="withdrawal_requests.length>0">
                    <div class="content" style="background-color: lightgray;margin: 4px;padding: 10px 5px;border-radius: 5px;min-height: 500px;">
                        <h5 style="font-weight: 100;">{{$t('message.withdrawal.withdrawal_history')}}</h5>
                        <div v-for="(withdraw, index) in withdrawal_requests">
                            <div class="vcard-field line-height-l pb-1" style="background-color: #fff;padding-left: 5px;">
                                <strong>{{$filters.formatDate(withdraw.created_at, $i18n.locale)}}</strong>|
                                <a>{{withdraw.real_amount}} {{$currency}} </a>&bull;<span v-if="withdraw.confirmed_at" class="color-green-dark"> {{$t('message.confirmed_at', {'date': $filters.formatDate(withdraw.confirmed_at, $i18n.locale)})}}</span><span v-else> {{$t('message.status.pending')}}</span>&nbsp;|&nbsp;@{{withdraw.wallet.user.username}}&nbsp;|&nbsp;{{withdraw.public_key}}
                                <button v-if="withdraw.confirmed_at===null" class="btn bg-green-dark" @click="confirmation(withdraw, index)">{{$t('message.confirm')}}</button>
                                <button v-else class="btn bg-gray-dark" @click="confirmation(withdraw, index, 'cancel')">Annuler confirmation</button>
                                <button v-if="withdraw.confirmed_at===null" class="btn bg-red-dark ms-1" @click="choose_cancellation_reasons(withdraw)">Rejeter</button>
                                <i class="fa fa-info" @click="$router.push('/wallet-balance-details/'+withdraw.wallet.user.username)"></i>
                            </div>
                        </div>
                    </div>
                    <div v-observe-visibility="handleScrolledToBottom" class="text-center" style="">
                        <img style="width: 70px;" v-if="isLoadingMore" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">
                        <div v-if="no_more_data" class="font-13 btn-l font-600 mt-3 rounded-sm" style="text-align: center;">
                            {{$t('message.no_more_data')}}
                        </div>
                    </div>
                </div>
                <div v-else-if="isLoading" style="text-align: center;">
                    <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
                </div>
                <div v-else style="text-align: center;">
                    <strong>Aucun retrait en attente</strong>
                </div>
            </div>
        </div>
        <div v-else-if="!isLoading && !isLoggedIn">
            <div style="width: 100%;text-align: center;">
                <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in')}}
                </button>
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
          //user: null,
          data: null,
          withdrawal_requests: [],
          withdrawal_reasons: [],
          isLoading: false,
          isLoadingMore: false,
          no_more_data: false,
          selected_withdraw: null,
          status: '',
          search: '',
          current_page: 1,
          last_page: 0,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'disconnecting', 'saving', 'deleting']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('mounting')
            //////////////////////////////////////////////
            //document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
            //this.$hide_modal.hide_modal('menu-share-thumbs');
            console.log('mounting A')
            $('.link').on('click', function() {
                if (!$(this).hasClass('active-nav')) {
                    $('.link').removeClass('active-nav')
                    $(this).addClass('active-nav')
                    $('#preloader').removeClass('preloader-hide')
                }
                //$('#preloader').removeClass('preloader-hide')
                //$('#preloader').addClass('preloader-hide')
            });
            this.isLoading = true
            this.error = ''
            //this.getWithdrawals();
            this.status = "pending"
            $( document ).ready(function() {
                $('#preloader').addClass('preloader-hide')
                $('.link').removeClass('active-nav');
            });
            window.scrollTo({ top: 0, behavior: `${'smooth'}` });
        },
        watch: {
            status(newVal, oldVal){
                this.loadData()
            }
        },
        methods: {
            ...mapActions(useStore, ['login']),
            reload(){
                this.getWithdrawals();
            },
            async getWithdrawals() {
                let search = this.search
                let status = this.status
                let page = this.current_page
                await axios.get('/get-admin-withdrawals', {params: {page, search, status}})
                .then(res => {
                    console.log('Admin getWithdrawals res', res.data)
                    this.isLoading = false
                    this.isLoadingMore = false
                    this.last_page = res.data.withdrawal_requests.last_page
                    let newData = res.data.withdrawal_requests.data
                    if (newData.length == 0) {
                        this.no_more_data = true
                    }
                    this.withdrawal_requests.push(...newData);
                    if (res.data.withdrawal_reasons) {
                        this.withdrawal_reasons = res.data.withdrawal_reasons;
                    }
                    //console.log(this.data);
                })
                .catch(err => {
                    this.isLoadingMore = false
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            confirmation(withdraw, index, type) {
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            this.withdrawal_validation(withdraw, index, type)
                        }
                      }
                    }
                )
            },
            async withdrawal_validation(withdraw, index, type="") {
                let user_id = this.user.id;
                let data = {
                    status: "confirmation",
                    withdraw_id: withdraw.id
                }
                if (type=="cancel") {
                    data.status = "confirmation_cancel"
                }
                this.saving = true
                await axios.post('/withdrawal-validation', data)
                .then(res => {
                    console.log('withdrawal_validation res', res.data)
                    this.saving = false
                    if (res.data.status) {
                        this.withdrawal_requests.splice(index, 1);
                        this.$forceUpdate()
                        this.$functions.msg_box(this, 'info', 'Info', this.$t("message.saved"))
                    }else{
                        this.$functions.msg_box(this, 'error', 'Info', this.$t("message.an_error_occured"))
                    }
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', 'Info', this.$t("message.an_error_occured"))
                    this.not_found = true;
                })
            },
            choose_cancellation_reasons(withdraw) {
                this.selected_withdraw = withdraw
                this.$show_modal.show_modal({id: "reason_withdrawals"})
            },
            continue_cancellation() {
                let user_id = this.user.id;
                ////////////////////////////////////////////////////
                let reasons = this.withdrawal_reasons[this.$i18n.locale]
                let selected_reasons = []
                reasons.forEach(val=>{
                    if (val.selected) {
                        selected_reasons.push(val.code)
                    }
                })
                if (selected_reasons.length == 0) {
                    return
                }
                ////////////////////////////////////////////////////
                let data = {
                    status: "cancellation",
                    reasons: selected_reasons,
                    withdraw_id: this.selected_withdraw.id
                }
                this.saving = true
                this.$hide_modal.hide_modal("reason_withdrawals")
                axios.post('/withdrawal-validation', data)
                .then(res => {
                    console.log('getBalance res', res.data)
                    this.saving = false
                    if (res.data.status === true) {
                        let index = this.withdrawal_requests.indexOf(this.selected_withdraw)
                        this.withdrawal_requests.splice(index, 1);
                        //this.withdrawal_requests = res.data.withdrawal_requests
                        this.$forceUpdate()
                        this.$functions.msg_box(this, 'info', 'Info', this.$t("message.saved"))
                    }else{
                        this.$functions.msg_box(this, 'error', 'Info', this.$t("message.an_error_occured"))
                    }
                    console.log(this.data);
                    //console.log(this.order.created_at);
                })
                .catch(err => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', 'Info', this.$t("message.an_error_occured"))
                    this.not_found = true;
                })
            },
            loadData(){
                this.page = 1
                this.isLoading = true
                this.no_more_data = false
                this.withdrawal_requests = []
                this.getWithdrawals()
            },
            handleScrolledToBottom(isVisible){
                if (!isVisible) {return}
                if (this.current_page >= this.last_page) {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                    this.no_more_data = true;
                    return;
                }
                this.isLoadingMore = true
                this.current_page++
                this.getWithdrawals();
            }
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
