//import './assets/main.css'

import * as bootstrap from 'bootstrap'
/*import '../public/template/styles/styles.scss'*/
import './assets/styles/imports.css'
/*import '../public/template/styles/style.css'
import '../public/template/styles/custom.css'*/
import './tailwind.css'

//alert('PIKETPLACE')
import { createApp } from 'vue'
import App from './App.vue'
//import './index.css'
import router from './router'
import i18n from './i18n.js'

import VueObserveVisibility from 'vue3-observe-visibility'

import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';

import VueCountdown from '@chenfengyuan/vue-countdown';

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(i18n)
app.component(VueCountdown.name, VueCountdown);
app.use(pinia)

import { useStore } from './stores'
const store = useStore()

app.use(VueObserveVisibility)
app.use(Vue3ConfirmDialog);
app.component('vue3-confirm-dialog', Vue3ConfirmDialog.default)
app.directive('observe-visibility', VueObserveVisibility.ObserveVisibility)

import Header from './components/Header.vue'
app.component('Header', Header)

import Amount from './components/Amount.vue'
app.component('Amount', Amount)

import SendComment from './components/SendComment.vue'
app.component('SendComment', SendComment)

import AddStock from './components/AddStock.vue'
app.component('AddStock', AddStock)

import Filter from './components/Filter.vue'
app.component('Filter', Filter)

app.use(vue3GoogleLogin, {
  clientId: '337904461076-f04emfmmeie9cilsp0tmmm5snm0vkovs.apps.googleusercontent.com'
})

const scrollableElementId = 'page' // You should change this
const scrollPositions = Object.create(null)
router.beforeEach((to, from, next) => {
  //to.path = to.path.includes('?')?to.path+"&th=vgds":to.path+"?&th=vgds"
  store.scrollPositions[from.name] = window.scrollY
  next()
})

import {show_modal} from './functions.js'
import {hide_modal} from './functions.js'
import {delivery_period} from './functions.js'
import {functions} from './functions.js'
app.config.globalProperties.$functions = functions;
app.config.globalProperties.$show_modal = show_modal;
app.config.globalProperties.$hide_modal = hide_modal;
app.config.globalProperties.$delivery_period = delivery_period;

import "vue-progressive-image/dist/style.css"; // <--- very important!
import VueProgressiveImage from 'vue-progressive-image'

app.use(VueProgressiveImage);

import vClickOutside from "click-outside-vue3"
app.use(vClickOutside);

//app.config.globalProperties.$currency = "Test-π";
app.config.globalProperties.$currency = "π";
app.config.globalProperties.$currencyFunction = {
  setCurrency(value) {
    app.config.globalProperties.$currency = value;
  }
}

const globals = app.config.globalProperties
export { globals }

export { router }

///////////ADSENSE//////////////////
import ScriptX from 'vue-scriptx'
app.use(ScriptX)
import Ads from 'vue-google-adsense'
//app.use(Ads.AutoAdsense, { adClient: 'ca-pub-3962442438023665', isNewAdsCode: true })
app.use(Ads.Adsense)
app.use(Ads.InArticleAdsense)
app.use(Ads.InFeedAdsense)
///////////ADSENSE//////////////////

import MasonryWall from '@yeger/vue-masonry-wall'
app.use(MasonryWall)

app.directive('can', (el, binding, vnode) => {
  var permissions = store.permissions;
  if(permissions.includes(binding.value))
  {
    return vnode.el.hidden = false;
  }else{           
    return vnode.el.hidden = true;
  }
})

import VueQrcode from '@chenfengyuan/vue-qrcode';
app.component(VueQrcode.name, VueQrcode);

import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL

axios.interceptors.request.use(request => {
    store.maintenance_mode = false
    //console.log('this.$store.state.token', store.token)
    request.headers.Authorization = `Bearer ${ store.token }`;
    request.headers.Accept = `application/json`;
    request.headers.useruid = store.user?store.user.uid:'';
    return request;
});

