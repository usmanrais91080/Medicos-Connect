import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, FlatList, View, Platform} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Button} from '../../../../components';
import {
  route,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../lib/utils/constants';
import {BottomMenuIntro} from './BottomMenuIntro';
import styles from './style';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import {connect} from 'react-redux';
import {MentalServices} from '../../../../services';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const MentalSelfLove = props => {
  const [data, setData] = useState([]);
  const [day, setDay] = useState(0);
  const [category, setCategory] = useState('');
  const [selectedDay, setSelectedDay] = useState({});
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [afterQuestion, setAfterQuestion] = useState('');
  const [beforeQuestion, setBeforeQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [introModal, setIntroModal] = useState(false);
  const [introDaysModal, setIntroDaysModal] = useState(false);

  useEffect(() => {
    getAllDays(props.user.userData.token);
    getUserProgress('63c69becf13fb82f44b8f1d0', props.user.userData.token);
    const unsubscribe = props.navigation.addListener('focus', () => {
      getAllDays(props.user.userData.token);
      getUserProgress('63c69becf13fb82f44b8f1d0', props.user.userData.token);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //set headerLeft
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => props.navigation.goBack()}
          color={themeStyle.COLOR_WHITE}
        />
      ),
    });
  }, []);

  async function getAllDays(token) {
    await MentalServices.getAll(token)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {});
  }

  const findFirstFalseIndex = data => {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].is_completed) {
        return i;
      }
    }
    return -1; // Return -1 if no false value is found
  };

  async function getUserProgress(category, token) {
    await MentalServices.userProgress(category, token)
      .then(res => {
        setDay(
          res.data?.data?.journalProgress?.day
            ? res.data?.data?.journalProgress?.day
            : 0,
        );
      })

      .catch(err => {
        // console.log('progress err>>>>>>>', err.response.data);
      });
  }

  async function getSingleDay(token, id) {
    await MentalServices.getSingle(token, id)
      .then(res => {
        setAfterQuestion(res.data.data?.text_after_questions);
        setBeforeQuestion(res.data.data?.questions_section_title);
        setTitle(res.data.data?.title);
        setText(res.data.data?.text);
        setQuestions(res.data.data?.questions);
        setCategory(res.data.data?.category);
      })

      .catch(err => {
        // console.log('err>>>>>>>', err);
      });
  }

  const _renderDays = ({item}) => {
    return (
      <TouchableOpacity
        disabled={
          findFirstFalseIndex(data) < data.indexOf(item) || item.is_completed
        }
        style={
          item.is_completed
            ? {...styles.inActiveday, backgroundColor: themeStyle.PURPLE_COLOR}
            : item.active
            ? {...styles.inActiveday, backgroundColor: themeStyle.ORANGE}
            : styles.inActiveday
        }
        onPress={() => findAndChangeData(item)}>
        <Text
          style={[
            styles.digit,
            {
              color: item.is_completed
                ? themeStyle.COLOR_WHITE
                : themeStyle.COLOR_BLACK,
            },
          ]}>
          {item.day}
        </Text>
        <Text
          style={[
            styles.dateText,
            {
              color: item.is_completed
                ? themeStyle.COLOR_WHITE
                : themeStyle.COLOR_BLACK,
            },
          ]}>
          Day
        </Text>
      </TouchableOpacity>
    );
  };

  const findAndChangeData = async item => {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id == item._id) {
        if (data[i].active != null) {
          data[i].active = !data[i].active;
        } else {
          data[i].active = true;
        }
        tempArr.push(data[i]);
        setSelectedDay(data[i]);
      } else {
        data[i].active = false;
        tempArr.push(data[i]);
      }
    }
    setData(tempArr);
  };

  const findAndChangeChoice = item => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i]._id == item._id) {
        if (questions[i].active != null) {
          questions[i].active = !questions[i].active;
        } else {
          questions[i].active = true;
        }
      }
    }
    setQuestions(questions);
  };
  const changeSingleChoice = item => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].metadata.choices[0]._id == item._id) {
        if (questions[i].metadata.choices[0].active != null) {
          questions[i].metadata.choices[0].active =
            !questions[i].metadata.choices[0].active;
          questions[i].metadata.choices[1].active = false;
          questions[i].metadata.choices[2].active = false;
        } else {
          questions[i].metadata.choices[0].active = true;
          questions[i].metadata.choices[1].active = false;
          questions[i].metadata.choices[2].active = false;
        }
      } else if (questions[i].metadata.choices[1]._id == item._id) {
        if (questions[i].metadata.choices[1].active != null) {
          questions[i].metadata.choices[1].active =
            !questions[i].metadata.choices[1].active;

          questions[i].metadata.choices[0].active = false;
          questions[i].metadata.choices[2].active = false;
        } else {
          questions[i].metadata.choices[1].active = true;
          questions[i].metadata.choices[0].active = false;
          questions[i].metadata.choices[2].active = false;
        }
      } else if (questions[i].metadata.choices[2]._id == item._id) {
        if (questions[i].metadata.choices[2].active != null) {
          questions[i].metadata.choices[2].active =
            !questions[i].metadata.choices[2].active;
          questions[i].metadata.choices[1].active = false;
          questions[i].metadata.choices[0].active = false;
        } else {
          questions[i].metadata.choices[2].active = true;
          questions[i].metadata.choices[1].active = false;
          questions[i].metadata.choices[0].active = false;
        }
      }
    }
    setQuestions(questions);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Text style={styles.header}>
          Level <Text style={{fontFamily: themeStyle.FONT_BOLD}}>1</Text>
        </Text>
        <FlatList
          style={{flexGrow: 0}}
          data={data}
          numColumns={5}
          keyExtractor={item => item._id}
          renderItem={_renderDays}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: '3%',
            paddingBottom: 10,
          }}
        />
        {data.length == 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {Array.from({length: 35}).map((_, index) => (
              <ShimmerPlaceHolder
                style={{
                  width: SCREEN_WIDTH * 0.16,
                  height: SCREEN_HEIGHT * 0.071,
                  borderRadius: 10,
                  margin: 5,
                }}
              />
            ))}
          </View>
        ) : null}
        <View style={styles.progressCard}>
          <Text style={styles.progressHeader}>Progress</Text>
          <View style={styles.progressflex}>
            <View style={styles.progressCardContainer}>
              <View>
                <Text style={styles.progressText}>Days</Text>
                <Text style={styles.progressText}>Completed</Text>
              </View>
              <Text style={styles.dayCount}>{day}</Text>
            </View>
            <View style={styles.progressCardContainer}>
              <View>
                <Text style={styles.progressText}>Days</Text>
                <Text style={styles.progressText}>Remaining</Text>
              </View>
              <Text style={styles.dayCount}>{data?.length - day}</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: '5%', marginBottom: 20}}>
          <Button
            title="Start"
            width={SCREEN_WIDTH * 0.9}
            containerStyle={{
              alignSelf: 'center',
              backgroundColor: themeStyle.ORANGE_DARK,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={async () => {
              if (selectedDay.active) {
                await getSingleDay(props.user.userData.token, selectedDay._id);
                if (selectedDay.day == '1') {
                  setIntroModal(true);
                } else {
                  setIntroDaysModal(true);
                }
              }
            }}
            customColor={themeStyle.ORANGE_DARK}
          />
        </View>
      </View>
      <BottomMenuIntro
        visible={introModal}
        onClose={() => setIntroModal(false)}
        data={{
          title: '30-DAY JOURNEY OF FINDING YOU',
          text: `Welcome to your 30-Day Self-Love Journal! I am here to support you along the way. Throughout this journal, you will have the space to explore self-care practices and find what works best for you. As you experiment with different practices, consider how they make you feel.
              Remember that self-love takes time and patience. Be kind to yourself throughout this process and celebrate even the smallest steps forward. You deserve love and care; this journal will help you cultivate them from within.
              Are you ready to start your journey of self-exploration? This is your starting point. Begin here, as this journal is designed to help you start telling a special story—your own story. This journal is all about you!
              Let's begin this beautiful journey of self-love together!`,
        }}
        onButtonPress={() => {
          setIntroModal(false),
            setTimeout(() => {
              setIntroDaysModal(true);
            }, 1000);
        }}
      />

      {introDaysModal && (
        <BottomMenuIntro
          visible={true}
          onClose={() => setIntroDaysModal(false)}
          data={{
            day: selectedDay?.day,
            title: title,
            text: text,
          }}
          onButtonPress={() => {
            setIntroDaysModal(false);
            props.navigation.navigate(route.MENTALDAYS, {
              day: selectedDay?.day,
              title: title,
              text: text,
              questions: questions,
              afterQuestion,
              beforeQuestion,
              changeChoice: findAndChangeChoice,
              changeSingleChoice: changeSingleChoice,
              token: props.user.userData.token,
              userToken: props.user.userData.token,
              category: category,
            });
          }}
        />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MentalSelfLove);
