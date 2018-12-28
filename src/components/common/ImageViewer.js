import ImageViewer from 'react-native-image-zoom-viewer';

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
} from '../../constants/util';

export default class ImageViewerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: this.props.navigation.state.params.image,
            imageIndex: this.props.navigation.state.params.num,
        };
    }
    componentWillMount() {
    }

    render() {
        return (
            <View style={{flex:1, height:screen.height, width:screen.width, backgroundColor: '#000'}}>
                <ImageViewer
                    style={{flex:1, height:screen.height, width:screen.width}}
                    imageUrls={this.state.images} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={this.state.imageIndex} // 初始显示第几张
                    // failImageSource={} // 加载失败图片
                    onChange={(index) => {}} // 图片切换时触发
                    onClick={() => { // 图片单击事件
                        this.props.navigation.pop();
                    }}
                />
            </View>
        );
    }
}