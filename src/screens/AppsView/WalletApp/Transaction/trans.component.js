import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import {Card} from 'react-native-paper';
import {Icon} from '../../../../components';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../../lib/utils/constants';

const Button_Group_Transaction = () => {
  const [value, setValue] = React.useState('All');
  const [selection, setSelection] = React.useState('All');

  let array_to_map = ['All', 'My Coins', 'My Cards'];

  return (
    <View style={styles.container_1}>
      {/* Header */}
      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.cardTextPrimary}>Date Range</Text>
        </View>

        <View>
          <Text style={styles.cardTextSecondary}>
            5 January 2021 - 5 March 2021
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.btnGroup}>
          {array_to_map.map((val, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                style={[
                  styles.btn,
                  selection === val
                    ? {
                        backgroundColor: themeStyle.COLOR_YELLOW,
                        borderRadius: 6,
                      }
                    : null,
                ]}
                onPress={() => setSelection(val)}>
                <Text
                  style={[
                    styles.btnText,
                    selection === val ? {color: themeStyle.COLOR_BLACK} : null,
                  ]}>
                  {val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Grey Line */}
      <View style={styles.bottomBar} />
    </View>
  );
};


const MultipleCard_Wallet_Trans = () => {
  let walletArray = [
    {
      card_title: 'Card',
      card_pic: require('../../../../assets/card_images/card_send.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
    {
      card_title: 'MC Wallet',
      card_pic: require('../../../../assets/card_images/wallet_recieve.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
    {
      card_title: 'Card',
      card_pic: require('../../../../assets/card_images/card_send.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
    {
      card_title: 'MC Wallet',
      card_pic: require('../../../../assets/card_images/wallet_recieve.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
    {
      card_title: 'MC Wallet',
      card_pic: require('../../../../assets/card_images/wallet_recieve.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
    {
      card_title: 'MC Wallet',
      card_pic: require('../../../../assets/card_images/wallet_recieve.png'),
      product_text: 'Esajees',
      product_name: 'Product Name',
      card_number: '*** *** *** 4469',
      transaction_amount: 'Rs. 16,000',
      transaction_date: '5 , January',
    },
  ];

  return (
    <View>
      {walletArray.map((val, ind) => {
        return (
          <View key={ind} style={styles.cardContainer}>
            <Card>
              <Card.Content>
                <View style={styles.cardSingle}>
                  {/* Card Left Side */}
                  <View style={styles.cardSingle}>
                    {/* Card Logo */}
                    <View>
                      <Image style={styles.imageIcon} source={val.card_pic} />
                    </View>

                    {/* Card Detail 1*/}
                    <View style={styles.cardTextContainerLeft}>
                      <Text style={styles.cardTextPrimary_1}>
                        {val.card_title}
                      </Text>
                      <Text style={styles.cardTextSecondaryLeft}>
                        {val.product_text}
                      </Text>
                      <Text style={styles.cardTextSecondaryLeft}>
                        {val.product_text}
                      </Text>
                    </View>
                  </View>

                  {/* Card Right Side */}
                  <View style={styles.cardSingle}>
                    {/* Card Detail 2*/}
                    <View style={styles.cardTextContainerRight}>
                      <Text style={styles.cardTextCardNumber}>
                        {val.card_number}
                      </Text>
                      <Text style={styles.cardTextSecondaryRight}>
                        {val.transaction_amount}
                      </Text>
                      <Text style={styles.cardTextSecondaryRight}>
                        {val.transaction_date}
                      </Text>
                    </View>

                    {/* Forward Logo */}
                    <View>
                      <Icon.Ionicons
                        style={styles.iconStyleCardLeft}
                        name="chevron-forward"
                        size={30}
                        color={themeStyle.PRIMARY_TINT_COLOR}
                      />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  container_1: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginTop: 12,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeStyle.COLOR_LIGHT_GREY,
    borderRadius: 8,
    paddingHorizontal: 5,

    // borderBottomWidth: 1,
    // borderBottomColor: '#6B7280'
  },
  btn: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'center',
    // paddingVertical: 16,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    flexDirection: 'row',
  },
  cardTextPrimary: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  cardTextSecondary: {
    color: themeStyle.COLOR_YELLOW,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  bottomBar: {
    borderTopColor: '#dddbdb',
    borderTopWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginVertical: 2,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: 5,
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
export {
  MultipleCard_Wallet_Trans,
  Button_Group_Transaction,
};
