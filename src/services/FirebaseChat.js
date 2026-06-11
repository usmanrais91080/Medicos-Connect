/** @format */
import {initializeApp} from 'firebase/app';
import Config from '../config/config.json';
var firebaseConfig = Config.firebaseConfig;

let firebaseApp = initializeApp(firebaseConfig);

firebaseApp.getCurrentUser = function () {
  return firebaseApp.auth().currentUser;
};

firebaseApp.ref = () => {
  return firebaseApp.database().ref();
};

firebaseApp.on = callback => {
  return firebaseApp
    .ref()
    .child('chat')
    .limitToLast(1)
    .on('child_added', snapshot => {
      callback(snapshot);
    });
};

firebaseApp.fetch = (author, callback) => {
  return firebaseApp
    .ref()
    .child('users')
    .child(author)
    .once(
      'value',
      snapshot => callback(snapshot),
      errObj => {},
    );
};

firebaseApp.chats = (author, callback) => {
  return firebaseApp
    .ref()
    .child('chat')
    .child(author + '-' + 3)
    .on(
      'value',
      function (snapshot) {
        if (snapshot.val() != null) callback(snapshot);
        else alert('No data ');
      },
      function (error) {
        alert(error);
      },
    );
  // .ref('/chat/' + author + '-' + 3).once('value').then(function (snapshot) {
  //   if (snapshot.val() != null) {
  //     callback(snapshot)
  //   }
  //   else {
  //     alert('NochatsAvailable')
  //   }
  // });
  // .ref()
  // .child('chat')
  // .child(author)
  // .once('value', (snapshot) => callback(snapshot),
  //   (errObj) => { }
  // )
};
firebaseApp.chatForAdmin = callback => {
  return firebaseApp
    .ref()
    .child('users')
    .child(3)
    .on(
      'value',
      function (snapshot) {
        if (snapshot.val() != null) callback(snapshot);
        else alert('No data ');
      },
      function (error) {
        alert(error);
      },
    );

  // ,
  //   (snapshot) => callback(snapshot),
  //   (errObj) => { })
  //  firebaseApp
  //   .ref('/users/3/').once('value').then(function (snapshot) {
  //     if (snapshot.val() != null) {
  //       callback(snapshot)
  //     }
  //     else {
  //       alert('NochatsAvailable')
  //     }
  //   });
  // .ref()
  // .child('chat')
  // .once('value', (snapshot) => callback(snapshot),
  //   (errObj) => { }
  // )
};
firebaseApp.off = () => firebaseApp.ref().off();

export default firebaseApp;
