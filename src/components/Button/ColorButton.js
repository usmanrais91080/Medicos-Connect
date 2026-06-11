import React from 'react';
import { Button as BT } from 'react-native-elements';
import styles from './style';
const ColorButton = (props) => {

    const {
        disabled = false,
        loading = false,
        disabledStyle = {},
        buttonStyle = {},
        disabledTitleStyle = {},
        titleStyle = {},
        loadingStyle = {},
        icon = {},
        iconRight = false,
        onPress = () => { },
        type = "solid",
        title = "",
        raised = false,
        containerStyle = {},
        iconContainerStyle={}
    } = props;
    return (
        <BT
            buttonStyle={{ ...buttonStyle && styles.colorBtnPrimary }}
            containerStyle={containerStyle}
            disabled={disabled}
            disabledStyle={disabledStyle}
            disabledTitleStyle={disabledTitleStyle}
            loading={loading}
            onPress={onPress}
            loadingStyle={loadingStyle}
            raised={raised}
            title={title}
            type={type}
            icon={icon}
            iconRight={iconRight}
            iconContainerStyle={{...iconContainerStyle&&styles.iconContainerStyle}}
            titleStyle={{ ...titleStyle && styles.btnPrimaryText }}
        />
    )
};
export default ColorButton;