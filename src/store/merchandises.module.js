import ApiService from "./api.service";

export const GET_MERCHANDISES = "getMerchandises";
export const SET_MERCHANDISES = "setMerchandises";
export const GET_MERCHANDISE_DETAIL = "getMerchandiseDetail";
export const SET_MERCHANDISE_DETAIL = "setMerchandiseDetail";
export const POST_MERCHANDISE = "postMerchandise";
export const PUT_MERCHANDISE = "putMerchandise";
export const DELETE_MERCHANDISE = "deleteMerchandise";

const state = {
    merchandises: [],
    currentMerchandise: null,
};

const getters = {
    merchandises(state) {
        return state.merchandises; // Mengembalikan data merchandise
    },
    currentMerchandise(state) {
        return state.currentMerchandise; // Mengembalikan data merchandise
    },
};

const actions = {
    [GET_MERCHANDISES](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get("/merchandises", params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_MERCHANDISES, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching jobs:", err);
                    reject(err);
                });
        });
    },
    [GET_MERCHANDISE_DETAIL](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/merchandises/${params.id}`, params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_MERCHANDISE_DETAIL, data);
                    resolve(data);
                })
                .catch(err => {
                    context.commit(SET_MERCHANDISE_DETAIL, null);
                    console.error("Error fetching jobs:", err);
                    reject(err);
                });
        });
    },
    [POST_MERCHANDISE](context, params){
        return new Promise((resolve, reject) => {
          ApiService.post("/merchandises", params.data)
            .then(async ({ data }) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    [PUT_MERCHANDISE](context, params){
        return new Promise((resolve, reject) => {
          ApiService.put(`/merchandises/${params.id}`, params.data)
            .then(async ({ data }) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      [DELETE_MERCHANDISE](context, params) {
        return new Promise((resolve, reject) => {
          ApiService.delete(`merchandise/${params.id}`).catch((err) => {
            reject(err);
          });
        });
      },
};

const mutations = {
    [SET_MERCHANDISES](state, data) {
        state.merchandises = data; // Pastikan data yang dikirim sesuai dengan format yang diharapkan
    },
    [SET_MERCHANDISE_DETAIL](state, data) {
        state.currentMerchandise = data; // Pastikan data yang dikirim sesuai dengan format yang diharapkan
    },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
