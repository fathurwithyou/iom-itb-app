import ApiService from "./api.service";

export const GET_TRANSACTIONS = "getTransactions";
export const SET_TRANSACTIONS = "setTransactions";
export const GET_TRANSACTION_DETAIL = "getTransactionDetail";
export const SET_TRANSACTION_DETAIL = "setTransactionDetail";
export const POST_TRANSACTION = "postTransaction";
export const POST_TRANSACTION_SNAP = "postTransactionSnap";
export const PUT_TRANSACTION = "putTransaction";
export const DELETE_TRANSACTION = "deleteTransaction";

const state = {
    transactions: [],
    currentTransaction: [],
};

const getters = {
    transactions(state) {
        return state.transactions; // Mengembalikan data transaksi
    },
    currentTransaction(state) {
        return state.currentTransaction; // Mengembalikan data transaksi
    },
};

const actions = {
    [GET_TRANSACTIONS](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get("/transactions", params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_TRANSACTIONS, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching transactions:", err);
                    reject(err);
                });
        });
    },
    [GET_TRANSACTION_DETAIL](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/transactions?q=${params.code}`, params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_TRANSACTION_DETAIL, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching transaction detail:", err);
                    reject(err);
                });
        });
    },
    [POST_TRANSACTION](context, params){
        return new Promise((resolve, reject) => {
            ApiService.post("/transactions", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POST_TRANSACTION_SNAP](context, params){
        return new Promise((resolve, reject) => {
            ApiService.postJson("/payments/snap-token", { type: "transaction", payload: params.data })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_TRANSACTION](context, params){
        return new Promise((resolve, reject) => {
            ApiService.put(`/transactions/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_TRANSACTION](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/transactions/${params.id}`)
                .then(() => {
                    resolve(); // Optionally handle success response
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

const mutations = {
    [SET_TRANSACTIONS](state, data) {
        state.transactions = data; // Pastikan data yang dikirim sesuai dengan format yang diharapkan
    },
    [SET_TRANSACTION_DETAIL](state, data) {
        state.currentTransaction = data; // Pastikan data yang dikirim sesuai dengan format yang diharapkan
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
