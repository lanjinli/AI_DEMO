import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFS from 'react-native-fs';

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
    Vibration,
    PermissionsAndroid
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil,
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode, AaiApi} from '../../../service/urlService';
import ToastLoading from '../../common/ToastLoading';

export default class AaiAsr extends Component {

    constructor() {
        super();
        this.state = {
            currentTime: 0,   //开始录音到现在的持续时间
            recording: false,   //是否正在录音
            stoppedRecording: false,    //是否停止了录音
            finished: false,    //是否完成录音
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',  //路径下的文件名
            hasPermission: undefined,   //是否获取权限
            requestStatus: false, //请求状态
            OperationFeedback: false, //按下松开
            audioFilePath: null, //录音文件路径
            audioFileBase64: null, //录音文件编码
        };
    }

    // 初始化录音配置
    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 16000,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
    }

    // 开始录音
    voicePlay(){
        if(this.state.requestStatus)return
        this.setState({
            OperationFeedback: true
        });
        this.voiceAnimation.play();
        Vibration.vibrate(50);
        this._record();
    }

    // 结束录音
    voiceStop(){
        this.setState({
            OperationFeedback: false
        });
        if (this.state.currentTime < 1) {
            this.voiceAnimation.reset();
            setTimeout(()=>{
                if(this.state.currentTime < 1){
                    this._stop(false);
                }else{
                    this.voiceAnimation.reset();
                    this.prompt.play();
                    this._stop(true);
                }
            },400);
        }else{
            this.voiceAnimation.reset();
            this.prompt.play();
            this._stop(true);
        }
    }

    // 触发按钮
    pressVoice(){
        this.state.recording ? this.voiceStop() : this.voicePlay();
    }

    // 记录
    async _record() {

        if (this.state.recording) {
            console.warn('已经在录音');
            return;
        }
  
        if (!this.state.hasPermission) {
            console.warn('不能录音，未经允许');
            return;
        }
  
        if(this.state.stoppedRecording){
            this.prepareRecordingPath(this.state.audioPath);
        }
  
        this.setState({recording: true});
  
        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    // 停止录音
    async _stop(type) {
        if (!this.state.recording) {
          console.warn('不能停止，没有录音');
          return;
        }
        this.setState({
            stoppedRecording: true,
            recording: false,
        });
        try {
            const filePath = await AudioRecorder.stopRecording();
            if (Platform.OS === 'android') {
                this._finishRecording(type, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    // 播放录音
    async _play() {
        if (this.state.recording) {
          await this._stop();
        }
        setTimeout(() => {
          var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
  
          setTimeout(() => {
            sound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
    }

    // 完成记录
    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({
            finished: didSucceed,
            audioFilePath: filePath,
        });
        RNFS.readFile(filePath,'base64')
          .then((result) => {
            this.setState({
                audioFilePath: filePath,
                audioFileBase64: result,
            });
            this.requestApi();
          })
          .catch((err) => {
            console.log(err.message);
            toastUtil('录音编码失败');
          });
    }

    // 请求接口
    requestApi() {
        if(this.state.requestStatus)return
        if(!this.state.audioFilePath || !this.state.audioFileBase64){
            toastUtil('录音文件读取失败');
            return
        }
        this.setState({
            requestStatus: true
        });
        let data = {
            "app_id": AppId,
            "time_stamp": Math.round(new Date().getTime()/1000).toString(),
            "nonce_str": Math.floor(Math.random()*100000).toString(),
            "sign": "",
            "format": 2,
            "speech": this.state.audioFileBase64,
            "rate": 16000,
        }
        console.log('开始请求');
        HttpService.post(SignUrl,{
            'url': AaiApi.aai_asr,
            'params': data
        })
        .then(result=>{
            if(this.state.requestStatus){
                alert(JSON.stringify(result));
                console.log(result);
                if(typeof result == "object"){
                    this.setState({
                        requestStatus: false
                    });
                }else{
                    toastUtil('识别失败，未知错误');
                }
                
            }
        })
        .catch(error=>{
            console.log(error);
            this.setState({
                requestStatus: false
            });
            toastUtil('识别失败，未知错误');
        })
    }

    componentDidMount() {
        // 配置音效文件
        this.demoAudio = require('../../../assets/sound/prompt.mp3');
        this.prompt = new Sound(this.demoAudio, (e) => {});

        // 页面加载完成后获取权限
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });
    
            if (!isAuthorised) return;
    
            this.prepareRecordingPath(this.state.audioPath);
    
            AudioRecorder.onProgress = (data) => {
              this.setState({currentTime: Math.floor(data.currentTime)});
              if(data.currentTime >= 15){
                toastUtil('识别上限15秒');
                this.voiceStop();
              }
            };
    
            AudioRecorder.onFinished = (data) => {
              // Android callback comes in the form of a promise instead.
              if (Platform.OS === 'ios') {
                this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
              }
            };
        });
    }

    componentWillUnmount() {
        this.prompt.release();
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
                </ScrollView>
                <View style={styles.voice}>
                    <View style={styles.voice_time}>
                        {
                            this.state.currentTime > 0 && <Animatable.View animation="fadeInUp" duration={400} iterationCount={1} direction="normal">
                                <Text style={[styles.voice_time_text,{fontSize: 20, color: '#000'}]}>{this.state.currentTime}s</Text>
                            </Animatable.View>
                        }
                    </View>
                    <View style={styles.voice_wrap}>
                        <LottieView
                            style={styles.voice_icon}
                            ref={voiceAnimation => {
                                this.voiceAnimation = voiceAnimation;
                            }}
                            source={require('../../../assets/animotion/voice.json')}
                            autoPlay={false}
                            loop={true}
                            speed={2}
                            duration={1000}
                        />
                    </View>
                    <View style={styles.voice_box}>
                        <TouchableWithoutFeedback
                            style={styles.voice_btn}
                            onPressIn={()=>{this.pressVoice()}}
                            onPress={()=>{this.pressVoice()}}
                        >
                            <View style={styles.voice_btn}></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.voice_time,{marginBottom: 30}]}>
                        {
                            this.state.OperationFeedback ? <Text style={styles.voice_time_text}>松开进行识别</Text> :  <Text style={styles.voice_time_text}>按下开始录音</Text>
                        }
                    </View>
                </View>
                {
                    this.state.requestStatus && <ToastLoading />
                }
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
    voice: {
        width: screen.width,
        height: 220,
        position: 'absolute',
        bottom: -30,
        left: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    voice_time: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voice_time_text: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '100',
        lineHeight: 38,
        color: '#b9b9b9',
    },
    voice_box: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        top: 220/2 - 40,
        left: screen.width/2 - 40,
        overflow: 'hidden',
        zIndex: 2,
    },
    voice_btn:{
        width: 80,
        height: 80,
    },
    voice_wrap: {
        width: 220,
        height: 220,
        position: 'absolute',
        left: screen.width/2 - 110,
        zIndex: 1,
    },
    voice_icon: {
        width: 220,
        height: 220,
    }
});
