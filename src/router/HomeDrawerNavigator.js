import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

import HomePage from '../components/project/home';
import Aside from '../components/project/aside';

export const HomeDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomePage,
        }
    },
    {
        drawerWidth: 220, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentComponent: Aside,  // 自定义抽屉组件
        useNativeAnimations: true, // 使用原生动画
        contentOptions: {
            initialRouteName: HomePage, // 默认页面组件
        },
        backBehavior: 'none'
    }
);

export default createAppContainer(HomeDrawerNavigator);