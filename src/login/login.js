import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Toast, Root } from 'native-base';
import {StyleSheet,Text, Image, AsyncStorage,BackHandler,Dimensions,Platform} from 'react-native';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';

var API_URL = require('../config/config.js');
var Pattern_ID = require('../config/patternID.js');

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
  height: 300
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
  fontSize: 15,
  textAlign: 'center'
}

});



class login extends Component {
constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        isDisabled: false,
        swipeToClose: true,
        sliderValue: 0.3,
        mobileNumber: '', 
        customerNum: '',
        password: '',
        loadedpass:'',
        verCode: '',
        loading:true
      };
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

    componentWillMount(){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('starter');
        return true;
      });
      this._retrieveData();
    }


    phone_auth_send () {
      fetch(API_URL+'/auth/verification/' + this.state.mobileNumber , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
      .then((responseJson) => { 
        })
      .catch((error) => {
          // Toast.show({text: 'اختلال در اتصال به شبکه',textStyle: { textAlign: "right",color:'red' },duration: 30000});
      });
    }

    phone_auth_rec () {
      fetch(API_URL+'/auth/checkverify/'+this.state.mobileNumber +'/'+this.state.verCode , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
      .then((responseJson) => { 
        if(responseJson == "true"){
          this.fetch_login();
        }
        })
      .catch((error) => {
          Toast.show({text: 'اختلال در اتصال به شبکه',position:'top',textStyle: { textAlign: "right",color:'red'  },duration: 3000});
      });
    }

    fetch_login () {
      fetch(API_URL + '/auth/login?' + '&mobile=' + this.state.mobileNumber + '&password=' + this.state.loadedpass , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson != undefined){
          if(responseJson.access_token != undefined) {
            window.access_token = responseJson.access_token;
            this._storeData();
            this.props.navigation.navigate('MainPage');
          }
          else if(responseJson.message == 'Unauthorized') {
            Toast.show({ 
              position:'top',
              text: 'شماره موبایل شما قبلا در سیستم ثبت نشده است',
              textStyle: { textAlign: "right"  },
              duration: 3000
            });
          }
        }
      })
      .catch((error) => {
          Toast.show({text: 'اختلال در اتصال به شبکه',position:'top',textStyle: { textAlign: "right",color:'red'  },duration: 3000});
      });
    }

    fetch_login2 () {
      fetch(API_URL + '/auth/login?' + 'customerNum=' + this.state.customerNum + '&password=' + this.state.password , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson != undefined){
          if(responseJson.access_token != undefined) {
            window.access_token = responseJson.access_token;
            this._storeDatas();
            this.props.navigation.navigate('MainPage');
          }
          else if(responseJson.message == 'Unauthorized') {
            Toast.show({
              position:'top',
              text: 'شماره مشتری یا رمز عبور اشتباه است',
              textStyle: { textAlign: "right"  },
              duration: 3000
            });
          }
        }
      })
      .catch((error) => {
          Toast.show({text: 'اختلال در اتصال به شبکه',position:'top',textStyle: { textAlign: "right",color:'red'  },duration: 3000});
      });
    }


    _storeData = async () => {
      try {
        await AsyncStorage.setItem('key:Token', window.access_token);
      } catch (error) {
        // Error saving data
      }
    }

    _storeDatas = async () => {
      try {
        await AsyncStorage.setItem('key:Token', window.access_token);
        await AsyncStorage.setItem('key:Password', this.state.password);
      } catch (error) {
        // Error saving data
      }
    }

    _retrieveData = async () => {
      try {
        window.Password = await AsyncStorage.getItem('key:Password');
        this.setState({
          loading : false,
          loadedpass:window.Password
        });
        window.access_token = await AsyncStorage.getItem('key:Token');

        
        if(window.access_token !== null) {
          this.props.navigation.navigate('MainPage');
        }
       } catch (error) {
         // Error retrieving data
       }
    }


  render() {
    return (
      <Root>
      <Container>
        <Modal swipeToClose={false} style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <Image source={require('./004.png')} style={{height:'100%',width:'100%',position:'absolute'}}></Image>
          <Item floatingLabel style={{width: '20%',left:'50%',marginTop:'28%',elevation:1000}}>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',elevation:1000,fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>کد</Label>
              <Input style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/20,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({verCode: text})}
                value={this.state.verCode}
              />
            </Item>
            <Button style={{alignSelf:'center',backgroundColor:'#008ed8',marginTop:'10%', borderRadius:8,width:'40%',height:Dimensions.get('window').height*2/30,elevation:1}} full rounded
            onPress={()=> {
              this.phone_auth_rec(); 
              }}>
            <Text style={{color:"white",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>ثبت کد</Text>
            </Button>
          </Modal>
          <Image source={require('./004.png')} style={{left:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').height, resizeMode:'stretch'}} />
        <Image style={{bottom:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').width,resizeMode:'stretch'}} source={require('./004btm.png')}  />
        
        <Content>

          <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال بررسی اطلاعات...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />

        <Image source={require('./005.png')} style={{width:Dimensions.get('window').width*2/5, height:Dimensions.get('window').width*2/5, alignSelf:'center', marginTop:Dimensions.get('window').height*2/33}} />
        

            <Item floatingLabel style={{alignSelf:'center',width: '80%',elevation:1000}}>
              <Icon name="md-call" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14,elevation:1000}}>شماره موبایل</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({mobileNumber: text})}
                value={this.state.mobileNumber}
              />
            </Item>

            <Button style={{alignSelf:'center',flex:1,marginTop:Dimensions.get('window').height*2/43,backgroundColor:'#008ed8', width:'40%',height:Dimensions.get('window').height*2/30, justifyContent: 'center',alignItems: 'center',alignSelf:'center', borderRadius:8,elevation:1}} full blocked
             onPress={()=>{
              if(this.state.mobileNumber.length != 11) {
                Toast.show({ 
                  text: 'شماره موبایل وارد شده صحیح نمی باشد',
                  position:'top',
                  textStyle: { textAlign: "right"  },
                  duration: 3000
                });
              }
              else if(this.state.loadedpass == '') {
                Toast.show({ 
                  position:'top',
                  text: 'برای اولین ورود نیاز به ورود با شماره مشتری و رمز عبور است',
                  textStyle: { textAlign: "right"  },
                  duration: 5000
                });
              }
              else{
                
                this.phone_auth_send();
                this.refs.modal3.open();
              }
              }}>
            <Text style={{color:'#89fafa',fontSize:Dimensions.get('window').width*1/20,lineHeight:Dimensions.get('window').width*1/20,fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>ارسال کد</Text>
            </Button>


            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
              <Icon name="calculator" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14,elevation:100}}>شماره مشتری</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({customerNum: text})}
                value={this.state.customerNum}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
              <Icon name="lock" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14,elevation:1000}}>رمز عبور</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
              />
            </Item>
            
            <Button style={{alignSelf:'center',marginTop:Dimensions.get('window').height*2/43,backgroundColor:'#008ed8', width:'40%',height:Dimensions.get('window').height*2/30, justifyContent: 'center',alignItems: 'center',flex:1,alignSelf:'center', borderRadius:8}} full blocked
             onPress={()=> {
              if(this.state.password.length < 6) {
                Toast.show({
                  position:'top',
                  text: 'رمز عبور باید بیشتر از 6 حرف باشد',
                  textStyle: { textAlign: "right"  },
                  duration: 3000
                });
              }
              else if(this.state.customerNum.length ==0) {
                Toast.show({
                  position:'top',
                  text: 'شماره مشتری شما معتبر نیست',
                  textStyle: { textAlign: "right"  },
                  duration: 3000
                });
              }
              else {
              this.fetch_login2();
              }
              }}>
            <Text style={{color:'#89fafa',fontSize:Dimensions.get('window').width*1/20,lineHeight:Dimensions.get('window').width*1/20,fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab'}}>ورود</Text>
            </Button>

            <Button transparent
                style={{top:20,left:20,position: 'absolute'}}
                onPress={()=>{this.props.navigation.navigate('RegisterPage')}}
                >
                <Text style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color:"#008ed8",fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>ثبت نام</Text>
                </Button>

        </Content>
      
      </Container>
      </Root>
    );
  }
}

export default login;