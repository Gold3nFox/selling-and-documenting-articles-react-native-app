import React, { Component } from 'react';
import { Image,BackHandler,View,Dimensions,Platform } from 'react-native';
import { Container,Title,Right, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class khadamat extends Component {
  
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('MainPage');
      return true;
    });

  }

  
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
    <Container style={{backgroundColor:'#00ccff'}}>
        <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.openDrawer();}}>
            <Image source={require('../home/001.png')} style={{width:Dimensions.get('window').height*1/23,height:Dimensions.get('window').height*1/23}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>ارتباط با بروکس</Title>
        </Right>
      </Header>

        <Content>
            <CardItem style={{marginTop:Dimensions.get('window').height*1/15,backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{textAlign:'center',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/25,color:'#666666'}}>ارتباط با بروکس</Text>
            </CardItem>

            <CardItem style={{backgroundColor:'#00ccff'}}>
              <Body><Image source={require('./logowhite.png')} style={{width: Dimensions.get('window').width*1/2,height:Dimensions.get('window').width*1/2,marginVertical:20,aspectRatio:1,flex: 1,justifyContent:'center',alignContent:'center',alignSelf:'center'}}/></Body>
              </CardItem>

              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center',marginBottom:30}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row-reverse',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35,textAlign:'left',alignSelf:'flex-start',color:'white'}}>+98 21 75 116</Text>
                </View>
                <View><Image  source={require('./phone.png')} style={{width: '35%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>

              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center',marginBottom:30}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row-reverse',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35,textAlign:'left',alignSelf:'flex-start',color:'white'}}>burux.ir</Text>
                </View>
                <View><Image  source={require('./instagram.png')} style={{width: '35%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>

              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center',marginBottom:30}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row-reverse',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35,textAlign:'left',alignSelf:'flex-start',color:'white'}}>@led_lighting</Text>
                </View>
                <View><Image  source={require('./telegram.png')} style={{width: '35%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>

              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center',marginBottom:30}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row-reverse',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35,textAlign:'left',alignSelf:'flex-start',color:'white'}}>www.burux.com</Text>
                </View>
                <View><Image  source={require('./web.png')} style={{width: '35%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>

        </Content>
      </Container>
    );
  }
}