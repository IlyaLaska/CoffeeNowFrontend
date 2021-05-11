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
                <!--                &lt;!&ndash;          New item Button&ndash;&gt;-->
                <!--                <template v-slot:activator="{ on }">-->
                <!--                  <v-btn-->
                <!--                    color="purple darken-3"-->
                <!--                    dark-->
                <!--                    class="mb-2"-->
                <!--                    v-on="on"-->
                <!--                    @click="toCheckout"-->
                <!--                  >-->
                <!--                    Order-->
                <!--                  </v-btn>-->
                <!--                </template>-->
              </v-dialog>
              <v-divider class="mx-4" inset vertical></v-divider>
              <!--              TODO How to get menu name-->
              <v-toolbar-title>Menu Name Here</v-toolbar-title>
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
          <template v-slot:[`item.description`]="{ item }">
            <div style="max-width: 60vw">{{ item.description }}</div>
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
          <!--          <p class="mb-0 font-weight-thin text&#45;&#45;lighten-3">-->
          <!--            After making your order press the 'Order' button to proceed to-->
          <!--            checkout-->
          <!--          </p>-->
          <v-text-field
            v-model="notes"
            label="Enter any additional notes here..."
            class="ml-2 mx-4"
          ></v-text-field>
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
import useOrder from "../compositions/order";

export default {
  name: "MenuSingle",
  setup() {
    const order = ref([]);
    const notes = ref("");
    return {
      ...useDish(),
      ...useOrder(),
      order,
      notes,
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
          value: "amount",
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
    async toCheckout() {
      // alert("LOL");
      console.log("notes: ", this.notes);
      console.log("Checkout: ", this.dishes);
      const newObj = {
        notes: this.notes,
        order: this.dishes
          .filter((dish) => dish.amount)
          .map((dish) => {
            return {
              dishId: dish.id,
              amount: dish.amount,
            };
          }),
      };
      console.log("NewObj: ", newObj);
      await this.createOrder(newObj);
      // this.dishes.reduce((prev, dish, ind, acc) => {
      //   if (dish.amount) {
      //     acc.push({
      //       dishId: dish.id,
      //       amount: dish.amount,
      //     });
      //     return acc;
      //   } else return acc;
      // }, []),
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
      // console.log("adding: ", item);
      // if (!this.order) this.order.value = [];
      // console.log("order: ", this.order);
      item.amount++;
      // const id = this.order.find((orderEl) => orderEl.dishId === item.id);
      // if (id) {
      //   this.order[id].amount++;
      // } else {
      //   this.order.push({
      //     dishId: item.id,
      //     amount: 1,
      //   });
      // }
    },
    removeItem(item) {
      // console.log("removing: ", item);
      if (item.amount > 0) item.amount--;
    },
  },
};
</script>

<style scoped></style>
