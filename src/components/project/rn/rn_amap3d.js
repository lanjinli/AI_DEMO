import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { MapView } from 'react-native-amap3d';

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

export default class RnAmap3d extends Component {

    constructor() {
        super();
        this.state = {
            location: null
        };
    }

    componentWillMount() {
        // e98ff5f495169c41b3b8f592d9720fed
    }

    componentDidMount() {
    }

    async componentDidMount() {
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
                <MapView
                    ref={ref => this.mapView = ref}
                    style={{
                        width: screen.width,
                        height: screen.height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT)
                    }}
                    mapType={'standard'} //地图类型
                    locationStyle={{backgroundColor:'#f00'}} //定位图标样式
                    locationInterval={5000} //定位间隔(ms)
                    showsIndoorMap={true} //是否显示室内地图
                    showsBuildings={true} //是否显示3D建筑
                    showsCompass={false} //是否显示指南针
                    showsZoomControls={false} //是否显示放大缩小按钮
                    showsLocationButton={false} //是否显示定位按钮
                    locationEnabled={true} //是否启用定位
                    zoomLevel={16} //当前缩放级别
                    onLocation={({ nativeEvent }) => {
                        this.setState({
                            location: {
                                latitude: nativeEvent.latitude,
                                longitude: nativeEvent.longitude
                            }
                        });
                        this.mapView.animateTo({
                            coordinate: {
                              latitude: nativeEvent.latitude,
                              longitude: nativeEvent.longitude,
                            },
                        })
                    }}
                >
                    <MapView.Circle
                        strokeWidth={5}
                        strokeColor="red"
                        fillColor="red"
                        radius={10000}
                        coordinate={this.coordinate}
                    />
                </MapView>
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
});
