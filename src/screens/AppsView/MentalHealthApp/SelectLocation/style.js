import { StyleSheet, Dimensions } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
    },

})