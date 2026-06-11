import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';

const TabSwitch = ({tabSet}) => {
  const [tabsSelect, setTabSelect] = React.useState(true);

  return (
    <View style={styles.container}>
      {/* Button Container */}
      <View style={styles.tabContainer}>
        {/* Tab 1 */}
        <View style={styles.tabButton}>
          <TouchableOpacity
            onPress={() => {
              setTabSelect(true);
              tabSet(true);
            }}>
            <Text
              style={
                tabsSelect == true
                  ? styles.tabButtonTextSelect
                  : styles.tabButtonText
              }>
              Main
            </Text>
          </TouchableOpacity>
          {tabsSelect == true ? <View style={styles.tabBarBottom} /> : null}
        </View>

        {/* Tab 2 */}
        <View style={styles.tabButton}>
          <TouchableOpacity
            onPress={() => {
              setTabSelect(false);
              tabSet(false);
            }}>
            <Text
              style={
                tabsSelect == false
                  ? styles.tabButtonTextSelect
                  : styles.tabButtonText
              }>
              Bookkeeper
            </Text>
          </TouchableOpacity>
          {tabsSelect == false ? <View style={styles.tabBarBottom} /> : null}
        </View>
      </View>
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    padding: 2,
    // backgroundColor:"yellow",
  },
  tabContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '6%',
    flexDirection: 'row',
    // paddingTop:'2%'
  },
  tabButton: {
    width: '50%',
  },
  tabButtonSelect: {
    width: '50%',
  },
  tabButtonText: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM_2,
    fontFamily: themeStyle.FONT_REGULAR,
    textAlign: 'center',
  },
  tabButtonTextSelect: {
    color: themeStyle.COLOR_YELLOW,
    fontSize: themeStyle.FONT_SIZE_SMEDIUM_2,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_BOLD,
  },
  tabBarBottom: {
    backgroundColor: themeStyle.COLOR_BLACK,
    height: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: '100%',
  },
  bottomBar: {
    borderTopColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
    borderTopWidth: 1,
    width: '100%',
  },
});
export {TabSwitch};
