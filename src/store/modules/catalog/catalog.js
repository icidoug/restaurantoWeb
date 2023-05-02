import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const getDefaultState = () => {
    return {
        items: [],
    }
};

const state = getDefaultState();

export default {
    defaultState: getDefaultState(),
    state,
    mutations,
    getters,
    actions
};
