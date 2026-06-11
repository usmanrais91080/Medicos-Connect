import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';

import { route, screen } from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style'
import { ConsoleServer, SocialExplore, SocialFilter } from '../../../screens';
const Tab = createMaterialTopTabNavigator();

function SocialTopNavigationRoutes() {
    return (
        <SocialExplore/>
        // <Tab.Navigator screenOptions={({ route }) => ({
        //     tabBarLabel: ({ focused, color }) => {
        //         let tabName;
        //         if (route.name === 'SocialExplore') {
        //             tabName = screen.SOCIALEXPLORE
        //         } else if (route.name === 'SocialFilter') {
        //             tabName = screen.SOCIALFILTER;
        //         }
        //         return <Text style={{ fontSize: focused ? 13 : 14, color: color, fontFamily: focused ? THEME.FONT_MEDIUM : THEME.FONT_REGULAR }} >{tabName}</Text>;
        //     },
        // })}
        //     tabBarOptions={{
        //         swipeEnabled: false,
        //         activeTintColor: '#38474F',
        //         inactiveTintColor: THEME.PRIMARY_TINT_COLOR,
        //         indicatorContainerStyle: {
        //             backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
        //         },
        //         indicatorStyle: {
        //             backgroundColor: '#38474F',
        //             borderTopLeftRadius: 4,
        //             borderTopRightRadius: 4
        //         }
        //     }}>
        //     <Tab.Screen name={route.SOCIALEXPLORE} component={SocialExplore} />
        //     <Tab.Screen name={route.SOCIALFILTER} component={SocialFilter} />
        // </Tab.Navigator>
    );
}
export default SocialTopNavigationRoutes;