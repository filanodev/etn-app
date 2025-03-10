<template>
  <div>
    <div id="select-country" class="menu menu-box-bottom rounded-m" data-menu-height="465" data-menu-effect="menu-over" style="display: block; height: 365px;">
        <div class="menu-title">
            <h1 class="font-24 color-highlight">{{ $t('message.select_country') }}</h1>
            <a href="#" class="close-menu"><i class="fa fa-times-circle"></i></a>
        </div>
        <div class="me-4 ms-3 mt-2">
            <div class="">
                <input type="text"  v-model="keyword" style="display: inline;width: 100%;height: 35px;background-color: rgba(255,255,255,0.7);border-radius: 21px;padding-right: 25px;padding-left: 10px;"><i class="fas fa-search" style="margin-left: -20px;"></i>
            </div>
            <div class="list-group list-custom-small" v-if="countries.length > 0">
                <a :data-country-id="country.id" :data-country-libelle="country.libelle" href="#" class="close-menu" v-for="country in countries" :key="country.id" v-on:click="select_country(country.id)">
                  
                  <span>{{country['libelle'+($i18n.locale=='fr'?'':'En')]}}</span>
                  <i class="fa fa-check-circle"></i>
                </a>
            </div>
            <div class="clear"></div>
        </div>
        <input type="hidden" id="caller_id" name="">
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: null,
            countries: [],
            user: null,
        };
    },
    mounted() {
        //this.user = this.$session.get('user');
        this.getResults();
    },
    watch: {
        keyword(after, before) {
            this.getResults();
        }
    },
    methods: {
        getResults() {
            //let locale = this.user.locale;
            let locale = this.$i18n.locale;
            axios.get('/livesearch-country', { params: { keyword: this.keyword, locale } })
                .then(res => this.countries = res.data)
                .catch(error => {});
            import.meta.glob('../../../public/template/scripts/bootstrap.min.js');
            
            const _0x77b9x42 = document[_0x962d[24]](_0x962d[119]);
            _0x77b9x42[_0x962d[22]]((_0x77b9xc) => {
                return _0x77b9xc[_0x962d[37]](_0x962d[64], (_0x77b9xb) => {
                    const _0x77b9x37 = document[_0x962d[24]](_0x962d[101]);
                    for (let _0x77b9xa = 0; _0x77b9xa < _0x77b9x37[_0x962d[12]]; _0x77b9xa++) {
                        _0x77b9x37[_0x77b9xa][_0x962d[4]][_0x962d[18]](_0x962d[16]);
                    }
                    for (let _0x77b9xa = 0; _0x77b9xa < _0x77b9x36[_0x962d[12]]; _0x77b9xa++) {
                        _0x77b9x36[_0x77b9xa][_0x962d[20]][_0x962d[112]] = _0x962d[115] + 0 + _0x962d[114];
                    }
                });
            });
        },
        select_country(id){
            let libelle = $('a[data-country-id='+id+']').attr('data-country-libelle')
            let src = $('a[data-country-id='+id+']').attr('data-country-src')
            let id_caller = $('#caller_id').val()
            $('#'+id_caller+'_country_selected_id').val(id)
            //$('#country_selected_id').val(id)
            $('#'+id_caller+'_country_selected_label').html(libelle)

            $('#'+id_caller+'_required-countries_id').css('display', 'none')
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