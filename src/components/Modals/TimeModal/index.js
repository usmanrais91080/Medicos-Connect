import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'
import themeStyle from '../../../assets/styles/theme.style';
import moment from 'moment';


const TimeModal = (props) => {
    return (
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={200}
        >
            <View style={styles.modalContainer} >


                <View style={{ marginBottom: "10%" }}>
                <Text style={styles.headingText}>Starting Timedfdd</Text>
                </View>
                <View style={{ marginBottom: "10%" }}>
                    <DatePicker
                        date={props.date}
                        // maximumDate={new Date(moment().format("YYYY-MM-DD"))}
                        // minimumDate={new Date(moment().subtract(90, "years"))}
                        mode='time'
                        onDateChange={(date) => props.setDate(date)}
                        theme='light'
                    />
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={{ marginHorizontal: 30 }} onPress={() => props.onClose()}>
                        <Text style={styles.blackText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => props.onSave()}>
                        <Text style={styles.colorText}>Set</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        padding: '5%',
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 25
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    colorText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: themeStyle.BAR_COLOR
    },
    blackText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: '#B2B2B2'
    },
    headingText: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 21,
        color: '#1F2729',
        textAlign: "center"

    }

})

export default TimeModal;