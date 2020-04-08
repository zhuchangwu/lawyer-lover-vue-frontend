<template>
    <div class="carousel">
        <p class="heading-1">智能</p>
        <p class="heading-2">法律助手</p>
        <p class="heading-3">Smart Legal Assistant</p>
    </div>
</template>

<script>
    export default {
        props: {
        },
    };
</script>

<style scoped>
    .carousel {
        display: flex;
        padding: 0 40px;
        height: 220px;
        justify-content: flex-end;
        flex-direction: column;
        transition: all 0.5s ease;
        color: #fefefe;
        text-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
    }
    .heading-1 {
        font-size: 48px;
        opacity: 95%;
        font-weight: 200;
        margin: 0;
    }
    .heading-2 {
        font-size: 40px;
        opacity: 95%;
        font-weight: 300;
        margin:0;
    }
    .heading-3 {
        opacity: 90%;
        font-size: 25px;
        font-weight: 200;
        margin: 0;
    }
</style>
