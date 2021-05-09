"use strict";

import { HTTP } from "./index";

export function apiFetchAllUsers(params) {
  return HTTP.get("/user", {
    params,
  })
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiFetchOneUser(id) {
  return HTTP.get(`/user/${id}`)
    .then((value) => value.data)
    .catch((err) => err);
}

export function apiCreateUser(user) {
  return HTTP.post("/user", user)
    .then((x) => x)
    .catch((err) => err);
}

export function apiUpdateUser(id, user) {
  return HTTP.put(`/user/${id}`, user)
    .then((x) => x)
    .catch((err) => err);
}

export function apiDeleteUser(id) {
  return HTTP.delete(`/user/${id}`)
    .then((x) => x)
    .catch((err) => err);
}
