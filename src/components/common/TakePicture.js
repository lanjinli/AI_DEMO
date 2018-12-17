import { RNCamera, FaceDetector } from 'react-native-camera';

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
    StatusBar
} from 'react-native';
import {
    Demensions,
    screen,
    windowScreen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';

export default class TakePicture extends Component {

    constructor() {
        super();
        this.state = {
            viewCamera: false,
        };
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };

    componentWillMount(){
        setTimeout(() => {
            this.setState({
                viewCamera: true
            })
        }, 300);
    }

    render() {
        const { data } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        
        return (
            <View >
                <StatusBar
                    animated={true}//变化是否动画过渡
                    hidden={true}//是否显示
                    backgroundColor={'#000'}//背景颜色
                    translucent={true}//状态栏是否透明
                    networkActivityIndicatorVisible={false}//ios 状态加载中
                    showHideTransition={'fade'}
                    barStyle={'dark-content'} // 文本颜色
                />
                {this.state.viewCamera && <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style = {styles.preview}
                        autoFocus = {RNCamera.Constants.AutoFocus.on} // 自动对焦
                        type={RNCamera.Constants.Type.back} // 指定摄像头
                        flashMode={RNCamera.Constants.FlashMode.off} // 闪光灯
                        zoom={0} // 缩放比例
                        permissionDialogTitle={'使用相机许可'}
                        permissionDialogMessage={'我们需要你的许可才能使用你的照相手机'}
                        // onCameraReady={()=>{alert('相机准备就绪')}}
                        // onMountError={()=>{alert('相机打开失败')}}
                        // onPictureTaken={()=>{alert('拍照')}}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes)
                        }}
                    />
                    <View style={styles.viewport}>
                        <View style={styles.viewportT}></View>
                        <View style={styles.viewportB}></View>
                        <View style={styles.viewportL}></View>
                        <View style={styles.viewportR}></View>
                        <View style={styles.viewportContent}></View>
                    </View>
                    <View style={styles.control}>
                        <View style={styles.left}>
                            <TouchableOpacity
                                style={[styles.letf_btn]}
                                activeOpacity={0.4}
                                onPress={() => {alert('切换闪光灯状态')}}
                            >
                                <Image style={{ width: 28, height: 28 }} source={require("../../assets/image/icon_camera_flash_on.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.letf_btn]}
                                activeOpacity={0.4}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_camera_back.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity
                                style = {styles.capture}
                                activeOpacity={0.6}
                                onPress={this.takePicture.bind(this)}
                            >
                                <View style={styles.capture_icon}></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#000',
        position: 'relative'
    },
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#000',
        position: 'relative'
    },
    preview: {
        width: screen.width,
        height: screen.height,
        flex: 1
    },
    viewport: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    viewportContent: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.5)',
        borderRadius: 10,
        width: screen.width - 100,
        height: screen.height - 240,
        position: 'absolute',
        top: screen.height/2 - ((screen.height - 240)/2),
        left: screen.width/2 - ((screen.width - 100)/2),
    },
    control: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    left: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        width: screen.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    letf_btn: {
        width: 48,
        height: 48,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        position: 'absolute',
        top: screen.height - 60 - (screen.height - windowScreen.height),
        left: 0,
        right: 0,
        height: 60 + (screen.height - windowScreen.height),
        width: screen.width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    capture: {
        width: 60,
        height: 60,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.7)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture_icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
});
