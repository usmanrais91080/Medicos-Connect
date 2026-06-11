import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import themeStyle from '../../../../assets/styles/theme.style';
import { Icon, Input, Loader } from '../../../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';
import { VerticalSpacer } from '../../../../lib/utils/global';






export const ProfessionModal = (props) => {
    const renderItems = (item, index) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={() => props.onPress(item)}>
                <Text style={styles.textStyle}> {item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal isVisible={props.isVisible} animationOutTiming={100}>
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: "row", marginHorizontal: "2.5%", marginTop: "5%" }}>
                    <Input width={SCREEN_WIDTH * 0.75} colorProps value={props.value} placeholder="" onChangeText={(job) => props.onSearch(job)}
                    />
                    <View style={{ padding: "5%" }}>
                        <TouchableOpacity onPress={props.onClose}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                    </View>
                </View>
                <FlatList data={props.data}
                    contentContainerStyle={{ margin: "5%", }}
                    ItemSeparatorComponent={VerticalSpacer}
                    renderItem={({ item, index }) => renderItems(item, index)} />
            </View>
        </Modal>


    )
}

export const ProfessionMatchModal = (props) => {
    const renderItems = (item, index) => {
       
        return (
            // props?.profession?.name == item.name ?
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => props.onPress(item)}>
                <Text style={styles.textStyle}> {item.name}</Text>
                {
                    item.selected ?
                        <Icon.AntDesign name="check" color="black" size={20} />
                        :
                        null
                }
            </TouchableOpacity>
            // :
            // <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => props.onPressPayment(item)}>
            //     <Text style={styles.textStyle}> {item.name}</Text>
            //     <Icon.AntDesign name="lock" color="black" size={20} />
            // </TouchableOpacity>
        )
    }
    return (
        <Modal isVisible={props.isVisible} animationInTiming={100} animationOutTiming={100}>
            <View style={styles.modalContainer}>
                {
                    props.loading ?
                        // <View style={{ flex: 1, justifyContent: "center" }}>
                        //     <ActivityIndicator color="#FF6B6B" size="large" />
                        // </View>
                        <Loader />
                        :
                        <>
                            <View style={{ flexDirection: "row", marginHorizontal: "2.5%", marginTop: "5%" }}>
                                <Input width={SCREEN_WIDTH * 0.75} colorProps value={props.value} placeholder="" onChangeText={(job) => props.onSearch(job)}
                                />
                                <View style={{ padding: "5%" }}>
                                    <TouchableOpacity onPress={props.onClose}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                                </View>
                            </View>
                            <FlatList data={props.data}
                                contentContainerStyle={{ margin: "5%", }}
                                ItemSeparatorComponent={VerticalSpacer}
                                renderItem={({ item, index }) => renderItems(item, index)} />
                        </>}
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        height: SCREEN_HEIGHT * 0.6,
        borderRadius: 25

    },
    inputContainer: {
        margin: "2.5%"
    },
    textStyle: {
        fontFamily: themeStyle.FONT_MEDIUM
    }
})