import React, {useState, useRef, createRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AuthenticationHeader, Icon, Input, Button} from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import themeStyle1 from '../../../assets/styles/common.style';
import {isEmailValid} from '../../../lib/utils/global';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';
import Google from '../../../assets/svg/google.svg';
import Apple from '../../../assets/svg/apple.svg';
const LoginOrSignup = props => {
  const [showPassword, setShowPassword] = useState(true);
  const [opened, setOpened] = useState(false);
  const input1Ref = createRef(null);
  const input2Ref = createRef(null);
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      transparent
      backdropColor="transparent"
      avoidKeyboard={false}
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <KeyboardAwareScrollView contentInset={{top: 0, bottom: 0}}>
          <AuthenticationHeader
            onBack={props.onClose}
            navigation={props.navigation}
            heading={'Sign In'}
          />
          <View style={{marginTop: '5%', marginBottom: '10%'}}>
            <Text style={styles.grayText}> </Text>
            <Input
              autoCorrect={false}
              silver
              // keyboardType="visible-password"
              returnKeyType="next"
              onSubmitEditing={() => input2Ref.current.focus()}
              inputRef={input1Ref}
              placeholder="Add username"
              placeholdertextcolor="#5C5C5C"
              autoCapitalize="none"
              onChangeText={email => props.onEmail(email)}
            />
            {props.submit && !props.email ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Please fill this field
              </Text>
            ) : null}
            {props.submit &&
            props.email.length &&
            !isEmailValid(props.email) ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Email is invalid
              </Text>
            ) : null}
            <View>
              <Input
                returnKeyType="next"
                silver
                inputRef={input2Ref}
                onSubmitEditing={() => props.onContinue()}
                secureTextEntry={showPassword}
                placeholder="Add password"
                onChangeText={password => props.onPassword(password)}
                rightIcon={
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon.Ionicons
                      name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                      size={24}
                      color={themeStyle.COLOR_BLACK}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
            {/* <Input color secureTextEntry={true} placeholder="Password" onChangeText={(password) => props.onPassword(password)} /> */}
            {props.submit && !props.password ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                {'Please fill this field'}
              </Text>
            ) : null}
            {props.submit && props.password.length < 4 ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                {'Password cannot be less than 4 characters'}
              </Text>
            ) : null}
            <Text onPress={() => props.onForgot()} style={styles.linkText}>
              Forgot account?
            </Text>
            {/* <Text style={{ justifyContent: "center", alignItems: "center", textAlign: "center", paddingVertical: "5%" }}>or</Text> */}
            {Platform.OS == 'android' && (
              <TouchableOpacity
                style={styles.googleButton}
                onPress={props.onGoogle}>
                <Google height={50} width={50} />
              </TouchableOpacity>
            )}
            {Platform.OS == 'ios' && (
              <View style={styles.socialLoginContainer}>
                <TouchableOpacity onPress={props.onGoogle}>
                  <Google height={50} width={50} />
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity onPress={props.onApple}>
                  <Apple height={50} width={50} />
                </TouchableOpacity>
              </View>
            )}

            <Button
              loading={props.loading}
              title={'Continue'}
              onPress={props.onContinue}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginHorizontal: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  linkText: {
    color: '#0ABDE3',
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: '5%',
    fontFamily: themeStyle.FONT_MEDIUM,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '15%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    // position: 'absolute',
    // top: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // left: SCREEN_WIDTH * 0.8
  },
});

export default LoginOrSignup;
