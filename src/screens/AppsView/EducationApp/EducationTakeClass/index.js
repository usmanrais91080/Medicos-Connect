import React, {Component} from 'react';

import {connect} from 'react-redux';
import {DeleteModal} from '../../../../components';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {EducationServices} from '../../../../services';
import {route} from '../../../../lib/utils/constants';

class EducationTakeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUri: '',
      data: null,
      alertModal: false,
      msgToDisplay: '',
      showModal: false,
    };
    this.webViewRef = React.createRef(null);
  }

  componentDidMount = async () => {
    this.openLink();
  };
  async openLink() {
    try {
      const {url, class_id} = await this.props.route.params;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });

        const {education_mode, _id, token} = this.props?.user?.userData;
        if (education_mode == 'Teacher') {
          EducationServices.finishClassSession(
            {
              teacher_id: _id,
              class_id,
            },
            token,
          )
            .then(() => null)
            .catch(() => null);
        }

        if (education_mode == 'Student') {
          this.props.navigation.navigate(route.EDUCATION, {
            screen: route.EDUCATIONSTUDENTCLASSDETAIL,
            params: {
              item: this.props.route?.params?.item,
              token,
              fromUpcomingClasses: true,
              fromEndClass: true,
            },
          });
          return;
        }

        this.props.navigation.goBack();
      } else null;
    } catch (error) {
      this.setState({msgToDisplay: error.message, alertModal: true});
      console.log(error.message);
    }
  }

  cameraPermission = async () => {
    checkMultiple([
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.CAMERA,
    ])
      .then(statuses => {
        if (
          statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] &&
          statuses[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED
        ) {
          const newVideoUri = this.props.route.params.url;
          this.setState({data: newVideoUri, videoUri: newVideoUri});
        } else {
          requestMultiple([
            [PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.CAMERA],
          ]).then(statuses => {
            if (
              statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] &&
              statuses[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED
            ) {
              const newVideoUri = this.props.route.params.url;
              this.setState({data: newVideoUri, videoUri: newVideoUri});
            }
          });
        }
      })
      .catch(error => {});
  };
  cameraPermissionIOS = async () => {
    checkMultiple([PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CAMERA])
      .then(statuses => {
        if (
          statuses[PERMISSIONS.IOS.MICROPHONE] &&
          statuses[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED
        ) {
          this.openLink();
        } else {
          requestMultiple([
            [PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CAMERA],
          ]).then(statuses => {
            if (
              statuses[PERMISSIONS.IOS.MICROPHONE] &&
              statuses[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED
            ) {
              this.openLink();
            }
          });
        }
      })
      .catch(error => {});
  };

  render() {
    const {alertModal, msgToDisplay} = this.state;

    return (
      <>
        <DeleteModal
          alert
          visible={alertModal}
          confirm={() => {
            this.setState({alertModal: false}, () =>
              this.props.navigation.goBack(),
            );
          }}
          text={msgToDisplay}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EducationTakeClass);
