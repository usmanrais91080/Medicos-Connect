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
import Search from '../../../../assets/svg/search.svg';
import Menu from '../../../../assets/svg/appsetting.svg';
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
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {/* <TouchableOpacity
                    //  onPress={() => this.setState({ visible: true })}
                    style={{ marginLeft: 15 }}  ><Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} /></TouchableOpacity> */}
      </View>
    );
  };

  render() {
    return (
      <Container>
        <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
          <View style={styles.container}>
            {/* <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Tier 1</Text>
                            <Text style={styles.tagLineText}>To become a Tier 1 User you need to complete basic verification.</Text>
                        </View> */}
            {/* <View style={styles.cardContainer}>
                            <Text style={styles.headingText1}>Features</Text>
                            <Text style={styles.tagLineText}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                diam nonumy eirmod tempor invidunt ut labore et dolore
                                magna aliquyam erat, sed diam voluptua. </Text>
                            <View style={styles.rowContainer}>
                                <View>
                                    <Text style={styles.headingText1}>Requirements</Text>
                                    <Text style={styles.tagLineText2}>Gove. issued Medical Card</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(route.UPLOADLICENSE)} style={styles.btnContainer}>
                                    <Text style={styles.btnText}>Upgrade Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Tier 1</Text>
              <Text style={styles.tagLineText}>
                To become a Tier 1 User you need to complete advanced
                identification.
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.headingText1}>Features</Text>
              <Text style={styles.tagLineText}>
                Upload you CNIC or Passport to achieve advanced verified with
                Medicos Connect and proceed.
              </Text>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.headingText1}>Requirements</Text>
                  <Text style={styles.tagLineText2}>
                    CNIC/Passport Identification
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(route.ADVANCEVERIFICATION)
                  }
                  style={styles.btnContainer}>
                  <Text style={styles.btnText}>Upgrade Now</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={'Start'}
                onPress={() =>
                  this.props.navigation.navigate(route.CAREERWELCOME)
                }
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
