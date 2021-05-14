"use strict";

import {
  apiFetchAllDishes,
  apiFetchOneDish,
  apiCreateDish,
  apiUpdateDish,
  apiDeleteDish,
} from "@/actions/dishes";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useDish() {
  const dish = ref({});
  const dishes = ref([]);
  const dishesCount = ref(0);

  const initialDish = {
    name: "",
    description: "",
    price: 0.0,
    category: "",
  };

  onUnmounted(() => {
    dish.value = {};
    dishes.value = [];
    dishesCount.value = 0;
  });

  const { changeItem } = utils();

  const getDishes = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllDishes(params);
    dishesCount.value = totalCount;
    dishes.value = result;
  };

  const getOneDish = async (id) => {
    const { value } = await apiFetchOneDish(id);
    dish.value = value;
  };

  const updateDish = (id, item) =>
    apiUpdateDish(id, item).then((x) => {
      if (x.status === 200) {
        dishes.value = [...changeItem(x.data, dishes.value)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Dish updated successfully",
        });
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const createDish = (item) =>
    apiCreateDish(item).then((x) => {
      if (x.status === 201) {
        dishes.value.unshift(x.data);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Dish created successfully",
        });
        return true;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const deleteDish = (id) =>
    apiDeleteDish(id).then((x) => {
      if (x.status === 200) {
        dishes.value = [...dishes.value.filter((item) => item.id !== id)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Dish deleted successfully",
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
    dish,
    dishes,
    initialDish,
    getDishes,
    getOneDish,
    updateDish,
    createDish,
    deleteDish,
  };
}
