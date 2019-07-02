import React, { Component } from 'react';
import { Image, Alert,StyleSheet,TouchableOpacity,Platform,ActivityIndicator,Toast,BackHandler,Dimensions, View, ListView } from 'react-native';
import Dialog from "react-native-dialog";
import { Container, Header, Content, Card, Radio, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

var API_URL = require('../config/config.js');

class orders extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dialogVisible: false,
      productName : "",
      count : 1,
      selected : 0,
      response : [],
      renderer: [],
      products:[],
      productRenderer:[],
      loading : true,
    };
    global.renderer = [];
    global.text = [];
    global.myproducts = [];
    global.productRenderer= [];
  }

    fetch_orders() {
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
      fetch(API_URL + '/auth/showOrders' 
      , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+window.access_token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        variable = responseJson + '';
        if(variable != 'undefined'){
          var countType = Object.keys(responseJson).length;
          for(let i = 0 ; i < countType ; i++){
            global.renderer[i] = i;
          }
          this.setState({response : responseJson,renderer : global.renderer,loading:false});
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });
    }

      getrenderer(){
        if(this.state.response != undefined){
          return this.state.renderer;
        }else{
          return [];
        }
      }

      componentWillMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.navigate('MainPage',{goback : 'yes'});
          return true;
        });
        this.fetch_orders();
      }

      getproductrenderer(rowData){
        if(this.state.response[rowData] != undefined) {
          var countType = Object.keys(this.state.response[rowData].products).length;
          for (let i = 0 ; i < countType ; i ++) {
            productRenderer[i] = i;
          }
            var tmp = productRenderer;
            productRenderer = [];
            return(tmp);
        }else{
          return [];
        }
      }

      getImage(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].imageURL;
        }else
        {
          return "";
        }
      }

      getTime(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].time;
        }else{
          return "";
        }
      }

      getStatus(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].status;
        }else{
          return "";
        }
      }
      
      getNotes(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].notes;
        }else{
          return "";
        }
      }

      getcount(rowData,rowData2){
        if(this.state.response[rowData] != undefined){
          if(this.state.response[rowData].products[rowData2] != undefined)
            return this.state.response[rowData].products[rowData2].count;
        }else
        {
          return "";
        }
      }
      getname(rowData,rowData2){
        if(this.state.response[rowData] != undefined && this.state.response[rowData].products[rowData2] != undefined){
          return this.state.response[rowData].products[rowData2].name;
        }else
        {
          return "";
        }
      }
      getfamily(rowData,rowData2){
        if(this.state.response[rowData] != undefined && this.state.response[rowData].products[rowData2] != undefined){
          return this.state.response[rowData].products[rowData2].family;
        }else
        {
          return "";
        }
      }
      getwatt(rowData,rowData2){
        if(this.state.response[rowData] != undefined && this.state.response[rowData].products[rowData2] != undefined){
          return this.state.response[rowData].products[rowData2].watt;
        }else
        {
          return "";
        }
      }
      getcolor(rowData,rowData2){
        if(this.state.response[rowData] != undefined && this.state.response[rowData].products[rowData2] != undefined){
          return this.state.response[rowData].products[rowData2].color;
        }else
        {
          return "";
        }
      }

    render() {
    return (
      <Container style={{backgroundColor:'#00ccff'}}>
      <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.openDrawer()}}>
            <Image source={require('../home/001.png')} style={{width:Dimensions.get('window').height*1/23,height:Dimensions.get('window').height*1/23}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>لیست سفارشات</Title>
        </Right>
        </Header>

        <Content>

           <ActivityIndicator
               animating = {this.state.loading}
               color = 'black'
               size = "large"
               style = {{position: 'absolute',textAlign:'center',alignSelf:'center',top:50}}/>

          {/* <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت سفارشات...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          /> */}

            <ListView
                ref="ListView"
                removeClippedSubviews={false}
                
                dataSource ={ new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
                  }).cloneWithRows(this.getrenderer())
                }
                
                renderRow={(rowData) => (
                  <Card>
                    <CardItem>
                    <Left style={{flex:0.2,marginTop:-50}}>
                      <Thumbnail square style={{width:Dimensions.get('window').width*1/15,height:null,aspectRatio:1,resizeMode:'cover'}} source={{uri:this.getImage(rowData)+""}} />
                      <Text style={{fontSize:Dimensions.get('window').width*1/30,lineHeight:Dimensions.get('window').width*1/25}} note>{this.getTime(rowData)}</Text>
                    </Left>
                    <Right style={{flex:0.8,marginTop: Dimensions.get('window').width*1/15,}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:Dimensions.get('window').width*1/30,lineHeight:Dimensions.get('window').width*1/25}} note>  {this.getStatus(rowData)}</Text>
                        <Text style={{fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}> وضعیت سفارش شما:</Text>
                    </View>
                        <Text style={{fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>یادداشت های سفارش شما:</Text>
                        <Text style={{fontSize:Dimensions.get('window').width*1/30,lineHeight:Dimensions.get('window').width*1/25}} note>  {this.getNotes(rowData)}</Text>
                        {/* <View style={{flexDirection: 'row',}}>
                          <Text>تعداد : {this.state.response[rowData].count}</Text>
                        </View> */}
                        {/* <Text>{this.state.response[rowData].color} رنگ</Text>
                        <Text>{this.state.response[rowData].watt} وات</Text> */}
                    </Right>
                  </CardItem>

                  <ListView 
                  removeClippedSubviews={false}
                  style={{marginBottom: 10,}}
                    dataSource ={ new ListView.DataSource({
                      rowHasChanged: (r1, r2) => r1 !== r2
                      }).cloneWithRows(this.getproductrenderer(rowData))
                    }
                    
                    renderRow={(rowData2) => (
                        <CardItem style={{marginVertical:-7}}>
                        <Body style={{flex:1}}>
                            <Text note style={{direction: 'rtl',alignSelf:'flex-end', fontSize:Dimensions.get('window').width*1/30,lineHeight:Dimensions.get('window').width*1/25}}>{this.getcount(rowData,rowData2)} عدد {this.getname(rowData,rowData2)} {this.getfamily(rowData,rowData2)} {this.getwatt(rowData,rowData2)} وات {this.getcolor(rowData,rowData2)}</Text>
                        </Body>
                      </CardItem>
                    )}
                />
              </Card>
                )}
            />
   
        </Content>

      </Container>
    );
  }
}

export default orders;
