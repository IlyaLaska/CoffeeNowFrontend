<template>
  <div>
    <v-app-bar app dark elevation="3" color="purple darken-3">
      <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
      <v-btn dark elevation="1" color="purple darken-2" @click="backToMock()"
        ><v-icon>mdi-arrow-left-bold</v-icon> Back</v-btn
      >
      <v-icon class="pl-6">mdi-coffee</v-icon>
      <v-toolbar-title class="d-flex align-center font-weight-medium text-h5"
        >COFFEE NOW!</v-toolbar-title
      >
      <!--      <v-spacer></v-spacer>-->
      <!--      <v-btn class="ma-0" dark color="purple darken-2" @click="dialog = !dialog"-->
      <!--      >Order</v-btn-->
      <!--      >-->
    </v-app-bar>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "OrderStatus",

  methods: {
    backToMock() {
      router.push("/mock");
    },
  },
};
</script>

<style scoped></style>
