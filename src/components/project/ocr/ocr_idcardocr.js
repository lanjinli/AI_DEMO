import * as Animatable from 'react-native-animatable';
import { RNCamera, FaceDetector } from 'react-native-camera';
import Modal from 'react-native-modalbox';

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
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {OcrApi} from '../../../service/urlService';
import formatJson from '../../../constants/formatJson';
import TakePicture from '../../common/TakePicture ';

export default class OcrIdcardocr extends Component {

    constructor() {
        super();
        this.state = {
            CameraView: false
        };
    }

    controlCamera(){
        this.setState({CameraView: !this.state.CameraView})
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };

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
                    <View style={styles.viewport}>
                        <View style={styles.viewport_item}>
                            <Image style={{ width: 300, height: 190 }} source={require("../../../assets/image/front_effect.png")} />
                            <View style={styles.choice_wrap}>
                                <TouchableOpacity
                                    style={[styles.choice_btn]}
                                    activeOpacity={0.8}
                                    onPress={() => {this.controlCamera()}}
                                >
                                        <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../../assets/image/icon_camera.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewport_item}>
                            <Image style={{ width: 300, height: 190 }} source={require("../../../assets/image/back_effect.png")} />
                            <View style={styles.choice_wrap}>
                                <TouchableOpacity
                                    style={[styles.choice_btn]}
                                    activeOpacity={0.8}
                                    onPress={() => {this.controlCamera()}}
                                >
                                        <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../../assets/image/icon_camera.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={()=>{this.setState({CameraView: !this.state.CameraView})}}
                        >
                            <Text style={styles.btn_text}>识别 {data.title}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.CameraView && <TakePicture/>
                    }
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
    viewport: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 20,
    },
    viewport_item: {
        width: 300,
        height: 190,
        borderRadius: 8,
        backgroundColor: '#f5f6f6',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    choice_wrap: {
        width: 60,
        height: 30,
        position: 'absolute',
        bottom: 190/2 - 15,
        left: 300/2 - 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    choice_btn: {
        borderRadius: 15,
        overflow: 'hidden',
        height: 30,
        width: 60,
        backgroundColor: 'rgba(0,0,0,.3)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgLoad: {
        position: 'absolute',
        top: screen.width/2 - 10,
        left: screen.width/2 - 10,
        width: 20,
        height: 20,
        zIndex: 1,
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
        marginBottom: 20,
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
