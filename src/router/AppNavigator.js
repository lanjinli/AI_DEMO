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
            screen: HomeDrawerNavigator,
            navigationOptions: {
                header: () => null
            }
        },
        Info: {
            screen: InfoPage,
            navigationOptions: {
                header: () => null
            }
        },
        List: {
            screen: ListPage,
            navigationOptions: {
                header: () => null
            }
        },
        TakePicture: {
            screen: TakePicturePage,
            navigationOptions: {
                header: () => null
            }
        },
        ImageViewer: {
            screen: ImageViewerPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrHandwritingocr: {
            screen: OcrHandwritingocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrGeneralocr: {
            screen: OcrGeneralocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrIdcardocr: {
            screen: OcrIdcardocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrDriverlicenseocr: {
            screen: OcrDriverlicenseocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrBizlicenseocr: {
            screen: OcrBizlicenseocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrCreditcardocr: {
            screen: OcrCreditcardocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrPlateocr: {
            screen: OcrPlateocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        OcrBcocr: {
            screen: OcrBcocrPage,
            navigationOptions: {
                header: () => null
            }
        },
        AaiAsr: {
            screen: AaiAsrPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnGeoLocation: {
            screen: RnGeoLocationPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnAmap3d: {
            screen: RnAmap3dPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnSwiper: {
            screen: RnSwiperPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnScrollableTab: {
            screen: RnScrollableTabPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnWebView: {
            screen: RnWebViewPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnWebViewMsg: {
            screen: RnWebViewMsgPage,
            navigationOptions: {
                header: () => null
            }
        },
        RnImageViewer: {
            screen: RnImageViewerPage,
            navigationOptions: {
                header: () => null
            }
        }
    },
    {
        initialRouteName: 'Welcome',
        navigationOptions: {
            header: () => null
        },
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
    }
);

export default createAppContainer(AppNavigator);