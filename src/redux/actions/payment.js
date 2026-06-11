import { PAYMENT_STATUS } from '../types';


const paymentStaus = (value) => {
    return async (dispatch) => {
        dispatch({ type: PAYMENT_STATUS, paymetStatus: value })
    }
}


export const paymentActions = {
    paymentStaus,
};