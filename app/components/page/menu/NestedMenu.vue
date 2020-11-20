<template>
  <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-tab
        color="primary"
        dark
        v-on="on"
      >
        {{ item.name }}
      </v-tab>
    </template>
    <!--    v-model="item.active"-->
    <v-list>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(sunMenu, i) in item.items"
          :key="i"
        >
          <!--          <v-list-item-icon>-->
          <!--            <v-icon v-text="item.icon" />-->
          <!--          </v-list-item-icon>-->
          <v-list-item-content>
            <v-list-item-title v-text="sunMenu.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
