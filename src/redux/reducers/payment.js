import { PAYMENT_STATUS } from '../types';

const initialState = {
    paymentStatus: "",

};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_STATUS:
            return {
                ...state,
                paymentStatus: action.paymetStatus
            }
        default:
            return state;
    }
};

export default paymentReducer;
