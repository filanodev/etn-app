<template>
    <span class="font-sans">{{ $functions.thousandSeprator(Math.floor($functions.scientific_annotation_to_decimal(amount/diviseur)))}}<span v-if="type==''">{{$currency}}</span><span v-if="$functions.scientific_annotation_to_decimal(amount/diviseur).toString().split('.').length>1">{{$t('message.balance.decimal_separator')}}</span><sup v-if="$functions.scientific_annotation_to_decimal(amount/diviseur).toString().split('.').length>1">{{$functions.scientific_annotation_to_decimal(amount/diviseur).split('.')[1]}}</sup><span v-if="type=='piket'">Piket</span><span v-if="type=='percentage'">%</span></span>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        props:{
            amount: {
                type: Number,
                default () {
                    return 0
                }
            },
            type: {
                type: String,
                default () {
                    return ""
                }
            },
        },
        data: function () {
            return {
                //diviseur: 10000000,
                diviseur: 1,
            }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving', 'connecting', 'disconnecting', 'isLoading', 'deleting', 'searching']),
        },
        mounted() {
            //console.log(this.user)
        },
        methods: {
        }
    }

    
</script>

<style scoped>
    
</style>
