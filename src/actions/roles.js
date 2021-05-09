"use strict";

import { HTTP } from "./index";

export function apiFetchAllRoles(params) {
  return HTTP.get("/role", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchOneRole(id) {
  return HTTP.get(`/role/${id}`)
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiCreateRole(role) {
  return HTTP.post("/role", role)
    .then((x) => x)
    .catch((err) => err);
}

export function apiUpdateRole(id, role) {
  return HTTP.put(`/role/${id}`, role)
    .then((x) => x)
    .catch((err) => err);
}

export function apiDeleteRole(id) {
  return HTTP.delete(`/role/${id}`)
    .then((x) => x)
    .catch((err) => err);
}
