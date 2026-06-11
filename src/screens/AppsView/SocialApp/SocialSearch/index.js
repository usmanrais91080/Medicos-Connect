import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, Icon} from '../../../../components';
import SocialTopNavigationRoutes from '../../../../navigation/SocialNavigation/SocialTopTabNavigation';
import Search from '../../../../assets/svg/search.svg';
import styles from './style';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import Modal from 'react-native-modal';
import {Avatar} from 'react-native-elements';
import SearchMenu from '../SocialMenu';
export default class SocialHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount = () => {
    // this.props.navigation.setOptions({
    //     headerRight: () => this.headerRight(),
    // });
  };

  // headerRight = () => {
  //     return (
  //         <View style={styles.headerRightContainer}>
  //             {/* <TouchableOpacity onPress={() => this.props.navigation.navigate(route.SOCIALSEARCH)} ><Search /></TouchableOpacity> */}
  //             <TouchableOpacity onPress={() => this.setState({ visible: true })} style={{ marginLeft: 15 }}  ><Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} /></TouchableOpacity>
  //         </View>
  //     )
  // }

  // headerLeft = () => {
  //     const { goBack } = this.props.navigation;
  //     return (
  //         <View style={{ marginRight: 15, }}>
  //             <TouchableOpacity onPress={() => goBack()} style={{ marginLeft: 15 }}  ><Icon.AntDesign name="arrowleft" size={20} color={'#959FAE'} /></TouchableOpacity>
  //         </View>
  //     )
  // }

  render() {
    return (
      <>
        <Container>
          <SocialTopNavigationRoutes />
        </Container>
      </>
    );
  }
}
