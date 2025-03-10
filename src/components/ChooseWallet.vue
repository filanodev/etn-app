<template>
	<div id="choose-wallet" class="menu menu-box-bottom rounded-m" data-menu-height="250" data-menu-effect="menu-over" style="display: block; height: 200px;">
        <div class="menu-title">
            <h3 style="margin: 15px;">{{$t('message.pay_with')}}</h3>
            <a href="#" class="close-menu"><i class="fa fa-times-circle"></i></a>
        </div>
        <div class="content">
            <a @click="pay_piketplace_wallet" class="btn btn-l font-14 shadow-l btn-full rounded-s font-600 btn-dark-piketplace text-start mb-2">
                <i class="fa fa-wallet font-14 me-1"></i>
                <!-- <span class="ms-n2">{{$t('message.piketplace_wallet')}}</span> -->
                <span class="ms-n2 tw:align-top">Piket wallet</span>
            </a>
            <a @click="pay_pi_network_wallet" class="btn btn-l font-14 shadow-l btn-full rounded-s font-600 btn-pinetwork text-start mb-2">
                <i class="fa fa-wallet font-14 me-1"></i>
                <!-- <span class="ms-n2 tw:align-top">{{$t('message.pinetwork_wallet')}}</span> -->
                <span class="ms-n2 tw:align-top">PiNetwork Wallet</span>
            </a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        data: function () {
	        return {
	        	form: {
	        		amount: "",
	        	},
                user: {}
	        }
        },
        mounted() {
            
        },
        methods: {
        	pay_piketplace_wallet(){
                this.$confirm({
                  auth: true,
                  message: '<span class="font-900 font-16">'+this.$t('message.put_your_code_pin')+'</span><br><br>'+this.$t('message.create_your_code_pin')+'<i class="fa fa-hand-point-right me-1 ms-1"></i><a class="" style="color: darkblue" href="'+this.piket_wallet_frontend_url+'" target="_blank">Piket Wallet</a><br><br>',
                  button: {
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.confirmation.no_cancel')
                  },
                  /**
                   * Callback Function
                   * @param {Boolean} confirm
                   * @param {String} password
                   */
                  callback: (confirm, password) => {
                    if (confirm && password) {
                        //alert('transfer start')
                        this.$hide_modal.hide_modal('choose-wallet')
                        this.$emit('payPiketplace', password)
                    }
                  }
                })
            },
            pay_pi_network_wallet(){
                this.$hide_modal.hide_modal('choose-wallet')
                this.$emit('payPinetwork')
            },
        }
    }
</script>