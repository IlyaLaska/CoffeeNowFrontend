import Vue from "vue";
import VueRouter from "vue-router";
import ActiveOrders from "@/views/ActiveOrders";
import Users from "@/views/Users";
import AllOrders from "@/views/AllOrders";
import Menus from "@/views/Menus";
import Dishes from "@/views/Dishes";
import Roles from "@/views/Roles";
import NotFound from "@/views/error/NotFound";
import Forbidden from "@/views/error/Forbidden";
import Mock from "@/views/Mock";
import MenuSingle from "@/views/MenuSingle";
import Login from "@/views/Login";
import store from "@/store/index";
import firebase from "firebase/app";
import { HTTP } from "@/actions/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: "/orders-active", name: "ActiveOrders", component: ActiveOrders },
      { path: "/orders", name: "AllOrders", component: AllOrders },
      { path: "/menus", name: "Menus", component: Menus },
      { path: "/dishes", name: "Dishes", component: Dishes },
      { path: "/roles", name: "Roles", component: Roles },
      { path: "/users", name: "Users", component: Users },
    ],
  },
  { path: "/mock", name: "Mock", component: Mock },
  { path: "/menu/:id", name: "MenuSingle", component: MenuSingle },
  { path: "*", name: "NotFound", component: NotFound },
  { path: "/forbidden", name: "Forbidden", component: Forbidden },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
  // linkExactActiveClass: "active-page", // TODO need it?
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    const user = await firebase.auth().currentUser;
    if (user) {
      store.dispatch("addUser", user.email);
      if (!store.getters.getIsLogin) {
        await firebase
          .auth()
          .currentUser?.getIdTokenResult()
          .then((y) => {
            HTTP.defaults.headers.Authorization = `Bearer ${y.token}`;
            store.dispatch("addToken", y.token);
            store.dispatch("addIsLogin", true);
          })
          .catch((x) => {
            store.dispatch("addSnackbar", { isOpen: true, message: x.message });
          });
        next();
      } else {
        next();
      }
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
