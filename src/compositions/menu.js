"use strict";

import {
  apiCreateMenu,
  apiDeleteMenu,
  apiFetchAllMenus,
  apiFetchOneMenu,
  apiUpdateMenu,
} from "@/actions/menus";
import { onUnmounted, ref } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useMenu() {
  const menu = ref({});
  const menus = ref([]);
  const menusCount = ref(0);

  const menuDishes = ref([]);

  const initialMenu = {
    name: "",
    description: "",
    dishIds: [],
  };

  onUnmounted(() => {
    menu.value = {};
    menus.value = [];
    menusCount.value = 0;
  });

  const { changeItem } = utils();

  const getMenus = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllMenus(params);
    menusCount.value = totalCount;
    menus.value = result;
  };

  const getOneMenu = async (id) => {
    const res = await apiFetchOneMenu(id);
    if (res.dishes) {
      res.dishes = res.dishes.map((dish) => {
        dish.amount = 0;
        return dish;
      });
      menuDishes.value = res.dishes.map((dish) => {
        dish.amount = 0;
        return dish;
      });
    }
    menu.value = res;
  };

  const updateMenu = (id, item) =>
    apiUpdateMenu(id, item).then((x) => {
      if (x.status === 200) {
        menus.value = [...changeItem(x.data, menus.value)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Menu updated successfully",
        });
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const createMenu = (item) =>
    apiCreateMenu(item).then((x) => {
      if (x.status === 201) {
        menus.value.unshift(x.data);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Menu created successfully",
        });
        return true;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const deleteMenu = (id) =>
    apiDeleteMenu(id).then((x) => {
      if (x.status === 200) {
        menus.value = [...menus.value.filter((item) => item.id !== id)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Menu deleted successfully",
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
    menu,
    menus,
    menuDishes,
    initialMenu,
    getMenus,
    getOneMenu,
    updateMenu,
    createMenu,
    deleteMenu,
  };
}
