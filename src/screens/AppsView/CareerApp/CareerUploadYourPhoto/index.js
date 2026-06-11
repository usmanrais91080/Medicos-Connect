import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Input, AuthenticationHeader, AuthenticationSlide, Button } from '../../../../components';
import { route, SCREEN_HEIGHT } from '../../../../lib/utils/constants';

import Card from '../../../../assets/svg/address.svg'

import styles from './style';
import { launchImageLibrary } from 'react-native-image-picker';


export default class UploadLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalLicence: ""
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
                    medicalLicence: source.assets[0].uri,
                });
            }
        });
    };

    render() {
        const { navigation } = this.props;
        const { medicalLicence } = this.state;
        return (
            <Container>
                <View style={{ flex: 1, }}>
                    <View style={styles.upperContainer}>
                        <AuthenticationSlide />
                    </View>
                    <View style={[styles.lowerContainer, { height: this.state.expandView == true ? null : 0, }]}>
                        <View style={{ ...styles.modalContainer, paddingBottom: "20%" }}>
                            <AuthenticationHeader onBack={() => navigation.goBack()} navigation={navigation} heading={"Upload your Picture "} />
                            <View style={{ marginTop: "5%", marginBottom: "10%" }}>
                                <Text style={styles.grayText}>Upload a professional photo of yourself for verification</Text>
                                {medicalLicence ?
                                    <Image source={{ uri: medicalLicence }} resizeMode="contain" style={{ height: 200, borderRadius: 25 }} />
                                    :
                                    <TouchableOpacity onPress={this.chooseFile} style={{ backgroundColor: "#f5f5f5", height: 200, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                        <Card />
                                        <Text style={styles.grayText}>Upload photo</Text>
                                    </TouchableOpacity>}
                                <Button green title={'Continue'} onPress={() => navigation.navigate(route.CAREERPROFILE1ST)} />
                            </View>
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}