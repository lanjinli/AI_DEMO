import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

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
    GetImageBase64
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode} from '../../../service/urlService';
import ToastLoading from '../../common/ToastLoading';

export default class AaiAsr extends Component {

    constructor() {
        super();
        this.state = {
            currentTime: 0.0,   //开始录音到现在的持续时间
            recording: false,   //是否正在录音
            stoppedRecording: false,    //是否停止了录音
            finished: false,    //是否完成录音
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',  //路径下的文件名
            hasPermission: undefined,   //是否获取权限
        };
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={style}>
                {title}
            </Text>
            </TouchableHighlight>
        );
    }

    // 执行录音的方法
    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
    }

    // 停止录音
    async _stop() {
        if (!this.state.recording) {
          console.warn('Can\'t stop, not recording!');
          return;
        }
  
        this.setState({stoppedRecording: true, recording: false});
  
        try {
          const filePath = await AudioRecorder.stopRecording();
  
          if (Platform.OS === 'android') {
            this._finishRecording(true, filePath);
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

    // 完成记录
    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        console.warn(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    componentDidMount() {
        // 页面加载完成后获取权限
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });
    
            if (!isAuthorised) return;
    
            this.prepareRecordingPath(this.state.audioPath);
    
            AudioRecorder.onProgress = (data) => {
              this.setState({currentTime: Math.floor(data.currentTime)});
            };
    
            AudioRecorder.onFinished = (data) => {
              // Android callback comes in the form of a promise instead.
              if (Platform.OS === 'ios') {
                this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
              }
            };
        });
    }

    componentWillMount() {
        this.demoAudio = require('../../../assets/sound/prompt.mp3');
        this.prompt = new Sound(this.demoAudio, (e) => {
            if (e) {
                return;
            }
        });
    }

    componentWillUnmount() {
        this.prompt.release();
    }

    voicePlay(){
        this.voiceAnimation.play();
        Vibration.vibrate(50);
        this._record();
    }

    voiceStop(){
        this.voiceAnimation.reset();
        this.prompt.play();
        // this._play();
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
                <View style={styles.container}>
                    {this._renderButton("RECORD 录音", () => {this._record()}, this.state.recording )}
                    {this._renderButton("PLAY 播放", () => {this._play()} )}
                    {this._renderButton("STOP 停止", () => {this._stop()} )}
                    <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                </View>
                {/* <ScrollView>
                    
                </ScrollView> */}
                <View style={styles.voice}>
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
                            onPressIn={()=>{this.voicePlay()}}
                            onPress={()=>{this.voiceStop()}}
                        >
                            <View style={styles.voice_btn}></View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    },
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
