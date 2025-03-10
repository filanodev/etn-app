<template>
    <div class="page-content app-background-color" style="">
        <Header ref="header" pageTitle="message.balance.qr_code_scanning" :hide_settings_icon="true"/>
        <div style="padding-top: 30px;padding-bottom: 20px;background-color: #fff;">
            <h3 style="text-align: center;" class="app-color">Scan QR code</h3>
        </div>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue3-qrcode-reader'

    export default{
        components: {
            QrcodeStream,
            QrcodeDropZone,
            QrcodeCapture
        },
        props: {
            product: {
                type: Object,
                defaut: null,
            }
        },
        data: function () {
        return {
          prevRoute: null,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving', 'maintenance_mode', 'connecting', 'disconnecting', 'countries_db', 'agreements', 'delivery_penalties_limit', 'isPiBrowser']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.$functions.scrollToTop()
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                
            },
        },
        methods: {
            onDecode (decodedString) {
                //alert(decodedString)
                //let data = JSON.parse(decodedString)
                let tab = decodedString.split('|@')
                let app_id = tab[0]
                let username = tab[1]
                if (app_id == "piketplace_2024-qr-code-scanner") {
                    //alert(data.username)
                    this.$router.push(`/transfer-form/${username}`)
                }
                console.log("decodedString", decodedString)
            }
        }
    }
</script>

<style scoped>
</style>
