import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

import { route, screen } from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style'
import { ConsoleServer, CareerJobs, CareerLocums, EducationStudentClasses, EducationStudentMyClasses, EducationStudentMyRequests } from '../../../screens';
import { Container } from '../../../components';
const Tab = createMaterialTopTabNavigator();

function EducationStudentTopMyClassNavigationRoutes() {
    const CreatePlaceholder = () => {
        return (
            <Container>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[{ marginTop: '10%', textAlign: 'center' },]}>
                        Screen is Underdevelopment
                    </Text>
                </View>
            </Container>
        )
    };
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabel: ({ focused, color }) => {
                let tabName;
                if (route.name === 'EducationStudentMyClasses') {
                    tabName = 'My Classes'
                } else if (route.name === 'EducationStudentMYRequests') {
                    tabName = focused ? 'Requests' : 'Request Received';
                }
                return <Text style={{ fontSize: focused ? 13 : 14, color: color, fontFamily: focused ? THEME.FONT_MEDIUM : THEME.FONT_REGULAR, textAlign: "center" }} >{tabName}</Text>;
            },
        })}
            tabBarOptions={{
                swipeEnabled: false,
                activeTintColor: '#99CC66',
                inactiveTintColor: THEME.PRIMARY_TINT_COLOR,
                indicatorContainerStyle: {
                    backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
                },
                indicatorStyle: {
                    backgroundColor: '#38474F',
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }
            }}>
            <Tab.Screen name={route.EDUCATIONSTUDENTMYCLASSES} component={EducationStudentMyClasses} />
            <Tab.Screen name={route.EDUCATIONSTUDENTMYRQUESTS} component={EducationStudentMyRequests} />
        </Tab.Navigator>
    );
}
export default EducationStudentTopMyClassNavigationRoutes;