import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { Geolocation } from "react-native-amap-geolocation";

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
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
import ToastLoading from '../../common/ToastLoading';

export default class RnGeolocation extends Component {

    constructor() {
        super();
        this.state = {
            location: null
        };
    }

    componentWillMount() {
        Geolocation.init({
            ios: "e98ff5f495169c41b3b8f592d9720fed",
            android: "e98ff5f495169c41b3b8f592d9720fed"
        })
    }

    componentDidMount() {
        Geolocation.setOptions({
            interval: 10000,
            distanceFilter: 10,
            reGeocode: true
        })
        Geolocation.addLocationListener(location => {
            console.log(location)
            this.setState({
                location: location
            })
        })
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    _renderTextView(){
        let list = [];
        for(var key in this.state.location){
            list.push(<Text style={styles.results_text} key={key}>{key}：{this.state.location[key]}</Text>);
        }
        return list
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
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={() => Geolocation.start()}
                        >
                            <Text style={styles.btn_text}>开始定位</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={() => Geolocation.stop()}
                        >
                            <Text style={styles.btn_text}>结束定位</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        !this.state.location && <View style={{flex: 1, height: 300, justifyContent: 'center', alignItems: 'center',}}>
                            <LottieView
                                style={{width: 120, height: 120}}
                                source={require('../../../assets/animotion/location.json')}
                                autoPlay={true}
                                loop={true}
                                speed={1.2}
                            />
                        </View>
                    }
                    {
                        this.state.location && 
                        <View style={styles.results}>
                            <View style={styles.TextView}>
                                {this._renderTextView()}
                            </View>
                            <View style={styles.PreView}>
                                <Text style={styles.results_pre}>{this.state.location && formatJson(this.state.location)}</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }

    startLocation = () => {
        Geolocation.start();
    };
    stopLocation = () => {
        Geolocation.stop();
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
    results: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    TextView: {
        backgroundColor: '#ebecec',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    PreView: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    results_text: {
        fontSize: 14,
        paddingVertical: 2,
        lineHeight: 24,
    },
    results_pre: {
        fontSize: 14,
        paddingVertical: 3,
        lineHeight: 20,
    },
    results_err_text: {
        fontSize: 14,
        paddingHorizontal: 6,
        lineHeight: 28,
        textAlign: 'center',
    },
    button: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    btn_wrap: {
        height: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: '#1657da'
    },
    btn_text: {
        fontSize: 18,
        color: '#fff'
    }
});
