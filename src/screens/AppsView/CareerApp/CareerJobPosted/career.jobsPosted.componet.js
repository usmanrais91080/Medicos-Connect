import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { route, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import { HorizontalSpacer } from '../../../../lib/utils/global';

const JobsPostedItem = ({ item, navigation, locum, applied, token, img, close }) => {
    return (
        <View   style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.rowStyle} >
                    <Avatar
                        source={{ uri: img != "" ? img : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg' }}
                        rounded
                        size={50} />
                    {HorizontalSpacer()}
                    <View style={{ marginTop: "5%" }}>
                        <Text style={styles.textStyle}>{item?.title?.name}</Text>
                        <Text style={styles.grayTextStyle}>{moment(item.created_at).format('DD MMMM at HH:MM a ')}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.rowContainer, { marginTop: "2.5%" }]}>
                <Text style={styles.grayText}></Text>
                {
                    locum ?
                        null
                        :
                        <Text style={styles.textStyle}>{item?.salary} </Text>
                }
            </View>
            <View style={[styles.rowContainer, { marginTop: "1%" }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.grayTextStyle}>Number of applicants: {item?.applicants.length} </Text>
                    {/* <Text style={styles.grayTextStyle}>{item?.description} </Text> */}
                </View>
                <View >
                    <TouchableOpacity disabled={item?.applicants.length>0 ? false :true} onPress={() => navigation.navigate(route.CAREERVIEWAPPLICANT, { jobId: item._id, token })} style={styles.btnContainer1}>
                        <Text style={styles.whiteText}>View Applicants</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => close(item?._id)} style={styles.btnContainer2}>
                        <Text style={styles.whiteText}>Close Job</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
        padding: "5%"
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
        flexDirection: "row",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: themeStyle.COLOR_RED,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    // btnContainer2: {
    //     marginTop: "2.5%",
    //     height: 30,
    //     width: SCREEN_WIDTH * 0.3,
    //     backgroundColor: "#38474F",
    //     borderRadius: 10,
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
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
        color: '#313131'
    }
})
export default JobsPostedItem;