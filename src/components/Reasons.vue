<template>
    <div id="reasons" class="menu menu-box-modal rounded-m content" data-menu-height="500" data-menu-width="350" style="display: block; min-height: 530px;width: 90%;margin: auto;">
        <!-- <h1 class="text-center mt-2">
            <i class="fa fa-2x fa-info-circle scale-box color-blue-dark shadow-xl rounded-circle"></i>
        </h1> -->
        <h4 class="text-center mt-3 font-700" style="margin-right: 10px;margin-left: 10px;">Raisons</h4>

        <div class="row mt-2 mb-0 me-3 ms-3" style="height: 500px;overflow: scroll;">
            <div class="col-12" v-for="(reason, index) in reasons[$i18n.locale]">
                <div class="form-check icon-check">
                    <input class="form-check-input" type="checkbox" name="inlineRadioOptions" :id="reason.code" v-model="reason.selected">
                    <label class="form-check-label" :for="reason.code">{{reason.text}}</label>
                    <i class="icon-check-1 far fa-circle color-gray-dark font-16"></i>
                    <i class="icon-check-2 far fa-check-circle font-16 color-piketplace"></i>
                </div>
            </div>
        </div>
        <div style="text-align: center;">
            <a @click="submit" class="btn btn-3d mb-1 rounded-xl font-700 shadow-s btn-dark-piketplace" style="font-size: 12px;">Continue</a>
        </div>
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'
    
    export default {
        data: function () {
            return {
                search: '',
                img: null,
                route: '',
            }
        },
        computed: {
            ...mapWritableState(useStore, ['reasons']),
        },
        mounted() {
            console.log("this.reasons[this.$i18n.locale]", this.reasons[this.$i18n.locale])
            this.choosed_reasons = this.reasons[this.$i18n.locale]
        },
        methods: {
            submit(){
                this.$hide_modal.hide_modal('reasons')
                console.log('rfff', this.choosed_reasons)
                this.$emit('updateReasons',this.reasons[this.$i18n.locale])
            }
        }
    }

    
</script>

<style scoped>
    .badge {
      position: relative;
      top: -63px;
      right: -16px;
      border-radius: 50%;
      background: red;
      color: white;
    }
</style>
