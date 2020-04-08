<template>
    <div class="background">
        <background-color :colors="setting.color"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import BackgroundColor from "@/components/background/BackgroundColor";
    export default {
        name: "Background",
        components: {
            BackgroundColor
        },
        computed: {
            ...mapState(['setting'])
        }
    }
</script>

<style scoped>
    .background {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }
</style>
