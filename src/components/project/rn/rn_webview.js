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
    BackHandler,
    WebView
} from 'react-native';
import {
    Demensions,
    screen,
    windowScreen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil,
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode, AaiApi} from '../../../service/urlService';
import ToastLoading from '../../common/ToastLoading';

export default class RnWebView extends Component {

    constructor() {
        super();
        this.state = {
        };
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
                <View style={{width: screen.width, height: screen.height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT)}}>
                    <WebView
                        style={{
                            width: screen.width,
                            height: screen.height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT)
                        }}
                        source={{uri:'https://www.jianshu.com/'}}
                        automaticallyAdjustContentInsets={false}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate={'normal'}
                        onLoad={(e) => console.log('onLoad')}
                        onLoadEnd={(e) => console.log('onLoadEnd')}
                        onLoadStart={(e) => console.log('onLoadStart')}
                        onShouldStartLoadWithRequest={() => {
                            const shouldStartLoad = true;
                            return shouldStartLoad;
                        }}
                        renderError={() => {
                            return <View style={styles.viewWrap}>
                                <LottieView
                                    style={styles.error}
                                    source={require('../../../assets/animotion/coding_ape.json')}
                                    autoPlay={true}
                                    loop={true}
                                    speed={1.2}
                                />
                            </View>
                        }}
                        renderLoading={() => {
                            return <View style={styles.viewWrap}>
                                <LottieView
                                    style={styles.loading}
                                    source={require('../../../assets/animotion/material_wave_loading.json')}
                                    autoPlay={true}
                                    loop={true}
                                    speed={1.2}
                                />
                            </View>
                        }}
                    />
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
    viewWrap: {
        width: screen.width,
        height: screen.height - ( NAVBSR_HEIGHT + STATUS_BAR_HEIGHT) - (screen.height - windowScreen.height),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        width: 60,
        height: 60,
        marginBottom: 80,
    },
    error: {
        width: 180,
        height: 180,
        marginBottom: 80,
    }
});
