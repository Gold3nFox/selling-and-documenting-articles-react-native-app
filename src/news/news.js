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

class news extends Component {
    constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      loading:true,
      refresher:[],
      selected :0
    };

    global.renderer = [];
  }

  _storeNews = async (News) => {
    try {
        await AsyncStorage.setItem('key:News', JSON.stringify(News));
    } catch (error) {
        // Error saving data
    }
    }

  _retrieveData = async () => {
    setTimeout(() => {
      this.setState({loading:false});
    }, 2000);
    try {
      responseJson = JSON.parse(await AsyncStorage.getItem('key:News'));
      if(responseJson !== null) {
        var countType = Object.keys(responseJson).length;
        for(let i = 0 ; i < countType ; i++){
          global.renderer[i] = i;
        }
        this.setState({response : responseJson,refresher : global.renderer,loading:false});
        this.forceUpdate();
      }else{
          this.fetch_newProducts();
      }
      
      if(window.access_token !== null) {
        // this.props.navigation.navigate('MainPage');
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  

  fetch_newProducts(){
    setTimeout(() => {
      this.setState({loading:false});
    }, 2000);
    fetch(API_URL + '/auth/getNews' 
    //+  this.props.navigation.getParam('id')
    , {
      method: 'GET',
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
        this.setState({response : responseJson,refresher : global.renderer,loading:false});
      }
      this.forceUpdate();
    })
    .catch((error) => {
        Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
    });
  }

  fetchsave_newProducts(){
    setTimeout(() => {
      this.setState({loading:false});
    }, 2000);
    fetch(API_URL + '/auth/getNews' 
    //+  this.props.navigation.getParam('id')
    , {
      method: 'GET',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+window.access_token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      variable = responseJson + '';
      if(variable != 'undefined'){
        this._storeNews(responseJson);
      }
    })
    .catch((error) => {
        Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
    });
  }


  componentWillMount() {
    // alert(this.props.navigation.getParam('imageURL'));
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('MainPage');
      return true;
    });
    this._retrieveData();
    this.fetchsave_newProducts();
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  makerenderer(){
    if(this.state != null){
      return this.state.refresher;
    }else{
      return [];
    }
  }

  modaltext(){
    if(this.state.response != undefined){
      return(this.state.response[this.state.selected].description);
    }else{
      return("");
    }
  }
  fetchimage(){
    if(this.state.response != undefined){
      // alert(JSON.stringify(this.state.response[this.state.selected].dimageURL));
      return(this.state.response[this.state.selected].dimageURL);
    }else{
      return("");
    }
  }

  getTime(rowData){
    if(this.state.response != undefined){
      return this.state.response[rowData].time;
    }else{
      return"";
    }
  }
  
  getTitle(rowData){
    if(this.state.response != undefined){
      return this.state.response[rowData].title;
    }else{
      return "";
    }
  }

  getDescription(rowData){
    if(this.state.response != undefined){
      return this.state.response[rowData].title;
    }else{
      return "";
    }
  }

  getTimage(rowData){
    if(this.state.response != undefined){
      return this.state.response[rowData].timageURL;
    }else{
      return "";
    }
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
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>اخبار</Title>
        </Right>
      </Header>

        
        <Modal swipeToClose={false} style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <View style={{justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center',}}>
          <Image source={{uri:this.fetchimage()}} style={{backgroundColor: '#e1e4e8',marginTop:10,height:Dimensions.get('window').width*1/2,width:Dimensions.get('window').width*1/2}}></Image>
          <ScrollView style={{marginHorizontal:8,marginVertical:8}}>
          <Text style={styles.text}>{this.modaltext()}</Text>
          </ScrollView>
          </View>
         </Modal>

        <Content>
        <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت اطلاعات اخبار...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />
        <List>
          <ListView
              dataSource ={ new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
                }).cloneWithRows(this.makerenderer())
              }
              
              renderRow={(rowData) => (
                <View style={{minHeight:Dimensions.get('window').height*1/10}}>
                <ListItem avatar>
                  <Left>
                  <Text style={{fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,}} note>{this.getTime(rowData)}</Text>
                  </Left>
                  <Body style={{height:Dimensions.get('window').height*1/10}}>
                  <TouchableOpacity
                  style={{height:Dimensions.get('window').height*1/10}}
                  onPress={()=>{this.refs.modal3.open(); this.setState({selected:rowData})}}
                  >
                    <Text numberOfLines={2} style={{fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,direction:'ltr',textAlign:'right',alignSelf:'flex-end',justifyContent:'flex-end',alignContent:'flex-end'}}>{this.getTitle(rowData)}</Text>
                    <Text note style={{fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,direction:'rtl',textAlign:'right',alignSelf:'flex-end'}} numberOfLines={1}>{this.getDescription(rowData)}</Text>
                  </TouchableOpacity>
                  </Body>
                  <Right>
                  <Thumbnail source={{uri:this.getTimage(rowData)}} style={{height:Dimensions.get('window').height*1/17,width:Dimensions.get('window').height*1/17,borderRadius:Dimensions.get('window').height*1/34}} />
                  </Right>
                
                </ListItem>
                <Separator style={{height:1,marginTop:-0.5}}>
                </Separator>
                </View>
               )}
              />
       </List>
          
        </Content>
      </Container>
    );
  }
}

export default news;