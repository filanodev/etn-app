<template>
<div>
    <div id="filter" class="menu menu-box-modal rounded-m"  data-menu-effect="menu-over" style="display: block; width: 95%; height: 450px;" :dir="locale=='ar'?'rtl':'ltr'">
        <div :class="locale=='ar'?'tw:text-left':'tw:text-right'" style="padding: 10px 10px 0;">
            <i @click="$hide_modal.all()" class="fa fa-times-circle color-red-dark font-18" style=""></i>
        </div>
        <h2 class="color-black font-900 font-18 text-center">{{$t('message.filter.text')}}</h2>
        <div class="m-auto" style="width: 90%;">
            <input type="text" class="mt-3" v-model="filter.search" :placeholder="$t('message.search_product')" style="display: inline;width: 100%;height: 40px;background-color: #ddd;border-radius: 21px;padding-right: 25px;padding-left: 15px;padding-top: auto;font-size: 14px !important;color: #000;border: 1px solid black;">
            <label class="color-black font-600 font-14 mt-3">{{$t('message.filter.sort_by_country')}}</label>
            <div style="padding-right: 5px;margin-bottom: 10px;display: inline-block;width: 100%;">
                <div class="" @click="display_country" style="background-color: #e9ecef;border-radius: 5px;padding: 0 10px;">
                    <label v-if="filter.iso2 && filter.iso2!=='all'" v-html="$functions.isoToEmoji(filter.iso2)" class="color-piketplace" style="margin-left: 2px;"></label>
                    <label v-else class="color-piketplace" style="margin-left: 2px;">{{ $t('message.select_country') }}</label>
                    <span><i class="fa fa-chevron-down" style="float: right;"></i></span>
                </div>
            </div>
            <div class="col-12">
                <SwitchRadioButton class="mt-2 mb-2" id="all" value="all" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.show_all')" v-model="filter.show_products_type" style="margin-top: 4px;line-height: 14px;" name="type_products" :checked="filter.show_products_type=='all'"/>
                <SwitchRadioButton class="mt-2 mb-2" id="show_products_shipping_on" value="show_products_shipping_on" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.filter.show_products_shipping_on')" v-model="filter.show_products_type" style="margin-top: 4px;line-height: 14px;" name="type_products" :checked="filter.show_products_type=='show_products_shipping_on'"/>
                <SwitchRadioButton class="mt-2 mb-2" id="show_only_digital_products" value="show_only_digital_products" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.filter.show_only_digital_products')" v-model="filter.show_products_type" style="margin-top: 4px;line-height: 14px;" name="type_products" :checked="filter.show_products_type=='show_only_digital_products'"/>
                <!-- <div class="form-check icon-check">
                    <input class="form-check-input" type="checkbox" value="" id="check3" checked="">
                    <label class="form-check-label font-600" for="check3" style="line-height: 18px;">
                        Show only products that the seller sets shipping on
                    </label>
                    <i class="icon-check-1 far fa-square color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-square font-16 color-piketplace"></i>
                </div> -->
            </div>
            <label class="color-black font-600 font-14">{{$t('message.filter.displayed_by')}}</label>
            <div class="col-12">
                <SwitchRadioButton class="mt-2 mb-2" id="newest" value="newest" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.filter.newest')" v-model="filter.sort_by" style="margin-top: 4px;line-height: 14px;" name="view_by" :checked="filter.sort_by=='newest'"/>
                <SwitchRadioButton class="mt-2 mb-2" id="oldest" value="oldest" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.filter.oldest')" v-model="filter.sort_by" style="margin-top: 4px;line-height: 14px;" name="view_by" :checked="filter.sort_by=='oldest'"/>
                <SwitchRadioButton class="mt-2 mb-2" id="random" value="random" label_color="#5b5757" label_font="font-300" label_font_size="font-12" :label="$t('message.filter.random')" v-model="filter.sort_by" style="margin-top: 4px;line-height: 14px;" name="view_by" :checked="filter.sort_by=='random'"/>
                <!-- <div class="form-check icon-check">
                    <input class="form-check-input" type="radio" name="view_by" value="newest" id="Newest" v-model="filter.sort_by">
                    <label class="form-check-label" for="Newest">{{$t('message.filter.newest')}}</label>
                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                </div>
                <div class="form-check icon-check">
                    <input class="form-check-input color-piketplace" type="radio" name="view_by" value="oldest" id="Oldest" v-model="filter.sort_by">
                    <label class="form-check-label" for="Oldest">{{$t('message.filter.oldest')}}</label>
                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                </div>
                <div class="form-check icon-check">
                    <input class="form-check-input color-piketplace" type="radio" name="view_by" value="random" id="Random" v-model="filter.sort_by">
                    <label class="form-check-label" for="Random">{{$t('message.filter.random')}}</label>
                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                </div> -->
            </div>
            <div class="text-center mt-2">
                <button class="btn btn-dark-piketplace" @click="apply">{{$t('message.filter.text')}}</button>
            </div>
        </div>
    </div>
    <SelectCountry @propagation_country="selected_one"/>
</div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    import SwitchButton from '../components/SwitchButton.vue'
    import SwitchRadioButton from '../components/SwitchRadioButton.vue'

    import SelectCountry from './SelectCountry.vue'

    export default {
        components: {
            SwitchButton,
            SwitchRadioButton,
            SelectCountry,
        },
        props:{
            amount: {
                type: Number,
                default () {
                    return 0
                }
            },
            type: {
                type: String,
                default () {
                    return ""
                }
            },
        },
        data: function () {
            return {
                /*filter: {
                    search: "",
                    country: null,
                    sort_by: "newest",
                    show_products_shipping_on: false,
                }*/
            }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving', 'connecting', 'disconnecting', 'isLoading', 'deleting', 'searching', 'selected_country', 'filter', 'locale']),
        },
        mounted() {
            //console.log(this.user)
        },
        methods: {
            ...mapActions(useStore, ['setFilter', 'resetFilter', 'setSelectedCountry']),
            display_country(){
                this.$hide_modal.hide_modal('filter')
                this.$show_modal.show_modal({id: 'select-country'})
            },
            apply(){
                this.setFilter(this.filter)
                this.$hide_modal.hide_modal('filter')
                this.$emit('filter_update', this.filter)
                console.log("this.filter", this.filter)
            },
            selected_one(ss){
                console.log('selected_one filter', ss)
            }
        },
        watch: {
            selected_country(newVal, oldVal){
                //if (oldVal!==undefined) {return}
                //if (newVal===undefined) {return}
                this.$hide_modal.hide_modal('select-country')
                this.$show_modal.show_modal({id: 'filter'})
                //alert('selected_country')
                console.log("selected_country", newVal)
                let country = newVal

                let country_code = country==null?'all':country.iso2
                this.setFilter({
                    search: this.filter.search,
                    category: this.filter.category,
                    show_products_type: this.filter.show_products_type,
                    iso2: country_code,
                    iso3: country==null?'all':country.iso3,
                    is_updated: true
                })
                /*this.filter.iso2 = country_code
                this.filter.iso3 = country==null?'all':country.iso3
                this.filter.is_updated = true*/
                if (oldVal===null) {
                    //this.setFilter(this.filter)
                }
                //this.setSelectedCountry(undefined)
                //this.setCountryProductSearch(country)
                //this.load_country(country_code)
            },
        }
    }

    
</script>

<style scoped>
    
</style>
