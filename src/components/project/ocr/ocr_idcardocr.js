import * as Animatable from 'react-native-animatable';

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
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode, OcrApi} from '../../../service/urlService';
import formatJson from '../../../constants/formatJson';
import ToastLoading from '../../common/ToastLoading';

export default class OcrIdcardocr extends Component {

    constructor() {
        super();
        this.state = {
            ModalView: false,
            CameraView: false,
            idCardFrontData: null,
            idCardBackData: null,
            requestStatus: false,
            resultData: null,
            FrontJson: null,
            BackJson: null,
        };
    }

    getTakePicture(name, item) {
        this.props.navigation.navigate(name, item);
    }

    // 请求接口
    requestApi(card_type, image){
        this._isMounted = true;

        let data = {
            "app_id": AppId,
            "time_stamp": Math.round(new Date().getTime()/1000).toString(),
            "nonce_str": Math.floor(Math.random()*100000).toString(),
            "sign": "",
            "image": image,
            "card_type": card_type,
        }
        HttpService.post(SignUrl,{
            'url': OcrApi.ocr_idcardocr,
            'params': data
        })
        .then(result=>{
            console.log(result);

            if(!this._isMounted)return;

            if(!this.state.requestStatus) return;

            if(typeof result == "object"){
                if(card_type == 0){
                    this.setState({
                        resultData: result.data,
                        FrontJson: result,
                        // idCardFrontData: result.data.frontimage,
                    });
                }else if(card_type == 1 && this.state.FrontJson){
                    let newData = this.state.resultData;
                    newData.backimage = result.data.backimage;
                    newData.valid_date = result.data.valid_date;
                    newData.authority = result.data.authority;
                    this.setState({
                        resultData: newData,
                        BackJson: result
                    });
                }else if(card_type == 1 && !this.state.FrontJson){
                    this.setState({
                        resultData: result.data,
                        BackJson: result,
                        // idCardBackData: result.data.backimage,
                    });
                }
            }else{
                if(card_type){
                    toastUtil('反面识别失败，未知错误');
                }else{
                    toastUtil('正面识别失败，未知错误');
                }
            }

            if(card_type == 0 && !this.state.idCardBackData){
                this.setState({
                    requestStatus: false
                });
            }else if(card_type == 0 && this.state.idCardBackData){
                this.requestApi(1, this.state.idCardBackData);
            }else if(card_type == 1){
                this.setState({
                    requestStatus: false
                });
            }
        })
        .catch(error=>{
            console.log(error);
            if(!this._isMounted)return;
            if(!this.state.requestStatus) return;
            this.setState({
                requestStatus: false
            });
            if(card_type){
                toastUtil('反面识别失败，未知错误');
            }else{
                toastUtil('正面识别失败，未知错误');
            }
        })
    }

    // 开始识别
    startIdentify(){
        if(this.state.requestStatus)return;
        if(this.state.idCardFrontData || this.state.idCardBackData){
            this.setState({
                requestStatus: true,
                // resultData: null,
                // FrontJson: null,
                // BackJson: null,
            });
        }
        if(this.state.idCardFrontData){
            this.requestApi(0, this.state.idCardFrontData);
        }else if(this.state.idCardBackData){
            this.requestApi(1, this.state.idCardBackData);
        }else{
            toastUtil('请先拍摄身份证照片');
        }
    }

