<template>
  <div>
    <v-app-bar app dark elevation="3" color="purple darken-3">
      <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
      <v-btn dark elevation="0" color="purple darken-3" @click="backToMock()"
        ><v-icon>mdi-arrow-left-bold</v-icon> Back</v-btn
      >
      <v-divider inset vertical class="mx-2"></v-divider>
      <v-icon class="pl-6">mdi-coffee</v-icon>
      <v-toolbar-title class="d-flex align-center font-weight-medium text-h5"
        >COFFEE NOW!</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        class="ma-0"
        dark
        color="orange darken-4 elevation-2"
        @click="dialog = !dialog"
        >Order!</v-btn
      >
      <v-divider vertical inset class="mx-2"></v-divider>
      <v-btn
        class="ma-0"
        dark
        color="purple darken-3 elevation-0"
        @click="dialogMyOrders = !dialogMyOrders"
        >My orders</v-btn
      >
      <v-divider vertical inset class="mx-2"></v-divider>
      <v-btn
        class="ma-0"
        dark
        color="purple darken-3 elevation-0"
        @click="dialogTrackOrder = !dialogTrackOrder"
        >Track Order</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-card class="py-2 elevation-0">
        <!--        <v-data-table-->
        <!--          :headers="headers"-->
        <!--          :loading="loading"-->
        <!--          :items="dishes"-->
        <!--          :options.sync="options"-->
        <!--          :mobile-breakpoint="1024"-->
        <!--          sort-by="category"-->
        <!--          sort-asc-->
        <!--          class="elevation-1"-->
        <!--          hide-default-footer-->
        <!--        >-->
        <!--          &lt;!&ndash;    Form controls&ndash;&gt;-->
        <!--          <template v-slot:top>-->
        <!--            <v-toolbar flat>-->
        <!--              &lt;!&ndash;              <v-dialog persistent v-model="dialog" max-width="80vh">&ndash;&gt;-->
        <!--              &lt;!&ndash;                &lt;!&ndash;          New item Button&ndash;&gt;&ndash;&gt;-->
        <!--              &lt;!&ndash;                <template v-slot:activator="{ on }">&ndash;&gt;-->
        <!--              &lt;!&ndash;                  <v-btn&ndash;&gt;-->
        <!--              &lt;!&ndash;                    color="purple darken-3"&ndash;&gt;-->
        <!--              &lt;!&ndash;                    dark&ndash;&gt;-->
        <!--              &lt;!&ndash;                    class="mb-2"&ndash;&gt;-->
        <!--              &lt;!&ndash;                    v-on="on"&ndash;&gt;-->
        <!--              &lt;!&ndash;                    @click="toCheckout"&ndash;&gt;-->
        <!--              &lt;!&ndash;                  >&ndash;&gt;-->
        <!--              &lt;!&ndash;                    Order&ndash;&gt;-->
        <!--              &lt;!&ndash;                  </v-btn>&ndash;&gt;-->
        <!--              &lt;!&ndash;                </template>&ndash;&gt;-->
        <!--              &lt;!&ndash;              </v-dialog>&ndash;&gt;-->
        <!--              <v-btn-->
        <!--                class="ma-0"-->
        <!--                dark-->
        <!--                color="purple darken-3"-->
        <!--                @click="dialog = !dialog"-->
        <!--                >Order</v-btn-->
        <!--              >-->
        <!--              &lt;!&ndash;              <v-divider class="ml-4" inset vertical></v-divider>&ndash;&gt;-->
        <!--              <v-divider class="mx-3" inset vertical></v-divider>-->
        <!--              <v-toolbar-title class="font-weight-medium">{{-->
        <!--                menu.name-->
        <!--              }}</v-toolbar-title>-->
        <!--            </v-toolbar>-->
        <!--          </template>-->
        <!--          <template v-slot:[`item.id`]="{}">-->
        <!--            <v-avatar size="40" color="purple darken-3">-->
        <!--              <v-icon dark> mdi-account </v-icon>-->
        <!--            </v-avatar>-->
        <!--          </template>-->
        <!--          <template v-slot:[`item.roles`]="{ item }">-->
        <!--            <v-chip-->
        <!--              v-for="role in item.roles"-->
        <!--              :key="role.id"-->
        <!--              class="ma-1"-->
        <!--              color="gray"-->
        <!--            >-->
        <!--              <v-icon left small color="grey"> mdi-semantic-web </v-icon>-->
        <!--              {{ role.name }}-->
        <!--            </v-chip>-->
        <!--          </template>-->
        <!--          <template v-slot:[`item.description`]="{ item }">-->
        <!--            <div style="max-width: 60vw">{{ item.description }}</div>-->
        <!--          </template>-->
        <!--          <template v-slot:[`item.createDate`]="{ item }">-->
        <!--            {{ item.createDate | shortDate }}-->
        <!--          </template>-->
        <!--          <template v-slot:[`item.actions`]="{ item }">-->
        <!--            <v-icon small class="mr-2" @click="removeItem(item)">-->
        <!--              mdi-minus-thick-->
        <!--            </v-icon>-->
        <!--            <v-icon small @click="addItem(item)"> mdi-plus-thick </v-icon>-->
        <!--          </template>-->
        <!--          &lt;!&ndash;          <template v-slot:footer><div>TETSTTST</div></template>&ndash;&gt;-->
        <!--          &lt;!&ndash;          <v-data-footer&ndash;&gt;-->
        <!--          &lt;!&ndash;            disable-pagination="true"&ndash;&gt;-->
        <!--          &lt;!&ndash;            disable-items-per-page="true"&ndash;&gt;-->
        <!--          &lt;!&ndash;          >&ndash;&gt;-->
        <!--          &lt;!&ndash;          </v-data-footer>&ndash;&gt;-->
        <!--        </v-data-table>-->
        <!--        <v-card-actions>-->
        <!--          <v-text-field-->
        <!--            v-model="notes"-->
        <!--            label="Enter any additional notes here..."-->
        <!--            class="ml-2 mx-4"-->
        <!--            color="purple darken-3"-->
        <!--          ></v-text-field>-->
        <!--        </v-card-actions>-->
        <v-container>
          <!--          <v-row dense>-->
          <!--            <v-col cols="4">-->
          <!--              <v-card class="pa-2">-->
          <!--                <v-card-title class="text-center">{{ dish.name }}</v-card-title>-->
          <!--                &lt;!&ndash;                <v-img :src="dish.image.location"></v-img>&ndash;&gt;-->
          <!--                <v-card-text>-->
          <!--                  <div>{{ dish.category }}</div>-->
          <!--                  <div>{{ dish.price }}</div>-->
          <!--                  <div>{{ dish.description }}</div>-->
          <!--                  <div class="float-right">-->
          <!--                    <v-icon small @click="addItem(item)">-->
          <!--                      mdi-plus-thick</v-icon-->
          <!--                    >-->
          <!--                    {{ dish.amount }}-->
          <!--                    <v-icon small class="mr-2" @click="removeItem(item)">-->
          <!--                      mdi-minus-thick</v-icon-->
          <!--                    >-->
          <!--                  </div>-->
          <!--                </v-card-text>-->
          <!--              </v-card>-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <v-layout row wrap>
            <v-flex v-for="dish in dishes" :key="dish.id">
              <v-card style="width: 19vw; min-width: 200px" class="my-1">
                <div class="text-center">
                  <v-img
                    :aspect-ratio="3 / 2"
                    :src="
                      dish.image
                        ? dish.image.location
                        : 'https://previews.123rf.com/images/koblizeek/koblizeek1902/koblizeek190200095/124960541-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-.jpg'
                    "
                  >
                  </v-img>
                </div>
                <v-card-title>{{ dish.name }}</v-card-title>
                <v-card-text>
                  <div>{{ dish.category }}</div>
                  <div class="font-weight-medium">₴{{ dish.price }}</div>
                  <div style="height: 25vh" class="descClass">
                    {{ dish.description }}
                  </div>
                  <div class="text-h6">
                    <v-icon class="mx-1" @click="removeItem(dish)">
                      mdi-minus-thick</v-icon
                    >
                    {{ dish.amount }}
                    <v-icon class="mx-1" @click="addItem(dish)">
                      mdi-plus-thick</v-icon
                    >
                  </div>
                </v-card-text>
                <!--                <div class="text-no-wrap">-->
                <!--                  {{ dish.name }}-->
                <!--                </div>-->
              </v-card>
            </v-flex>
            <v-flex v-for="i in 15" :key="i">
              <v-card
                flat
                style="
                  background-color: transparent;
                  width: 19vw;
                  min-width: 200px;
                "
                class="my-1"
              />
            </v-flex>
          </v-layout>
        </v-container>
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
            <v-list-item class="elevation-2" v-if="cartEmpty">
              <v-list-item-title
                class="font-weight-medium d-flex flex-row align-center"
                style="flex: initial"
              >
                Your cart seems to be empty...
              </v-list-item-title>
            </v-list-item>
            <v-divider class="my-3" v-if="!cartEmpty"></v-divider>
            <v-list-item class="elevation-2" v-if="!cartEmpty">
              <v-text-field
                v-model="notes"
                label="Enter any additional notes here..."
                prepend-icon="mdi-text"
                type="text"
                color="purple darken-3"
              ></v-text-field>
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
      <!--      persistent-->
      <v-dialog v-model="dialogMyOrders" width="40vw" fullscreen>
        <v-card>
          <v-toolbar dark elevation="3" color="purple darken-3">
            <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
            <v-btn
              dark
              elevation="0"
              color="purple darken-3"
              @click="dialogMyOrders = !dialogMyOrders"
              ><v-icon>mdi-arrow-left-bold</v-icon>Close</v-btn
            >
            <v-divider inset vertical class="mx-2"></v-divider>
            <v-icon class="pl-6">mdi-coffee</v-icon>
            <v-toolbar-title
              class="d-flex align-center font-weight-medium text-h5"
              >My Orders</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <!--            <v-btn class="ma-0" dark color="purple darken-2" @click="reload"-->
            <!--              >New Order</v-btn-->
            <!--            >-->
          </v-toolbar>
          <v-list>
            <v-list-item
              class="elevation-2 ma-2"
              v-for="order in ordersMine"
              :key="order.id"
              style="border-radius: 4px"
            >
              <v-list-item-content>
                <p>
                  <span class="font-weight-medium">Order:</span>
                  {{ order.code }}
                </p>
                <p class="mb-0">
                  <span class="font-weight-medium">Status:</span>
                  {{ order.status }}
                </p>
              </v-list-item-content>

              <!--              <v-list-item-action>-->
              <!--                <v-btn dark color="purple darken-3">Track</v-btn>-->
              <!--              </v-list-item-action>-->
            </v-list-item>
          </v-list>
          <p
            class="font-weight-medium text-h6 pa-2 mx-2 elevation-2"
            v-if="noOrders"
          >
            You don't seem to have any uncompleted orders...
          </p>
          <!--          <v-card class="ma-3">-->
          <!--            <v-card-title> Order {order.id} </v-card-title>-->
          <!--            <v-card-actions>-->
          <!--              <v-btn dark color="purple darken-3">Track</v-btn>-->
          <!--            </v-card-actions>-->
          <!--          </v-card>-->
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogTrackOrder" width="40vw" fullscreen>
        <v-card>
          <v-toolbar dark elevation="3" color="purple darken-3">
            <!--        <v-icon large class="pl-6">mdi-coffee</v-icon>-->
            <v-btn
              dark
              elevation="0"
              color="purple darken-3"
              @click="dialogTrackOrder = !dialogTrackOrder"
              ><v-icon>mdi-arrow-left-bold</v-icon>Close</v-btn
            >
            <v-divider inset vertical class="mx-2"></v-divider>
            <v-icon class="pl-6">mdi-coffee</v-icon>
            <v-toolbar-title
              class="d-flex align-center font-weight-medium text-h5"
              >Order Tracking</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <!--            <v-btn class="ma-0" dark color="purple darken-2" @click="reload"-->
            <!--              >New Order</v-btn-->
            <!--            >-->
          </v-toolbar>
          <v-card class="ma-3">
            <v-card-text>
              <v-text-field
                v-model="trackCode"
                label="Enter your order code:"
                hide-details
                color="purple darken-3"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn dark color="purple darken-3" @click="trackOrder"
                >Track</v-btn
              >
            </v-card-actions>
          </v-card>
          <!--          -->
          <v-card v-if="order && Object.keys(order).length" class="ma-3">
            <v-card-text>
              <p>
                <span class="font-weight-medium">Order:</span>
                {{ order.code }}
              </p>
              <p class="mb-0">
                <span class="font-weight-medium">Status:</span>
                {{ order.status }}
              </p>
            </v-card-text>
          </v-card>
        </v-card>
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
import { HTTP } from "../actions/index";

