import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import themeStyle from '../../../../../assets/styles/theme.style';
import {DeleteModal, Icon, Input} from '../../../../../components';
import Starsquare from '../../../../../assets/svg/journal-square.svg';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../lib/utils/constants';
import ScaleSvg from '../../../../../assets/svg/scale.svg';
import {BottomMenuIntro} from '../BottomMenuIntro';
import {connect} from 'react-redux';
import style from './style';
import {MentalServices} from '../../../../../services';
import {authActions} from '../../../../../redux/actions/auth';
import {bindActionCreators} from 'redux';
import HeaderLeftIcon from '../../../../../components/HeaderLeftIcon';

const ThirtyDay = {
  title: '30 day complete',
  text: "List of Intentions Maintain my focus on my to-do list. Be in the present moment. I will stand up for my own beliefs. Allow my intuition to guide me. Take pleasure in my inventiveness. Be deliberate and organized in my work. Be open to new possibilities without closing myself off. Prioritize what is most important to me, not what is most important to me. Accept all forms of change. To be afraid and still do it. To dance as if no one is watching. to raise my game in order to meet my own expectations to respond to a call to service. To live a genuine and unapologetic life. To be picky about how I spend my time. To be the person on whom my friends can rely. Today, I intend to: To learn a new skill and better myself. To bring joy into the lives of others. To be present for myself. To give myself grace. To encourage and inspire others by being my true self. To hustle and work hard while knowing I am loved regardless of the outcome. To bring more simplicity and peace into my day. To give something back to the community that has inspired me, to investigate something I've never seen before. To take a breather before responding in a conversation and to lead with empathy and love. Notice when I am feeling judgmental and ask myself what in me feels threatened Keep my workspace free of clutter.",
};

