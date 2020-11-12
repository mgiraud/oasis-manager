<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-col lg="4">
                <v-card
                        elevation="2"
                        shaped
                >
                    <v-card-title>Connectez-vous !</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-inner-icon="mdi-account" label="email" type="email" v-model="credentials.email"></v-text-field>
                            <v-text-field prepend-inner-icon="mdi-lock" label="password" type="password" v-model="credentials.password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="postLogin" text>
                            login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
