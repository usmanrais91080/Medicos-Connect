import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Input, AuthenticationHeader, AuthenticationSlide, Button } from '../../../../components';
import { route, SCREEN_HEIGHT } from '../../../../lib/utils/constants';

import Card from '../../../../assets/svg/address.svg'

import styles from './style';
import { launchImageLibrary } from 'react-native-image-picker';
import { ProfileServices } from '../../../../services';

import UploadCNICFunction from './upload.cnic.function';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../../redux/actions/auth';

class UploadLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnicBackImage: "",
            submit: false,
            uploading: false
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
                    cnicBackImage: source.assets[0].uri,
                });
            }
        });
    };

    handleUpload = () => {
        const { submit, medicalLicence } = this.state;
        if (submit && medicalLicence) {
            let formData = new FormData();
            formData.append(`id_card_front`, {
                uri: cnicBackImage,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            })
            formData.append(`id_card_back`, {
                uri: cnicBackImage,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            })
            UploadCNICFunction.uploadCNIC(formData, this.props.user.userData.token)
                .then((res) => {
                    this.props.authActions.getUserProfile({ token: this.props.user.userData.token },"","");
                    navigation.navigate(route.SUCCESSFULSUBMISSION)
                })
                .catch((err) => null)
        } else {
            this.setState({ submit: true, uploading: false })
        }
    }


    render() {
        const { navigation } = this.props;
        const { cnicBackImage } = this.state;
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
                                <Text style={styles.grayText}>Upload photo of your government issued CNIC or Passport for identification (Back)</Text>
                                {cnicBackImage ?
                                    <Image source={{ uri: cnicBackImage }} resizeMode="contain" style={{ height: 200, borderRadius: 25 }} />
                                    :
                                    <TouchableOpacity onPress={this.chooseFile} style={{ backgroundColor: "#f5f5f5", height: 200, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                        <Card />
                                        <Text style={styles.grayText}>Upload photo</Text>
                                        {
                                            submit && !cnicBackImage ? <Text style={commonStyle.errorText}>Please add your cnic / passort front side.</Text>
                                                :
                                                null
                                        }
                                    </TouchableOpacity>}
                                <Button title={'Continue'} onPress={() => navigation.navigate(route.SUCCESSFULSUBMISSION)} />
                            </View>
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(UploadLicense)