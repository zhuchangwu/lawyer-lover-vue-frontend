<template>
    <!--todo 问王灿这个动画 -->
    <transition name="show" @enter="handleEnter" @leave="handleLeave">
        <div id="ask-home" class="ask-home" v-if="selected&&(currentTab=='Ask')">
            <bar id="app-bar" class="app-bar" :color="barColor" @left="unselectTab" left="arrow-left"/>
            <div class="ask-content">
                <div class="ask-heading">
                    <i class="fas fa-microphone-alt ask-icon"></i>
                    <search-bar class="search-bar" type="input" v-on:result="handleAskChange" mode="ask" />
                    <h1 class="ask-title">问答咨询</h1>
                </div>
                <div id="ask-list" class="ask-list">
                    <home-card class="home-card" v-for="(ask,index) in asks" :key="index"  :theId="index" :title="ask.questionName" :content="ask.answers" />
                </div>
                <div class="ask-footer">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Bar from "@/components/bar/Bar";
    import SearchBar from "@/components/utils/SearchBar";
    import HomeCard from "@/components/utils/HomeCard";

    export default {
        name: "AskHome",
        components: {
            HomeCard,
            Bar,
            SearchBar
        },
        data: function () {
            return {
                barColor: 'font-white',
                asks: null,
            }
        },
        computed: {
            // 取出vuex中的值，且可以直接使用
            ...mapState(['selected', 'unselect', 'currentTab'])
        },
        watch: {
            currentTab() {
                if(this.currentTab === "Ask") {
                    window.addEventListener('scroll', this.handleScroll, true);
                } else {
                    window.removeEventListener('scroll', this.handleScroll, true);
                }
            }
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
            handleScroll () {
                const askHome = document.getElementById("ask-home");
                if(askHome) {
                    if(askHome.scrollTop > 275) {
                        this.barColor = 'font-dark';
                    } else if(askHome.scrollTop < 275) {
                        this.barColor = 'font-white';
                    }
                }
            },
            handleAskChange (asks) {
                this.asks = asks;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .ask-home {
        position: fixed;
        border-radius: 0;
        color: #444;
        background-color: #f8f8f8;
        padding: 0 12px;
        will-change: top, left, width, height;
        overflow: auto;
    }

    .ask-home::-webkit-scrollbar {
        display: none;
    }

    .app-bar {
        width: 100%;
        position: fixed;
    }

    .ask-heading {
        width: calc(100% + 60px);
        height: 349px;
        color: #fff;
        background: #1FA2FF;
        text-align: center;
        text-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
        background: -webkit-linear-gradient(to top, #1FA2FF, #12D8FA);
        background: linear-gradient(to top, #1FA2FF, #12D8FA);
        margin-top: -54px;
        margin-left: -30px;
        margin-right: -30px;
        padding: 30px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column-reverse;
    }

    .ask-heading h1 {
        font-weight: 400;
    }

    .search-bar {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .ask-icon {
        font-size: 30px;
        color: #fafafa;
    }

    .home-card {
        margin-bottom: 12px;
    }

    .home-card:first-of-type {
        margin-top: 20px;
    }

    .ask-footer {
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

        .ask-home {
            padding: 0 20px;
        }

        .ask-home,
        .app-bar,
        .ask-content {
            opacity: 1;
            transform: translate3d(0, 0px, 0);
        }

        .ask-title {
            font-size: 2rem;
        }
    }

    .show-leave-to,
    .show-enter {
        border-radius: 30px;

        .ask-home {
            padding: 0;
        }

        .ask-home,
        .app-bar,
        .ask-content{
            opacity: 0;
            transform: translate3d(0, -40px, 0);
        }

        .ask-title {
            font-size: 1.5rem;
        }
    }

    .show-enter-active,
    .show-leave-active {
        transition: all 0.5s ease;

        .ask-home,
        .app-bar,
        .ask-content,
        .ask-title {
            transition: all 0.5s ease;
        }
    }
</style>
