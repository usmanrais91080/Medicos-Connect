import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';

import {route, screen} from '../../lib/utils/constants';
import {
  BookKeepingAddCurrentBalance,
  BookKeepingCheckExpense,
  BookKeepingCheckGoal,
  BookKeepingCreateExpense,
  BookKeepingCreateGoal,
  BookKeepingHome,
  BookKeepingStats,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';
import styles from '../MainNavigation/style';
import {FilterImage} from '../../components';

const Stack = createStackNavigator();

function BookkeepingRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.BOOKKEEPINGHOME}>
      <Stack.Screen
        name={route.BOOKKEEPINGHOME}
        component={BookKeepingHome}
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

export default BookkeepingRoutes;
