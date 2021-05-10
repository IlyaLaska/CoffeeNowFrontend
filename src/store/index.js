import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: "",
    user: "",
    roles: [],
    rolesEnum: {
      admin: "admin",
      employee: "employee",
    },
    snackbar: {
      isOpen: false,
      message: "",
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserRoles(state, roles) {
      state.roles = roles;
    },
    deleteUser(state) {
      state.user = {};
    },
    setSnack(state, snackbar) {
      state.snackbar.isOpen = snackbar.isOpen;
      state.snackbar.message = snackbar.message;
    },
  },
  getters: {
    getIsLogin: (state) => state.isLogin,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getSnackbar: (state) => state.snackbar,
    getUserRoles: (state) => state.roles,
    getRolesEnum: (state) => state.rolesEnum,
  },
  actions: {
    addIsLogin({ commit }, isLogin) {
      commit("setIsLogin", isLogin);
    },
    addToken({ commit }, token) {
      commit("setToken", token);
    },
    addSnackbar({ commit }, snackbar) {
      commit("setSnack", snackbar);
    },
    addUser({ commit }, user) {
      commit("setUser", user);
    },
    addUserRoles({ commit }, roles) {
      commit("setUserRoles", roles);
    },
    async addRefreshToken({ commit }) {
      const token = await firebase.auth().currentUser.getIdToken(true);
      commit("setToken", token);
    },
    removeUser({ commit }) {
      commit("deleteUser");
    },
  },
});
