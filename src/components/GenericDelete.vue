<template>
  <v-dialog v-model="dialog" max-width="80vh">
    <v-card>
      <v-card-title class="justify-center pb-4">
        Are you sure you want to delete
        {{ itemNameProp ? itemNameProp : "this item" }}</v-card-title
      >
      <v-card-actions class="elevation-1">
        <v-spacer></v-spacer>
        <v-btn color="purple darken-3" text @click="dialog = false"
          >Cancel</v-btn
        >
        <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogProp: {
      type: Boolean,
      default: () => false,
      required: true,
    },
    itemNameProp: {
      type: String,
      default: () => "",
      required: false,
    },
  },
  emits: ["on-close", "on-delete"],
  computed: {
    dialog: {
      get() {
        return this.dialogProp;
      },
      set() {
        this.$emit("on-close");
      },
    },
  },
  methods: {
    deleteItemConfirm() {
      this.$emit("on-delete");
    },
  },
};
</script>
