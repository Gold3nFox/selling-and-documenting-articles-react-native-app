import React, { Component } from 'react';
import { Container, Header, Content, Form, Button ,Icon} from 'native-base';
import {Text, Image,BackHandler,View,Dimensions,Linking,Platform,TouchableOpacity} from 'react-native';
var API_URL = require('../config/config.js');
class starter extends Component {
constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        isDisabled: false,
        swipeToClose: true,
        sliderValue: 0.3,
        mobileNumber: '', 
        verCode: ''
      };
    }

  componentWillMount(){
    this.fetchupdate();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    console.disableYellowBox = true;
  }
  
  fetchupdate(){
    fetch(API_URL+'/auth/shouldupdate/' + this.state.mobileNumber , {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
    .then((responseJson) => { 
      if(responseJson == "true"){
        this.props.navigation.navigate('Update');
      }
      })
    .catch((error) => {
        Toast.show({text: 'اختلال در اتصال به شبکه',textStyle: { textAlign: "right",color:'red' },duration: 30000});
    });
  }
  
  render() {
    return (
      <Container>
        
        <Image source={require('./004.png')} style={{left:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').height, resizeMode:'stretch'}} />
        <Image style={{bottom:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').width,resizeMode:'stretch'}} source={require('./004btm.png')}  />
        
        <Content>



        <Image source={require('./007.png')} style={{width:Dimensions.get('window').width*1/5, height:Dimensions.get('window').width*1/5, alignSelf:'center',marginTop:20}} />
        <Image source={require('./005.png')} style={{width:Dimensions.get('window').width*2/5, height:Dimensions.get('window').width*2/5, alignSelf:'center'}} />
            <Button style={{alignSelf:'center',flex: 1,marginTop:Dimensions.get('window').width*2/15, justifyContent: 'center',alignItems: 'center',backgroundColor:'#008ed8', width:'40%',height:Dimensions.get('window').height*2/30, borderRadius:8}} full blocked
             onPress={()=> {this.props.navigation.navigate('LoginPage')}}>
            {/* <Text style={{textAlignVertical: 'center',marginTop:0,color:'#89fafa',alignItems:'center',alignSelf:'center',justifyContent: 'center', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab', fontSize:17,lineHeight:17}}>ورود</Text> */}
            <Text style={{color:'#89fafa',fontSize:Dimensions.get('window').width*1/20,lineHeight:Dimensions.get('window').width*1/20,fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>ورود</Text>
            </Button>

            <Button style={{alignSelf:'center',flex: 1,marginTop:Dimensions.get('window').width*1/10, justifyContent: 'center',alignItems: 'center',backgroundColor:'#008ed8', width:'40%',height:Dimensions.get('window').height*2/30, borderRadius:8}} full blocked
             onPress={()=> {this.props.navigation.navigate('RegisterPage')}}>
            {/* <Text style={{textAlignVertical: 'center',marginTop:0,color:'#89fafa',alignItems:'center',alignSelf:'center',justifyContent: 'center', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab', fontSize:17,lineHeight:17}}>ورود</Text> */}
            <Text style={{color:'#89fafa',fontSize:Dimensions.get('window').width*1/20,lineHeight:Dimensions.get('window').width*1/20,fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>عضویت</Text>
            </Button>
            
        </Content>
      
      </Container>
    );
  }
}

export default starter;