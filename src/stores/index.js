import { defineStore } from 'pinia'

import axios from 'axios'
import i18n from '../i18n'
import {show_modal} from '../functions'
import {hide_modal} from '../functions'
import {functions} from '../functions'

import languages from '../locales/languages.json'

import { globals } from '../main.js'

const defaultState = {
  scrollPositions: {},
  isPiBrowser: true,
  project_type: "Testnet",//Mainnet or Testnet
  show_all_label: false,
  user: null,
  username: "",
  user_country_code: '',
  email: '',
  isLoggedIn: false,
  isLoading: false,
  isLoadingCities: false,
  isOpenLoading: false,
  countries_db: [],
  cart: null,
  permissions: [],
  token: '',
  locale: '',
  maintenance_mode: false,
  //
  connecting: false,
  disconnecting: false,
  saving: false,
  deleting: false,
  searching: false,
  session_expired: false,

  verifierPayment: null,
  payment_from: '',
  uniqueId: '',
  product: null,
  product_id: 0,
  uploadDone: true,
  selected_category: null,
  line_order: null,
  confDialog: null,
  country_cities: [],
  languages: [],
  agreements: [],
  reasons: [],
  seller_agreements: [
      "Piketplace does not participate in pricing and will not interfere with sellers' pricing. The amount of pi to be exchanged for the goods is solely set by sellers.",
      "Please note that the transaction fee for the pi wallet is 0.01π. When seller withdraws π from PCM, his PCM wallet balance must be greater than 0.01π.",
      "The π earned from selling goods cannot be exchanged to fiat during the enclosed mainnet. Sellers should plan carefully according to their financial affordability. After the open mainnet, the Pi price may not be the seller's current barter price. PCM users need to be aware that cryptocurrency prices are volatile and should bear their own risks.",
      "Please upload the stock quantity and description correctly. If sellers cannot deliver the goods accroding to the submitted item quantity and description, his PCM account will be warned or blacklisted.",
      "Piketplace will strictly follow the rules from PCT. We only accept Pi, but not fiat currency. We will not provide any channels for buyers or sellers to exchange pi into fiat currency.",
      "Piketplace allow the exchange of idle items between pioneers.",
      "Piketplace will highlight some products from time to time for promotion in the Piketplace official Twitter and community.",
      "Piketplace will provide users with 7/24 customer service. If you encounter bugs or want to make suggestions when using the app, you can communicate with the customer service directly.",
  ],
  show_welcome: true,
  show_country: false,
  purchase_activation: true,
  mining_activation: true,
  pibrowser_verification: true,
  http_request_status: '',//'' at beginning,'success' and 'error'
  transfer_fee_pi_network: 0,
  transfer_fee_piket: 0,
  transfer_fee_piket_activation: false,
  productBuyNow: null,
  at_least_one_product_qty_insufficient: false,
  paid: false,
  delivery_penalties_limit: 0,
  prevRoute: null,

  categories: [],
  products: [],
  saved_products: [],
  selected_country: {},
  selected_city: '',
  selected_country_city: {country: null, city: ''},
  country_code_product: 'all',
  country_code_product_flag: 'all',
  iso3: 'all',
  search: '',
  data_link: null,

  approbation_active: false,
  deletion_active: false,
  update_active: false,
  random_product_display_activation: false,

  selected_category_search: null,
  selected_country_search: null,
  user_country: null,
  filter: {
      iso2: 'all', 
      iso3: 'all',
      search: '',
      category: null,
      sort_by: "newest",
      show_products_type: "all",
      is_updated: false, 
  },

  show_filter: false,
  can_show_add: false,
  activate_pi_interstital_ads: false,
  activate_pi_rewarded_ads: false,
  activate_google_ads: true,
  pi_balance: 0,
  piket_balance: 0,
  piket_wallet_frontend_url: '',
  userLocation: null,

  show_reward_gif: false,
  rewarded_ads_data: null,

  global_country_search: "",

  referral_token_amount_sponsor: 0,
  referral_token_amount_child: 0,

  failed_rewarded_ads: [],
  show_boost_panel: false,
  force_index_refresh: false,
}
export const useStore = defineStore('appData', {
  // arrow function recommended for full type inference
  /*state: () => {
    return defaultState
  },*/
  state: () => ({ ...defaultState }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    reset() {
      let save = this.saveLoggedIn()
      let obj = {...defaultState, ...save}
      Object.assign(this, obj);
    },
    setScrollPositions(scrollPositions) {
      this.scrollPositions = scrollPositions
    },
    setToken(token) {
      this.token = token
    },
    set_activate_pi_interstital_ads(val) {
      this.activate_pi_interstital_ads = val
    },
    set_activate_pi_rewarded_ads(val) {
      this.activate_pi_rewarded_ads = val
    },
    set_failed_rewarded_ads(val) {
      this.failed_rewarded_ads = val
    },
    set_force_index_refresh(val) {
      this.force_index_refresh = val
    },
    saveLoggedIn() {
      return {
        isLoggedIn: this.isLoggedIn,
        token: this.token,
        countries_db: this.countries_db,
        categories: this.categories,
        languages: this.languages,
        agreements: this.agreements,
        reasons: this.reasons,
        seller_agreements: this.seller_agreements,
        confDialog: this.confDialog,
        session_expired: this.session_expired,
        pageTitle: this.pageTitle,
        project_type: this.project_type,//Mainnet or Testnet
        user: this.user,
        user_country_code: this.user_country_code,
        email: this.email,
        cart: this.cart,
        permissions: this.permissions,
        locale: this.locale,
        maintenance_mode: this.maintenance_mode,
        activate_pi_interstital_ads: this.activate_pi_interstital_ads,
        activate_pi_rewarded_ads: this.activate_pi_rewarded_ads,
        activate_google_ads: this.activate_google_ads,
      }
    },
    setCountriesDB(countries) {
      console.log('in setCountries')
      if (countries.length == 0) {return}
      this.countries_db = countries
    },
    setReasons(reasons) {
      if (reasons.length == 0) {return}
      this.reasons = reasons
    },
    set_random_product_display_activation(random_product_display_activation) {
      this.random_product_display_activation = random_product_display_activation
    },
    set_agreements(agreements) {
      if (agreements.length == 0) {return}
      this.agreements = agreements
    },
    set_languages(languages) {
      if (languages.length == 0) {return}
      this.languages = languages
    },
    setLang(locale) {
      this.locale = locale
    },
    setLoggedIn(val) {
      console.log('in setLoggedIn')
      this.isLoggedIn = val
    },
    saveProduct(products) {
      console.log('in saved_products')
      this.saved_products = products
    },
    setUniqueId(id) {
      this.uniqueId = id
    },
    setProduct(product){
      this.product = product
    },
    set_line_order(line_order){
      this.line_order = line_order
    },
    set_show_boost_panel(val){
      this.show_boost_panel = val
    },
    setConfDialog(confDialog){
      this.confDialog = confDialog
    },
    setSelectedCategory(selectedCategory) {
      this.selected_category = selectedCategory
    },
    setSelectedCountry(selectedCountry) {
      //alert('setSelectedCountry '+JSON.stringify(selectedCountry))
      this.selected_country = selectedCountry
    },
    setUserCountry(country) {
      this.user_country = country
    },
    setSelectedCity(city) {
      this.selected_city = city
    },
    setSelectedCountryCity(country_city) {
      this.selected_country_city = country_city
    },
    setSelectedCountryCities(cities) {
      this.country_cities = cities
    },
    setSelectedCategorySearch(selectedCategory) {
      this.selected_category_search = selectedCategory
    },
    setSelectedCountrySearch(selectedCountry) {
      this.selected_country_search = selectedCountry
    },
    setUserCountryCode(countryCode) {
      this.user_country_code = countryCode
    },
    setFilter(filter) {
      this.filter = filter
    },
    resetFilter() {
      this.filter = {
        iso2: 'all',
        iso3: 'all',
        search: '',
        category: null,
        sort_by: "newest",
        show_products_type: "all",
        is_updated: true
      }
    },
    update_user(user) {
      if (user == null) {return}
      console.log('updated user')
      this.user = user
      if (user.locale && user.locale!="") {i18n.global.locale=user.locale}
      this.setBalance()
    },
    is_user_profil_set() {
      if (this.user.email === "" || this.user.email === null) {
          return false
      }
      if (this.user.phone_number === "" || this.user.phone_number === null) {
          return false
      }
      return true
    },
    setBalance(){
        if (this.user && this.user.wallets) {
            let pi_wallet = this.user.wallets.find(x=>x.currency && x.currency.code=="pi")
            if (pi_wallet) {
                this.pi_balance = pi_wallet.realBalance
            }
            let piket_wallet = this.user.wallets.find(x=>x.currency && x.currency.code=="piket")
            if (piket_wallet) {
                this.piket_balance = piket_wallet.realBalance
            }
        }
    },
    async checkIfPiBrowser(){
        try{
            let features = await Pi.nativeFeaturesList()
            if (features.length>0) {
                this.isPiBrowser = true
            }else{
                this.isPiBrowser = false
            }
            console.log("Pi.nativeFeaturesList", features, this.isPiBrowser)
        }catch(err){
            this.isPiBrowser = false
            //alert('catch error')
            //alert('catch error '+err.message)
            //alert('catch error '+JSON.stringify(err))
            console.log('catch error', err)
        }
    },
    clearCache(confDialog) {
        let self = this
        let yes = i18n.global.t('message.continue')
        let btn = {
            yes: yes,
            no: i18n.global.t('message.confirmation.no_cancel'),
        }
        let img = '/site_images/confirm.PNG'
        let msg = i18n.global.t('message.side_menu.clear_cache_message')
        msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
        confDialog({
          title: i18n.global.t('message.info'),
          message: msg,
          button: btn,
          html: true,
            callback: confirm => {
                if (confirm) {
                    hide_modal.all()
                    self.deleting = true
                    setTimeout(function (argument) {
                        self.deleting = false
                        self.reset()

                        img = '/site_images/info.PNG'
                        msg = i18n.global.t('message.side_menu.cache_cleared_successfully')
                        msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                        confDialog({
                            title: i18n.global.t('message.info'),
                            message: msg,
                            button: {
                                yes: "OK"
                            },
                            html: true,
                              callback: confirm => {
                              }
                        })
                        //window.location.href = import.meta.env.VITE_APP_FRONTEND_URL
                        //window.open(import.meta.env.VITE_APP_FRONTEND_URL, '_blank')
                    }, 2000)
                    
                }
            }
        })
      
    },
    logoutErase() {
      this.disconnecting = false
      this.isLoggedIn = false
      this.user = null
      this.token = ''
      this.permissions = []
      this.email = ''
      this.uniqueId = ""
      this.verifierPayment = null
    },
    piPaymentLogin() {//Login on Pi Platform to initiate Pi Payment
        this.signInPiNetwork({isLoggedIn: true})
    },
    login(data) {
      //this.isLoggedIn = true
      //alert('pi browser here '+this.isPiBrowser)
      /*if (this.pibrowser_verification && !this.isPiBrowser) {
          functions.msg_box_new(this.confDialog, 'info', i18n.global.t('message.info'), i18n.global.t('message.please_use_pi_browser'))
          return
      }*/
      this.signInPiNetwork(data)
    },
    logout() {
      //
    },
    signInPiNetwork(data) {
        let isLoggedIn = data.isLoggedIn
        let confirm_func = null
        let i18n = null
        let self = this
        this.error = ""
        if (isLoggedIn == undefined || !isLoggedIn) {//If not logged in, we logged him in in piketplace
            this.connecting = true
            confirm_func = data.self.$confirm
            i18n = data.self.$i18n
        }
        //const scopes = ["username", "payments", "wallet_address", "preferred_language", "roles"];
        const scopes = ["username", "payments", "wallet_address", "preferred_language"];
        const onIncompletePaymentFound = (payment) =>{
            //console.log('signin onIncompletePaymentFound', payment)
            let txid = payment.transaction.txid;
            let txUrl = payment.transaction._link;
            let paymentId = payment.identifier;
            let data = {
                paymentId:paymentId,
                txid:txid,
            }
            self.executePaymentCompletion(data)
            //We're not allowed to cancel a payment after approve
            //this.dispatch('cancelPayment', data)
        };

        Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth) {
            //console.log('Pi.authenticate', auth.user.username);
            console.log('Pi.authenticate', auth);
            self.username = auth.user.username
            //alert('in sign pi '+auth.user.username)
            /* if the user is already logged in we reload
             his pi network connection session
             */
            if (isLoggedIn == undefined || !isLoggedIn) {//If not logged in, we logged him in in piketplace
                let dd = {
                    authResponse: auth,
                    confirm_func: confirm_func,
                    self: data.self,
                    isLoggedIn: isLoggedIn,
                    i18n: i18n
                }
                self.signInPiketplace(dd);//Piketplace login
            } 
            
        }).catch(function(error) {
            //alert('in sign pi error')
            self.connecting = false
            self.isLoading = false
            self.isOpenLoading = false
            self.error = i18n.t('message.an_error_occured')
            console.log('Pi authenticate error', error);
        });
    },
    signInPiketplace(data) {
        //state.isLoading = true
        //state.isOpenLoading = true
        let self = this
        let authResult = data.authResponse
        let referred_by = document.getElementById('referred_by')
        if (referred_by) {
            authResult.referred_by = referred_by.value
        }
        //alert(authResult.referred_by)
        const config = {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        }};
        authResult.user_country = this.user_country
        authResult.geolocation = this.userLocation
        axios.post(`/signin`, { authResult }, config)
        .then(resp => {
            console.log("signin", resp.data);
            this.isLoading = false
            this.isOpenLoading = false
            this.connecting = false
            if (resp.data.status == 'success') {
                let user = resp.data.current_user_for_automatic_update
                let cart = resp.data.data_cart.cart
                let state = resp.data.state
                //user.state = state
                self.cart = cart
                self.locale = user.locale?user.locale:'en'
                i18n.global.locale = self.locale;
                self.token = resp.data.token
                self.permissions = user.permissions?user.permissions:[]
                self.purchase_activation = resp.data.purchase_activation
                self.mining_activation = resp.data.mining_activation
                self.agreements = resp.data.agreements
                self.delivery_penalties_limit = resp.data.delivery_penalties_limit
                //let message_login = 'message.you_still_logged_in'
                let message_login = 'message.login_successfull'
                this.isLoggedIn = true
                message_login = 'message.login_successfull'
                console.log('login_successfull', this)
                /*let nb = this.user.cart?this.user.cart.length:0
                this.$refs.header.setData({nb:nb, nb_notif:this.user.nbNotification, title: 'message.log_in', route: this.prevRoute});*/

                if (state == 'new') {
                    /*if (user.wallet.token && user.wallet.token > 0) {
                        message_login = i18n.global.t('message.referral_success_message',{'amount':user.wallet.token+' PIKET', 'username': '@'+user.referred_by})
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.connection'), message_login)
                    }else{
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.connection'), i18n.global.t(message_login))
                    }*/
                    show_modal.show_modal({
                        id:'menu-language',
                    });
                    if (this.getReferrerUsername() !== "") {
                        this.setReferrerUsername('')
                        message_login = i18n.global.t('message.referral_success_message',{'amount':this.referral_token_amount_child+' PIKET', 'username': '@'+user.referred_by})
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.connection'), message_login)
                    }else{
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.connection'), i18n.global.t(message_login))
                    }
                    /*if (this.getReferrerUsername() !== "") {
                        this.setReferrerUsername('')
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.referred_successfully'))
                    }*/
                }else{
                    if (this.getReferrerUsername() !== "") {
                        this.setReferrerUsername('')
                        data.self.$functions.msg_box(data.self, 'info', 'Info', i18n.global.t('message.you_already_have_an_account'))
                    }else{
                        data.self.$functions.msg_box(data.self, 'success', i18n.global.t('message.connection'), i18n.global.t(message_login))
                    }
                }
            }else{
                //this.isLoading = false
            }
        })
        .catch(error => {
            //alert('in signInPiketplace error '+JSON.stringify(error))
            self.isLoading = false
            self.isOpenLoading = false
            self.connecting = false
            self.error = i18n.global.t('message.an_error_occured')
            let msg = i18n.global.t('message.an_error_occured')
            //this.isLoading = false
            console.log('signInPiketplace error', error);
            if (error.response && error.response.data.status == 'deleted') {
                msg = i18n.global.t('message.deleted')
            }
            if (error.response && error.response.data.status == 'deactivated') {
                msg = i18n.global.t('message.account_deactivated')
            }
            data.self.$functions.msg_box(data.self, 'error', i18n.global.t('message.connection'), msg)
        });

        //console.log('authResult', authResult)
        //return setShowModal(false);
    },
    signOut(self) {
        let storeSelf = this
        //storeSelf.$reset()
        //commit('SET_OPEN_LOADING', true)
        storeSelf.disconnecting = true
        //console.log('this.state.token', this.state.token)
        axios.post('/signout')
        .then(res => {
            //commit('SET_OPEN_LOADING', false)
            storeSelf.isLoading = false
            storeSelf.disconnecting = false
            if (res.status==200 || res.data.status=='success') {
                storeSelf.logoutErase()
                self.$functions.msg_box(self, 'success', i18n.global.t('message.deconnection'), i18n.global.t('message.logout_successfull'))
            }
        })
        .catch(error => {
            storeSelf.isLoading = false
            storeSelf.logoutErase()
            console.log('logout error.response', error)

            /*if (error.response.status != 403) {
                self.$functions.msg_box(self, 'error', i18n.t('message.deconnection'), i18n.global.t('message.an_error_occured'))
            }*/
        });
    },
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          let userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
          };
          this.userLocation = userLocation
          this.save_user_location()
          console.log('this.userLocation', position, this.userLocation)
        }, error => {
          console.error("Error getting user location:", error);
        });
        console.log('this.userLocation out')
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    async save_user_location(){
        console.log("save_user_location", this.user, this.userLocation)
        let res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.userLocation.latitude}&lon=${this.userLocation.longitude}`)
        console.log('save_user_location res', res.data.address.country_code)
        let country_code = ""
        if (res.data.address && res.data.address.country_code) {
            country_code = res.data.address.country_code
        }
        let country = this.getCountryObjectByCode(country_code)
        console.log('country', country)
        this.filter.iso2 = country.iso2
        this.filter.iso3 = country.iso3
        this.filter.is_updated = true
        this.selected_country_search = this.filter
        if (!this.isLoggedIn) {
            this.user_country = country
            return
        }
        axios.post(`/save-user-country`, {country: country, geolocation: this.userLocation})
        .then(res => {
            console.log('/save-user-country', res.data)
            if (res.data.status === true) {
                this.user_country = country
                this.selected_country = country
            }else{
            }
        })
        .catch(error => {
        });
    },
    async index_load_opening(){
        //console.log('qdsqs load')
        let connected_user_id = 0
        if (this.user && this.user.id) {
            connected_user_id = this.user.id
        }
        let country_codes = {
            iso2: this.country_code_product,
            iso3: this.iso3,
        }
        this.isLoading = true
        let idCategory = this.selected_category?this.selected_category.id:''
        let res = await axios.get(`/index-loading?page=1&search=${this.search}&category=${idCategory}&locale=${i18n.locale}&connected_user_id=${connected_user_id}&status=validated&verified_shops=1`, { params: { country_search: country_codes } })
        .then(res => {
            console.log('index data-loading', res.data)
            this.isLoading = false
            /*this.isLoadingMore = false
            this.isOpenLoading = false;*/
            this.categories = res.data.categories;
            this.products = res.data.products.data;

            globals.$currency = res.data.currency

            this.setSettings(res.data);
            this.setReasons(res.data.reasons);
        })
        .catch(error => {
            //console.log(error)
            this.isLoading = false
            this.isLoadingMore = false
            this.isOpenLoading = false;
        });
    },
    clearPaymentVerifier() {
        // If interval exists, clear it
        if (this.verifierPayment) {
            clearInterval(this.verifierPayment)
        }
    },
    setPaymentVerifier(verifierPayment) {
        // If interval exists, clear it
        if (this.verifierPayment) {
            this.clearPaymentVerifier()
        }
        // Set verifierPayment
        this.verifierPayment = verifierPayment
    },
    initLoaders() {
        this.connecting = false
        this.disconnecting = false
        this.saving = false
        this.deleting = false
        this.searching = false
    },
    initParams() {
        this.initLoaders()
    },
    setSettings(data){
      //console.log('in settings', data)
        /*if (data.languages) {
          this.languages = data.languages
        }*/
        if (data.currency) {
          this.currency = data.currency
        }
        if (data.show_country) {
          this.show_country = data.show_country
        }
        if (data.categories) {
          this.categories = data.categories
        }
        if (data.agreements!==null) {
          this.agreements = data.agreements
        }
        if (data.purchase_activation!==null) {
          this.purchase_activation = data.purchase_activation
        }
        if (data.mining_activation!==null) {
          this.mining_activation = data.mining_activation
        }
        if (data.pibrowser_verification!==null) {
          console.log('pibrowser_verification', data.pibrowser_verification)
            this.pibrowser_verification = data.pibrowser_verification
        }
        if (data.transfer_fee_pi_network!==null) {
          this.transfer_fee_pi_network = data.transfer_fee_pi_network
        }
        if (data.transfer_fee_piket!==null) {
          this.transfer_fee_piket = data.transfer_fee_piket
        }
        if (data.transfer_fee_piket_activation!==null) {
          this.transfer_fee_piket_activation = data.transfer_fee_piket_activation
        }
        if (data.approbation_active!==null) {
          this.approbation_active = data.approbation_active
        }
        if (data.deletion_active!==null) {
          this.deletion_active = data.deletion_active
        }
        if (data.update_active!==null) {
          this.update_active = data.update_active
        }
        if (data.project_type!==null) {
          this.project_type = data.project_type
        }
        if (data.piket_wallet_frontend_url!==null) {
          this.piket_wallet_frontend_url = data.piket_wallet_frontend_url
        }
        if (data.activate_pi_interstital_ads!==null) {
          this.activate_pi_interstital_ads = data.activate_pi_interstital_ads
        }
        if (data.activate_pi_rewarded_ads!==null) {
          this.activate_pi_rewarded_ads = data.activate_pi_rewarded_ads
        }
        if (data.activate_google_ads!==null) {
          this.activate_google_ads = data.activate_google_ads
        }
        if (data.referral_token_amount_sponsor!==null) {
          this.referral_token_amount_sponsor = data.referral_token_amount_sponsor
        }
        if (data.referral_token_amount_child!==null) {
          this.referral_token_amount_child = data.referral_token_amount_child
        }
    },
    launchPaymentVerifier(data){
        let storeSelf = this
        storeSelf.clearPaymentVerifier()
        //console.log('in setPaymentVerifier', data)
        //storeSelf.uniqueId = data.uniqueId;
        storeSelf.setUniqueId(data.uniqueId)
        storeSelf.paid = false
        self = data.self;
        const verifier = () => {
            return new Promise((resolve, reject) => {
                //console.log("verifier in pay resolve", state.uniqueId);
                console.log("payment_from", storeSelf.payment_from, storeSelf.uniqueId);
                if (storeSelf.uniqueId == '' || storeSelf.uniqueId == null) {
                    return 0;
                }
                //console.log("verifier in pay resolve after");
                let uniqueId = storeSelf.uniqueId;
                let userId = storeSelf.user?storeSelf.user.id:0;
                let req_data = {uniqueId:uniqueId, userId:userId}
                if (data.productId) {
                    req_data.productId=data.productId
                }
                axios.post(`/payment-verifier`, req_data)
                .then(res => {
                    //this.order = res.data.order;
                    console.log("payment-verifier", res.data.payment);
                    if (res.data.payment != null && storeSelf.paid === false) {
                      console.log("payment_from not null", storeSelf.payment_from);
                        let msg = ""
                        let redirectRoute = ''
                        if (storeSelf.payment_from == "donation") {
                            msg = i18n.global.t('message.donate.donation_thanks')
                        }
                        if (storeSelf.payment_from == "deposit") {
                            msg = i18n.global.t('message.balance.deposit_success', {amount: functions.amount_format(res.data.payment.amount, self.$currency)})
                        }
                        if (storeSelf.payment_from == "cart") {
                            msg = i18n.global.t('message.cart.payment_done')
                            redirectRoute = '/my-orders'
                        }
                        if (storeSelf.payment_from == "boost") {
                            redirectRoute = '/'
                            storeSelf.force_index_refresh = true
                            storeSelf.payment_from = ""
                            msg = i18n.global.t('message.boosted_successfully')
                        }
                        if (storeSelf.payment_from == "boost_upgrade") {
                            redirectRoute = '/'
                            storeSelf.force_index_refresh = true
                            storeSelf.payment_from = ""
                            msg = i18n.global.t('message.boost_upgraded_successfully')
                        }
                        storeSelf.paid = true
                        functions.msg_box(self, 'success', i18n.global.t('message.info'), msg, redirectRoute)
                        //storeSelf.uniqueId = ''
                        storeSelf.setUniqueId('')
                        storeSelf.clearPaymentVerifier()
                    }
                    if (res.data.cart != null) {
                        storeSelf.cart.forEach(val=>{
                            let cart_line = res.data.cart.find((el) => el.product.id == val.product.id);
                            val.product = cart_line.product
                            if (val.product.quantity<val.quantity) {
                                storeSelf.at_least_one_product_qty_insufficient=true
                            }
                        })
                        console.log('cart verifierPayment', storeSelf.cart)
                    }
                    if (res.data.productBuyNow != null) {
                        console.log('productBuyNow', res.data.productBuyNow)
                        storeSelf.productBuyNow = res.data.productBuyNow
                    }
                    console.log('hererrre')
                })
                .catch(error => {
                    //console.log(error);
                    //this.$show_modal.show_modal('comment_sent');
                });
            })
        }
        const verifierPayment = setInterval(() => { verifier() }, 3000)
        storeSelf.setPaymentVerifier(verifierPayment)
    },
    async getCities(data) {
        let storeSelf = this
        let country_code = data.code
        let self = data.self
        storeSelf.isLoadingCities = true
        //let locale = this.user.locale;
        await axios.get('/get-cities-by-country/'+country_code)
        .then(res => {
          storeSelf.isLoadingCities = false
            storeSelf.country_cities = res.data.cities
            storeSelf.country_cities.forEach((val, index) => {
                val.sortname = functions.removeAccentCharacter(val.name.toLowerCase())
            })
        })
        .catch(error => {
            console.log('error getCities', error)
            storeSelf.isLoadingCities = false
            functions.msg_box(self, 'error', i18n.global.t('message.info'), i18n.global.t('message.error_loading_cities'))
        });
    },
    getCountryNameByCode(code){
        let index = this.countries_db.findIndex(el => el.iso2 === code);
        let country = this.countries_db[index]
        let langue = languages.find(x=>x.code == this.locale)
        //console.log('getCountryNameByCode', country, this.locale, langue)
        if (langue == undefined) {
            return country.name
        }
        return country.translations[this.locale]
    },
    getCountryObjectByCode(code){
        let index = this.countries_db.findIndex(el => el.iso2.toLowerCase() === code.toLowerCase());
        return this.countries_db[index]
    },
    piPayment(data){
        let self = this
        
        const scopes = ['username', 'payments'];
        const axiosClient = axios.create({
            baseURL: import.meta.env.VITE_APP_BACKEND_URL,
            timeout: 20000,
            headers: {
               Authorization: 'Bearer ' + self.token, //the token is a variable which holds the token
               useruid: self.user.uid
            }
        });
        //const axiosClient = axios.create({baseURL: 'https://piketplace.com', timeout: 20000});
        const config = {headers: {'Content-Type': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow_Origin': '*'}};
        const onIncompletePaymentFound = (payment) =>{
            //console.log('onIncompletePaymentFound jn', payment);
            let txid = payment.transaction.txid;
            let paymentId = payment.identifier;
            let data = {
                paymentId:paymentId,
                txid:txid,
            }
            self.executePaymentCompletion(data)
        };

        ///////////////////////////////////////////////////////////////////////////////
        const onReadyForServerApproval = (paymentId) =>{
            //console.log('onReadyForServerApproval', paymentId);
            let res = axiosClient.post("/approve", { paymentId:paymentId }, config);
            //console.log('approve res', res);
            return res;
        };
        const onReadyForServerCompletion = (paymentId, txid) =>{
            //console.log('onReadyForServerCompletion', paymentId, txid);
            return axiosClient.post('/complete', { paymentId:paymentId, txid:txid }, config);
        };
        const onCancel = (paymentId) =>{
            //commit('CLEAR_PAYMENT_VERIFIER')
            //console.log('onCancel', paymentId);
            //return axiosClient.get('/cancel', { paymentId:paymentId }, config);
        };
        const onError = (error, payment) =>{
            //console.log('onError', error);
            if (payment) {
                //console.log(payment);
            }
        };

        /*Pi.authenticate(['payments'], onIncompletePaymentFound).then(function(auth) {
            console.log(auth.user.username);
            
        }).catch(function(error) {
          console.error(error);
        });*/

        Pi.createPayment({
          amount: data.amount,
          memo: data.memo, // e.g: "Digital kitten #1234",
          //metadata: { orderId: data.orderId, userId: data.userId, type: data.type }, // e.g: { kittenId: 1234 }
          metadata: data, // e.g: { kittenId: 1234 }
        }, {
          onReadyForServerApproval: onReadyForServerApproval,
          onReadyForServerCompletion: onReadyForServerCompletion,
          onCancel: onCancel,
          //onCancel: function(paymentId) { console.log('canc') },
          onError: onError,
          //onError: function(error, payment) { /* ... */ },
        });
    },
    executePaymentCompletion(data){
        let self = this
        //console.log('in incomplete function')
        let paymentId = data.paymentId
        let txid = data.txid
        const axiosClient = axios.create({
            baseURL: import.meta.env.VITE_APP_BACKEND_URL,
            timeout: 20000,
            headers: {
               Authorization: 'Bearer ' + self.token, //the token is a variable which holds the token
               useruid: self.user.uid
            }
        });
        //const axiosClient = axios.create({baseURL: 'https://piketplace.com', timeout: 20000});
        const config = {headers: {'Content-Type': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow_Origin': '*'}};

        axiosClient.post('/incomplete', { paymentId:paymentId, txid:txid }, config);

    },
    cancelPayment(data){
        let self = this
        let paymentId = data.paymentId
        let txid = data.txid
        const axiosClient = axios.create({
            baseURL: import.meta.env.VITE_APP_BACKEND_URL,
            timeout: 20000,
            headers: {
               Authorization: 'Bearer ' + self.token, //the token is a variable which holds the token
               useruid: self.user.uid
            }
        });
        //const axiosClient = axios.create({baseURL: 'https://piketplace.com', timeout: 20000});
        const config = {headers: {'Content-Type': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow_Origin': '*'}};

        axiosClient.post('/cancel', { paymentId:paymentId, txid:txid }, config);

    },
    validate_product_store(data){
        let selfStore = this
        let id = data.id
        let self = data.self
        let status = data.status
        data = {
            status: status,
            reasons: data.reasons,
        }
        if (status == "validated") {
            data = {
                status: status
            }
        }
        selfStore.saving = true
        selfStore.error = ''
        selfStore.http_request_status = ''
        axios.post('/validate-product/'+id, data)
          .then(res => {
              selfStore.saving = false
              selfStore.http_request_status = 'success'
              if (res.data.status) {
                  if (res.data.message=='already_validated') {
                      functions.msg_box(self, 'success', i18n.global.t('message.info'), i18n.global.t('message.already_validated'))
                  }else if(res.data.message=='already_rejected'){
                      functions.msg_box(self, 'success', i18n.global.t('message.info'), i18n.global.t('message.already_rejected'))
                  }else{
                      functions.msg_box(self, 'success', i18n.global.t('message.info'), i18n.global.t('message.saved'))
                  }
              }else{
                  selfStore.http_request_status = 'error'
                  functions.msg_box(self, 'error', i18n.global.t('message.info'), i18n.global.t('message.an_error_occured'))
              }
              //console.log('balance res.data', res.data);
          })
          .catch(err => {
              selfStore.saving = false
              selfStore.http_request_status = 'error'
              functions.msg_box(self, 'error', i18n.global.t('message.info'), i18n.global.t('message.an_error_occured'))
              selfStore.error = i18n.global.t('message.an_error_occured')
          })
    },
    submit_for_review_store(data){
        let selfStore = this
        let self = data.self
        selfStore.saving = true
        selfStore.http_request_status = ''
        axios.post('/submit-for-review/'+data.id)
          .then(res => {
              selfStore.saving = false
              selfStore.http_request_status = 'success'
              if (res.data.status) {
                  functions.msg_box(self, 'success', i18n.global.t('message.info'), i18n.global.t('message.submitted_for_review'))
              }else{
                  selfStore.http_request_status = 'error'
                  functions.msg_box(self, 'error', i18n.global.t('message.info'), i18n.global.t('message.an_error_occured'))
              }
              //console.log('balance res.data', res.data);
          })
          .catch(err => {
              selfStore.saving = false
              selfStore.http_request_status = 'error'
              functions.msg_box(self, 'error', i18n.global.t('message.info'), i18n.global.t('message.an_error_occured'))
              selfStore.error = i18n.global.t('message.an_error_occured')
          })
    },
    showMessage(payload) {
        let message = payload.message
        let confirm_func = payload.confirm_func
        confirm_func(
            {
              title: 'Info',
              message: message,
              button: {
                yes: 'OK'
              },
              html: true
                ,
                /**
                * Callback Function
                * @param {Boolean} confirm
                */
                callback: confirm => {
                  if (confirm) {
                  }
                }
            }
        )
    },
    /*async update_product_visibility(product_id, force_hide = false){
        let data = {
            product_id: product_id,
            force_hide: force_hide,
        }
        console.log("update_product_visibility", data)
        this.saving = true
        try{
            let res = await axios.post('/update-product-visibility', data)
            this.saving = false;
            if (res.data.status === true) {
                if (res.data.product && res.data.product.visible) {
                    functions.msg_box_new(this.confDialog, 'success', i18n.global.t('message.saved'), i18n.global.t("message.product_visible_now"))
                }else{
                    functions.msg_box_new(this.confDialog, 'success', i18n.global.t('message.saved'), i18n.global.t("message.product_hidden_now"))
                }
                return res.data.product
            }else if(res.data.message == "has_precommand"){
                let yes = i18n.global.t('message.continue')
                let btn = {
                    yes: yes,
                    no: i18n.global.t('message.confirmation.no_cancel'),
                }
                let img = '/site_images/confirm.PNG'
                let msg = i18n.global.t('message.this_product_contains_precommands')
                msg = msg+'<br>'+i18n.global.t('message.cancel_precommands_and_hide')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                this.confDialog({
                  title: i18n.global.t('message.info'),
                  message: msg,
                  button: btn,
                  html: true,
                    callback: async confirm => {
                        if (confirm) {
                            return await this.update_product_visibility(product_id, true)
                        }
                    }
                })
            }else{
                alert('fere')
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.an_error_occured"))
            }
        }catch(err){
            console.log(err)
            alert('in catch')
            this.saving = false;
            functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.an_error_occured"))
        }
    },*/
    update_memory_data(data){
        if (data.cart_data) {
            this.memory_data.cart_data = data.cart_data
        }
        if (data.index_data) {
            this.saved_products = data.index_data.products
            this.memory_data.index_data = data.index_data
        }
    },
    add_to_memory_cart(data){
        this.memory_data.cart_data.cart.unshift(data)//Add to array beginning
        //this.memory_data.cart_data.cart.push(data)
    },
    setReferrerUsername(val){
        let referred_by = document.getElementById('referred_by')
        if (referred_by!==null) {
            referred_by.value = val
        }
    },
    getReferrerUsername(){
        let referrer = ""
        let referred_by = document.getElementById('referred_by')
        if (referred_by!==null && referred_by.value!=='') {
            referrer = referred_by.value
        }
        return referrer
    },
    isoToEmoji(code){
      if (code == null) {return}
      return code
        .split('')
        .map(letter => letter.charCodeAt(0) % 32 + 0x1F1E5)
        .map(n => String.fromCodePoint(n))
        .join('')
    },
    showPiAds(type){
        //alert('showPiAds')
        let self = this
        if (type=="interstitial") {
            this.showPiAdsInterstitial()
            /*setTimeout(() => {
              self.showPiAdsInterstitial()
              console.log("Delayed for 1 second.");
            }, "10000");*/
            
        }else if (type=="rewarded"){
            this.showPiAdsRewarded()
            /*setTimeout(() => {
              self.showPiAdsRewarded()
              console.log("Delayed for 1 second.");
            }, "10000");*/
        }
    },
    async showPiAdsInterstitial(showMessage = true){
        /*if (this.pibrowser_verification && !this.isPiBrowser) {
            functions.msg_box_new(this.confDialog, 'info', i18n.global.t('message.info'), i18n.global.t('message.please_use_pi_browser'))
            return
        }*/
        //this.can_show_add = false
        //alert('Pi Ads showPiAdsInterstitial')
        const ready = await Pi.Ads.isAdReady("interstitial");
        //alert('Pi Ads ready '+JSON.stringify(ready))
        //console.log('Pi Ads ready', ready)
        //alert('Pi Ads start')
        if (ready.ready === false) {
            //alert('Pi Ads not ready, request again')
            const requestAdResponse = await Pi.Ads.requestAd("interstitial");
            //console.log('Pi Ads requestAd',  requestAdResponse)
            //alert('Pi Ads requestAdResponse '+JSON.stringify(requestAdResponse))
            /*if (requestAdResponse.result == "AD_LOADED") {
                this.can_show_add = true
            }*/
            if (showMessage) {
              if (requestAdResponse.result === "AD_LOADED") {
                  //
              }else if(requestAdResponse.result === "AD_FAILED_TO_LOAD"){
                  functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ad_failed_to_load"))
              }else if(requestAdResponse.result === "AD_NOT_AVAILABLE"){
                  functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
              }
            }
        }else{
            //alert('Pi Ads ready')
        }
        const showAdResponse = await Pi.Ads.showAd("interstitial");
        //console.log('Pi Ads showAdResponse', showAdResponse)
        //alert('Pi interstitial Ads showAdResponse '+JSON.stringify(showAdResponse))
        if (!showMessage) {
          return
        }
        if (showAdResponse.result === "AD_CLOSED") {
          //Nothing to do
        } else if(showAdResponse.result === "AD_NOT_AVAILABLE") {
            functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
        } else if(showAdResponse.result === "AD_NETWORK_ERROR") {
            functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.encountered_network_connection_issues"))
        } else if(showAdResponse.result === "AD_DISPLAY_ERROR") {
            functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ad_failed_to_be_displayed"))
        }
        /*if (this.can_show_add === true && showAdResponse.result != "AD_CLOSED") {
            this.can_show_add = false
        }*/
        /*if (showAdResponse.result != "AD_NOT_AVAILABLE"
         && showAdResponse.result != "AD_DISPLAY_ERROR"
          && showAdResponse.result != "AD_NETWORK_ERROR") {
            this.can_show_add = true
        }else{
            this.can_show_add = false
        }*/
        //alert('this.can_show_add '+this.can_show_add)
    },
    async showPiAdsRewarded(origin = ""){
        if (this.activate_pi_rewarded_ads === false) {
            return
        }
        /*if (this.pibrowser_verification && !this.isPiBrowser) {
            functions.msg_box_new(this.confDialog, 'info', i18n.global.t('message.info'), i18n.global.t('message.please_use_pi_browser'))
            return
        }*/
        try{
            const ready = await Pi.Ads.isAdReady("rewarded");
            //alert("ready "+JSON.stringify(ready))
            if (ready.ready !== true) {
                const requestAdResponse = await Pi.Ads.requestAd("rewarded");
                if (requestAdResponse.result === "ADS_NOT_SUPPORTED") {
                    // display modal to update Pi Browser
                    // showAdsNotSupportedModal()
                    //alert('rewarded ADS_NOT_SUPPORTED')
                    return;
                }
                if (requestAdResponse.result === "AD_LOADED") {
                    // display modal ads are temporarily unavailable and user should try again later
                    // showAdUnavailableModal()
                    //alert('rewarded AD_NOT_LOADED')
                    //functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
                    //return;
                }else if(requestAdResponse.result === "AD_FAILED_TO_LOAD"){
                    functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ad_failed_to_load"))
                }else if(requestAdResponse.result === "AD_NOT_AVAILABLE"){
                    functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
                }else {
                    functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.an_error_occured"))
                }
            }/*else{
                const requestAdResponse = await Pi.Ads.requestAd("rewarded");
            }*/
            const showAdResponse = await Pi.Ads.showAd("rewarded");
            if (this.user && this.user.username==="djedje00") {
                alert("showAdResponse "+JSON.stringify(showAdResponse))
            }
            //alert("showAdResponse "+JSON.stringify(showAdResponse))
            //alert('rewarded result '+showAdResponse.result)
            //alert('rewarded '+showAdResponse.adid+' - '+showAdResponse.adId)
            
            if (showAdResponse.result === "AD_REWARDED") {
                //alert("showAdResponse "+JSON.stringify(showAdResponse))
                //alert('rewarded adId '+showAdResponse.adid+' - '+showAdResponse.adId)
                // reward user logic, usually delegate rewarding user to your backend which would
                // firstly verify `adId` against Pi Platform API, then decide whether to reward the user
                // and rewarded user if the rewarded ad status is confirmed
                // e.g.:
                // const result = await rewardUserForWatchingRewardedAd(adId);
                // if (result.rewarded) {
                // showRewardedModal(result.reward)
                // } else {
                // showRewardFailModal(result.error)
                // }
                  let adId = showAdResponse.adId
                  const result = await this.rewardUserForWatchingRewardedAd(adId, origin);
            } else if(showAdResponse.result === "AD_CLOSED") {
                //functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
            } else if(showAdResponse.result === "AD_NOT_AVAILABLE") {
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ads_unavailable"))
            } else if(showAdResponse.result === "AD_NETWORK_ERROR") {
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.encountered_network_connection_issues"))
            } else if(showAdResponse.result === "AD_DISPLAY_ERROR") {
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.ad_failed_to_be_displayed"))
            } else if(showAdResponse.result === "USER_UNAUTHENTICATED") {
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.not_authenticated_try_again"))
                this.signInPiNetwork({isLoggedIn: true})
            } else {
                //alert('rewarded AD_NOT_REWARDED')
                // fallback logic
                // showAdErrorModal()
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.an_error_occured"))
            }
        }catch(err){
            //alert('catch error')
            //alert('catch error '+err.message)
            //alert('catch error '+JSON.stringify(err))
        }
    },
    rewardUserForWatchingRewardedAd(adId, origin = ""){
        if (origin === "rewarded-page") {
            this.saving = true;
            axios.post('/reward-user-ads', {adId: adId, failed_rewarded_ads: this.failed_rewarded_ads})
            .then(res => {
                this.saving = false;
                this.failed_rewarded_ads = []
                console.log('/reward-user-ads', res.data)
                this.rewarded_ads_data = res.data.ads_data
                this.activate_pi_rewarded_ads = res.data.activate_pi_rewarded_ads
                if (res.data.status === true) {
                    let self = this
                    //functions.msg_box_new(this.confDialog, 'success', i18n.global.t('message.info'), )
                    let img = '/site_images/success.png'
                    let msg = i18n.global.t("message.ad_successfully_rewarded")
                    msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                    this.confDialog(
                        {
                          title: i18n.global.t('message.info'),
                          message: msg,
                          button: {
                            yes: 'OK',
                          },
                          html: true,
                            callback: confirm => {
                                if (confirm) {
                                }
                                self.show_reward_gif = true
                                setTimeout(() => {
                                  self.show_reward_gif = false
                                }, "5000");
                            }
                        }
                    )
                }else if(res.data.message){
                    if (res.data.message.includes('an_error_occured') && res.data.data) {
                        this.failed_rewarded_ads.push({
                            adid: adId,
                            message: res.data.data
                        });
                    }
                    functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t(res.data.message))
                }
            })
            .catch(err => {
                functions.msg_box_new(this.confDialog, 'error', i18n.global.t('message.info'), i18n.global.t("message.an_error_occured"))
                this.saving = false;
                this.not_found = true;
            })
        }else{
            axios.post('/count-rewarded-ads/sfdtzfjfsjdshjdhjdsdh', {adId: adId, origin: origin, username: this.username})
            .then(res => {
                this.saving = false;
                this.failed_rewarded_ads = []
                console.log('/count-rewarded-ads', res.data)
                if (res.data.status === true) {
                    
                }else if(res.data.message){
                    if (res.data.message.includes('an_error_occured') && res.data.data) {
                        this.failed_rewarded_ads.push({
                            adid: adId,
                            message: res.data.data
                        });
                    }
                }
            })
            .catch(err => {
                this.saving = false;
                this.not_found = true;
            })
        }
    },
    sendFailedRewardedOnline(){
        if (this.user && this.user.username=="djedje00") {
            alert('in sendFailedRewardedOnline')
        }
        if(this.failed_rewarded_ads.length==0){return}
        axios.post('/send-failed-reward-user-ads', {failed_rewarded_ads: this.failed_rewarded_ads})
        .then(res => {
            console.log('/send-failed-reward-user-ads', res.data)
            if (res.data.status === true) {
                this.failed_rewarded_ads =[]
            }
        })
        .catch(err => {
        })
    }
    /*msg_box(type, title, msg){
        let img = '/site_images/info.PNG'
        let btn = {
            yes: 'OK'
        }
        if (type=='confirm') {
        }
        msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
        this.confDialog(
            {
              title: i18n.global.t('message.info'),
              message: msg,
              button: {
                yes: 'OK',
              },
              html: true,
                callback: confirm => {
                    if (confirm) {
                    }
                }
            }
        )
    }*/
  },
  persist: true,
})