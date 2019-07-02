import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button , Icon, Toast, Root} from 'native-base';
import {StyleSheet,Text, Image, AsyncStorage,Dimensions,Platform} from 'react-native';
import Modal from 'react-native-modalbox';

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

class register extends Component {
constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      mobileNumber: '', 
      verCode: '',
      name: '',
      password:'',
      customerNum:''
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

    fetch_register () {
      fetch(API_URL + '/auth/signup?' + 'name=' + this.state.name + '&mobile=' + this.state.mobileNumber + '&password=' + this.state.password + '&customerNum=' + this.state.customerNum , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson != undefined){
          if(responseJson.message == '#succesUser'){
            this.fetch_login();
            }
        }
      })
      .catch((error) => {
          Toast.show({ position:'top',       text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red'  },       duration: 3000     });
      });
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
          this.fetch_register();
        }
        })
      .catch((error) => {
          Toast.show({position:'top',text: 'اختلال در اتصال به شبکه',textStyle: { textAlign: "right",color:'red'  },duration: 3000});
      });
    }

    fetch_customerNum () {
      fetch(API_URL + '/auth/signup?' + 'name=' + this.state.name + '&email=' + this.state.email + '&password=' + this.state.password , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((responseJson) => { 
        if(responseJson != undefined){
          //alert(API_URL + '/auth/signup?' + 'name=' + this.state.name + '&email=' + this.state.email + '&password=' + this.state.password);
          if(responseJson.message == 'Successfully created user!')
            this.props.navigation.navigate('LoginPage')
        }
      })
      .catch((error) => {
          Toast.show({  position:'top',      text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red'  },       duration: 3000     });
      });
    }

    fetch_login () {
      fetch(API_URL + '/auth/login?' + '&mobile=' + this.state.mobileNumber + '&password=' + this.state.password , {
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
            window.password = this.state.password;
            // alert('injayi ke man migam :D' + window.password + ' ' + window.access_token + ' '+ this.state.password + ' '+responseJson.access_token);
            this._storeData();
            this.props.navigation.navigate('MainPage');
          } 
          else if(responseJson.message == 'Unauthorized') {
            Toast.show({
              position:'top', 
              text: 'در حال حاضر امکان ورود شما وجود ندارد',
              textStyle: { textAlign: "right"  },
              duration: 3000
            });
          }
        }
      })
      .catch((error) => {
          Toast.show({    position:'top',    text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red'  },       duration: 3000     });
      });
    }

    _storeData = async () => {
      try {
        await AsyncStorage.setItem('key:Password', window.password);
        await AsyncStorage.setItem('key:Token', window.access_token);
      } catch (error) {
        // Error saving data
      }
    }

  render() {
    return (
      <Root>
      <Container>

              <Modal swipeToClose={false} style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <Image source={require('../login/004.png')} style={{height:'100%',width:'100%',position:'absolute'}}></Image>
          <Item floatingLabel style={{width: '20%',left:'50%',marginTop:'28%'}}>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>کد</Label>
              <Input style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right'}}
                onChangeText={(text) => this.setState({verCode: text})}
                value={this.state.verCode}
              />
            </Item>
            <Button style={{width:'40%',alignSelf:'center',backgroundColor:'#008ed8',marginTop:'10%', borderRadius:8}} full rounded
            onPress={()=> {
              this.phone_auth_rec(); 
              }}>
            <Text style={{color:"white",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>ثبت کد</Text>
            </Button>
          </Modal>

        <Image source={require('../login/004.png')} style={{left:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').height, resizeMode:'stretch'}} />
        <Image style={{bottom:0,position:"absolute", width:Dimensions.get('window').width,height:Dimensions.get('window').width,resizeMode:'stretch'}} source={require('../login/004btm.png')}  />
        
        <Content>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*4/43}}>
            <Icon name="person" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>نام و نام خانوادگی</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => {
                  this.setState({name: text})
                  }
                  }
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="md-call" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>شماره موبایل</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => {
                this.setState({mobileNumber: text})
              }
              }
                value={this.state.mobileNumber}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="calculator" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>شماره مشتری</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({customerNum: text})}
                value={this.state.customerNum}
                secureTextEntry={true}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="lock" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/14}}>رمز عبور</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
              />
            </Item>

            <Button style={{alignSelf:'center',flex:1,marginTop:Dimensions.get('window').height*2/43,height:Dimensions.get('window').height*2/30,backgroundColor:'#008ed8', width:'40%',justifyContent: 'center',alignItems: 'center', borderRadius:8}} full blocked
            // onPress={()=> {this.props.navigation.navigate('MainPage')}}>
            onPress={()=>{
              if(this.state.name.length < 5) {
                Toast.show({
                  position:'top',
                  text: 'نام و نام خانوادگی باید بیشتر از 5 حرف باشد',
                  textStyle: { textAlign: "right"  },
                  duration: 3000
                });
              }
              else if(this.state.mobileNumber.length != 11) {
                Toast.show({
                  position:'top',
                  text: 'شماره موبایل شما معتبر نمی باشد',
                  textStyle: { textAlign: "right"  },
                  duration: 3000
                });
              }
              else if(this.state.password.length < 6) {
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
                this.phone_auth_send();
                this.refs.modal3.open();
              }
              }}>
            <Text style={{color:'#89fafa', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab', fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/25}}>ارسال کد</Text>
            </Button>

            <Button transparent
                style={{top:20,left:20,position: 'absolute'}}
                onPress={()=>{this.props.navigation.navigate('LoginPage')}}
                >
                <Text style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color:"#008ed8",fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/25}}>ورود</Text>
            </Button>

        </Content>
      </Container>
      </Root>


    );
  }
}

export default register;