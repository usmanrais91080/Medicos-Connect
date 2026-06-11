import React from 'react';
import {Input as ElementInput} from 'react-native-elements';
import inputStyles from './style';
import themeStyle from '../../assets/styles/theme.style';

const Input = props => {
  return (
    <ElementInput
      {...props}
      keyboardType={props.keyboardType}
      ref={props.inputRef}
      multiline={props.multiline}
      returnKeyType="done"
      onSubmitEditing={props.onSubmitEditing}
      containerStyle={
        props.comment
          ? {...inputStyles.commentContainerStyle, width: props.width}
          : props.colorProps && props.message
          ? {
              ...inputStyles.containerStyle,
              height: 100,
              backgroundColor: 'transparent',
            }
          : props.width
          ? {...inputStyles.containerStyle, width: props.width}
          : props.height
          ? {...inputStyles.containerStyle, height: props.height}
          : inputStyles.containerStyle
      }
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : '#000000'
      }
      inputContainerStyle={
        props.verification
          ? {
              ...inputStyles.inputContainerStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              paddingLeft: '2.5%',
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.COLOR_SILVER,
              backgroundColor: 'transparent',
            }
          : props.comment
          ? {
              ...inputStyles.inputContainerCommentStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
            }
          : props.connect
          ? {
              ...inputStyles.inputContainerStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              borderWidth: 1,
              borderColor: themeStyle.SPANISH_PINK,
            }
          : props.commentYellow
          ? {
              ...inputStyles.inputContainerCommentStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              borderColor: themeStyle.YELLOW,
              borderBottomWidth: 2,
              borderWidth: 2,
            }
          : props.commentCyan
          ? {
              ...inputStyles.inputContainerCommentStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              borderColor: themeStyle.CYAN_BLUE,
              borderBottomWidth: 2,
              borderWidth: 2,
            }
          : props.education
          ? {
              ...inputStyles.inputContainerStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              borderColor: themeStyle.EDUCATION_BROWN,
              borderBottomWidth: 2,
              borderWidth: 2,
            }
          : props.colorProps
          ? {
              ...inputStyles.inputContainerStyle,
              backgroundColor: themeStyle.COLOR_WHITE,
              paddingLeft: '2.5%',
            }
          : props.career
          ? {
              ...inputStyles.inputContainerStyle,
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.CARRER_PRIMARY,
              backgroundColor: 'transparent',
              height: 60,
            }
          : props.classified
          ? {
              ...inputStyles.inputContainerStyle,
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.CLASSIFIED_HOME,
              backgroundColor: 'transparent',
            }
          : props.postad
          ? {
              ...inputStyles.inputContainerStyle,
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.CLASSIFIED_HOME,
              backgroundColor: 'transparent',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          : props.silver
          ? [
              {
                ...inputStyles.inputContainerStyle,
                borderWidth: 2,
                borderBottomWidth: 2,
                borderColor: themeStyle.COLOR_SILVER,
                backgroundColor: 'transparent',
              },
              props.inputContainerStyle,
            ]
          : props.message
          ? {
              ...inputStyles.inputContainerStyle,
              height: 100,
              borderWidth: 1,
              backgroundColor: themeStyle.COLOR_WHITE,
            }
          : props.customColor
          ? {
              ...inputStyles.inputContainerStyle,

              backgroundColor: props.customColor,
            }
          : props.center
          ? {
              ...inputStyles.inputContainerStyle,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }
          : props.blackborder
          ? {
              ...inputStyles.inputContainerStyle,
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.COLOR_BLACK,
              backgroundColor: 'transparent',
            }
          : props.wallet
          ? {
              ...inputStyles.inputContainerStyle,
              borderWidth: 2,
              borderBottomWidth: 2,
              borderColor: themeStyle.COLOR_BOOK_KEEPING,
              backgroundColor: 'transparent',
            }
          : inputStyles.inputContainerStyle
      }
      inputStyle={
        props.profile
          ? {
              ...inputStyles.inputStyle,
              height: 100,
              fontSize: 12,
              textAlignVertical: 'top',
              color: themeStyle.COLOR_BLACK,
            }
          : props.connect
          ? {
              ...inputStyles.inputStyle,
              height: 100,
              fontSize: 15,
              textAlignVertical: 'top',
              color: themeStyle.COLOR_BLACK,
            }
          : props.profile1
          ? {
              ...inputStyles.inputStyle,
              fontSize: 12,
              color: themeStyle.COLOR_BLACK,
            }
          : props.message
          ? {
              ...inputStyles.inputStyle,
              color: themeStyle.COLOR_BLACK,
              height: 100,
            }
          : props.selfHelpJournal
          ? {
              ...inputStyles.selfLogInputContainerStyle,
            }
          : props.education
          ? {
              ...inputStyles.inputStyle,
              fontSize: 16,
              color: themeStyle.COLOR_BLACK,
            }
          : props.blackborder
          ? {
              ...inputStyles.inputStyle,
              color: themeStyle.COLOR_BLACK,
              textAlignVertical: 'top',
              padding: 15,
            }
          : {
              ...inputStyles.inputStyle,
              color: themeStyle.COLOR_BLACK,
            }
      }
    />
  );
};
export default Input;
