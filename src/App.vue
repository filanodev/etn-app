<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    /*import Header from './components/Header.vue'*/
    /*import SideMenu from './components/SideMenu.vue'*/
    import FooterMenu from './components/FooterMenu.vue'
    import SelectCategory from './components/SelectCategory.vue'
    import SelectCountry from './components/SelectCountry.vue'
    import SelectCountryCity from './components/SelectCountryCity.vue'
    import SwitchLanguage from './components/SwitchLanguage.vue'
    import MessageBoxes from './components/MessageBoxes.vue'
    import Loading from './components/Loading.vue'
    /*import SendComment from './components/SendComment.vue'*/
    /*import Index from './views/Index.vue'*/

    import languages from './locales/languages.json'
    import countries from './locales/countries.json'
    import { useStore } from './stores'

    const store = useStore()
    //store.$reset()
    //store.checkIfPiBrowser()
    store.piPaymentLogin()//Just refresh login for pi payment to be loaded
    store.countries_db = countries
    store.languages = languages


    /*store.isOpenLoading = true
    store.country_code_product = 'all'
    store.iso3 = 'all'
    let tab_country = store.user?store.user.filter_country_code:null
    if (tab_country) {
        store.country_code_product = tab_country.iso2?tab_country.iso2:'all'
        store.iso3 = tab_country.iso2?tab_country.iso3:'all'
    }
    store.country_code_product_flag = store.country_code_product
    if (store.country_code_product_flag!='all' && store.country_code_product_flag.toLowerCase()=='uk') {
        store.country_code_product_flag = 'gb'
    }
    store.index_load_opening()//Just refresh login for pi payment to be loaded*/
    //alert('WELCOME')
</script>

<template>
  <!-- <Header ref="header"/> -->
  <Loading />
  <!-- <SideMenu/> -->
  <FooterMenu />
  <SelectCategory />
  <!-- <SelectCountry/> -->
  <SelectCountryCity/>
  <SwitchLanguage />
  <MessageBoxes />
  <!-- <SendComment /> -->
  <vue3-confirm-dialog></vue3-confirm-dialog>
  <!-- <RouterView style="width: 100%;" /> -->
  <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <KeepAlive :include="['Index', 'Shippings']">
          <Component :is="Component" />
        </KeepAlive>
      </Transition>
  </RouterView>
  <!-- <Index /> -->
</template>