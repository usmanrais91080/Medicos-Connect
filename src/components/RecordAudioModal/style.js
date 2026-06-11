import React from 'react';
import { StyleSheet } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
export const styles = StyleSheet.create({
  Content: {
    padding: 30,
    width: '100%',
    height: '100%'
  },
  close: {
    position: 'absolute',
    left: 50,
    height: 24,
    width: 24,
    right: 0,
    top: 0,
    bottom: 0,
  },
  form: {
    // marginLeft:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bordertwo: {
    paddingTop: 10,
    borderBottomWidth: 1,
  },
  textone: {
    fontSize: 10,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
  },
  texttwo: {
    width: '80%',
    fontSize: 12,
    marginTop: 10
  },

  picedit: {
    fontSize: 10,
  },
  edit: {
    marginBottom: 5,
    fontSize: 10,
  },
  InputEdit: {
    marginTop: 15,
    fontSize: 10,
  },

  inputBoxView: {
    borderRadius: 30,
    width: '83%',
    minHeight: 40,
    maxHeight: 250,
    paddingLeft: 5
  },
  commentInput: {
    fontSize: 12,
    padding: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  button_text: {
    color: 'white',
    fontSize: 14,
  },
  button_setting: {
    marginTop: 20,
    marginBottom: 30,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cancelAlign: {
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 15
  },
  backgroundImage: {
    width: 80,
    height: 80,
    marginLeft: 10,

  },

  changeColor: {
    width: 80,
    height: 80,
  },
  flowerImageBack: {
    // padding: 10,
    // width: '100%',
    // height: '100%'
  },
  detail: {
    fontSize: 10,
    alignSelf: 'center',
  },
  flatImageBox: {
    marginTop: 25,
    flexDirection: 'row',
    // paddingRight: 10,

  },
  border: {
    paddingTop: 10,
    borderBottomWidth: 1,
  },




  recordAudio: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  borderBT: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: '3%',
    marginTop: 15,
    marginBottom: 15
  },
  borderData: {
    alignSelf: 'center',
    fontSize: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 15
  },
  imgIcon: {
    height: 80,
    width: 80
  },
  cancel: {
    fontSize: 14,
    alignSelf: 'center',
  },

  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff",
    alignSelf: 'center'
  },


  button: {
    padding: 20
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14,
    color: "#fff"
  },
  activeButtonText: {
    alignSelf: 'center',
    fontSize: 10,
    color: "#B81F00"
  },


  containerSide: {
    flex: 1,
    // paddingTop: 10,
  },
  ReviewAudio: {
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
  },
  RecordMessage: {
    alignSelf: 'center',
    marginTop: 35,
    fontSize: 10,
  },
  ReviewButton: {
    marginTop: 35,
    marginBottom: 10,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  TouchCancel: {
    alignSelf: 'center',
    marginTop: 20
  },
  Cancel: {
    fontSize: 10,
    alignSelf: 'center',
  },
  ButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
  },
  waveform: {
    height: 160,
    backgroundColor: 'black',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: 'white',
    borderTopWidth: 1,

  },
  waveborder: {
    marginTop: '15%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: 'white',
    borderTopWidth: 1,

  },
  welcome: {
    flex: 0.2,
    marginLeft: 10
  },
  imgIcon: {
    height: 80,
    width: 80
  },
  button_setting: {
    marginTop: 50,
    marginBottom: 10,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SaveEdit: {
    marginTop: 50,
    marginBottom: 15,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modal: {

    flexWrap: "nowrap",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    paddingBottom: 20,
    overflow: 'hidden'
  },
  modalItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  modalItemText: {
    fontSize: 14,
    paddingLeft: 10
  },
  name: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.04,
  },
  ModelStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  timerText: {
    fontSize: 14,
    fontFamily:themeStyle.FONT_MEDIUM,
    // fontStyle: "italic",
    alignSelf: "center",
    color: "#666666",
  },
  borderAroundButton: {
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
