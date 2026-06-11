import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    containerStyle: {
        height: 40,
        paddingHorizontal: 0,
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginBottom: 10
    },
    inputContainerStyle: {
        height: 35,
        borderBottomWidth: 0,
        marginBottom: 0,
        backgroundColor: '#c0c0c0',
        borderRadius: 5,
    },
    inputStyle: {
        flex: 1,
        color: THEME.PRIMARY_BACKGROUND_COLOR,
        fontSize: 12,
    },

});
