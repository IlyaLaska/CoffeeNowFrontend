"use strict";

import {
  apiFetchAllUsers,
  apiFetchOneUser,
  apiCreateUser,
  apiUpdateUser,
  apiDeleteUser,
} from "@/actions/users";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useUser() {
  const user = ref({});
  const users = ref([]);
  const usersCount = ref(0);

  const initialUser = {
    name: "",
    email: "",
    password: "",
    roleIds: [],
  };

  onUnmounted(() => {
    user.value = {};
    users.value = [];
    usersCount.value = 0;
  });

  const { changeItem } = utils();

  const getUsers = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllUsers(params);
    usersCount.value = totalCount;
    users.value = result;
  };

  const getOneUser = async (id) => {
    const { value } = await apiFetchOneUser(id);
    user.value = value;
  };

  const updateUser = (id, item) =>
    apiUpdateUser(id, item).then((x) => {
      if (x.status === 200) {
        users.value = [...changeItem(x.data, users.value)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "User updated successfully",
        });
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const createUser = (item) =>
    apiCreateUser(item).then((x) => {
      if (x.status === 201) {
        users.value.unshift(x.data);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "User created successfully",
        });
        return true;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const deleteUser = (id) =>
    apiDeleteUser(id).then((x) => {
      if (x.status === 200) {
        users.value = [...users.value.filter((item) => item.id !== id)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "User deleted successfully",
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
    user,
    users,
    initialUser,
    getUsers,
    getOneUser,
    updateUser,
    createUser,
    deleteUser,
  };
}
