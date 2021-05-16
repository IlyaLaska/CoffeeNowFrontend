<template>
  <v-card elevation="0" height="100vh" width="100vw" class="card-error">
    <v-card-text class="d-flex align-center justify-center height-full">
      <div class="d-flex icon">
        <v-icon>
          {{ iconProp }}
        </v-icon>
      </div>
      <div class="d-flex flex-column">
        <div class="text-h1 text--primary font-weight-bold">
          {{ errorProp.code }}
        </div>
        <div class="text-h4 text--primary my-2 font-weight-bold">
          {{ errorProp.name }}
        </div>
        <div>{{ errorProp.text }}</div>
        <v-btn class="my-2" to="/mock" outlined color="purple darken-3">
          Go back
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    iconProp: {
      type: String,
      default: () => "",
      required: true,
    },
    errorProp: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-icon.v-icon {
  font-size: 18rem !important;
  margin: 1.5rem;
}
@media (max-width: 800px) {
  .v-icon.v-icon {
    font-size: 14rem !important;
  }
}
@media (max-width: 600px) {
  .v-icon.v-icon {
    display: none;
  }
  .icon {
    margin: 0;
  }
}
</style>
