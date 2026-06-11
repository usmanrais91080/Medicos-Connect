import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import themeStyle from '../../../../../assets/styles/theme.style';
import {MentalServices} from '../../../../../services';
import {DeleteModal} from '../../../../../components';

const MentalCreateGoal = ({route: routeData}) => {
  const {token} = routeData.params;
  const navigation = useNavigation();
  const [selected, setSelected] = useState('Short Term');
  const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState('');
  const [newMsgModal, setNewMsgModal] = useState(false);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    MentalServices.getGoalCatagories(token).then(response => {
      if (response.data.code == 200) {
        setGoalCategory(response.data.data);
      }
    });
  }, []);

  const createGoal = () => {
    if (!selected) {
      setNewMsg('Please select a category');
      setNewMsgModal(true);
      return;
    } else if (!goal) {
      setNewMsg('Please type your goal');
      setNewMsgModal(true);
      return;
    }

    const data = {
      text: goal,
      goalCategoryId: goalCategory?.find(item => item.name === selected)._id,
    };

    MentalServices.createGoal(data, token)
      .then(response => {
        if (response.data.code == 200) {
          setGoal('');
          navigation.goBack();
        }
      })
      .catch(err => {
        // console.log('error in createGoal: ', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create a <Text style={styles.goal}>Goal</Text>
      </Text>
      <Text style={styles.selectCategory}>Select Category</Text>
      <View style={styles.rowContainer}>
        {goalCategory?.map((item, index) => {
          return (
            <TouchableOpacity
              style={
                selected === item.name ? styles.selected : styles.notSelected
              }
              onPress={() => setSelected(item.name)}>
              <Text
                style={
                  selected === item.name
                    ? styles.selectedText
                    : styles.notSelectedText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.selectedGoalDetails}>
        Details about selected goal
      </Text>
      <Text style={styles.typeYourGoal}>Type your Goal</Text>
      <TextInput
        value={goal}
        style={styles.textInput}
        placeholder="Type your Goal"
        placeholderTextColor={themeStyle.LIGHT_GRAY}
        multiline
        onChangeText={text => setGoal(text)}
      />
      <TouchableOpacity style={styles.createButton} onPress={createGoal}>
        <Text style={styles.create}>Create</Text>
      </TouchableOpacity>
      <DeleteModal
        alert
        visible={newMsgModal}
        confirm={() => setNewMsgModal(false)}
        text={newMsg}
      />
    </View>
  );
};

export default MentalCreateGoal;
