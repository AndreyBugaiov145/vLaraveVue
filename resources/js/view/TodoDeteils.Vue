<template>
    <div v-cloak>
        <h1>{{todos.nameq}}</h1><br>
        <span>{{todos.description}}</span>
        <p>{{todos.data}}</p>
        <span class="btn btn-danger" @click="deleteTodo(todos.id)">Завершить</span>
    </div>
</template>

<script>

    export default {
        name: 'detail',
        data() {
            return {
                todos:{}
            }
        },
        computed: {},
        methods: {
            async deleteTodo(id) {
                console.log('good')
                try {
                    await this.$store.dispatch('removeTodo',id)
                    //await this.getTodoList()
                    console.log('good')
                    this.$router.push('/todo-list')
                } catch (e) {
                    console.log(e)
                    this.$router.push('/todo-list')
                }
            }

        },
        created() {
            alert('asdsad')
            console.log(this.$route.params.id)
            try {
                if(!(this.todos = this.$store.getters.getTodo(this.$route.params.id))){
                    this.$router.push('/todo-list')
                }
                console.log(this.todos)
            }catch (e) {
                this.$router.push('/todo-list')
            }
        }
    }
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>
