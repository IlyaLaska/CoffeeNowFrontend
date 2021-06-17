<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="dishes"
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
                    v-model="defaultDish.name"
                    label="Name"
                    prepend-icon="mdi-text-short"
                    type="text"
                    :rules="[rules.required]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultDish.description"
                    label="Description"
                    prepend-icon="mdi-script-text-outline"
                    type="text"
                    :rules="[rules.required]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model.number="defaultDish.price"
                    label="Price"
                    prepend-icon="mdi-cash"
                    type="number"
                    :rules="[rules.required]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultDish.category"
                    label="Category"
                    prepend-icon="mdi-text"
                    type="text"
                    :rules="[rules.required]"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-file-input
                    chips
                    label="Image file"
                    :rules="[rules.required]"
                    color="purple darken-3"
                    truncate-length="15"
                    v-model="file"
                  ></v-file-input>
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
        <v-toolbar-title>Dishes</v-toolbar-title>
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
        <v-icon dark> mdi-image-text </v-icon>
      </v-avatar>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div style="max-width: 45vw">{{ item.description }}</div>
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
import useDish from "@/compositions/dish";
import { uploadImage } from "../actions/images";

export default {
  name: "Dishes",
  mixins: [filters],
  components: {
    GenericDelete,
  },
  setup() {
    const { rules } = utils();

    return {
      rules,
      ...useDish(),
    };
  },
  mounted() {
    this.getDishesMethod();
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      file: null,
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
          text: "Price",
          value: "price",
          sortable: false,
        },
        {
          text: "Category",
          value: "category",
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
      defaultDish: { ...this.initialDish },
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
        this.getDishesMethod();
      },
      deep: true,
    },
  },
  methods: {
    getDishesMethod() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const order = !sortDesc[0] ? "asc" : "desc";
      const sort = sortBy[0] === undefined ? "updateDate" : sortBy[0];
      this.getDishes((page - 1) * itemsPerPage, itemsPerPage, order, sort).then(
        () => {
          this.loading = false;
        }
      );
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.defaultDish = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultDish = { ...item };
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await this.deleteDish(this.defaultDish.id);
      if (res) this.close();
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultDish = { ...this.initialDish };
        this.$refs.form?.resetValidation();
        setTimeout(() => {
          this.editedIndex = -1;
        }, 300);
      });
    },
    async save() {
      const correct = this.$refs.form.validate();
      if (correct) {
        const formData = new FormData();
        formData.append("file", this.file);
        const res = await uploadImage(formData);
        console.log("After upload: ", res);
        const imageId = res.data.id;
        if (this.editedIndex !== -1) {
          const newObj = {
            name: this.defaultDish.name,
            description: this.defaultDish.description,
            price: parseFloat(this.defaultDish.price), // TODO why no work on your own??? - can create, cannot update
            category: this.defaultDish.category,
            imageId,
          };
          const res = await this.updateDish(this.editedIndex, newObj);
          if (res) this.close();
        } else {
          const res = await this.createDish({ ...this.defaultDish, imageId });
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
// TODO replace icon with photo,
//  add only numbers rule, decide how to save
</script>

<style scoped></style>
