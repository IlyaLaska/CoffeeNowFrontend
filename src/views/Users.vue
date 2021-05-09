<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="users"
    :options.sync="options"
    :mobile-breakpoint="1024"
    sort-by="createDate"
    sort-desc
    class="elevation-1"
  >
    <!--    Form controls-->
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog persistent v-model="dialog" max-width="80vh">
          <!--          New item Button-->
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
          <!--          Add item Card-->
          <v-card>
            <v-form ref="form">
              <v-card-title class="headline">{{ formTitle }}</v-card-title>
              <v-card-text>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultUser.name"
                    label="Name"
                    :rules="[rules.required]"
                    prepend-icon="mdi-text-short"
                    type="text"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col v-if="editedIndex === -1" cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultUser.email"
                    label="Email"
                    prepend-icon="mdi-at"
                    type="text"
                    :rules="[rules.required, rules.email]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col v-if="editedIndex === -1" cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultUser.password"
                    :rules="[rules.required, rules.passwordLength]"
                    color="purple darken-3"
                    prepend-icon="mdi-lock-outline"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    name="Password"
                    label="Password"
                    counter
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-select
                    v-model="defaultUser.roles"
                    prepend-icon="mdi-inbox"
                    :items="roles"
                    :item-text="'name'"
                    :item-value="'id'"
                    label="Roles"
                    :rules="[rules.required]"
                    color="purple darken-3"
                    required
                    multiple
                    chips
                    persistent-hint
                    return-object
                  ></v-select>
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
        <v-toolbar-title>Users</v-toolbar-title>
        <!--        Generic Delete component-->
        <generic-delete
          :dialogProp="dialogDelete"
          @on-close="close"
          @on-delete="deleteItemConfirm"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.id`]="{}">
      <v-avatar size="40" color="purple darken-3">
        <v-icon dark> mdi-account </v-icon>
      </v-avatar>
    </template>
    <template v-slot:[`item.roles`]="{ item }">
      <v-chip
        v-for="role in item.roles"
        :key="role.id"
        class="ma-1"
        color="gray"
      >
        <v-icon left small color="grey"> mdi-semantic-web </v-icon>
        {{ role.name }}
      </v-chip>
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
import useUser from "@/compositions/user";
import useRole from "@/compositions/role";
import utils from "@/compositions/utils";
import filters from "@/mixins/filters";
import GenericDelete from "@/components/GenericDelete";

export default {
  name: "Users",
  mixins: [filters],
  components: {
    GenericDelete,
  },
  setup() {
    const { rules } = utils();
    const { roles, getRoles } = useRole();

    return {
      rules,
      roles,
      getRoles,
      ...useUser(),
    };
  },
  mounted() {
    this.getUsersMethod();
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
          text: "Email",
          value: "initialEmail",
          sortable: false,
        },
        {
          text: "Roles",
          value: "roles",
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
      editedIndex: -1,
      loading: true,
      showPassword: false,
      defaultUser: { ...this.initialUser },
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
      val ? this.getRoles() : this.close();
    },
    options: {
      handler() {
        this.getUsersMethod();
      },
      deep: true,
    },
  },
  methods: {
    getUsersMethod() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const order = !sortDesc[0] ? "asc" : "desc";
      const sort = sortBy[0] === undefined ? "updateDate" : sortBy[0];
      this.getUsers((page - 1) * itemsPerPage, itemsPerPage, order, sort).then(
        () => {
          this.loading = false;
        }
      );
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.defaultUser = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultUser = { ...item };
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await this.deleteUser(this.defaultUser.id);
      if (res) this.close();
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultUser = { ...this.initialUser };
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
          const newObj = {
            name: this.defaultUser.name,
            roleIds: this.defaultUser.roles.map((x) => x.id),
          };
          const res = await this.updateUser(this.editedIndex, newObj);
          if (res) this.close();
        } else {
          const newObj = {
            name: this.defaultUser.name,
            email: this.defaultUser.email,
            password: this.defaultUser.password,
            roleIds: this.defaultUser.roles.map((x) => x.id),
          };
          const res = await this.createUser(newObj);
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
