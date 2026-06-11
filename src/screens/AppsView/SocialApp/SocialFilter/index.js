import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import themeStyle from '../../../../assets/styles/theme.style';
import Search from '../../../../assets/svg/search.svg';
import { Button, Container, Icon } from '../../../../components';

import styles from './style';

export default class SocialFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            anyone: true,
            people: false,
            anywhere: true,
            near: false,
            selectedTip: '',
            data: [
                {
                    id: 1,
                    label: 'Trending',
                    value: 'Trending'
                },
                {
                    id: 1,
                    label: 'Educational',
                    value: 'Educational'
                },
                {
                    id: 1,
                    label: 'Entertainment',
                    value: 'Entertainment'
                },
                {
                    id: 1,
                    label: 'Political',
                    value: 'Political'
                },
                {
                    id: 1,
                    label: 'Popular',
                    value: 'Popular'
                },
                {
                    id: 1,
                    label: 'News',
                    value: 'News'
                },
                {
                    id: 1,
                    label: 'Food',
                    value: 'Food'
                },
                {
                    id: 1,
                    label: 'LifeStyle',
                    value: 'LifeStyle'
                }
            ],
            dropdownOpen: false
        }
    }

    renderChips(item, index) {
        return <View key={index.toString()} style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ tags: this.state.tags.filter((_, i) => i != index) })} style={styles.minusContainer}>
                <Icon.AntDesign name="minus" size={15} color={themeStyle.COLOR_WHITE} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.whiteText}>{item}</Text>
            </View>
        </View>
    }

    render() {
        const { tags, anyone, people, anywhere, near, data } = this.state
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Filter by content</Text>
                        <DropDownPicker
                            items={data}
                            placeholder=""
                            defaultValue={null}
                            customArrowUp={(size, color) => <Search />}
                            customArrowDown={(size, color) => <Search />}
                            containerStyle={{ height: 40, }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            onChangeItem={(item) => {
                                let array = [...tags];
                                array.push(item.value)
                                this.setState({ tags: array, selectedTip: item.value, })
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <ScrollView horizontal={true}>
                            {tags.map((item, index) => this.renderChips(item, index))}
                        </ScrollView>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headingText}>People</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => this.setState({ anyone: true, people: false })} style={styles.row}>
                                <View style={anyone ? styles.selectedbox : styles.box}></View>
                                <Text style={anyone ? styles.selectedOption : styles.option}>From anyone</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ people: true, anyone: false })} style={[styles.row, { marginLeft: '15%' }]}>
                                <View style={people ? styles.selectedbox : styles.box}></View>
                                <Text style={people ? styles.selectedOption : styles.option}>People you follow</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headingText}>Location</Text>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => this.setState({ anywhere: true, near: false })} style={styles.row}>
                                <View style={anywhere ? styles.selectedbox : styles.box}></View>
                                <Text style={anywhere ? styles.selectedOption : styles.option}>Anywhere</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ near: true, anywhere: false })} style={[styles.row, { marginLeft: '15%' }]}>
                                <View style={near ? styles.selectedbox : styles.box}></View>
                                <Text style={near ? styles.selectedOption : styles.option}>Near you</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={'Reset Filters'} />
                    </View>
                </View>
            </Container>
        )
    }
}