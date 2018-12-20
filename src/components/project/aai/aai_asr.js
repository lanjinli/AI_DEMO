import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    BackHandler
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil,
    GetImageBase64
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode} from '../../../service/urlService';
import ToastLoading from '../../common/ToastLoading';

export default class AaiAsr extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    voicePlay(){
        this.voiceAnimation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    voiceStop(){
        this.voiceAnimation.reset();
    }

    render() {
        const { data } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={data.title}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => this.props.navigation.goBack()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../../assets/image/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                {/* <ScrollView>
                    
                </ScrollView> */}
                <View style={styles.voice}>
                    <View style={styles.voice_wrap}>
                        <LottieView
                            style={styles.voice_icon}
                            ref={voiceAnimation => {
                                this.voiceAnimation = voiceAnimation;
                            }}
                            source={require('../../../assets/animotion/voice.json')}
                            autoPlay={false}
                            loop={true}
                            speed={2}
                            duration={1000}
                        />
                    </View>
                    <View style={styles.voice_box}>
                        <TouchableWithoutFeedback
                            style={styles.voice_btn}
                            onPressIn={()=>{this.voicePlay()}}
                            onPress={()=>{this.voiceStop()}}
                        >
                            <View style={styles.voice_btn}></View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    NavBarBtn: {
        width: 44,
        height: NAVBSR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voice: {
        width: screen.width,
        height: 220,
        position: 'absolute',
        bottom: -30,
        left: 0,
    },
    voice_box: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        top: 220/2 - 40,
        left: screen.width/2 - 40,
        overflow: 'hidden',
        zIndex: 2,
    },
    voice_btn:{
        width: 80,
        height: 80,
    },
    voice_wrap: {
        width: 220,
        height: 220,
        position: 'absolute',
        left: screen.width/2 - 110,
        zIndex: 1,
    },
    voice_icon: {
        width: 220,
        height: 220,
    }
});
