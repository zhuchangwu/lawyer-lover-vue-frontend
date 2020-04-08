<template>
    <div class="background-color"
         :style="{ backgroundImage: gradientColor }"
    ></div>
</template>

<script>
    export default {
        name: "BackgroundColor",
        props: {
            colors: {
                type: Array
            }
        },
        computed: {
            gradientColor () {
                const colorBottom = `color-stop(30%, ${this.colors[0]})`;
                const colorTop = `to(${this.colors[1]})`;
                return `-webkit-gradient(linear, left bottom, left top, ${colorBottom}, ${colorTop})`
            }
        }
    }
</script>

<style scoped>
    .background-color {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: opacity 0.5s ease;
        opacity: 1;
    }
</style>
