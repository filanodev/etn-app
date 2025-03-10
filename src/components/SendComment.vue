<template>
	<div id="send-comment" class="menu menu-box-bottom rounded-m" data-menu-height="250" data-menu-effect="menu-over" style="height: 250px;">
		<div class="menu-title">
			<p class="color-piketplace">{{$t('message.comment.comment_text')}}</p>
			<h1 class="font-24">{{$t('message.comment.comment')}}</h1>
			<a  @click="$hide_modal.all()">
                <i class="fa fa-times-circle color-red-dark"></i>
            </a>
		</div>
		<form class="content mt-0 mb-0">
			<div class="input-style no-borders has-icon validate-field mb-4">
				<i class="fa fa-comment"></i>
				<input type="text" class="form-control validate-name" id="form1ab" :placeholder="$t('message.comment.your_comment')" v-model="form.comment" pattern="[a-zA-Z]*" required>
				<input type="hidden" id="products_id">
				<label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.comment.your_comment')}}</label>
			</div>
			<button :disabled="isLoading" @click.prevent="store" type="submit" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.send')}}</button>
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
	        	form: {
	        		comment: "",
	        		products_id: "",
	        	},
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
            test(){
                alert('drfsfs')
            },
        	store() {
                if (!this.isLoggedIn) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t("message.log_in_first"))
                    return
                }
                if (this.$functions.containsNumber(this.form.comment)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t("message.comment.comment_no_contains_number"))
                    return
                }
                /*
                    myString = myString.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/,"");
                */
                if(this.form.comment.search(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+)/) !== -1){
                    //console.log("There is an email !");
                    // Remove it...
                    this.form.comment = this.form.comment.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+)/,"");
                    //console.log(this.form.comment); // Hello, my email is
                    return
                }
                this.form.comment = this.$functions.removeGCVWords(this.form.comment)
                //alert(this.form.comment)
                //return
                //$('#preloader').removeClass('preloader-hide')
                this.saving = true;
                
                this.form.products_id = this.product.id;
                this.form.pi_users_id = this.user.id;
                if (this.form.products_id == "" || this.form.comment == '') {
                    this.saving = false;
                    return;
                }
                axios.post('/comments', this.form, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    this.saving = false;
                    if (res.data.status === true) {
                    	this.product_comments = res.data.comments;
                        this.product = res.data.product;
                        console.log('res.data.comments', res.data.comments)
                        this.reset();
                        this.$hide_modal.hide_modal('send-comment');
                        this.$functions.msg_box(this, 'success', '', this.$t('message.commented_successfully'))
                    } else if(res.data.message && res.data.message == "product_not_validated") {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.cannot_comment_unvalidated_product'))
                    } else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            reset(){
            	this.form.comment = "";
            },
        }
    }
</script>