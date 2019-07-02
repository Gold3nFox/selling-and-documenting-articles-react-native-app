import React, { Component } from 'react';
import { Container, Header, Content, Form, Item,ActionSheet,Left,Right,Body,Title, Input, Label,Picker, Button , Icon, Toast, Root} from 'native-base';
import {StyleSheet,Text,TouchableOpacity,BackHandler,Alert,Platform, Image, AsyncStorage,Dimensions,ScrollView,View} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
var API_URL = require('../config/config.js');
// var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


class showwarranty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids : [],
      loading:true,
      tableHead: ['قیمت واحد', 'تعداد', 'توان', 'کد کالا'],
      tableData: [
      ],
      clicked:0
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('WarrantyPage');
      return true;
    });
      this.fetch_warranty();
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

    fetch_warranty() {
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
      fetch(API_URL + '/auth/getNumbers'
      , {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+window.access_token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if(variable != 'undefined'){
          this.setState({ids:responseJson,loading:false});
        }
        this.forceUpdate();
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });
    }

    fetch_warrantylist(index) {
        fetch(API_URL + '/auth/showWarranty?id=' + index
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
            this.setState({tableData:responseJson});
            // alert(API_URL + '/auth/showWarranty?id=' + index);
          }
          this.forceUpdate();
        })
        .catch((error) => {
            Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
        });
    }

  render() {
    const element = (data, index) => (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.btn}>
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
            onPress={()=>{this.props.navigation.navigate('WarrantyPage')}}
            >
              <Icon name='arrow-back' style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color:"white",width:'20%'}} />
            </Button>
        </Left>
        <Right style={{flex:0.7}}>
            <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>پیگیری مرجوعی</Title>
        </Right>
        </Header>

        <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت مرجوعی ها...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />

        <Content>
        <View style={styles.container}>
        <Button
            style={{alignSelf:'flex-end',marginBottom:20,textAlign:'center',backgroundColor:'#008ed8',justifyContent: 'center',alignItems: 'center',flex:1,marginTop:25,backgroundColor:'#008ed8', width:'40%',borderRadius:8,marginTop:Dimensions.get('window').height*2/43,height:Dimensions.get('window').height*2/30,}}
            onPress={() =>{
              if(this.state.ids.length == 0){
                Toast.show({        text: 'مرجوعی ثبت نشده است',       textStyle: {textAlign: "right"},       duration: 3000     });
              }else{
            ActionSheet.show(
              {
                options: this.state.ids,
                title: " - شماره فاکتور - "
              },
              buttonIndex => {
                this.setState({ clicked: this.state.ids[buttonIndex] });
                this.fetch_warrantylist(this.state.ids[buttonIndex]);
              }
            );}}}
          >
            <Text style={{color:'#89fafa', fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').width*1/25,lineHeight:Dimensions.get('window').width*1/25}}> - شماره فاکتور - </Text>
          </Button>
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
      </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97',textAlign:'right' },
  text: { margin: 6,textAlign:'right' },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 68, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default showwarranty;