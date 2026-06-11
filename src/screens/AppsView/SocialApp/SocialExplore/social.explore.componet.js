import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import themeStyle from '../../../../assets/styles/theme.style';
import {route, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { HorizontalSpacer } from '../../../../lib/utils/global';


const JobsFavItem = ({ item,navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(route.SOCIALPROFILE, { data:item?._id})} style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.rowStyle} >
                    <Avatar
                        source={{ uri: item?.social_image == "" ?
                        "https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png"
                        : item.social_image }}
                        rounded
                        size={50} />
                    {HorizontalSpacer()}
                    <View style={{ marginTop: "5%" ,alignSelf:'center'}}>
                        <Text style={styles.textStyle}>{item?.social_username}</Text>
                        {/* <Text style={styles.grayTextStyle}>{moment(item.created_at).format('DD MMMM at HH:MM a ')}</Text> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
        padding: "5%",
        marginHorizontal:'5%'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnContainer: {
        marginTop: "2.5%",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#1DD1A1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer1: {
        marginTop: "2.5%",
        flexDirection: "row",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#1DD1A1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer2: {
        marginTop: "2.5%",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#38474F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    rowStyle: {
        flexDirection: "row",
        // alignItems: "center"
    },
    grayTextStyle: {
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    grayText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    whiteText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    },
    colorText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#1DD1A1'
    },
    textStyle: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#313131',
    }
})
export default JobsFavItem;