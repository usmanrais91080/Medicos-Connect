import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Container, Icon, Button, Loader} from '../../../../components';
import styles from './style';
import CareerMenu from '../CareerMenu';
import {route, SCREEN_WIDTH} from '../../../../lib/utils/constants';
import {CareerServices, ProfileServices} from '../../../../services';
import Hyperlink from 'react-native-hyperlink';
import themeStyle from '../../../../assets/styles/theme.style';
import {authActions} from '../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bottomTabActions} from '../../../../redux/actions/bottomTab';
import CareerCompletionModal from '../../../../components/Modals/CareerCompletionModal';

const urlRegex = require('url-regex');
const colorTheme = {
  activeTintColor: themeStyle.LIGHT_GRAY,
  inactiveTintColor: themeStyle.COLOR_BLACK,
  backgroundColor: themeStyle.CARRER_PRIMARY,
  iconColor: themeStyle.COLOR_WHITE,
};

class CareerJobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      visible: false,
      sent: false,
      note: '',
      jobDetail: {},
      loading: true,
      alertModal: false,
      msgToDisplay: 'You have applied in your job',
    };
  }

  componentDidMount = () => {
    this.props.bottomTabAction.bottomTabTheme(colorTheme);

    this.getJobDetails();
    this.props.navigation.setOptions({
      headerRight: () => this.headerRight(),
    });
  };

  getJobDetails = () => {
    CareerServices.getJobDetail(
      this.props?.route?.params?.jobId,
      this.props?.route?.params?.token,
    )
      .then(res => {
        this.setState(
          {jobDetail: res.data.data},
          this.setState({loading: false}),
        );
      })
      .catch(err => {});
  };
  headerRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        {this.props?.route?.params?.pager ? null : (
          <TouchableOpacity
            onPress={() => this.setState({visible: true})}
            style={{marginLeft: 15}}
          >
            <Icon.Ionicons
              name="menu-sharp"
              size={30}
              color={themeStyle.COLOR_WHITE}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  applyJob = () => {
    const {note, jobDetail} = this.state;
    let data = {
      job_id: jobDetail?._id,
      note: note,
    };
    CareerServices.applyJob(data, this.props?.route?.params?.token)
      .then(res => {
        this.setState({alertModal: true});
      })
      .catch(err => {
        // console.log('err : ', err);
      });
    let tempJob = jobDetail;
    tempJob.is_applied = true;
    this.setState({
      jobDetail: tempJob,
    });
  };

  getImage = data => {
    let imageObj = data?.posted_from == 'Company' ? data?.company : data?.user;
    if (imageObj?.image != '') {
      return imageObj?.image;
    } else {
      return 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png';
    }
  };

  render() {
    const {jobDetail, loading, alertModal} = this.state;
    return (
      <Container color>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{paddingBottom: '35%'}}
              showsVerticalScrollIndicator={false}
            >
              <View style={{marginTop: '5%'}}>
                <View style={styles.cardContainer}>
                  <View style={styles.avatarContainer}>
                    <View
                      style={{
                        borderColor: themeStyle.CARRER_PRIMARY,
                        borderWidth: 2,
                        borderRadius: 60,
                      }}
                    >
                      <Avatar
                        source={{
                          uri: this.getImage(jobDetail),
                        }}
                        rounded
                        size={60}
                      />
                    </View>

                    <Text style={styles.titleText}>
                      {jobDetail?.posted_from == 'Company'
                        ? jobDetail?.company?.name
                        : jobDetail?.user?.username || 'username'}
                    </Text>
                    {jobDetail?.type?.map((item, index) => {
                      return (
                        <View key={index} style={styles.jobType}>
                          <Text style={styles.rightText}>{item.name}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View style={{marginTop: '2%'}}>
                    {jobDetail?.profession?.name ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Profession</Text>
                        <Text style={styles.rightText}>
                          {jobDetail?.profession?.name}
                        </Text>
                      </View>
                    ) : null}

                    {jobDetail?.education ||
                    jobDetail?.quailifications ||
                    jobDetail?.qualifications ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Education</Text>
                        <Text style={styles.rightText}>
                          {jobDetail?.education ||
                            jobDetail?.quailifications ||
                            jobDetail?.qualifications}
                        </Text>
                      </View>
                    ) : null}

                    {jobDetail?.experience ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Experience</Text>
                        <Text style={styles.rightText}>
                          {jobDetail?.experience}
                        </Text>
                      </View>
                    ) : null}
                    {jobDetail?.min_experience ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Experience</Text>
                        <Text style={styles.rightText}>
                          {jobDetail?.min_experience} years
                        </Text>
                      </View>
                    ) : null}
                    {jobDetail?.country ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Country</Text>
                        <Text
                          style={[
                            styles.rightText,
                            {textTransform: 'capitalize'},
                          ]}
                        >
                          {jobDetail?.country}
                        </Text>
                      </View>
                    ) : null}
                    {jobDetail?.city ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>City</Text>
                        <Text style={styles.rightText}>{jobDetail?.city}</Text>
                      </View>
                    ) : null}
                    {jobDetail?.salary ? (
                      <View style={styles.rowStyle}>
                        <Text style={styles.leftText}>Salary</Text>
                        <Text style={styles.rightText}>
                          {jobDetail?.salary}
                        </Text>
                      </View>
                    ) : null}
                    <View style={{marginTop: '5%'}}>
                      {jobDetail?.description ? (
                        <>
                          <Text style={styles.leftText}>Description</Text>
                          {urlRegex().test(jobDetail?.description) ||
                          jobDetail?.description?.includes('http://') ||
                          jobDetail?.description?.includes('https://') ? (
                            <Hyperlink
                              linkStyle={styles.blueText}
                              onPress={(url, text) => {
                                this.props.navigation.navigate(route.VIEWURL, {
                                  url: url,
                                });
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.leftText,
                                  color: themeStyle.COLOR_BLACK,
                                }}
                              >
                                {jobDetail?.description}
                              </Text>
                            </Hyperlink>
                          ) : (
                            <Text style={{...styles.rightText, marginTop: 8}}>
                              {jobDetail?.description}
                            </Text>
                          )}
                        </>
                      ) : null}

                      {jobDetail?.link ? (
                        <>
                          <Text style={{...styles.leftText, marginTop: 8}}>
                            Job Link
                          </Text>
                          <Text
                            onPress={(url, text) =>
                              this.props.navigation.navigate(route.VIEWURL, {
                                url: jobDetail?.link,
                              })
                            }
                            style={{
                              ...styles.rightText,
                              marginTop: 8,
                              fontFamily: themeStyle.FONT_MEDIUM,
                            }}
                          >
                            {jobDetail?.link}
                          </Text>
                        </>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
              {jobDetail?.is_applied ? (
                <View style={styles.btnContainer}>
                  <Button
                    disabled
                    career
                    titleColor={themeStyle.COLOR_BLACK}
                    customColor={themeStyle.WHITE_SMOKE}
                    width={SCREEN_WIDTH - 40}
                    height={60}
                    title={'Applied'}
                  />
                </View>
              ) : (
                <View style={styles.btnContainer}>
                  <Button
                    green
                    career
                    title={'Apply'}
                    onPress={() => this.applyJob()}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        )}

        <CareerMenu
          visible={this.state.visible}
          onEditProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREEREDITPROFILE),
            )
          }
          onViewJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBAPPLIED),
            )
          }
          onFavJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBFAV),
            )
          }
          onPostedJobs={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERJOBPOSTED),
            )
          }
          onProfile={() =>
            this.setState({visible: false}, () =>
              this.props.navigation.navigate(route.CAREERSETTINGS),
            )
          }
          onDeactive={async () => {
            const data = await this.props.user?.userModules?.filter(function (
              account,
            ) {
              return account.module.name === 'Career';
            });
            ProfileServices.deactivateUserModule(
              {id: data[0]._id},
              this.props.user.userData.token,
            )
              .then(async res => {
                this.setState({visible: false});

                await this.props.authActions.getUserModules(
                  this.props.user.userData.token,
                );
                this.props.navigation.replace(route.MAIN);
              })
              .catch(err => {
                // console.log(err);
              });
          }}
          onClose={() => this.setState({visible: false})}
        />
        <CareerCompletionModal
          applied
          topAds={this.props.user?.topAds}
          bottomAds={this.props.user?.bottomAds}
          visible={alertModal}
          onClose={() => this.setState({alertModal: false})}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {search: state.searchReducer, user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    bottomTabAction: bindActionCreators(bottomTabActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerJobDetail);
