import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Container,  AuthenticationHeader, AuthenticationSlide, Button, UploadingModal } from '../../../../components';
import { route } from '../../../../lib/utils/constants';

import Card from '../../../../assets/svg/address.svg'

import styles from './style';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import UploadLicenseFunction from './upload.license.function';
import commonStyle from '../../../../assets/styles/common.style';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../../redux/actions/auth';

class UploadLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalLicence: "",
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
                    medicalLicence: source.assets[0].uri,
                });
            }
        });
    };

    handleUpload = () => {
        const { submit, medicalLicence } = this.state;
        if (submit && medicalLicence) {
            let formData = new FormData();
            formData.append(`image`, {
                uri: medicalLicence,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            })
            UploadLicenseFunction.uploadLicense(formData, this.props.user.userData.token)
                .then((res) => {
                    this.setState({ uploading: false })
                    this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", "")
                    this.props.navigation.navigate(route.SUCCESSFULSUBMISSION)
                })
                .catch((err) => {
                    if (err.data == "Can't Update a verified medical license") {
                        this.setState({ uploading: false })
                        Alert.alert("Error", `${err.data}`);
                    }
                })

        } else {
            this.setState({ submit: true, uploading: false })
        }
    }

    render() {
        const { navigation } = this.props;
        const { medicalLicence, submit, uploading } = this.state;
        return (
            <Container>
                <View style={{ flex: 1, }}>
                    <View style={styles.upperContainer}>
                        <AuthenticationSlide />
                    </View>
                    <View style={[styles.lowerContainer, { height: this.state.expandView == true ? null : 0 }]}>
                        <View style={styles.modalContainer}>
                            <AuthenticationHeader onBack={() => navigation.goBack()} navigation={navigation} heading={"Upload your medical license "} />
                            <View style={{ marginTop: "5%", marginBottom: "10%" }}>
                                <Text style={styles.grayText}>Upload photo of your medical license for identification</Text>
                                {medicalLicence ?
                                    <Image source={{ uri: medicalLicence }} resizeMode="contain" style={{ height: 200, borderRadius: 25 }} />
                                    :
                                    <TouchableOpacity onPress={this.chooseFile} style={{ backgroundColor: "#f5f5f5", height: 200, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                        <Card />
                                        <Text style={styles.grayText}>Upload photo</Text>
                                        {
                                            submit && !medicalLicence ? <Text style={commonStyle.errorText}>Please add your license.</Text>
                                                :
                                                null
                                        }
                                    </TouchableOpacity>}
                                <Button title={'Continue'} onPress={() => this.setState({ submit: true, uploading: true }, () => this.handleUpload())} />
                            </View>
                        </View>
                    </View>
                </View>
                <UploadingModal visible={uploading} />
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
export default connect(mapStateToProps, mapDispatchToProps)(UploadLicense);