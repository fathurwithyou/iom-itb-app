import { createStore } from "vuex";
import auth from "./auth.module";
import activities from "./activities.module";
import merchandises from "./merchandises.module";
import donations from "./donations.module";
import helpSubmissions from "./helpSubmissions.module";
import transactions from "./transactions.module";
import members from "./members.module";
import faculties from "./faculties.module";
import kemitraan from "./kemitraan.module";
import kegiatanKemitraan from "./kegiatanKemitraan.module";

export default createStore({
  state() {
    return {
      // state properties
    };
  },
  mutations: {
    // mutations
  },
  actions: {
    // actions
  },
  modules: {
    auth,
    activities,
    merchandises,
    donations,
    helpSubmissions,
    transactions,
    members,
    faculties,
    kemitraan,
    kegiatanKemitraan,
  },
});
