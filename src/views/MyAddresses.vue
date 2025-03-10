<template>
    <div>
        <Header ref="header" pageTitle="message.side_menu.my_addresses" :hide_settings_icon="true"/>
        <div id="new-address" class="menu menu-box-bottom rounded-m" data-menu-height="495" data-menu-effect="menu-over" style="display: block;background-color: rgba(255,255,255,.9);">
            <div class="menu-title">
                <p class="color-piketplace">{{$t('message.address.new_address')}}</p>
                <h1 class="font-24">{{$t('message.address.address')}}</h1>
                <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
            </div>
            <form class="content mt-0 mb-0">
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-name" :placeholder="$t('message.address.name')" v-model="form.name" v-on:input="hide_error_field('name')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.name')}}</label>
                </div>
                <div class="no-borders has-icon validate-field mb-4" style="padding-left: 25px;">
                    <label @click="call_country_select" class="color-gray font-11 font-500">{{country_city!=''?country_city:$t('message.select_country')}}</label>
                    <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                </div>
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-address" :placeholder="$t('message.address.street_address')" v-model="form.address" v-on:input="hide_error_field('address')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.street_address')}}</label>
                </div>
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="text" class="form-control validate-name" id="required-phone_number" :placeholder="$t('message.address.phone_number')" v-model="form.phone_number" v-on:input="hide_error_field('phone_number')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.address.phone_number')}}</label>
                </div>
                <div class="input-style no-borders has-icon validate-field mb-4">
                    <input type="email" class="form-control validate-name" id="required-email" :placeholder="$t('message.profilForm.email')" v-model="form.email" v-on:input="hide_error_field('email')">
                    <label for="form1ab" class="color-piketplace font-11 font-500">{{$t('message.profilForm.email')}}</label>
                </div>
                <div class="no-borders has-icon validate-field mb-4">
                    <SwitchButton id="as_default" label_color="#5b5757" label_font="font-300" :label="$t('message.set_as_default')" v-model:checked="form.is_default" style="padding-left: 10px;margin-top: 4px;"/>
                </div>
                <button @click.prevent="save_address" class="btn btn-full btn-m shadow-l rounded-s btn-dark-piketplace font-600 top-20">{{$t('message.add')}}</button>
            </form>
        </div>
        <div id="select-address-country" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 365px;">
            <div class="content" id="tab-group-3">
                <div class="tab-controls tabs-small tabs-rounded" data-highlight="bg-green-dark">
                    <a class="no-effect" @click="country_tab_active=true">
                        {{$t('message.select_country')}}
                        <span v-if="country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                    <a class="no-effect no-click">
                        {{$t('message.select_city')}}
                        <span v-if="!country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                </div>
            </div>
            <div v-if="country_tab_active" class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a v-for="country in countries" :key="country.id" @click="select_country(country.iso2)">
                      
                      <span>{{country.name}}</span>
                      <i v-html="$functions.isoToEmoji(country.iso2)" style="line-height: 34px;opacity: 1;"></i>
                    </a>
                </div>
                <div class="clear"></div>
            </div>
            <div v-else class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword_city" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="cities.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a class="close-menu" v-for="city in cities" :key="city.id" v-on:click="select_city(city.name)">
                      
                      <span>{{city.name}}</span>
                      <i class="fa fa-check-circle"></i>
                    </a>
                </div>
                <div v-else-if="isLoadingCities" style="text-align: center;">
                    <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">
                </div>
                <div v-else-if="cities.length == 0" style="text-align: center;">
                    <div class="no_more_data" style="">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="page-content font-sans" style="margin-top: 64px;">
            <Adsense v-if="activate_google_ads"
            data-ad-client="ca-pub-3962442438023665"
            data-ad-slot="3809835226" data-full-width-responsive="true">
            </Adsense>
            <div v-if="isLoggedIn && !isLoading" class="card card-style" style="min-height: 500px;">
                <button @click="$show_modal.show_modal({id: 'new-address'})" class="font-900 app-background-color" style="background-image: linear-gradient(to bottom,#ec11b5 0,#812a6b 100%)!important;color: #fff;border-radius: 50%;width: 30px;height: 30px;margin: 10px auto;">
                    <i class="fa fa-plus" style="opacity: 1; color: #fff;"></i>
                </button>
                <div class="content mt-3 mb-0" v-if="addresses && addresses.length > 0">
                    <div class="me-4 ms-3 mt-2">
                        <div class="list-group list-custom-small">
                            <a class="mt-2" v-for="(address, index) in [...addresses].reverse()" style="border-bottom: solid 1px rgba(0, 0, 0, 0.2);">
                              <div class="tw:inline-block mb-2" style="line-height: 18px;">
                                  <div v-if="address.country_name && address.city">
                                      <span>{{address.city}}-{{address.country_name}}</span>
                                  </div>
                                  <div v-if="address.address">
                                      <span>{{address.address}}</span>
                                  </div>
                                  <div v-if="address.phone_number">
                                      <span>{{address.phone_number}}</span>
                                  </div>
                                  <div v-if="address.email">
                                      <span>{{address.email}}</span>
                                  </div>
                                  <div>
                                      <span @click="setAddressAsDefaultConfirmation(index)" v-if="address.is_default===undefined || address.is_default==false" class="btn btn-dark-piketplace font-12" style="margin-right: 10px;opacity: 1;line-height: 18px;">{{$t('message.set_as_default')}}</span>
                                      <span v-else class="color-piketplace font-12" style="margin-right: 10px;opacity: 1;line-height: 18px;">{{$t('message.default_address')}}</span>
                                  </div>
                              </div>
                              <i @click="deleteConf(index)" class="fas fa-trash color-piketplace m-auto font-14" style="float: right;opacity: 1;"></i>
                            </a>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div v-else class="m-auto">
                    {{$t('message.empty')}}
                </div>
            </div>
            <div v-else-if="!isLoggedIn">
                <div style="width: 100%;text-align: center;margin-top: 20px">
                    <button @click="login({confirm: $confirm, self: this})" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;margin: auto;">
                        {{$t('message.log_in')}}
                    </button>
                </div>
            </div>
            <div v-else-if="isLoading" style="text-align: center;">
                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">{{$t('message.loading')}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    import SwitchButton from '../components/SwitchButton.vue'

    export default {
        components: {
            SwitchButton,
        },
        data: () => ({
            isLoading: false,
            form: {
                name: "",
                country_code: "",
                country_name: "",
                city: "",
                address: "",
                phone_number: "",
                is_default: false
            },
            countries: [],
            cities: [],
            country_city: "",
            country_tab_active: true,
            keyword: "",
            keyword_city: "",
            addresses: [],
        }),
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'maintenance_mode', 'deleting', 'saving', 'countries_db', 'country_cities', 'isLoadingCities', 'activate_google_ads']),
        },
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        mounted() {
            this.countries = this.countries_db
            this.$hide_modal.all();
            this.$functions.scrollToTop();
            if (this.maintenance_mode) {
                this.$router.push({ name: 'maintenance'})
            }
            this.my_addresses()
        },
        methods: {
            ...mapActions(useStore, ['login', 'getCities']),
            select_country(code){
                let index = this.countries_db.findIndex(el => el.iso2 === code);
                let country = this.countries_db[index]
                this.form.country_code = code;
                this.form.country_name = country.name;
                this.country_tab_active = false;
                this.country_cities = []
                this.getCities({code:code, self:this})
                this.form.city = ''
                this.keyword_city = ""
            },
            select_city(city){
                this.form.city = city
                this.country_city = this.form.country_name+", "+city
                this.$hide_modal.hide_modal('select-address-country');
                //this.$show_modal.show_modal('new-address');
                document.getElementById('new-address').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            call_country_select(){
                this.country_tab_active = true;
                this.$hide_modal.hide_modal('new-address');
                //this.$show_modal.show_modal('select-address-country');
                document.getElementById('select-address-country').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            hide_error_field(id){
                $('#required-'+id).removeClass('red-placeholder');
                $('#required-'+id).attr('placeholder', this.$t('message.address.'+id));
            },
            my_addresses(){
                this.isLoading = true
                axios.get(`/get-my-addresses`)
                .then(res => {
                    this.isLoading = false
                    console.log("get-my-addresses", res.data);
                    this.addresses = res.data.addresses
                })
                .catch(error => {
                    this.isLoading = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                });
            },
            save_address(){
                if (this.form.country_name=="" || this.form.city=="" || this.form.address=="" || this.form.phone_number=="" || this.form.email=="") {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.fill_all_fields'))
                    return;
                }
                this.$hide_modal.hide_modal('new-address');
                this.saving = true
                axios.post(`/save-address`, {address: this.form})
                .then(res => {
                    
                    this.saving = false
                    console.log("after delete", res.data);
                    if (res.data.status === true) {
                        this.addresses = res.data.addresses
                        this.form = {
                            name: "",
                            country_code: "",
                            country_name: "",
                            city: "",
                            address: "",
                            phone_number: "",
                            is_default: false,
                        }
                        this.country_city = ""
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.saved"))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                });
            },
            deleteConf(index){
                index = this.addresses.length-index-1
                //alert(index)
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
                          this.deleteAddress(index)
                        }
                      }
                    }
                )
            },
            deleteAddress(index) {
                this.deleting = true
                axios.post(`/delete-address`, {index: index})
                .then(res => {
                    this.deleting = false
                    console.log("after delete", res.data);
                    if (res.data.status === true) {
                        this.addresses = res.data.addresses
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.deleted_successfull"))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.deleting = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                });
            },
            setAddressAsDefaultConfirmation(index){
                index = this.addresses.length-index-1
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: this.$t('message.set_as_default'),
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
                          this.setAddressAsDefault(index)
                        }
                      }
                    }
                )
            },
            setAddressAsDefault(index) {
                this.saving = true
                axios.post(`/set-address-as-default`, {index: index})
                .then(res => {
                    this.saving = false
                    console.log("after set-address-as-default", res.data);
                    if (res.data.status === true) {
                        this.addresses = res.data.addresses
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.saved"))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.an_error_occured'))
                });
            },
            newCountryLoading() {
                this.countries = this.countries_db
                this.countries.forEach((val, index) => {
                    let nm = val.translations[this.locale]
                    val.name = nm==undefined?val.translations.en:nm
                    val.sortname = this.$functions.removeAccentCharacter(val.name.toLowerCase())
                })
                this.countries.sort((a, b) => {
                  var nameA = a.sortname.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.sortname.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  // names must be equal
                  return 0;
                });
                if (this.keyword && this.keyword != '') {
                    this.countries=this.countries.filter((val) => {
                        return val.sortname.toUpperCase().includes(this.keyword.toUpperCase()) || val.iso2.toUpperCase().includes(this.keyword.trim().toUpperCase()) || val.iso3.toUpperCase().includes(this.keyword.trim().toUpperCase())
                    })
                }
            },
            search_city(){
                this.cities = this.country_cities
                this.cities = this.cities.filter(el => {
                    let name = el.name.toLowerCase()
                    name = this.$functions.removeAccentCharacter(name)

                    let search = this.keyword_city.toLowerCase()
                    search = this.$functions.removeAccentCharacter(search)
                    return name.includes(search)
                });
            },
        },
        watch: {
            isLoggedIn(newVal, oldVal){
                
            },
            country_cities(n, o){
                this.cities = this.country_cities
            },
            keyword(after, before) {
                this.newCountryLoading()
            },
            keyword_city(after, before) {
                this.search_city();
            },
        }
    }
</script>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .no_more_data{
        /*display: none;*/
        margin: 10px;
        padding: 10px;
        text-align: center;
        color: #f0f0f0;
        background-color: #fff;
        border-radius: 10px;
    }
</style>