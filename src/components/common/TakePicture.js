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
                        onCameraReady={()=>{alert('相机准备就绪')}}
                        onMountError={()=>{alert('相机打开失败')}}
                        onPictureTaken={()=>{alert('拍照')}}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes)
                        }}
                    />
                    <View style={styles.left}>
                        
                    </View>
                    <View style={styles.right}>
                    </View>
                    {/* <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity> */}
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
    left: {
        height: 48,
        width: screen.width,
        backgroundColor: 'red',
        flex: 1,
        
    },
    right: {

    }
});
