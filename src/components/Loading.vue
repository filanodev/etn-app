<template>
    <div v-if="deleting || saving || connecting || disconnecting || searching" class="loader-background" style="z-index: 11;">
        <div style="text-align: center;width: 100%;margin-top: 150px;">
            <img src="/site_images/transparent-gif/loading3.gif" style="width: 75px;margin-top: 20px;border-radius: 10%;" class="m-auto">
            <span class="color-white" v-if="searching">Searching...</span>
        </div>
    </div>
</template>

<script>
    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        data: function () {
            return {
            }
        },
        computed: {
            ...mapWritableState(useStore, ['isLoggedIn', 'user', 'saving', 'connecting', 'disconnecting', 'isLoading', 'deleting', 'searching']),
        },
        mounted() {
            //console.log(this.user)
        },
        methods: {
        }
    }

    
</script>

<style scoped>
    
</style>
