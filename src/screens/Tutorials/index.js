import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {Icon} from '../../components';
import styles from './styles';
import Social from '../../assets/svg/social.svg';
import Education from '../../assets/svg/education.svg';
import Connect from '../../assets/svg/connect.svg';
import Career from '../../assets/svg/career.svg';
import Classified from '../../assets/svg/classified.svg';
import Wallet from '../../assets/svg/bookKeeping.svg';
import Mee from '../../assets/svg/mee-new.svg';

import ArrowRight from '../../assets/svg/arrowRightModal.svg';

import {SCREEN_HEIGHT, SCREEN_WIDTH, route} from '../../lib/utils/constants';
class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}
        >
          <View
            style={{
              flex: 0.3,
              flexDirection: 'column',
            }}
          ></View>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderBottomLeftRadius: 30,
              borderTopLeftRadius: 30,
              paddingLeft: 25,
            }}
          >
            <View style={{flex: 1, marginTop: Platform.OS ? '10%' : '6%'}}>
              <View style={styles.menuContainer}>
                <Icon.AntDesign
                  onPress={() => this.props.navigation.goBack()}
                  name="arrowleft"
                  size={25}
                  color={themeStyle.COLOR_BLACK}
                />
                <Text style={styles.menuheading}>Settings</Text>
              </View>

              <View style={styles.row}>
                <Icon.AntDesign
                  onPress={() => this.props.navigation.goBack()}
                  name="arrowleft"
                  size={15}
                  color={themeStyle.COLOR_BLACK}
                />
                <Text style={styles.tutorials}>Tutorial</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Medicos Connect',
                    title: 'How to use Sign Up',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <Image
                    style={{
                      height: 50,
                      width: 60,
                    }}
                    source={require('../../assets/images/profile_logo.jpg')}
                  />
                  <Text style={styles.itemText}>{'General'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Wallet',
                    title: 'How to use Wallet',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-5%'}}>
                      <Wallet width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Wallet'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Connect',
                    title: 'How to use Connect',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-25%'}}>
                      <Connect width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Connect'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Social',
                    title: 'How to use Social',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-25%'}}>
                      <Social width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Social'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Mee',
                    title: 'How to use Mee',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View
                      style={{
                        marginLeft: '-20%',
                      }}
                    >
                      <Mee width={'90%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Mee'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Career',
                    title: 'How to use Career',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-10%'}}>
                      <Career width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Career'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Education',
                    title: 'How to use Education',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={styles.listItemContainer}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-20%'}}>
                      <Education width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Education'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(route.TUTORIALDETAIL, {
                    module: 'Classified',
                    title: 'How to use Classified',
                    description:
                      'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
                    videoLink: 'gvkqT_Uoahw',
                  });
                }}
                style={[styles.listItemContainer, {borderBottomWidth: 0}]}
              >
                <View style={styles.flex}>
                  <View
                    style={{
                      width: 50,
                    }}
                  >
                    <View style={{marginLeft: '-5%'}}>
                      <Classified width={'100%'} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{'Classified'}</Text>
                  <ArrowRight />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default TermsAndCondition;
