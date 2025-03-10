<template>
	<div id="add-stock" class="menu menu-box-bottom rounded-m" data-menu-height="250" data-menu-effect="menu-over" style="height: 250px;">
		<div class="menu-title">
			<!-- <p class="color-piketplace">{{$t('message.comment.comment_text')}}</p> -->
			<h1 class="font-24">{{$t('message.add_stock')}}</h1>
			<a  @click="$hide_modal.all()">
                <i class="fa fa-times-circle color-red-dark"></i>
            </a>
		</div>
		<form class="content mt-0 mb-0">
			<div class="input-style no-borders has-icon validate-field mb-4">
				<input type="text" inputmode="number" class="form-control validate-name" id="form1ab" :placeholder="$t('message.publishForm.instock')" v-model="quantity" pattern="[a-zA-Z]*" required>
				<input type="hidden" id="products_id">
				<label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.publishForm.instock')}}</label>
			</div>
			<button :disabled="isLoading" @click.prevent="addStock" type="submit" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.add')}}</button>
		</form>
	</div>
</template>

<script>
    import axios from 'axios';

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
        data: function () {
	        return {
	        	quantity: "",
                //user: null,
                isLoading: false,
	        }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'product', 'saving']),
        },
        mounted() {
            //this.user = this.$session.get('user');
        },
        methods: {
        	addStock() {
                if (this.quantity == "" || parseInt(this.quantity)==0) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.publishFormValidation.quantity_required"))
                    return
                }
                this.$emit('add_stock_send_request', this.quantity)
                this.reset()
            },
            reset(){
            	this.quantity = "";
            },
        },
        watch: {
            quantity(newVal, oldVal){
                 // Remove any non-numeric characters except the dot
                this.quantity = this.quantity.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.quantity.match(/\./g);
                if (dots && dots.length > 1) {
                    this.quantity = this.quantity.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let quantityTab = newVal.toString().split('.')
                if (quantityTab[1] && quantityTab[1].length>7) {
                    this.quantity = oldVal
                }
            },
        }
    }
</script>