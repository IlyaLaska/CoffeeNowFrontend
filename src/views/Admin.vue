<template>
  <div>
    <v-navigation-drawer :mini-variant.sync="drawer" app>
      <!--      Header-->
      <template v-slot:prepend>
        <v-list dense nav dark class="py-3" color="purple darken-3">
          <v-list-item style="background-color: #7b1fa2">
            <v-list-item-icon>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Test</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <!--      Routes-->
      <template>
        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.route"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <!--      Logout footer-->
      <template v-slot:append>
        <v-list dense nav>
          <v-divider></v-divider>
          <v-list-item class="mt-auto" @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar app dark elevation="0" color="purple darken-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">KEKEKE</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
//TODO make list take up all vert height
import { ref } from "@vue/composition-api";

import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);

export default {
  name: "Admin",
  data() {
    return {};
  },
  setup() {
    const drawer = ref(false);

    const items = [
      {
        title: "Active orders",
        icon: "mdi-cookie-clock",
        route: "/orders-active",
      },
      { title: "All orders", icon: "mdi-cookie", route: "/orders" },
      { title: "Users", icon: "mdi-account-multiple", route: "/users" },
      { title: "Resources", icon: "mdi-semantic-web", route: "/resources" },
    ];
    const logout = () => {
      console.log("kek");
    };
    return { drawer, items, logout };
  },
};
</script>

<style scoped>
/*.v-list-item {*/
/*  flex: 0;*/
/*}*/
</style>
<!--            class="d-flex justify-space-between mb-0"-->
<!--class="d-flex flex-column" height="100%"-->
