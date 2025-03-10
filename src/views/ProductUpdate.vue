<template>
    <Publish v-if="product" :product="product" />
    <div v-if="isLoading" style="text-align: center;">
        <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
    </div>
    <div v-if="!isLoggedIn && !isLoading" class="loader-background" style="">
        <div style="width: 100%;text-align: center;padding-top: 100px;">
            <button @click="isLoading=true;login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                {{$t('message.log_in_first')}}
            </button>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { v4 as uuidv4 } from 'uuid';

    import Publish from "./Publish.vue";

    /*import file_countries from "../Countries-States-Cities/countries.json";
    import file_states from "../Countries-States-Cities/states.json";
    import file_cities from "../Countries-States-Cities/cities.json";*/

    export default{
        components: {
            Publish,
        },
        data: () => ({
            product: null,
        }),
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'connecting', 'disconnecting', 'maintenance_mode', 'selected_category']),
      },
      beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.id = this.$route.params.id;
            this.$functions.scrollToTop()
            this.loadProduct();
        },
        methods: {
            ...mapActions(useStore, ['login']),
            async loadProduct() {
                let id = this.id
                this.isLoading = true
                await axios.get('/products/' + id)
                .then(res => {
                    this.isLoading = false
                    console.log("hnnnnnnn ", res.data)
                    this.product = res.data.product;
                })
                .catch(err => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
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

/* ✨ The magic ✨ */
form.errors {
  :invalid {
    border-color: red;
  }
  .error-message {
    display: block;
  }
}

.ios-input:checked ~ .custom-control-label::before {
  background-color: #8cc152 !important;
}
</style>
