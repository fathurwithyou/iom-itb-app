import ApiService from "./api.service";

export const GET_ACTIVITIES = "getActivities";
export const GET_DETAIL_ACTIVITY = "getDetailActivity";
export const SET_ACTIVITIES = "setActivities";
export const SET_DETAIL_ACTIVITY = "setDetailActivity";

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

const getActivitiesFromResponse = (data) => {
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.data)) return data.data.data;
    return [];
};

const getPaginationFromResponse = (data) => {
    return data?.pagination || data?.data?.pagination || {};
};

const actions = {
    [GET_ACTIVITIES](context, params) {
        return new Promise((resolve, reject) => {
            const { all, ...query } = params || {};

            if (!all) {
                ApiService.get("/activities", query)
                    .then(response => {
                        const { data } = response;
                        context.commit(SET_ACTIVITIES, data);
                        resolve(data);
                    })
                    .catch(err => {
                        console.error("Error fetching activities:", err);
                        reject(err);
                    });
                return;
            }

            const firstPage = Number(query.page) || 1;
            const pageLimit = Number(query.limit) || 50;

            ApiService.get("/activities", { ...query, page: firstPage, limit: pageLimit })
                .then(async response => {
                    const firstData = response.data;
                    const firstPagination = getPaginationFromResponse(firstData);
                    const totalPages = Number(firstPagination.totalPages) || 1;
                    const allActivities = [...getActivitiesFromResponse(firstData)];

                    for (let page = firstPage + 1; page <= totalPages; page++) {
                        const nextResponse = await ApiService.get("/activities", { ...query, page, limit: pageLimit });
                        allActivities.push(...getActivitiesFromResponse(nextResponse.data));
                    }

                    const data = {
                        data: allActivities,
                        pagination: {
                            ...firstPagination,
                            currentPage: firstPage,
                            start: allActivities.length > 0 ? 1 : 0,
                            end: allActivities.length,
                            totalEntries: firstPagination.totalEntries || allActivities.length,
                        },
                    };

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
