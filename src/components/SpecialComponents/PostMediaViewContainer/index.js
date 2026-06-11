import React, {Component} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import themeStyle from '../../../assets/styles/theme.style';
import {SCREEN_WIDTH} from '../../../lib/utils/constants';
import {RenderVideo, RenderImage} from './post.media.view.container.component';
import styles from './style';

class PostMediaViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPostIndex: 0,
      paused: new Array(this.props?.data?.length).fill(true),
    };
  }

  setSliderPage = (event: any) => {
    const {currentPostIndex} = this.state;
    const x = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x.x / Math.floor(SCREEN_WIDTH));

    let array = [...this.state.paused];
    // console.log('array : ', array)

    if (indexOfNextScreen !== currentPostIndex) {
      array[currentPostIndex] = true;
      array[indexOfNextScreen] = true;
      // console.log("array : ", array)
      this.setState({
        currentPostIndex: indexOfNextScreen,
        paused: array,
        // paused: array previous value
      });
    } else {
    }
  };

  render() {
    const {currentPostIndex} = this.state;
    return (
      <>
        <ScrollView
          horizontal={true}
          scrollEnabled={this.props?.data.length > 1 ? true : false}
          scrollEventThrottle={16}
          pagingEnabled={true}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          ref={node => (this.scroll1 = node)}
          onScroll={event => this.setSliderPage(event)}
          style={{backgroundColor: '#f5f5f5'}}>
          {this.props?.data?.map((item, index) => {
            return item.file.includes('.mp4') ? (
              <View style={styles.contentContainer}>
                <RenderVideo
                  index={index}
                  paused={this.state.paused[index]}
                  afterEnteringView={(val, i) => {
                    let array = [...this.state.paused];
                    array[i] = val;
                    this.setState({paused: array});
                  }}
                  afterLeavingView={(val, i) => {
                    let array = [...this.state.paused];
                    array[i] = val;
                    this.setState({paused: array});
                  }}
                  onPressView={(val, i) => {
                    let array = [...this.state.paused];
                    array[i] = val;
                    this.setState({paused: array});
                  }}
                  item={item.file}
                  thumb={item?.thumbnail}
                  videoLayout={e => this.props.videoLayout(e)}
                />
              </View>
            ) : (
              <RenderImage item={item.file} />
            );
          })}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {this.props?.data?.length == 1
            ? null
            : Array.from(Array(this.props?.data?.length).keys()).map(
                (key, index) => (
                  <View
                    style={[
                      styles.paginationDots,
                      {
                        opacity: currentPostIndex === index ? 1 : 0.6,
                        backgroundColor:
                          currentPostIndex === index
                            ? themeStyle.BUTTON_COLOR
                            : themeStyle.COLOR_GREY,
                        marginLeft: index == 0 ? 0 : 6,
                      },
                    ]}
                    key={index}
                  />
                ),
              )}
        </View>
      </>
    );
  }
}

export default PostMediaViewContainer;
