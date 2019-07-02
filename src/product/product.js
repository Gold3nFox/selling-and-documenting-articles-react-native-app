import React, { Component } from 'react';
import { Image, Alert,Dimensions,ListView,BackHandler,AsyncStorage,Platform } from 'react-native';
import Dialog from "react-native-dialog";
import { Container, Header, Content, Card, CardItem,Toast, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
var API_URL = require('../config/config.js');

class product extends Component {
  constructor(props) {
    super(props);
    state = {
      renderer : [],
      refresher : [],
      dialogVisible: false,
      productName : "",
      loading:true,
      count : 1,
      response : [],
    };

    global.renderer = [];
  }

  _storeNews = async (newProducts) => {
    try {
        await AsyncStorage.setItem('key:newProducts', JSON.stringify(newProducts));
    } catch (error) {
        // Error saving data
    }
    }

  _retrieveData = async () => {
    setTimeout(() => {
      this.setState({loading:false});
    }, 2000);
    try {
      responseJson = JSON.parse(await AsyncStorage.getItem('key:newProducts'));
      if(responseJson !== null) {
        var countType = Object.keys(responseJson).length;
          for(let i = 0 ; i < countType ; i++){
            global.renderer[i] = i;
          }
        this.setState({response : responseJson,refresher : global.renderer});
        this.forceUpdate();
      }else{
          this.fetch_newProducts();
      }
      } catch (error) {
        // Error retrieving data
      }
  }


      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
    
      handleYes = () => {
        this.setState({ dialogVisible: false });
        //TODO
        this.setState({count : 1});
      };
    
      handleNo = () => {
        this.setState({ dialogVisible: false });
        this.setState({count : 1});
      };


    fetch_newProducts(){
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
      fetch(API_URL + '/auth/getNewProduct' 
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
          this.setState({response : responseJson,refresher : global.renderer});
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
      fetch(API_URL + '/auth/getNewProduct' 
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


    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('MainPage');
        return true;
      });
      this._retrieveData();
      this.fetchsave_newProducts();
    }

    makerenderer(){
      if(this.state != null && this.state.response != null){
      if(this.state.response[0].FimageURL != null){
        // alert('sela');
        return this.state.refresher;
      }else{
        return [];
      }
    }else
      return [];
    }

    getimage(rowData){
      if( this.state.response != null && this.state.response[rowData] != undefined){
        return this.state.response[rowData].FimageURL;
      }else{
        return "";
      }
    }

    getFname(rowData){
      if( this.state.response != null && this.state.response[rowData] != undefined){
        return this.state.response[rowData].Fname;
      }else
        return "";
    }

    getNname(rowData){
      if(this.state.response != null && this.state.response[rowData] != undefined){
        return this.state.response[rowData].name;
      }else
        return "";
    }

    getmyimage(rowData){
      if (this.state.response != null && this.state.response[rowData] != undefined){
        return this.state.response[rowData].imageURL;
      }else
        return "";
    }

    getDis(rowData){
      if( this.state.response != null && this.state.response[rowData] != undefined){
        return this.state.response[rowData].description;
      }else
        return "";
    }

    getloading = () => {
      if(this.state == undefined)
          return true;
      else
        return false;
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
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>محصولات جدید</Title>
        </Right>
      </Header>

        <Content>

          <Spinner
          visible={this.getloading()}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت محصولات جدید...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />

         
          <ListView
              dataSource ={ new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
                }).cloneWithRows(this.makerenderer())
              }
              
              renderRow={(rowData) => (
                <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:this.getimage(rowData)+""}} style={{ backgroundColor: '#e1e4e8',width: Dimensions.get('window').height*1/10, height: Dimensions.get('window').height*1/10}} />
                  </Left>
                  <Right>
                      <Text style={{fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35}}>خانواده {this.getFname(rowData)}</Text>
                      <Text style={{fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45}} note>سری {this.getNname(rowData)}</Text>
                  </Right>
                </CardItem>
                
                <CardItem>
                <Body style={{flex:1,justifyContent: 'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                  <Image source={{uri:this.getmyimage(rowData)+""}} style={{ backgroundColor: '#e1e4e8',width: Dimensions.get('window').height*1/4, height: Dimensions.get('window').height*1/4}}/>
                </Body>
                </CardItem>
                
                <CardItem>
                    <Text note style={{flex:1,fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,textAlign:'right'}}>
                    {this.getDis(rowData)}
                    </Text>
                </CardItem>
    
                <CardItem>
                  <Body>
                    <Button block style={{flex:1,height:Dimensions.get('window').height*1/15}}
                    onPress={()=>{
                      this.props.navigation.navigate("ProductSeries",{name : this.state.response[rowData].name,id : this.state.response[rowData].productdetail_id,family : this.state.response[rowData].Fname, imageURL : this.state.response[rowData].FimageURL,routenew : 'new'})}}>
                      <Icon active name="search" />
                      <Text style={{fontSize:Dimensions.get('window').height*1/40,lineHeight:Dimensions.get('window').height*1/35}}>اطلاعات بیشتر</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
               )}
              />
        </Content>
      </Container>
    );
  }
}

export default product;