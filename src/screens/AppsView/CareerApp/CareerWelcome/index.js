import React, { Component } from 'react';

import { Text, View } from 'react-native';
import { Button, Container } from '../../../../components';

import Career from '../../../../assets/svg/career-icon-update.svg';

import styles from './style';
import { route } from '../../../../lib/utils/constants';

export default class CareerWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container color>
                <View style={styles.container}>
                    <View style={styles.svgContainer}>
                        <Career />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Welcome to MC Career</Text>
                        <Text style={styles.desc}>Say no to hectic job searching days! Find the jobs, and locums in accordance with your preferences easily.</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title={'Setup profile'} green career onPress={() => this.props.navigation.navigate(route.CAREERPROFILE1ST)} />
                    </View>
                </View>
            </Container>
        )
    }
}