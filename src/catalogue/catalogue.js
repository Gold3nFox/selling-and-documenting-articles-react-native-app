import React, { Component } from 'react';
import { Container, Header, Body, Content, Form, Item,Toast, Input, Label, Button, Icon, Right, Left, Title, Card, CardItem, Thumbnail } from 'native-base';
import {Text, Image, FlatList,AsyncStorage, TouchableOpacity, StyleSheet,BackHandler,Dimensions,Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

var API_URL = require('../config/config.js');

    const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#3f51b5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    box:{
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        elevation: 1,marginLeft:10,width:150,height:262,
    }
    })

class catalogue extends Component {
    constructor(props) {
        super(props);
        this.state =  {
          dialogVisible: false,
          loading : true,
          productName : "",
          count : 1,
          selected : 0,
          response : [],
          renderer: [],
          products:[],
          description:"",
          cataloguename:"",
          productRenderer:[]
        };
        global.renderer = [];
      }


    _storeCatalogue = async (Catalogue) => {
    try {
        await AsyncStorage.setItem('key:Catalogues', JSON.stringify(Catalogue));
    } catch (error) {
        // Error saving data
    }
    }

    _retrieveData = async () => {
        setTimeout(() => {
          this.setState({loading:false});
        }, 2000);
        try {
          responseJson = JSON.parse(await AsyncStorage.getItem('key:Catalogues'));
          if(responseJson !== null) {
            var countType = Object.keys(responseJson).length;
            for(let i = 0 ; i < countType ; i++){
              global.renderer[i] = i;
            }
            this.setState({response : responseJson,renderer : global.renderer,description:responseJson[0].description,cataloguename:responseJson[0].name,loading:false});
            this.forceUpdate();
          }else{
              this.fetch_catalogues();
          }
          
          if(window.access_token !== null) {
            // this.props.navigation.navigate('MainPage');
          }
         } catch (error) {
           // Error retrieving data
         }
      }

    fetch_catalogues() {
        setTimeout(() => {
            this.setState({loading:false});
          }, 2000);
        fetch(API_URL + '/auth/getCatalogue' 
        , {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +window.access_token,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          variable = responseJson + '';
          if(variable != 'undefined'){
            var countType = Object.keys(responseJson).length;
            for(let i = 0 ; i < countType ; i++){
              global.renderer[i] = i;
            }
            // alert(JSON.stringify(responseJson));
            this.setState({response : responseJson,renderer : global.renderer,description:responseJson[0].description,cataloguename:responseJson[0].name,loading:false});
            //alert(responseJson[0].name);
          }
          this.forceUpdate();
        })
        .catch((error) => {
            Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
        });
      }

    fetchsave_catalogues() {
    setTimeout(() => {
        this.setState({loading:false});
        }, 2000);
    fetch(API_URL + '/auth/getCatalogue' 
    , {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +window.access_token,
        },
    }).then((response) => response.json())
    .then((responseJson) => {
        variable = responseJson + '';
        if(variable != 'undefined'){
        this._storeCatalogue(responseJson);
        }
    })
    .catch((error) => {
        Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
    });
    }

      componentWillMount(){
          if(this.props.navigation.getParam('back') == "true"){
              this.setState({loading:false});
          }
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('MainPage');
            return true;
          });
        this._retrieveData();
        this.fetchsave_catalogues();
      }

      dataBack(){
          if(this.state.response[0] != undefined){
              if(this.state.response[0].imageURL != undefined)
                {
                    return(this.state.renderer);
                }
                else{
                    return([]);
                }
          }else{
                return([]);
          }
      }

      getimage(rowData){
          if(this.state.response[rowData] != undefined){
              return this.state.response[rowData].imageURL;
          }
          else
            return("");
      }

      getmonth(rowData){
          if(this.state.response[rowData] != undefined){
              return this.state.response[rowData].month;
          }else
            return("");
      }

      getyear(rowData){
          if(this.state.response[rowData] != undefined){
              return this.state.response[rowData].year;
          }else
            return("");
      }

    render() {
    
    return (
    <Container style={{backgroundColor:'#00ccff'}}>
    <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>{this.props.navigation.navigate('MainPage')}}>
            <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white",width:'20%'}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>کاتالوگ</Title>
        </Right>
      </Header>
    
    <Content>
        <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت اطلاعات کاتالوگ ها...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />

        <FlatList style={{marginTop:"4%"}}
            horizontal
            data = {this.dataBack()}
            renderItem={({ item: rowData }) => {
            return (
                <Card style={styles.box}>
                <CardItem cardBody style={{width:150,height:212}}>
                <TouchableOpacity style={{height : 212,width:150,backgroundColor:'#00ccff'}} onPress={() => this.setState({description : this.state.response[rowData].description, cataloguename : this.state.response[rowData].name})}>
                <Image source={{uri:this.getimage(rowData)+""}} style={{backgroundColor: '#e1e4e8', height: 212,resizeMode:'stretch', width: null, flex: 1,borderRadius:10,borderTopRightRadius:10}}/>
                </TouchableOpacity>
                </CardItem>
                <CardItem style={{flex:1,backgroundColor:'grey',borderBottomStartRadius:10,borderBottomEndRadius:10}}>
                    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={() => {if(this.state.response[rowData].numOfPages == "pdf"){this.props.navigation.navigate('cataloguepdf',{index:0,pdf : this.state.response[rowData].width });}else{this.props.navigation.navigate('cataloguepage',{catalogue_id : this.state.response[rowData].catalogue_id,pagenumber : this.state.response[rowData].numOfPages,width:this.state.response[rowData].width,height:this.state.response[rowData].height})}}}>
                    <Icon name='download' style={{textAlign:'center'}} />
                    <Text note numberOfLines={1} style={{flex:1,fontSize:15,color:'white',textAlign:'center'}}>{this.getmonth(rowData)} {this.getyear(rowData)}</Text>
                    </TouchableOpacity>
                </CardItem>
            </Card>
            );
            }}
            keyExtractor={(item, index) => index}
        />

        <Card style={{flex: 0, marginTop:"4%",backgroundColor: "#F7FDFF"}}>
            <CardItem style={{backgroundColor: "#F7FDFF"}}>
              <Left>
                <Thumbnail source={{uri:"http://104.248.251.209/photon.jpg"}} style={{height:Dimensions.get('window').height*1/15,width:Dimensions.get('window').height*1/15,borderRadius:Dimensions.get('window').height*1/30}} />
             </Left>
             <Body></Body>
                <Right>
                <Text style={{fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45}}>
                {this.state.cataloguename}
                </Text>
                </Right>
            </CardItem>
            <CardItem style={{backgroundColor: "#F7FDFF"}}>
              <Right>
                <Text style={{fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45}}>
                {this.state.description}
                </Text>
              </Right>
            </CardItem>
          </Card>

    </Content>

        </Container>
    )}
}

export default catalogue;