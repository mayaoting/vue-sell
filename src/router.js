import Vue from 'vue'
import VueRouter from "vue-router";
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

Vue.use(VueRouter) 

const router = new VueRouter({
    mode: 'history',
    linkActiveClass:'active',
    redirect:'/goods',
    routes:[
        {
            path:'/goods',
            name:goods,
            component: goods,
        },
        {
            path:'/ratings',
            name:ratings,
            component: ratings,
        },
        {
            path:'/seller',
            name:seller,
            component: seller,
        },
    ]    
})




export default router;
