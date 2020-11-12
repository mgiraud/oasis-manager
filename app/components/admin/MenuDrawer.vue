<template>
    <v-navigation-drawer
            v-model="drawer"
            app
    >
        <v-sheet
                color="grey lighten-4"
                class="pa-4"
        >
            <v-avatar
                    class="mb-4"
                    color="grey darken-1"
                    size="64"
            ></v-avatar>

            <div>john@vuetifyjs.com</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
            <v-list-item
                    v-for="[icon, text, path] in links"
                    :key="icon"
                    link
            >
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title><NuxtLink :to="path">{{ text }}</NuxtLink></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="logout">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            links: [
                ['mdi-home', 'Administration', 'admin'],
            ]
        }),
        methods: {
            logout() {
                this.$store.dispatch('member/logout')
            }
        },
    }
</script>
