import React from 'react';
import {Pressable, TextInput, View} from 'react-native';
import styles from './styles';
import {Icon} from '..';
import themeStyle from '../../assets/styles/theme.style';

const EducationSearchBar = ({
  onChangeText,
  onClear,
  searchText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Icon.Fontisto name={'search'} color={themeStyle.DARK_GRAY} size={20} />
      <TextInput
        style={styles.textinput}
        placeholderTextColor={themeStyle.DARK_GRAY}
        placeholder={placeholder || 'Search'}
        value={searchText}
        onChangeText={onChangeText}
      />
      {searchText ? (
        <Icon.Ionicons
          onPress={onClear}
          name={'close-circle-outline'}
          size={22}
          color={themeStyle.DARK_GRAY}
        />
      ) : null}
    </View>
  );
};

export default EducationSearchBar;
