"use strict";

import { ref } from "@vue/composition-api";

export default function utils() {
  const cleanObj = ref({});

  const rules = {
    required: (x) => !!x || "Required field",
    passwordLength: (value) => value?.length >= 6 || "Min 6 characters",
    email: (value) => {
      // eslint-disable-next-line max-len
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    },
  };
  const isObject = (object) => object != null && typeof object === "object";

  const changeItem = (item, items) => {
    const sortedItems = items.map((x) => {
      let copyItem = { ...x };
      const value = x.id === item.id ? (copyItem = item) : copyItem;
      return value;
    });
    return sortedItems;
  };

  const objectsEqual = (obj1, obj2) => {
    let keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      keys1 = [...keys2];
    }

    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !objectsEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        cleanObj.value[key] = obj2[key];
      }
    }
    return cleanObj.value;
  };

  // eslint-disable-next-line max-len
  const isEmptyObject = (obj) =>
    obj && Object.keys(obj).length === 0 && obj.constructor === Object;

  const clearObject = () => {
    cleanObj.value = {};
  };

  return {
    rules,
    changeItem,
    objectsEqual,
    clearObject,
    isEmptyObject,
  };
}
