import React, { Component } from 'react';
import { Container,Separator,Toast, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Button , Text, Title, Icon } from 'native-base';
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
  } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  AsyncStorage,
  Dimensions,
  ListView,
  TextInput,
  BackHandler
} from 'react-native';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});


var API_URL = require('../config/config.js');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dialogContentView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navigationBar: {
      borderBottomColor: '#b5b5b5',
      borderBottomWidth: 0.5,
      backgroundColor: '#ffffff',
    },
    navigationTitle: {
      padding: 10,
    },
    navigationButton: {
      padding: 10,
    },
    navigationLeftButton: {
      paddingLeft: 20,
      paddingRight: 40,
    },
    navigator: {
      flex: 1,
      // backgroundColor: '#000000',
    },
    wrapper: {
    paddingTop: 50,
    flex: 1
  },
  modal3: {
    height: '70%',
    width: '85%'
  },


  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,
    textAlign: 'center',
    direction:'rtl'
  }

  });

  
  const scaleAnimation = new ScaleAnimation();

class game extends Component {
    constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      refresher:[],
      selected :0
    };

    global.renderer = [];
  }

  


  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('MainPage');
      return true;
    });
  }



  render() {
    return (
      <Container>

      <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.navigate('MainPage')}}>
            <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white",width:'20%'}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>بازی</Title>
        </Right>
      </Header>

        
        
        

        <Content>
        <View style={{width:Dimensions.get('window').width*19/20,alignSelf:'center',justifyContent:'center', height:Dimensions.get('window').width*15/20,elevation:1000,borderRadius:32,backgroundColor:'#336799',marginTop:20}}>
        <Text style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/25,lineHeight:Dimensions.get('window').height*1/20,textAlign:'center',top:20,color:'white'}}>بازی</Text>
        <Image source={require('./appgame.png')} style={{justifyContent: 'center',alignSelf:'center',width:Dimensions.get('window').width*4/8 , height : null , aspectRatio:1}} />
        <Text style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/25,lineHeight:Dimensions.get('window').height*1/20,textAlign:'center',bottom:0,color:'white'}}>دانلود بازی</Text>
        </View>

        <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between',borderRadius:32 ,marginTop:50,width:Dimensions.get('window').width*7/10}}>
        <TouchableOpacity onPress={()=>{Linking.openURL('https://new.sibapp.com/applications/productname-5')}}>
            <Image source={require('./appstore.png')} style={{justifyContent: 'center',alignSelf:'center',width:Dimensions.get('window').width*1/3 , height : null , aspectRatio:1}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Linking.openURL('http://104.248.251.209/buruxgame.apk')}}>
            <Image source={require('./googleplay.png')} style={{justifyContent: 'center',alignSelf:'center',width:Dimensions.get('window').width*1/3 , height : null , aspectRatio:1}} />
        </TouchableOpacity>
        </View>

        
          
        </Content>
      </Container>
    );
  }
}

export default game;