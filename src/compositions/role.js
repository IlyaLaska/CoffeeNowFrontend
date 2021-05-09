"use strict";
import {
  apiFetchAllRoles,
  apiFetchOneRole,
  apiCreateRole,
  apiUpdateRole,
  apiDeleteRole,
} from "@/actions/roles";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import utils from "@/compositions/utils";

export default function useRole() {
  const role = ref({});
  const roles = ref([]);
  const rolesCount = ref(0);

  const initialRole = {
    name: "",
    key: "", //TODO add enum validation
  };

  const { changeItem } = utils();

  onUnmounted(() => {
    role.value = {};
    roles.value = [];
    rolesCount.value = 0;
  });

  const getRoles = async (skip, take, order, sortBy) => {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("take", take);
    params.append("order", order);
    params.append("sortBy", sortBy);
    const { result, totalCount } = await apiFetchAllRoles();
    roles.value = result;
    rolesCount.value = totalCount;
  };

  const getOneRole = async (id) => {
    const { value } = await apiFetchOneRole(id);
    role.value = value;
  };

  const updateRole = (id, item) =>
    apiUpdateRole(id, item).then((x) => {
      if (x.status === 200) {
        roles.value = [...changeItem(x.data, roles.value)];
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Role updated successfully",
        });
        return x.data;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const createRole = (item) =>
    apiCreateRole(item).then((x) => {
      if (x.status === 201) {
        roles.value.unshift(x.data);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Role created successfully",
        });
        return true;
      }
      store.dispatch("addSnackbar", {
        isOpen: true,
        message: x?.response?.data.message,
      });
      return false;
    });

  const deleteRole = (id) =>
    apiDeleteRole(id).then((x) => {
      if (x.status === 200) {
        roles.value = roles.value.filter((item) => item.id !== id);
        store.dispatch("addSnackbar", {
          isOpen: true,
          message: "Role deleted successfully",
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
    role,
    roles,
    initialRole,
    getRoles,
    getOneRole,
    updateRole,
    createRole,
    deleteRole,
  };
}
