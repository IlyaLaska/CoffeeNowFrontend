import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: "",
    user: "",
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
    // TODO finish
    // async addRefreshToken({ commit }) {
    //   const token = await firebase.auth().currentUser.getIdToken(true);
    //   commit("setToken", token);
    // },
    removeUser({ commit }) {
      commit("deleteUser");
    },
  },
});
