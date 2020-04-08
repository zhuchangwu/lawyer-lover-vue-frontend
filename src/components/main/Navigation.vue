<template>
    <div class="navigation">
        <!--通过tab控制跳往哪个子组件-->
        <navigator-button tab="Ask" title="问答咨询" icon="far fa-comment"/>
        <navigator-button tab="Infer" title="案情推断" icon="far fa-compass"/>
        <navigator-button tab="Legal" title="文书查询" icon="fas fa-search"/>
    </div>
</template>

<script>
    import NavigatorButton from "@/components/main/NavigatorButton";
    export default {
        name: "Navigation",
        components: {
            NavigatorButton,
        },
    }
</script>

<style scoped>
    .navigation {
        width: 100%;
        display: flex;
        align-content: center;
        padding: 0 40px;
        margin-top: 25px;
        justify-content: flex-start;
        flex-wrap: wrap;
        transition: all 0.5s ease;
        color: #fefefe;
    }
</style>
