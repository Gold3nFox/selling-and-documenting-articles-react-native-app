import React, { Component } from 'react';
import { AppRegistry, Image,View, StatusBar, TouchableOpacity,Linking,Platform,AsyncStorage,Dimensions } from "react-native";
import {
  Text,
  Container,
  List,
  Content,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
export default class Side333Bar extends React.Component {


  _removeData = async () => {
    try {
      window.access_token = await AsyncStorage.removeItem('key:Token');

      if(window.access_token !== null) {

      }
     } catch (error) {
       // Error retrieving data
     }
  }


  render() {
    return (
      <Container style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
        <View style={{flex:1}} >
          <Image
            style={{
              height: "30%",
              width: "100%",
              alignSelf: "stretch",
              marginBottom:'3%'
            }}
            source={require('./001.png')}
          />

           <View
                style = {{marginBottom:'1%',width:"100%", height:"11%" , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignViews:"flex-end"}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => {this.props.navigation.navigate('MainPage',{goback : 'yes'})}}>
                <Image source={require('./002.png')} style={{position: 'absolute',height:"100%",width:"100%",alignSelf: "stretch",}} />
                <Text style = {{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,justifyContent:"flex-end",color:"'rgba(77,77,77,1)'",textAlign:"right",alignViews:"flex-end" ,marginRight:40,top:"30%",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab' }}>خانه</Text>
                </TouchableOpacity>
          </View>

          
          

          <View
                style = {{marginBottom:'1%',width:"100%", height:"11%" , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignViews:"flex-end"}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => {this.props.navigation.navigate('Ertebat')}}>
                <Image source={require('./003.png')} style={{position: 'absolute',height:"100%",width:"100%",alignSelf: "stretch",}} />
                <Text style = {{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,justifyContent:"flex-end",color:"'rgba(77,77,77,1)'",textAlign:"right",alignViews:"flex-end",marginRight:40,top:'40%',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'  }}>ارتباط با بروکس</Text>
                </TouchableOpacity>
          </View>

          <View
                style = {{marginBottom:'1%',width:"100%", height:"11%" , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignViews:"flex-end"}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => {this.props.navigation.navigate('Khadamat')}}>
                <Image source={require('./004.png')} style={{position: 'absolute',height:"100%",width:"100%",alignSelf: "stretch",}} />
                <Text style = {{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,justifyContent:"flex-end",color:"'rgba(77,77,77,1)'",textAlign:"right",alignViews:"flex-end" ,marginRight:40,top:"30%",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab' }}>خدمات بروکس</Text>
                </TouchableOpacity>
          </View>

          <View
                style = {{marginBottom:'1%',width:"100%", height:"11%" , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignViews:"flex-end"}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => {this.props.navigation.navigate('aboutus')}}>
                <Image source={require('./005.png')} style={{position: 'absolute',height:"100%",width:"100%",alignSelf: "stretch",}} />
                <Text style = {{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,justifyContent:"flex-end",color:"'rgba(77,77,77,1)'",textAlign:"right",alignViews:"flex-end" ,marginRight:40,top:"30%",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>درباره بروکس</Text>
                </TouchableOpacity>
          </View>

          <View
                style = {{marginBottom:'1%',width:"100%", height:"11%" , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignViews:"flex-end"}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => {this.props.navigation.navigate('starter'); this._removeData();}}>
                <Image source={require('./006.png')} style={{position: 'absolute',height:"100%",width:"100%",alignSelf: "stretch",}} />
                <Text style = {{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,justifyContent:"flex-end",color:"'rgba(77,77,77,1)'",textAlign:"right",alignViews:"flex-end",marginRight:40,top:"30%",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab' }}>خروج</Text>
                </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={()=>{Linking.openURL('https://burux.com')}}>
          <View style={{backgroundColor:"'rgba(0,0,0,0.6)'"}}>
                <Text style={{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,top:10,height:'80%',textAlign:'center',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color:"'rgba(77,77,77,1)'",backgroundColor:"'rgba(0,0,0,1)'"}}>www.burux.com</Text>
          </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}