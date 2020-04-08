<template>
    <transition name="show" @enter="handleEnter" @leave="handleLeave">
        <div class="infer-home" v-if="selected&&(currentTab=='Infer')">
            <bar id="app-bar" class="app-bar" :color="barColor" @left="unselectTab" left="arrow-left"/>
            <div class="infer-content">
                <div class="infer-heading">
                    <i v-if="loading" class="fas fa-5x fa-spin fa-spinner infer-icon"></i>
                    <i v-else class="fas fa-microphone-alt infer-icon"></i>
                    <search-bar class="search-bar" type="area" v-on:result="handleInferResult" mode="infer" v-on:loading="handleLoading" />
                    <h1 class="infer-title">案情推断</h1><br>
                </div>
                <div id="infer-list" class="infer-list">
                    <home-card class="home-card" v-for="(infer, index) in data"  :theId="index" :key="index" :title="title(index)" :content="infer" />
                </div>
                <div class="infer-footer">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import Bar from "@/components/bar/Bar";
    import SearchBar from "@/components/utils/SearchBar";
    import HomeCard from "@/components/utils/HomeCard";

    export default {
        name: "InferHome",
        components: {
            HomeCard,
            Bar,
            SearchBar
        },
        data: function () {
            return {
                barColor: 'font-white',
                data: null,
                crime: null,
                loading: false
            }
        },
        computed: {
            ...mapState(['selected', 'unselect', 'currentTab']),
        },
        methods: {
            ...mapMutations(['unselectTab']),
            handleEnter(el) {
                Object.assign(el.style, {
                    top: `${this.selected.rect.top}px`,
                    left: `${this.selected.rect.left}px`,
                    width: `${this.selected.rect.width}px`,
                    height: `${this.selected.rect.height}px`
                });
                setTimeout(() => {
                    Object.assign(el.style, {
                        top: 0,
                        left: 0,
                        width: `${this.selected.rect.appWidth}px`,
                        height: `${this.selected.rect.appHeight}px`
                    })
                }, 0)
            },
            handleLeave(el) {
                Object.assign(el.style, {
                    top: 0,
                    left: 0,
                    width: `${this.unselect.rect.appWidth}px`,
                    height: `${this.unselect.rect.appHeight}px`
                });
                setTimeout(() => {
                    Object.assign(el.style, {
                        top: `${this.unselect.rect.top}px`,
                        left: `${this.unselect.rect.left}px`,
                        width: `${this.unselect.rect.width}px`,
                        height: `${this.unselect.rect.height}px`
                    })
                }, 0)
            },
            handleLoading(data) {
                this.loading = data;
            },
            handleInferResult(data) {
                delete data.id;
                this.crime = data.crimeName;
                delete data.crimeName;
                this.data = data;
                this.loading = false;
            },
            title(index) {
                if(index==='concept') {
                    return '罪名解释'
                } else if(index==='feature') {
                    return '罪名特征'
                } else if(index==='rending') {
                    return '定罪条件'
                } else if(index==='punish') {
                    return '量刑区间'
                } else if(index==='laws') {
                    return '有关法条'
                }
                return undefined;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .infer-home {
        position: fixed;
        border-radius: 0;
        color: #444;
        background-color: #f8f8f8;
        padding: 0 12px;
        will-change: top, left, width, height;
        overflow: auto;
    }

    .infer-home::-webkit-scrollbar {
        display: none;
    }

    .app-bar {
        width: 100%;
        position: fixed;
    }

    .infer-heading {
        width: calc(100% + 60px);
        height: 450px;
        color: #fff;
        background: #2c7d59;
        text-align: center;
        text-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
        background: -webkit-linear-gradient(to top, #2c7d59, #3ba675);
        background: linear-gradient(to top, #2c7d59, #3ba675);
        margin-top: -54px;
        margin-left: -30px;
        margin-right: -30px;
        padding: 30px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column-reverse;
    }

    .infer-heading h1 {
        font-weight: 400;
    }

    .search-bar {
        margin-top: 15px;
        margin-bottom: 45px;
    }

    .infer-icon {
        font-size: 35px;
        color: #fafafa;
        margin-bottom: 30px;
    }

    .home-card {
        margin-bottom: 12px;
    }

    .home-card:first-of-type {
        margin-top: 20px;
    }

    .infer-footer {
        width: 100%;
        height: 60px;
        padding-top: 15px;
        padding-bottom: 20px;
        font-size: 15px;
        color: #37474f;
        text-align: center;
    }

    .show-enter-to,
    .show-leave {
        border-radius: 0;

        .infer-home {
            padding: 0 20px;
        }

        .infer-home,
        .app-bar,
        .infer-heading,
        .infer-content {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    .show-leave-to,
    .show-enter {
        border-radius: 30px;

        .infer-home {
            padding: 0;
        }

        .infer-home,
        .app-bar,
        .infer-heading,
        .infer-content{
            opacity: 0;
            transform: translate3d(0, -40px, 0);
        }
    }

    .show-enter-active,
    .show-leave-active {
        transition: all 0.5s ease;

        .infer-home,
        .app-bar,
        .infer-heading,
        .infer-content{
            transition: all 0.5s ease;
        }
    }
</style>
