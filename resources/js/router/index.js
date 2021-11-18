import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            auth: true
        },
        component: () => import('../view/Home')
    },
    {
        name: 'todo-list',
        path: '/todo-list',
        meta: {
            auth: true
        },
        component: () => import('../view/Todo')
    },
    {
        name: 'todo-deteils',
        path: '/todo-deteils/:id',
        meta: {
            auth: true
        },
        component: () => import('../view/TodoDeteils')
    }
    ,
    {
        name: 'login',
        path: '/login',
        component: () => import('../view/Logon')
    }
    ,
    {
        name: 'registration',
        path: '/registration',
        component: () => import('../view/Regitration')
    }
]

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {

    let access_token = localStorage.getItem("access_token")
    let user = store.getters.getUser;
    const reuairAuth = to.matched.some((record) => record.meta.auth)
    if (!access_token && reuairAuth) {
        store.commit('deletUser')
        next('/login')
    } else if (access_token && !user) {
        (async function () {
            let user = await store.dispatch('me');
            next()
        })()
    } else {
        next()
    }
})

export default router
