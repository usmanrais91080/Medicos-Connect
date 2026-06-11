import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../redux/actions/auth";
import { Button, Icon } from "../../components"

import styles from './style';
import themeStyle from "../../assets/styles/theme.style";
import PrivacyPolicy from '../../assets/svg/privacypolicy.svg'
import Logo from '../../assets/svg/logo-1.svg'
import { VerticalSpacer } from "../../lib/utils/global";
import { route } from "../../lib/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

function AppPrivacyConsent(props) {
    const navigation = useNavigation()
    const [agree, setAgree] = useState(false)


    return (
        <View style={styles.container}>
  <ScrollView contentContainerStyle={{paddingBottom:"30%"}}>
            <View style={styles.logoContainer}>
                <View>
                    <Logo />

                </View>
                <View style={{ marginHorizontal: "5%" }}>
                    <Text style={{ fontSize: 22, fontFamily: themeStyle.FONT_REGULAR }}>Privacy</Text>
                    <Text style={{ fontSize: 32, fontFamily: themeStyle.FONT_BOLD ,color:"#0B90CF"}}>Policy</Text>
                </View>
            </View>
            <View style={styles.svgContainer}>
                <PrivacyPolicy />
                <Text style={styles.mainTextStyle}>
                Medicos Connect saves your personal information i.e name, dob , email, phone number to allow access to all features of the app.
                </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => setAgree(!agree)}>
                    <Icon.Ionicons name="checkbox" size={30} color={agree ? "#0B90CF" : themeStyle.COLOR_GREY} />

                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    By agreeing and continue, you agree to the
                    <Text onPress={() => navigation.navigate(route.TERMANDCONDITIONS)} style={{ color: "#1169EE" }}> Terms of Service</Text>
                    . Note: The  <Text onPress={() => navigation.navigate(route.PRIVACYPOLICY)} style={{ color: "#1169EE" }}>Privacy Policy</Text> describes how data is handled in this service.
                </Text>


            </View>
            <View style={styles.buttonContainer}>
                <Button
                    sky
                    title={'Agree & Continue'}
                    disabled={!agree}
                    onPress={props.onAccept}
                />
                {VerticalSpacer()}
                <Button
                    borderColor={"#0B90CF"}
                    height={60}
                    customColor={themeStyle.COLOR_WHITE}
                    titleColor={"#0B90CF"}
                    title={'Cancel'}
                    onPress={props.onCancel}
                />
            </View>
        </ScrollView>
        </View>
      
    )
}

const mapStateToProps = state => {
    return { user: state.authReducer || {} };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppPrivacyConsent);