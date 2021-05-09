"use strict";

import { HTTP } from "./index";

export function apiFetchAllDishes(params) {
  return HTTP.get("/dish", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchOneDish(id) {
  return HTTP.get(`/dish/${id}`)
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiCreateDish(dish) {
  return HTTP.post("/dish", dish)
    .then((x) => x)
    .catch((err) => err);
}

export function apiUpdateDish(id, dish) {
  return HTTP.put(`/dish/${id}`, dish)
    .then((x) => x)
    .catch((err) => err);
}

export function apiDeleteDish(id) {
  return HTTP.delete(`/dish/${id}`)
    .then((x) => x)
    .catch((err) => err);
}
