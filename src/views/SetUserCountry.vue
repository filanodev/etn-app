<template>
    <div class="page-content" style="text-align: center;">
        <Header ref="header" pageTitle="" :hide_settings_icon="true"/>
        <h3 class="color-piketplace" style="text-align: center;margin: 30px auto">{{$t('message.which_country_you_from')}}</h3>
        <div @click="$show_modal.show_modal({id: 'select-country'})" style="background-color: #e9ecef;padding: 5px;border-radius: 10px;display: inline-block;width: 80%;margin: 20px auto;text-align: center;">
            <label v-if="user_country!=null" class="color-piketplace" style="margin-left: 2px;">{{ user_country.translations[locale]?user_country.translations[locale]:user_country.name }}</label>
            <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country') }}</label>
            <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
            
        </div>
        <div style="text-align: center;">
            <button @click="save()" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                {{$t('message.profilForm.save')}}
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default{
      components: {
      },
      data: function () {
        return {
          isLoading: false,
        }
      },
      computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'maintenance_mode', 'selected_country', 'user_country', 'saving', 'show_all_label', 'filter']),
    },
      created () {
            //this.verifyIfPaymentDone();
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
            this.show_all_label = false
            if (this.locale == '') {
                this.$show_modal.show_modal({id: 'menu-language'})
            }
            this.$functions.scrollToTop();
        },
        watch: {
            selected_country(newVal, oldVal){
                this.user_country = newVal
                console.log(newVal, this.locale)
                //this.setUserCountry(newVal)
            }
        },
        methods: {
            ...mapActions(useStore, ['login', 'setUserCountry', 'setFilter']),
            save(){
                this.filter.iso2 = this.user_country.iso2
                this.filter.iso3 = this.user_country.iso3
                this.filter.is_updated = true
                if (this.isLoggedIn===false) {
                    this.setUserCountry(this.user_country)
                    this.setFilter(this.filter)
                    this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.saved"), '/')
                    return;
                }
                this.saving = true
                //ALTER TABLE `pi_users` ADD `user_country` LONGTEXT NULL AFTER `addresses`; 
                axios.post(`/save-user-country`, {country: this.user_country})
                .then(res => {
                    this.saving = false
                    console.log(res.data)
                    if (res.data.status === true) {
                        this.setUserCountry(this.user_country)
                        this.setFilter(this.filter)
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.saved"), '/')
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                });
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
b