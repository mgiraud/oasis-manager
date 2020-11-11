<template>
    <div class="container">
        <h1>Sign in to access the secret page</h1>
        <div>
            <label for="email">
                <input id="email" type="email" v-model="credentials.email">
            </label>
            <label for="password">
                <input id="password" type="password" v-model="credentials.password">
            </label>
            <button @click="postLogin">
                login
            </button>
            <p>The credentials are not verified for the example purpose.</p>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                credentials: {
                  email: '',
                  password: ''
                }
            }
        },
        middleware: 'notAuthenticated',
        methods: {
            postLogin () {
                this.$store.dispatch('member/login', this.credentials).then(() => {
                    this.$router.push('/')
                });
            }
        }
    }
</script>
