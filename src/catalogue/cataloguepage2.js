import React, { Component } from 'react';
import { Container, Header,Toast, Content,View, Form, Button, Item, Input, Icon,Left,Right,Body,Title } from 'native-base';
import {Text, Image,Modal, BackHandler,TouchableOpacity,ActivityIndicator,Dimensions,StyleSheet,Platform,} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from 'react-native-picker';
var API_URL = require('../config/config.js');
import ImageViewer from 'react-native-image-zoom-viewer';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingTop: Platform.select({ios: 0, android: 10}),
    },
    tabs: {
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    tabTitle: {
        color: '#EEE',
    },
    tabTitleActive: {
        fontWeight: '700',
        color: '#FFF',
    },
    footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    header : {
      width,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
});

class cataloguepage extends Component {
constructor(props) {
      super(props);
      this.state = {
        response : [],
        pageNumber : 1,
        page : 1,
        maxpage : 1,
        loading:true,
        index : 0,
        lastnum : 1,
        renderer : [],activeTab: 0,
        btn : true,
        rerender: true,
        imageindex: 0,
        isImageViewVisible: false
    };

    this.renderFooter = this.renderFooter.bind(this);

      global.renderer = [];
      global.btn = false;
    }

    _createDateData(){
      if(global.renderer.length == 0 ){
        return [1];
      }else{
        return global.renderer;
      }
    }

    _updatepage(){
      if(this.state.rerender == true){
        this.setState({rerender:false});
      }else{
        this.setState({rerender:false});
      }
    }

    _showDatePicker() {
      Picker.init({
          pickerData: this._createDateData(),
          pickerTitleText: 'شماره صفحه',
          pickerConfirmBtnText: 'تایید',
          pickerCancelBtnText: 'لغو',
          pickerFontColor: [255, 0 ,0, 1],
          onPickerConfirm: (pickedValue, pickedIndex) => {
              this.setState({index:pickedValue-1});
              this.forceUpdate();
          },
          onPickerCancel: (pickedValue, pickedIndex) => {
              this.setState({isImageViewVisible: true});
          },
          onPickerSelect: (pickedValue, pickedIndex) => {
              console.log('date', pickedValue, pickedIndex);
          }
      });
      Picker.show();
}
getheight(){
  if(this.state.response != undefined && this.state.response[this.state.index].product_id != undefined){
    return 50;
  }else{
    return 0;
  }
}
getwidth(){
  if(this.state.response != undefined && this.state.response[this.state.index].product_id != undefined){
    return 50;
  }else{
    return 0;
  }
}


