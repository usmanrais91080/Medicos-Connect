import React from 'react';
import { SearchBar as ElementInput } from 'react-native-elements';
import inputStyles from './style';
import THEME from '../../assets/styles/theme.style';
import { Icon } from '..';

const SearchBar = (props) => {
    return (
        <ElementInput
            {...props}
            ref={props.inputRef}
            containerStyle={inputStyles.containerStyle}
            autoCorrect={false}
            searchIcon={<Icon.AntDesign name="search1" size={20} />}
            placeholderTextColor={THEME.PRIMARY_BACKGROUND_COLOR}
            inputContainerStyle={inputStyles.inputContainerStyle}
            inputStyle={inputStyles.inputStyle}
        />
    );
}
export default SearchBar;