import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        setting: {
            color: ['#ff6262', '#ffa947'],
        },
        settingOption: {
            colors: [{
                name: '炽焰',
                color: ['#ff6262', '#ffa947'],
            },{
                name: '冰蓝',
                color: ['#5b9df9', '#47bfff'],
            },{
                name: '青草',
                color: ['#2c7d59', '#3ba776'],
            },{
                name: '江户',
                color: ['#8E2DE2', '#4A00E0'],
            }]
        },
        askList: [],
        onAsk: false,
        onInfer: false,
        onLegal: false,
        currentTab: 'Home',
        selected: null,
        unselect: null,
        cardSelected: null,
        cardUnselect: null,
    },
    mutations: {
        selectTab (state, selected) {
            state.unselect = null;
            state.selected = selected;
        },
        setTab (state, tab) {
            state.currentTab = tab;
        },
        unselectTab (state) {
            state.unselect = state.selected;
            state.selected = null;
            state.currentTab = 'Home';
        },
        selectCard (state, selected) {
            state.cardUnselect = null;
            state.cardSelected = selected;
        },
        unselectCard (state) {
            state.cardUnselect = state.cardSelected;
            state.cardSelected = null;
        }
    }
})
