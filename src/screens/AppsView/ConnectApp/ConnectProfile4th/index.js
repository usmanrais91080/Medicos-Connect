import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Icon, Loader} from '../../../../components';
import ConnectProfileFunction from './connect.profile.funtion';
import {route} from '../../../../lib/utils/constants';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {VerticalSpacer} from '../../../../lib/utils/global';
import {
  ProfessionMatchModal,
  ProfessionModal,
} from './connect.profile4th.component';
import {connectActions} from '../../../../redux/actions/connect';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native-gesture-handler';
import {authActions} from '../../../../redux/actions/auth';
import {WalletServices} from '../../../../services';
import commonStyle from '../../../../assets/styles/common.style';

class ConnectProfile3rd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      education: [],
      professions: [],
      selectedProfessions: [],
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
      professionLoading: true,
      IsProfessionFound: false,
      packages: [],
      paymentLoading: false,
      item: {},
      videoUri: '',
    };
    this.arrayholder = [];
    this.arrayholder1 = [];
  }

  componentDidMount = () => {
    this.props.connectActions.getConnectProfessions(
      this.props.user.userData.token,
    );
    this.arrayholder = this.props.connectProfessions;
    // this.setState({ professions: this.props.connectProfessions })
    this.getMacthedPrfessions();
    this.getPackages();
  };

  getPackages = () => {
    ConnectProfileFunction.getPackages(this.props.user.userData.token)
      .then(res => {
        this.setState({packages: res});
      })
      .catch(err => null);
  };

  renderChips(item, index) {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({tags: this.state.tags.filter((_, i) => i != index)})
          }
          style={styles.minusContainer}>
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item.name}</Text>
        </View>
      </View>
    );
  }

  handleConnect = () => {
    let hobbiesArray = [];
    this.state.professions.map(item => {
      if (item.selected) {
        hobbiesArray.push(item._id);
      }
    });
    if (hobbiesArray.length > 0) {
      ConnectProfileFunction.updateConnectProfessionMatches(
        {profession_matches: hobbiesArray},
        this.props.user.userData.token,
      )
        .then(res => {
          this.props.authActions.getUserProfile(
            {token: this.props.user.userData.token},
            '',
            '',
          );
          this.props.navigation.replace(route.CONNECTHOME);
        })
        .catch(err => null);
    }
    // let profession_matches = [this.props?.user?.userData?.profession]
    else {
      this.setState({submit: true});
    }
  };

  seacrhProfesstionFunction = text => {
    this.arrayholder = this.props.connectProfessions;
    this.setState({value: text, professions: this.props.connectProfessions});
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({professions: newData, IsProfessionFound: false});
    } else {
      this.setState({IsProfessionFound: true});
    }
  };
  seacrhMatchProfesstionFunction = text => {
    this.setState({value: text});
    const newData = this.arrayholder1.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      this.setState({
        connectMatchProfessions: newData,
        IsProfessionFound: false,
      });
    } else {
      this.setState({IsProfessionFound: true});
    }
  };

  handleSelectProfession = data => {
    let array = [];
    array.push(data);
    this.setState(
      {
        education: array,
        professionModal: false,
        professionLoading: true,
        value: '',
      },
      () => this.getMacthedPrfessions(data._id),
    );
  };

  getMacthedPrfessions = () => {
    ConnectProfileFunction.getConnectProfessionMatches(
      this.props.user.userData.token,
    )
      .then(res => {
        let array = [...res];
        // if(this.props.user.userData.profession_matches.length > 0)
        // {
        //     this.props.user.userData.profession_matches.map((item, index) => {
        //         array.map((element, ind) => {
        //             if (item.profession_match.name == element.name) {
        //                 array[ind] = { ...array[ind], selected: true }
        //             }
        //         })
        //     })
        //     this.setState({professions:array,professionLoading: false })

        // }
        // else
        // {
        //     this.setState({professions:array,professionLoading: false })
        // }
        this.setState({professions: array, professionLoading: false});

        // if (this.props.user.userData.profession_matches.length < 1) {
        //     array.map((item, index) => {
        //         if (this.props.user.userData.profession._id == item._id) {
        //             array[index] = { ...array[index], selected: true }
        //             tags.push(item)
        //         } else {
        //             array[index] = { ...array[index], selected: false }
        //         }
        //     })
        // } else {
        //     this.props.user.userData.profession_matches?.map((element, ind) => {
        //         array.map((item, index) => {
        //             if (element.profession_match._id == item._id) {
        //                 array[index] = { ...array[index], selected: true }
        //                 tags.push(item)
        //             }
        //         })
        //     })
        // }
        // const uniqueArray = this.getUniqueListBy(tags, "_id");
        // this.arrayholder1 = array
        // this.setState({ connectMatchProfessions: array, tags: uniqueArray, professionLoading: false })
      })
      .catch(err => {
        this.setState({professions: [], professionLoading: false});
      });
  };
  getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };

  handleSelectMatchProfession = data => {
    let connectionArray = [...this.state.connectMatchProfessions];
    connectionArray.map((item, index) => {
      if (data._id == item._id) {
        if (data.selected) {
          connectionArray[index] = {...connectionArray[index], selected: false};
        } else {
          connectionArray[index] = {...connectionArray[index], selected: true};
        }
      }
    });
    let array = [...this.state.tags];
    array.push(data);
    this.arrayholder1 = connectionArray;
    this.setState({
      connectMatchProfessions: connectionArray,
      tags: array,
    });
  };

  createPayment = p_id => {
    this.setState({paymentLoading: true});
    fetch(
      `http://3.13.164.94:8000/api/paypal/payment/${p_id}/${this.props.user.userData._id}`,
    )
      .then(res => res)
      .then(response => {
        this.setState({paymentLoading: false});
        // this.setState({page:response.url},()=>this.setState({showModal:true}))
        console.log(response.url);
        this.setState({videoUri: response.url});
        // this.props.navigation.navigate(route.VIEWURL, { url: response.url })
      })
      .catch(error => {
        console.log('Error>>>>>>>>', error);
        this.setState({paymentLoading: false});
      });
    // WalletServices.createPayment(p_id,this.props.user.userData._id,this.props.user.userData.token)
    // .then((res) => {
    //     console.log(res);
    //     // this.setState({loading:false,packages:res.data.data})
    //     })
    // .catch((err) => { console.log("err : ", err); this.setState({loading:false})})
  };
  handlePaymentSuccess = () => {
    let array = [...this.state.connectMatchProfessions];
    let tags = [...this.state.tags];
    array.map((element, index) => {
      if (this.state?.item?.name == element.name) {
        array[index] = {...array[index], selected: true};
        tags.push(this.state?.item);
      }
    });
    this.arrayholder1 = array;
    this.setState({
      connectMatchProfessions: array,
      tags: tags,
      professionLoading: false,
      paymentModal: false,
      item: null,
    });
  };

  handleCreateTransction = item => {
    this.setState({paymentLoading: true});
    let data = {
      ampules: 10,
      type: 'Connect',
    };
    WalletServices.createTransaction(data, this.props.user.userData.token)
      .then(res => {
        console.log(res.data);
        let array = [...this.state.connectMatchProfessions];
        let tags = [...this.state.tags];
        array.map((element, index) => {
          if (this.state?.item?.name == element.name) {
            array[index] = {...array[index], selected: true};
            tags.push(this.state?.item);
          }
        });
        this.arrayholder1 = array;
        this.setState({
          connectMatchProfessions: array,
          tags: tags,
          paymentLoading: true,
          professionLoading: false,
          paymentModal: false,
          item: null,
        });
      })
      .catch(err => null);
  };

  renderhobbies = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let array = [...this.state.professions];
          if (array[index].selected) {
            array[index] = {...array[index], selected: false};
          } else {
            array[index] = {...array[index], selected: true};
          }
          this.setState({professions: array});
        }}
        key={index.toString()}
        style={{marginRight: 10}}>
        <View
          style={item.selected ? styles.textContainer : styles.textContainer1}>
          <Text style={item.selected ? styles.whiteText : styles.grayText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      tags,
      job,
      blockContact,
      education,
      matchByProfesstion,
      paymentModal,
      videoUri,
      item,
      professions,
      submit,
      selectedProfessions,
      professionLoading,
    } = this.state;
    return (
      <Container>
        <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} />
        {professionLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '30%'}}>
              <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
                <Text style={styles.heading2}>Match profiles</Text>
                <Text style={{...styles.desc, marginRight: '5%'}}>
                  Passions makes it easier to find who shares your interests.Add
                  3-5 to your profile to make better connections
                </Text>
                {/* <View style={styles.rowContainer}>
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
                            </View> */}

                <View style={styles.inputConttainer1}>
                  <Text style={styles.heading}>Match by profession</Text>
                  <FlatList
                    data={professions}
                    numColumns={0}
                    renderItem={({item, index}) =>
                      this.renderhobbies(item, index)
                    }
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={VerticalSpacer}
                  />
                  {submit && !selectedProfessions.length ? (
                    <Text style={commonStyle.errorText}>
                      Please select at least one profession to match.
                    </Text>
                  ) : null}
                </View>
                {/* <TouchableOpacity style={styles.inputConttainer} onPress={() => { this.setState({ professionMatchModal: true }) }}>

                                <View style={{ flex: 1, }} >{
                                    this.props?.user?.userData?.profession?.name ?
                                        <Text style={{ ...styles.desc1 }}>{this.props?.user?.userData?.profession?.name}</Text>
                                        :
                                        null
                                }</View>
                                <Icon.FontAwesome name="caret-down" size={30} color="gray" />
                            </TouchableOpacity> */}
                {/*
                            {tags.length != 0 ?
                                <ScrollView horizontal={true} >
                                    {tags.map((item, index) => this.renderChips(item, index))}
                                </ScrollView> : null} */}
                {/* <View style={styles.rowContainer}>
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
                            </View> */}
              </View>
            </ScrollView>
            <View style={styles.rowContainer2}>
              <View style={styles.lightDash}></View>
              <View style={{width: 10}}></View>
              <View style={styles.lightDash}></View>
              <View style={{width: 10}}></View>
              <View style={styles.lightDash}></View>
              <View style={{width: 10}}></View>
              <View style={styles.darkDash}></View>
            </View>
            <View
              style={[
                styles.rowContainer,
                styles.margin,
                {marginVertical: '7%'},
              ]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.pop()}
                style={styles.back}>
                <Text style={styles.grayText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleConnect()}
                style={styles.next}>
                <Text style={styles.grayText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ProfessionModal
          isVisible={this.state.professionModal}
          onClose={() => this.setState({professionModal: false, value: ''})}
          data={this.state.professions}
          onSearch={text => this.seacrhFunction(text)}
          onPress={data => {
            this.handleSelectProfession(data);
            console.log('Data>>>>>>', data);
          }}
        />
        <ProfessionMatchModal
          packages={this.state.packages}
          loading={this.state.professionLoading}
          paymentLoading={this.state.paymentLoading}
          isVisible={this.state.professionMatchModal}
          onClose={() =>
            this.setState({professionMatchModal: false, value: ''})
          }
          data={this.state.connectMatchProfessions}
          profession={this.props.user.userData.profession}
          paymentModal={paymentModal}
          item={item}
          videoUri={videoUri}
          onPressPayment={item =>
            this.props.user.userData.ampules > 20
              ? this.handleCreateTransction(item)
              : this.setState({paymentModal: true, item: item})
          }
          onSearch={text => this.seacrhMatchProfesstionFunction(text)}
          onPress={data => {
            this.handleSelectMatchProfession(data);
          }}
          paymentFalse={() =>
            this.setState({paymentModal: false, videoUri: ''})
          }
          payForAmpules={p_id => this.createPayment(p_id)}
          goBack={() => this.props.navigation.goBack()}
          setVideoUri={() => this.setState({videoUri: ''})}
          paymentSuccess={() => this.handlePaymentSuccess()}
          authActions={() =>
            this.props.authActions.getUserProfile(
              this.props.user.userData.token,
              '',
              '',
            )
          }
        />
        {/* <Modal isVisible={paymentModal} animationInTiming={600} animationOutTiming={400}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingTop: "10%", marginBottom: "10%", }}>
                            <View style={{}}>

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
                                            <TouchableOpacity onPress={() => this.setState({ paymentModal: false })} style={{ borderRadius: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", padding: 10, marginBottom: "5%", backgroundColor: "black" }} >
                                                <Ampules height={30} width={30} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ marginRight: 2 }}>
                                                        <Text style={styles.grayText1}>{item.ampule} Ampules</Text>
                                                        <Text style={styles.grayText2}>Get one free coupon.</Text>
                                                    </View>
                                                    <View style={{ height: 30, width: 70, marginLeft: "7.5%", backgroundColor: "#0ABDE3", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={styles.linkText}>{item.price}</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>

                                        )
                                    }} />
                             <Text style={styles.grayText}></Text>
                            </View>
                            <View style={{ marginHorizontal: "2.5%", }}>
                                 <Button sky title={'Continue'} onPress={() => this.setState({ paymentModal: false })} />
                                <Button red title={'Cancel'} onPress={() => this.setState({ paymentModal: false })} />
                            </View>

                        </View>
                    </View>
                </Modal> */}
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
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    connectProfessions: state.connectReducer?.connectProfessions || {},
    user: state.authReducer || {},
  };
};
const mapDispatchToProps = dispatch => {
  return {
    connectActions: bindActionCreators(connectActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectProfile3rd);
