import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT
} from '../../constants/util';

export default class Welcome extends Component {

    //跳转首页
    getHomePage() {
        this.props.navigation.replace('Home');
    }
    static navigationOptions = {
        // 隐藏头部
        header: () => null
    };

    constructor(props) {
        super(props);
        this.state = {
            countdown: 3
        }
    }

    componentDidMount() {
        // 3秒后跳转到Home
        this.timer = setInterval(() => {
            if (this.state.countdown <= 0) {
                this.getHomePage();
            } else {
                this.setState({
                    countdown: this.state.countdown - 1
                })
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }
    
    render() {
        return (
            <View style={[styles.flex]}>
                <StatusBar
                    animated={true}//变化是否动画过渡
                    hidden={true}//是否显示
                    backgroundColor={'#000'}//背景颜色
                    translucent={true}//状态栏是否透明
                    networkActivityIndicatorVisible={false}//ios 状态加载中
                    showHideTransition={'fade'}
                    barStyle={'dark-content'} // 文本颜色
                />
                <Image source={require("../../assets/image/welcome.jpg")} style={styles.adsImg}/>
                <View style={styles.slogan}>
                    <Text style={styles.slogan_text}>腾讯AI黑科技 一键可达</Text>
                </View>
                <TouchableOpacity style={[styles.skip]} onPress={this.getHomePage.bind(this)}>
                    <Text style={styles.skip_text}>{this.state.countdown}</Text>
                    <Text style={styles.skip_text}> | </Text>
                    <Text style={styles.skip_text}>跳过</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff'
    },
    adsImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: screen.width,
        height: null,
        resizeMode: 'cover'
    },
    slogan: {
        width: screen.width,
        height: screen.height/5,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogan_text: {
        fontSize: 16,
        color: '#666',
    },
    skip: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT,
        right: 10,
        width: 80,
        height: 28,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 14,
    },
    skip_text: {
        color: '#FFF',
        fontSize: 14,
    }
});