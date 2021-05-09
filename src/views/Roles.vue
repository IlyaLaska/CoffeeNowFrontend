<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="roles"
    :options.sync="options"
    :mobile-breakpoint="1024"
    sort-by="createDate"
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog persistent v-model="dialog" max-width="80vh">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="purple darken-3"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-form ref="form">
              <v-card-title class="headline">{{ formTitle }}</v-card-title>
              <v-card-text>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultRole.name"
                    label="Name"
                    :rules="[rules.required]"
                    color="purple darken-3"
                    prepend-icon="mdi-text-short"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col v-if="editedIndex === -1" cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultRole.key"
                    label="Key"
                    :rules="[rules.required]"
                    color="purple darken-3"
                    prepend-icon="mdi-text-short"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-card-text>
              <v-card-actions class="elevation-1">
                <v-spacer></v-spacer>
                <v-btn color="purple darken-3" text @click="dialog = false">
                  Close</v-btn
                >
                <v-btn @click="save" color="purple darken-3" text> Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-toolbar-title>Roles</v-toolbar-title>
        <generic-delete
          :dialogProp="dialogDelete"
          @on-close="close"
          @on-delete="deleteItemConfirm"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.id`]="{}">
      <v-avatar size="40" color="purple darken-3">
        <v-icon dark> mdi-semantic-web </v-icon>
      </v-avatar>
    </template>
    <template v-slot:[`item.createDate`]="{ item }">
      {{ item.createDate | shortDate }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import filters from "@/mixins/filters";
import utils from "@/compositions/utils";
import useRole from "@/compositions/role";
import GenericDelete from "@/components/GenericDelete";

export default {
  name: "Roles",
  mixins: [filters],
  components: {
    GenericDelete,
  },
  setup() {
    const { rules, objectsEqual, clearObject } = utils();

    return {
      rules,
      objectsEqual,
      clearObject,
      ...useRole(),
    };
  },
  mounted() {
    this.getRolesMethod();
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "",
          value: "id",
          sortable: false,
        },
        {
          text: "Name",
          value: "name",
          sortable: false,
        },
        {
          text: "Key",
          value: "key",
          sortable: false,
        },
        { text: "Created", value: "createDate" },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      editedIndex: -1, // TODO
      loading: true,
      showPassword: false,
      defaultRole: { ...this.initialRole },
      beforeUpdateRole: { ...this.initialRole }, // TODO
      options: {},
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    options: {
      handler() {
        this.getRolesMethod();
      },
      deep: true,
    },
  },
  methods: {
    getRolesMethod() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const order = !sortDesc[0] ? "asc" : "desc";
      const sort = sortBy[0] === undefined ? "updateDate" : sortBy[0];
      this.getRoles((page - 1) * itemsPerPage, itemsPerPage, order, sort).then(
        () => {
          this.loading = false;
        }
      );
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.defaultRole = { ...item };
      this.beforeUpdateRole = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultRole = { ...item };
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await this.deleteRole(this.defaultRole.id);
      if (res) this.close();
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultRole = { ...this.initialRole };
        this.$refs.form?.resetValidation();
        setTimeout(() => {
          this.editedIndex = -1;
        }, 300);
      });
    },
    async save() {
      const correct = this.$refs.form.validate();
      if (correct) {
        if (this.editedIndex !== -1) {
          const cleanObj = this.objectsEqual(
            this.beforeUpdateRole,
            this.defaultRole
          );
          const res = await this.updateRole(this.editedIndex, cleanObj);
          if (res) this.close();
        } else {
          const res = await this.createRole(this.defaultRole);
          if (res) this.close();
        }
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

<style scoped></style>
