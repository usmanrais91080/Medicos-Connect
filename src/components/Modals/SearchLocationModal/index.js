import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import Modal from 'react-native-modal'

import Tier from '../../../assets/svg/tier.svg'

import { AuthenticationHeader, Icon, Input, Button } from '../..';
import themeStyle from '../../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/utils/constants';
import Config from '../../../config/config.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const NotVerifyUserModal = (props) => {
    const userLoc = `${props.lati},${props.longi}`
    return (
        <Modal isVisible={props.visible}
            animationInTiming={100} animationOutTiming={100}
        >
            <View style={styles.modalContainer}>

                <View style={{ flexDirection: "row", marginHorizontal: "5%", marginVertical: "5%", justifyContent: 'space-between', }}>
                    <Text style={{ color: themeStyle.COLOR_BLACK_LIGHT, fontFamily: themeStyle.FONT_REGULAR, fontSize: 20 }}>Tag a Location</Text>
                    <TouchableOpacity onPress={() => props.onClose()}>
                        <Icon.AntDesign name="close" size={20} />
                    </TouchableOpacity>

                </View>
                <ImageBackground resizeMode="contain" imageStyle={{ borderRadius: 10 }} source={require('../../../assets/images/locationBg.png')} style={{
                    height: '100%',
                    width: "100%"
                }}>
                    <View style={{ position: 'absolute', top: 100, width: '80%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: themeStyle.FONT_REGULAR, color: themeStyle.PRIMARY_TINT_COLOR, fontSize: 15, textAlign: 'center' }}>Add a Location to your post!</Text>
                        <Text style={{ fontFamily: themeStyle.FONT_REGULAR, color: themeStyle.PRIMARY_TINT_COLOR, fontSize: 10, textAlign: 'center' }}>Let your friends have a better insight into your life by pinning the location of your activities</Text>
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder='Search location here'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        // textInputProps={{
                        //     clearButtonMode: 'while-editing',
                        //     onFocus: () => this.setState({ isFocus: true }),
                        //     onBlur: () => this.setState({ isFocus: false })
                        // }}
                        returnKeyType={'done'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'  // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            // this.setState({ isFocus: false })
                            props.onPress(data, details);
                        }}
                        onFail={(err) => null}
                        getDefaultValue={() => ''}
                        // pass location in config lat lang current location and radius
                        query={{
                            key: "AIzaSyB6qAwbMp-shWMSqu5wvw7FYoxU2dNiwso",
                            language: "en",
                            // "components": "country:pk",
                            // location: userLoc,
                            // radius: '10'
                        }}
                        styles={{
                            container: { borderRadius: 10 },
                            textInput: { borderRadius: 10, marginHorizontal: "5%", height: 54, color: 'grey', borderColor: themeStyle.COLOR_LIGHT_GREY, borderWidth: 1 },
                            textInputContainer: {
                                width: '100%',
                                height: 54,
                                borderRadius: 10,
                                borderBottomWidth: 0,
                                borderTopWidth: 0,
                                backgroundColor: 'white', borderWidth: 0
                            },
                            description: {
                                fontWeight: 'bold',
                                color: themeStyle.PRIMARY_TINT_COLOR, fontFamily: themeStyle.FONT_REGULAR
                            },
                            // poweredContainer: { backgroundColor: 'white' }

                        }}
                        enablePoweredByContainer={false}
                        renderDescription={(row) => row.description || row.formatted_address || row.name}
                        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        // GoogleReverseGeocodingQuery={Config.googleMaps}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'establishment'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </ImageBackground>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    lowerContainer: {
        flex: 0.7, justifyContent: "flex-end", elevation: 2
    },
    modalContainer: {
        // padding: "2.5%",
        backgroundColor: "white",
        height: SCREEN_HEIGHT * 0.6,
        borderRadius: 10,
        // paddingTop: '10%',

    },
    grayText: {
        color: "#959FAE",
        textAlign: "center",
        fontSize: 14,
        marginBottom: "5%",
        fontFamily: themeStyle.FONT_REGULAR
    },
    grayText1: {
        color: "#959FAE",
        textAlign: "center",
        marginTop: "15%",
        fontSize: 22,
        marginBottom: "5%",
        fontFamily: themeStyle.FONT_REGULAR
    },
    linkText: {
        color: "#0ABDE3",
        textAlign: "center",
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR
    },
    textContainer: {
        justifyContent: "flex-start",
        marginTop: "5%",
        marginBottom: "15%"
    },
})

export default NotVerifyUserModal;