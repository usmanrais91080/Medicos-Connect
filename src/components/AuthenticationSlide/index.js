
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slide from '../../assets/svg/whiteSlide.svg';
import themeStyle from '../../assets/styles/theme.style'

const AuthenticationHeader = (props) => {
    return (
        <>
            <View style={{ alignItems: "center" }}>
                <Slide />
            </View>
            {/* <View style={{ marginTop: "7.5%", alignItems: "center" }}>
                <Slide />
            </View> */}
        </>
    )
};

export default AuthenticationHeader;



