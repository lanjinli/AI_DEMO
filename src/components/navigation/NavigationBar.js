import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    StatusBar,
    NativeModules
} from 'react-native';
import {
    Demensions,
    ScreenWidth,
    ScreenHeight,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import PropTypes from 'prop-types';
const StatusBarShape={
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool
}

export default class NavigationBar extends Component {
    static propTypes={
        style: View.propTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape)
    }
    static defaultProps={
        statusBar: {
            barStyle: 'dark-content',
            hidden: false,
            animated: false,
            translucent: true,
            networkActivityIndicatorVisible: false,
            showHideTransition: 'fade'
        }
    }
    constructor(props){
        super(props);
        this.state={
            title: '',
            hide: false
        }
    }
    componentWillMount() {
    }
    render() {
        let status = <View style={[...this.props.style,styles.statusBar]}>
            <StatusBar
                {...this.props.statusBar}
                backgroundColor={this.props.style.backgroundColor}
            />
        </View>
        let titleView = this.props.titleView?this.props.titleView:<Text style={styles.titleViewContainerText}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>
        return (
            <View style={[styles.container, this.props.style]}>
                {status}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: NAVBSR_HEIGHT + STATUS_BAR_HEIGHT,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
    },
    navBar: {
        width: ScreenWidth,
        height: NAVBSR_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 44,
        right: 44,
        top: 0,
        bottom: 0
    },
    titleViewContainerText: {
        color: '#1d1d1d',
        fontSize: 18,
    }
});
