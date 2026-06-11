import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {
  Button,
  ColorButton,
  Container,
  HorizontalList,
  Icon,
} from '../../../../components';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import CareerMenu from '../CareerMenu';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
export default class TierSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isVisible: false,
      passport: false,
      idCard: false,
      country: {},
      userList: [
        {
          image:
            'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
          name: 'UserName',
        },
        {
          image:
            'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
          name: 'UserName',
        },
        {
          image:
            'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
          name: 'UserName',
        },
        {
          image:
            'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
          name: 'UserName',
        },
        {
          image:
            'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
          name: 'UserName',
        },
      ],
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => this.props.navigation.goBack()}
          color={'#959FAE'}
        />
      ),
    });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} />
        </TouchableOpacity>
      </View>
    );
  };

  onSelect = country => {
    this.setState({
      countryCode: country.cca2,
      callingCode: country.callingCode[0],
      country: country,
      isVisible: false,
    });
  };
  _flagButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.setState({isVisible: !this.state.isVisible})}
        style={styles.flagContainer}>
        <View style={styles.column}>
          <FlagButton
            onOpen={() => this.setState({isVisible: !this.state.isVisible})}
            onClose={() => this.setState({isVisible: !this.state.isVisible})}
            placeholder="Select Country"
            placeholderTextStyle={{color: 'white'}}
            withEmoji={true}
            withFlagButton={true}
            countryCode={this.state.countryCode}
            withCountryNameButton={this.state.country.name}
            containerButtonStyle={styles.flagInnerContainer}
          />
        </View>
        <View style={styles.column1}>
          <Icon.AntDesign
            name="caretdown"
            color={themeStyle.COLOR_BLACK}
            size={18}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {idCard, passport, isVisible} = this.state;
    return (
      <Container>
        <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Tier 2 Verofication</Text>
              <Text style={styles.tagLineText}>
                To become a Tier 2 User you need to provide the following
                documents.
              </Text>
              <View style={{marginTop: '5%'}}>
                <Text style={styles.grayText}>Country of Issue</Text>
                <View style={styles.countryInputContainer}>
                  <CountryPicker
                    // countryCodes={['PK', 'US']}
                    theme={styles.themeText}
                    withFilter={true}
                    visible={this.state.isVisible}
                    onSelect={country => this.onSelect(country)}
                    withAlphaFilter={true}
                    withCountryNameButton={true}
                    renderFlagButton={this._flagButton}
                  />
                </View>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.headingText1}>Features</Text>
              <Text style={styles.tagLineText2}>
                Upload you CNIC or Passport to achieve advanced verified with
                Medicos Connect and proceed.
              </Text>
            </View>
            <View style={styles.headingContainer}>
              <TouchableOpacity
                onPress={() => this.setState({idCard: true, passport: false})}
                style={
                  idCard ? styles.selectedBtnContainer : styles.btnContainer
                }>
                <Text style={idCard ? styles.btnText : styles.btnText1}>
                  Smart card (English) National I.D
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({idCard: false, passport: true})}
                style={
                  passport
                    ? [styles.selectedBtnContainer, {marginTop: '5%'}]
                    : [styles.btnContainer, {marginTop: '5%'}]
                }>
                <Text style={passport ? styles.btnText : styles.btnText1}>
                  Passport Identification
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={'Start'}
                onPress={() => this.props.navigation.navigate(route.UPLOADCNIC)}
              />
            </View>
          </View>
        </ScrollView>
        <CareerMenu
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
        />
      </Container>
    );
  }
}
