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
    ActivityIndicator,
    BackHandler
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
        };
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };

    render() {
        return (
            <View style={styles.container}>
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
                <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style = {styles.capture}
                >
                    <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#000',
        position: 'relative'
    },
    preview: {
        width: screen.width,
        height: screen.height,
        flex: 1,
        width: 300,
        height: 160,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        width: 100,
        height: 40,
        position: 'absolute',
        top: 10,
        left: 10,
    },
});
