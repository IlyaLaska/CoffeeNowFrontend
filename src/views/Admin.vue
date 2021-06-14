<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="permanent"
      :temporary="temporary"
      app
      :mini-variant="miniVariant"
    >
      <!--      Header-->
      <template v-slot:prepend>
        <v-list dense nav dark class="py-3" color="purple darken-3">
          <v-list-item style="background-color: #7b1fa2">
            <v-list-item-icon>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                $store.getters.getUser
              }}</v-list-item-title>
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
      <v-app-bar-nav-icon
        v-if="temporary"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        v-else
        @click="miniVariant = !miniVariant"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">Coffee Now!</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import firebase from "firebase/app";
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import router from "../router";

Vue.use(VueCompositionAPI);

export default {
  name: "Admin",
  data() {
    return {};
  },
  async mounted() {
    this.roles = await this.$store.getters.getUserRoles;
    // alert(this.roles);
    if (this.roles.includes(this.$store.getters.getRolesEnum.employee)) {
      this.items = this.items.concat([
        {
          title: "Active orders",
          icon: "mdi-cookie-clock",
          route: "/orders-active",
        },
      ]);
    }
    if (this.roles.includes(this.$store.getters.getRolesEnum.admin)) {
      this.items = this.items.concat([
        { title: "All orders", icon: "mdi-cookie", route: "/orders" },
        { title: "Menus", icon: "mdi-file-document", route: "/menus" },
        { title: "Dishes", icon: "mdi-bowl-mix", route: "/dishes" },
        { title: "Users", icon: "mdi-account-multiple", route: "/users" },
        { title: "Roles", icon: "mdi-semantic-web", route: "/roles" },
      ]);
    }
  },
  setup() {
    const drawer = ref(false);
    const miniVariant = ref(false);
    const temporary = ref(false);
    const permanent = ref(true);
    const role = ref("");
    const items = ref([]);
    return { drawer, miniVariant, temporary, permanent, items, role };
  },
  watch: {
    temporary(val) {
      val ? (this.drawer.value = false) : (this.drawer.value = false);
    },
  },
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$store.dispatch("removeUser");
      this.$store.dispatch("addIsLogin", false);
      router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped></style>
