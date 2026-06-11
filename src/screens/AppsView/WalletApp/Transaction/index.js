import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import style from './style';
import {
  Button_Group_Transaction,
  MultipleCard_Wallet_Trans,
} from './trans.component';

class Transaction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
                  {/* Date Buttons 

<ButtonGroupCustom_Trans/> */}
<Text style={{fontFamily:themeStyle.FONT_REGULAR,color:themeStyle.PRIMARY_TINT_COLOR}}>Coming soon...</Text>
        {/* <ScrollView contentContainerStyle={style.scrollContainer}>
          <Button_Group_Transaction />



          <MultipleCard_Wallet_Trans />
        </ScrollView> */}
      </View>
    );
  }
}

export default Transaction;
