import * as React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../lib/utils/constants';
import {Icon} from '../../index';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import themeStyle from '../../../assets/styles/theme.style';

const MultipleFilter = ({
  image_path,
  selectedPicIndex,
  filters,
  onSelectCarouselPic,
  closeModal,
  picUpdated,
  singlePicIndex,
  picSave,
  showModal,
  SelectedFilterComponent,
  onSelectFilterModal,
  onSelectFilterCarousel,
  selectedFilterIndex,
  onExtractImageCarousel,
  SelectedFilterComponentCarousel,
}) => {
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => onSelectCarouselPic(index)}>
          {selectedFilterIndex === 0 && singlePicIndex == 0 ? (
            <Image
              style={[
                styles.imageCarousel,
                {width: picSave ? SCREEN_WIDTH * 0.1 : SCREEN_WIDTH * 0.7},
              ]}
              source={{uri: item.uri}}
              resizeMode={'cover'}
            />
          ) : picUpdated && selectedPicIndex == index ? (
            <SelectedFilterComponentCarousel
              onExtractImage={onExtractImageCarousel}
              extractImageEnabled={true}
              image={
                <Image
                  style={styles.imageCarousel}
                  source={{uri: item.uri}}
                  resizeMode={'cover'}
                />
              }
            />
          ) : (
            <SelectedFilterComponent
              onExtractImage={onExtractImageCarousel}
              extractImageEnabled={true}
              image={
                <Image
                  style={styles.imageCarousel}
                  source={{uri: item.uri}}
                  resizeMode={'cover'}
                />
              }
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderFilters = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri: image_path[selectedPicIndex].uri}}
        resizeMode={'contain'}
      />
    );
    return (
      <TouchableOpacity onPress={() => onSelectFilterModal(index)}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };

  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri: image_path[selectedPicIndex].uri}}
        resizeMode={'contain'}
      />
    );
    return (
      <TouchableOpacity onPress={() => onSelectFilterCarousel(index)}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <View style={styles.iconStyleClose}>
            <View>
              <TouchableOpacity onPress={() => closeModal(1)}>
                <Icon.AntDesign
                  name="arrowleft"
                  size={30}
                  color={themeStyle.COLOR_GREY}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => closeModal(2)}>
                <Icon.AntDesign
                  name="arrowright"
                  size={30}
                  color={themeStyle.DASH_DARK}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pinContainer}>
            {singlePicIndex === 0 ? (
              <Image
                style={styles.imageModal}
                source={{uri: image_path[selectedPicIndex].uri}}
                resizeMode={'cover'}
              />
            ) : (
              <SelectedFilterComponentCarousel
                // onExtractImage={onExtractImage}
                // extractImageEnabled={true}
                image={
                  <Image
                    style={styles.imageModal}
                    source={{uri: image_path[selectedPicIndex].uri}}
                    resizeMode={'cover'}
                  />
                }
              />
            )}
          </View>

          <View style={styles.pinBtnContainer}>
            <FlatList
              data={filters}
              keyExtractor={item => item.title}
              horizontal={true}
              renderItem={renderFilters}
            />
          </View>
        </View>
      </Modal>
      <Carousel
        data={image_path}
        layout="default"
        renderItem={_renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={picSave ? SCREEN_WIDTH * 0.1 : SCREEN_WIDTH * 0.7}
        itemHeight={SCREEN_HEIGHT * 0.4}
      />

      <FlatList
        data={filters}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
      />
    </View>
  );
};

const SingleFilter = ({
  onSelectFilter,
  image_path,
  filters,
  selectedFilterIndex,
  SelectedFilterComponent,
  onExtractImage,
  picSave,
}) => {
  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri: image_path}}
        resizeMode={'contain'}
      />
    );
    return (
      <TouchableOpacity onPress={() => onSelectFilter(index)}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{marginBottom: '10%'}}>
        {selectedFilterIndex === 0 ? (
          <Image
            style={styles.image}
            source={{uri: image_path}}
            resizeMode={'cover'}
          />
        ) : (
          <SelectedFilterComponent
            onExtractImage={onExtractImage}
            extractImageEnabled={picSave}
            image={
              <Image
                style={styles.image}
                source={{uri: image_path}}
                resizeMode={'cover'}
              />
            }
          />
        )}
      </View>
      <FlatList
        data={filters}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: 500,
    marginVertical: 10,
    alignSelf: 'center',
    // aspectRatio: 1 / 1,
  },
  imageCarousel: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.4,
    marginTop: 5,
    alignSelf: 'center',
    marginBottom: SCREEN_HEIGHT * 0.14,
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5,
  },
  filterTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalView: {
    marginTop: SCREEN_HEIGHT * 0.05,
    alignSelf: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
  },
  iconStyleClose: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  pinTitle: {
    color: themeStyle.PRIMARY_TINT_COLOR,
    marginVertical: SCREEN_HEIGHT * 0.02,
    fontFamily: themeStyle.FONT_BOLD,
    fontSize: themeStyle.FONT_SIZE_XLARGE,
  },
  pinBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinBtnText: {
    color: themeStyle.COLOR_YELLOW,
    fontFamily: themeStyle.FONT_REGULAR,
  },
  imageModal: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
export {SingleFilter, MultipleFilter};
