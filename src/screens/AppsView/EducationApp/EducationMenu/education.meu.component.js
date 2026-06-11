import * as React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../../lib/utils/constants';

const Button_Group_Transaction = props => {
  // const [value, setValue] = React.useState(`${props.value}`);
  const [selection, setSelection] = React.useState(props.value);

  let array_to_map = ['Student', 'Teacher'];

  return (
    <View style={style.container_2}>
      <View style={style.container_1}>
        <View style={style.btnGroup_1}>
          {array_to_map.map((val, ind) => {
            return (
              <TouchableOpacity
                disabled={selection === val ? true : false}
                key={ind}
                style={[
                  style.btn_1,
                  selection === val
                    ? {
                        backgroundColor: themeStyle.EDUCATION_BROWN,
                        borderRadius: 6,
                        marginVertical:5 
                      }
                    : null,
                ]}
                onPress={() => {
                  setSelection(val);
                  props.switchFunc(val);
                }}>
                <Text style={style.btnText_1}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container_2: {
    flex: 1,
    width: SCREEN_WIDTH * 0.6,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: '#6B7280'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 25,
  },
  btnText: {
    textAlign: 'center',
    // paddingVertical: 16,
    // fontSize: 10,
    fontFamily: themeStyle.FONT_LIGHT,
    fontSize: themeStyle.FONT_SIZE_XSMALL,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  container_1: {
    width: SCREEN_WIDTH * 0.7,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  btnGroup_1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 5,

    // borderBottomWidth: 1,
    // borderBottomColor: '#6B7280'
  },
  btn_1: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 5,
    textAlign: 'center',
  },
  btnText_1: {
    textAlign: 'center',
    // paddingVertical: 16,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.COLOR_BLACK,
  },
  // Button Group Time Period
  container_time: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: 5,
  },
  btnGroup_time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.BUTTON_COLOR,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btn_time: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 22,
    marginVertical: 6,
  },
  btnText_time: {
    textAlign: 'center',
    // paddingVertical: 16,
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_XSMALL,
    fontFamily: themeStyle.FONT_LIGHT,
  },
  // Multiple Card Style
  cardSingle_multiple: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    alignSelf: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent_multiple: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.19,
    justifyContent: 'center',
  },
  imageIcon_multiple: {
    height: 23,
    width: 23,
    marginVertical: 10,
  },
  cardTextPrimary_multiple: {
    color: '#aeb6c1',
    fontSize: 12,
  },
  cardContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginVertical: 2,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: 5,
    marginTop: '5%',
  },
  cardSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainerLeft: {
    // marginHorizontal:10,
    alignItems: 'center',
  },
  cardTextContainerRight: {
    // marginHorizontal:10
    // alignItems:'center',
    // justifyContent:'center',
    // textAlign:'right'
  },
  imageIcon: {
    height: 30,
    width: 30,
    marginRight: SCREEN_WIDTH * 0.04,
  },
  cardTextPrimary_1: {
    color: themeStyle.PRIMARY_TINT_COLOR_INACTIVE,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    // fontWeight:'bold',
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
  },
  cardTextSecondaryLeft: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_LIGHT,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
    alignItems: 'center',
  },
  cardTextSecondaryRight: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_LIGHT,
    textAlign: 'right',
  },
  cardTextCardNumber: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
  },
  iconStyleCardLeft: {
    // paddingLeft:10
  },
});
export {Button_Group_Transaction};
