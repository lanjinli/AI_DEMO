import LinearGradient from 'react-native-linear-gradient';

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native';
import {
    Demensions,
    ScreenWidth,
    ScreenHeight,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import NavigationBar from '../navigation/NavigationBar';
import {HomeData} from '../../store/config';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeList: HomeData
        };
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return;
        }
        this.lastBackPressed = Date.now();
        toastUtil('再按一次退出应用');
        return true;
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    getPage(name, item) {
        this.props.navigation.navigate(name, item);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={'腾讯AI体验中心'}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => this.props.navigation.openDrawer()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_menu.png")} />
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => navigate('Info')} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_about.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={styles.b_list}>
                        {
                            this.state.homeList.map((item, index) => {
                                return (<TouchableOpacity
                                    style={styles.b_l_btn}
                                    activeOpacity={0.9}
                                    key={index}
                                    onPress={() => {this.getPage(item.page, {data: item})}}
                                >
                                    <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#1b4fd5', '#1657da']} style={styles.b_l_t_bg}>
                                        <Image source={item.img} style={styles.b_l_btn_icon} />
                                        <Text style={styles.b_l_btn_text}>{item.title}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>);
                            })
                        }
                    </View>
                    <View style={styles.b_foot}>
                        <Text style={styles.b_f_text}>腾讯AI开放平台</Text>
                    </View>
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
    b_list: {
        flex: 1,
        minHeight: ScreenHeight - (44 + NAVBSR_HEIGHT + STATUS_BAR_HEIGHT),
    },
    b_l_btn: {
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 3,
        overflow: 'hidden'
    },
    b_l_t_bg: {
        height: 150,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    b_l_btn_icon: {
        flex: 0,
        width: 160,
        height: 101,
        marginLeft: 20
    },
    b_l_btn_text: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 20
    },
    b_foot: {
        height: 34,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    b_f_text: {
        fontSize: 12,
        color: '#bdbdbd',
    }
});