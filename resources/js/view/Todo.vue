<template>
    <div class="container">
        <table class="table table-striped" v-if="todos.length">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
                <th scope="col">complated</th>
                <th scope="col">deteils</th>
            </tr>
            </thead>

            <transition-group name="bounce" tag="tbody">
                <tr v-for="(item, i) in todos" :key="item.id">
                    <th scope="row">{{i}}</th>
                    <td>{{item.name}}</td>
                    <router-link tag="td" :to="{ name: 'todo-deteils', params: { id: item.id }}"> детальнее</router-link>
                    <td @click="deleteTodo(item.id)"> завершить</td>
                </tr>
            </transition-group>

        </table>
        <p v-else>Записей пока нету</p>
    </div>
</template>
<script>

    export default {
        name: 'home',
        data() {
            return {
                w: true,
                todos: [],
            }
        },
        computed: {},
        methods: {
            showDetils(id) {
                let todo = this.$store.getters.getTodo(id)
                console.log(todo)
            },
            async deleteTodo(id) {
                try {
                    await this.$store.dispatch('removeTodo',id)
                    await this.getTodoList()
                    console.log('good')
                } catch (e) {
                    console.log(e)
                }
            },
            getTodoList() {
                this.todos = this.$store.getters.getUserTodoList
                console.log(this.todos)
            }

        },
        mounted() {
            this.getTodoList()

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

