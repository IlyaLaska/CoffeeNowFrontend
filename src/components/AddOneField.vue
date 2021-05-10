<template>
  <v-dialog persistent v-model="dialog" max-width="80vh">
    <v-card>
      <v-form ref="form">
        <v-card-title class="headline">{{ options.title }}</v-card-title>
        <v-card-text>
          <v-col cols="12" class="py-1">
            <v-text-field
              v-model="text"
              :label="options.label"
              :rules="rulesProp"
              :prepend-icon="options.icon"
              color="purple darken-3"
              type="text"
            >
            </v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-3" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="purple darken-3" text @click="save">
            {{ options.action }}
          </v-btn>
        </v-card-actions>
      </v-form>
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
    optionsProp: {
      type: Object,
      default: () => {},
      required: true,
    },
    rulesProp: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  emits: ["on-close", "on-send"],
  watch: {
    dialog(open) {
      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });
      if (!open) {
        this.$refs.form.reset();
      }
    },
  },
  data() {
    return {
      text: null,
      options: { ...this.optionsProp },
    };
  },
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
    save() {
      const correct = this.$refs.form.validate();
      if (correct) {
        this.$emit("on-send", this.text);
      } else {
        this.$store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Incorrect input",
        });
      }
    },
  },
};
</script>
