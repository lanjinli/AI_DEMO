import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';

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

export default class RnSwiper extends Component {

    constructor() {
        super();
        this.state = {
        };
    }


    componentDidMount() {
    }

    componentWillUnmount() {
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
                <ScrollView>
                    <Swiper style={styles.wrapper}>
                        <TouchableHighlight style={{width: screen.width,height:200}}>
                            <Image style={{width: screen.width,height:200}} resizeMode="stretch" source={{uri: 'https://images.unsplash.com/photo-1545600735-35c52bc2a640?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={{width: screen.width,height:200}}>
                            <Image style={{width: screen.width,height:200}} resizeMode="stretch" source={{uri: 'https://images.unsplash.com/photo-1545702792-e6952fa78df3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={{width: screen.width,height:200}}>
                            <Image style={{width: screen.width,height:200}} resizeMode="stretch" source={{uri: 'https://images.unsplash.com/photo-1540202404-b37a2124ed0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/>
                        </TouchableHighlight>
                    </Swiper>
                </ScrollView>
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
    wrapper: {
        flex: 1,
        height: 200
    }
});
