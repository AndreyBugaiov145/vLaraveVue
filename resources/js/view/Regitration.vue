<template>
    <form class="card auth-card container " @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Регистрация</span>
            <div class="input-field form-group">
                <input
                    class="form-control"
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{invalid :( $v.email.$anyDirty && !$v.email.required)||( $v.email.$anyDirty && !$v.email.email)}"

                >
                <label for="email" > Email  </label>
                <small class="helper-text invalid"
                       v-if=" $v.email.$anyDirty && !$v.email.required"
                >Поле Email путое</small>
                <small class="helper-text invalid"
                       v-else-if=" $v.email.$anyDirty && !$v.email.email"
                > Email не коренктный</small>
            </div>
            <div class="input-field form-group">
                <input
                    class="form-control"
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{invalid :( $v.password.$anyDirty && !$v.password.required)||( $v.password.$anyDirty && !$v.password.minLength)}"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid"
                       v-if=" $v.password.$anyDirty && !$v.password.required"
                >Поле password путое</small>
                <small class="helper-text invalid"
                       v-else-if=" $v.password.$anyDirty && !$v.password.minLength"
                > password не должен быть меньше {{ $v.password.$params.minLength.min }} симвалов </small>
            </div>
            <div class="input-field form-group">
                <input
                    class="form-control"
                    id="confirm_password"
                    type="password"
                    v-model.trim="repeatPassword"
                    :class="{invalid : $v.password.$anyDirty && !$v.repeatPassword.sameAsPassword}"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid"
                       v-if=" $v.password.$anyDirty && !$v.repeatPassword.sameAsPassword"
                >пароли не совпадают</small>

            </div>
        </div>
        <div class="card-action form-group">
            <div>
                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Войти
                    <i class="material-icons right">registration</i>
                </button>
            </div>

            <p class="center">
                <router-link to="{name:'login'}">Уже есть аккаунт</router-link>
            </p>
        </div>
    </form>
</template>

<script>

    import {email,sameAs,required,minLength} from 'vuelidate/lib/validators'
    import jwt from "jsonwebtoken";
   // import masseges from '@/utils/masseges'

    export default {
        name:'login',
        data(){
            return {
                email:'',
                password :"",
                repeatPassword: ''
            }
        },
        mounted() {
            /*if (masseges[this.$route.query.message]){
                this.$massege(masseges[this.$route.query.message])
            }else {
                this.$massege('что то пошло не так')
            }*/

        }
        ,
        methods:{
            async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.repeatPassword
                }
                try {
                    await this.$store.dispatch('registration',formData)
                    //this.$router.push('/')
                }catch (e) {
                    console.log(e)
                }
            },
        },
        validations:{
            email:{email,required},
            password:{required,minLength:minLength(6)},
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        }

    }

</script>
