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
            },
            {
                img: require('../assets/image/icon_ocr_02.png'),
                title: '通用OCR',
                summary: '识别上传图像上面的字段信息',
                page: 'OcrGeneralocr',
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
            },
            {
                img: require('../assets/image/icon_ocr_05.png'),
                title: '驾驶证OCR',
                type: 1,
                summary: '识别驾驶证图像上面的字段信息',
                page: 'OcrDriverlicenseocr',
            },
            {
                img: require('../assets/image/icon_ocr_06.png'),
                title: '营业执照OCR',
                summary: '识别营业执照上面的字段信息',
                page: 'OcrBizlicenseocr',
            },
            {
                img: require('../assets/image/icon_ocr_07.png'),
                title: '银行卡OCR',
                summary: '识别银行卡上面的字段信息',
                page: 'OcrCreditcardocr',
            },
            {
                img: require('../assets/image/icon_ocr_08.png'),
                title: '车牌OCR',
                summary: '识别车牌上面的字段信息',
                page: 'OcrPlateocr',
            },
            {
                img: require('../assets/image/icon_ocr_09.png'),
                title: '名片OCR',
                summary: '识别名片图像上面的字段信息',
                page: 'OcrBcocr',
            }
        ]
    },
    {
        img: require('../assets/image/home_icon_03.png'),
        title: '智能语音交互',
        summary: '依托深度学习算法\n合成语音自然流畅',
        page: 'List',
        children: []
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