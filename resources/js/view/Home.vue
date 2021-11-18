<template>
        <div class="container">
            <h1>Create todo</h1>
            <hr>
            <div>
                <form @submit.prevent="formSubmit">
                    <div class="form-group input">
                        <label>Название задачи
                            <input type="text "
                                   class="form-control input"
                                   name="title" placeholder="title"
                                   v-model.trim="title"
                                   :class="{invalid : ($v.title.$anyDirty && !$v.title.required)}"
                            >
                        </label>
                        <small class="form-text text-danger"
                               v-if="$v.title.$anyDirty && !$v.title.required"
                        >Это поле обязательно к заполнению</small>
                    </div>
                    <div class="form-group input">
                        <label>Описание задачи
                            <input type="text " class="form-control input"
                                   placeholder="description" name="description"
                                   v-model.trim="description"
                                   :class='{invalid : ($v.description.$anyDirty && !$v.description.required)||
                                     ($v.description.$anyDirty && !$v.description.minLength)}'
                            >
                        </label>
                        <small class="form-text  text-danger"
                               v-if="$v.description.$anyDirty && !$v.description.required"
                        >Это поле обязательно к заполнению</small>
                        <small class="form-text text-muted"
                               v-if="$v.description.$anyDirty && !$v.description.minLength"
                        >минимальное колиество символов {{ $v.description.$params.minLength.min }} </small>
                    </div>
                    <div class="form-group  input">
                        <label> Выберите дату для задачи
                            <Datepicker v-model.trim="date"
                                        :format="'dd-MM-yyyy'"
                                        :bootstrap-styling="true"
                                        :placeholder="'выберите дату'"
                                        class="input"
                                        :class='{invalid : ($v.date.$anyDirty && !$v.date.required)||
                                     ($v.date.$anyDirty && !$v.date.minValue)}'
                            >


                            </Datepicker>
                            <small class="form-text  text-danger"
                                   v-if="$v.date.$anyDirty && !$v.date.required"
                            >Это поле обязательно к заполнению</small>
                            <small class="form-text text-danger"
                                   v-if="$v.date.$anyDirty && !$v.date.minValue"
                            >Такая дата уже прошла </small>
                        </label>
                    </div>
                    <input type="submit" value="сохранить">
                </form>
            </div>
        </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {required, minLength, minValue} from 'vuelidate/lib/validators'

    export default {
        name: 'home',
        data() {
            return {
                id: new Date().getTime(),
                date: '',
                title: '',
                description: '',
                state: {},
            }
        },
        computed: {},
        methods: {
            fetch() {
                const headers = {
                    "Content-Type": "application/json",// устанавливаем header которые отправляютсья с запросом,
                    //"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC92dWVsYXJhdmVsYXBpXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjA4NDgyNzIxLCJleHAiOjE2MDg0ODI3ODEsIm5iZiI6MTYwODQ4MjcyMSwianRpIjoiemFnMlM2VThQSGRrZzBZTiIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.Uv5ljICYI0MEr90tZpkp4lphXGtrNqVXY94b5PWMN1g"
                };
                fetch('api/auth/login', {//  по умолчанию выполняет метод GET
                    method: 'POST',
                    body: JSON.stringify({email: 'andrey.andrey@gmail.com', password: '123456789'}),
                    headers: headers
                })
                    //.then(respons=>respons.text()) // получаем в виде строки то что храниться в в свостве полученого обьекта body: ReadableStream
                    //respons -- это то что мы получаем с сервера но обернутое в fetch API
                    .then(respons => {
                        if (respons.ok) {
                            alert("ok");
                            return respons.json()
                        }
                        alert("non")
                        return respons.json().then(eror => {
                            let e = new Error('оишибочка');
                            e.data = eror
                            throw e
                        })
                    }).then((r) => {
                    console.log(r.access_token)
                    const parseJwt = (token) => {
                            return JSON.parse(atob(token.split('.')[1]));
                    };
                    console.log(parseJwt(r.access_token))
                })
            },
            createForm() {
                return {
                    id: this.id,
                    date: this.date,
                    title: this.title,
                    description: this.description,
                }
            },
            clearForm() {
                this.id = new Date().getTime()
                this.date = ''
                this.title = ''
                this.description = ''
                this.$v.$reset()
            },
            async formSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                let form = this.createForm()
                try {
                    await this.$store.dispatch('addTodo', form)
                    this.clearForm()
                } catch (e) {
                    console.log(e)
                }
            }
        },
        components: {
            Datepicker
        },
        validations: {
            title: {
                required
            },
            description: {
                required,
                minLength: minLength(8)
            },
            date: {
                required,
                minValue: minValue(new Date().getTime())
            }
        }
    }
</script>
<style scoped>
    .input {
        width: 300px;
    }

    .invalid {
        border: 2px dashed red;
    }
</style>
