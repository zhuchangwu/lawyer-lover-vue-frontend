<template>
    <div>
        <bar title="法律助手" left="bars" right="search" color="font-white" />
        <carousel />
        <navigation />
        <ask-home />
        <infer-home />
        <legal-home />
        <background />
    </div>
</template>

<script>
    import Background from "@/components/background/Background";
    import Carousel from "@/components/carousel/Carousel";
    import Bar from "@/components/bar/Bar";
    import Navigation from "@/components/main/Navigation";
    import AskHome from "@/components/main/ask/AskHome";
    import InferHome from "@/components/main/infer/InferHome";
    import LegalHome from "@/components/main/legal/LegalHome";
    import {mapState} from 'vuex'

    export default {
        name: "Home",
        components: {
            LegalHome,
            InferHome,
            Navigation,
            Background,
            Carousel,
            Bar,
            AskHome
        },
        computed: {
            ...mapState(['currentTab'])
        },
        watch: {
            currentTab() {
                let metaThemeColor = document.querySelector("meta[name=theme-color]");
                if(this.currentTab === 'Home') {
                    metaThemeColor.setAttribute("content", "#ffa947");
                } else {
                    setTimeout(() => {
                        if(this.currentTab === 'Ask') {
                            metaThemeColor.setAttribute("content", "#12D8FA");
                        } else if(this.currentTab === 'Infer') {
                            metaThemeColor.setAttribute("content", "#3ba675");
                        }
                    }, 400);
                }
            }
        }
    }
</script>
<style>
    * {
        box-sizing: border-box!important;
    }
</style>
