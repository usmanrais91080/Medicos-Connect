import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {route} from '../../../../../lib/utils/constants';
import themeStyle from '../../../../../assets/styles/theme.style';
import {MentalServices} from '../../../../../services';
import CheckBox from '@react-native-community/checkbox';
import {Loader} from '../../../../../components';
import moment from 'moment';
import DatePicker from 'react-native-neat-date-picker';

const MentalGoalsHome = ({route: routeData}) => {
  const {token} = routeData.params;
  const navigation = useNavigation();
  const [selectedShortTerm, setSelectedShortTerm] = useState(0);
  const [selectedLongTerm, setSelectedLongTerm] = useState(0);
  const [selectedMidTerm, setSelectedMidTerm] = useState(0);
  const [shortTermGoals, setShortTermGoals] = useState(null);
  const [longTermGoals, setLongTermGoals] = useState(null);
  const [midTermGoals, setMidTermGoals] = useState(null);
  const [shortTermFilterGoals, setShortTermFilterGoals] = useState(null);
  const [longTermFilterGoals, setLongTermFilterGoals] = useState(null);
  const [midTermFilterGoals, setMidTermFilterGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goalCategories, setGoalCategories] = useState([]);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [dates, setDates] = useState({
    'Short Term': {
      fromDate: moment().startOf('year').format('MM-DD-YYYY'),
      toDate: moment().endOf('year').format('MM-DD-YYYY'),
      name: 'Short Term',
    },
    'Mid Term': {
      fromDate: moment().startOf('year').format('MM-DD-YYYY'),
      toDate: moment().endOf('year').format('MM-DD-YYYY'),
      name: 'Mid Term',
    },
    'Long Term': {
      fromDate: moment().startOf('year').format('MM-DD-YYYY'),
      toDate: moment().endOf('year').format('MM-DD-YYYY'),
      name: 'Long Term',
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getGoalCatagories();
    });
    return unsubscribe;
  }, [navigation]);

  const getGoalCatagories = () => {
    MentalServices.getGoalCatagories(token)
      .then(response => {
        if (response.data.code == 200) {
          setGoalCategories(response.data.data);
        }
      })
      .catch(error => {
        // console.log('Error', error);
      });
  };

  useEffect(() => {
    if (goalCategories?.length > 0) {
      goalCategories?.map(async item => {
        getGoals(item._id, item.name);
      });
    }
  }, [goalCategories, dates]);

  const onDateConfirm = (date, type) => {
    setDates({
      ...dates,
      [type]: {
        ...dates[type],
        fromDate: moment(date?.startDate, 'YYYY-MM-DD').format('MM-DD-YYYY'),
        toDate: moment(date?.endDateString, 'YYYY-MM-DD').format('MM-DD-YYYY'),
      },
    });
    setDatePickerVisible(false);
  };

  const getGoals = async (id, name) => {
    MentalServices.getGoals(token, dates[name].fromDate, dates[name].toDate, id)
      .then(response => {
        if (response.data.code == 200) {
          setLoading(false);
          if (name == 'Short Term') {
            setShortTermGoals(response.data.data[0]);
            setShortTermFilterGoals(response.data.data[0]);
            setSelectedShortTerm(0);
          } else if (name == 'Long Term') {
            setLongTermGoals(response.data.data[0]);
            setLongTermFilterGoals(response.data.data[0]);
            setSelectedLongTerm(0);
          } else {
            setMidTermGoals(response.data.data[0]);
            setMidTermFilterGoals(response.data.data[0]);
            setSelectedMidTerm(0);
          }
        }
      })
      .catch(error => {
        // console.log('Error', error);
      });
  };

  const updateGoal = (id, status) => {
    MentalServices.updateGoal(token, id, {status})
      .then(response => {
        // if (response.data.code == 200) {
        //   getGoalCatagories();
        // }
      })
      .catch(error => {
        // console.log('Error', error);
      });
  };

  const filterGoals = (type, status) => {
    switch (type) {
      case 'Short Term':
        let shortTerm = shortTermGoals?.goals?.filter(item => {
          if (status === 0) {
            return item;
          } else {
            return item.status === (status === 1 ? 'Completed' : 'InProgress');
          }
        });
        setShortTermFilterGoals({
          ...shortTermGoals,
          goals: shortTerm,
        });

        break;
      case 'Long Term':
        let longTerm = longTermGoals?.goals?.filter(item => {
          if (status === 0) {
            return item;
          } else {
            return item.status === (status === 1 ? 'Completed' : 'InProgress');
          }
        });
        setLongTermFilterGoals({
          ...longTermGoals,
          goals: longTerm,
        });
        break;
      default:
        let midTerm = midTermGoals?.goals?.filter(item => {
          if (status === 0) {
            return item;
          } else {
            return item.status === (status === 1 ? 'Completed' : 'InProgress');
          }
        });
        setMidTermFilterGoals({
          ...midTermGoals,
          goals: midTerm,
        });
    }
  };

  const renderGoals = ({item}, type) => {
    return (
      <View>
        <Text style={styles.termTitle}>{item?.categoryInfo?.name} Goals</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={
              type === 'Short Term'
                ? selectedShortTerm === 0
                  ? styles.selected
                  : styles.notSelected
                : type === 'Long Term'
                ? selectedLongTerm === 0
                  ? styles.selected
                  : styles.notSelected
                : selectedMidTerm === 0
                ? styles.selected
                : styles.notSelected
            }
            onPress={() => {
              switch (type) {
                case 'Short Term':
                  setSelectedShortTerm(0);
                  filterGoals(type, 0);
                  break;
                case 'Long Term':
                  setSelectedLongTerm(0);
                  filterGoals(type, 0);
                  break;
                default:
                  filterGoals(type, 0);
                  setSelectedMidTerm(0);
              }
            }}>
            <Text
              style={
                type === 'Short Term'
                  ? selectedShortTerm === 0
                    ? styles.selectedText
                    : styles.notSelectedText
                  : type === 'Long Term'
                  ? selectedLongTerm === 0
                    ? styles.selectedText
                    : styles.notSelectedText
                  : selectedMidTerm === 0
                  ? styles.selectedText
                  : styles.notSelectedText
              }>
              All Goals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'Short Term'
                ? selectedShortTerm === 1
                  ? styles.selected
                  : styles.notSelected
                : type === 'Long Term'
                ? selectedLongTerm === 1
                  ? styles.selected
                  : styles.notSelected
                : selectedMidTerm === 1
                ? styles.selected
                : styles.notSelected
            }
            onPress={() => {
              switch (type) {
                case 'Short Term':
                  setSelectedShortTerm(1);
                  filterGoals(type, 1);
                  break;
                case 'Long Term':
                  setSelectedLongTerm(1);
                  filterGoals(type, 1);
                  break;
                default:
                  filterGoals(type, 1);
                  setSelectedMidTerm(1);
              }
            }}>
            <Text
              style={
                type === 'Short Term'
                  ? selectedShortTerm === 1
                    ? styles.selectedText
                    : styles.notSelectedText
                  : type === 'Long Term'
                  ? selectedLongTerm === 1
                    ? styles.selectedText
                    : styles.notSelectedText
                  : selectedMidTerm === 1
                  ? styles.selectedText
                  : styles.notSelectedText
              }>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'Short Term'
                ? selectedShortTerm === 2
                  ? styles.selected
                  : styles.notSelected
                : type === 'Long Term'
                ? selectedLongTerm === 2
                  ? styles.selected
                  : styles.notSelected
                : selectedMidTerm === 2
                ? styles.selected
                : styles.notSelected
            }
            onPress={() => {
              switch (type) {
                case 'Short Term':
                  setSelectedShortTerm(2);
                  filterGoals(type, 2);
                  break;
                case 'Long Term':
                  setSelectedLongTerm(2);
                  filterGoals(type, 2);
                  break;
                default:
                  filterGoals(type, 2);
                  setSelectedMidTerm(2);
              }
            }}>
            <Text
              style={
                type === 'Short Term'
                  ? selectedShortTerm === 2
                    ? styles.selectedText
                    : styles.notSelectedText
                  : type === 'Long Term'
                  ? selectedLongTerm === 2
                    ? styles.selectedText
                    : styles.notSelectedText
                  : selectedMidTerm === 2
                  ? styles.selectedText
                  : styles.notSelectedText
              }>
              In Progress
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.goalsList}>Goals lists</Text>
        <View style={styles.goalsListContainer}>
          <Text
            style={styles.dateRange}
            onPress={() => {
              setDatePickerVisible(true);
            }}>
            {moment(dates[type].fromDate, 'MM-DD-YYYY').format('MMM YYYY') +
              ' - ' +
              moment(dates[type].toDate, 'MM-DD-YYYY').format('MMM YYYY')}
          </Text>
          <DatePicker
            mode="range"
            startDate={new Date(dates[type].fromDate)}
            endDate={new Date(dates[type].toDate)}
            isVisible={datePickerVisible}
            onConfirm={date => {
              onDateConfirm(date, type);
            }}
            onCancel={() => {
              setDatePickerVisible(false);
            }}
            date={new Date(dates[type].fromDate)}
          />
          {item?.goals?.map((item, index) => {
            return (
              <View key={index} style={styles.goalListRowContainer}>
                <Text style={styles.goalText}>{item.text}</Text>
                <CheckBox
                  disabled={false}
                  value={item.status === 'InProgress' ? false : true}
                  tintColors={{
                    true: themeStyle.ORANGE_DARK,
                    false: themeStyle.ORANGE_DARK,
                  }}
                  onValueChange={newValue => {
                    if (type === 'Short Term') {
                      let shortTerm = shortTermFilterGoals?.goals?.map(goal => {
                        if (goal._id === item._id) {
                          //also change the value in the original array
                          goal.status =
                            newValue === false ? 'InProgress' : 'Completed';
                        }
                        return goal;
                      });
                      setShortTermFilterGoals({
                        ...shortTermFilterGoals,
                        goals: shortTerm,
                      });
                      filterGoals(type, selectedShortTerm);
                    } else if (type === 'Long Term') {
                      let longTerm = longTermFilterGoals?.goals?.map(goal => {
                        if (goal._id === item._id) {
                          goal.status =
                            newValue === false ? 'InProgress' : 'Completed';
                        }
                        return goal;
                      });
                      setLongTermFilterGoals({
                        ...longTermFilterGoals,
                        goals: longTerm,
                      });
                      filterGoals(type, selectedLongTerm);
                    } else {
                      let midTerm = midTermFilterGoals?.goals?.map(goal => {
                        if (goal._id === item._id) {
                          goal.status =
                            newValue === false ? 'InProgress' : 'Completed';
                        }
                        return goal;
                      });
                      setMidTermFilterGoals({
                        ...midTermFilterGoals,
                        goals: midTerm,
                      });
                      filterGoals(type, selectedMidTerm);
                    }
                    //change Item status
                    updateGoal(
                      item._id,
                      newValue === false ? 'InProgress' : 'Completed',
                    );
                  }}
                />
              </View>
            );
          })}
        </View>
        <Text style={styles.yourProgress}>Your Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.completedProgress}>
            <Text style={styles.progressText}>Completed</Text>
            <Text style={styles.progressPercentage}>
              {+item?.percentageCompleted?.toFixed(0) || 0}%
            </Text>
          </View>
          <View style={styles.inProgress}>
            <Text style={styles.progressText}>In Progress</Text>
            <Text style={styles.progressPercentage}>
              {+item?.percentageInProgress?.toFixed(0) || 0}%
            </Text>
          </View>
          <View style={styles.allGoals}>
            <Text
              style={[styles.progressText, {color: themeStyle.COLOR_BLACK}]}>
              All Goals
            </Text>
            <Text
              style={[
                styles.progressPercentage,
                {color: themeStyle.COLOR_BLACK},
              ]}>
              {+item?.totalGoals?.toFixed(0) || 0}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.row}>
            <View
              style={[styles.box, {backgroundColor: themeStyle.ORANGE_DARK}]}
            />
            <Text>Completed</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.box, {backgroundColor: '#FF9C53'}]} />
            <Text>In Progress</Text>
          </View>
          <View style={styles.row}>
            <View
              style={[
                styles.box,
                {backgroundColor: themeStyle.COLOR_YELLOWISH},
              ]}
            />
            <Text>All</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getGoalCatagories();
            }}
          />
        }>
        <Text style={styles.title}>
          My <Text style={styles.goal}>Goals</Text>
        </Text>
        <Text style={styles.lifeGoals}>Write down your life goals</Text>
        <Text style={styles.createGoal}>Create Goal</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate(route.MENTALCREATEGOAL, {token})}>
          <Text style={styles.createGoalText}>Create a new goal</Text>
        </TouchableOpacity>
        {loading ? (
          <View style={styles.loader}>
            <Loader />
          </View>
        ) : null}
        {!loading ? (
          <>
            {renderGoals({item: shortTermFilterGoals}, 'Short Term')}
            {renderGoals({item: midTermFilterGoals}, 'Mid Term')}
            {renderGoals({item: longTermFilterGoals}, 'Long Term')}
          </>
        ) : null}

        {shortTermFilterGoals ||
        midTermFilterGoals ||
        longTermFilterGoals ||
        loading ? null : (
          <Text style={styles.noGoals}>No Goals Found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MentalGoalsHome;
