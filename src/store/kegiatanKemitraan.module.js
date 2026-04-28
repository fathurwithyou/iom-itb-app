import ApiService from "./api.service";

export const GET_KEGIATAN_KEMITRAAN = "getKegiatanKemitraan";
export const SET_KEGIATAN_KEMITRAAN = "setKegiatanKemitraan";

const state = {
  kegiatanKemitraan: [],
};

const getters = {
  kegiatanKemitraan(state) {
    return state.kegiatanKemitraan;
  },
};

const actions = {
  [GET_KEGIATAN_KEMITRAAN](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.get("/kegiatan-kemitraan", params)
        .then((response) => {
          const { data } = response;
          context.commit(SET_KEGIATAN_KEMITRAAN, data);
          resolve(data);
        })
        .catch((err) => {
          console.error("Error fetching kegiatan kemitraan:", err);
          reject(err);
        });
    });
  },
};

const mutations = {
  [SET_KEGIATAN_KEMITRAAN](state, data) {
    if (Array.isArray(data?.data)) {
      state.kegiatanKemitraan = data.data;
    } else if (Array.isArray(data?.data?.data)) {
      state.kegiatanKemitraan = data.data.data;
    } else if (Array.isArray(data)) {
      state.kegiatanKemitraan = data;
    } else {
      state.kegiatanKemitraan = [];
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
