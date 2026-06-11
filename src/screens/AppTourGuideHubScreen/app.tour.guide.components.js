import React, { Component, useRef, useState, } from 'react';
import { Image, View, Platform, TouchableOpacity, Dimensions, ImageBackground, Text } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../lib/utils/constants';
const { width, height } = Dimensions.get("window");

export const RenderView = (props) => {
    return (
        <View style={{ width: SCREEN_WIDTH }}>
            <ImageBackground
                resizeMode="contain"
                source={props?.item?.file}
                style={{ width: width, height: height, justifyContent: "flex-end" }}>
                <View style={{ borderRadius: 15, backgroundColor: "white", height: 140, padding: "5%", marginHorizontal: "10.5%", marginBottom: "20%" }}>
                    <Text style={{ fontSize: 10, color: "black", fontFamily: themeStyle.FONT_MEDIUM }}>{props?.item.title}</Text>
                    <Text style={{ fontSize: 10, color: "gray", marginTop: "5%" }}>{props?.item.desc}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
                        <TouchableOpacity style={{ borderRadius: 10, height: 20, justifyContent: "center", alignItems: "center", paddingHorizontal: "5%", borderWidth: 0.5, borderColor: "gray" }}>
                            <Text style={{ fontSize: 11, color: "gray", }}>{'Skip all'}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 30 }} />
                        <TouchableOpacity style={{ borderRadius: 10, height: 20, justifyContent: "center", alignItems: "center", paddingHorizontal: "6%", backgroundColor: themeStyle.BUTTON_COLOR }}>
                            <Text style={{ fontSize: 11, color: "white", }}>{'Next'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
