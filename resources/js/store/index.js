import Vue from 'vue'
import Vuex from 'vuex'

import todo from './todo.store'
import jwt from "jsonwebtoken";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: 'good',
        user: null

    },
    mutations: {
        setUser(store, user) {
            store.user = user
        },
        deletUser(store) {
            store.user = ''
            localStorage.removeItem("access_token")
        }
    },
    actions: {
        async login({commit, dispatch}, formData) {
            try {
                let respons = await fetch('api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!respons.ok) {
                    let e = new Error('Пользовательне найдет или пароль не подходит');
                    e.data = await respons.json()
                    throw e
                }
                let {access_token} = await respons.json()
                localStorage.setItem("access_token", `Bearer ${access_token}`)
                await dispatch('me')
            } catch (e) {
                console.error('ошибочка  login )))', e)
            }

        },
        async me({commit}) {
            let access_token = localStorage.getItem("access_token")
            if (!access_token) {
                let e = new Error('Пользователь не найден');
                e.data = 'Вам надо авторезироваться'
                throw e
            }
            try {
                let respons = await fetch('api/me', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                })
                console.log(respons,'dfsdf')
                if (!respons.ok) {
                    let e = new Error('оишибочка me');
                    e.data = await respons.json()
                    throw e
                }
                let user = await respons.json()
               await commit('setUser', user)

            } catch (e) {
                console.error('ошибочка me)))', e)
            }

        },
        async logOut({commit}) {
            let access_token = localStorage.getItem("access_token")
            if (!access_token) {
                let e = new Error('Пользователь не найден');
                e.data = 'Вам надо авторезироваться'
                throw e
            }
            try {
                let respons = await fetch('api/auth/logout', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                })
                if (!respons.ok) {
                    let e = new Error('оишибочка');
                    e.data = eror
                    throw e
                }
                commit('deletUser')
            } catch (e) {
                console.log(e)
            }

        },
        async registration({commit, dispatch}, formData) {
            try {
                let respons = await fetch('api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!respons.ok) {
                    let e = new Error('регистрация не удалась');
                    e.data = await respons.json()
                    throw e
                }

                let {access_token} = await respons.json()
                console.log(access_token)
                //localStorage.setItem("access_token", `Bearer ${access_token}`)
                //await dispatch('me')
            } catch (e) {
                console.error('ошибочка  регистрация )))', e)
            }

        },
    },
    getters: {
        getStatus(state) {

            return state.status
        },
        getUser(state) {

            return state.user
        },
        getUserTodoList(state) {

            return state.user.todos
        }
    },
    modules: {
        todo
    }
})
