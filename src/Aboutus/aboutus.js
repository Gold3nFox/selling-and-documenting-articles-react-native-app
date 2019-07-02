import React, { Component } from 'react';
import { Image,BackHandler,View,Dimensions,Platform } from 'react-native';
import { Container,Title,Right, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class aboutus extends Component {
  
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
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>درباره بروکس</Title>
        </Right>
      </Header>

        <Content>
            <CardItem style={{marginTop:Dimensions.get('window').height*1/15,backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{textAlign:'center',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/25,color:'#666666'}}>درباره بروکس</Text>
            </CardItem>
              <CardItem style={{backgroundColor:'#00ccff',justifyContent: 'center',alignContent:'center',width:'100%',alignItems:'center',alignSelf:'center'}}>
                <View style={{width:'94%',justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                  <Text style={{fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/32,justifyContent:'center',direction:'ltr',textAlign:'center',alignSelf:'center',color:'#666666'}}>یکی از بزرگترین چالشهای بشر از گذشته تاکنون نیاز به روشنایی در شب و ادامه‌ی جریان فعالیتهایش در این ساعات بوده است، با پیشرفت تکنولوژی، چرخه تولید الکتریسیته نیز سریع‌تر شده و منابع موجود در زمین نیز بیشتر صرف این موضوع می‌شوند. فعالیتهای روزمره‌ی ما نیازمند انرژی بوده و هر کدام از ما به سهم خود مصرف کننده‌ی این انرژی محسوب می‌شویم. امروز میلیاردها شعله از انواع مختلف لامپ، روشنایی بخش شهرها و روستاها در سراسر جهان هستند. LED آخرین تکنولوژی در سیستم روشنایی به حساب می‌آید که در مقایسه با انواع قبلی یعنی CFL یا همان کم‌مصرف و قبل‌تر از آن رشته‌ای، برتری‌های بسیار زیادی دارد، که باعث شده در چند سال اخیر نگاه کشورهای توسعه یافته را به خود جذب کند و به سرعت سیستمهای روشنایی خود را به فناوری LED ارتقا دهند. چرا که LED تنها فناوری موجود در جهان است که حدود 90 درصد انرژی مصرفی خود را به نور تبدیل کرده و تلفات زیاد مصرف انرژی را تقریبا از بین برده است. موضوع بهره‌وری انرژی اولین اولویت همه‌ی کشورهای توسعه یافته است. تنها با تعویض لامپ‌های قدیمی به ال‌ای‌دی میتوان در سهم 27 درصدی که روشنایی از مصرف کل انرژی الکتریکی کشور دارد، صرفه جویی قابل ملاحظه ای ایجاد نمود. به همین منظور شرکت گسترش تجهیزات روشنایی پایدار در راستای توسعه‌ی استفاده از آخرین فناوری صنعت روشنایی  محصولات خود را با هدف کاهش مصرف انرژی و افزایش بهره‌وری آن، در قالب انواع لامپها و چراغهای روشنایی تولید و آن را با برند تجاری بروکس-BURUX در اختیار مصرف کننده قرار می‌دهد.
 تولیدات این شرکت در انواع لامپ و چراغ در داخل کشور انجام شده و با استفاده از مواد اولیه با کیفیت صورت می‌پذیرد. بروکس افتخار دارد در جهت این خدمت و با هدف جایگزینی لامپهای ال‌ای‌دی بیش از 200 فرصت شغلی در سه استان کشور ایجاد کند. ضمن اینکه تولیدات بروکس دارای 24 ماه گارانتی تعویض بوده که برای رضایت مشتریان محترم در همان ابتدای مراجعه به فروشگاه و یا نمایندگان شرکت بروکس، لامپ معیوب تعویض می‌گردد؛ شاید دانستنش خالی از لطف نباشد که بازخورد چند ساله از فروش محصولات بروکس نشان داده که تنها 2 درصد از کل محصولات این شرکت شامل خدمات گارانتی شده‌اند، این یعنی 98 درصد از تولیدات ما کماکان روشنایی بخش محیط ها و فضاهای مختلف درکشور اند. 
 فناوری LED بعنوان جدیدترین دستاورد بشر در زمینه تولید روشنایی، بدلیل پایداری قابل قبول، بهره وری بالا و حفاظت از محیط زیست توانسته جایگاه ویژه‌ای را در این زمینه به خود اختصاص دهد. این شرکت در راستای نیل به هدف مدیریت و کاهش مصرف انرژی در کشور عزیزمان با عبور از فناوریهای قدیمی روشنایی (کم مصرف، رشته ای و...) حوزه فعالیت خود را بصورت تخصصی بر روی زمینه LED متمرکز نموده و امیدوار است تا با یاری خداوند و کمک هم میهنان عزیزمان گامهای مهمی در این زمینه بردارد.</Text>
                </View>
              </CardItem>
              <CardItem style={{backgroundColor:'#00ccff'}}>
              <Body><Image source={require('./logowhite.png')} style={{width: Dimensions.get('window').width*1/4,height:Dimensions.get('window').width*1/4,marginVertical:20,aspectRatio:1,flex: 1,justifyContent:'center',alignContent:'center',alignSelf:'center'}}/></Body>
              </CardItem>
        </Content>
      </Container>
    );
  }
}