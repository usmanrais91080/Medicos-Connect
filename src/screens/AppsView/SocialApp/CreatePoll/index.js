import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Search from '../../../../assets/svg/search.svg';
import themeStyle from '../../../../assets/styles/theme.style';
import Icon from '../../../../components/Icon';
import {
  CustomDropDownModal,
  DeleteModal,
  UploadingModal,
} from '../../../../components';
import {SocialServices} from '../../../../services';
import Link from '../../../../assets/svg/link-new.svg';
import PostModal from '../../../../components/Modals/PostModal';
import {useSelector} from 'react-redux';
import HeaderLeftIcon from '../../../../components/HeaderLeftIcon';

const CreatePoll = ({navigation, route}) => {
  const {token} = route.params;
  const [pollText, setPollText] = useState('');
  const [description, setDescription] = useState('');
  const [choices, setChoices] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [professionMatchModal, setProfessionMatchModal] = useState(false);
  const [tempStoryData, setTempStoryData] = useState([]);
  const [searchingData, setSearchingData] = useState(false);
  const [data, setData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState('');
  const [postModal, setPostModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const profile = useSelector(state => {
    return {user: state.authReducer || {}};
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftIcon
          onPress={() => navigation.goBack()}
          color={themeStyle.COLOR_BLACK}
        />
      ),
    });
    getTagFriends();
  }, []);

  function renderChips(item, index) {
    return (
      <View key={index.toString()} style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => setFriends(friends.filter((_, i) => i != index))}
          style={styles.minusContainer}
        >
          <Icon.AntDesign
            name="minus"
            size={15}
            color={themeStyle.COLOR_WHITE}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{item.label}</Text>
        </View>
      </View>
    );
  }

  const handleUploadNewPost = () => {
    if (!pollText) {
      setShowAlert(true);
      setAlertMessage('Please enter poll text');
      return;
    }
    if (choices.length < 2) {
      setShowAlert(true);
      setAlertMessage('Please enter at-least 2 options');
      return;
    }

    if (!description) {
      setShowAlert(true);
      setAlertMessage('Please enter description');
      return;
    }

    setUploading(true);
    let formData = new FormData();
    formData.append('pollText', pollText ? pollText : '');
    formData.append('description', description ? description : '');
    formData.append('type', isPublic ? 'Public' : 'Private');
    formData.append('link', link.toLowerCase());

    formData.append('content_type', 'POLL');

    if (friends?.length >= 1)
      friends?.map((item, index) => {
        formData.append(`tag_users[${index}]`, item.id);
      });

    choices.map((item, index) => {
      formData.append(`choices[${index}]`, item);
    });

    SocialServices.createPost(formData, token)
      .then(response => {
        if (response.status == 200) {
          setPostModal(true);
          setTimeout(() => {
            setUploading(false);
            setFriends([]);
            setDescription('');
            setData([]);
            setProfessionMatchModal(false);
            setPollText('');
            setChoices([]);
            setIsPublic(true);
            setIsPrivate(false);
            setLink('');
          }, 300);
        }
      })
      .catch(err => {
        setUploading(false);
        setPostModal(false);
        this.setState({uploading: false});
      });
  };

  const getTagFriends = () => {
    SocialServices.getTagUsers(token)
      .then(res => {
        let array = [];
        let data = [...res.data.data];
        data.map((item, index) => {
          array.push({
            id: item._id,
            label: item.username,
            value: item._id,
            image: item.image,
          });
        });
        setData(array);
        setTempStoryData(array);
        setSearchingData(false);
      })
      .catch(err => {
        setSearchingData(false);
      });
  };

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };

  const searchMatchProfessional = text => {
    searchingData(true);
    const newData = data.filter(item => {
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length != 0) {
      setTempStoryData(newData);
      setSearchingData(false);
    } else {
      setTempStoryData(data);
      setSearchingData(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themeStyle.YELLOW} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 50,
        }}
      >
        <Text style={styles.createPollText}>Create poll</Text>
        <View style={styles.enterOptionContainer}>
          <TextInput
            style={styles.enterOptionInput}
            placeholder="Enter Text for your poll here"
            multiline
            value={pollText}
            onChangeText={text => setPollText(text)}
            placeholderTextColor={themeStyle.INPUT_TEXT}
          />
          <View style={styles.linkContainer}>
            <TextInput
              value={link}
              onChangeText={e => setLink(e)}
              placeholder="Link"
              style={styles.linkInput}
              placeholderTextColor={themeStyle.INPUT_TEXT}
            />
            <Link />
          </View>
        </View>

        <TextInput
          style={styles.optionInput}
          placeholder="Option A"
          value={choices[0]}
          placeholderTextColor={'#343434'}
          onChangeText={text => {
            let temp = [...choices];
            temp[0] = text;
            setChoices(temp);
          }}
        />
        <TextInput
          style={styles.optionInput}
          placeholder="Option B"
          value={choices[1]}
          onChangeText={text => {
            let temp = [...choices];
            temp[1] = text;
            setChoices(temp);
          }}
          placeholderTextColor={'#343434'}
        />
        <TextInput
          style={styles.optionInput}
          placeholder="Option C"
          value={choices[2]}
          onChangeText={text => {
            let temp = [...choices];
            temp[2] = text;
            setChoices(temp);
          }}
          placeholderTextColor={'#343434'}
        />
        <TextInput
          style={styles.optionInput}
          placeholder="Option D"
          value={choices[3]}
          onChangeText={text => {
            let temp = [...choices];
            temp[3] = text;
            setChoices(temp);
          }}
          placeholderTextColor={'#343434'}
        />

        <Text style={styles.title}>Descriptions</Text>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.descriptionInput}
          placeholder="Enter your description"
          multiline
          placeholderTextColor={'#343434'}
        />
        <Text style={styles.title}>Tag Friends</Text>
        <TouchableOpacity
          style={styles.selectFriendsInput}
          onPress={() => setProfessionMatchModal(true)}
        >
          {friends.length > 0 ? (
            <Text style={styles.selectFriends}>
              {friends[friends.length - 1]?.label}
            </Text>
          ) : (
            <Text style={styles.selectFriends}>Select friends</Text>
          )}
          <Search fill={themeStyle.COLOR_BLACK} />
        </TouchableOpacity>

        <CustomDropDownModal
          tagFriends
          loading={searchingData}
          isVisible={professionMatchModal}
          onClose={() => setProfessionMatchModal(false)}
          data={tempStoryData}
          OnReset={() => setTempStoryData(data)}
          onSearch={text => searchMatchProfessional(text)}
          onPress={item => {
            try {
              let array = [...friends];
              if (array.length == 0) {
                array.push(item);
              } else {
                array.map((friendObj, index) => {
                  if (array[index].id != item.id) {
                    array.push(item);
                  }
                });
              }
              const uniqueArray = getUniqueListBy(array, 'id');
              setFriends(uniqueArray);
            } catch (error) {
              // console.log(error);
            }

            setProfessionMatchModal(false);
            setTempStoryData(data);
          }}
        />

        <View style={{marginTop: 10}}>
          <ScrollView horizontal={true}>
            {friends.map((item, index) => renderChips(item, index))}
          </ScrollView>
        </View>

        <Text style={styles.headingText}>Privacy</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsPrivate(false);
              setIsPublic(true);
            }}
            style={styles.row}
          >
            <View style={isPublic ? styles.selectedbox : styles.box}></View>
            <Text style={isPublic ? styles.selectedOption : styles.option}>
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsPrivate(true);
              setIsPublic(false);
            }}
            style={[styles.row, {marginLeft: '15%'}]}
          >
            <View style={isPrivate ? styles.selectedbox : styles.box}></View>
            <Text style={isPrivate ? styles.selectedOption : styles.option}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadNewPost}
        >
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
        <UploadingModal visible={uploading} />
        <PostModal
          isVisible={postModal}
          topAds={profile.user?.topAds}
          bottomAds={profile.user?.bottomAds}
          onClose={() => {
            setPostModal(false);
            navigation.goBack();
          }}
          title={'Your content is posted'}
          gifFile={require('../../../../assets/gifs/post-saved.gif')}
        />
        <DeleteModal
          alert
          visible={showAlert}
          confirm={() => {
            setShowAlert(false);
          }}
          text={alertMessage}
        />
      </ScrollView>
    </View>
  );
};

export default CreatePoll;
