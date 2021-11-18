<template v-cloak>
    <div>
        <Header></Header>
        <transition name="fade" mode="out-in"
        >
            <!--<keep-alive>-->
                <router-view></router-view>
           <!-- </keep-alive>-->
        </transition>
    </div>
</template>

<script>
    import Header from "./app/Header"

    export default {
        name: "home",
        data() {
            return {}

        },
        components: {
            Header
        },
        methods: {},
        computed: {
            status() {
                return this.$store.getters.getStatus
            }
        },
        async mounted() {

            if (localStorage.getItem('access_token')) {
                await this.$store.dispatch('me')
            }
        }
    }

</script>

<style>
    @import "~bootstrap/dist/css/bootstrap.css";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter {
        display: none;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }

    [v-cloak] {
        display: none;
    }
</style>
