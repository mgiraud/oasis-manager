<template>
    <v-app>
        <v-app-bar
                app
                color="white"
                flat
        >
            <v-container class="py-0 fill-height">
                <v-avatar
                        class="mr-10"
                        color="grey darken-1"
                        size="32"
                ></v-avatar>

                <v-spacer></v-spacer>

                <v-btn v-if="isLoggedIn" @click="logout" icon>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <Nuxt></Nuxt>
        </v-main>
    </v-app>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({}),
        methods: {
            logout() {
                this.$store.dispatch('member/logout');
            },
        },
        computed: {
            ...mapState({
                'isLoggedIn': state => state.member.auth,
            })
        }
    };
</script>
