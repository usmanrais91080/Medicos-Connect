import React from 'react';
import {Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';

const WalletGif = props => {
  function navigate() {
    props.navigation.navigate(route.WALLETHOME);
  }

  return (
    <>
      <Loader />
      {navigate()}
    </>
  );
};

export default WalletGif;
