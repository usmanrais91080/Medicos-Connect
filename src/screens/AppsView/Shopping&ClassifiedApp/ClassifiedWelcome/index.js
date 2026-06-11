import React, { Component } from 'react';

import { ScrollView, Text, View } from 'react-native';
import { Button, Container } from '../../../../components';

import Heart from '../../../../assets/svg/edu.svg';

import styles from './style';
import { route } from '../../../../lib/utils/constants';

export default class ConnectWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: "30%" }}>
                    <View style={styles.container}>
                        <View style={styles.svgContainer}>
                            <Heart />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.heading}>Welcome to Classified</Text>
                            {/* <Text style={styles.desc}>Your favorite marketplace to sell or buy goods at the best rates and guaranteed quality!</Text> */}
                        </View>
                        <View style={styles.btnContainer}>
                            <Button parrot title={'Continue'} red onPress={() => this.props.navigation.navigate(route.EDUCATIONDISCLAIMER)} />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}