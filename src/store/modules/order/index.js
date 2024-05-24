import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const getDefaultState = () => {
    return {
        id: null,
        isPaid: false,
        items: [],
        payments: {},
        splitBill: false,
        tipsType: 'none',
        tipsSum: 0,
        isOpenPayDalaModal: false,
        isPaymentFetching: false,
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
