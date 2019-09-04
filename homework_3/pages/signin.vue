<template>
    <div class="form-signup text-center">
        <h1 class="h3 mb-3 font-weight-normal">
            Sign In</h1>
        <label for="inputEmail"
               class="sr-only">
            Email address</label>
        <input v-model="email"
               type="email" id="inputEmail"
               class="form-control"
               placeholder="Email address"
               autofocus="">
        <label for="inputPassword" class="sr-only">
            Password
        </label>
        <input v-model="password"
               type="password"
               id="inputPassword"
               class="form-control"
               placeholder="Password">
        <button class="btn btn-lg btn-primary btn-block"
                @click.prevent="signIn">
            Sign In
        </button>

        <nuxt-link to="/signup" class="button--green mt-3">
            Sign Up
        </nuxt-link>

        <div class="text-red">{{ error.message }}</div>
    </div>
</template>

<script>
    import {firebaseAuth} from '~/plugins/firebase';

    export default {
        layout: 'login',
        data() {
            return {
                email: '',
                password: '',
                error: {
                    message: ''
                }
            }
        },
        methods: {
            signIn() {
                firebaseAuth
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        let searchQuery = this.$store.state.sResult.searchText;
                        searchQuery = searchQuery
                            ? searchQuery
                            : "javascript";
                        this.$router.replace(`search/${searchQuery}`);
                    })
                    .catch(error => {
                        this.error = error;
                    })
            }
        }
    }
</script>

<style scoped>
    .form-signup {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signup .checkbox {
        font-weight: 400;
    }

    .form-signup .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signup .form-control:focus {
        z-index: 2;
    }

    .form-signup input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signup input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .text-red {
        color: red;
    }

</style>
