import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH, route} from '../../../lib/utils/constants';
import {Container, UploadingModal, Icon, DeleteModal} from '../../index';
import {SingleFilter, MultipleFilter} from './filter.component';

let multipleFilterArray = [];

const FILTERS = [];
const FilterImage = props => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => headerRight(),
      headerLeft: () => headerLeft(),
    });
    if (props.route.params.prev_screen == route.SOCIALPOST) {
      setNavFromSocial(true);
      if (props.route?.params?.image_uri?.length > 1) {
        setPicCount(1);
        setUnfilterImage(props.route?.params?.image_uri);
      } else {
        setUnfilterImage(props.route?.params?.image_uri);
        setPicCount(0);
      }
    } else {
      setNavFromSocial(false);
    }
  });

  const navToSocial = () => {
    if (picCount == 0) {
      if (selectedFilterIndex == 0) {
        let filterImage = unfilterImage;
        return props.navigation.navigate(route.SOCIALPOST1, {
          createStory: props.route.params.createStory,
          postImage: filterImage,
        });
      } else {
        setPicSave(true);
      }
    }

    if (picCount == 1) {
      if (selectedFilterIndex == 0) {
        if (picUpdated) {
          setPicSave(true);
        } else {
          let filterImage = unfilterImage;
          return props.navigation.navigate(route.SOCIALPOST1, {
            createStory: props.route.params.createStory,
            postImage: filterImage,
          });
        }
      }

      if (selectedFilterIndex != 0) {
        setPicSave(true);
      }
    }
  };

  const updateFilters = filter => {
    setPicSave(false);
    if (selectedFilterIndex == 0) {
      if (picUpdated) {
        let tempArray = unfilterImage;
        for (let i = 0; i < unfilterImage?.length; i++) {
          tempArray[i].uri = filter[i].uri;
        }
        let filterImage = tempArray;
        return props.navigation.navigate(route.SOCIALPOST1, {
          createStory: props.route.params.createStory,
          postImage: filterImage,
        });
      }
    }
    if (selectedFilterIndex != 0) {
      let tempArray = unfilterImage;
      for (let i = 0; i < unfilterImage?.length; i++) {
        tempArray[i].uri = filter[i].uri;
      }
      let filterImage = tempArray;
      return props.navigation.navigate(route.SOCIALPOST1, {
        createStory: props.route.params.createStory,
        postImage: filterImage,
      });
    }
    multipleFilterArray = [];
  };

  const navToAnyScreen = () => {
    if (filterImage == '') {
      setFilterImage(unfilterImage);
    }
    return props.navigation.navigate(route.SOCIALPOST1, {
      filterImage,
    });
  };

  const navBack = () => {
    setConfirmBack(false);
    return props.navigation.navigate(route.SOCIALPOSTPICKER);
  };

  const headerLeft = () => {
    return (
      <TouchableOpacity
        style={styles.headerLeftContainer}
        onPress={() => setConfirmBack(true)}>
        <Icon.AntDesign
          name="arrowleft"
          size={30}
          color={themeStyle.COLOR_GREY}
        />
      </TouchableOpacity>
    );
  };

  const headerRight = () => {
    return (
      <TouchableOpacity
        style={styles.headerRightContainer}
        onPress={() => navToSocial()}>
        <Icon.AntDesign
          name="arrowright"
          size={30}
          color={themeStyle.DASH_DARK}
        />
      </TouchableOpacity>
    );
  };

  const [navFromSocial, setNavFromSocial] = React.useState(false);
  const [filterImage, setFilterImage] = React.useState('');
  const [unfilterImage, setUnfilterImage] = React.useState([{}]);
  const [picCount, setPicCount] = React.useState(0);

  const onExtractImage = ({nativeEvent}) => {
    if (picSave) {
      let filterImage = [...unfilterImage];
      filterImage.map(val => {
        val.uri = nativeEvent.uri;
      });
      setPicSave(false);
      return props.navigation.navigate(route.SOCIALPOST1, {
        createStory: props.route.params.createStory,
        postImage: filterImage,
      });
    }
  };

  const [selectedFilterIndex, setIndex] = React.useState(0);

  const [globalIndex, setGlobalIndex] = React.useState(0);

  const [singlePicIndex, setSinglePicIndex] = React.useState(0);

  const [picUpdated, setPicUpdated] = React.useState(false);

  const [picSave, setPicSave] = React.useState(false);

  const [confirmBack, setConfirmBack] = React.useState(false);

  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;

  const SelectedFilterComponentCarousel =
    FILTERS[singlePicIndex].filterComponent;

  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };

  const onSelectFilterModal = selectedIndex => {
    setSinglePicIndex(selectedIndex);
  };

  // Multiple Images State and functions
  const onSelectCarouselPic = selectedIndex => {
    setGlobalIndex(selectedFilterIndex);
    setPicIndex(selectedIndex);
    setShowModal(true);
  };

  const onSelectFilterCarousel = selectedIndex => {
    setIndex(selectedIndex);
    setPicUpdated(false);
  };
  const [selectedPicIndex, setPicIndex] = React.useState(0);

  const [showModal, setShowModal] = React.useState(false);

  const closeModal = val => {
    if (val == 1) {
      setShowModal(false);
      setIndex(globalIndex);
    }
    if (val == 2) {
      setIndex(globalIndex);
      setPicUpdated(true);
      setShowModal(false);
    }
  };

  const onExtractImageCarousel = ({nativeEvent}) => {
    if (picSave == true) {
      multipleFilterArray.push(nativeEvent);
      if (multipleFilterArray.length == unfilterImage?.length) {
        updateFilters(multipleFilterArray);
      }
    } else {
      multipleFilterArray = [];
    }
  };

  return (
    <Container>
      <UploadingModal filter visible={picSave} />
      <DeleteModal
        visible={confirmBack}
        confirm={() => navBack()}
        cancel={() => setConfirmBack(false)}
        filter
      />

      <ScrollView contentContainerStyle={{paddingBottom: SCREEN_HEIGHT * 0.15}}>
        {picCount == 0 ? (
          // Single Pic Filter
          <SingleFilter
            onSelectFilter={onSelectFilter}
            filters={FILTERS}
            selectedFilterIndex={selectedFilterIndex}
            image_path={unfilterImage[0].uri}
            SelectedFilterComponent={SelectedFilterComponent}
            onExtractImage={onExtractImage}
            picSave={picSave}
          />
        ) : (
          // Multiple Pic Filter
          <MultipleFilter
            selectedPicIndex={selectedPicIndex}
            image_path={unfilterImage}
            onSelectFilter={onSelectFilter}
            filters={FILTERS}
            onSelectCarouselPic={onSelectCarouselPic}
            closeModal={closeModal}
            showModal={showModal}
            SelectedFilterComponent={SelectedFilterComponent}
            selectedFilterIndex={selectedFilterIndex}
            onExtractImageCarousel={onExtractImageCarousel}
            SelectedFilterComponentCarousel={SelectedFilterComponentCarousel}
            onSelectFilterModal={onSelectFilterModal}
            onSelectFilterCarousel={onSelectFilterCarousel}
            picUpdated={picUpdated}
            singlePicIndex={singlePicIndex}
            picSave={picSave}
          />
        )}
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.6,
    marginVertical: 10,
    alignSelf: 'center',
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
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
  },
  grayText: {
    color: themeStyle.DASH_DARK,
    fontFamily: themeStyle.FONT_REGULAR,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
  },
});
export default FilterImage;
