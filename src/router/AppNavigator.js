import { createStackNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

import HomeDrawerNavigator from './HomeDrawerNavigator';
import WelcomePage from '../components/common/welcome';
import InfoPage from '../components/project/info';
import ListPage from '../components/project/list';

import OcrHandwritingocrPage from '../components/project/ocr/ocr_handwritingocr';
import OcrGeneralocrPage from '../components/project/ocr/ocr_generalocr';
import OcrIdcardocrPage from '../components/project/ocr/ocr_idcardocr';
import OcrDriverlicenseocrPage from '../components/project/ocr/ocr_driverlicenseocr';
import OcrBizlicenseocrPage from '../components/project/ocr/ocr_bizlicenseocr';
import OcrCreditcardocrPage from '../components/project/ocr/ocr_creditcardocr';
import OcrPlateocrPage from '../components/project/ocr/ocr_plateocr';
import OcrBcocrPage from '../components/project/ocr/ocr_bcocr';

import AaiAsrPage from '../components/project/aai/aai_asr';

import RnGeoLocationPage from '../components/project/rn/rn_geolocation';
import RnAmap3dPage from '../components/project/rn/rn_amap3d';
import RnSwiperPage from '../components/project/rn/rn_swiper';
import RnScrollableTabPage from '../components/project/rn/rn_scrollabletab';
import RnWebViewPage from '../components/project/rn/rn_webview';
import RnWebViewMsgPage from '../components/project/rn/rn_webviewmsg';
import RnImageViewerPage from '../components/project/rn/rn_imageviewer';

import TakePicturePage from '../components/common/TakePicture';
import ImageViewerPage from '../components/common/ImageViewer';

const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage
        },
        Home: {
            screen: HomeDrawerNavigator
        },
        Info: {
            screen: InfoPage
        },
        List: {
            screen: ListPage
        },
        TakePicture: {
            screen: TakePicturePage
        },
        ImageViewer: {
            screen: ImageViewerPage
        },
        OcrHandwritingocr: {
            screen: OcrHandwritingocrPage
        },
        OcrGeneralocr: {
            screen: OcrGeneralocrPage
        },
        OcrIdcardocr: {
            screen: OcrIdcardocrPage
        },
        OcrDriverlicenseocr: {
            screen: OcrDriverlicenseocrPage
        },
        OcrBizlicenseocr: {
            screen: OcrBizlicenseocrPage
        },
        OcrCreditcardocr: {
            screen: OcrCreditcardocrPage
        },
        OcrPlateocr: {
            screen: OcrPlateocrPage
        },
        OcrBcocr: {
            screen: OcrBcocrPage
        },
        AaiAsr: {
            screen: AaiAsrPage
        },
        RnGeoLocation: {
            screen: RnGeoLocationPage
        },
        RnAmap3d: {
            screen: RnAmap3dPage
        },
        RnSwiper: {
            screen: RnSwiperPage
        },
        RnScrollableTab: {
            screen: RnScrollableTabPage
        },
        RnWebView: {
            screen: RnWebViewPage
        },
        RnWebViewMsg: {
            screen: RnWebViewMsgPage
        },
        RnImageViewer: {
            screen: RnImageViewerPage
        }
    },
    {
        initialRouteName: 'Welcome',
        defaultNavigationOptions: {
            header: () => null
        },
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
    }
);

export default createAppContainer(AppNavigator);