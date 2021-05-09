"use strict";

import { HTTP } from "./index";

export function apiFetchAllMenus(params) {
  return HTTP.get("/menu", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchOneMenu(id) {
  return HTTP.get(`/menu/${id}`)
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiCreateMenu(menu) {
  return HTTP.post("/menu", menu)
    .then((x) => x)
    .catch((err) => err);
}

export function apiUpdateMenu(id, menu) {
  return HTTP.put(`/menu/${id}`, menu)
    .then((x) => x)
    .catch((err) => err);
}

export function apiDeleteMenu(id) {
  return HTTP.delete(`/menu/${id}`)
    .then((x) => x)
    .catch((err) => err);
}