const Days = props => {
  const {
    day,
    title,
    text,
    questions,
    changeChoice,
    changeSingleChoice,
    category,
    beforeQuestion,
    afterQuestion,
  } = props.route.params;
  const [less, setLess] = useState(true);
  const [finish, setFinish] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [answer, setAnswer] = useState('');
  const [qAnsArray, setQAnsArray] = useState([]);
  const [alertModal, setAlertModal] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => headerTitle(),
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  }, []);

  async function postProgress() {
    await MentalServices.progressJournal(
      {
        category: category,
        answers: qAnsArray,
      },
      props.user.userData.token,
    )
      .then(async res => {
        await props.authActions.updateJournalDays(props.user.userData.token);
        setComplete(true);
      })

      .catch(err => {
        setAnswer(`${err.response.data.message}`);
        setAlertModal(true);
      });
  }

  const headerTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={style.headerTitleText}>Self Help Journal</Text>
        <View style={style.headerDay}>
          <Text style={style.headerDayText}>Day {day}</Text>
        </View>
      </View>
    );
  };

  if (complete) {
    return (
      <View style={style.completedContainer}>
        <Image
          source={require('../../../../../assets/gifs/medal.gif')}
          style={style.rewardIcon}
        />
        <Text style={style.congratulations}>We are proud of you</Text>
        <Text style={style.completedText}>
          You took your first step towards self improvement Do come tomorrow and
          we hope that you will complete{'\n'}
          <Text style={style.bold}>90 day challenge</Text>
        </Text>
      </View>
    );
  }

  const handleBooleanOptions = () => {
    let data = [];
    questions.map((item, index) => {
      if (item.active) {
        data.push({
          question: item._id,
          user_answer: true,
        });
      } else {
        data.push({
          question: item._id,
          user_answer: false,
        });
      }
    });
    setQAnsArray(data);
  };

  const handleChoiceOptions = (id, question) => {
    var data = [...qAnsArray];
    if (data.indexOf(id) == -1) {
      let newArr = data.filter(item => {
        return item?.question !== id;
      });
      question.map((item, index) => {
        if (item.active) {
          newArr.push({question: id, user_answer: item._id});
        }
      });
      setQAnsArray(newArr);
    }
  };

  const _renderQuestions = ({item, index}) => {
    return (
      <>
        {item.type == 'text' && (
          <View>
            <>
              {day == 8 ? (
                <View style={style.question}>
                  <Text style={style.questionText}>{item.text}</Text>
                </View>
              ) : (
                <View style={style.question}>
                  <Text style={style.questionTitle}>{item.title}</Text>
                  <Text style={style.questionText}>{item.text}</Text>
                </View>
              )}
              <View style={style.answer}>
                <Text style={style.answerText}>Answer</Text>
                <Input
                  key={index}
                  multiline={true}
                  placeholder=""
                  textColor="red"
                  selfHelpJournal={true}
                  inputStyle={{fontSize: 20}}
                  containerStyle={{height: SCREEN_HEIGHT * 0.2}}
                  placeholderTextColor="#7E7E7E"
                  customColor="transparent"
                  onChangeText={text => {
                    let data = [...qAnsArray];
                    data[index] = {
                      ...data[index],
                      user_answer: text,
                      question: item._id,
                    };
                    setQAnsArray(data);
                  }}
                />
              </View>
            </>
          </View>
        )}
        {item.type == 'scale' && (
          <View>
            <>
              <View style={style.question}>
                <Text style={style.questionText}>{item.text}</Text>
              </View>
              <View style={style.answer}>
                <Text style={style.answerText}>Answer</Text>
                <Input
                  key={index}
                  multiline={true}
                  placeholder=""
                  keyboardType="numeric"
                  containerStyle={{height: SCREEN_HEIGHT * 0.2}}
                  placeholderTextColor="#7E7E7E"
                  customColor="transparent"
                  onChangeText={text => {
                    let data = [...qAnsArray];
                    data[index] = {
                      ...data[index],
                      user_answer: text,
                      question: item._id,
                    };
                    setQAnsArray(data);
                  }}
                />
              </View>
            </>
          </View>
        )}

        {item.type == 'boolean' && (
          <View style={style.optionContainer}>
            <Starsquare />
            <View style={{width: '70%', marginLeft: 15}}>
              <Text
                style={{
                  fontFamily: themeStyle.FONT_REGULAR,
                }}
              >
                {item.text}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                changeChoice(item, index), setUpdateUI(!updateUI);
                handleBooleanOptions();
              }}
              style={
                !item.active
                  ? style.optionBox
                  : [style.optionBox, {backgroundColor: themeStyle.MENTAL_DARK}]
              }
            ></TouchableOpacity>
          </View>
        )}
        {item.type == 'choices' && (
          <View style={style.multipleChoiceContainer}>
            <Text style={{fontFamily: themeStyle.FONT_MEDIUM}}>
              {item.text}
            </Text>
            <View style={style.multipleChoiceItem}>
              <TouchableOpacity
                onPress={() => {
                  changeSingleChoice(item.metadata.choices[0]),
                    setUpdateUI(!updateUI);
                  handleChoiceOptions(
                    item._id,
                    questions[index].metadata?.choices,
                  );
                }}
                style={[
                  style.multipleChoiceItemText,
                  {
                    backgroundColor: !item.metadata.choices[0].active
                      ? themeStyle.COLOR_WHITE
                      : '#A287AF',
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: themeStyle.FONT_REGULAR,
                    color: item.metadata.choices[0].active
                      ? themeStyle.COLOR_WHITE
                      : themeStyle.COLOR_BLACK,
                  }}
                >
                  {item.metadata.choices[0].text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  changeSingleChoice(item.metadata.choices[1]),
                    setUpdateUI(!updateUI);
                  handleChoiceOptions(item._id, item?.metadata?.choices);
                }}
                style={[
                  style.multipleChoiceItemText,
                  {
                    backgroundColor: !item.metadata.choices[1].active
                      ? themeStyle.COLOR_WHITE
                      : '#A287AF',
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: themeStyle.FONT_REGULAR,
                    color: item.metadata.choices[1].active
                      ? themeStyle.COLOR_WHITE
                      : themeStyle.COLOR_BLACK,
                  }}
                >
                  {item.metadata.choices[1].text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  changeSingleChoice(item.metadata.choices[2]),
                    setUpdateUI(!updateUI);
                  handleChoiceOptions(item._id, item?.metadata?.choices);
                }}
                style={[
                  style.multipleChoiceItemText,
                  {backgroundColor: themeStyle.COLOR_WHITE},
                  {
                    backgroundColor: !item.metadata.choices[2].active
                      ? themeStyle.COLOR_WHITE
                      : '#A287AF',
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: themeStyle.FONT_REGULAR,
                    color: item.metadata.choices[2].active
                      ? themeStyle.COLOR_WHITE
                      : themeStyle.COLOR_BLACK,
                  }}
                >
                  {item.metadata.choices[2].text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: themeStyle.COLOR_WHITE}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}
        >
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>{title}</Text>

            <View style={style.contentContainer}>
              {less ? (
                <Text style={style.contentContainerText}>
                  {text.split('').slice(0, 85)}
                  <Text onPress={() => setLess(false)} style={style.readMore}>
                    {' '}
                    Read more...
                  </Text>
                </Text>
              ) : (
                <Text style={style.contentContainerText}>
                  {text}
                  <Text onPress={() => setLess(true)} style={style.readMore}>
                    {' '}
                    Read less...
                  </Text>
                </Text>
              )}
            </View>

            <View style={style.hrFull} />
            <Text
              style={{
                fontFamily: themeStyle.FONT_MEDIUM,
                color: themeStyle.COLOR_BLACK,
                marginTop: 15,
                marginHorizontal: 10,
                textAlign: 'center',
              }}
            >
              {beforeQuestion}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {day == 11 ? (
                <ScaleSvg height={100} width={SCREEN_WIDTH} />
              ) : null}
            </View>

            <FlatList
              style={{flexGrow: 0}}
              data={questions}
              keyExtractor={item => item._id}
              renderItem={_renderQuestions}
              contentContainerStyle={{width: SCREEN_WIDTH * 0.9}}
            />
            <Text
              style={{
                fontFamily: themeStyle.FONT_MEDIUM,
                marginTop: 15,
                marginHorizontal: '5%',
                textAlign: 'center',
              }}
            >
              {afterQuestion}
            </Text>

            <View style={style.ButtonEnd}>
              <TouchableOpacity
                style={style.endButton}
                onPress={() => {
                  if (day == '30') {
                    setFinish(true);
                  } else {
                    postProgress();
                  }
                }}
              >
                <Text style={style.endDayText}>End Day</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {finish && (
        <BottomMenuIntro
          visible={true}
          onClose={() => setFinish(false)}
          data={{
            title: ThirtyDay.title,
            text: ThirtyDay.text,
          }}
          onButtonPress={() => {
            setFinish(false);
            props.navigation.goBack();
          }}
          buttonTitle="Finish"
        />
      )}
      <DeleteModal
        alert
        visible={alertModal}
        confirm={() => {
          setAlertModal(false);
        }}
        text={answer}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {user: state.authReducer || {}};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Days);
