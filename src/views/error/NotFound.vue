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
      icon: "mdi-shield-search",
      error: {
        code: "404",
        name: "Not found",
        text: "Page not found! Please check the url",
      },
    };
  },
};
</script>
