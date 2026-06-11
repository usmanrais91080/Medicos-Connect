import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StatusBar, } from 'react-native';
import { connect } from 'react-redux';

import { Button, Container,  Icon } from '../../../../components';
import ConnectSettingsFunction from './connect.settings.function';
import { route } from '../../../../lib/utils/constants';
import Ampules from '../../../../assets/svg/ampules.svg'
import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import { ProfessionMatchModal, ProfessionModal } from './connect.settings.component';
import { connectActions } from '../../../../redux/actions/connect';
import { authActions } from '../../../../redux/actions/auth';
import { bindActionCreators } from 'redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { FlatList } from 'react-native-gesture-handler';

class ConnectSetting2nd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            education: [],
            job: '',
            certifcate: '',
            ielts: true,
            toefl: false,
            paymentModal: false,
            blockContact: true,
            matchByProfesstion: false,
            oet: false,
            professionModal: false,
            professionMatchModal: false,
            connectMatchProfessions: [],
            professionLoading: false,
            IsProfessionFound: false
        }
        this.arrayholder = []
        this.arrayholder1 = []
    }

    componentDidMount = () => {
        this.props.connectActions.getConnectProfessions(this.props.user.userData.token);
        this.arrayholder = this.props.connectProfessions;
        // this.setState({ professions: this.props.connectProfessions })
        this.getMacthedPrfessions();
    }


    renderChips(item, index) {
        return <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ tags: this.state.tags.filter((_, i) => i != index) })} style={styles.minusContainer}>
                <Icon.AntDesign name="minus" size={15} color={themeStyle.COLOR_WHITE} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.whiteText}>{item.name}</Text>
            </View>
        </View >
    }

    handleConnect = () => {
        const { tags, connectMatchProfessions } = this.state;
        let profession_matches = []
        tags.map((item, index) => {
            profession_matches.push(item._id)
        })
        console.log(profession_matches);

        ConnectSettingsFunction.updateConnectProfessionMatches({ profession_matches: profession_matches }, this.props.user.userData.token)
            .then((res => { console.log(res); this.props.authActions.getUserProfile({ token: this.props.user.userData.token }, "", ""); this.props.navigation.navigate(route.PROFILE) }))
            .catch((err) => null)
    }

    seacrhProfesstionFunction = (text) => {
        this.arrayholder = this.props.connectProfessions;
        this.setState({ value: text, professions: this.props.connectProfessions });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (newData.length != 0) {
            this.setState({ professions: newData, IsProfessionFound: false });
        }
        else {
            this.setState({ IsProfessionFound: true });
        }
    }
    seacrhMatchProfesstionFunction = (text) => {
        this.setState({ value: text });
        const newData = this.arrayholder1.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (newData.length != 0) {
            this.setState({ connectMatchProfessions: newData, IsProfessionFound: false });
        }
        else {
            this.setState({ IsProfessionFound: true });
        }
    }

    handleSelectProfession = (data) => {
        let array = [];
        array.push(data)
        this.setState({ education: array, professionModal: false, professionLoading: true, value: "", }, () => this.getMacthedPrfessions(data._id))
    }

    getMacthedPrfessions = (id) => {
        ConnectSettingsFunction.getConnectProfessionMatches(this.props.user.userData.token)
            .then((res) => {
                let array = [...res];
                let tags = []
                array.map((item, index) => {
                    if (this.props.user.userData.profession.name == item.name) {
                        array[index] = { ...array[index], selected: true }
                        tags.push(item)
                    } else {
                        array[index] = { ...array[index], selected: false }
                    }

                })
                this.arrayholder1 = array
                this.setState({ connectMatchProfessions: array, tags: tags, professionLoading: false })
            })
            .catch((err) => null)
    }

    handleSelectMatchProfession = (data) => {
        let connectionArray = [...this.state.connectMatchProfessions];
        connectionArray.map((item, index) => {
            if (data._id == item._id) {
                if (data.selected) {
                    connectionArray[index] = { ...connectionArray[index], selected: false }
                } else {
                    connectionArray[index] = { ...connectionArray[index], selected: true }
                }
            }
        })
        let array = [...this.state.tags];
        array.push(data);
        this.arrayholder1 = connectionArray;
        this.setState({
            connectMatchProfessions: connectionArray,
            tags: array
        })
    }

    render() {
        const { tags, job, blockContact, education, matchByProfesstion, paymentModal } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '30%' }}>
                        <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
                            <Text style={styles.heading2}>Match profiles</Text>
                            <Text style={{ ...styles.desc, marginRight: "5%" }}>Professional filters make it easier to find people who work in the same field as you.</Text>
                            <View style={styles.rowContainer}>
                                <Text style={styles.heading}>Match by profession</Text>
                                <ToggleSwitch
  animationSpeed={3}
                                    isOn={matchByProfesstion}
                                    onColor={'#38474F'}
                                    offColor={'#38474F'}
                                    label=""
                                    thumbOffStyle={{ backgroundColor: '#fff' }}
                                    thumbOnStyle={{ backgroundColor: '#FF6B6B' }}
                                    labelStyle={styles.labelStyle}
                                    size="medium"
                                    onToggle={isOn => this.setState({ matchByProfesstion: isOn })}
                                />
                            </View>
                            <TouchableOpacity style={styles.inputConttainer} onPress={() => { this.setState({ professionMatchModal: true }) }}>
                                <View style={{ flex: 1, }} >{
                                    this.props?.user?.userData?.profession?.name ?
                                        <Text style={{ ...styles.desc1 }}>{this.props?.user?.userData?.profession?.name}</Text>
                                        :
                                        null
                                }</View>
                                <Icon.FontAwesome name="caret-down" size={25} color="gray" />
                            </TouchableOpacity>

                            {tags.length != 0 ?

                                <ScrollView horizontal={true} >
                                    {tags.map((item, index) => this.renderChips(item, index))}
                                </ScrollView> : null}
                            <View style={styles.rowContainer}>
                                <Text style={styles.heading}>Block social contacts</Text>
                                <ToggleSwitch
  animationSpeed={3}
                                    isOn={blockContact}
                                    onColor={'#38474F'}
                                    offColor={'#38474F'}
                                    label=""
                                    thumbOffStyle={{ backgroundColor: '#fff' }}
                                    thumbOnStyle={{ backgroundColor: '#FF6B6B' }}
                                    labelStyle={styles.labelStyle}
                                    size="medium"
                                    onToggle={isOn => this.setState({ blockContact: isOn })}
                                />
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <View style={styles.rowContainer2}>

                                <View style={styles.lightDash}></View>
                                <View style={{ width: 10 }}></View>
                                <View style={styles.darkDash}></View>

                            </View>
                            <Button red title={'Continue'} onPress={() => {
                                this.handleConnect()
                            }} />
                        </View>
                    </ScrollView>
                </View >
                <ProfessionModal
                    isVisible={this.state.professionModal}
                    onClose={() => this.setState({ professionModal: false, value: "" })}
                    data={this.state.professions}
                    onSearch={(text) => this.seacrhFunction(text)}
                    onPress={(data) => this.handleSelectProfession(data)} />
                <ProfessionMatchModal
                    loading={this.state.professionLoading}
                    isVisible={this.state.professionMatchModal}
                    onClose={() => this.setState({ professionMatchModal: false, value: "" })}
                    data={this.state.connectMatchProfessions}
                    profession={this.props.user.userData.profession}
                    onPressPayment={() => this.setState({ professionMatchModal: false, paymentModal: true })}
                    onSearch={(text) => this.seacrhMatchProfesstionFunction(text)}
                    onPress={(data) => this.handleSelectMatchProfession(data)}
                />
                <Modal isVisible={paymentModal}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingTop: "10%", marginBottom: "10%", }}>
                            <View style={{}}>
                                {/* <Tier /> */}
                                <Text style={{ marginHorizontal: "5%", ...styles.grayText }}>To select other professions you have to be a payed member</Text>
                                <FlatList data={[
                                    {
                                        price: "$1.99",
                                        ampule: 500
                                    },
                                    {
                                        price: "$3.99",
                                        ampule: 1000
                                    },
                                ]}
                                    contentContainerStyle={{ paddingTop: "10%" }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.setState({ paymentModal: false })} style={{ borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginBottom: "5%", backgroundColor: "black" }} >
                                                <Ampules height={30} width={30} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ marginRight: 2 }}>
                                                        <Text style={styles.grayText1}>{item.ampule} Ampules</Text>
                                                        <Text style={styles.grayText2}>Get one free coupon.</Text>
                                                    </View>
                                                    <View style={{ height: 30, width: 70, backgroundColor: "#0ABDE3", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={styles.linkText}>{item.price}</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    }} />
                                {/* <Text style={styles.grayText}></Text> */}
                            </View>
                            <View style={{ marginHorizontal: "2.5%", }}>
                                {/* <Button sky title={'Continue'} onPress={() => this.setState({ paymentModal: false })} /> */}
                                <Button red title={'Cancel'} onPress={() => this.setState({ paymentModal: false })} />
                            </View>

                        </View>
                    </View>
                </Modal>
                {/* <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '30%' }}>
                        <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
                            <Text style={styles.heading}>Add your profession</Text>

                            <TouchableOpacity style={styles.inputConttainer} onPress={() => { this.setState({ professionModal: true }) }}>
                                <Icon.FontAwesome name="search" size={20} color="gray" />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row' }}>
                                <ScrollView horizontal={true}>
                                    {education.map((item, index) => this.renderChips(item, index))}
                                </ScrollView>
                            </View>
                            <Text style={styles.heading}>Filter matches by profession</Text>
                            <Text style={styles.desc}>Add profession filters</Text>
                            <TouchableOpacity style={styles.inputConttainer} onPress={() => { this.setState({ professionMatchModal: true }) }}>
                                <Icon.FontAwesome name="search" size={20} color="gray" />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <ScrollView horizontal={true}>
                                    {tags.map((item, index) => this.renderChips(item, index))}
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <View style={styles.rowContainer2}>
                                <View style={styles.lightDash}></View>
                                <View style={{ width: 10 }}></View>
                                <View style={styles.lightDash}></View>
                                <View style={{ width: 10 }}></View>
                                <View style={styles.lightDash}></View>
                                <View style={{ width: 10 }}></View>
                                <View style={styles.darkDash}></View>
                            </View>
                            <Button red title={'Connect'} onPress={() => { this.handleConnect() }} />
                        </View>
                    </ScrollView>
                </View>
                <ProfessionModal
                    isVisible={this.state.professionModal}
                    onClose={() => this.setState({ professionModal: false, value: "" })}
                    data={this.state.professions}
                    onSearch={(text) => this.seacrhFunction(text)}
                    onPress={(data) => this.handleSelectProfession(data)} />
                <ProfessionMatchModal
                    loading={this.state.professionLoading}
                    isVisible={this.state.professionMatchModal}
                    onClose={() => this.setState({ professionMatchModal: false, value: "" })}
                    data={this.state.connectMatchProfessions}
                    onSearch={(text) => this.seacrhMatchProfesstionFunction(text)}
                    onPress={(data) => this.handleSelectMatchProfession(data)} /> */}
            </Container >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        connectProfessions: state.connectReducer?.connectProfessions || {},
        user: state.authReducer || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        connectActions: bindActionCreators(connectActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectSetting2nd);