    // 绑定返回
    componentWillMount() {
        this._isMounted = true;
        if (Platform.OS === 'android') {
            this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
                BackHandler.addEventListener('hardwareBackPress', this.cancelRequest)
            );
        }
    }
    
    // 取消返回
    componentDidMount() {
        this._isMounted = false;
        if (Platform.OS === 'android') {
            this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
                BackHandler.removeEventListener('hardwareBackPress', this.cancelRequest)
            );
        }
    }

    // 取消请求
    cancelRequest = () => {
        if(this.state.requestStatus){
            this.setState({
                requestStatus: false
            });
            return true;
        }
        return false;
    };

    render() {
        const { data } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={data.title}
                    style={{
                        backgroundColor: '#fff',
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
                            {
                                (this.state.FrontJson && this.state.FrontJson.ret == 0 && !this.state.requestStatus)?(
                                    <Image style={{ width: 300, height: 190 }} source={ {uri: 'data:image/jpeg;base64,' + this.state.resultData.frontimage} } />
                                ):(
                                    <Image style={{ width: 300, height: 190 }} source={ this.state.idCardFrontData?{uri: 'data:image/jpeg;base64,' + this.state.idCardFrontData}:require("../../../assets/image/front_effect.png") } />
                                )
                            }
                            <Text style={styles.viewport_text}>正面</Text>
                            <View style={styles.choice_wrap}>
                                <Animatable.View animation="fadeInUp" duration={600} delay={400} easing="ease-out" iterationCount={1}>
                                    <TouchableOpacity
                                        style={[styles.choice_btn]}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            this.getTakePicture(
                                                'TakePicture',
                                                {
                                                    data: {
                                                        type: 'idcard',
                                                        side: 0,
                                                        effect: require("../../../assets/image/idcard_front_effect.png"),
                                                        width: screen.width - 100,
                                                        height: 860*((screen.width - 100)/545),
                                                    },
                                                    callback: ((info) => {
                                                        this.setState({
                                                            idCardFrontData: info,
                                                            resultData: null,
                                                            FrontJson: null,
                                                            BackJson: null,
                                                        })
                                                    })
                                                }
                                            )}
                                        }
                                    >
                                            <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../../assets/image/icon_camera.png")} />
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                        </View>
                        <View style={styles.viewport_item}>
                            {
                                (this.state.BackJson && this.state.BackJson.ret == 0 && !this.state.requestStatus)?(
                                    <Image style={{ width: 300, height: 190 }} source={ {uri: 'data:image/jpeg;base64,' + this.state.resultData.backimage} } />
                                ):(
                                    <Image style={{ width: 300, height: 190 }} source={ this.state.idCardBackData?{uri: 'data:image/jpeg;base64,' + this.state.idCardBackData}:require("../../../assets/image/back_effect.png") } />
                                )
                            }
                            <Image style={{ width: 300, height: 190 }} source={ this.state.idCardBackData?{uri: 'data:image/jpeg;base64,' + this.state.idCardBackData}:require("../../../assets/image/back_effect.png") } />
                            <Text style={styles.viewport_text}>反面</Text>
                            <View style={styles.choice_wrap}>
                                <Animatable.View animation="fadeInUp" duration={600} delay={700} easing="ease-out" iterationCount={1}>
                                    <TouchableOpacity
                                        style={[styles.choice_btn]}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            this.getTakePicture(
                                                'TakePicture',
                                                {
                                                    data: {
                                                        type: 'idcard',
                                                        side: 1,
                                                        effect: require("../../../assets/image/idcard_back_effect.png"),
                                                        width: screen.width - 100,
                                                        height: 860*((screen.width - 100)/545),
                                                    },
                                                    callback: ((info) => {
                                                        this.setState({
                                                            idCardBackData: info,
                                                            resultData: null,
                                                            FrontJson: null,
                                                            BackJson: null,
                                                        })
                                                    })
                                                }
                                            )}
                                        }
                                    >
                                        <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../../assets/image/icon_camera.png")} />
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={() => {this.startIdentify()}}
                        >
                            <Text style={styles.btn_text}>识别 {data.title}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        ( (this.state.FrontJson && this.state.FrontJson.ret == 0) || (this.state.BackJson && this.state.BackJson.ret == 0) ) && this.state.resultData && (
                            <View style={styles.results}>
                                <View style={styles.TextView}>
                                    <Text style={styles.results_text}>姓名：{this.state.resultData.name}</Text>
                                    <Text style={styles.results_text}>性别：{this.state.resultData.sex}</Text>
                                    <Text style={styles.results_text}>民族：{this.state.resultData.nation}</Text>
                                    <Text style={styles.results_text}>出生日期：{this.state.resultData.birth}</Text>
                                    <Text style={styles.results_text}>地址：{this.state.resultData.address}</Text>
                                    <Text style={styles.results_text}>身份证号：{this.state.resultData.id}</Text>
                                    <Text style={styles.results_text}>证件的有效期：{this.state.resultData.valid_date}</Text>
                                    <Text style={styles.results_text}>发证机关：{this.state.resultData.authority}</Text>
                                </View>
                            </View>
                        )
                    }
                    {
                        ( (this.state.FrontJson && this.state.FrontJson.ret != 0) || (this.state.BackJson && this.state.BackJson.ret != 0) ) && <View style={styles.results}>
                            {
                                (this.state.FrontJson && this.state.FrontJson.ret != 0) && <Text style={styles.results_err_text}>
                                    {this.state.FrontJson && '正面错误码：'+this.state.FrontJson.ret}
                                    &nbsp;&nbsp;
                                    {
                                        this.state.FrontJson && (
                                            this.state.FrontJson.ret > 0 ? ErrCode[this.state.FrontJson.ret]:'系统出错'
                                        )
                                    }
                                </Text>
                            }
                            {
                                (this.state.BackJson && this.state.BackJson.ret != 0) && <Text style={styles.results_err_text}>
                                    {this.state.BackJson && '反面错误码：'+this.state.BackJson.ret}
                                    &nbsp;&nbsp;
                                    {
                                        this.state.BackJson && (
                                            this.state.BackJson.ret > 0 ? ErrCode[this.state.BackJson.ret]:'系统出错'
                                        )
                                    }
                                </Text>
                            }
                        </View>
                    }
                </ScrollView>
                {this.state.requestStatus && <ToastLoading/>}
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
    viewport_text: {
        color: '#fff',
        fontSize: 12,
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    choice_wrap: {
        width: 42,
        height: 42,
        position: 'absolute',
        bottom: 190/2 - 21,
        left: 300/2 - 21,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    choice_btn: {
        borderRadius: 21,
        overflow: 'hidden',
        height: 42,
        width: 42,
        backgroundColor: 'rgba(0,0,0,.3)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
