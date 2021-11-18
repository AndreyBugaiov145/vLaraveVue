<template>
    <transition name="bounce" v-if="item">
        <tr>
            <th scope="row">{{id}}</th>
            <td>{{item.title}}</td>
            <td @click="showDetils(item.id)"> детальнее</td>
            <td @click="deleteTodo(item.id)"> завершить</td>
        </tr>
    </transition>
</template>

<script>
    export default {

        props: ['todo', 'i']
        ,
        data(){
            return {
                item : []
            }
        },
        methods: {

            deleteTodo(id) {
                this.$emit('delet-todo',id)
                this.$store.dispatch('removeTodo',id)
                this.item = null

            }
        },
        computed:{
            id(){
                let id = this.i +1
                return id
            },
            todoItem(){
                return this.todo
            }
        },
        mounted() {
            this.item = this.todo
        }

    }
</script>
<style scoped>
    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
