import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AuthenticationHeader, Icon, Input, Button} from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH} from '../../../lib/utils/constants';
import themeStyle1 from '../../../assets/styles/common.style';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from '../../../lib/utils/global';

const LoginOrSignup = props => {
  const [showPassword, setShowPassword] = useState(true);
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={400}
      transparent
      backdropColor="transparent"
      animationOutTiming={200}
      style={(styles.modalContainer, {margin: 0, justifyContent: 'flex-end'})}>
      <View style={styles.modalContainer}>
        <KeyboardAwareScrollView contentInset={{top: 0, bottom: 0}}>
          <AuthenticationHeader
            onBack={props.onClose}
            navigation={props.navigation}
            heading={'Sign up'}
          />

          <View style={{marginTop: '5%', marginBottom: '10%'}}>
            <Text style={styles.grayText}> </Text>
            <Input
              autoCorrect={false}
              // keyboardType='visible-password'
              returnKeyType={'next'}
              inputRef={input1Ref}
              onSubmitEditing={() => input2Ref.current.focus()}
              colorProps
              value={props.name}
              placeholder="Name"
              onChangeText={name => props.onName(name)}
            />
            {props.submit && !props.name ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Please fill this field
              </Text>
            ) : null}
            {props.submit && props.name.length && !isNameValid(props.name) ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Name is invalid
              </Text>
            ) : null}
            <Input
              autoCorrect={false}
              // keyboardType='visible-password'
              returnKeyType={'next'}
              inputRef={input2Ref}
              onSubmitEditing={() => input3Ref.current.focus()}
              colorProps
              value={props.email}
              placeholder="Email"
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
            {props.emailExist ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Email already exist
              </Text>
            ) : null}
            <View>
              <Input
                returnKeyType={'next'}
                inputRef={input3Ref}
                onSubmitEditing={() => props.onContinue()}
                colorProps
                secureTextEntry={showPassword}
                placeholder="Password"
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
            <View
              style={{
                alignSelf: 'center',
                marginVertical: '2%',
                justifyContent: 'center',
              }}>
              <BarPasswordStrengthDisplay
                width={SCREEN_WIDTH * 0.9}
                password={props.password}
              />
            </View>
            {/* <Input color secureTextEntry={true} value={props.password} placeholder="Password" onChangeText={(password) => props.onPassword(password)} /> */}
            {props.submit && !props.password ? (
              <Text style={[themeStyle1.errorText, {marginBottom: 10}]}>
                Please fill this field
              </Text>
            ) : null}
            {/* {


                            props.submit && props.password.length && !isPasswordValid(props.password) ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>{'\u2022'}At least 8 characters. {'\n'}{'\u2022'}1 upper case letter. {'\n'}{'\u2022'}1 lower case letter. {'\n'}{'\u2022'}1 digit. {'\n'}{'\u2022'}1 special character. {'\n'}{'\u2022'}Example Admin12$.</Text> : null
                        } */}
            <Button title={'Continue'} onPress={props.onContinue} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: '5%',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  grayText: {
    color: '#959FAE',
    textAlign: 'left',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
});

export default LoginOrSignup;
