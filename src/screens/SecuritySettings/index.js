import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../redux/actions/auth';
import {Icon} from '../../components';
import {route} from '../../lib/utils/constants';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import {HorizontalSpacer} from '../../lib/utils/global';
import commonStyle from '../../assets/styles/common.style';

class SecuritySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangePassword = () => this.props.navigation.navigate(route.CHANGEPASSWORD);

  onTwoFactorAuth = () => this.props.navigation.navigate(route.TWOFACTORAUTH);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}></View>
        <View style={styles.rightContainer}>
          <View style={{flex: 1, marginTop: '5%'}}>
            <View style={{flex: 1}}>
              <View style={styles.menuContainer}>
                <Icon.AntDesign
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  name="arrowleft"
                  size={25}
                  color={themeStyle.COLOR_BLACK}
                />
                {HorizontalSpacer()}
                <Text style={commonStyle.burgerMenuHeadingTextStyle}>
                  Settings
                </Text>
              </View>

              <Text style={styles.title}>Login & Recovery</Text>
              <Text style={styles.text}>
                Manage your passwords and recovery methods
              </Text>
              <TouchableOpacity
                onPress={this.onChangePassword}
                style={styles.button}>
                <Text style={styles.buttonText}>Change password</Text>
                <Icon.MaterialIcons
                  name="navigate-next"
                  size={20}
                  color={themeStyle.COLOR_BLACK}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onTwoFactorAuth}
                style={styles.button}>
                <Text style={styles.buttonText}>Two-factor authentication</Text>
                <Icon.MaterialIcons
                  name="navigate-next"
                  size={20}
                  color={themeStyle.COLOR_BLACK}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {authActions: bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(SecuritySettings);
