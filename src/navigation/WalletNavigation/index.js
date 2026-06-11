import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import styles from '../MainNavigation/style';
import themeStyle from '../../assets/styles/theme.style';
import {
  BookKeepingAddCurrentBalance,
  BookKeepingCheckExpense,
  BookKeepingCheckGoal,
  BookKeepingCreateExpense,
  BookKeepingCreateGoal,
  BookKeepingStats,
  SocialViewUrl,
  Wallet,
  WalletHome,
  WalletSetting,
  WalletSplash,
} from '../../screens';
import WalletGif from '../../screens/AppsView/WalletApp/WalletGif';

const Stack = createStackNavigator();

function WalletRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.WALLETGIF}>
      <Stack.Screen
        name={route.WALLETHOME}
        component={WalletHome}
        options={{
          headerTitle: 'Wallet',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.WALLETGIF}
        component={WalletGif}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={route.WALLET}
        component={Wallet}
        options={{
          headerTitle: 'Wallet',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />

      <Stack.Screen
        name={route.WALLETSETING}
        component={WalletSetting}
        options={{
          headerTitle: 'Wallet Settings',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.pagerHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={
          {headerShown: false}
          // headerTitle: 'Social',
          // headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          // headerTitleStyle: styles.headerTextStyle,
          // headerStyle: styles.headerStyle,
        }
      />
      <Stack.Screen
        name={route.BOOKKEEPINGCREATEEXPENSE}
        component={BookKeepingCreateExpense}
        options={{
          headerTitle: 'Create Expense',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGCREATEGOAL}
        component={BookKeepingCreateGoal}
        options={{
          headerTitle: 'Create Goal',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGSTATS}
        component={BookKeepingStats}
        options={{
          headerTitle: 'Stats',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGADDBALANCE}
        component={BookKeepingAddCurrentBalance}
        options={{
          headerTitle: 'Book Keeper',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGVIEWEXPENSE}
        component={BookKeepingCheckExpense}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGVIEWGOAL}
        component={BookKeepingCheckGoal}
        options={{
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGEDITEXPENSE}
        component={BookKeepingCreateExpense}
        options={{
          headerTitle: 'Edit Expense',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
      <Stack.Screen
        name={route.BOOKKEEPINGEDITGOAL}
        component={BookKeepingCreateGoal}
        options={{
          headerTitle: 'Edit Goal',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: themeStyle.COLOR_BOOK_KEEPING},
          ],
        }}
      />
    </Stack.Navigator>
  );
}

export default WalletRoutes;
