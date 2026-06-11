import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import themeStyle from '../../../../assets/styles/theme.style';
import { Icon } from '../../../../components';
import { VictoryCandlestick } from 'victory-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../lib/utils/constants';
import Amplues from '../../../../assets/svg/ampules-01.svg';
import { BottomMenuWallet } from '../BottomMenuWallet';

const SingleCard_Wallet = () => {
  return (
    <View>
      <View style={style.cardSingle}>
        <Card>
          <Card.Content>
            <View style={style.cardContent}>
              <Icon.Fontisto name="locked" size={60} color={'#959fae'} />
              {/* Text Container */}
              {/* <View>
                        <Text style={style.mainText}>Balance</Text>

                        <View style={style.secondaryTextContainer}>
                        <Text style={style.cardTextPrimary}>MC 1,500</Text>
                        <Text style={style.cardTextSecondary}>PKR 15,000</Text>
                        </View>
                        </View> */}

              {/* Logo Container */}
              {/* <View>
                        <Image
                        style={style.bitcoinImage}
                        source={require('../../../../assets/images/bitcoin.png')}/>
                        </View> */}
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const Button_Group_Transaction = ({ send, recieve }) => {
  const [value, setValue] = React.useState('Send');
  const [selection, setSelection] = React.useState('Send');

  let array_to_map = ['Send', 'Receive'];

  return (
    <View style={style.container_2}>
      {/* Header */}
      {/* <View style={style.dateContainer}>
        <View>
          <Text style={style.cardTextPrimary}>Date Range</Text>
        </View>

        <View>
          <Text style={style.cardTextSecondary}>
            5 January 2021 - 5 March 2021
          </Text>
        </View>
      </View> */}

      <View style={style.container_1}>
        <View style={style.btnGroup_1}>
          {array_to_map.map((val, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                style={[
                  style.btn_1,
                  selection === val
                    ? {
                      backgroundColor: '#FF9D9D',
                      borderRadius: 6,
                    }
                    : null,
                ]}
                onPress={() => {
                  setSelection(val);
                  val == 'Send' ? send() : recieve();
                }}>
                <Text
                  style={[
                    style.btnText_1,
                    selection === val ? { color: themeStyle.COLOR_BLACK } : null,
                  ]}>
                  {val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Grey Line */}
      <View style={style.bottomBar} />
    </View>
  );
};

const Wallet_Graph = () => {
  const data_candle = [
    {
      timestamp: 1625947200000,
      open: 33600.25,
      high: 33515.52,
      low: 33250.12,
      close: 33380.11,
    },
    {
      timestamp: 1625948100000,
      open: 33250.25,
      high: 33430.52,
      low: 33215.12,
      close: 33480.11,
    },
    {
      timestamp: 1625948100000,
      open: 33150.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
    {
      timestamp: 1625947200000,
      open: 33450.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33205.25,
      high: 33430.52,
      low: 33215.12,
      close: 33340.11,
    },
    {
      timestamp: 1625947200000,
      open: 33480.25,
      high: 33515.52,
      low: 33250.12,
      close: 33320.11,
    },
    {
      timestamp: 1625947200000,
      open: 33420.25,
      high: 33515.52,
      low: 33250.12,
      close: 33190.11,
    },
    {
      timestamp: 1625948100000,
      open: 33115.25,
      high: 33430.52,
      low: 33215.12,
      close: 33250.11,
    },
    {
      timestamp: 1625947200000,
      open: 33460.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625947200000,
      open: 33530.25,
      high: 33515.52,
      low: 33250.12,
      close: 33380.11,
    },
    {
      timestamp: 1625948100000,
      open: 33350.25,
      high: 33430.52,
      low: 33215.12,
      close: 33480.11,
    },
    {
      timestamp: 1625947200000,
      open: 33600.25,
      high: 33515.52,
      low: 33250.12,
      close: 33480.11,
    },
    {
      timestamp: 1625947200000,
      open: 33600.25,
      high: 33515.52,
      low: 33250.12,
      close: 33420.11,
    },
  ];
  return (
    <View style={style.cardSingle_graph}>
      <View>
        <Text style={style.headingText}>MC Coin Statistics</Text>
      </View>
      <Card style={style.cardContent_graph}>
        <Card.Content>
          <View>
            {/* Heading 1 */}
            <View style={style.textContainer}>
              <Text style={style.headingCard}>MC Ampules</Text>
              <Text style={style.headingPercent}> +2.4%</Text>
            </View>
            {/* Amount in Pkr */}
            <View style={style.textContainer}>
              <Text style={style.headingAmount}>15,000</Text>
              <Text style={style.headingCurrency}> USD</Text>
            </View>
            <View>
              <VictoryCandlestick
                height={180}
                candleWidth={11}
                // padding={{ top: 5, bottom: 5 }}
                // candleRatio={0.8}
                candleColors={{
                  positive: '#e96969',
                  negative: '#5fbee4',
                }}
                data={data_candle}
                style={{
                  data: {
                    strokeWidth: 0,
                  },
                }}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const ButtonGroupCustom_Wallet = () => {
  const [selection, setSelection] = React.useState('Thu');

  let array_to_map = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <View style={style.container}>
      <View style={style.btnGroup}>
        {array_to_map.map((val, ind) => {
          return (
            <TouchableOpacity
              key={ind}
              style={[
                style.btn,
                selection === val
                  ? { backgroundColor: themeStyle.BUTTON_COLOR, borderRadius: 6 }
                  : null,
              ]}
              onPress={() => setSelection(val)}>
              <Text
                style={[
                  style.btnText,
                  selection === val ? { color: themeStyle.COLOR_YELLOW } : null,
                ]}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const ButtonGroupCustom_Wallet_BgColor = () => {
  const [selection, setSelection] = React.useState('1 w');

  let array_to_map = ['24 h', '1 w', '1 m', '6 m', '1 y', 'All'];
  return (
    <View style={style.container_time}>
      <View style={style.btnGroup_time}>
        {array_to_map.map((val, ind) => {
          return (
            <TouchableOpacity
              key={ind}
              style={[
                style.btn_time,
                selection === val
                  ? { backgroundColor: themeStyle.COLOR_YELLOW, borderRadius: 6 }
                  : null,
              ]}
              onPress={() => setSelection(val)}>
              <Text
                style={[
                  style.btnText,
                  selection === val ? { color: themeStyle.BUTTON_COLOR } : null,
                ]}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MultipleCard_Wallet_Trans = (props) => {
  const [walletModal, setWalletModal] = useState(false);
  const { listData, transac, showAlert, showAlertFunc } = props;
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
  ];

  return (
    <>
      <View>
        {listData.map((val, ind) => {
          return (
            <View key={ind} style={style.cardContainer}>
              <TouchableOpacity
                onPress={() => props?.transac(val._id,val?.price)}>
                {/* //( showAlert ? showAlertFunc() : }> */}
                {/* // onPress={() => setWalletModal(true)}> */}
                <Card>
                  <Card.Content>
                    <View style={style.cardSingle}>
                      {/* Card Left Side */}
                      <View style={style.cardSingle}>
                        {/* Card Logo */}
                        <View>
                          <Amplues fill={'#FF9D9D'} style={style.imageIcon} />
                        </View>

                        {/* Card Detail 1*/}
                        <View style={style.cardTextContainerLeft}>
                          {/* <Text style={style.cardTextPrimary_1}>
                        {val.card_title}
                      </Text> */}
                          <Text style={style.cardTextSecondaryLeft}>
                            {val?.ampules}
                            <Text style={style.cardTextSecondaryLeft1}>
                              {' '}
                            </Text>
                          </Text>

                        </View>
                        <Text style={style.cardTextSecondaryLeft}>
                          {val?.price} USD
                        </Text>
                      </View>

                      {/* Card Right Side */}
                      <View style={style.cardSingle}>
                        {/* Card Detail 2*/}
                        <View style={style.cardTextContainerRight}>
                          {/* <Text style={style.cardTextCardNumber}>
                        {val.card_number}
                      </Text> */}
                          <Text style={{ fontFamily: themeStyle.FONT_REGULAR, }}>
                            Buy
                          </Text>
                          {/* <Text style={style.cardTextSecondaryRight}>
                        {val.transaction_date}
                      </Text> */}
                        </View>

                        {/* Forward Logo */}
                        {/* <View>
                          <Icon.Ionicons
                            style={style.iconStyleCardLeft}
                            name="chevron-forward"
                            size={30}
                            color={themeStyle.PRIMARY_TINT_COLOR}
                          />
                        </View> */}
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};

const MultipleCard_Wallet_Trans_1 = () => {
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
          <View key={ind} style={style.cardContainer}>
            <Card>
              <Card.Content>
                <View style={style.cardSingle}>
                  {/* Card Left Side */}
                  <View style={style.cardSingle}>
                    {/* Card Logo */}
                    <View>
                      <Image style={style.imageIcon} source={val.card_pic} />
                    </View>

                    {/* Card Detail 1*/}
                    <View style={style.cardTextContainerLeft}>
                      <Text style={style.cardTextPrimary_1}>
                        {val.card_title}
                      </Text>
                      <Text style={style.cardTextSecondaryLeft}>
                        {val.product_text}
                      </Text>
                      <Text style={style.cardTextSecondaryLeft}>
                        {val.product_text}
                      </Text>
                    </View>
                  </View>

                  {/* Card Right Side */}
                  <View style={style.cardSingle}>
                    {/* Card Detail 2*/}
                    <View style={style.cardTextContainerRight}>
                      <Text style={style.cardTextCardNumber}>
                        {val.card_number}
                      </Text>
                      <Text style={style.cardTextSecondaryRight}>
                        {val.transaction_amount}
                      </Text>
                      <Text style={style.cardTextSecondaryRight}>
                        {val.transaction_date}
                      </Text>
                    </View>

                    {/* Forward Logo */}
                    <View>
                      <Icon.Ionicons
                        style={style.iconStyleCardLeft}
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

const MultipleCard_Wallet_Info = () => {
  let imagesArray = [
    {
      title: 'Send',
      image: require('../../../../assets/icons/send.png'),
    },
    {
      title: 'Deposit',
      image: require('../../../../assets/icons/deposit.png'),
    },
    {
      title: 'Exchange',
      image: require('../../../../assets/icons/exchnage.png'),
    },
  ];

  return (
    <View style={style.cardSingle_multiple}>
      {imagesArray.map((val, ind) => {
        return (
          <View key={ind}>
            <Card>
              <Card.Content>
                <View style={style.cardContent_multiple}>
                  <Image style={style.imageIcon_multiple} source={val.image} />
                  <Text style={style.cardTextPrimary_multiple}>
                    {val.title}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  // Heading Card Styles
  cardSingle: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    //    flexDirection:'row',
    height: SCREEN_HEIGHT * 0.4,
  },
  mainText: {
    color: '#aeb6c1',
    fontSize: 18,
    marginBottom: 5,
  },
  cardTextPrimary: {
    color: '#e9cc78',
    fontSize: 20,
  },
  cardTextSecondary: {
    color: '#aeb6c1',
    fontSize: 12,
  },
  bitcoinImage: {
    height: 100,
    width: 100,
  },
  secondaryTextContainer: {
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  // Graph Styles
  cardSingle_graph: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginBottom: 12,
  },
  cardContent_graph: {
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: SCREEN_WIDTH * 0.08,
    alignItems: 'center',
    textAlign: 'center',
  },
  headingText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
    marginVertical: 10,
  },
  headingCard: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
  },
  headingPercent: {
    color: themeStyle.DASH_DARK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM,
  },
  headingAmount: {
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_LARGE,
  },
  headingCurrency: {
    color: themeStyle.COLOR_BLACK_LIGHT,
    fontFamily: themeStyle.FONT_LIGHT,
    fontSize: themeStyle.FONT_SIZE_LARGE,
  },
  // Button Group Days Style
  container: {
    width: SCREEN_WIDTH,
    padding: 2,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    // backgroundColor:"yellow",
    marginVertical: 10,
  },
  container_2: {
    flex: 1,
    width: SCREEN_WIDTH,
    marginTop: 12,
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
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  btnGroup_1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#D8EEEC",
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
    marginVertical: 5,
    textAlign: 'center',
  },
  btnText_1: {
    textAlign: 'center',
    // paddingVertical: 16,
    fontSize: 14,
    fontFamily: themeStyle.FONT_REGULAR,
    color: themeStyle.PRIMARY_TINT_COLOR,
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
    backgroundColor: "#D8EEEC",
    padding: "5%",
    height: 30,
    width: 50,
    borderRadius: 10,
    // marginHorizontal:10
    alignItems:'center',
    justifyContent:'center',
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
    color: themeStyle.COLOR_BLACK,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
    alignItems: 'center',
  },
  cardTextSecondaryLeft1: {
    color: themeStyle.COLOR_BLACK,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_LIGHT,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.24,
    alignItems: 'center',
  },
  cardTextSecondaryRight: {
    color: themeStyle.BOOK_KEEPING_PINK,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontFamily: themeStyle.FONT_MEDIUM,
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
  SingleCard_Wallet,
  Button_Group_Transaction,
  Wallet_Graph,
  ButtonGroupCustom_Wallet,
  ButtonGroupCustom_Wallet_BgColor,
  MultipleCard_Wallet_Info,
  MultipleCard_Wallet_Trans,
  MultipleCard_Wallet_Trans_1,
};
