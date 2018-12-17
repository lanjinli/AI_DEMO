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
    BackHandler
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import NavigationBar from '../navigation/NavigationBar';
import {HomeData} from '../../store/config';

export default class Aside extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeList: HomeData
        };
    }

    //关闭侧栏抽屉
    pressGetPage(name, item) {
        this.props.navigation.navigate(name, {data: item});
        // this.props.navigation.closeDrawer();
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={[styles.flex]}>
                <View style={styles.logo_wrap}>
                    <Image source={require("../../assets/image/logo.png")} style={styles.logo} />
                </View>
                <ScrollView>
                    <View style={styles.list}>
                        {
                            this.state.homeList.map((item, index) => {
                                return (
                                <TouchableHighlight
                                    style={styles.btn}
                                    activeOpacity={0.85}
                                    underlayColor={'white'}
                                    key={index}
                                    onPress={() => {this.pressGetPage(item.page, item)}}
                                >
                                    <Text style={styles.text}>{item.title}</Text>
                                </TouchableHighlight>)
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    flex: {
        paddingTop: STATUS_BAR_HEIGHT,
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    logo_wrap: {
        width: '100%',
        height: 160,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 64,
        height: 64,
    },
    list: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    btn: {
        height: 56,
        width: '100%',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '100',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
});
