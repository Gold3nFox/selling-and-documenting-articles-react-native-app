import React, { Component } from 'react';
import { Dimensions,Image,Platform,ListView,BackHandler,TouchableOpacity,WebView, Alert,View,FlatList ,ScrollView,StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { Container, Header, Content,Toast,Root, Card, CardItem, Thumbnail, Input, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import {ButtonGroup} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import  Slider from "react-native-slider";

var API_URL = require('../config/config.js');


const buttons = ['آفتابی', 'مهتابی', 'یخی'];

var customStyles9 = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
    borderRadius:25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});


class productSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      productName : "",
      count : 1,
      wattvalue : 0,
      selected0 : true,
      selected1 : false,
      selected2 : false,
      selected3 : false,
      refresher : [],
      response : [],
      selectedwatt : 0,
      selectedIndex: 2,
      loading : true,
      details : false,
      back : 'MainPage'
    };
    this.updateIndex = this.updateIndex.bind(this)
    global.renderer = [];
  }

      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }

      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
    
      handleYes = () => {
        this.fetch_addtobasket();
        this.setState({ dialogVisible: false });
        //TODO
        this.setState({count : 1});
      };
    
      splitter(){
        if(this.state.response.usages != undefined){
          return(this.state.response.usages.split('-'));
        }else
        {
          return([]);
        }
      }

      getlamps(){
        if(this.state.response.lamp != undefined){
          return(this.state.response.lamps);
        }else{
          return([]);
        }
    }

      handleNo = () => {
        this.setState({ dialogVisible: false });
        this.setState({count : 1});
      };

      componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.navigate(this.backnavigater(),{catalogue_id:this.props.navigation.getParam('catid')+"",index:this.props.navigation.getParam('index')+""});
          return true;
        });
        // alert(this.props.navigation.getParam('imageURL'));
        this.fetch_productSeries();
      }

    fetch_productSeries () {
      // alert(this.props.navigation.getParam('id'));
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
      fetch(API_URL + '/auth/getProductSeries/'+this.props.navigation.getParam('id')
      //+  this.props.navigation.getParam('id')
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
          var countType = Object.keys(responseJson.lamps).length;
          for(let i = 0 ; i < countType ; i++){
            global.renderer[i] = i;
          }
          this.setState({response : responseJson,refresher : global.renderer,loading:false});
          // alert(JSON.stringify(responseJson));       
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });
    }

    

    fetch_addtobasket () {
      fetch(API_URL + '/auth/addToBasket?count=' + this.state.count + '&productdetail_id=' + this.props.navigation.getParam('id') + '&watt=' + this.state.response.lamps[this.state.selectedwatt].watt + '&color=' + buttons[this.state.selectedIndex] +'&status=OK'
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
          if(responseJson.message == "#productNotFound"){
            Toast.show({ 
              text: 'کالا ی مورد نظر موجود نمی باشد',
              textStyle: { textAlign: "right" },
              duration: 3000
            });
          }else{
            Toast.show({ 
              text: 'کالا ی مورد نظر به سبد خرید اضافه شد',
              textStyle: { textAlign: "right" },
              duration: 3000
            });
            this.props.navigation.navigate('basket');
          }
          // alert(API_URL + '/auth/addToBasket?count=' + this.state.count + '&productdetail_id=' + this.props.navigation.getParam('id') + '&watt=' + this.state.response.lamps[this.state.selectedwatt].watt + '&color=' + buttons[this.state.selectedIndex] +'&status=OK');       
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });
    }



    returnlamp(){
      if(this.state.response != undefined){
        return (JSON.stringify(this.state.response));
      }else{
        return ([]);
      }
    }

    makerow(rowData){
      if(this.state.response.lamps != undefined){
        var countType = Object.keys(this.state.response.lamps[rowData].color).length;
      var tmp = [];
      for(let i = 0 ; i < countType ; i ++){
        tmp[i] = this.state.response.lamps[rowData].color[i].color;
      }
      // console.warn(tmp);
      return tmp;
        // return (JSON.stringify(this.state.response));
      }else{
        return ([]);
      }
      
    }

    getsqname(rowData){
      if(this.state.selectedwatt == rowData){
        return("ios-checkbox-outline");
      }else{
        return("ios-square");
      }
    }

    navigater(){
      if(this.props.navigation.getParam('route') == 'ProductLists'){
        return "MainPage";
      }else if(this.props.navigation.getParam('routenew') == 'new'){
        return 'ProductPage';
      }
      else{
        return "cataloguepage";
      }
        
    }

    backnavigater(){
      if(this.state.details == true){
        this.setState({details:false});
      }else{
        if(this.props.navigation.getParam('routenew') == 'new'){
          return 'ProductPage';
        }
        else if(this.props.navigation.getParam('route') == 'ProductLists'){
          return "MainPage";
        }else{
          return "cataloguepage";
        }
      }
    }

    getsqheight(rowData){
      if(this.state.selectedwatt == rowData){
        return(Dimensions.get('window')*1/20);
      }else{
        return(0);
      }
    }

    boxcount(){
      if(this.state.response.lamps != undefined)
        return this.state.response.lamps[this.state.selectedwatt].box;
      else
        return 0;
    }

    selectedbuy(){
      if(this.state.response.lamps != undefined){
        return this.state.response.lamps[this.state.selectedwatt].watt;
      }else{
        return '';
      }
    }

    getFirst(){
      if(this.state.response.lamps != undefined){
        if(this.state.wattvalue == 0){
          this.setState({wattvalue:parseInt(this.state.response.lamps[0].watt)});
        }
        return parseInt(this.state.response.lamps[0].watt);
      }else
      {
        return -1000000000;
      }
    }

    getLast(){
      if(this.state.response.lamps != undefined){
        return parseInt(this.state.response.lamps[this.state.refresher.length-1].watt);
      }else
      {
        return 1000000000;
      }
    }


    changeslider(value){
      if(this.state.response.lamps != undefined){
      this.setState({wattvalue:value});
      var tmp = (parseInt(this.state.response.lamps[this.state.refresher.length-1].watt) - parseInt(this.state.response.lamps[0].watt)) / this.state.refresher.length;
      for(let i = 0 ; i < this.state.refresher.length-1 ; i ++){
        if(value >= tmp * i + parseInt(this.state.response.lamps[0].watt) && value < tmp * (i +1) + parseInt(this.state.response.lamps[0].watt))
        {
          this.setState({selectedwatt:parseInt(i)});
        }
      }
      if(value == this.state.response.lamps[this.state.refresher.length-1].watt){
        this.setState({selectedwatt:parseInt(this.state.refresher.length-1)});
      }
    }
    }

    render() {
      
const { selectedIndex } = this.state;

      if(this.state.details == true){
        return (
          <Root>
          <Container>
    
          <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
            <Left style={{flex:0.3}}>
                <Button transparent
                onPress={()=>{this.setState({details:false})}}
                >
                  <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white",width:'20%'}} />
                </Button>
            </Left>
            <Right style={{flex:0.7}}>
                <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30}}>مشخصات فنی {this.props.navigation.getParam('family')}</Title>
            </Right> 
            </Header>
    
            

            <Spinner
              visible={this.state.loading}
              overlayColor={"rgba(0, 0, 0, 0.8)"}
              textContent={'در حال دریافت مشخصات فنی...'}
              textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
              />
        
            <WebView onLoadEnd={e => this.setState({loading:false})} onError={e => this.setState({loading:false})}  source={{uri: this.state.response.detailpdf}}>
            </WebView>

          </Container>
          </Root>
        );
      }else{
        return (
          <Root>
          <Container>
    
            <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
            <Left style={{flex:0.2}}>
                <Button transparent
                onPress={()=>{this.props.navigation.navigate(this.navigater(),{test:'true',catalogue_id:this.props.navigation.getParam('catid')+"",index:this.props.navigation.getParam('index')+""})}}
                >
                  <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white"}} />
                </Button>
            </Left>
            <Right style={{flex:0.8}}>
                <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>محصولات بروکس</Title>
            </Right>
            </Header>
    
            
            <Content>
              
            <Spinner
              visible={this.state.loading}
              overlayColor={"rgba(0, 0, 0, 0.8)"}
              textContent={'لطفا صبر کنید...'}
              textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
              />
    
                <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title style={{fontSize:Dimensions.get('window').height*1/35}}>خرید کالا</Dialog.Title>
                <Dialog.Description style={{fontSize:Dimensions.get('window').height*1/45}}>
                    آیا از انتخاب {this.props.navigation.getParam('name')} خانواده {this.props.navigation.getParam('family')}  {this.selectedbuy()} وات اطمینان دارید ؟
                </Dialog.Description>
                <Dialog.Button style={{fontSize:Dimensions.get('window').height*1/45}} label="بله" onPress={this.handleYes} />
                <Dialog.Button style={{fontSize:Dimensions.get('window').height*1/45}} label="خیر" onPress={this.handleNo} />
                <Dialog.Input value={this.state.count} style={{fontSize:Dimensions.get('window').height*1/45}} onChangeText={(text) => this.setState({count: text})} placeholder="تعداد"/>
                </Dialog.Container>
                <Card>
                <CardItem>
                  <Left>
                    <Image style={{ backgroundColor: '#e1e4e8',width:Dimensions.get('window').width*1/5,height:null,aspectRatio:1,resizeMode:'stretch'}} source={{uri:this.props.navigation.getParam('imageURL')+""}} onLoad={()=> this.setState({loading:false})}/>
                    {/* <Icon name="easel" style={{fontSize:30}}></Icon> */}
                  </Left>
                  <Right>
                      <Text style={{fontSize:Dimensions.get('window').width*1/22,lineHeight:Dimensions.get('window').width*1/17}}>خانواده {this.props.navigation.getParam('family')}</Text>
                      <Text style={{fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/22}} note>سری {this.props.navigation.getParam('name')}</Text>
                  </Right>
                </CardItem>
                
                <CardItem cardBody>
                <Body style={{justifyContent: 'center',alignSelf:'center',flex:1,alignContent:'center',alignItems:'center'}}>
                  <Image source={{uri:this.state.response.imageURL + ""}} style={{width: Dimensions.get('window').width*1/2,height:null, aspectRatio:1,resizeMode:'cover'}}/>
                </Body>
                </CardItem>
                
                <CardItem>
                    <Text style={{flex:1,textAlign:'right',fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40}} note>
                    {this.state.response.description}
                    </Text>
                </CardItem>
                <CardItem style={{marginVertical:20}}>
                <View style={{flex:1,direction:'rtl',flexDirection:'column',marginTop:20}}>
                
                <View style={{width:'100%',alignSelf:'flex-end',textAlign: Platform.OS === 'ios' ? 'left' : 'right',justifyContent:'flex-end',marginLeft:40}}>
                      <View style={{flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'}}>
                      <Text style={{textAlign: Platform.OS === 'ios' ? 'left' : 'right',direction:'rtl',alignSelf:'flex-end',fontSize:Dimensions.get('window').height*1/23,lineHeight:Dimensions.get('window').height*1/20}}>کاربردها</Text>
                      <Image style={{width:Dimensions.get('window').width*1/10,height:null,aspectRatio:1,resizeMode:'stretch',marginRight:10}} source={require('./usage.png')}/>
                      </View>{/* <Icon name="easel" style={{fontSize:Dimensions.get('window').height*1/23,lineHeight:Dimensions.get('window').height*1/20,alignSelf:'center'}}></Icon> */}
                </View>

                  <ListView
                  removeClippedSubviews={false}
                  dataSource ={ new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                    }).cloneWithRows(this.splitter())
                  }
                  
                  renderRow={(rowData) => (
                    <View style={{marginTop:Dimensions.get('window').width*1/30,minHeight:Dimensions.get('window').height*1/30,width:'100%',alignSelf:'center',justifyContent:'center',marginVertical:2}}>
                      <Text style={{width:Dimensions.get('window').width,textAlign: Platform.OS === 'ios' ? 'left' : 'right',direction:'rtl',alignSelf:'center',justifyContent:'center',borderRadius:8,marginBottom:5,fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,marginRight: Platform.OS === 'ios' ? 0 : Dimensions.get('window').width/2,marginLeft: Platform.OS === 'ios' ? Dimensions.get('window').width/2 : 0}}>- {rowData}</Text>
                    </View>
                   )}
                  />

                  <TouchableOpacity onPress={()=>{this.setState({details:true,loading:true}); setTimeout(() => {
                          this.setState({loading:false});
                        }, 2000);}}>
                        <Text style={{textAlign:  Platform.OS === 'ios' ? 'center' : 'center',marginTop:20,fontSize:Dimensions.get('window').width*1/27,lineHeight:Dimensions.get('window').width*1/22,color:'blue'}}>مشاهده مشخصات فنی</Text>
                      </TouchableOpacity>
                </View>
                
                </CardItem>
                
                  <Button style={{alignSelf: 'center',marginTop:Dimensions.get('window').width*1/30,height:Dimensions.get('window').height*1/15,marginBottom:Dimensions.get('window').width*1/25}} iconLeft transparent primary>
                  <Text style={{direction:'rtl',fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30}}>{this.selectedbuy()} وات</Text>
                  </Button>
                  <View style={{marginBottom:20,width:Dimensions.get('window').width,height:70}}>
                    <Slider
                      minimumTrackTintColor='#13a9d6'
                      thumbImage={require('./bulb.png')}
                      thumbStyle={customStyles9.thumb}
                      thumbTintColor='#0c6692'
                      style={{width:Dimensions.get('window').width*9/10,height:50,justifyContent:'center',alignSelf:'center'}}
                      value={this.state.wattvalue}
                      onValueChange={this.changeslider.bind(this)}
                      minimumValue={parseInt(this.getFirst())}
                      maximumValue={parseInt(this.getLast())}
                    />
                  </View>

            {/* <ListView
            ref="ListView"
            removeClippedSubviews={false}
            
            dataSource ={ new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
              }).cloneWithRows(this.state.refresher)
            }
            
            renderRow={(rowData) => (
                  <Button block
                  style={{marginBottom:Dimensions.get('window').width*1/40,flex:1,height:Dimensions.get('window').width*1/10,direction:'rtl'}}
                  onPress={()=>{
                      this.setState({selectedwatt : rowData});
                      }}>
                    <Text style={{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30,right:0,flex:1,direction:'rtl',alignSelf:'center',textAlign:'left',alignContent:'flex-end'}}>{this.state.response.lamps[rowData].watt} وات</Text>
                    <Icon active name={this.getsqname(rowData)} style={{fontSize:Dimensions.get('window').height*1/30,lineHeight:Dimensions.get('window').height*1/25,left:0,height:this.getsqheight(rowData)}}/>
                  </Button>
                  
             )}
            /> */}
    
                 <ButtonGroup
                  textStyle={{fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/30}}
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: Dimensions.get('window').width*1/10}}
                  selectedButtonStyle={{backgroundColor:'blue',color:'white'}}
                  selectedTextStyle={{color:'white'}}
                />
    
                <Button style={{alignSelf: 'center',marginTop:Dimensions.get('window').width*1/30,height:Dimensions.get('window').height*1/15,justifyContent:'center',alignSelf:'center',marginBottom:Dimensions.get('window').width*1/25}} iconLeft transparent primary>
                <Icon name='cube' style={{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30}} />
                <Text style={{direction:'rtl',fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30}}>تعداد در کارتن     {this.boxcount()}</Text>
                </Button>
    
                <CardItem>
                  <Left></Left>
                  <Body>
                    <Button block
                    style={{height:Dimensions.get('window').height*1/15}}
                    onPress={()=>{
                        this.setState({productName: "حبابی 12 وات مهتابی"});
                        this.showDialog();
                        }}>
                      <Icon active name="basket" style={{fontSize:Dimensions.get('window').height*1/30,lineHeight:Dimensions.get('window').height*1/25}} />
                      <Text style={{fontSize:Dimensions.get('window').height*1/35,lineHeight:Dimensions.get('window').height*1/30}}>خرید</Text>
                    </Button>
                  </Body>
                  <Right></Right>
                </CardItem>
              </Card>
            </Content>
          </Container>
          </Root>
        );
      }
      
  }
}

export default productSeries;