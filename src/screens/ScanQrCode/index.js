import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { HeaderLeft, Icon, Loader } from '../../components';
import styles from './style'
import { connect } from 'react-redux';
import { route } from '../../lib/utils/constants';

class ScanQrCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerLeft: () => this.headerLeft(),
        });
        this.activeQR()
    }


    headerLeft = () => {
        return (
            <HeaderLeft color navigation={this.props.navigation} />
        )
    }
    onSuccess = (e) => {
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        const check = e.data
        if( check == this.props.user.userData._id)
        {

            this.props.navigation.navigate(route.SOCIAL, { screen: route.SOCIALPROFILE })

        }
        else
        {
            this.props.navigation.navigate(route.SOCIAL, { screen: route.SOCIALPROFILE,params: { data: check}, })
        }
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    {/* <View style={styles.header}>
                        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                        <Icon.AntDesign name="camera" size={30} />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Scan QR Code</Text>
                    </View> */}
                    {/* {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Icon.AntDesign name="camera" size={30} />
                            <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                            <Icon.AntDesign name="camera" size={30} />
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Icon.AntDesign name="camera" size={30} />
                                    <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Scan QR Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    } */}
                    {ScanResult &&
                        <Fragment>
                        <Loader/>
                            {/* <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Icon.Ionicons name="scan" size={30} />
                                        <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                    Please move your camera {"\n"} over the QR Code
                                </Text>
                            }
                            bottomContent={
                                <View style={styles.bottomContent}>
                                    <TouchableOpacity style={styles.buttonScan2}
                                        onPress={() => this.scanner.reactivate()}>
                                        <Icon.Ionicons name="scan" size={50} />
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { user: state.authReducer || {} };
};
export default connect(mapStateToProps)(ScanQrCode);