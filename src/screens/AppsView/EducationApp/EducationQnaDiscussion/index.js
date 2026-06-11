import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DeleteModal,
  EducationStudentQueryItemComponent,
  Icon,
} from '../../../../components';
import {EducationServices, WalletServices} from '../../../../services';
import Loader from '../../../../components/Loader';
import themeStyle from '../../../../assets/styles/theme.style';
import {route} from '../../../../lib/utils/constants';
import {Avatar} from 'react-native-elements';
import EditQnaModal from '../../../../components/Modals/EditQnaModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagesModal from '../../../../components/SpecialComponents/ImagesModal';
import Like from '../../../../assets/svg/like-education.svg';
import LikeDisabled from '../../../../assets/svg/dislike-education.svg';
import {AmpuleModal} from '../../SocialApp/SocialHome/social.home.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../../../../redux/actions/auth';
import Ampules3 from '../../../../assets/svg/ampoules-3.svg';
import Ampules4 from '../../../../assets/svg/ampoules-4.svg';
import Ampules5 from '../../../../assets/svg/ampoules-5.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const EducationQnaDiscussion = ({
  route: routeData,
  navigation,
  authActions,
  user,
}) => {
  const [qna, setQna] = useState({});
  const [loading, setLoading] = useState(true);
  const {id, token} = routeData.params;
  const [comment, setComment] = useState('');
  const [commentSending, setCommentSending] = useState(false);
  const [comments, setComments] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const [replyId, setReplyId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertModal, setAlertModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [qnaDeleteModal, setQnaDeleteModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [ampules, setAmpules] = useState('');
  const [expandedCommentId, setExpandedCommentId] = useState('');
  const [expandComment, setExpandComment] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [giftArray, setGiftArray] = useState([
    {
      icon: Ampules3,
      name: '500',
      selected: false,
    },
    {
      icon: Ampules4,
      name: '1000',
      selected: false,
    },
    {
      icon: Ampules5,
      name: '1500',
      selected: false,
    },
  ]);
  const ref = useRef();
  const refRBSheet = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getQna();
    });
    return unsubscribe;
  }, []);

  const getQna = () => {
    EducationServices.getQnaById(id, token)
      .then(response => {
        setQna(response.data.data);
        getComments();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const getComments = () => {
    EducationServices.getQnaComments(id, token)
      .then(response => {
        setComments(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const deleteComment = id => {
    EducationServices.deleteQnaComment(id, token)
      .then(response => {
        getComments();
      })
      .catch(err => {
        setAlertModal(true);
        setErrorMessage(err?.message);
      });
  };

  const onLikePress = () => {
    EducationServices.likeOrUnlikeQna(id, token)
      .then(response => {
        setQna({...qna, likes: response.data?.data?.likes});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onDislikePress = () => {
    EducationServices.dislikeQna(id, token)
      .then(response => {
        setQna({...qna, dislikes: response.data?.data?.dislikes});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const likeUnlikeComment = comment_id => {
    setComments(
      comments.map(item => {
        if (item._id === comment_id) {
          return {
            ...item,
            likes: item.likes > 0 ? 0 : 1,
          };
        }
        return item;
      }),
    );

    const data = {
      comment_id,
      qna_id: id,
    };
    EducationServices.likeUnlikeComment(data, token)
      .then(response => {})
      .catch(err => {
        console.log(err);
      });
  };

  const calculateHours = date => {
    const currentDate = new Date();
    const createdAt = new Date(date);
    const diff = currentDate.getTime() - createdAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    switch (true) {
      case diff < 1000 * 60:
        return `just now`;
      case diff < 1000 * 60 * 60:
        return `${Math.floor(diff / (1000 * 60))} m`;
      case diff < 1000 * 60 * 60 * 24:
        return `${hours} h`;
      default:
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const onVotePoll = (id, choice_id) => {
    EducationServices.onVotePoll(id, {choice_id}, token)
      .then(response => {
        getQna();
      })
      .catch(err => {
        setAlertModal(true);
        setErrorMessage(err?.response?.data?.message);
      });
  };

  const sendComment = () => {
    setQna({
      ...qna,
      comments: qna.comments + 1,
    });
    if (isReply) {
      setComments(
        comments.map(item => {
          if (item._id === replyId) {
            return {
              ...item,
              replies: [
                ...item.replies,
                {
                  _id: Math.random().toString(36).substr(2, 9),
                  text: comment,
                  username: user.userData.social_username,
                  comment_by: {
                    _id: user.userData._id,
                  },
                  created_at: new Date().toISOString(),
                  image: user.userData.social_image,
                  isUploading: true,
                },
              ],
            };
          }
          return item;
        }),
      );

      const data = {
        comment_id: replyId,
        qna_id: id,
        text: comment,
      };
      setComment('');
      EducationServices.replyComment(data, token)
        .then(response => {
          setIsReply(false);
          setReplyId('');
          getComments();
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }

    setComments([
      ...comments,
      {
        _id: Math.random().toString(36).substr(2, 9),
        text: comment,
        username: user.userData.social_username,
        comment_by: {
          _id: user.userData._id,
        },
        created_at: new Date().toISOString(),
        image: user.userData.social_image,
        replies: [],
        isUploading: true,
      },
    ]);
    setComment('');

    EducationServices.commentQna({qna_id: id, text: comment}, token)
      .then(response => {
        getComments();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteQna = () => {
    EducationServices.deleteQna(id, token)
      .then(response => {
        navigation.goBack();
      })
      .catch(err => {
        setAlertModal(true);
        setErrorMessage(err?.message);
      });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.discussion}>Discussions</Text>
      </View>

      <KeyboardAwareScrollView contentInset={{top: 0, bottom: 0}}>
        <EducationStudentQueryItemComponent
          discussion={true}
          token={token}
          item={qna}
          navigation={navigation}
          onLikePress={onLikePress}
          onDislikePress={onDislikePress}
          onVotePoll={onVotePoll}
          showMenu={() => setEditModalVisible(true)}
          onPressImage={() => setModalVisible(true)}
          onGiftPress={() => setGiftModal(true)}
          user_id={user?.userData?._id}
        />
        <View style={{marginTop: '5%'}} />
        {comments?.map((item, index) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '5%',
                }}
              >
                <TouchableOpacity
                  onLongPress={() => {
                    setCommentId(item._id);
                    refRBSheet.current.open();
                  }}
                  style={styles.commentRow}
                >
                  <Avatar
                    source={{
                      uri: item?.image
                        ? item?.image
                        : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                    }}
                    rounded
                    size={30}
                  />
                  <View style={styles.innerCommentContainer}>
                    <View style={{flex: 0.9}}>
                      {item?.text?.includes('http://') ||
                      item?.text?.includes('https://') ? (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(route.VIEWURL, {url: item.text})
                          }
                          style={{
                            paddingVertical: '5%',
                            paddingHorizontal: '5%',
                          }}
                        >
                          <Text style={styles.nameText}>{item?.username}</Text>
                          <Text style={styles.blueText}>{item?.text} </Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={{paddingHorizontal: 15}}>
                          <Text style={styles.nameText}>{item?.username}</Text>
                          <Text style={styles.commentText}>{item?.text} </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => likeUnlikeComment(item._id)}
                >
                  <Like />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unlikeButton}
                  onPress={() => likeUnlikeComment(item._id)}
                >
                  <LikeDisabled />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: '12%',
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginRight: 16,
                  }}
                >
                  <Text style={styles.grayText}>
                    {calculateHours(item?.created_at)}
                  </Text>
                </View>
                {item?.isUploading ? (
                  <Text style={styles.grayText}>Uploading...</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setReplyTo(item.username);
                      setIsReply(true);
                      setComment('');
                      setReplyId(item._id);
                      ref.current.focus();
                    }}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginRight: 16,
                    }}
                  >
                    <Text style={styles.grayText}>Reply</Text>
                  </TouchableOpacity>
                )}
                {item?.replies?.length > 0 ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setExpandedCommentId(item._id);
                      setExpandComment(!expandComment);
                    }}
                  >
                    <Text style={styles.grayText}>
                      {item?.replies?.length > 0}
                      {item?.replies?.length == 0
                        ? ''
                        : expandedCommentId == item._id && expandComment
                        ? 'Hide replies'
                        : `View all replies(${item?.replies?.length})`}
                    </Text>
                    {/* <Text style={styles.grayText}>
                      {item?.replies?.length > 0
                        ? `View all replies(${item?.replies?.length})`
                        : ''}
                    </Text> */}
                  </TouchableOpacity>
                ) : null}
              </View>
              {expandedCommentId == item._id &&
                expandComment &&
                item?.replies?.map((val, i) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '5%',
                        }}
                      >
                        <TouchableOpacity
                          onLongPress={() => {
                            setCommentId(val._id);
                            refRBSheet.current.open();
                          }}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: '12%',
                          }}
                        >
                          <Avatar
                            source={{
                              uri: val?.image
                                ? val?.image
                                : 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
                            }}
                            rounded
                            size={30}
                          />
                          <View
                            style={{
                              flex: 0.9,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <View style={{flex: 0.9}}>
                              {val?.text.includes('http://') ||
                              val?.text.includes('https://') ? (
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate(route.VIEWURL, {
                                      url: val.comment,
                                    })
                                  }
                                  style={{
                                    paddingVertical: '5%',
                                    paddingHorizontal: '5%',
                                  }}
                                >
                                  <Text style={styles.nameText}>
                                    {val?.username}
                                  </Text>
                                  <Text style={styles.blueText}>
                                    {val?.comment}{' '}
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <View style={{paddingHorizontal: 15}}>
                                  <Text style={styles.nameText}>
                                    {val?.username}
                                  </Text>
                                  <Text style={styles.commentText}>
                                    {val?.text}{' '}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.likeButton}
                          onPress={() => likeUnlikeComment(val._id)}
                        >
                          <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => likeUnlikeComment(item._id)}
                          >
                            <Like />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.unlikeButton}
                            onPress={() => likeUnlikeComment(item._id)}
                          >
                            <LikeDisabled />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          marginLeft: '24%',
                        }}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginRight: 16,
                          }}
                        >
                          <Text style={styles.grayText}>
                            {calculateHours(val?.created_at)}
                          </Text>
                        </View>
                        {val?.isUploading ? (
                          <Text style={styles.grayText}>Uploading...</Text>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setReplyTo(val.username);
                              setIsReply(true);
                              setComment('');
                              setReplyId(item._id);
                              ref.current.focus();
                            }}
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginRight: 16,
                            }}
                          >
                            <Text style={styles.grayText}>Reply</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  );
                })}
            </View>
          );
        })}
        <View style={styles.commentContainer}>
          <TextInput
            ref={ref}
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder={!isReply ? 'Write a comment' : `Reply to ${replyTo}`}
          />
          {commentSending ? (
            <ActivityIndicator
              size="small"
              style={{marginRight: 13}}
              color={themeStyle.COLOR_BLACK}
            />
          ) : (
            <TouchableOpacity
              onPress={sendComment}
              disabled={comment.trim() === ''}
              style={styles.sendComment}
            >
              <Icon.AntDesign
                name="arrowright"
                size={25}
                color={themeStyle.EDUCATION_BROWN}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>

      <EditQnaModal
        modalVisible={editModalVisible}
        setModalVisible={() => setEditModalVisible(false)}
        onDelete={() => {
          setQnaDeleteModal(true);
          setEditModalVisible(false);
        }}
        onEdit={() => {
          setEditModalVisible(false);
          navigation.navigate(route.EDUCATIONSTUDENTPOSTCLASS, {
            id,
            token,
            isEdit: true,
            qnaCatagory: qna?.category,
            topic: qna?.topic,
            description: qna?.description,
          });
        }}
      />

      <ImagesModal
        modalVisible={modalVisible}
        images={qna?.multi_media}
        onClose={() => setModalVisible(false)}
      />

      <DeleteModal
        visible={deleteModal}
        confirm={() => {
          setDeleteModal(false);
          deleteComment(commentId);
          refRBSheet.current.close();
        }}
        cancel={() => {
          refRBSheet.current.close();
          setDeleteModal(false);
        }}
        text={'Are you sure you want to delete this comment?'}
      />

      <DeleteModal
        visible={qnaDeleteModal}
        confirm={() => {
          setQnaDeleteModal(false);
          deleteQna();
        }}
        cancel={() => {
          setQnaDeleteModal(false);
        }}
        text={'Are you sure you want to delete this Q n A?'}
      />

      <RBSheet ref={refRBSheet} height={120}>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={{alignSelf: 'center', marginBottom: '2%'}}
            onPress={() => refRBSheet.current.close()}
          >
            <Icon.Ionicons
              name="chevron-down"
              style={styles.listIcon}
              size={20}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.listButton}
              onPress={() => {
                setDeleteModal(true);
              }}
            >
              <Icon.MaterialIcons
                name="delete"
                style={styles.listIcon}
                size={20}
              />
              <Text style={styles.listLabel}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      <DeleteModal
        alert
        visible={alertModal}
        confirm={() => {
          setAlertModal(false);
        }}
        text={errorMessage}
      />

      <AmpuleModal
        visible={giftModal}
        onClose={() => setGiftModal(false)}
        data={giftArray}
        onSendGift={() => {
          setGiftModal(false);
          let data = {
            receiver_id: qna.user._id,
            ampules,
          };
          WalletServices.sendAmpules(data, token)
            .then(res => {
              if (res?.data?.message == 'Insufficent Ampules') {
                setAlertModal(true);
                setErrorMessage('Entered amount exceeds account balance.');
              } else {
                setAlertModal(true);
                setErrorMessage('Ampules gift send successfully!');
                authActions.getUserProfile({token}, '', '');
              }
            })
            .catch(error => {
              alert('Oh, shit! Try again');
              console.log('Error>>>>>>>>', error);
            });
        }}
        setCustomAmpules={num => {
          setAmpules(num);
        }}
        ampules={ampules}
        onPress={item => {
          let arrayData = [...giftArray];
          arrayData.map((e, i) => {
            if (item.name == e.name) {
              arrayData[i] = {...arrayData[i], selected: true};
              setAmpules(item.name);
            } else {
              arrayData[i] = {...arrayData[i], selected: false};
            }
          });
          setGiftArray(arrayData);
        }}
      />
    </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EducationQnaDiscussion);
