<template>
  <div>
    <div id="select-category" class="menu menu-box-bottom rounded-m" data-menu-effect="menu-over" style="display: block;">
        <div class="menu-title">
            <h1 class="font-24 color-piketplace">{{$t('message.choose_category')}}</h1>
            <a class="close-menu" @click="$hide_modal.all()"><i class="fa fa-times-circle"></i></a>
        </div>
        <div class="me-4 ms-3 mt-1">
            <div class="list-group list-custom-small" v-if="categories.length > 0">
                <a :data-category-id="category.id" :data-category-libelle="$t('message.categories.'+category.code)" :data-category-src="'categories/'+category.img" class="categorie close-menu" v-for="category in categories" :key="category.id" v-on:click="select_category(category)">
                  <!-- <img class="me-3 mt-1" :src="'images/'+category.img"> -->
                  <label class="" style="width: 50px;">
                          <i v-if="category.icons" v-for="icon in category.icons.split(';')" class="font-10" :class="icon" style="line-height: -1; float: none;margin-top: 0;margin-right: 0;opacity: 1;width: auto;"></i>
                  </label>
                  <span style="margin-left: 10px;">{{$t('message.categories.'+category.code)}}</span>
                  <i v-if="selected_category && selected_category.id == category.id" class="fa fa-check-circle color-piketplace"></i>
                </a>
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
        };
    },
    computed: {
        ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'user', 'categories', 'selected_category', 'publish_form']),
    },
    mounted() {
        //this.getResults();
    },
    watch: {
        keyword(after, before) {
            //this.getResults();
        }
    },
    methods: {
        ...mapActions(useStore, ['setSelectedCategory']),
        getResults() {
            axios.get('/api/v1/livesearch-category', { params: { keyword: this.keyword } })
                .then(res => this.categories = res.data)
                .catch(error => {});
        },
        select_category(selected_category){
            this.setSelectedCategory(selected_category)
            this.$hide_modal.hide_modal('select-category');
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
.list-custom-small img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.list-custom-small {
  line-height: 38px;
}
</style>