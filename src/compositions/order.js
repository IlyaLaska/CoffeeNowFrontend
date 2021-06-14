"use strict";

import {
  apiFetchMyOrders,
  apiFetchAllOrders,
  apiFetchOneOrder,
  apiFetchOneOrderByCode,
  apiCreateOrder,
  apiUpdateOrder,
  apiDeleteOrder,
  apiFetchActiveOrders,
} from "@/actions/orders";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useOrder() {
  const order = ref({});
  const orders = ref([]);
  const ordersCount = ref(0);
  const noOrders = ref(true);

  const initialOrder = {
    code: "",
    notes: "",
    status: "",
    price: 0,
    orderToDish: [],
  };

  const orderStatusEnum = {
    processing: "Processing",
    inProgress: "In Progress",
    ready: "Ready",
    completed: "Completed",
  };

  const orderStatusArr = Object.values(orderStatusEnum);

  //TODO sort it out
  const orderDish = {
    dishId: 0,
    amount: 0,
  };

  onUnmounted(() => {
    order.value = {};
    orders.value = [];
    ordersCount.value = 0;
  });

  const { changeItem } = utils();

  const getMyOrders = async () => {
    const params = new URLSearchParams();
    const res = await apiFetchMyOrders(params, orders.value);
    // console.log("WTF:: ", orders.value);
    // console.log("MY ORDERS:: ", res);
    if (!res.length) noOrders.value = true;
    orders.value = res;
  };

  const getActiveOrders = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchActiveOrders(params);
    ordersCount.value = totalCount;
    orders.value = result;
  };

  const getAllOrders = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllOrders(params);
    ordersCount.value = totalCount;
    orders.value = result;
    if (!totalCount) {
      noOrders.value = true;
    }
  };

  const getOneOrder = async (id) => {
    const { value } = await apiFetchOneOrder(id);
    order.value = value;
  };

  const getOneOrderByCode = async (code) => {
    const value = await apiFetchOneOrderByCode(code);
    if (value instanceof Error) {
      order.value = null;
    } else {
      order.value = value;
      console.log("In comp:", order.value);
    }
  };

  const updateOrder = (id, item) =>
    apiUpdateOrder(id, item).then((x) => {
      if (x.status === 200) {
        orders.value = [...changeItem(x.data, orders.value)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Order updated successfully",
        });
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const createOrder = (item) =>
    apiCreateOrder(item).then((x) => {
      if (x.status === 201) {
        orders.value.unshift(x.data);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Order created successfully",
        });
        noOrders.value = false;
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const deleteOrder = (id) =>
    apiDeleteOrder(id).then((x) => {
      if (x.status === 200) {
        orders.value = [...orders.value.filter((item) => item.id !== id)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Order deleted successfully",
        });
        return true;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  return {
    order,
    orders,
    orderStatusEnum,
    orderStatusArr,
    initialOrder,
    orderDish,
    getMyOrders,
    getActiveOrders,
    getAllOrders,
    getOneOrder,
    getOneOrderByCode,
    updateOrder,
    createOrder,
    deleteOrder,
    noOrders,
  };
}
