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
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    children: [
      { path: "/orders-active", name: "ActiveOrders", component: ActiveOrders },
      { path: "/orders", name: "AllOrders", component: AllOrders },
      { path: "/menus", name: "Menus", component: Menus },
      { path: "/dishes", name: "Dishes", component: Dishes },
      { path: "/roles", name: "Roles", component: Roles },
      { path: "/users", name: "Users", component: Users },
    ],
  },
  { path: "*", name: "NotFound", component: NotFound },
  { path: "/forbidden", name: "Forbidden", component: Forbidden },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
  // linkExactActiveClass: "active-page", // TODO need it?
});

// TODO add auth requirement

export default router;
