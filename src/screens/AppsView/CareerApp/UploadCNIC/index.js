import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Input, AuthenticationHeader, AuthenticationSlide, Button } from '../../../../components';
import { route, SCREEN_HEIGHT } from '../../../../lib/utils/constants';

import Card from '../../../../assets/svg/address.svg'

import styles from './style';
import { launchImageLibrary } from 'react-native-image-picker';
import commonStyle from '../../../../assets/styles/common.style';


export default class UploadLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnicFrontImage: ""
        }
    }

    chooseFile = () => {
        var options = {
            title: 'Select Avatar',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else {
                let source = response;
                this.setState({
                    cnicFrontImage: source.assets[0].uri,
                });
            }
        });
    };

    handleContinue = () => {
        const { submit, cnicFrontImage } = this.state;
        if (submit && cnicFrontImage) {
            navigation.navigate(route.UPLOADCNICBACK, { cnicFrontImage: cnicFrontImage })

        } else {
            this.setState({ submit: true })
        }
    }

    render() {
        const { navigation } = this.props;
        const { cnicFrontImage, submit } = this.state;
        return (
            <Container>
                <View style={{ flex: 1, paddingBottom: '15%' }}>
                    <View style={styles.upperContainer}>
                        <AuthenticationSlide />
                    </View>
                    <View style={[styles.lowerContainer, { height: this.state.expandView == true ? null : 0 }]}>
                        <View style={styles.modalContainer}>
                            <AuthenticationHeader onBack={() => navigation.goBack()} navigation={navigation} heading={"Upload your CNIC/Passport "} />
                            <View style={{ marginTop: "5%", marginBottom: "10%" }}>
                                <Text style={styles.grayText}>Upload photo of your government issued CNIC or Passport for Identification (Front)</Text>
                                {cnicFrontImage ?
                                    <Image source={{ uri: cnicFrontImage }} resizeMode="contain" style={{ height: 200, borderRadius: 25 }} />
                                    :
                                    <TouchableOpacity onPress={this.chooseFile} style={{ backgroundColor: "#f5f5f5", height: 200, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                        <Card />
                                        <Text style={styles.grayText}>Upload photo</Text>
                                        {
                                            submit && !cnicFrontImage ? <Text style={commonStyle.errorText}>Please add your cnic / passort front side.</Text>
                                                :
                                                null
                                        }
                                    </TouchableOpacity>}
                                <Button title={'Continue'} onPress={() => this.setState({ submit: true }, () => this.handleContinue())} />
                            </View>
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}