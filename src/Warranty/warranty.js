import React, { Component } from 'react';
import { Container, Header, Content, Form, Item,Left,Right,Body,Title,Toast, Input, Label, Button , Icon, Root} from 'native-base';
import {StyleSheet,Text,TouchableOpacity,Alert,BackHandler, Image,Platform, AsyncStorage,Dimensions,ScrollView,View} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
var API_URL = require('../config/config.js');

class warranty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : "",
      watt : "",
      count : "",
      price : "",
      sum : '0',
      counter : 0,
      status: 'در حال بررسی',
      id : -1,
      loading:true,
      tableHead: ['قیمت واحد', 'تعداد', 'توان', 'کد کالا'],
      tableData: [
      ]
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

    fetch_warranty() {
      fetch(API_URL + '/auth/addWarrantynum?status=' + this.state.status + '&note=' + this.state.status
      , {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+window.access_token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(variable != 'undefined'){
          this.setState({id:JSON.stringify(responseJson)});
          Toast.show({
            text: 'مرجوعی شما به شماره فاکتور '+this.state.id+' ثبت شده و پیگیری میشود',
            textStyle: { textAlign: "right" },
            duration: 3000
          });
          for(let i = 0 ; i < this.state.counter ; i++){
            fetch(API_URL + '/auth/addWarranty?name=' + this.state.tableData[i][3] + '&watt=' + this.state.tableData[i][2] + '&count=' + this.state.tableData[i][1] + '&price=' + this.state.tableData[i][0] + '&id=' + this.state.id
            , {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+window.access_token,
              },
            }).then((response) => response.json())
            .then((responseJson) => {
              if(variable != 'undefined'){
                // alert(API_URL + '/auth/addWarranty?name=' + this.state.tableData[i][3] + '&watt=' + this.state.tableData[i][2] + '&count=' + this.state.tableData[i][1] + '&price=' + this.state.tableData[i][0] + '&id=' + this.state.id);
              }
              this.forceUpdate();
            })
            .catch((error) => {
                Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
            });
          }
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });
    }

    fixNumbers = (str) => {
      let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
      for(let i = 0; i < 10; i++) {
        if(typeof(str) == "string"){
          str = str.replace(persianNumbers[i], i)
        }
      }
      return str;
    };

  renderer(index){
    if(this.state.sum == 0){
      Toast.show({
        text: 'برای ثبت مرجوعی حداقل یک کالا را وارد کنید',
        textStyle: { textAlign: "right" },
        duration: 3000
      });
    }
    else if(index == this.state.tableData.length - 1){
      this.fetch_warranty();
    }else
    {
      var tmp = this.state.tableData;
      this.setState({ sum:parseInt(this.fixNumbers(this.state.sum))-parseInt(this.fixNumbers(this.state.tableData[index][0])) });
      var dif = this.fixNumbers(this.state.tableData[index][0]);
      var not = tmp.splice(index, 1);
      var not = tmp.splice(tmp.length-1, 1);
      this.setState({ tableData: [...tmp, ["",parseInt(this.fixNumbers(this.state.sum))-parseInt(dif),"مجموع","ارسال"] ],counter:this.state.counter-1 });

    }
  }



  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('MainPage');
      return true;
    });
    setTimeout(() => {
      this.setState({loading:false});
    }, 2000);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const element = (data, index) => (
      <TouchableOpacity onPress={() => {this.renderer(index)}}>
        <View style={styles.btn} style={{backgroundColor : index == this.state.tableData.length - 1 ? 'black' :'#78B7BB'}}>
          <Text style={styles.btnText}>{data}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <Root>
        <Container>

        <Header style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left style={{flex:0.3}}>
            <Button transparent
            onPress={()=>{this.props.navigation.navigate('MainPage')}}
            >
              <Icon name='arrow-back' style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color:"white",width:'20%'}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>ثبت مرجوعی</Title>
        </Right>
        </Header>

        <Content>
          <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="md-bulb" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>کد کالا</Label>
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
            <Icon name="md-flash" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
            <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>توان</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({watt: text})}
                value={this.state.watt}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="md-apps" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>تعداد</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => this.setState({count: text})}
                value={this.state.count}
              />
            </Item>
            <Item floatingLabel style={{alignSelf:'center',width: '80%',marginTop:Dimensions.get('window').height*2/43}}>
            <Icon name="md-cash" style={{color:"#008ed8",fontSize:Dimensions.get('window').width*1/15}}></Icon>
              <Label style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>قیمت واحد</Label>
              <Input
                style={{color:"#008ed8",fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',textAlign:'right',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}
                onChangeText={(text) => {
                  this.setState({price: text})
                  }
                  }
                value={this.state.price}
              />
            </Item>

            <Button style={{alignSelf:'center',flex:1,marginTop:Dimensions.get('window').height*2/43,height:Dimensions.get('window').height*2/30,backgroundColor:'#008ed8', width:'40%',justifyContent: 'center',alignItems: 'center', borderRadius:8}} full blocked
            // onPress={()=> {this.props.navigation.navigate('MainPage')}}>
            onPress={()=>{
              if(this.state.name.length < 1) {
                Toast.show({
                  text: 'کد کالا اجباری است',
                  textStyle: { textAlign: "right" },
                  duration: 3000
                });
              }
              else if(this.state.watt.length < 1) {
                Toast.show({
                  text: 'توان کالا اجباری است',
                  textStyle: { textAlign: "right" },
                  duration: 3000
                });
              }
              else if(this.state.count.length < 1) {
                Toast.show({
                  text: 'تعداد کالا اجباری است',
                  textStyle: { textAlign: "right" },
                  duration: 3000
                });
              }
              else if(this.state.price.length < 1) {
                Toast.show({
                  text: 'قیمت کالا اجباری است',
                  textStyle: { textAlign: "right" },
                  duration: 3000
                });
              }
              else {
                // this.setState({tableData:});
                var tmp = this.state.tableData;
                var not = tmp.splice(tmp.length-1, 1);
                this.setState({ sum:parseInt(this.state.sum)+parseInt(this.fixNumbers(this.state.price))*parseInt(this.fixNumbers(this.state.count)) });
                this.setState({ tableData: [...[...tmp, [this.state.price,this.state.count,this.state.watt,this.state.name] ], ["",parseInt(this.state.sum)+parseInt(this.fixNumbers(this.state.price))*parseInt(this.fixNumbers(this.state.count)),"مجموع","ارسال"] ],counter : this.state.counter+1 });
              }
              }}>
            <Text style={{color:'#89fafa', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab', fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/25}}>اضافه کن</Text>
            </Button>
        

        <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            this.state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
      <Button style={{alignSelf:'center',flex:1,marginTop:Dimensions.get('window').height*2/43,height:Dimensions.get('window').height*2/30,backgroundColor:'#008ed8', width:'40%',justifyContent: 'center',alignItems: 'center', borderRadius:8}} full blocked
            onPress={()=> {this.props.navigation.navigate('ShowWarranty')}}>
            <Text style={{color:'#89fafa', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab', fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/20}}>پیگیری</Text>
            </Button>
      </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' ,textAlign:'right'},
  text: { margin: 6,textAlign:'right' },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 68, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default warranty;