<template>
  <div>
    <div id="select-country" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 390px;">
        <div class="menu-title">
            <h1 class="font-24 color-piketplace">{{ $t('message.select_country') }}</h1>
            <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
        </div>
        <div class="me-4 ms-3 mt-1">
            <div class="">
                <input type="text" :placeholder="$t('message.search_country')" v-model="global_country_search" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
            </div>
            <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 300px;margin-bottom: 26px;">
                <a v-if="show_all_label" @click="select_country('all')">
                    <strong>{{$t('message.show_all')}} *</strong>
                    <i style="line-height: 34px;opacity: 1;">
                        <img class="tw:inline" src="/site_images/svg/globe.svg" style="width: 13px;height: 13px;margin-right: 0">
                    </i>
                </a>
                <a class="close-menull" v-for="country in countries" :key="country.id" @click="select_country(country.iso2)">
                  <span>{{country.name}}</span>
                  <i v-html="$functions.isoToEmoji(country.iso2)" style="line-height: 34px;opacity: 1;"></i>
                </a>
            </div>
            <div class="clear"></div>
        </div>
        <input type="hidden" id="caller_id" name="">
    </div>
    <div id="select-city" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 390px;">
        <div class="menu-title">
            <h1 class="font-24 color-piketplace">{{ $t('message.select_city') }}</h1>
            <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
        </div>
        
        <div class="me-4 ms-3 mt-2">
            <div class="">
                <input type="text"  v-model="keyword_city" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
            </div>
            <div class="list-group list-custom-small" v-if="cities.length > 0" style="overflow-y: scroll;height: 300px;">
                <a v-for="city in cities" :key="city.id" v-on:click="select_city(city.name)">
                  
                  <!-- <span>{{country.name}}</span> -->
                  <span>{{city.name}}</span>
                  <!-- <i class="fa fa-check-circle"></i> -->
                </a>
            </div>
            <div v-if="isLoadingCities" style="text-align: center;">
                <img style="width: 70px;margin-left: 20px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">
            </div>
            <div class="clear"></div>
        </div>
        <input type="hidden" id="caller_idl" name="">
    </div>
  </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    //import countries from '../locales/countries.json'

export default {
    props:{
    },
    data() {
        return {
            keyword_city: null,
            cities: [],
            code: '',
            countries: [],
        };
    },
    computed: {
        ...mapWritableState(useStore, ['pageTitle', 'user', 'countries_db', 'isLoggedIn', 'locale', 'country_cities', 'isLoadingCities', 'show_all_label', 'global_country_search', 'selected_country']),
    },
    mounted() {
        //console.log('mounted countries_db', this.countries_db, this.countries)
        if (this.countries_db.length>0) {
            if (this.countries_db[0].translations.en==undefined) {
                this.countries_db.forEach((val, index) => {
                    val.translations.en = val.name
                })
                //this.newCountryLoading()
                this.setCountriesDB(this.countries_db)
                console.log('derrz country', this.countries_db)
                this.countries = this.countries_db
            }else{
                this.countries = this.countries_db
            }
            this.newCountryLoading()
        }
    },
    watch: {
        global_country_search(after, before) {
            //this.getResults();
            //this.search();
            this.newCountryLoading()
        },
        keyword_city(after, before) {
            //this.getResults();
            this.search_city();
        },
        locale(n, o){
            this.newCountryLoading()
        },
        countries(n, o){
            console.log('ccountrien   hn', n, o)
            this.$forceUpdate()
        },
        country_cities(n, o){
            this.cities = this.country_cities
        }
    },
    methods: {
        ...mapActions(useStore, ['login', 'getCities', 'setCountriesDB', 'setSelectedCountry', 'setSelectedCountryCities', 'setSelectedCity']),
        newCountryLoading() {
            this.countries = this.countries_db
            console.log('llklkkkk', this.countries)
            this.countries.forEach((val, index) => {
                let nm = val.translations[this.locale]
                val.name = nm==undefined?val.translations.en:nm
                val.sortname = this.$functions.removeAccentCharacter(val.name.toLowerCase())
            })
            this.countries.sort((a, b) => {
              var nameA = a.sortname.toLowerCase(); // ignore upper and lowercase
              var nameB = b.sortname.toLowerCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
            });
            if (this.global_country_search && this.global_country_search != '') {
                console.log('in global_country_search', this.countries)
                this.countries=this.countries.filter((val) => {
                    return val.sortname.toUpperCase().includes(this.global_country_search.trim().toUpperCase()) || val.iso2.toUpperCase().includes(this.global_country_search.trim().toUpperCase()) || val.iso3.toUpperCase().includes(this.global_country_search.trim().toUpperCase())
                })
                console.log(this.countries)
            }
            
            //console.log('jhjhjhh', file_countries_cities)
            //this.countries = file_countries_cities
        },
        getResults() {
            //let locale = this.user.locale;
            let locale = this.$i18n.locale;
            axios.get('/api/v1/livesearch-country', { params: { keyword: this.global_country_search, locale } })
                .then(res => {
                    this.countries = res.data
                })
                .catch(error => {});
        },
        /*getCities(country_code) {
            //let locale = this.user.locale;
            let locale = this.$i18n.locale;
            axios.get('/api/v1/get-cities-by-country/'+country_code)
                .then(res => {
                    console.log('xwdfsdq', res.data)
                    this.country_cities = res.data.cities
                    this.cities = res.data.cities
                })
                .catch(error => {});
        },*/
        search(){
            this.countries = this.countries.filter(el => el.name.toLowerCase().includes(this.global_country_search.toLowerCase()));
        },
        search_city(){
            this.cities = this.country_cities.filter(el => el.sortname.toLowerCase().includes(this.keyword_city.trim().toLowerCase()));
        },
        select_country(code){
            if (code == 'all') {
                this.setSelectedCountry(null)
                //this.$emit('propagation', 'all')
                this.$emit('propagation_country', 'all')
                
            }else{
                //alert('changed')
                let index = this.countries.findIndex(el => el.iso2 === code);
                this.$emit('propagation_country', this.countries[index])
                this.setSelectedCountry(this.countries[index])
                //If the new country choosed # from the old one
                if (this.code != code) {
                    this.setSelectedCountryCities([])
                    //this.$emit('propagationCity', '')
                }
                this.code = code
                //this.cities = []
                //this.getCities({code:code, self:this})
            }
            
            this.$hide_modal.hide_modal('select-country');
        },
        select_city(city){
            this.setSelectedCity(city)
            //this.$emit('propagationCity', city)
            this.$hide_modal.hide_modal('select-city');
        },
        loadCitiesWithCountryCode(code){
            this.select_country(code)
        }
    }
}
</script>

<style>
select {
    width: 150px;
    line-height: 49px;
    height: 38px;
    font-size: 22px;
    outline: 0;
    margin-bottom: 15px;
}
</style>