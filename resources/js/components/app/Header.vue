<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
         :key="key">
        <h5 class="my-0 mr-md-auto font-weight-normal">Todo list</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link class="p-2 text-dark" active-class="active" exact :to="{name:'home'}">home</router-link>
            <router-link class="p-2 text-dark" active-class="active" :to="{name:'todo-list'}">todo</router-link>
            <span class="p-3 mb-2 bg-success text-white login" v-if="user">{{user.name}}</span>
            <span class="p-2 text-dark btn btn-outline-primary" v-if="user" @click="logOut">Log Out</span>
            <router-link class="p-2 text-dark btn btn-outline-primary" v-else active-class="active"
                         :to="{name:'login'}">Sign
                up
            </router-link>

        </nav>

    </div>
</template>

<script>
    import jwt from 'jsonwebtoken'

   // console.log(jwt)

    export default {
        name: 'heade',
        data() {
            return {
                key: 1,
                user: ''
            }
        },
        computed: {
            userState() {
                /*let user = this.$store.getters.getUser
                if (Object.keys(user).length > 0) {
                    this.key = ++this.key
                    return user
                }
                return {}*/
                return this.$store.state.user
            }
        },
        async mounted() {
             this.user = await this.$store.getters.getUser
        },
        watch: {
            userState(newValue, oldValue){
                this.user = newValue
                this.key = ++this.key
            }
        },

        methods: {
            async logOut() {
                try {
                    await this.$store.dispatch('logOut')
                    this.$router.push('/login')
                } catch (e) {

                }
            }
        }
    }

</script>

<style scoped lang="scss">
    .login {
        font-weight: 900;
        border-radius: 30%;
        opacity: 0.5;
    }

    div.d-flex {
        a.active, a.text-dark:focus {
            color: red !important;
        }

        a.text-dark:hover {
            color: green !important;
        }
    }

</style>
