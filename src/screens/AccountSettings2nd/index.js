import React, { Component } from 'react';

import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Container, HeaderLeft, Icon, Input } from '../../components';
import YellowMark from '../../assets/svg/yellow-mark.svg';
import BlueMark from '../../assets/svg/blue-mark.svg';
import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';
import { HeaderRight } from './account.settings.component';

export default class SocialSetting1st extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tags: ['Lorem ipsum dolor sit amet,  consetetur sadipscing'],
            job: '',
            experience: true,
            ielts: true,
            toefl: false,
            oet: false
        }
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => <HeaderRight onPress={() => this.setState({ visible: true })} />,
            headerLeft: () => <HeaderLeft color navigation={this.props.navigation} />,
        });
    }

    render() {
        const { prev_screen } = this.props?.route?.params;
        return (
            <Container>
                <View style={{ flex: 0.75 }}>

                    <ScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
                        <View style={styles.container}>
                            {/* <View style={styles.headingContainer}>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={styles.headingText}>Tier 1  </Text>
                                    <YellowMark />
                                </View>
                                <Text style={styles.tagLineText}>To become a Tier 1 User you need to complete basic verification.</Text>
                            </View> */}
                            {/* <View style={styles.cardContainer}>
                                <Text style={styles.headingText1}>Features</Text>
                                <Text style={styles.tagLineText}>Upload your medical license and profile picture (with a thumbs up) to get verified with Medicos Connect and proceed.</Text>
                                <View style={styles.rowContainer}>
                                    <View>
                                        <Text style={styles.headingText1}>Requirements</Text>
                                        <Text style={styles.tagLineText2}>Student/work card verification</Text>
                                        <Text style={styles.tagLineText2}>Photo verification</Text>
                                        <Text style={styles.tagLineText2}>Profession</Text>

                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(route.UPLOADLICENSE)} style={styles.btnContainer}>
                                        <Text style={styles.btnText}>Upgrade Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                            <View style={styles.headingContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={styles.headingText}>Tier 2 </Text>
                                    <BlueMark />
                                </View>
                                <Text style={styles.tagLineText}>To become a Tier 2 User you need to complete advanced
                                identification.</Text>
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.headingText1}>Features</Text>
                                <Text style={styles.tagLineText}>Upload you CNIC or Passport to achieve advanced verified with Medicos Connect and proceed.</Text>
                                <View style={styles.rowContainer}>
                                    <View>
                                        <Text style={styles.headingText1}>Requirements</Text>
                                        <Text style={styles.tagLineText2}>NIC or passport</Text>
                                        <Text style={styles.tagLineText2}>Nationality</Text>
                                        <Text style={styles.tagLineText2}>Utility bills</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(route.ADVANCEVERIFICATION)} style={styles.btnContainer}>
                                        <Text style={styles.btnText}>Upgrade Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.btnContainerButton}>
                    <View style={styles.rowContainer2}>
                        <View style={styles.lightDash}></View>
                        <View style={{ width: 10 }}></View>
                        <View style={styles.darkDash}></View>
                    </View>
                    <Button sky title={'Skip'} onPress={() => {
                        if (prev_screen == route.HOME) {
                            this.props.navigation.replace(route.MAIN, { screen: route.HOME })
                        } else {
                            this.props.navigation.navigate(route.PROFILE)
                        }
                    }} />
                </View>
                {/* <SearchMenu visible={this.state.visible} onClose={() => this.setState({ visible: false })} /> */}
            </Container>
        )
    }
}