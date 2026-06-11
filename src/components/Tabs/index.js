import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../lib/utils/constants';

const Tabs = ({tabs, active, onTabChange, profile}) => (
  <View
    style={{
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{flexDirection: 'row'}}>
      {tabs.map((tab, i) => (
        <React.Fragment key={i}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
            onPress={() => onTabChange(i)}>
            <Text
              style={{
                fontWeight: i === active ? 'bold' : 'normal',
                fontSize: profile ? 12 : 16,
                color: '#fff',
              }}>
              {tab}
            </Text>
          </TouchableOpacity>
          {i !== tabs.length - 1 ? (
            <View
              style={{
                borderRadius: 1,
                borderColor: '#fff',
                borderWidth: 0.5,
                marginVertical: 10,
              }}
            />
          ) : null}
        </React.Fragment>
      ))}
    </ScrollView>
  </View>
);

const ListTabs = ({tabs, active, onTabChange, orange, underLine}) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeStyle.CARRER_PRIMARY,
      width: SCREEN_WIDTH * 0.96,
      borderRadius: 10,
      alignSelf: 'center',
      paddingVertical: 5,
    }}>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}>
      {tabs.map((tab, i) => (
        <React.Fragment key={i}>
          <TouchableOpacity
            style={{
              height: 45,
              width: SCREEN_WIDTH * 0.31,
              backgroundColor:
                i === active
                  ? orange
                    ? themeStyle.CARRER_PRIMARY
                    : themeStyle.CARRER_SECONDARY
                  : themeStyle.CARRER_PRIMARY,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onTabChange(i)}>
            <Text
              style={{
                color:
                  i === active
                    ? orange
                      ? '#FF9966'
                      : themeStyle.COLOR_BLACK
                    : themeStyle.COLOR_WHITE,
                fontSize: 14,
                fontFamily: themeStyle.FONT_MEDIUM,
              }}>
              {tab}
            </Text>
          </TouchableOpacity>
          {i !== tabs.length - 1 ? (
            <View style={{marginVertical: 10, width: 0.5}} />
          ) : null}
        </React.Fragment>
      ))}
    </ScrollView>
  </View>
);

export default {
  Tabs,
  ListTabs,
};