axios.interceptors.response.use(
  response => {
    //Update user data
    //console.log('axios.interceptors.response', response.data)
    if (response.data.current_user_for_automatic_update!=undefined && response.data.current_user_for_automatic_update!=null) {
      //console.log('responseresponse response', response.data.current_user_for_automatic_update, store.user)
      if (store.user && store.user.id == response.data.current_user_for_automatic_update.id) {
        store.update_user(response.data.current_user_for_automatic_update)
      }
      //When logging in, store.user is null
      if (store.user == null) {
        store.update_user(response.data.current_user_for_automatic_update)
      }
    }
    if (response.data.agreements!=undefined && response.data.agreements!=null) {
      store.set_agreements(response.data.agreements)
    }
    if (response.data.reasons!=undefined && response.data.reasons!=null) {
      store.setReasons(response.data.reasons)
    }
    /*if (response.data.random_product_display_activation!=undefined && response.data.random_product_display_activation!=null) {
      store.set_random_product_display_activation(response.data.random_product_display_activation)
    }*/
    /*if (response.data.languages!=undefined && response.data.languages!=null) {
      store.set_languages(response.data.languages)
    }*/
    return response;
  }, 
  error => {
    store.isOpenLoading = false
    if (error.response && (error.response.status === 422 || error.response.status === 401 || error.response.status === 403)) {
        //this.$swal('Erreur', "Votre session à expiré, veuillez vous reconnecter", "error")
        //window.location.href = '/auth/login';
        let img = '/site_images/error.png'
        console.log('reject auth')
        if (error.response.data.status === 'deleted') {
          console.log('deleted')
          let msg = i18n.global.t('message.account_deleted')
          msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
          store.confDialog(
              {
                title: i18n.global.t('message.info'),
                message: msg,
                button: {
                  yes: 'OK',
                },
                html: true,
                  callback: confirm => {
                      if (confirm) {
                          //this.$router.push('connexion')
                      }
                      store.logoutErase()
                  }
              }
          )
        }else if (error.response.data.status === 'deactivated') {
          console.log('deactivated')
          let msg = i18n.global.t('message.account_deactivated')
          msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
          store.confDialog(
              {
                title: i18n.global.t('message.info'),
                message: msg,
                button: {
                  yes: 'OK',
                },
                html: true,
                  callback: confirm => {
                      if (confirm) {
                          //this.$router.push('connexion')
                      }
                      store.logoutErase()
                  }
              }
          )
        }else if (error.response.data.status === 'maintenance_mode'){
          console.log('reject auth maintenance_mode')
          store.maintenance_mode = true
          //router.push('/maintenance')
          let msg = i18n.global.t('message.maintenance_mode')
          msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
          store.confDialog(
              {
                title: i18n.global.t('message.info'),
                message: msg,
                button: {
                  yes: 'OK',
                },
                html: true,
                  callback: confirm => {
                      if (confirm) {
                          //this.$router.push('connexion')
                      }
                      router.push('/maintenance')
                  }
              }
          )
        }else if (error.response.data.status === 'purchase_deactivated'){
          console.log('reject auth maintenance_mode')
          store.maintenance_mode = true
          //router.push('/maintenance')
          let msg = i18n.global.t('message.purchase_deactivated')
          msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
          store.confDialog(
              {
                title: i18n.global.t('message.info'),
                message: msg,
                button: {
                  yes: 'OK',
                },
                html: true,
                  callback: confirm => {
                      if (confirm) {
                          //this.$router.push('connexion')
                      }
                  }
              }
          )
        }else if (error.response.status === 403){
          /*if(router.path.includes("product_not_validated")){
              router.push('/' + id + '/products')
          }*/
          //console.log('Forbidden', error.response, router)
          //router.go(-1)
          //store.state.maintenance_mode = true
          let msg = i18n.global.t('message.access_denied')
          /*if (error.response.data.status=="deleted") {
            msg = i18n.global.t('message.deleted')
          }
          if (error.response.data.status=="deactivated") {
            msg = i18n.global.t('message.deactivated')
          }*/
          
          msg = '<br><img class="m-auto" class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
          store.confDialog(
              {
                title: i18n.global.t('message.info'),
                message: msg,
                button: {
                  yes: 'OK',
                },
                html: true,
                  callback: confirm => {
                      router.go(-1)
                  }
              }
          )
        }else{
          console.log('session_expired', error.response)
          store.session_expired = true
          store.logoutErase()
          //If user session expired then redirect again to product page to show product
          if (router.currentRoute.value.path.includes('/product/')) {
              router.push(router.currentRoute.value.path)
              return
          }
          
          router.push('/my-account')
        }
    }
    return Promise.reject(error);
  }
);

import moment from 'moment';
app.config.globalProperties.$filters = {
  formatDate(value, locale = 'en') {
    if (locale == 'fr' || locale == 'es') {
        return moment(String(value)).format('DD/MM/YYYY HH:mm:ss');
    }
    return moment(String(value)).format('MM/DD/YYYY hh:mm:ss a');
  }
}
app.mount('#app')