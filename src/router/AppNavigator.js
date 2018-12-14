import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

import WelcomePage from '../components/common/welcome';
import HomePage from '../components/project/home';


const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage
        },
        Home: {
            screen: HomePage
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