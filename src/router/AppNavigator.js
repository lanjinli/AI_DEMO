import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

import WelcomePage from '../components/common/welcome';


const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage
        },
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