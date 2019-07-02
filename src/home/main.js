import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Left, Right, Title, Body, FooterTab, Footer } from 'native-base';
import {Text,Dimensions,Platform, Image} from 'react-native';
import { TabNavigator } from "react-navigation";
import register from '../register/register';
import firstPage from './firstPage';
import LoginPage from '../login/login';
import ProductLists from '../Products/productLists.js';
import orders from '../orders/orders.js';

var firstselectedTitle = 'خانه';
var secondselectedTitle = '';
var thirdselectedTitle = '';
var gone = 'yes';


export default (main = TabNavigator(
    {
      FirstPage: { screen: firstPage },
      JadeChat: { screen: ProductLists },
      NineChat: { screen: orders }
    },
    {
      tabBarPosition: "bottom",
      tabBarComponent: props => {
        if(props.navigation.getParam('goback') == 'yes' && gone == 'yes'){
          props.navigation.navigate("MainPage",{goback:'no'});
          props.navigation.navigate('FirstPage');
          firstselectedTitle = 'خانه';
          secondselectedTitle = '';
          thirdselectedTitle = '';
          gone = 'no';
        }
        return (
        <Footer style={{bottom:0,height:Dimensions.get('window').height*1/12}}>
          <FooterTab style={{backgroundColor:"#336799"}}>
            <Button vertical style={{backgroundColor:"#336799"}}
            active={props.navigationState.index === 0}
            onPress={() => {firstselectedTitle = 'خانه'; secondselectedTitle = ''; thirdselectedTitle = ''; props.navigation.navigate("FirstPage"); gone = 'yes';}}>
              <Icon name={props.navigationState.index === 0 ? "ios-home" :"ios-home-outline"} style={{color:"white",fontSize:Dimensions.get('window').height*1/30}}/>
              <Text style={{color:"white", fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/55}}>{firstselectedTitle}</Text>
            </Button>
            <Button vertical style={{backgroundColor:"#336799"}}
            active={props.navigationState.index === 1}
            onPress={() => {firstselectedTitle = ''; secondselectedTitle = 'سفارش های من'; thirdselectedTitle = '';props.navigation.navigate("JadeChat",{token : window.access_token}); gone = 'yes';}}>
              <Icon name={props.navigationState.index === 1 ? "ios-archive" :"ios-archive-outline"}  style={{color:"white",fontSize:Dimensions.get('window').height*1/30}} />
              <Text style={{color:"white", fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/55}}>{secondselectedTitle}</Text>
            </Button>
            <Button vertical style={{backgroundColor:"#336799"}}
            active={props.navigationState.index === 2}
            onPress={() => {firstselectedTitle = ''; secondselectedTitle = ''; thirdselectedTitle = 'سفارشات'; props.navigation.navigate("NineChat"); gone = 'yes';}}>
              <Icon name={props.navigationState.index === 2 ? "ios-cart" :"ios-cart-outline"} style={{color:"white",fontSize:Dimensions.get('window').height*1/30}} />
              <Text style={{color:"white", fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/55}}>{thirdselectedTitle}</Text>
            </Button>
            </FooterTab>
        </Footer>
    );
  }
}
)
);