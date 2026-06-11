import React, {Component} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {SCREEN_WIDTH} from '../../lib/utils/constants';
import {RenderView} from './app.tour.guide.components';

class AppTourGuideHubScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPostIndex: 0,
      // data: [
      //         {
      //             file: require('../../assets/images/tourHubScreen/1.png'),
      //             title: "Main Modules",
      //             desc: " dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         },
      //         {
      //             file: require('../../assets/images/tourHubScreen/2.png'),
      //             title: "Main Modules",
      //             desc: " dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         },
      //         {
      //             file: require('../../assets/images/tourHubScreen/3.png'),
      //             title: "Main Modules",
      //             desc: " dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         },
      //         {
      //             file: require('../../assets/images/tourHubScreen/4.png'),
      //             title: "Main Modules",
      //             desc: " dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         }]
    };
  }

  setSliderPage = (event: any) => {
    const {currentPostIndex} = this.state;
    const x = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x.x / Math.floor(SCREEN_WIDTH));
    if (indexOfNextScreen !== currentPostIndex) {
      this.setState({
        currentPostIndex: indexOfNextScreen,
      });
    }
  };

  render() {
    const {currentPostIndex} = this.state;
    return (
      <>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          ref={node => (this.scroll1 = node)}
          onScroll={event => this.setSliderPage(event)}
          style={{flex: 1, backgroundColor: '#f5f5f5'}}
        >
          {this.state?.data?.map((item, index) => {
            return <RenderView item={item} />;
          })}
        </ScrollView>
      </>
    );
  }
}

export default AppTourGuideHubScreen;
