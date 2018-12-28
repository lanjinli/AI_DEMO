export const HomeData = [
    {
        img: require('../assets/image/home_icon_01.png'),
        title: '计算机视觉',
        summary: '光学字符识别技术\n精准快速识别信息',
        page: 'List',
        children: [
            {
                img: require('../assets/image/icon_ocr_01.png'),
                title: '手写体OCR',
                summary: '检测和识别图像上面手写体的字段信息',
                page: 'OcrHandwritingocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/ai/assets/ai-demo/large/hd-7-lg.jpg',
                    width: 600,
                    height: 600
                }
            },
            {
                img: require('../assets/image/icon_ocr_02.png'),
                title: '通用OCR',
                summary: '识别上传图像上面的字段信息',
                page: 'OcrGeneralocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/aiplat/static/ai-demo/large/o-6.jpg',
                    width: 600,
                    height: 600
                }
            },
            {
                img: require('../assets/image/icon_ocr_03.png'),
                title: '身份证OCR',
                summary: '识别身份证图像上面的详细身份信息',
                page: 'OcrIdcardocr',
            },
            {
                img: require('../assets/image/icon_ocr_04.png'),
                title: '行驶证OCR',
                type: 0,
                summary: '识别行驶证图像上面的字段信息',
                page: 'OcrDriverlicenseocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/aiplat/static/ai-demo/large/odemo-pic-3.jpg',
                    width: 800,
                    height: 512
                }
            },
            {
                img: require('../assets/image/icon_ocr_05.png'),
                title: '驾驶证OCR',
                type: 1,
                summary: '识别驾驶证图像上面的字段信息',
                page: 'OcrDriverlicenseocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/aiplat/static/ai-demo/large/odemo-pic-4.jpg',
                    width: 680,
                    height: 436
                }
            },
            {
                img: require('../assets/image/icon_ocr_06.png'),
                title: '营业执照OCR',
                summary: '识别营业执照上面的字段信息',
                page: 'OcrBizlicenseocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/aiplat/static/ai-demo/large/odemo-pic-5.jpg',
                    width: 500,
                    height: 693
                }
            },
            {
                img: require('../assets/image/icon_ocr_07.png'),
                title: '银行卡OCR',
                summary: '识别银行卡上面的字段信息',
                page: 'OcrCreditcardocr',
                preset: {
                    uri: 'https://p.qpic.cn/zc_pic/0/1ccd9a5be6a581a0b0b28ad0af49117815222914526139/0',
                    width: 600,
                    height: 300
                }
            },
            {
                img: require('../assets/image/icon_ocr_08.png'),
                title: '车牌OCR',
                summary: '识别车牌上面的字段信息',
                page: 'OcrPlateocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/ai/assets/ai-demo/large/plate-1-lg.jpg',
                    width: 400,
                    height: 400
                }
            },
            {
                img: require('../assets/image/icon_ocr_09.png'),
                title: '名片OCR',
                summary: '识别名片图像上面的字段信息',
                page: 'OcrBcocr',
                preset: {
                    uri: 'https://yyb.gtimg.com/aiplat/static/ai-demo/large/odemo-pic-2.jpg',
                    width: 408,
                    height: 226
                }
            }
        ]
    },
    {
        img: require('../assets/image/home_icon_03.png'),
        title: '智能语音交互',
        summary: '依托深度学习算法\n合成语音自然流畅',
        page: 'List',
        children: [
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '语音识别-echo版',
                summary: '对音频进行语音识别，并返回语音的文字内容',
                page: 'AaiAsr'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '语音识别-AI Lab',
                summary: '对音频进行流式识别，轻松实现边录音边识别',
                page: 'AaiAsrs'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '语音识别-WeChat AI',
                summary: '对音频进行流式识别，轻松实现边录音边识别',
                page: 'AaiWxasrs'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '长语音识别',
                summary: '上传长音频，提供回调接口，异步获取识别结果',
                page: 'AaiWxasrlong'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '关键词检索',
                summary: '上传长音频，提供回调接口，异步获取识别结果',
                page: 'AaiDetectkeyword'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '语音合成-AI Lab',
                summary: '将文字转换为语音，返回文字的语音数据',
                page: 'AaiTts'
            },
            {
                img: require('../assets/image/icon_aai_01.png'),
                title: '语音合成-优图',
                summary: '将文字转换为语音，返回文字的语音数据',
                page: 'AaiTta'
            }
        ]
    },
    {
        img: require('../assets/image/home_icon_02.png'),
        title: '自然语言处理',
        summary: '海量数据进行建模\n准确理解用户意图',
        page: 'List',
        children: []
    },
    {
        img: require('../assets/image/home_icon_04.png'),
        title: '第三方组件',
        summary: 'React Native\n常用第三方组件',
        page: 'List',
        children: [
            {
                img: require('../assets/image/icon_app.png'),
                title: '高德定位',
                summary: 'react-native-amap-geolocation',
                page: 'RnGeoLocation'
            },
            {
                img: require('../assets/image/icon_app.png'),
                title: '高德地图',
                summary: 'react-native-amap3d',
                page: 'RnAmap3d'
            },
            {
                img: require('../assets/image/icon_app.png'),
                title: 'swiper轮播',
                summary: 'react-native-swiper',
                page: 'RnSwiper'
            },
            {
                img: require('../assets/image/icon_app.png'),
                title: 'ScrollableTab',
                summary: 'react-native-scrollable-tab-view',
                page: 'RnScrollableTab'
            },
            {
                img: require('../assets/image/icon_app.png'),
                title: 'WebView',
                summary: 'WebView',
                page: 'RnWebView'
            },
            {
                img: require('../assets/image/icon_app.png'),
                title: 'RN & H5',
                summary: 'RN & H5',
                page: 'RnWebViewMsg'
            },
            // {
            //     img: require('../assets/image/icon_app.png'),
            //     title: '模态窗',
            //     summary: 'react-native-modalbox',
            //     page: 'RnModalbox'
            // },
            // {
            //     img: require('../assets/image/icon_app.png'),
            //     title: '选择图像',
            //     summary: 'react-native-image-picker',
            //     page: 'OcrHandwritingocr'
            // },
            // {
            //     img: require('../assets/image/icon_app.png'),
            //     title: '列表组件',
            //     summary: '',
            //     page: 'RnList'
            // },
            // {
            //     img: require('../assets/image/icon_app.png'),
            //     title: '轮播组件',
            //     summary: 'react-native-snap-carousel',
            //     page: 'RnSnapCarousel'
            // },
            // {
            //     img: require('../assets/image/icon_app.png'),
            //     title: '对话框',
            //     summary: 'react-native-popup-dialog',
            //     page: 'RnDialog'
            // }
        ]
    }
];