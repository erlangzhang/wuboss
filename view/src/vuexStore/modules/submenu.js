import { Submenu } from '../mutation_types';

module.exports = {
    state: {
        submenuIndex: '',
    },
    mutations: {
        [Submenu.SET_SUB_MENU_INDEX](state, payload) {
            state.submenuIndex = payload.submenuIndex;
        },
    },
    actions: {
        [Submenu.SET_SUB_MENU_INDEX]({ commit }, payload) {
            commit(Submenu.SET_SUB_MENU_INDEX, payload);
        },
    },
    getters: {
        [Submenu.GET_SUB_MENU_INDEX](state) {
            return state.submenuIndex;
        },
    },

}
