<template>
  <card-error :iconProp="icon" :errorProp="error" />
</template>

<script>
import CardError from "../../components/ErrorCard.vue";
export default {
  components: {
    CardError,
  },
  data() {
    return {
      icon: "mdi-shield-lock-outline",
      error: {
        code: "403",
        name: "Forbidden",
        text:
          "This resource is not available to you. Please contact your administrator for details",
      },
    };
  },
};
</script>
