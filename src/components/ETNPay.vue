<template>
  <div>
    <div id="etn-pay" class="menu menu-box-modal rounded-m"  data-menu-effect="menu-over" style="display: block; min-height: 200px;width: 90%;">
        <div class="menu-title">
            
        </div>
        <div class="me-2 ms-3 mt-2 mb-3">
            <div style="text-align: right;">
                <i @click="$hide_modal.all()" class="fa fa-times-circle color-red-dark font-18" style=""></i>
            </div>
            <div class="pt-2" style="margin-bottom: 15px;">
                <img class="tw:sm:w-full tw:md:w-full tw:lg:w-1/2 tw:mx-auto" v-if="qrImgUrl!=''" :src="qrImgUrl" style="width: 300px; height: 300px;" @click="redirection">
                <img class="tw:w-[30px] tw:mx-auto" v-if="qrImgUrl!=''" src="/etn.png" @click="redirection">
                <a class="btn btn-margins btn-full btn-dark-piketplace font-13 btn-l font-600 mt-3 rounded-sm tw:mx-auto" @click="redirection">{{ $t('message.pay')}}</a>
            </div>
            <div class="clear"></div>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import { mapState, mapWritableState, mapActions } from 'pinia'
  import { useStore } from '../stores'

  export default {
    name: 'SwitchLocale',
    props: {
        link: {
            type: String,
            default () {
                return ""
            }
        },
        qrImgUrl: {
            type: String,
            default () {
                return ""
            }
        },
    },
    data() {
        return {
          //
        }
    },
    computed: {
        ...mapWritableState(useStore, ['isLoggedIn', 'user', 'locale', 'prevRoute', 'error']),
    },
    methods: {
      ...mapActions(useStore, ['']),
        redirection(){
            window.open("https://link.electroneum.com/jWEpM5HcxP?vendor=" + this.link, "_blank");
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