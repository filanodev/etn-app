<template>
    <div class="d-flex no-effect" role="button" aria-expanded="false">
        <div dir="ltr" class="me-4 pe-2">
            <div class="custom-control ios-switch" style="padding-left: 0!important;margin-top: 0px!important;">
                <input type="checkbox" class="ios-input" :id="id" @input="(event) => $emit('update:checked',event.target.checked)" :checked="checked" :required="required">
                <label :for="id" class="custom-control-label"></label>
            </div>
        </div>
        <div v-if="show_label" class="" style="margin-left: 5px;padding-top: 0px;">
            <label :for="id" class="" style="cursor: pointer;" :style="label_color=='' || label_color==undefined?'':'color:'+label_color+'!important'" :class="label_color=='' || label_color==undefined?'color-piketplace':'',label_font=='' || label_font==undefined?'font-600':label_font,label_font_size=='' || label_font_size==undefined?'font-10':label_font_size">{{label}}</label>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>

<script>
    export default{
        components: {
        },
        props: {
            checked: {
                type: Boolean,
                default () {
                  return true
                }
            },
            required: {
                type: Boolean,
                default () {
                  return false
                }
            },
            label: {
                type: String,
                defaut: "",
            },
            id: {
                type: String,
                defaut: "",
            },
            show_label: {
                type: Boolean,
                default () {
                  return true
                }
            },
            label_color: {
                type: String,
                defaut: "",
            },
            label_font: {
                type: String,
                defaut: "",
            },
            label_font_size: {
                type: String,
                defaut: "font-10",
            },
        },
        data: function () {
        return {
            switched_compute: false,
        }
      },
      computed: {
        isLoading:{
            get(){
                return this.$store.state.isLoading
            },
            set(val){
                this.$store.state.isLoading = val
            }
        },
        user:{
            get(){
                return this.$store.state.user
            },
            set(val){
                this.$store.state.user = val
            }
        },
        business_profile:{
            get(){
                return this.$store.state.business_profile
            },
            set(val){
                this.$store.state.business_profile = val
            }
        },
      },
        /*mounted() {
            this.switched_compute = this.checked
            alert(this.label_color)
        },*/
        watch: {
        },
        methods: {
        }
    }
</script>

<style scoped>

    .ios-switch label::after {
      font-family: 'Font Awesome 5 Free';
      content: "\f111";
      font-weight: 900; /* <-- add this */
      color: #fff;
      display: block !important;
      margin-top: -20px;
      z-index: 6;
      width: 20px !important;
      height: 20px !important;
      padding-left: 2px;
      transition: all 250ms ease;
      border-radius: 50px !important;
      background-color: v-bind(checked===true?'#a63289':'#828282');
      border-color: v-bind(checked===true?'#a63289':'#828282');
      /*border: solid 1px #a63289;*/
      transition: all 250ms ease;
      line-height: 18px;
    }

    .ios-switch label::before {
      content: "";
      display: block !important;
      background-color: #F1F7FF;
      pointer-events: all;
      margin-top: -5px;
      margin-left: -1px;
      width: 40px !important;
      height: 20px !important;
      /*border: solid 1px #a63289;*/
      border-color: v-bind(checked===true?'#a63289':'#828282');
      border-radius: 50px !important;
      transition: all 250ms ease;
    }

    .ios-input:checked ~ .custom-control-label::before {
      background-color: #F1F7FF !important;
    }
</style>
