<template>
    <div class="home-card" :id="'home-card'+theId" style="position: relative" >
        <div class="title-container">
            <p class="card-title">{{ title }}</p>
        </div>
        <div  :id="theId"  class="content-container">
            <p v-for="(text, index) in content" :key="index" class="card-content">{{ text }}</p>
        </div>
        <div id="unfold-button" @click="handleUnfold"><i v-if="arror" :id="'arror'+theId" :class="{'arror-down':unfold}" class="fa fa-2x fa-angle-down"></i> </div>
    </div>
</template>

<script>
    export default {
        name: "HomeCard",
        props: {
            title: {
                type: String,
                default: 'Ops，刷新一下试试吧'
            },
            content: {
                type: Array,
            },
            theId:{
                type:Number
            }
        },
        data() {
            return {
                unfold: false,
                arror: true
            }
        },
        watch:{
            title(){

            }
        },
        mounted() {
            // eslint-disable-next-line no-console
            let temp = document.getElementById(this.theId).scrollHeight + 50;
            if(temp < 260) {
                this.arror = false;
            }
        },
        methods: {
            handleUnfold: function () {
                if(!this.unfold){
                    let temp = document.getElementById(this.theId).scrollHeight + 50;
                    if(temp > 1000) {
                        document.getElementById("home-card"+this.theId).style.transition = '1000ms';
                        document.getElementById("arror"+this.theId).style.transitionDuration = '1000ms';
                    }
                    let tempString = String(temp);
                    document.getElementById("home-card"+this.theId).style.maxHeight=tempString + 'px';
                } else {
                    document.getElementById("home-card"+this.theId).style.maxHeight='260px';
                }
                this.unfold = !this.unfold;
            }
        }
    }
</script>

<style scoped>

    #arror {
        transition-duration: 500ms;
    }

    .arror-down {
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg);
    }

    #unfold-button {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        background: rgba(254, 254, 254, 0.16);
        background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 254, 255, 0.98));
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(254, 255, 255, 0.98));
    }

    .home-card {
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.06);
        max-height: 260px;
        transition: 500ms;
        overflow: hidden;
        padding: 5px 0;
    }

    .title-container {
        padding: 5px 15px;
        border: #333 1px;
    }

    .card-title {
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 0;
    }

    .content-container {
        padding: 5px 15px 15px 15px;
        text-indent: 1em;
    }

    .card-content {
        margin: 5px 0;
        font-size: 14px;
    }
</style>
