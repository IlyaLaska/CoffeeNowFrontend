"use strict";

import {
  apiFetchAllOrders,
  apiFetchOneOrder,
  apiCreateOrder,
  apiUpdateOrder,
  apiDeleteOrder,
} from "@/actions/orders";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useOrder() {
  const order = ref({});
  const orders = ref([]);
  const ordersCount = ref(0);

  const initialOrder = {
    notes: "",
    order: [],
  };

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

  const getOrders = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllOrders(params);
    ordersCount.value = totalCount;
    orders.value = result;
  };

  const getOneOrder = async (id) => {
    const { value } = await apiFetchOneOrder(id);
    order.value = value;
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
        return true;
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
    initialOrder,
    orderDish,
    getOrders,
    getOneOrder,
    updateOrder,
    createOrder,
    deleteOrder,
  };
}
