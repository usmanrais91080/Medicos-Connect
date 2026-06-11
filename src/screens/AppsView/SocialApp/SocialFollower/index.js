import React, {Component} from 'react';
import themeStyle from '../../../../assets/styles/theme.style';
import {Container, HeaderLeft} from '../../../../components';
import {route} from '../../../../lib/utils/constants';
import SearchMenu from '../SocialMenu';
import SocialTopTabFollowersNavigationRoutes from '../../../../navigation/SocialNavigation/SocialTopTabFollowersNavigation';
import {HeaderRight} from '../SocialHome/social.home.component';
export default class SocialFollowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      // headerRight: () => this.headerRight(),
      headerLeft: () => {
        return (
          <HeaderLeft
            color={themeStyle.COLOR_BLACK}
            navigation={this.props.navigation}
          />
        );
      },
      headerRight: () => (
        <HeaderRight
          newUser={this.state.unverifiedUser}
          showNewUserAlert={() => this.showNewUserAlertFunction()}
          // onQR={() => this.props.navigation.navigate(route.SCANQRCODE)}
          onPressSearch={() =>
            this.props.navigation.navigate(route.SOCIALEXPLORE)
          }
        />
      ),
    });
  };

  setHeaderTitle = title => {
    this.props.navigation.setOptions({headerTitle: title});
  };

  render() {
    return (
      <>
        <Container>
          <SearchMenu
            visible={this.state.visible}
            onSavedPosts={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALSAVEDPOST);
            }}
            onBlock={() => {
              this.setState({visible: false});
              this.props.navigation.navigate(route.SOCIALBLOCK);
            }}
            onClose={() => this.setState({visible: false})}
          />
          <SocialTopTabFollowersNavigationRoutes
            setHeaderTitle={this.setHeaderTitle}
          />
        </Container>
      </>
    );
  }
}