export default {
  name: "MenuSingle",
  setup() {
    // const order = ref([]);
    const notes = ref("");
    const { menu, getOneMenu } = useMenu();
    const menuName = ref("");
    const menuDishes = ref([]);
    const email = ref("");

    const public_key = process.env.VUE_APP_PUBLIC_KEY;
    const private_key = process.env.VUE_APP_PRIVATE_KEY;
    const liqpay = ref({});
    liqpay.value = new LiqPay(public_key, private_key);

    const data = ref("");
    const signature = ref("");

    const { rules } = utils();

    return {
      // ...useDish(),
      dishes: menuDishes,
      ...useOrder(),
      // order,
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
    // console.log("AAAAA: ", this.dishes);
    this.loading = false;
    setInterval(() => {
      // console.log(this.orders, this.orders.length);
      if (this.orders.length) this.getMyOrders();
    }, 5000);
  },
  data() {
    return {
      dialog: false,
      dialogMyOrders: false,
      dialogTrackOrder: false,
      trackCode: "",
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
      return correct === true && !this.cartEmpty;
    },
    ordersMine() {
      return this.orders.filter((order) => order.status !== "Completed");
    },
    orderPreview() {
      console.log("Dishes: ", this.dishes);
      if (!this.dishes.filter((dish) => dish.amount).length) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.cartEmpty = true;
        return [];
        // return ["Your cart seems to be empty...."];
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
    reload() {
      router.go();
    },
    trackOrder() {
      this.getOneOrderByCode(this.trackCode);
      console.log("One order:", this.order);
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
      const order = await this.createOrder(newObj);
      console.log("order: ", order);
      const html = await this.liqpay.cnb_form({
        action: "pay",
        amount: this.total,
        currency: "USD",
        description: order.code,
        order_id: order.code,
        server_url: process.env.VUE_APP_SERVER_URL,
        version: "3",
      });
      const htmlArr = html.split('value="');
      this.data = htmlArr[1].split('"')[0];
      this.signature = htmlArr[2].split('"')[0];
      // TODO why normal v-bind not work?
      const form = document.querySelector("#payForm");
      form["data"].value = this.data;
      form["signature"].value = this.signature;
      form.submit();
      setTimeout(() => {
        HTTP.post("https://www.liqpay.ua/api/request", {
          action: "status",
          version: "3",
          order_id: order.code,
        })
          .then((x) => console.log(x))
          .catch((err) => err);
        // this.liqpay.api(
        //   "request",
        //   {
        //     action: "status",
        //     version: "3",
        //     order_id: order.code,
        //   },
        //   function (json) {
        //     console.log("DING DING: ", json);
        //   }
        // );
      }, 20000);
      this.dialog = false;
      this.dialogMyOrders = true;
      this.dishes = this.dishes.map((dish) => {
        dish.amount = 0;
        return dish;
      });
      this.cartEmpty = true;
      this.total = 0;
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

.descClass {
  /*white-space: nowrap;*/
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
