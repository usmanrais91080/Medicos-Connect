import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { HomeScreen, QrCode, ScanQrCode } from '../../screens';

import styles from '../MainNavigation/style';
import { route } from '../../lib/utils/constants';
import themeStyle from '../../assets/styles/theme.style';

const Stack = createStackNavigator();

function QrRoutes() {
    return (
        <Stack.Navigator initialRouteName={route.QRCODE} >
            <Stack.Screen name={route.QRCODE} component={QrCode} options={{
                headerTitle: 'QR Code',
                headerTitleAlign:"left",
                headerStyle: styles.headerStyle1,
                headerTintColor:themeStyle.PRIMARY_TINT_COLOR,
                headerTitleStyle: styles.headerTextStyle,
            }} />
          
            
        </Stack.Navigator>
    );
}



export default QrRoutes;


