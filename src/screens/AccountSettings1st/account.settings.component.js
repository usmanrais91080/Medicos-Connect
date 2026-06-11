'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { DeleteModal, Icon, UploadingModal } from "../../components";
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';

class CameraScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            front: this.props?.route?.params?.front == true ? true: false,
            uploading: false,
            recording: false,
            dalertModal: false,
            msgToDisplay: ''
        }
    }

    render() {
        const { alertModal, msgToDisplay } = this.state;
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{ flex: 1 }}
                    type={this.state.front ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    }}
                >
                    <View style={{ padding: "3%" }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} >

                            <Icon.Entypo name={"cross"} size={40} color={'white'} />

                        </TouchableOpacity>
                    </View>
                    <View style={styles.preview}>
                        <View style={{ paddingHorizontal: "5%", flexDirection: 'row', justifyContent: this.props?.route?.params?.front ? "center" :'space-between', alignItems: "center" }}>
                        { this.props?.route?.params?.front!=true &&  <TouchableOpacity disabled={this.props?.route?.params?.front == true ? true :false} onPress={() => this.setState({ front: !this.state.front })} style={styles.capture1}>
                                <Icon.SimpleLineIcons name={"refresh"} size={25} />
                            </TouchableOpacity>}
                                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                                    <View style={styles.capture2}>
                                        {/* <Icon.FontAwesome name={"camera"} size={25} color={'black'} /> */}
                                    </View>
                                </TouchableOpacity>
                            { this.props?.route?.params?.front !=true && <TouchableOpacity disabled={this.props?.route?.params?.front == true ? true :false} onPress={this.openGallery.bind(this)} style={styles.capture1}>
                                <Icon.Ionicons name={"image"} size={40} />
                            </TouchableOpacity>}
                        </View>
                    </View>

                </RNCamera>
                <UploadingModal visible={this.state.uploading} />
                <DeleteModal alert visible={alertModal} confirm={() => { this.setState({ alertModal: false }) }} text={msgToDisplay} />
            </View>

        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            let picPath='';
            await ImageResizer.createResizedImage(data.uri,SCREEN_WIDTH, 300, "JPEG", 100, 0, null ,false, { mode:"cover" ,onlyScaleDown:true })
                 .then(response => {
                    picPath=response.uri;
                 })
                .catch(err => {
                    picPath=data.uri ;
                });
            // console.log("Photo Data>>>>>>>",data.uri);
            // let array = [];
            // array.push({
            //     uri: data.uri,
            //     name: `${new Date().getTime().toString()}.jpg`,
            //     filename: new Date().getTime().toString() + '.jpg',
            //     type: 'image/jpg'
            // });
            this.props.navigation.navigate(route.ACCOUNTSETTINGS, {filterImage:picPath })
            // this.props.navigation.navigate(route.STORYFILTER, { createStory: true, filterImage: array })
        }
    };
    openGallery = async () => {
        ImagePicker.openPicker({
            mediaType:'photo',
            writeTempFile :true,
            compressImageQuality:0.8
        }).then(images => {
        this.props.navigation.navigate(route.ACCOUNTSETTINGS, {filterImage:images.path })
        }).catch((err)=>console.log(err))
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    capture: {
        height: 70,
        width: 70,
        backgroundColor: '#fff',
        justifyContent: "center",
        marginBottom: "5%",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#fff"
    },
    capture1: {
        height: 65,
        width: 65,
        borderRadius: 50,
        justifyContent: "center",
        marginBottom: "5%",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    capture3: {
        height: 65,
        width: 65,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff',
        justifyContent: "center",
        marginBottom: "5%",
        alignItems: "center",
    },
    capture2: {
        height: 65,
        width: 65,
        backgroundColor: '#fff',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#000"
    },
});
export default CameraScreen;