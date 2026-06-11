import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Input, AuthenticationHeader, AuthenticationSlide, Button } from '../../components';
import { route, SCREEN_HEIGHT } from '../../lib/utils/constants';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import styles from './style';


export default class UploadLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <KeyboardAwareScrollView>
                    <View style={styles.upperContainer}>
                        <AuthenticationSlide />
                    </View>
                    <View style={[styles.lowerContainer, { height: this.state.expandView == true ? null : 0 }]}>
                        <View style={styles.modalContainer}>
                            <AuthenticationHeader navigation={navigation} heading={"Login"} />
                            <View style={{ marginTop: "5%", marginBottom: "10%" }}>
                                <Text style={styles.grayText}>Or login using an email address </Text>
                                <Input placeholder="Email" onChangeText={(email) => this.setState({ email })} />
                                <Input placeholder="Pasword" onChangeText={(password) => this.setState({ password })} />
                                <Text onPress={() => this.props.navigation.navigate(route.FORGOTPASSWORD)} style={styles.linkText}>Forgot account?</Text>
                                <Button title={'Continue'} />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}