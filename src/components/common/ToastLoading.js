import * as Animatable from 'react-native-animatable';

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
} from '../../constants/util';

export default class ToastLoading extends Component {
    render() {
        return (
            <Animatable.View style={styles.requestStatusView} animation="fadeInUp" easing="ease-out" iterationCount={1} duration={300}>
                <View style={styles.requestStatusContentView}>
                    <ActivityIndicator
                        style={styles.requestLoad}
                        color='#fff'
                        animating={true}
                        size="small"
                    />
                    <Text style={styles.requestText}>正在识别</Text>
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    requestStatusView: {
        position: 'absolute',
        width: screen.width,
        height: screen.height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT),
        top: STATUS_BAR_HEIGHT + NAVBSR_HEIGHT,
        left: 0,
    },
    requestStatusContentView: {
        position: 'absolute',
        left: screen.width/2 - 50,
        top: (screen.height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT))/2 - 100,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
        borderRadius: 4,
        width: 100,
        height: 100,
    },
    requestLoad: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    requestText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
})