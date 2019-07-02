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
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>خدمات بروکس</Title>
        </Right>
      </Header>

        <Content>
            <CardItem style={{marginTop:Dimensions.get('window').height*1/15,backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{textAlign:'center',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/25,color:'#666666'}}>خدمات بروکس</Text>
            </CardItem>
            <CardItem style={{backgroundColor:'#00ccff'}}>
              <Body><Image source={require('./logowhite.png')} style={{width: Dimensions.get('window').width*1/4,height:Dimensions.get('window').width*1/4,marginVertical:20,aspectRatio:1,flex: 1,justifyContent:'center',alignContent:'center',alignSelf:'center'}}/></Body>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>شبکه ی گسترده فروش</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>بهره مندی از شبکه فروش سازمانی و مویرگی</Text>
                </View>
                <View><Image  source={require('./01.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>خدمات ویژه باشگاه مشتریان</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>امتیازات ویژه برای مشتریان وفادار</Text>
                </View>
                <View><Image  source={require('./02.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>تحویل فوری سفارشات</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>ارسال رایگان و فوری سفارشات به عاملین فروش و فروشگاه ها</Text>
                </View>
                <View><Image  source={require('./03.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start',}}/></View>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>گارانتی تعویض</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>گارانتی تعویض محصولات تا ۲ سال</Text>
                </View>
                <View><Image  source={require('./04.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>تنوع و استاندارد در محصولات</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>سبد منتوع محصولات لامپ و چراغ با بالاترین استاندارد کیفی</Text>
                </View>
                <View><Image   source={require('./05.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'80%',left:'10%',flexDirection:'row',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                <View style={{flexDirection:'column',textAlign:'left',flex:1,justifyContent: 'center',}}>
                  <Text style={{fontWeight:'bold',direction:'ltr',fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>نمایندگی های فعال در سراسر کشور</Text>
                  <Text style={{direction:'ltr',fontSize:Dimensions.get('window').height*1/65,lineHeight:Dimensions.get('window').height*1/60,textAlign:'right',alignSelf:'flex-end',color:'#666666'}}>مجموعه ای از برترین و با سابقه ترین فروشندگان صنف الکتریکی در شبکه نمایندگان بروکس</Text>
                </View>
                <View><Image source={require('./06.png')} style={{width: '45%',height:null,aspectRatio:1,marginLeft:10,justifyContent:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}}/></View>
                </View>
              </CardItem>
        </Content>
      </Container>
    );
  }
}