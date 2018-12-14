/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigator from './src/router/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <AppNavigator></AppNavigator>
    );
  }
}