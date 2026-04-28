import ApiService from "./api.service";

export const GET_KEMITRAAN = "getKemitraan";
export const GET_DETAIL_KEMITRAAN = "getDetailKemitraan";
export const SET_KEMITRAAN = "setKemitraan";
export const SET_DETAIL_KEMITRAAN = "setDetailKemitraan";

const state = {
  kemitraan: [],
  detailKemitraan: null,
};

const getters = {
  kemitraan(state) {
    return state.kemitraan;
  },
  detailKemitraan(state) {
    return state.detailKemitraan;
  },
};

const actions = {
  [GET_KEMITRAAN](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.get("/kemitraan", params)
        .then((response) => {
          const { data } = response;
          context.commit(SET_KEMITRAAN, data);
          resolve(data);
        })
        .catch((err) => {
          console.error("Error fetching kemitraan:", err);
          reject(err);
        });
    });
  },
  [GET_DETAIL_KEMITRAAN](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.get(`/kemitraan/${params?.id}`)
        .then((response) => {
          const { data } = response;
          context.commit(SET_DETAIL_KEMITRAAN, data);
          resolve(data);
        })
        .catch((err) => {
          console.error("Error fetching detail kemitraan:", err);
          reject(err);
        });
    });
  },
};

const mutations = {
  [SET_KEMITRAAN](state, data) {
    if (Array.isArray(data?.data)) {
      state.kemitraan = data.data;
    } else if (Array.isArray(data?.data?.data)) {
      state.kemitraan = data.data.data;
    } else if (Array.isArray(data)) {
      state.kemitraan = data;
    } else {
      state.kemitraan = [];
    }
  },
  [SET_DETAIL_KEMITRAAN](state, data) {
    state.detailKemitraan = data?.data || data || null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
