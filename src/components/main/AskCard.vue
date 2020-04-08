<template>
    <div class="ask-card">

    </div>
</template>

<script>
    export default {
        name: "AskCard"
    }
</script>

<style scoped>
    .ask-card {
        width: 100%;
        height: 60px;
        background-color: rgba(255, 255, 255, 0.80);
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        padding-top: 12px;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transition-duration: 2s;
        will-change: transform;
    }
</style>
