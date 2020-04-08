<template>
    <div class="search-bar">
        <label style="display: none" for="search-bar-area"></label>
        <label style="display: none" for="search-bar-input"></label>
        <div id="search-bar-container">
            <!--searchbar是复用组件-->
            <!--根据不同的type类型选择显示下拉框还是选择文本域-->
            <textarea v-if="type === 'area'" id="search-bar-area" v-model="text"></textarea>
            <div v-if="type === 'input'">
                <input id="search-bar-input" type="text" v-model="input"/>
                <div class="search-bar-pop">
                    <!--下拉动画-->
                    <transition-group name="show" v-if="hintShow&&!requestFlag">
                        <div v-for="(text, index) in hint" :key="index" class="search-bar-hint"  @click="fillHint(text)">{{ text }}</div>
                    </transition-group>
                </div>
            </div>
            <div id="search-icon" :style="{ color: color }">
                <a class="search-button" @click="getFullResult">
                    <i class="fas fa-search"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        // 取出问答模块父组件传递进来的值，并且能直接在上面的html中使用
        props: {
            type: {
                type: String,
                default: 'area'
            },
            color: {
                type: String,
                default: '#455a64'
            },
            mode: {
                type: String,
            }
        },
        data() {
            return {
                oldInput: null,
                input: null,
                text: null,
                hintShow: true,
                hint: null,
                requestFlag: false
            }
        },
        mounted() {
            // 如果是问答页面复用的这个输入框, 启动计时器, 监听用户的输入,搜索提示
            if(this.type==='input'&&this.mode==='ask') {
                this.inputListener();
            }
        },
        methods: {
            inputListener:function () {
                const that = this;
                this.pointer = setInterval(function () {
                    if(that.requestFlag) {
                       clearInterval(that.pointer);
                    }
                    if((that.input === null)&&(that.oldInput === null)) {
                        return;
                    } else if((that.input !== null)&&(that.oldInput === null)) {
                        that.oldInput = that.input;
                    } else if(that.input === that.oldInput) {
                        return;
                    }
                    that.oldInput = that.input;
                    if (that.input==null)
                             return ;
                    that.$http.get("http://api.zhuchangwu.com/api-consumer/question/promptSearch", {
                        params: {
                            content: that.input
                        }
                    }).then((res)=> {
                        that.hint = res.data.data;
                        // eslint-disable-next-line no-console
                        console.log(that.hint);
                        // eslint-disable-next-line no-console
                        console.log("send");
                        // 显示下拉框
                        if (!that.hintShow)
                            that.hintShow=true;
                    });
                }, 500)
            },
            fillHint: function (text) {
                this.input = text;
                // todo
                //this.requestFlag = false;
                this.hint = null;
                this.getFullResult();
            },
            // 全文检索
            getFullResult: function () {
                clearInterval(this.pointer);
                if(this.mode==='ask') {
                    this.hint=null;
                    this.$http.get("http://api.zhuchangwu.com/api-consumer/question/preciseSearch", {
                        params: {
                            title: this.input
                        }
                    }).then((res)=> {
                        // 传值到父组件中的result属性上
                        this.$emit('result', res.data.data);
                        // 隐藏下拉框
                        this.hintShow=false;

                        this.requestFlag = true;
                    });

                    // 重新启动计时器,监听用户的请求
                    this.inputListener();
                } else if(this.mode==='infer') {
                    this.$emit('loading', true);
                    this.axios.post("http://api.zhuchangwu.com/api-consumer/py/intelligenceAnalyze", {
                        content: this.text
                    }).then((res)=> {
                        if (res.data.data===null){
                            // 传值到父组件
                            this.$emit('result', res.data.data);
                        }
                        this.$emit('result', res.data.data);
                    });
                }else if (this.mode==='legal'){
                    // 显示加载框
                    this.$emit('loading', true);
                    this.axios.post("http://api.zhuchangwu.com/api-consumer/checking/describe",{
                        describe: this.text
                    }).then((res)=>{
                        this.$emit('result',res.data.data)
        })
                }
            }
    }
    }
</script>

<style lang="scss" scoped>
    .search-bar {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
        z-index: 100;
    }

    #search-bar-area::-webkit-scrollbar {
        display: none;
    }

    #search-bar-area {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        overflow-y: auto;
        color: #222;
        font-weight: 300;
        font-family: "Microsoft YaHei", sans-serif;
        background-color: #fff;
        box-shadow: inset 0 -5px 5px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 10px 20px 10px 20px;
        font-size: 18px;
        border: none;
        outline: none;
        transition-property: height;
        transition-duration: 400ms;
        resize:none;
    }

    #search-bar-input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        overflow-y: auto;
        color: #222;
        font-weight: 300;
        font-family: "Microsoft YaHei", sans-serif;
        border-radius: 20px;
        padding: 10px 45px 10px 15px;
        font-size: 18px;
        border: none;
        outline: none;
        transition-duration: 200ms;
    }

    #search-bar-area:focus {
        height: 300px;
        box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.1);
    }

    #search-bar-container {
        position: relative;
    }

    #search-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 40px;
        width: 50px;
        padding-top: 2px;
        padding-bottom: 3px;
        padding-right: 5px;
        font-size: 24px;
        text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
        transition-duration: 250ms;
    }

    .search-button:hover {
        color: #37474f;
        text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.1);
    }

    .search-button:active {
        color: #263238;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
    }

    .search-bar-pop {
        min-height: 40px;
        width: 100%;
        position: absolute;
        background-color: #fff;
        top: 0;
        z-index: -1;
        border-radius: 20px;
        box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.1);
        transition-property: height;
        transition-duration: 300ms;
        padding: 40px 0 0 0;
        color: #444;
        text-align: left;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .search-bar-hint {
        height: 35px;
        overflow: hidden;
        font-size: 14px;
        line-height: 30px;
        padding: 0 10px 5px 15px;
        transition-duration: 100ms;
        background-color: #fbfbfb;
    }

    .search-bar-hint:first-of-type {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .search-bar-hint:hover {
        background-color: rgba(31, 162, 255, 0.15);
    }

    .show-enter-to,
    .show-leave {
        .search-bar-hint {
            opacity: 1;
            transform: translate3d(0, 0px, 0);
        }
    }

    .show-leave-to,
    .show-enter {
        .search-bar-hint {
            opacity: 1;
            transform: translate3d(0, 20px, 0);
        }
    }

    .show-enter-active,
    .show-leave-active {
        transition: all 0.2s ease;
        .search-bar-hint {
            transition: all 0.2s ease;
        }
    }

</style>
