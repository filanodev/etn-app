<template>
	<div>
        <div v-for="i in 5" style="width: 18%;display: inline-block;margin: 2px;">
            <div style="background-color: #eee;height: 50px;border-radius: 10px;border: 2px solid #eee;">
                <img v-if="i==index_show && product" :src="product.imageFirst" style="width: 100%;height: 100%;object-fit: cover;border-radius: 10%;">
            </div>
            <div v-if="position<=5" style="text-align: center;">
                {{i}}
            </div>
            <div v-else style="text-align: center;">
                {{i==1?i:(i==index_show?position:'...')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        props: {
            product: {
                type: Object,
                default: {}
            },
            position: {
                type: Number,
                default () {
                    return 1
                }
            },
        },
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
        computed: {
            index_show(){
                return this.position<=5?this.position:3
            }
        },
        methods: {
        	pay_piketplace_wallet(){
                this.$emit('payPiketplace')
            },
            pay_pi_network_wallet(){
                this.$emit('payPinetwork')
            },
        }
    }
</script>