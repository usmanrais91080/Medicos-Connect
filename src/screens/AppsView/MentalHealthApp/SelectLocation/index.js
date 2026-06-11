import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from '../../../../config/config.json';
import styles from './style';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {}
        }
    }

    async goMap(data, details) {
        let searchObj = {
            searchData: data,
            searchDetails: details
        }
        await this.props.navigation.push('OrderStatus', {
            region: {
                latitude: searchObj.searchDetails.geometry.location.lat,
                longitude: searchObj.searchDetails.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            item:this.props.route.params.item,
            address: searchObj.searchDetails.formatted_address,
             item: this.props.route.params.item
        });
        // this.setState({ region: {}, name: '' })
        // this.props.onChange();
    }

    render() {
        return (
            <View style={[styles.container, { alignItems: 'center' }]}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    textInputProps={{
                        clearButtonMode: 'while-editing',
                        onFocus: () => this.setState({ isFocus: true }),
                        onBlur: () => this.setState({ isFocus: false })
                    }}
                    returnKeyType={'done'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'  // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        this.setState({ isFocus: false })
                        this.goMap(data, details);
                    }}
                    getDefaultValue={() => ''}
                    query={Config.googleMaps}
                    styles={{
                        container: { borderRadius: 10 },
                        textInput: { borderRadius: 10, marginHorizontal: "5%", height: 54, color: 'grey', },
                        textInputContainer: {
                            width: '100%',
                            height: 54,
                            borderRadius: 10,
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                            backgroundColor: 'white', borderWidth: 0
                        },
                        description: { fontWeight: 'bold', color: '#0DA7DF' },
                        poweredContainer: { backgroundColor: 'white' }

                    }}
                    renderDescription={(row) => row.description || row.formatted_address || row.name}
                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={Config.googleMaps}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'establishment'
                    }}
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />
            </View>
        )
    }
}
export default Search;
