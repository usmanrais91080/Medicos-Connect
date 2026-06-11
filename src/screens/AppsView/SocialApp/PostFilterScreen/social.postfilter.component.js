import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Avatar } from 'react-native-elements';
import { Icon } from "../../../../components";
import Search from '../../../../assets/svg/search-button.svg';
import Add from '../../../../assets/svg/add-button.svg';
import HomeBox from '../../../../assets/svg/home-button.svg';
import Following from '../../../../assets/svg/following-button.svg';
import User from '../../../../assets/svg/user-button.svg';
import styles from './style'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../lib/utils/constants";

export const HeaderRight = ({ showFilterText,onPressSticker,onPressText,onPressArrow,TextFoucs,OnPressAlignText,OnPressShowTextColors,OnPressShowTextBgColors,OnPressDone }) => {
    return (
             <View style={{marginRight:15}}>
                <TouchableOpacity onPress={() => onPressArrow()}>
                    <Icon.AntDesign name="arrowright" size={25} color={themeStyle.DASH_DARK} />
                </TouchableOpacity>

              </View>
    )
}

export const HomeButtons = ({ onPressSearch, onPressAddPost, onPressHomeBox, onPressAvatar, onPressCreateStory, onPressFollowing }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: "2.5%", marginBottom: "5%" }}>
            <TouchableOpacity onPress={() => onPressHomeBox()} style={{}}  ><HomeBox width={60} height={60} /></TouchableOpacity>
            <TouchableOpacity onPress={() => onPressAvatar()} style={{}}  ><User width={60} height={60} /></TouchableOpacity>
            <View style={{}}  >
                <Menu style={{}}>
                    <MenuTrigger>
                        <Add width={60} height={60} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ marginTop: 55, width: 150, marginVertical: 5, alignItems: "center", borderRadius: 10, marginBottom: 20 }}>
                        <MenuOption onSelect={() => onPressAddPost()}>
                            <View style={{ width: 150, alignItems: 'center', paddingTop: "5%" }}>
                                <Text style={styles.icon_text_style}>Create post</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={() => onPressCreateStory()}>
                            <View style={{ width: 150, alignItems: 'center', borderTopWidth: 0.5, borderColor: 'lightgray', paddingVertical: "5%" }}>
                                <Text style={styles.icon_text_style}>Create story</Text>
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            <TouchableOpacity onPress={() => onPressFollowing()} style={{}}  ><Following width={60} height={60} /></TouchableOpacity>
            <TouchableOpacity onPress={() => onPressSearch()} ><Search width={60} height={60} /></TouchableOpacity>
        </View>
    )
}

export const HeaderLeft = ({goBack}) => {
  return (
    <TouchableOpacity style={{marginLeft: 15}} onPress={() => goBack()}>
      <Icon.AntDesign
        name="arrowleft"
        size={25}
        color={themeStyle.PRIMARY_TINT_COLOR}
      />
    </TouchableOpacity>
  );
};

