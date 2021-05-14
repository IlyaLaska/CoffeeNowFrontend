<template>
  <div>
    <v-app-bar app dark elevation="3" color="purple darken-3">
      <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
      <v-btn dark elevation="1" color="purple darken-2" @click="backToMock()"
        ><v-icon>mdi-arrow-left-bold</v-icon> Back</v-btn
      >
      <v-icon class="pl-6">mdi-coffee</v-icon>
      <v-toolbar-title class="d-flex align-center font-weight-medium text-h5"
        >COFFEE NOW!</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn class="ma-0" dark color="purple darken-2" @click="dialog = !dialog"
        >Order</v-btn
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
          sort-asc
          class="elevation-1"
          hide-default-footer
        >
          <!--    Form controls-->
          <template v-slot:top>
            <v-toolbar flat>
              <!--              <v-dialog persistent v-model="dialog" max-width="80vh">-->
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
              <!--              </v-dialog>-->
              <v-divider class="ml-4" inset vertical></v-divider>
              <v-divider class="mx-3" inset vertical></v-divider>
              <v-toolbar-title class="font-weight-medium">{{
                menu.name
              }}</v-toolbar-title>
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
            <v-icon small @click="addItem(item)"> mdi-plus-thick </v-icon>
          </template>
          <!--          <template v-slot:footer><div>TETSTTST</div></template>-->
          <!--          <v-data-footer-->
          <!--            disable-pagination="true"-->
          <!--            disable-items-per-page="true"-->
          <!--          >-->
          <!--          </v-data-footer>-->
        </v-data-table>
        <v-card-actions>
          <v-text-field
            v-model="notes"
            label="Enter any additional notes here..."
            class="ml-2 mx-4"
            color="purple darken-3"
          ></v-text-field>
          <v-btn
            class="ma-0"
            dark
            color="purple darken-3"
            @click="dialog = !dialog"
            >Order</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" width="40vw" persistent>
        <v-card width="40vw" class="wrap">
          <v-list class="pa-4" nav>
            <!--            <v-list-item-->
            <!--              class="elevation-2 mb-4"-->
            <!--              v-for="item in orderPreview"-->
            <!--              :key="item"-->
            <!--            >-->
            <!--              <v-icon left>mdi-bowl</v-icon>-->

            <!--              <v-list-item-title>{{ item }}</v-list-item-title>-->
            <!--            </v-list-item>-->
            <v-list-item
              class="elevation-2"
              v-for="item in orderPreview"
              :key="item"
            >
              <v-icon left>mdi-bowl-mix</v-icon>

              <div class="d-flex" style="flex: 1">
                <v-list-item-title
                  class="d-flex flex-row align-center"
                  style="flex: initial"
                >
                  {{ item.name }}
                </v-list-item-title>

                <div class="dots mx-4"></div>
                <div>{{ item.price }}</div>
              </div>
            </v-list-item>
            <v-list-item class="elevation-2" v-if="!cartEmpty">
              <v-icon left>mdi-script-text-outline</v-icon>
              <div class="d-flex" style="flex: 1">
                <v-list-item-title
                  class="font-weight-medium d-flex flex-row align-center"
                  style="flex: initial"
                >
                  Total:
                </v-list-item-title>

                <div class="dots mx-4"></div>
                <div class="font-weight-medium">{{ pricePreview }}</div>
              </div>
            </v-list-item>
            <v-list-item class="elevation-2" v-if="!cartEmpty">
              <v-text-field
                v-model="email"
                prepend-icon="mdi-at"
                type="text"
                label="Enter your email to get the code"
                :rules="[rules.email]"
                color="purple darken-3"
              ></v-text-field>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn dark color="red darken-3" left @click="dialog = !dialog"
              >Back</v-btn
            >
            <v-spacer></v-spacer>
            <!--            TODO block button when no email-->
            <v-btn
              dark
              color="purple darken-3"
              right
              @click="toCheckout"
              :disabled="!validEmail"
              >Confirm order</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-form
          method="POST"
          action="https://www.liqpay.ua/api/3/checkout"
          accept-charset="utf-8"
          id="payForm"
          target="_blank"
        >
          <input type="hidden" name="data" value="" /><input
            type="hidden"
            name="signature"
            value=""
          />
        </v-form>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import router from "@/router";
