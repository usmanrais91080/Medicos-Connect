import React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import themeStyle from '../../../../assets/styles/theme.style';
import { Icon, Input, Loader, Button } from '../../../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { VerticalSpacer } from '../../../../lib/utils/global';
import Ampules from '../../../../assets/svg/ampules.svg'
import WebView from 'react-native-webview';




export const ProfessionModal = (props) => {
    const renderItems = (item, index) => {
        return (
            <TouchableOpacity onPress={() => props.onPress(item)}>
                <Text style={styles.textStyle}> {item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal isVisible={props.isVisible} animationOutTiming={100}>
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: "row", marginHorizontal: "2.5%", marginTop: "5%" }}>
                    <Input width={SCREEN_WIDTH * 0.75} colorProps value={props.value} placeholder="" onChangeText={(job) => props.onSearch(job)}
                    />
                    <View style={{ padding: "5%" }}>
                        <TouchableOpacity onPress={props.onClose}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                    </View>
                </View>
                <FlatList data={props.data}
                    contentContainerStyle={{ margin: "5%", }}
                    ItemSeparatorComponent={VerticalSpacer}
                    renderItem={({ item, index }) => renderItems(item, index)} />
            </View>
        </Modal>


    )
}

export const ProfessionMatchModal = (props) => {
    let webViewRef = null;
    const renderItems = (item, index) => {
        return (
            // <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => !item.selected ? props.onPressPayment(item) : props.onPress(item)}>
            //     <Text style={styles.textStyle}> {item.name}</Text>
            //     {
            //         item.selected ?
            //             <Icon.AntDesign name="check" color="black" size={20} />
            //             :
            //             <Icon.AntDesign name="lock" color="black" size={20} />
            //     }
            // </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => props.onPress(item)}>
                <Text style={styles.textStyle}> {item.name}</Text>
                {
                    item.selected ?
                        <Icon.AntDesign name="check" color="black" size={20} />
                        :
                        null
                       }
            </TouchableOpacity>
        )
    }

    const handleWebViewNavigationStateChange = newNavState => {
        // props.setVideoUri(newNavState.url)
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const { url } = newNavState;
        if (!url) return;


        if (url.includes("success")) {
            props.authActions();
            props.setVideoUri();
            props.paymentSuccess();
            // props.goBack()
        }
        if (url.includes("cancel")) {
            props.setVideoUri();
            // this.props.navigation.goBack()
        }
    };

    return (
        <Modal isVisible={props.isVisible} animationInTiming={100} animationOutTiming={100}

            style={{ margin: props.videoUri ? 0 : null }}
        >
            {
                props.videoUri != "" ?
                    <View style={styles.mainContainer}>
                        <View style={styles.topBar}>
                            <View>
                                <TouchableOpacity onPress={() => {props?.paymentFalse() }}><Icon.Ionicons name="close" size={30} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>
                            </View>
                            {/* <View>
                                <TouchableOpacity onPress={() => webViewRef.current.goBack()}><Icon.Ionicons name="arrow-back" size={30} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>
                            </View> */}
                            <View style={{ width: SCREEN_WIDTH * 0.55 }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'white' }}>{props.videoUri}</Text>
                                {/* <TouchableOpacity onPress={()=>  this.webViewRef.current.goBack()}><Text numberOfLines={1} ellipsizeMode='tail' style={{color:'white'}}>{videoUri}</Text></TouchableOpacity> */}
                            </View>
                            {/* <View>
                    <TouchableOpacity onPress={()=>  this.shareLink()}><Icon.Ionicons name="share-social" size={30} color={themeStyle.COLOR_WHITE} /></TouchableOpacity>
                    </View> */}
                        </View>
                        {props.videoUri != '' && props.videoUri &&
                            <View style={styles.videoContainer}>
                                <WebView
                                    ref={webViewRef}
                                    onNavigationStateChange={handleWebViewNavigationStateChange}
                                    style={{ marginTop: (Platform.OS == 'ios') ? 20 : 0, borderRadius: 5 }}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    source={{ uri: props.videoUri }}
                                    allowFileAccess={true}
                                />
                            </View>}
                    </View>
                    :
                    !props?.paymentModal ?

                        <View style={styles.modalContainer}>
                            {
                                props.loading ?
                                    // <View style={{ flex: 1, justifyContent: "center" }}>
                                    //     <ActivityIndicator color="#FF6B6B" size="large" />
                                    // </View>
                                    <Loader />
                                    :
                                    <>
                                        <View style={{ flexDirection: "row", marginHorizontal: "2.5%", marginTop: "5%" }}>
                                            <Input width={SCREEN_WIDTH * 0.75} colorProps value={props.value} placeholder="" onChangeText={(job) => props.onSearch(job)}
                                            />
                                            <View style={{ padding: "5%" }}>
                                                <TouchableOpacity onPress={props.onClose}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                                            </View>
                                        </View>
                                        <FlatList data={props.data}
                                            contentContainerStyle={{ margin: "5%", paddingBottom: "15%" }}
                                            ItemSeparatorComponent={VerticalSpacer}
                                            renderItem={({ item, index }) => renderItems(item, index)} />
                                    </>}
                        </View>
                        :
                        props?.paymentLoading ?
                            <View>
                                <Loader />
                            </View>

                            :
                            <View style={styles.modalContainer}>
                                <View style={{ paddingTop: "10%", marginHorizontal: "5%" }}>
                                    <View style={{}}>
                                        {/* <Tier /> */}
                                        <Text style={{ marginHorizontal: "5%", ...styles.grayText }}>To select other professions you have to be a payed member</Text>
                                        <FlatList data={props?.packages}
                                            contentContainerStyle={{ paddingTop: "10%" }}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.payForAmpules(item._id)} style={{ borderRadius: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", padding: 10, marginBottom: "5%", backgroundColor: "black" }} >
                                                        <Ampules height={30} width={30} />
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ marginRight: 2 }}>
                                                                <Text style={styles.grayText1}>{item.amplues} Ampules</Text>
                                                                <Text style={styles.grayText2}>Get one free coupon.</Text>
                                                            </View>
                                                            <View style={{ height: 30, width: 70, marginLeft: "7.5%", backgroundColor: "#0ABDE3", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                                <Text style={styles.linkText}>${item.price}</Text>
                                                            </View>
                                                        </View>

                                                    </TouchableOpacity>
                                                    // <View style={{ borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginBottom: "5%", backgroundColor: "black" }} >
                                                    //     {/* <FastImage source={require('../../../../assets/images/bitcoin.png')} style={{height:40,width:40}} /> */}
                                                    //     <Text style={styles.grayText1}>{item.ampule} Ampules</Text>
                                                    //     <View style={{ height: 30, width: 70, backgroundColor: "#0ABDE3", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                    //         <Text style={styles.linkText}>{item.price}</Text>
                                                    //     </View>
                                                    // </View>
                                                )
                                            }} />
                                        {/* <Text style={styles.grayText}></Text> */}
                                    </View>
                                    <View style={{ marginHorizontal: "2.5%", }}>
                                        {/* <Button sky title={'Continue'} onPress={() => this.setState({ paymentModal: false })} /> */}
                                        <Button red title={'Cancel'} onPress={() => props.paymentFalse()} />
                                    </View>

                                </View>
                            </View>
            }
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        height: SCREEN_HEIGHT * 0.6,
        borderRadius: 25

    },
    inputContainer: {
        margin: "2.5%"
    },
    textStyle: {
        fontFamily: themeStyle.FONT_MEDIUM
    },
    container: {
        flex: 1
    },
    heading: {
        // marginTop: "5%",
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    btnContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
        marginTop: "15%",
        marginHorizontal: "10%"
    },
    rowContainer2: {
        marginTop: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    heading2: {
        marginTop: "5%",
        color: '#FF6B6B',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    desc: {
        marginTop: "5%",
        // marginHorizontal: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    textContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        padding: 10,
        borderRadius: 10
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
    },
    desc1: {
        marginHorizontal: '2.5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    inputConttainer: {
        marginTop: "2.5%",
        height: 50,
        paddingHorizontal: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
    },
    darkDash: {
        backgroundColor: '#FF6B6B',
        width: 58,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: "lightgray",
        width: 58,
        height: 5, borderRadius: 5
    },
    minusContainer: {
        position: "absolute",
        zIndex: 1000,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        top: 5,
        left: '100%'
    },

    grayText: {
        color: "#959FAE",
        textAlign: "center",
        fontSize: 14,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_BOLD
    },
    grayText1: {
        color: "#959FAE",
        textAlign: 'left',
        // marginTop: "15%",
        fontSize: 18,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    grayText2: {
        color: "#959FAE",
        textAlign: 'left',
        // marginTop: "15%",
        fontSize: 12,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    linkText: {
        color: "#000000",
        textAlign: "center",
        fontSize: 14,
        fontFamily: themeStyle.FONT_BOLD
    },
    mainContainer: {
        height: "100%",
        // marginTop: '5%',
        alignItems: 'center'
    },
    videoContainer: {
        height: '100%',
        width: '100%'
    },
    topBar: {
        width: SCREEN_WIDTH,
        flexDirection: 'row', backgroundColor: 'black',
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        justifyContent: 'space-between', alignItems: 'center',
        height: SCREEN_HEIGHT * 0.1

    }
})