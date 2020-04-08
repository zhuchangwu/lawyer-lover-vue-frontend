<template>
    <div class="bar text-shadow" :class="[`${color}`]">
        <span @click="$emit('left')">
            <i :class="['fas', `fa-${left}`]"></i>
        </span>
        <span>{{ title }}</span>
        <span @click="$emit('right')">
            <i :class="['fas', `fa-${right}`]"></i>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            left: {
                type: String,
                default: ''
            },
            right: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: 'font-white'
            }
        }
    }
</script>

<style scoped>
    .bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 54px;
        font-size: 18px;
        z-index: 1;
        padding: 0 15px;
        transition-duration: 250ms;
    }

    span {
        padding: 5px 5px;
    }

    .font-white {
        color: #fefefe;
        text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.15);
    }

    .font-dark {
        color: #37474f;
        text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
    }
</style>