    renderFooter() {
      return (
          <View style={styles.header}>
            <Button transparent style={{height:40,width:40,position: 'absolute',left:0}} onPress={()=>{this.setState({isImageViewVisible : false}); this.props.navigation.navigate('ProductSeries',{name : this.state.response[this.state.index].name,route:'cataloguepage',catid:this.props.navigation.getParam('catalogue_id'),id : this.state.response[this.state.index].product_id,family : this.state.response[this.state.index].family, imageURL : this.state.response[this.state.index].fimageURL,index:this.state.index})}} >
                <Image source={require('./catalogbuy.png')} style={{height:this.getheight(),width:null,aspectRatio:1}} />
            </Button>
            <TouchableOpacity style={{justifyContent: 'center',alignSelf:'center',height:80,width:'80%'}} onPress={()=>{this._showDatePicker()}} >
            <Text style={{textAlign:'center',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',justifyContent: 'center',alignSelf:'center',color:'white',fontSize:20}}>
              تغییر صفحه
            </Text>
            </TouchableOpacity>
            <Button iconLeft transparent style={{justifyContent: 'center',alignSelf:'center'}} onPress={()=>{this.setState({isImageViewVisible:false}); this.props.navigation.navigate('catalogue');}}>
            <Icon name='exit' style={{color:'white'}} />
          </Button>
          </View>
      );
  }

    fetch_cataloguepages() {
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
      //
      fetch(API_URL + '/auth/getCataloguePagenew?catalogue_id=' + this.props.navigation.getParam('catalogue_id') + '&width=' + Dimensions.get('window').width + '&height=' + Dimensions.get('window').height
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
          this.setState({response : responseJson,isImageViewVisible: true,maxpage:this.props.navigation.getParam('pagenumber'),loading:false});
          var countType = Object.keys(responseJson).length;
            for(let i = 0 ; i < countType ; i++){
              global.renderer[i] = i+1;
            }
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({text: 'اختلال در اتصال به شبکه',textStyle: { textAlign: "right",color:'red' },duration: 3000});
      });
    }

    getimage(){
      // alert(JSON.stringify(this.state.response) +  '    ' + this.state.response[this.state.page-1]);
      if(this.state.response[0] != undefined)
        {
          const images = this.state.response;
          // alert( this.props.navigation.getParam('catalogue_id')+'  ' +this.state.response[this.state.page-1].imageURL);
        return (images);
        }
        else
          return [];
    }

    // getButton(){
    //   if(this.state.response != undefined && this.state.response[0] != undefined && this.state.response[this.state.imageindex]!= undefined)
    //     {
    //       if(this.state.response[this.state.imageindex].product_id != null){
    //         return (
    //         <Button transparent style={{flex:1,position: 'absolute',width:this.state.response[this.state.index].width+"%",height:null,aspectRatio:1,left:this.state.response[this.state.index].left+"%",top:this.state.response[this.state.index].top+"%"}} onPress={()=>{this.props.navigation.navigate('ProductSeries',{name : this.state.response[this.state.index].name,route:'cataloguepage',catid:this.props.navigation.getParam('catalogue_id'),id : this.state.response[this.state.index].product_id,family : this.state.response[this.state.index].family, imageURL : this.state.response[this.state.index].fimageURL})}} >
    //           <Image source={require('./catalogbuy.png')} style={{flex:1,height:'100%',width:null,aspectRatio:1}} />
    //         </Button>
    //         );
    //       }
    //     }
    //     else
    //       return (<View></View>);
    // }

  componentWillMount(){
    if(this.props.navigation.getParam('index') != undefined){
      this.setState({index:parseInt(this.props.navigation.getParam('index'))});
    }
    window.mypagenumber = 0;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    this.setState({isImageViewVisible:false});
    this.props.navigation.navigate('catalogue');
    return true;
    });
    this.fetch_cataloguepages();

  }
  
  render() {
    const {isImageViewVisible, activeTab, imageIndex} = this.state;
    return (
      <Container>

        <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.5}}>
            <Button transparent onPress={()=>{this.props.navigation.navigate('catalogue')}}>
            <Icon name='arrow-back' style={{height:Dimensions.get('window').width*1/15,color: "white",width:'20%',fontSize:Dimensions.get('window').width*1/15}} />
            </Button>
        </Left>
        <Right style={{flex:0.5}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>کاتالوگ</Title>
        </Right>
      </Header>
                {/* <ImageView
                    enableSwipeDown={false}
                    myprop={this.state.response}
                    glideAlways
                    images={this.getimage()}
                    imageIndex={this.state.imageindex}
                    animationType="fade"
                    isVisible={this.state.isImageViewVisible}
                    renderFooter={this.renderFooter}
                    onClose={() => this.props.navigation.navigate('catalogue',{back : "true"})}
                /> */}
                 <Modal visible={this.state.isImageViewVisible} transparent={true} onRequestClose={() => this.setState({ modalVisible: false })}>
                    <ImageViewer index={this.state.index} imageUrls={this.getimage()} onSwipeDown={() => {
                       this.setState({isImageViewVisible:false});  this.props.navigation.navigate('catalogue');
                       }}
                        enableSwipeDown={true} enablePreload={true} saveToLocalByLongPress={false} renderFooter={this.renderFooter} onChange={(index2)=>{this.setState({index:index2})}} />
                 </Modal>

            {/* {this.getButton()} */}
            
            </Container>
    );
  }
}

export default cataloguepage;