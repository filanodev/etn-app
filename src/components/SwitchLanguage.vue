<template>
  <div>
    <div id="menu-language" class="menu menu-box-modal rounded-m"  data-menu-effect="menu-over" style="display: block; min-height: 200px;width: 90%;">
        <div class="menu-title">
            
        </div>
        <div class="me-2 ms-3 mt-2 mb-3">
            <div style="text-align: right;">
                <i @click="$hide_modal.all()" class="fa fa-times-circle color-red-dark font-18" style=""></i>
            </div>
            
            <!-- <div class="list-group list-custom-small" style="margin-bottom: 15px;">
                <a v-for="lang in languages.filter(x=>x.active===true)" @click="update_selected_category_translate(lang.code)" class="close-menu">
                  <img class="me-3 mt-2 tw:inline" :src="'/images/flags/'+lang.flag" style="width:32px;height:32px;">
                  <span>{{lang.name}}</span>
                  <i v-if="$i18n.locale==lang.code" class="fa fa-check-circle" style="color:green;"></i>
                </a>
            </div> -->
            <div class="pt-2" style="margin-bottom: 15px;">
                <div v-for="lang in languages.filter(x=>x.active===true)" @click="update_selected_category_translate(lang.code)" class="close-menu mt-2 tw:align-top" style="width: 32%;display: inline-block;line-height: 16px;">
                  <img class="" :src="'/flags/'+lang.flag" style="width:32px;height:32px;border-radius: 50%;">
                  <span class="me-1 tw:align-text-top">{{lang.name}}<i v-if="$i18n.locale==lang.code" class="fa fa-check-circle ms-1" style="color:green;"></i></span>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>

    <!-- <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang">
          {{ lang }}
      </option>
    </select> -->

  </div>
</template>

<script>
  import axios from 'axios';

  import { mapState, mapWritableState, mapActions } from 'pinia'
  import { useStore } from '../stores'

  export default {
    name: 'SwitchLocale',
    data() {
        return { 
            /*langs: ['en', 'cn', 'es', 'fr'],
            user:null,
            isLoggedIn:true,
            isLoading:true,*/
        }
    },
    computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error', 'isLoading', 'languages']),
    },
    methods: {
      ...mapActions(useStore, ['setLang']),
        update_selected_category_translate(lang){
          this.$hide_modal.hide_modal('menu-language')
          this.$i18n.locale = lang;
          
          this.setLang(lang)
          if (!this.isLoggedIn) {return}
          this.user.locale = lang;
          /*let tr = $('#titre').attr('data-translate')
          $('#titre').html(this.$t(tr))*/
          axios.post('/switchLocale', {lang:lang})
            .then(res => {
                //console.log(data);
            })
            .catch(error => {
              console.log(error)
            });
            setTimeout(function() {
                /*let id = $('#category_selected_id').val()
                let libelle = $('a[data-category-id='+id+']').attr('data-category-libelle')
                $('#category_selected_label').html(libelle)*/
            }, 100)
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