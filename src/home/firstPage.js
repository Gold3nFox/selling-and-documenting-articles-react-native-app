import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Left, Right, Title } from 'native-base';
import {Text, Image, ScrollView, View,Dimensions, TouchableOpacity,BackHandler,Platform} from 'react-native';
var API_URL = require('../config/config.js');

class firstPage extends Component {

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }

  render() {
    return (
      <Container style={{backgroundColor:'#00ccff'}}>
        <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.openDrawer();}}>
            <Image source={require('./001.png')} style={{width:Dimensions.get('window').height*1/23,height:Dimensions.get('window').height*1/23}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>خانه</Title>
        </Right>
        </Header>
        <View style={{flex:1,backgroundColor:"#00ccff"}}>
                <TouchableOpacity  style={{backgroundColor:'#00ccff',position:"absolute",left:"6%",top:0, width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%", marginTop:"2%"}}
                onPress={()=> {this.props.navigation.navigate('catalogue')}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1}} />  
                <Image source={require('./iconcataloge.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"20%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end',}}>
                <Text style={{color:"black", alignSelf:"center",bottom:Dimensions.get('window').height*1/25, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}> کاتالوگ </Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Game')}}  style={{position:"absolute",left:"47%",top:0, width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%", marginTop:"2%"}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1,}} />  
                <Image source={require('./icongame.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"20%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end'}}>
                  <Text style={{color:"black", alignSelf:"center",textAlign:'center',alignContent:'center', bottom:Dimensions.get('window').height*1/25, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, marginTop:-10, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}> بازی </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute",left:"6%",top:"33.5%", width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%"}}
                onPress={()=> {this.props.navigation.navigate('ProductPage')}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1,}} />  
                <Image source={require('./iconlamp.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"15%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end'}}>
                <Text style={{color:"black", alignSelf:"center", bottom:Dimensions.get('window').height*1/35, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>محصولات</Text>
                <Text style={{color:"black", alignSelf:"center", bottom:Dimensions.get('window').height*1/30, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>جدید</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute" ,left:"47%",top:"33.5%", width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%"}}
                onPress={()=> {this.props.navigation.navigate('WarrantyPage')}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1,}} />  
                <Image source={require('./iconmarju.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"20%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end'}}>
                <Text style={{color:"black", alignSelf:"center", bottom:Dimensions.get('window').height*1/25, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, marginTop:-10, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}> ثبت مرجوعی </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute",left:"6%",top:"66%", width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%"}}
                onPress={()=> {this.props.navigation.navigate('photonPage')}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1,}} />  
                <Image source={require('./iconfoton.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"20%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end'}}>
                <Text style={{color:"black", alignSelf:"center", bottom:Dimensions.get('window').height*1/25, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, marginTop:-10, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}> فوتون </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{position:"absolute",left:"47%",top:'66%', width:"40%", aspectRatio:1, borderRadius:8, marginHorizontal:"2%"}}
                onPress={()=> {this.props.navigation.navigate('NewsPage')}}>
                <Image source={require('./006.png')} style={{borderRadius:8,position:'absolute',left:0, top:0,width:"100%",height:"100%",aspectRatio:1,}} />  
                <Image source={require('./iconnews.png')} style={{aspectRatio:1, height:"45%", alignSelf:'center', top:"20%", resizeMode:'stretch'}}/>
                <View style={{flex:1, borderRadius:8,justifyContent: 'flex-end'}}>
                <Text style={{color:"black", alignSelf:"center", bottom:Dimensions.get('window').height*1/25, fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/20, marginTop:-10, fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}> اخبار </Text>
                </View>
                </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default firstPage;





