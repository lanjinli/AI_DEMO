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
            photoResults: null,
            cameraConfig: {
                flashMode: {
                    index: 0,
                    type: RNCamera.Constants.FlashMode.off,
                    img: require("../../assets/image/icon_camera_flash_off.png")
                }
            }
        };
    }

    setFlashMode() {
        if(this.state.photoResults) return;
        switch(this.state.cameraConfig.flashMode.index){
            case 0:
                this.setState({
                    cameraConfig: {
                        flashMode: {
                            index: 1,
                            type: RNCamera.Constants.FlashMode.on,
                            img: require("../../assets/image/icon_camera_flash_on.png")
                        }
                    }
                })
                break;
            case 1:
                this.setState({
                    cameraConfig: {
                        flashMode: {
                            index: 2,
                            type: RNCamera.Constants.FlashMode.auto,
                            img: require("../../assets/image/icon_camera_flash_auto.png")
                        }
                    }
                })
                break;
            case 2:
                this.setState({
                    cameraConfig: {
                        flashMode: {
                            index: 3,
                            type: RNCamera.Constants.FlashMode.torch,
                            img: require("../../assets/image/icon_camera_flash_torch.png")
                        }
                    }
                })
                break;
            case 3:
                this.setState({
                    cameraConfig: {
                        flashMode: {
                            index: 0,
                            type: RNCamera.Constants.FlashMode.off,
                            img: require("../../assets/image/icon_camera_flash_off.png")
                        }
                    }
                })
                break;
        }
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { width: 1024, quality: 0.5, base64: true, pauseAfterCapture: true, orientation: 'landscapeLeft'};
            const data = await this.camera.takePictureAsync(options);
            console.log(data);
            alert('图像方向：' + data.pictureOrientation + '\n' + '设备方向：' + data.deviceOrientation);
            this.setState({
                photoResults: data.base64
            });
        }
    };

    resetPicture (){
        this.setState({
            photoResults: null
        });
        this.camera.resumePreview();
    }

    completePicture (){

    }

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
                        flashMode={this.state.cameraConfig.flashMode.type} // 闪光灯
                        zoom={0} // 缩放比例
                        permissionDialogTitle={'使用相机许可'}
                        permissionDialogMessage={'我们需要你的许可才能使用你的照相手机'}
                        onMountError={()=>{
                            toastUtil('相机打开失败');
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes)
                        }}
                    />
                    <View style={styles.viewport}>
                        <View style={[styles.viewportContent, {
                            width: data.width,
                            height: data.height,
                            top: screen.height/2 - (data.height/2),
                            left: screen.width/2 - (data.width/2),
                        }]}>
                            <Image style={{ width: data.width, height: data.height}} source={data.effect} />
                        </View>
                    </View>

                    <View style={styles.control}>
                        <View style={styles.left}>
                            <TouchableOpacity
                                style={[styles.letf_btn]}
                                activeOpacity={0.4}
                                onPress={() => {this.setFlashMode()}}
                            >
                                <Image style={{ width: 28, height: 28 }} source={this.state.cameraConfig.flashMode.img} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.letf_btn]}
                                activeOpacity={0.4}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_camera_back.png")} />
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.photoResults ? <View style={styles.right}></View>:<View style={styles.right}>
                                <TouchableOpacity
                                    style = {styles.capture}
                                    activeOpacity={0.6}
                                    onPress={this.takePicture.bind(this)}
                                >
                                    <View style={styles.capture_icon}></View>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            this.state.photoResults && <View style={[styles.right,{justifyContent: 'space-between',}]}>
                                <TouchableOpacity
                                    style={[styles.letf_btn]}
                                    activeOpacity={0.4}
                                    onPress={() => {this.resetPicture()}}
                                >
                                    <Image style={{ width: 50, height: 50 }} source={require("../../assets/image/icon_camera_remake.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.letf_btn]}
                                    activeOpacity={0.4}
                                    onPress={() => this.completePicture()}
                                >
                                    <Image style={{ width: 50, height: 50 }} source={require("../../assets/image/icon_camera_complete.png")} />
                                </TouchableOpacity>
                            </View>
                        }
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
        borderColor: '#1b4fd5',
        borderRadius: 10,
        position: 'absolute',
    },
    control: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
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
        top: screen.height - 50 - (screen.height - windowScreen.height),
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        height: 50 + (screen.height - windowScreen.height),
        width: screen.width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    capture: {
        width: 50,
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.7)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture_icon: {
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    photoResults: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screen.width,
        height: screen.height,
        zIndex: 2,
    }
});