// import useDish from "@/compositions/dish";
import VueCompositionAPI from "@vue/composition-api";
import Vue from "vue";
Vue.use(VueCompositionAPI);
import { ref } from "@vue/composition-api";
import useOrder from "../compositions/order";
import useMenu from "../compositions/menu";
import LiqPay from "liq-sdk";
import utils from "../compositions/utils";
// import { apiPay } from "../actions/payment";

export default {
  name: "MenuSingle",
  setup() {
    const order = ref([]);
    const notes = ref("");
    const { menu, getOneMenu } = useMenu();
    const menuName = ref("");
    const dishes = ref([]);
    const email = ref("");

    const public_key = "sandbox_i3090105878";
    const private_key = "sandbox_2HXJVgoQdhuXfRAwwrIj57zwkbcBrcGNOvIVqt53";
    const liqpay = ref({});
    liqpay.value = new LiqPay(public_key, private_key);

    const data = ref("");
    const signature = ref("");

    const { rules } = utils();

    return {
      // ...useDish(),
      dishes,
      ...useOrder(),
      order,
      notes,
      email,
      menu,
      getOneMenu,
      menuName,
      liqpay,
      data,
      signature,
      rules,
    };
  },
  async mounted() {
    // this.getDishesMethod();
    // console.log("AAAAA: Start");
    await this.getOneMenu(this.$route.params.id);
    if (this.menu instanceof Error) {
      router.push("/notfound");
    }
    // console.log("AAAAA: ", this.menu);
    this.dishes = this.menu.dishes;
    console.log("AAAAA: ", this.dishes);
    this.loading = false;
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
      cartEmpty: true,
      total: 0,
    };
  },
  // watch: {
  //   options: {
  //     async handler() {
  //       // this.getDishesMethod();
  //       await this.getOneMenu(this.$route.params.id);
  //       this.dishes = this.menu.dishes;
  //     },
  //     deep: true,
  //   },
  // },
  computed: {
    validEmail() {
      const correct = this.rules.email(this.email);
      console.log(correct);
      return correct === true;
    },
    orderPreview() {
      console.log("Dishes: ", this.dishes);
      if (!this.dishes.filter((dish) => dish.amount).length) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.cartEmpty = true;
        return ["Your cart seems to be empty...."];
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.total = 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.cartEmpty = false;
      return this.dishes
        .filter((dish) => dish.amount)
        .map((dish) => {
          this.total += dish.price * dish.amount;
          return {
            name: `${dish.name} x${dish.amount}`,
            price: (dish.price * dish.amount).toFixed(2),
          }; //`${` `.padEnd(100, ".")} ${dish.price * dish.amount}`;
        });
    },
    pricePreview() {
      return this.total.toFixed(2);
      // return `${"Total: ".padEnd(100, ".")} ${this.total.toFixed(2)}`;
    },
  },
  methods: {
    backToMock() {
      router.push("/mock");
    },
    // async orderPreview() {
    //   const orderPreview = this.dishes
    //     .filter((dish) => dish.amount)
    //     .map((dish) => {
    //       return `${`${dish.name} x${dish.amount} `.padEnd(30, ".")} ${
    //         dish.price * dish.amount
    //       }`;
    //       // return {
    //       //   name: dish.name,
    //       //   amount: dish.amount,
    //       //   price: dish.price * dish.amount
    //       // };
    //     });
    // },
    async toCheckout() {
      console.log("notes: ", this.notes);
      console.log("Checkout: ", this.dishes);
      const newObj = {
        notes: this.notes,
        email: this.email,
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
      const html = await this.liqpay.cnb_form({
        action: "pay",
        amount: this.total,
        currency: "USD",
        description: "description text",
        order_id: "order_id_1",
        version: "3",
      });
      console.log("HTMLMLMLM", html);
      const htmlArr = html.split('value="');
      this.data = htmlArr[1].split('"')[0];
      this.signature = htmlArr[2].split('"')[0];
      // TODO stopped by CORS - what's the diff
      // const res = await apiPay(this.data, this.signature);
      // console.log("RESSS: ", res);
      console.log("DATATAT: ", this.data);
      console.log("DATATAT: ", this.signature);
      // TODO why normal v-bind not work?
      document.getElementById("payForm")["data"].value = this.data;
      document.getElementById("payForm")["signature"].value = this.signature;
      document.getElementById("payForm").submit();
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
      // console.log("adding: ", item, this.dishes);
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

<style scoped>
.dots {
  border-bottom: 2px dotted #404040;
  display: flex;
  flex: 1;
  max-height: 1rem;
}
</style>
