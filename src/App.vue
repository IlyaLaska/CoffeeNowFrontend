<template>
  <v-app>
    <!--    <v-app-bar app color="primary" dark>-->
    <!--      <div class="d-flex align-center">-->
    <!--        <v-img-->
    <!--          alt="Vuetify Logo"-->
    <!--          class="shrink mr-2"-->
    <!--          contain-->
    <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
    <!--          transition="scale-transition"-->
    <!--          width="40"-->
    <!--        />-->

    <!--        <v-img-->
    <!--          alt="Vuetify Name"-->
    <!--          class="shrink mt-1 hidden-sm-and-down"-->
    <!--          contain-->
    <!--          min-width="100"-->
    <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
    <!--          width="100"-->
    <!--        />-->
    <!--      </div>-->

    <!--      <v-spacer></v-spacer>-->

    <!--      <v-btn-->
    <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
    <!--        target="_blank"-->
    <!--        text-->
    <!--      >-->
    <!--        <span class="mr-2">Latest Release</span>-->
    <!--        <v-icon>mdi-open-in-new</v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-app-bar>-->
    <!--    <p>TEST</p>-->
    <!--    <v-main>-->
    <!--      <router-view />-->
    <!--    </v-main>-->
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
    <v-snackbar v-model="$store.getters.getSnackbar.isOpen" :timeout="3000">
      {{ $store.getters.getSnackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="
            $store.dispatch('addSnackbar', { isOpen: false, message: '' })
          "
          color="blue"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
