import React from 'react';
import {Button as BT} from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import styles from './style';
const Button = props => {
  const {
    disabled = false,
    loading = false,
    disabledStyle = {},
    buttonStyle = {},
    disabledTitleStyle = {},
    titleStyle = {},
    loadingStyle = {},
    icon = {},
    iconRight = false,
    onPress = () => {},
    type = 'solid',
    title = '',
    raised = false,
    containerStyle = {},
    iconContainerStyle = {},
  } = props;
  return (
    <BT
      buttonStyle={{
        ...(buttonStyle && props.parrot
          ? {
              ...styles.btnPrimary,
              backgroundColor: '#99CC66',
              width: props.width,
            }
          : // Yellow Color Addition
          props.yellow
          ? {
              ...styles.btnPrimary,
              backgroundColor: themeStyle.COLOR_YELLOW,
              width: props.width,
            }
          : props.connect
          ? {
              ...styles.btnPrimary,
              backgroundColor: themeStyle.SPANISH_PINK,
              width: props.width,
            }
          : props.mental
          ? {
              ...styles.btnPrimary,
              backgroundColor: themeStyle.MENTAL_SECONDARY,
              width: props.width,
            }
          : props.redd
          ? {...styles.btnPrimary, backgroundColor: '#D93231'}
          : props.green
          ? {...styles.btnPrimary, backgroundColor: '#EACA00', height: 60}
          : props.gray
          ? {
              ...styles.btnPrimary,
              backgroundColor: '#F2F2F2',
              width: props.width,
            }
          : props.orange
          ? {...styles.btnPrimary, backgroundColor: '#FF9966'}
          : props.blue
          ? {...styles.btnPrimary, backgroundColor: themeStyle.CYAN_BLUE}
          : props.sky
          ? {
              ...styles.btnPrimary,
              backgroundColor: '#0B90CF',
              width: props?.width,
            }
          : props.customColor
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              width: props.width,
              height: props.height,
              borderWidth: props.borderColor ? 2 : 0,
              borderColor: props.borderColor,
            }
          : props.pinkbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.PINK,
              borderWidth: 2,
            }
          : props.gamesbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.GAMES,
              borderWidth: 2,
            }
          : props.yellowbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.YELLOW,
              borderWidth: 2,
              height: 60,
            }
          : props.orangebg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.COLOR_CLASSIFIED,
              borderWidth: 2,
            }
          : props.mentalbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.PURPLE_COLOR,
              borderWidth: 2,
              height: 60,
            }
          : props.purplebg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.COLOR_EDUCATION,
              borderWidth: 2,
              height: 60,
            }
          : props.bluebg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.CARRER_PRIMARY,
              borderWidth: 2,
            }
          : props.pagerbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.SLATE_GRAY,
              borderWidth: 2,
            }
          : props.walletbg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: themeStyle.COLOR_BOOK_KEEPING,
              borderWidth: 2,
            }
          : props.custombg
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: props.titleColor,
              borderWidth: 2,
            }
          : props.outline
          ? {
              ...styles.btnPrimary,
              backgroundColor: props.customColor,
              borderColor: props.borderColor,
              borderWidth: 2,
              width: props?.width,
            }
          : {
              ...styles.btnPrimary,

              width: props?.width,
            }),
      }}
      containerStyle={containerStyle}
      disabled={disabled}
      disabledStyle={disabledStyle}
      disabledTitleStyle={{
        ...(disabledTitleStyle && props.disabledTitleStyle
          ? {color: 'black'}
          : {...disabledTitleStyle}),
      }}
      loading={loading}
      onPress={onPress}
      loadingStyle={loadingStyle}
      raised={raised}
      title={title}
      type={type}
      icon={icon}
      iconRight={iconRight}
      iconContainerStyle={{
        ...(iconContainerStyle && styles.iconContainerStyle),
      }}
      titleStyle={{
        ...(titleStyle && styles.btnPrimaryText),
        color: props?.titleColor
          ? props.titleColor
          : props.gray
          ? themeStyle.PRIMARY_TINT_COLOR
          : props?.green
          ? 'black'
          : themeStyle.COLOR_WHITE,
        fontSize: props.career ? 16 : props.bottomMenu ? 14 : 18,
      }}
    />
  );
};
export default Button;
