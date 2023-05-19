import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const getDefaultState = () => {
    return {
        waiter: {},
    }
};

const index = getDefaultState();

export default {
    defaultState: getDefaultState(),
    state: index,
    mutations,
    getters,
    actions
};
