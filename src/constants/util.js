import React from 'react';
import {
    Platform,
    PixelRatio,
    NativeModules,
    ImageEditor,
    ImageStore
} from 'react-native';
import Toast from 'react-native-root-toast';

export const Demensions = require('Dimensions');
export const screen  = Demensions.get('screen');
export const windowScreen = Demensions.get('window');

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { StatusBarManager } = NativeModules;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' && ((screen.height === X_HEIGHT && screen.width === X_WIDTH) || (screen.height === X_WIDTH && screen.width === X_HEIGHT))
    )
}

export function ifIphoneX (iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else {  
        return regularStyle;
    }
}

export const STATUS_BAR_HEIGHT = Platform.select({
    ios: ifIphoneX(44,20),
    android: StatusBarManager.HEIGHT
});

export const NAVBSR_HEIGHT = Platform.select({
    ios: 44,
    android: 50,
});

let toast;
export const toastUtil = (content, time = 'SHORT') => {
    if (toast !== undefined) {
      Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations[time],
        position: Toast.positions.BOTTOM,
        animation: true,
        shadow: false,
        backgroundColor: 'rgba(0,0,0,.8)',
        hideOnPress: true,
        delay: 0,
        opacity: 1,
        containerStyle: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 3,
        },
        textStyle: {
            fontSize: 14,
            lineHeight: 18,
        },
    });
};


export const GetImageBase64 = (data, callback) => {
    ImageEditor.cropImage(data.uri,{
        size: {
            width: data.width,
            height: data.height,
        },
        offset:{
            x:0,
            y:0
        }
    },uri=>{
        ImageStore.getBase64ForTag(uri, base64ImageData=>{
            // ImageStore.removeImageForTag(uri);
            let imgWidth,imgHeight;
            if(data.width > data.height){
                imgWidth = screen.width;
                imgHeight = data.height/(data.width/screen.width);
            }else if(data.width < data.height){
                imgWidth = data.width/(data.height/screen.width);
                imgHeight = screen.width;
            }else{
                imgWidth = screen.width;
                imgHeight = screen.width;
            }
            callback({
                base64: base64ImageData,
                width: imgWidth,
                height: imgHeight
            });
        },err=>{
            // ImageStore.removeImageForTag(uri);
            toastUtil('加载预设图片失败');
        })
    },err=>{
        toastUtil('加载预设图片失败');
    })
}