import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Demensions,
    ScreenWidth,
    ScreenHeight,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import NavigationBar from '../../navigation/NavigationBar';
import httpService from '../../../service/httpService';
import formatJson from '../../../constants/formatJson';