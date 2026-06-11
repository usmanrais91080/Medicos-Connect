
import React, { Component } from 'react';

import { Text, View } from 'react-native';
import { Button, Container } from '../../../../components';
import { route } from '../../../../lib/utils/constants';

import styles from './style';

export default class SubmisiionSuccessfull extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.justifyCenter}>
                        <Text style={styles.heading}>Submission successful</Text>
                        <Text style={styles.desc}>
                            Your document is under review.
                            You will be notified about the status of your
                            application shortly.
                        </Text>
                    </View>
                    <View style={styles.justifyEnd}>
                        <Button title={'Continue'} onPress={() => this.props.navigation.push(route.MAIN, { screen: route.HOME })} />
                    </View>
                </View>

            </Container>
        )
    }
}