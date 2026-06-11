import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../../../../components";
import QR from '../../../../assets/svg/qr.svg'
import styles from './style'
export const HeaderRight = ({onPress}) => {
    return (
        <View style={styles.headerRightContainer}>
            {/* <TouchableOpacity onPress={() => { }} ><QR /></TouchableOpacity> */}
            <TouchableOpacity onPress={() => onPress()} style={{ marginLeft: 15 }}  ><Icon.Ionicons name="menu-sharp" size={30} color={'#959FAE'} /></TouchableOpacity>
        </View>
    )
}