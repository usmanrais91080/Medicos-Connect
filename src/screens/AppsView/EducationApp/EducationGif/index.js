import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Loader} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import {authActions} from '../../../../redux/actions/auth';

const EducationGif = props => {
  function navigate() {
    setTimeout(async () => {
      if (props?.user?.userData?.education_mode == 'Teacher') {
        props.navigation.navigate(route.EDUCATIONTEACHER);
      } else {
        props.navigation.navigate(route.EDUCATIONSTUDENT);
      }
    }, 200);
  }

  return (
    <>
      <Loader />
      {navigate()}
    </>
  );
};
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EducationGif);
