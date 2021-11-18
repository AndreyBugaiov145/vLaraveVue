export default {
    state:{
        todos : []
    },
    mutations:{
        addTodo(state,todo){
            state.todos.push(todo)
        },
        removeTodo(state,id){
            state.todos = state.todos.filter((t) => t.id !== id)
        }
    },
    actions:{
        async removeTodo({commit},id){
            var respons;
            let access_token = localStorage.getItem("access_token")
            if (!access_token) {
                let e = new Error('Пользователь не найден');
                e.data = 'Вам надо авторезироваться'
                throw e
            }
            alert(id)
            try {
                alert('id')
                respons = await fetch(`api/todo/${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                })
                console.log(respons, 'remove action')
                if (!respons.ok) {
                    let e = new Error('оишибочка me');
                    e.data = await respons.json()
                    throw e
                }
                let rez= await respons.json()
                commit('removeTodo',id)

            } catch (e) {
                console.error('ошибочка remove todo)))', e)
            }

        },
        async addTodo({commit}, todo) {
            var respons;
            let access_token = localStorage.getItem("access_token")
            if (!access_token) {
                let e = new Error('Пользователь не найден');
                e.data = 'Вам надо авторезироваться'
                throw e
            }
            try {
                respons = await fetch('api/todo', {
                    method: 'POST',
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                })
                console.log(respons, 'addTodo action')
                if (!respons.ok) {
                    let e = new Error('оишибочка me');
                    e.data = await respons.json()
                    throw e
                }
                let rez= await respons.json()
                commit('addTodo', todo)

            } catch (e) {
                console.error('ошибочка add todo)))', e)
            }
        },

    },
    getters:{
        getTodo(state){
            return (id)=> state.todos.find((el)=>el.id === id)
        },
        getAllTodo(state){
          return state.todos
        }
    }
}
