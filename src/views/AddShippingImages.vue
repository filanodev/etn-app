<template>
    <div>
        <Header ref="header" pageTitle="message.add_shipping_images" :hide_settings_icon="true"/>
        <div v-show="!isLoading" class="page-content" style="margin-top: -10px;">
            <div class="" style="margin: auto 20px;">
                <DropFile :files="existingFiles" :files_uploaded_response="images" @files-uploaded="getFilesEmitted" type="shipping_images" style="background-color: #eef2f1;border:none" />
            </div>
            <div style="width: 100%;text-align: center;padding-top: 0px;">
                <a @click="goBack" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace-outline" style="min-width: 100px;margin: 5px;">
                    {{$t('message.go_back')}}
                </a>
                <button :disabled="!uploadDone" @click="save" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: 5px;">
                    {{$t('message.profilForm.save')}}
                </button>
            </div>
        </div>
        <div v-if="isLoading" style="text-align: center;">
            <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
        </div>
        <div v-if="!isLoggedIn" class="loader-background" style="">
            <div style="width: 100%;text-align: center;padding-top: 100px;">
                <button @click="isLoading=true;login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                    {{$t('message.log_in_first')}}
                </button>
            </div>
        </div>
        <!-- <div v-if="saving || connecting || disconnecting" class="loader-background" style="">
            <div style="text-align: center;width: 100%;margin-top: 150px;">
                <img src="/site_images/transparent-gif/loading3.gif" style="width: 75px;margin-top: 20px;border-radius: 10%;">
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    //import UseDropzoneDemo from '../components/UseDropzoneDemo.vue'
    //import { Dropzone } from "dropzone";
    //import VueLoadingButton from "vue-loading-button";
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { v4 as uuidv4 } from 'uuid';

    import DropFile from "../components/DropFile.vue";
    import SelectCountry from '../components/SelectCountry.vue'

    /*import file_countries from "../Countries-States-Cities/countries.json";
    import file_states from "../Countries-States-Cities/states.json";
    import file_cities from "../Countries-States-Cities/cities.json";*/

    export default{
        components: {
            DropFile, SelectCountry
        },
        props: {
            product: {
                type: Object,
                defaut: null,
            }
        },
        data: function () {
        return {
          images: [],
          errors: [],
          errors_obj: {},
          existingFiles: [],
          seleteced_tmp: '',
          type: '',
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'connecting', 'saving', 'maintenance_mode', 'uploadDone', 'line_order']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            console.log('prevRoute', this.prevRoute)
            this.uploadDone = true
            this.type = this.$route.params.type;
            
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.files_uploaded = [];
            if (this.line_order.shipping_images != null && this.line_order.shipping_images[this.type]) {
                this.line_order.shipping_images[this.type].forEach((val, index)=>{
                    console.log('this.product.images.forEac', val, index)
                    this.existingFiles.push(new File([""], val.lien))
                    this.images.push(val.lien)
                })
            }
            this.$functions.scrollToTop()
        },
        methods: {
            ...mapActions(useStore, ['login']),
            save() {
                if (this.images.length == 0) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.publishForm.choose_at_least_one_image'))
                    return;
                }
                console.log('drssfs', this.line_order)
                this.saving = true;
                let data = {
                    user_id: this.user.id,
                    line_order_id: this.line_order.id,
                    images: this.images,
                    type: this.type,
                }
                axios.post('/save-shipping-images', data, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    /*console.log(res.data.errors)
                    console.log(this.$t(res.data.errors[0]))*/
                    this.saving = false;
                    if (res.data.status) {
                        this.line_order = res.data.line_order
                        let msg = this.$t('message.saved')
                        this.$functions.msg_box(this, 'success', this.$t('message.info'), msg, this.prevRoute.path)
                    }else {
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            getFilesEmitted(data) {
                console.log("getFilesEmitted", data, Object.values(data))
                this.images = data
                console.log("this.images", this.images)
                let index = this.errors.indexOf('required-image')
                this.errors.splice(index, 1)
            },
            goBack() {
                // Go back one step in the browser history
                this.$router.back();
                //this.$router.go(-1);
                //alert('rf')
            }
        }
    }
</script>

<style scoped>
    #dropzone{
        border-radius: 10px;
        border-width: 1px;
        display: block;
        width: 900px;
        height: 50px;
    }


    .error-message {
      display: none;
      color: red;
    }
    .border-error{
        border: 1px solid red!important;
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
