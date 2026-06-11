import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

import { route, screen } from '../../../lib/utils/constants';

import THEME from '../../../assets/styles/theme.style'
import { ConsoleServer, CareerJobs, CareerLocums, EducationStudentClasses, EducationStudentMyClasses, EducationStudentMyRequests, EducationTeacherMyClasses, EducationTeacherMyRequests } from '../../../screens';
import { Container } from '../../../components';
const Tab = createMaterialTopTabNavigator();

function EducationTeacherTopMyClassNavigationRoutes() {
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
                if (route.name === 'EducationTeacherMyClasses') {
                    tabName = 'My Classes'
                } else if (route.name === 'EducationTeacherMYRequests') {
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
            <Tab.Screen name={route.EDUCATIONTEACHERMYCLASSES} component={EducationTeacherMyClasses} />
            <Tab.Screen name={route.EDUCATIONTEACHERMYRQUESTS} component={EducationTeacherMyRequests} />
        </Tab.Navigator>
    );
}
export default EducationTeacherTopMyClassNavigationRoutes;