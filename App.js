import React from 'react';
import HomePage from "./src/home/home.js";
import LoginPage from "./src/login/login.js";
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    const ReactNative = require('react-native');
    try {
      ReactNative.I18nManager.allowRTL(false);
    } catch (e) {
    console.log(e);
}
  }

  render() {
    return <HomePage />;
  }
}
