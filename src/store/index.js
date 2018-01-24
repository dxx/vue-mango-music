import Vue from "vue"
import Vuex from "vuex"

import state from "./state"
import mutations from "./mutations"

Vue.use(Vuex);

let plugins = [];

if (process.env.NODE_ENV === "development") {
  let createLogger = require("vuex/dist/logger");
  plugins.push(createLogger({}));
}

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
