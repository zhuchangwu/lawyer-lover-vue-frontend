<template>
    <transition name="show" @enter="handleEnter" @leave="handleLeave">
        <div class="legal-home" v-if="selected&&(currentTab=='Legal')">
            <bar id="app-bar" class="app-bar" :color="barColor" @left="unselectTab" left="arrow-left"/>
            <div class="legal-content">
                <div class="legal-heading">
                    <form class="upload-form">
                        <a href="#"><i class="fas fa-upload legal-icon"></i></a>
                        <Upload class="upload" />
                    </form>
                    <h1 class="legal-title">查询相似文书</h1>
                </div>
                <div id="legal-list" class="legal-list">
                    <home-card class="home-card" />
                </div>
                <div class="legal-footer">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Bar from "@/components/bar/Bar";
    import HomeCard from "@/components/utils/HomeCard";
    import Upload from "@/components/utils/Upload";

    export default {
        name: "LegalHome",
        components: {
            HomeCard,
            Bar,
            Upload
        },
        data: function () {
            return {
                barColor: 'font-white',
            }
        },
        computed: {
            ...mapState(['selected', 'unselect', 'currentTab'])
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .legal-home {
        position: fixed;
        border-radius: 0;
        color: #444;
        background-color: #f8f8f8;
        padding: 0 12px;
        will-change: top, left, width, height;
        overflow: auto;
    }

    .legal-home::-webkit-scrollbar {
        display: none;
    }

    .app-bar {
        width: 100%;
        position: fixed;
    }

    .upload {
        margin: 20px 0;
    }

    .legal-heading {
        width: calc(100% + 60px);
        height: 350px;
        color: #fff;
        background: #6e18e1;
        text-align: center;
        text-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
        background: -webkit-linear-gradient(to top, #4A00E0, #8E2DE2);
        background: linear-gradient(to top, #4A00E0, #8E2DE2);
        margin-top: -54px;
        margin-left: -30px;
        margin-right: -30px;
        padding: 30px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column-reverse;
    }

    .upload-form {
        display: flex;
        flex-direction: column-reverse;
    }

    .legal-heading h1 {
        font-weight: 400;
    }

    .search-bar {
        margin-top: 15px;
        margin-bottom: 45px;
    }

    .legal-icon {
        font-size: 30px;
        color: #fafafa;
        margin-bottom: 5px;
    }

    .home-card {
        margin-bottom: 12px;
    }

    .home-card:first-of-type {
        margin-top: 20px;
    }

    .legal-footer {
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

        .legal-home {
            padding: 0 20px;
        }

        .legal-home,
        .app-bar,
        .legal-heading,
        .legal-content {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    .show-leave-to,
    .show-enter {
        border-radius: 30px;

        .legal-home {
            padding: 0;
        }

        .legal-home,
        .app-bar,
        .legal-heading,
        .legal-content{
            opacity: 0;
            transform: translate3d(0, -40px, 0);
        }
    }

    .show-enter-active,
    .show-leave-active {
        transition: all 0.5s ease;

        .legal-home,
        .app-bar,
        .legal-heading,
        .legal-content{
            transition: all 0.5s ease;
        }
    }
</style>
