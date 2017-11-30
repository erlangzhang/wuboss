/*
 * @Author: Hedgehog 
 * @Date: 2017-03-31 17:56:27 
 * @Last Modified by: Hedgehog
 * @Last Modified time: 2017-03-31 22:44:21
 */
import { Hotel } from '../mutation_types';

module.exports = {
    state: {
        curEditId: '1',
    },
    mutations: {
        [Hotel.SET_CUR_EDIT_ID](state, payload) {
            state.curEditId = payload.curEditId;
        },
    },
    actions: {
        [Hotel.SET_CUR_EDIT_ID]({ commit }, payload) {
            commit(Hotel.SET_CUR_EDIT_ID, payload);
        },
    },
    getters: {
        [Hotel.GET_CUR_EDIT_ID](state) {
            return state.curEditId;
        },
    },
}
