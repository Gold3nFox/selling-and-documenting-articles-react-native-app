import React, { Component } from 'react';
import { Image, Alert,TouchableOpacity, View, ListView,BackHandler,Dimensions ,Platform} from 'react-native';
import Dialog from "react-native-dialog";
import { Container, Header,Root, Content, Card,Toast, Radio, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
var API_URL = require('../config/config.js');

class basket extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dialogVisible: false,
      productName : "",
      count : 1,
      response : [],
      renderer: [],
      errors: [],
      loading:true,
      fetch:false,
      text:'در حال دریافت سبد خرید...',
      empty : 0
    };
    global.renderer = [];
  }

      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
    
      handleYes = () => {

        this.setState({ dialogVisible: false,loading:true,text:"در حال بررسی سفارش..." });
        setTimeout(() => {
          this.setState({loading:false});
        }, 2000);
        if(this.state.empty != 1 )
          this.fetch_canbuy();
        this.setState({count : 1});
      };
    
      handleNo = () => {
        this.setState({ dialogVisible: false });
        this.setState({count : 1});
      };

      fetch_canbuy () {
        this.setState({errors:[]}); 
        for(let i = 0 ; i < this.state.renderer.length ; i++){
          fetch(API_URL + '/auth/checkbuy/' + this.state.response[i].code + '/' + this.getCount(i)
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
              if(responseJson != 'true'){
                this.setState({
                  errors: [...this.state.errors, this.state.response[i].name + ' ' + this.state.response[i].watt + ' وات ' + this.state.response[i].color + ' موجودی کافی نیست ']
              });
              }
            }
            if(i == this.state.renderer.length-1){
              this.check();
              // Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
            }
          })
          .catch((error) => {
              Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
          });
        }
      }

      check(){
        this.setState({loading:false});
        if(this.state.errors.length == 0){
          // alert('2موجودی برخی کالا ها کافی نیستند.' + JSON.stringify(this.state.errors));
          this.make_order();
        }else{
          // alert('موجودی برخی کالا ها کافی نیستند.' + JSON.stringify(this.state.errors));
          Toast.show({        text: 'موجودی برخی کالا ها کافی نیستند.' + JSON.stringify(this.state.errors),       textStyle: { textAlign: "right" },       duration: 10000     });
        }
      }

      fetch_basket () {
        setTimeout(() => {
          this.setState({loading:false});
        }, 2000);
        fetch(API_URL + '/auth/showBasket' 
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
            if(responseJson.length == 0){
              this.setState({empty : 1})
            }
          }
          this.forceUpdate();
        })
        .catch((error) => {
            Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
        });
      }

      remove_basket (rowData) {
        this.setState({loading:true,text:'در حال حذف کالا...'});
        setTimeout(() => {
          this.setState({loading:false});
        }, 2000);
        fetch(API_URL + '/auth/deletBasketItem?product_id='+this.state.response[rowData].product_id 
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
            global.renderer = [];
            this.setState({response:[],renderer:global.renderer,text:'در حال دریافت سبد خرید...'});
            this.fetch_basket();
          }
        })
        .catch((error) => {
            Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
        });
      }


      make_order () {
        fetch(API_URL + '/auth/addToOrders' 
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
            this.props.navigation.navigate('orders');
            this.setState({loading:false,text:'در حال دریافت سبد خرید...'});
          }
        })
        .catch((error) => {
            this.setState({loading:false,text:'در حال دریافت سبد خرید...'});
            Toast.show({text: 'اختلال در اتصال به شبکه',textStyle: { textAlign: "right",color:'red' },duration: 3000});
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
          this.props.navigation.navigate('MainPage');
          return true;
        });
        this.fetch_basket();
      }

      getImage(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].imageURL;
        }else
          return "";
      }
      isempty(){
        if(this.state.empty == 1){
          return (
              <Text>
                {/* <Image  source={{uri : 'https://khaterat.mobi/js/LogoTamas.jpg'}} style={{height: 193,width: 134.3,flex: 1,left:'25%'}}/> */}
                <Text style ={{marginTop:35,marginBottom:35,textAlign: 'center', alignSelf: 'stretch'}}>
                سبد خرید شما خالی است
                </Text>
              </Text>
              );
        }else
          return;
      }

      getFamily(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].family;
        }else{
          return "";
        }
      }
      getCount(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].count;
        }else{
          return "";
        }
      }
      getName(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].name;
        }else{
          return "";
        }
      }
      getColor(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].color;
        }else{
          return "";
        }
      } 
      getWatt(rowData){
        if(this.state.response[rowData] != undefined){
          return this.state.response[rowData].watt;
        }else{
          return "";
        }
      }

    render(){
    return (
      <Root>
      <Container>

      <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.navigate('MainPage')}}>
            <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white",width:'20%'}}/>
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>سبد خرید</Title>
        </Right>
      </Header>
        <Content>
        <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={this.state.text}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />
            <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>خرید کالا</Dialog.Title>
            <Dialog.Description>
                آیا از سفارشات خود مطمئن هستید؟
            </Dialog.Description>
            <Dialog.Button label="بله" onPress={this.handleYes} />
            <Dialog.Button label="خیر" onPress={this.handleNo} />
            </Dialog.Container>


            <ListView
                ref="ListView"
                
                dataSource ={ new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
                  }).cloneWithRows(this.getrenderer())
                }
                
                renderRow={(rowData) => (
                  <Card>
                    <CardItem>
                    <Left>
                      <Thumbnail style={{left:0,width:150,aspectRatio:1}} square source={{uri:this.getImage(rowData)}} />
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={()=>{this.remove_basket(rowData)}}>
                            <Icon style={{color:'red',fontSize:30}} name="close"></Icon>
                        </TouchableOpacity>
                        <Text>خانواده {this.getFamily(rowData)}</Text>
                        <Text note>سری {this.getName(rowData)}</Text>
                        <View style={{flexDirection: 'row',}}>
                          <Text>تعداد : {this.getCount(rowData)}</Text>
                        </View>
                        <Text>{this.getColor(rowData)} رنگ</Text>
                        <Text>{this.getWatt(rowData)} وات</Text>
                    </Right>
                  </CardItem>
              </Card>
                )}
            />

            {this.isempty()}
            
           <Card>
                <Button block
                style={{width:"100%"}}
                onPress={()=>{
                    this.setState({productName: "حبابی 12 وات مهتابی"});
                    this.showDialog();
                    }}>
                  <Icon active name="checkmark" />
                  <Text>تایید سفارشات</Text>
                </Button>
            </Card>
        
        </Content>

      </Container>
      </Root>
    );
  }
}

export default basket;