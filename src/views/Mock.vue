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
      <v-card elevation="2" class="ma-4 pa-3">
        <v-card-title class="d-flex align-center font-weight-medium text-h4"
          >Breakfast menu</v-card-title
        >
        <v-card-text>This is our breakfast menu</v-card-text>
        <v-card-actions>
          <v-btn
            dark
            color="purple darken-3"
            class="d-flex"
            @click="goToMenu(1)"
            >Order</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card elevation="2" class="ma-4 pa-3">
        <v-card-title class="d-flex align-center font-weight-medium text-h4"
          >Lunch menu</v-card-title
        >
        <v-card-text>This is our lunch menu</v-card-text>
        <v-card-actions>
          <v-btn
            dark
            color="purple darken-3"
            class="d-flex"
            @click="goToMenu(2)"
            >Order</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "Mock",
  methods: {
    goToMenu(id) {
      router.push(`/menu/${id}`);
    },
  },
};
</script>

<style scoped></style>
