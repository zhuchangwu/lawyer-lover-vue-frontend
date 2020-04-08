import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BABEL_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: Home,
            }
        }
    ]
})
