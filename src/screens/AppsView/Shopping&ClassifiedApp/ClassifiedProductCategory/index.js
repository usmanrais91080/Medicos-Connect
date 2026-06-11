import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import {Container, Icon, Loader} from '../../../../components';
import {VerticalSpacer} from '../../../../lib/utils/global';

import styles from './style';
import themeStyle from '../../../../assets/styles/theme.style';
import {TouchableOpacity} from 'react-native';
import {route} from '../../../../lib/utils/constants';
import {ClassifiedServices} from '../../../../services';
import {connect} from 'react-redux';

class ClassifiedProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      laoding: true,
    };
  }

  componentDidMount = () => {
    ClassifiedServices.getClassifiedProductCategories(
      this.props.user.userData.token,
    )
      .then(res => {
        this.setState({data: res.data.data, loading: false});
      })
      .catch(err => null);
  };

  _renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(route.CLASSIFIEDPOSTAD, {
            categoryId: item._id,
          })
        }
        style={styles.itemContainer}>
        <Text style={styles.blackText}>{item.name}</Text>
        <Icon.FontAwesome
          name="angle-right"
          size={30}
          color={themeStyle.PRIMARY_TINT_COLOR}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          //     <ActivityIndicator color='#FF9966' size="small" />
          // </View>
          <Loader />
        ) : (
          <>
            <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
              <Text style={styles.orangeText}>What are you selling?</Text>
              <Text style={[styles.blackText, {marginTop: '5%'}]}>
                Select product category
              </Text>
            </View>
            <View>
              <FlatList
                data={this.state.data}
                renderItem={({item, index}) => this._renderItem(item, index)}
                ItemSeparatorComponent={VerticalSpacer}
              />
            </View>
          </>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer || {},
  };
};
export default connect(mapStateToProps)(ClassifiedProductCategory);
