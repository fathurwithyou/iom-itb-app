import ApiService from "./api.service";

export const GET_ACTIVITIES = "getActivities";
export const GET_DETAIL_ACTIVITY = "getDetailActivity";
export const SET_ACTIVITIES = "setActivities";
export const SET_DETAIL_ACTIVITY = "setDetailActivity";
export const POST_ACTIVITY = "postActivity";
export const PUT_ACTIVITY = "putActivity";
export const DELETE_ACTIVITY = "deleteActivity";

const state = {
    activities: [],
    detailActivity: null
};

const getters = {
    activities(state) {
        return state.activities;
    },
    detailActivity(state) {
        return state.detailActivity;
    },
};

const actions = {
    [GET_ACTIVITIES](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get("/activities", params)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_ACTIVITIES, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching activities:", err);
                    reject(err);
                });
        });
    },
    [GET_DETAIL_ACTIVITY](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/activities/${params?.slug}`)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_DETAIL_ACTIVITY, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching activities:", err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [SET_ACTIVITIES](state, data) {
        // Handle both response formats:
        // - Lama: { data: [...] }
        // - Baru: { data: { data: [...], pagination: {...} } }
        if (Array.isArray(data?.data)) {
            state.activities = data.data;
        } else if (Array.isArray(data?.data?.data)) {
            state.activities = data.data.data;
        } else {
            state.activities = [];
        }
    },
    [SET_DETAIL_ACTIVITY](state, data) {
        state.detailActivity = data?.data || data || null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};