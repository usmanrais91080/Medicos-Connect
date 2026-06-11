import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {route} from '../../lib/utils/constants';
import {
  ClassifiedWelcome,
  ClassifiedDisclaimer,
  SocialViewUrl,
  ClassifiedHome,
  ClassifiedMyAds,
  ClassifiedPostDetail,
  ClassifiedSettings,
  ClassifiedWishList,
  SelectLocation,
  ClassifiedSplash,
} from '../../screens';
import themeStyle from '../../assets/styles/theme.style';

import styles from '../MainNavigation/style';
import {HeaderLeft} from '../../components';
import ClassifiedGif from '../../screens/AppsView/Shopping&ClassifiedApp/ClassifiedGif';

const Stack = createStackNavigator();

function ClassifiedRoutes() {
  return (
    <Stack.Navigator initialRouteName={route.CLASSIFIEDHOME}>
      <Stack.Screen
        name={route.CLASSIFIEDHOME}
        component={ClassifiedHome}
        options={({navigation}) => ({
          headerTitle: 'Market',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.COLOR_WHITE,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDGIF}
        component={ClassifiedGif}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDSPLASH}
        component={ClassifiedSplash}
        options={{
          headerTitle: 'Market',
          headerStyle: styles.classifiedHeaderStyle,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
        }}
      />
      <Stack.Screen
        name={route.CLASSIFIEDWELCOME}
        component={ClassifiedWelcome}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Market',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDDISCLAIMER}
        component={ClassifiedDisclaimer}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTitle: 'Market',
          headerTitleAlign: 'left',
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDMYADS}
        component={ClassifiedMyAds}
        options={({navigation}) => ({
          headerTitle: 'My ads',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDPRODUCTDETAIL}
        component={ClassifiedPostDetail}
        options={({navigation}) => ({
          headerTitle: 'Market',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDWISHLIST}
        component={ClassifiedWishList}
        options={({navigation}) => ({
          headerTitle: 'Wish List',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} white />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.SELECTLOCATION}
        component={SelectLocation}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft navigation={navigation} color />,
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: styles.classifiedHeaderTextStyle,
          headerStyle: styles.classifiedHeaderStyle,
        })}
      />
      <Stack.Screen
        name={route.CLASSIFIEDSETTINGS}
        component={ClassifiedSettings}
        options={{
          headerTitle: 'Market ',
          headerTitleAlign: 'left',
          headerStyle: [
            styles.headerStyle,
            {
              borderBottomColor: themeStyle.COLOR_CLASSIFIED,
              borderBottomWidth: 1,
            },
          ],
          headerTintColor: themeStyle.PRIMARY_TINT_COLOR,
          headerTitleStyle: [
            styles.ProfileSettingHeaderTextStyle,
            {color: themeStyle.COLOR_CLASSIFIED},
          ],
        }}
      />

      <Stack.Screen
        name={route.VIEWURL}
        component={SocialViewUrl}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ClassifiedRoutes;
