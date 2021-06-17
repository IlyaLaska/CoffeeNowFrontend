<template>
  <div>
    <div>
      <v-app-bar app dark elevation="3" color="purple darken-3">
        <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
        <v-icon large class="pl-6">mdi-language-java</v-icon>
        <v-toolbar-title class="d-flex align-center font-weight-medium text-h4"
          >COFFEE NOW!</v-toolbar-title
        >
      </v-app-bar>
    </div>
    <v-main>
      <ul>
        <li v-for="menu in menus" :key="menu.id">
          <v-card elevation="2" class="ma-4 pa-3">
            <v-card-title
              class="d-flex align-center font-weight-medium text-h4"
            >
              {{ menu.name }}</v-card-title
            >
            <v-card-text>{{ menu.description }}</v-card-text>
            <v-card-actions>
              <v-btn
                dark
                color="purple darken-3"
                class="d-flex"
                @click="goToMenu(menu.id)"
                >Order</v-btn
              >
            </v-card-actions>
          </v-card>
        </li>
      </ul>
    </v-main>
  </div>
</template>
<script>
import router from "../router";
import useMenu from "../compositions/menu";

export default {
  name: "Mock",
  setup() {
    return {
      ...useMenu(),
    };
  },
  mounted() {
    this.getMenusMethod();
  },
  methods: {
    goToMenu(id) {
      router.push(`/menu/${id}`);
    },
    getMenusMethod() {
      const order = "asc";
      const sort = "createDate";
      const skip = 0;
      const take = 0;
      this.getMenus(skip, take, order, sort);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
