import {apiHeaderConfiguration} from '../lib/utils/global';
import {TOKEN} from '../lib/utils/constants';
import axiosInstance from './Interceptor';

const Api = {
  getAds: function (module, position, region, token) {
    return axiosInstance.get(
      `company-adManager/getAdApplication?position=Main Banner`,
      apiHeaderConfiguration(token, TOKEN),
    );
  },
};

export default Api;
