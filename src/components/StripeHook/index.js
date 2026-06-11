import React, {useEffect} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from '../../redux/actions/search';
const StripeHook = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  useEffect(() => {
    dispatch(searchActions.stripeObj(stripe));
  }, []);
  return <></>;
};

export default StripeHook;
