import ApiService from "./api.service";

// Action type constants
export const GET_DONATIONS = "getDonations";
export const SET_DONATIONS = "setDonations";
export const POST_DONATION = "postDonation";
export const POST_DONATION_SNAP = "postDonationSnap";
export const PUT_DONATION = "putDonation";
export const DELETE_DONATION = "deleteDonation";

// Define the initial state
const state = {
    donations: [],
};

// Define getters
const getters = {
    donations(state) {
        return state.donations;
    },
};

// Define actions
const actions = {
    [GET_DONATIONS]({ commit }, params) {
        return new Promise((resolve, reject) => {
            ApiService.get("/donations", params.data)
                .then(response => {
                    const { data } = response;
                    commit(SET_DONATIONS, data);
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POST_DONATION](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/donations", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POST_DONATION_SNAP](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.postJson("/payments/snap-token", { type: "donation", payload: params.data })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_DONATION](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/donations/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_DONATION](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/donations/${params.id}`)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

// Define mutations
const mutations = {
    [SET_DONATIONS](state, data) {
        state.donations = data;
    },
};

// Export the Vuex module
export default {
    state,
    getters,
    actions,
    mutations,
};
