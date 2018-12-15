import { createStackNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

import HomeDrawerNavigator from './HomeDrawerNavigator';
import WelcomePage from '../components/common/welcome';
import InfoPage from '../components/project/info';
import ListPage from '../components/project/list';

import OcrHandwritingocrPage from '../components/project/ocr/ocr_handwritingocr';
import OcrGeneralocrPage from '../components/project/ocr/ocr_generalocr';
import OcrIdcardocrPage from '../components/project/ocr/ocr_idcardocr';

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