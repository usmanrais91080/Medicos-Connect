import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert,Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import commonStyle from '../../assets/styles/common.style';

import { Container, Input, AuthenticationHeader, AuthenticationSlide, Button, ForgotPasswordModal } from '../../components';
import { route } from '../../lib/utils/constants';
import {isEmailValid} from '../../lib/utils/global';
import { AuthServices } from '../../services';

import styles from './style';


var myVar;

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            visible: false,
            loading: false,
            emailSent: false,
            closeTime: false,
            submit: false,
            time: 5,
            opened: false,
        }
    }


    componentDidMount = () => {

        // this.focusListener = this.props.navigation.addListener('focus', () => {
        // this.showModal()
        // })
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }


    _keyboardDidShow = () => {
        this.setState({ opened: true })
    }

    _keyboardDidHide = () => {
        this.setState({ opened: false })
    }

    handleRecoverAccount = () => {
        const { replace, } = this.props.navigation;
        if (this.state.emailSent) {
            replace(route.LOGINORSIGNUP)
        } else
            if (this.state.email && this.state.submit && isEmailValid(this.state.email.trim())) {
                let data = { email: this.state.email.trim() }
                AuthServices.forgetPassword(data)
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.setState({ emailSent: true, loading: false })
                            myVar = setInterval(this.myTimer, 1000);
                            setTimeout(() => {
                                clearInterval(myVar);
                            }, 6000);
                        } else {
                            // Alert.alert(res.data.message)
                            alert(
                                'Error!!', // This is a title
                                `${res.data.message}`, // This is a alert message
                                {
                                    type: 'bottomsheet',
                                })

                        }
                    })
                    .catch((err) => {
                        alert(
                            'Error!!', // This is a title
                            `${err.response.data.message}`, // This is a alert message
                            {
                                type: 'bottomsheet',
                            }); this.setState({ loading: false });
                    })
            } else {
                this.setState({ submit: true, loading: false })
            }



    }

    myTimer = () => {
        if (this.state.closeTime) {
            clearInterval(myVar);
        } else if (this.state.time >= 0) {
            this.setState({ time: this.state.time - 1, closeTime: this.state.time == 0 ? true : false })
        }
    }

    render() {
        const { navigation } = this.props;
        const { closeTime, time, visible, emailSent, submit, email, loading,opened } = this.state;
        return (
            <Container>
                <View style={styles.upperContainer}>
                    <AuthenticationSlide  />
                </View>
                <View style={[styles.lowerContainer]}>
                <KeyboardAwareScrollView contentInset={{ top: 0, bottom: 0 }}>

                    <View style={styles.modalContainer}>
                            <AuthenticationHeader show onBack={() => navigation.goBack()} navigation={navigation} heading={"Forgot Password"} />
                            <View style={{ paddingTop: "10%", marginBottom: "10%" }}>

                                <View style={{ marginBottom: "10%" }}>

                                    {
                                        emailSent ?
                                            <Text style={styles.grayText}>We have send you an email if an account exists with that email address</Text>
                                            :
                                            <>
                                                <Text style={styles.grayText}>Enter your email address to recover account</Text>
                                                <Input autoCapitalize="none" silver keyboardType={"email-address"} placeholder="Email" onChangeText={(email) => this.setState({ email: email.toLowerCase() })} />
                                                {
                                                    submit && !email ? <Text style={[commonStyle.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                                                }
                                                {
                                                    submit && email.length && !isEmailValid(email.trim()) ? <Text style={[commonStyle.errorText, { marginBottom: 10 }]}>Email is invalid</Text> : null
                                                }
                                            </>
                                    }
                                </View>
                                <View style={{ paddingTop: "20%" }}>
                                    <Button sky loading={loading} title={emailSent ? time > 0 ? `Close (${time})` : `Close` : 'Recover account'} onPress={() => this.setState({ submit: true, loading: true }, () => this.handleRecoverAccount())} />

                                </View>

                            </View>

                    </View>
                </KeyboardAwareScrollView>
                </View>
                {/* <ForgotPasswordModal
                    visible={visible}
                    navigation={navigation}
                    time={time}
                    emailSent={emailSent}
                    onContinue={() => this.handleRecoverAccount()}
                /> */}
            </Container >
        )
    }
}