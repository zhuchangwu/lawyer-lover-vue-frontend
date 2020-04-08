<template>
    <div class="button" @click="handleClick">
        <i :class="[`${icon}`]" class="button-icon"></i>
        <span class="button-title">{{ title }}</span>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        props: {
            tab: {
                type: String,
                default: 'Ask'
            },
            icon: {
                type: String,
                default: 'comment'
            },
            title: {
                type: String,
                default: '问答咨询'
            }
        },
        computed: {
            ...mapState(['selected', 'unselect', 'onAsk'])
        },
        methods: {
            handleClick () {
                const appRect = document.querySelector('#app').getBoundingClientRect();
                const elRect = this.$el.getBoundingClientRect();
                const rect = {};
                const tab = this.tab;
                rect.top = elRect.top - appRect.top;
                rect.left = elRect.left - appRect.left;
                rect.width = elRect.width;
                rect.height = elRect.height;
                rect.appWidth = appRect.width;
                rect.appHeight = appRect.height;
                this.$store.commit('selectTab', { rect });
                this.$store.commit('setTab', tab)
            }
        }
    }
</script>

<style scoped>
    .button {
        width: 100%;
        height: 60px;
        background-color: #f8f8f8;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        padding-top: 12px;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transition-duration: 2s;
        will-change: transform;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }
    .button:hover {
        background-color: rgba(255, 255, 255, 0.87);
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.18);
    }
    .button-icon {
        font-size: 30px;
        color: #455a64;
        margin-right: 15px;
        margin-top: 2px;
        margin-left: -25px;
    }
    .button-title {
        font-size: 18px;
        margin-top: 5px;
        color: #37474f;
    }
</style>
