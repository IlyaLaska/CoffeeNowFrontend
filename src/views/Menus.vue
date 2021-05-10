<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="menus"
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
                    v-model="defaultMenu.name"
                    label="Name"
                    :rules="[rules.required]"
                    prepend-icon="mdi-text-short"
                    type="text"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultMenu.description"
                    label="Description"
                    prepend-icon="mdi-text-short"
                    type="text"
                    :rules="[rules.required]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-select
                    v-model="defaultMenu.dishes"
                    prepend-icon="mdi-bowl-mix"
                    :items="dishes"
                    :item-text="'name'"
                    :item-value="'id'"
                    label="Dishes"
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
        <v-toolbar-title>Menus</v-toolbar-title>
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
        <v-icon dark> mdi-file-document </v-icon>
      </v-avatar>
    </template>
    <template v-slot:[`item.dishes`]="{ item }">
      <v-chip
        v-for="dish in item.dishes"
        :key="dish.id"
        class="ma-1"
        color="gray"
      >
        <v-icon left small color="grey"> mdi-bowl-mix </v-icon>
        {{ dish.name }}
      </v-chip>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div style="max-width: 20vw">{{ item.description }}</div>
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
import utils from "@/compositions/utils";
import filters from "@/mixins/filters";
import GenericDelete from "@/components/GenericDelete";
import useMenu from "@/compositions/menu";
import useDish from "@/compositions/dish";

export default {
  name: "Menus",
  mixins: [filters],
  components: {
    GenericDelete,
  },
  setup() {
    const { rules } = utils();
    const { dishes, getDishes } = useDish();

    return {
      rules,
      dishes,
      getDishes,
      ...useMenu(),
    };
  },
  mounted() {
    this.getMenusMethod();
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
          text: "Description",
          value: "description",
          sortable: false,
        },
        {
          text: "Dishes",
          value: "dishes",
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
      defaultMenu: { ...this.initialMenu },
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
      val ? this.getDishes(0, -1, "desc", "createDate") : this.close();
    },
    options: {
      handler() {
        this.getMenusMethod();
      },
      deep: true,
    },
  },
  methods: {
    getMenusMethod() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const order = !sortDesc[0] ? "asc" : "desc";
      const sort = sortBy[0] === undefined ? "updateDate" : sortBy[0];
      this.getMenus((page - 1) * itemsPerPage, itemsPerPage, order, sort).then(
        () => {
          this.loading = false;
        }
      );
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.defaultMenu = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultMenu = { ...item };
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await this.deleteMenu(this.defaultMenu.id);
      if (res) this.close();
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultMenu = { ...this.initialMenu };
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
            name: this.defaultMenu.name,
            description: this.defaultMenu.description,
            dishIds: this.defaultMenu.dishes.map((x) => x.id),
          };
          const res = await this.updateMenu(this.editedIndex, newObj);
          if (res) this.close();
        } else {
          const newObj = {
            name: this.defaultMenu.name,
            description: this.defaultMenu.description,
            dishIds: this.defaultMenu.dishes.map((x) => x.id),
          };
          const res = await this.createMenu(newObj);
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

// TODO where are get params added? why undefined
</script>

<style scoped></style>
