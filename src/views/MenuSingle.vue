<template>
  <div>
    <v-app-bar app dark elevation="3" color="purple darken-3">
      <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
      <v-btn dark elevation="1" color="purple darken-2" @click="backToMock()"
        ><v-icon>mdi-arrow-left-bold</v-icon> Back</v-btn
      >
      <v-icon large class="pl-6">mdi-language-java</v-icon>
      <v-toolbar-title class="d-flex align-center font-weight-medium text-h4"
        >COFFEE NOW!</v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <v-card class="ma-3">
        <v-data-table
          :headers="headers"
          :loading="loading"
          :items="dishes"
          :options.sync="options"
          :mobile-breakpoint="1024"
          sort-by="category"
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
              </v-dialog>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-toolbar-title>Blah-blah</v-toolbar-title>
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
            <v-icon small class="mr-2" @click="removeItem(item)">
              mdi-minus-thick
            </v-icon>
            <!--            {{// item.}}-->
            <v-icon small @click="addItem(item)"> mdi-plus-thick </v-icon>
          </template>
        </v-data-table>
        <v-card-actions>
          <p class="mb-0 font-weight-thin text--lighten-3">
            After making your order press the 'Order' button to proceed to
            checkout
          </p>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" dark color="purple darken-3" @click="toCheckout()"
            >Order</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import router from "@/router";
import useDish from "@/compositions/dish";
import VueCompositionAPI from "@vue/composition-api";
import Vue from "vue";
Vue.use(VueCompositionAPI);
import { ref } from "@vue/composition-api";

export default {
  name: "MenuSingle",
  setup() {
    const order = ref([]);
    return {
      ...useDish(),
      order,
    };
  },
  mounted() {
    this.getDishesMethod();
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
          sortable: true,
        },
        // {
        //   text: "Image",
        //   value: "image",
        //   sortable: false,
        // },
        {
          text: "Description",
          value: "description",
          sortable: true,
        },
        {
          text: "Price",
          value: "price",
          sortable: true,
        },
        {
          text: "Category",
          value: "category",
          sortable: true,
        },
        {
          text: "Amount",
          value: "order",
          sortable: false,
          align: "center",
        },
        {
          text: "Controls",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      editedIndex: -1,
      loading: true,
      // defaultUser: { ...this.initialUser },
      options: {},
    };
  },
  watch: {
    options: {
      handler() {
        this.getDishesMethod();
      },
      deep: true,
    },
  },
  methods: {
    backToMock() {
      router.push("/mock");
    },
    toCheckout() {
      alert("LOL");
    },
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
    addItem(item) {
      console.log(item);
      // if (!this.order) this.order.value = [];
      console.log(this.order);
      const id = this.order.find((orderEl) => orderEl.dishId === item.id);
      if (id) {
        this.order[id].amount++;
      } else {
        this.order.push({
          dishId: item.id,
          amount: 1,
        });
      }
    },
    removeItem(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped></style>
