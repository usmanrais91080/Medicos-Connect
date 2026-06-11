import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Avatar} from 'react-native-elements';
import Search from '../../../../assets/svg/white-search.svg';
import {
  Container,
  Icon,
  Button,
  HeaderLeft,
  Loader,
} from '../../../../components';
import styles from './style';
import {route} from '../../../../lib/utils/constants';
import {EducationServices} from '../../../../services';
import themeStyle from '../../../../assets/styles/theme.style';
import EducationMenu from '../EducationMenu';
import {connect} from 'react-redux';

let today = new Date();
class EducationStudentWorkshopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fetching: false,
      activeTab: 0,
      visible: false,
      expanded: false,
      note: '',
      classes: this.props?.route?.params?.item,
      btn_enable:
        moment(today).format('YYYY-MM-DD') >=
          this.props?.route?.params?.item?.start_date &&
        moment(today).format('H:mma') >=
          this.props?.route?.params?.item?.start_time
          ? true
          : false,
    };
  }

  componentDidMount = () => {
    if (this.props?.route?.params?.notify) {
      this.setState({fetching: true});
      this.getCme(this.props?.route?.params?.item);
    }
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
      headerLeft: () => this.headerLeft(),
      headerTitle: () => this.headerTitle(),
    });
  };

  headerTitle = () => {
    return (
      <View style={styles.headerRightContainer}>
        <Text style={styles.headerTextStyle}>Education</Text>
        <View style={styles.datingStyle}>
          <Text style={styles.headingStyle}>{'Student'}</Text>
        </View>
      </View>
    );
  };

  headerLeft = () => {
    return <HeaderLeft white navigation={this.props.navigation} />;
  };

  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={{marginLeft: 15}}>
          <Icon.Ionicons
            name="menu-sharp"
            size={30}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  getCme = id => {
    const {token} = this.props?.route?.params;

    EducationServices.getCMEDetail(id, token)
      .then(res => {
        this.setState({classes: res.data?.response, fetching: false});
      })
      .catch(err => {
        console.log('err cme detail>>>>>>>>', err);
        this.setState({fetching: false});
      });
  };
  applyToCme = () => {
    const {token} = this.props?.route?.params;
    const {classes} = this.state;
    this.setState({loading: true});
    let data = {
      cme_id: classes?._id,
    };
    EducationServices.applyToCME(data, token)
      .then(response => {
        let tempClass = classes;
        tempClass.applied = true;
        this.setState({classes: tempClass, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  render() {
    const {currency, cme} = this.props?.route?.params;
    const {activeTab, note, classes, btn_enable, loading, fetching} =
      this.state;
    return (
      <Container>
        {fetching ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={{flex: 1, marginTop: '5%'}}>
              <View style={styles.cardContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      source={{
                        uri:
                          classes?.company?.image != ''
                            ? classes?.company?.image
                            : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                      }}
                      rounded
                      containerStyle={{
                        borderWidth: 2,
                        borderColor: themeStyle.COLOR_EDUCATION,
                      }}
                      size={100}
                    />
                    {classes?.company?.company_name ? (
                      <Text style={styles.titleText}>
                        {classes?.company?.company_name}
                      </Text>
                    ) : null}
                    {classes?.company?.rep_designation ? (
                      <Text style={styles.designationText}>
                        {classes?.company?.rep_designation}
                      </Text>
                    ) : null}
                    {classes?.sponsor_logo?.length > 0 ? (
                      <View style={styles.row}>
                        {classes?.sponsor_logo.map((sponsor, index) => (
                          <Image
                            source={{
                              uri: sponsor?.location,
                            }}
                            style={styles.sponsorLogo}
                          />
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.line} />
                  <View style={styles.mainContainer}>
                    <View style={{flex: 0.6}}>
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Class Topic</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.topic}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Title</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.title}
                          </Text>
                        </View>
                      )}
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Speaker Name</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes.speaker_name}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Platform</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.plateform}
                          </Text>
                        </View>
                      )}
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>CME Duration</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.duration}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Language:</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.language?.name}
                          </Text>
                        </View>
                      )}

                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>CME Price</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.price}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Date</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.date}
                          </Text>
                        </View>
                      )}
                      {
                        cme ? (
                          <View style={styles.rowStyle}>
                            <Text style={styles.headingText}>Start Date</Text>
                            <Text style={styles.colorHeadingText}>
                              {classes?.start_date}
                            </Text>
                          </View>
                        ) : null
                        /* <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>CME Hours</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.language?.name}
                          </Text>
                        </View> */
                      }
                      {!cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Start Time</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.from_time}
                          </Text>
                        </View>
                      ) : null}
                      {!cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Country</Text>
                          <Text
                            style={[
                              styles.colorHeadingText,
                              {textTransform: 'capitalize'},
                            ]}>
                            {classes?.country?.name}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={{flex: 0.5}}>
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Subject</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.subject}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>
                            Conference Name
                          </Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.conference_name}
                          </Text>
                        </View>
                      )}
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Platform</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.plateform}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Speaker</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.speaker_name}
                          </Text>
                        </View>
                      )}
                      {
                        cme ? (
                          <View style={styles.rowStyle}>
                            <Text style={styles.headingText}>Language:</Text>
                            <Text style={styles.colorHeadingText}>
                              {classes?.language?.name}
                            </Text>
                          </View>
                        ) : null
                        /* <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Time</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.language?.name}
                          </Text>
                        </View> */
                      }
                      {cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Start Time</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.start_time}
                          </Text>
                        </View>
                      ) : classes.price ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Fee</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.price || 0}
                          </Text>
                        </View>
                      ) : null}
                      {!cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>End Time</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.to_time}
                          </Text>
                        </View>
                      ) : null}
                      {!cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>City</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.city?.name}
                          </Text>
                        </View>
                      ) : null}
                      {!cme ? (
                        <View style={styles.rowStyle}>
                          <Text style={styles.headingText}>Venue</Text>
                          <Text style={styles.colorHeadingText}>
                            {classes?.venue}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  {cme ? (
                    <View
                      style={[
                        styles.rowStyle,
                        {marginHorizontal: 20, marginTop: 10},
                      ]}>
                      <Text style={styles.headingText}>Description</Text>
                      <Text style={styles.colorHeadingText}>
                        {classes?.description}
                      </Text>
                    </View>
                  ) : null}
                </ScrollView>
              </View>
            </View>
            <View style={[styles.btnContainer]}>
              <View style={{}}>
                {classes?.conference_name ? (
                  <Button
                    disabled={classes?.owner_entered ? false : true}
                    customColor={themeStyle.EDUCATION_BROWN}
                    title={'Take Conference'}
                    height={60}
                    onPress={() =>
                      this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
                        url: classes?.conference_name
                          ? classes?.link
                          : classes?.url,
                      })
                    }
                  />
                ) : classes?.applied ? (
                  <Button
                    disabled={classes?.owner_entered ? false : true}
                    customColor={themeStyle.EDUCATION_BROWN}
                    height={60}
                    title={'Take CME'}
                    onPress={() =>
                      this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
                        url: classes?.conference_name
                          ? classes?.link
                          : classes?.url,
                      })
                    }
                  />
                ) : (
                  <Button
                    loading={loading}
                    customColor={themeStyle.EDUCATION_BROWN}
                    height={60}
                    title={'Apply to CME'}
                    onPress={() => this.applyToCme()}
                  />
                )}
                {/* <Button
                // disabled={btn_enable ? false : true}
                parrot
                title={
                  classes?.conference_name ? 'Take Conference' : 'Take CME'
                }
                onPress={() =>
                  this.props.navigation.navigate(route.EDUCATIONTAKECLASS, {
                    url: classes?.conference_name
                      ? classes?.link
                      : classes?.url,
                  })
                }
              /> */}
              </View>

              {/* this.state.expanded ?
                                <View style={[styles.rowContainer]}>
                                    <Icon.Ionicons name="md-checkmark-circle" size={30} color='#99CC66' />
                                    <Text style={styles.colorHeadingText1}>Application Sent</Text>
                                </View>
                                :
                                <View style={{}}>
                                    <Button parrot title="Apply" onPress={() => this.setState({ expanded: true })} />
                                </View> */}
            </View>
          </View>
        )}

        <EducationMenu
          visible={this.state.visible}
          navigation={this.props.navigation}
          data={this.props.user.userData}
          onSwitch={() =>
            this.props.navigation.navigate(route.EDUCATIONTEACHER)
          }
          onTeacherStats={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONTEACHERREVIEWS);
          }}
          onMyDiscussion={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONCREATEQNA, {
              isMyDiscussion: true,
            });
          }}
          onYourClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(
              route.EDUCATIONSTUDENTCLASSESANDREQUESTS,
            );
          }}
          onPostClass={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS);
          }}
          onAppliedClasses={() => {
            this.setState({visible: false});
            this.props.navigation.navigate(route.EDUCATION, {
              screen: route.EDUCATIONSTUDENTAPPLIEDCLASSES,
            });
          }}
          onClose={() => this.setState({visible: false})}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};
export default connect(mapStateToProps)(EducationStudentWorkshopDetail);
