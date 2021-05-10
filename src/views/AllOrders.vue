<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="orders"
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
          <!--          Add item Card-->
          <v-card>
            <v-form ref="form">
              <v-card-title class="headline">{{ formTitle }}</v-card-title>
              <v-card-text>
                <v-col v-if="editedIndex === -1" cols="12" class="py-1">
                  <v-text-field
                    v-model="defaultOrder.notes"
                    label="Notes"
                    :rules="[rules.required]"
                    prepend-icon="mdi-text-short"
                    type="text"
                    color="purple darken-3"
                  ></v-text-field>
                </v-col>
                <v-col v-if="editedIndex !== -1" cols="12" class="py-1">
                  <v-select
                    v-model="defaultOrder.status"
                    prepend-icon="mdi-list-status"
                    :items="orderStatusArr"
                    :item-text="'name'"
                    :item-value="'id'"
                    label="Status"
                    :rules="[rules.required]"
                    color="purple darken-3"
                    required
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
        <v-toolbar-title>All Orders</v-toolbar-title>
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
        <v-icon dark> mdi-cookie </v-icon>
      </v-avatar>
    </template>
    <!--    TODO Add dishes and dish amounts here-->
    <template v-slot:[`item.orderToDish`]="{ item }">
      <v-chip
        v-for="dishOrder in item.orderToDish"
        :key="dishOrder.id"
        class="ma-1"
        color="gray"
        @click="toDishes"
      >
        <v-icon left small color="grey"> mdi-bowl-mix </v-icon>
        {{ dishOrder.dish.name }}: {{ dishOrder.amount }}
      </v-chip>
    </template>
    <template v-slot:[`item.notes`]="{ item }">
      <div style="max-width: 20vw">{{ item.notes }}</div>
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
import useOrder from "@/compositions/order";
import router from "@/router";

export default {
  name: "AllOrders",
  mixins: [filters],
  components: {
    GenericDelete,
  },
  setup() {
    const { rules } = utils();

    return {
      rules,
      ...useOrder(),
    };
  },
  mounted() {
    this.getAllOrdersMethod();
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
          text: "Code",
          value: "code",
          sortable: false,
        },
        {
          text: "Notes",
          value: "notes",
          sortable: false,
        },
        {
          text: "Order",
          value: "orderToDish",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
        },
        {
          text: "Price",
          value: "price",
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
      defaultOrder: { ...this.initialOrder },
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
        this.getAllOrdersMethod();
      },
      deep: true,
    },
  },
  methods: {
    toDishes() {
      router.push({ name: "Dishes" });
    },
    getAllOrdersMethod() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const order = !sortDesc[0] ? "asc" : "desc";
      const sort = sortBy[0] === undefined ? "updateDate" : sortBy[0];
      this.getAllOrders(
        (page - 1) * itemsPerPage,
        itemsPerPage,
        order,
        sort
      ).then(() => {
        this.loading = false;
      });
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.defaultOrder = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultOrder = { ...item };
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await this.deleteUser(this.defaultOrder.id);
      if (res) this.close();
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultOrder = { ...this.initialOrder };
        this.$refs.form?.resetValidation();
        setTimeout(() => {
          this.editedIndex = -1;
        }, 300);
      });
    },
    async save() {
      const correct = this.$refs.form.validate();
      if (correct) {
        const newObj = {
          status: this.defaultOrder.status,
        };
        const res = await this.updateOrder(this.editedIndex, newObj);
        if (res) this.close();
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
