import React from 'react';
import { Button as BT } from 'react-native-elements';
import styles from './style';
const ClearButton = (props) => {

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
    } = props;
    return (
        <BT
            buttonStyle={{ ...buttonStyle && styles.clearBtnPrimary }}
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
            titleStyle={{ ...titleStyle && styles.clearBtnPrimaryText }}
        />
    )
};
export default ClearButton;