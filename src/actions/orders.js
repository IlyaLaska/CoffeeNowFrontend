"use strict";

import { HTTP } from "./index";

export function apiFetchAllOrders(params) {
  return HTTP.get("/order/all", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchActiveOrders(params) {
  return HTTP.get("/order", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchOneOrder(id) {
  return HTTP.get(`/order/${id}`)
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiCreateOrder(order) {
  return HTTP.post("/order", order)
    .then((x) => x)
    .catch((err) => err);
}

export function apiUpdateOrder(id, order) {
  return HTTP.put(`/order/${id}`, order)
    .then((x) => x)
    .catch((err) => err);
}

export function apiDeleteOrder(id) {
  return HTTP.delete(`/order/${id}`)
    .then((x) => x)
    .catch((err) => err);
}
