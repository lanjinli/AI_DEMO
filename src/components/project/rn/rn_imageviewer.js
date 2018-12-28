import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


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
} from 'react-native';
import {
    Demensions,
    screen,
    windowScreen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil,
} from '../../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import HttpService from '../../../service/httpService';
import {SignUrl, AppId, ErrCode, AaiApi} from '../../../service/urlService';
import ToastLoading from '../../common/ToastLoading';

export default class RnImageViewer extends Component {

    constructor() {
        super();
        this.state = {
            imageData: [
                {
                    url: 'https://images.unsplash.com/photo-1545826394-68be0015475b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545826136-cab5e844628b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545781025-a614245d80f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545830284-1777ef6d3791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545830545-6de7c073ae7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545835386-229452c26183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545850662-257ab61ea0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545832420-47940f77a326?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545842631-c514e4122f51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545846340-a45d67f2c377?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },{
                    url: 'https://images.unsplash.com/photo-1545844895-1bf88a0213a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ]
        };
    }

    _renderImageList(){
        let listData = this.state.imageData;
        let list = [];
        let row = [];
        listData.forEach((item, index)=>{
            row.push(<TouchableOpacity
                    style={styles.imgBox}
                    activeOpacity={0.8}
                    key={index}
                    onPress={()=>{this.showImg(index)}}>
                <Image style={styles.img} source={{uri: item.url}} />
            </TouchableOpacity>);
            if((index+1)%4 == 0 ){
                list.push(<View style={styles.imgRow} key={index}>{row}</View>);
                row = [];
            }
        });
        if(row.length){
            list.push(<View style={styles.imgRow} key={listData.length}>{row}</View>);
            row = [];
        }
        return (
            <View style={styles.imgList}>
                {list}
            </View>
        )
    }

    showImg(index){
        this.props.navigation.navigate('ImageViewer',{'image': this.state.imageData, 'num': index})
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
                    {this._renderImageList()}
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
    imgList: {
        paddingTop: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imgRow: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imgBox: {
        width: (screen.width - 25)/4,
        height: (screen.width - 25)/4,
        marginLeft: 5,
    },
    img: {
        width: (screen.width - 25)/4,
        height: (screen.width - 25)/4,
        backgroundColor: '#f1f1f1'
    }
});
