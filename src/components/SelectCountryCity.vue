<template>
    <div>
        <!-- <div id="select-country-city" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 365px;">
            <div class="content" id="tab-group-3">
                <div class="tab-controls tabs-small tabs-rounded" data-highlight="bg-green-dark">
                    <a href="#" class="no-effect" @click="country_tab_active=true">
                        {{$t('message.select_country')}}
                        <span v-if="country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                    <a href="#" class="no-effect no-click">
                        {{$t('message.select_city')}}
                        <span v-if="!country_tab_active" style="width: 80%;height: 3px;border-radius: 10px;background-color: #000;margin: auto;display: block;"></span>
                    </a>
                </div>
            </div>
            <input type="hidden" id="caller_id" name="">
            <div v-if="country_tab_active" class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a :data-country-code="country.iso2" :data-country-libelle="country.libelle" href="#" v-for="country in countries" :key="country.id" v-on:click="select_country(country.iso2)">
                      
                      <span>{{country['libelle'+($i18n.locale=='fr'?'':'En')]}}</span>
                      <i class="fa fa-check-circle"></i>
                    </a>
                </div>
                <div class="clear"></div>
            </div>
            <div v-else class="me-4 ms-3 mt-2">
                <div class="">
                    <input type="text"  v-model="keyword_city" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 300px;">
                    <a :data-city-id="city.id" :data-city-libelle="city.city" href="#" class="close-menu" v-for="city in cities" :key="city.id" v-on:click="select_city(city.city)">
                      
                      <span>{{city.city}}</span>
                      <i class="fa fa-check-circle"></i>
                    </a>
                </div>
                <div class="clear"></div>
            </div>
        </div> -->
        <div id="select-country-city" class="menu menu-box-bottom rounded-m" data-menu-height="365" data-menu-effect="menu-over" style="display: block; height: 365px;">
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
                    <input type="text" v-model="keyword" @input="newCountryLoading" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
                </div>
                <div class="list-group list-custom-small" v-if="countries.length > 0" style="overflow-y: scroll;height: 230px;">
                    <!-- <a v-if="true" @click="choose_country('')">
                        <strong>{{$t('message.everywhere_in_world')}} *</strong>
                        <i style="line-height: 34px;opacity: 1;">
                            <img class="tw:inline" src="/site_images/w.png" style="width: 13px;height: 13px;margin-right: 0">
                        </i>
                    </a> -->
                    <a v-for="country in countries" :key="country.id" @click="choose_country(country)">
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
                <a class="tw:w-full" @click="select_city('')" style="border-bottom: solid 1px rgba(0, 0, 0, 0.05);line-height: 32px;height: 33px;display: inline-block;">
                    <strong class="color-black">{{$t('message.everywhere_in_country')}} *</strong>
                </a>
                <div class="list-group list-custom-small" v-if="cities.length > 0" style="overflow-y: scroll;height: 200px;">
                    <a class="close-menu" v-for="city in cities" :key="city.id" v-on:click="select_city(city.name)" style="line-height: 32px;">
                      <span>{{city.name}}</span>
                      <!-- <i class="fa fa-check-circle"></i> -->
                    </a>
                </div>
                <div v-else-if="isLoadingCities" style="text-align: center;">
                    <img style="width: 70px;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid m-auto">
                </div>
                <div v-else-if="cities.length == 0" style="text-align: center;">
                    <div class="no_more_data" style="">
                        {{$t('message.no_more_data')}}
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
export default {
    data() {
        return {
            keyword: null,
            keyword_city: null,
            countries: [],
            cities: [],
            country_tab_active: true,
            selected_country: null,
            selected_city: '',
        };
    },
    computed: {
        ...mapWritableState(useStore, ['pageTitle', 'user', 'countries_db', 'isLoggedIn', 'locale', 'country_cities', 'isLoadingCities', 'show_all_label']),
    },
    mounted() {
        if (this.countries_db.length>0) {
            if (this.countries_db[0].translations.en==undefined) {
                this.countries_db.forEach((val, index) => {
                    val.translations.en = val.name
                })
                //this.newCountryLoading()
                this.setCountriesDB(this.countries_db)
                console.log('derrz country_cities', this.countries_db)
                this.countries = this.countries_db
            }else{
                this.countries = this.countries_db
            }
        }
    },
    watch: {
        
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
        ...mapActions(useStore, ['login', 'getCities', 'setCountriesDB', 'setSelectedCountry', 'setSelectedCountryCities', 'setSelectedCity', 'setSelectedCountryCity']),
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
            if (this.keyword && this.keyword != '') {
                console.log('in keyword', this.countries)
                this.countries=this.countries.filter((val) => {
                    return val.sortname.toUpperCase().includes(this.keyword.trim().toUpperCase()) || val.iso2.toUpperCase().includes(this.keyword.trim().toUpperCase()) || val.iso3.toUpperCase().includes(this.keyword.trim().toUpperCase())
                })
                console.log(this.countries)
            }
            
            //console.log('jhjhjhh', file_countries_cities)
            //this.countries = file_countries_cities
        },
        search(){
            this.countries = this.countries.filter(el => el.name.toLowerCase().includes(this.keyword.toLowerCase()));
        },
        search_city(){
            this.cities = this.country_cities.filter(el => el.sortname.toLowerCase().includes(this.keyword_city.trim().toLowerCase()));
        },
        choose_country(country){
            this.country_tab_active = false
            this.selected_country = country
            let code = country.iso2
            this.cities = []
            this.getCities({code:code, self:this})
        },
        select_city(city){
            this.selected_city = city
            let city_label = city
            if (city==='') {
                city_label = this.$t('message.everywhere_in_country')
            }
            this.country_tab_active = true
            this.setSelectedCountryCity({country: this.selected_country, city: this.selected_city, city_label: city_label})
            this.$hide_modal.hide_modal('select-country-city');
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