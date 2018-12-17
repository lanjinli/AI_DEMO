import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import NavigationBar from '../navigation/NavigationBar';

export default class ListPage extends Component {

    //跳转页面
    pressGetPage (item) {
        if(item.page){
            this.props.navigation.navigate(item.page, {data: item});
        }else{
            toastUtil('正在开发中，敬请期待')
        }
    };

    render() {
        const {data} = this.props.navigation.state.params;
        return (
            <View style={[styles.flex, { backgroundColor: '#FFF' }]}>
                <NavigationBar
                    title={data.title}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => (this.props.navigation.goBack())} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={styles.banner}>
                        <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#1b4fd5', '#1657da']} style={styles.banner_bg}>
                            <Animatable.View animation="pulse" duration={1000} iterationDelay={1000} iterationCount="infinite" direction="normal">
                                <Image source={data.img} style={styles.banner_img} />
                            </Animatable.View>
                            <Text style={styles.banner_text}>{data.summary}</Text>
                        </LinearGradient>
                    </View>
                    <Animatable.View animation="fadeInUp" duration={1000} iterationDelay={300} iterationCount={1} direction="normal">
                    <View style={styles.b_list}>
                        {
                            data.children.length ? (
                                data.children.map((item, index) => {
                                    return (<TouchableOpacity
                                        style={styles.b_l_btn}
                                        activeOpacity={0.4}
                                        underlayColor={'white'}
                                        key={index}
                                        onPress={() => {this.pressGetPage(item)}}
                                    >
                                        <View style={styles.b_l_btn_wrap}>
                                            <Image source={item.img} style={styles.b_l_btn_icon} />
                                            <Text style={styles.b_l_btn_text}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>);
                                })
                            ):(
                                <View style={styles.null}>
                                    <Image source={require("../../assets/image/developing.png")} style={styles.null_img} />
                                    <Text style={styles.null_text}>努力开发中</Text>
                                </View>
                            )
                        }
                    </View>
                    {
                        data.children.length ? (
                            <View style={styles.b_foot}>
                                <Text style={styles.b_f_text}>腾讯AI开放平台</Text>
                            </View>
                        ):false
                    }
                    </Animatable.View>
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
    banner: {
        height: 150,
        width: screen.width,
    },
    banner_bg: {
        height: 150,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    banner_img: {
        flex: 0,
        width: 160,
        height: 101,
    },
    banner_text: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        lineHeight: 32,
        textAlign: 'center',
        marginRight: 20,
        fontWeight: '100',
        opacity: 0.9
    },
    b_list: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    b_l_btn: {
        width: (screen.width - 30) / 2,
        height: 94,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#f5f6f6',
    },
    b_l_btn_wrap:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    b_l_btn_icon: {
        flex: 0,
        width: 38,
        height: 38,
    },
    b_l_btn_text: {
        flex: 0,
        color: '#464c56',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 10,
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
    },
    null: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: screen.height - (160 + 44 + NAVBSR_HEIGHT + STATUS_BAR_HEIGHT),
    },
    null_img: {
        width: 160,
        height: 116
    },
    null_text: {
        fontSize: 15,
        color: '#1e1e1e',
        textAlign: 'center',
        marginTop: 10,
    }
});
