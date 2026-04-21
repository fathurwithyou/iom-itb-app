import ApiService from "./api.service";

export const GET_FACULTIES = "getFaculties";
export const SET_FACULTIES = "setFaculties";

const state = {
    faculties: [],
};

const getters = {
    faculties(state) {
        return state.faculties;
    },
};

const actions = {
    [GET_FACULTIES]({ commit }) {
        return new Promise((resolve, reject) => {
            ApiService.get("/faculties")
                .then((response) => {
                    const list = (response && response.data) || [];
                    commit(SET_FACULTIES, list);
                    resolve(list);
                })
                .catch((err) => reject(err));
        });
    },
};

const mutations = {
    [SET_FACULTIES](state, data) {
        state.faculties = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
