import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  BackHandler,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Icon, Button, Container, Header, Left, Body, Segment,Toast,Badge, Right, Accordion, View, Text, Content } from 'native-base';
import { withNavigation } from 'react-navigation';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

var API_URL = require('../config/config.js');

class productLists extends Component {
  constructor(props) {
    super(props);
    this.state =  {
        loading:true,
        height:0,
        loaded:true,
        bulb:"ios-bulb-outline",
        type: "لامپ های",
        dataArray: global.dataArray_light,
        dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows([
        'Simplicity Matters'
        ]),
        dataSourceProduct: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows([
          'Simplicity Matters'
        ])
    };
    global.products_light = [];
    global.products_lamp = [];
    global.products_lampid = [];
    global.products_lightid = [];
    global.dataArray_lamp = [];
    global.dataArray_light = [];
    global.dataArray_lampIMG = [];
    global.dataArray_lightIMG = [];
  }

  _retrieveData = async () => {
    try {
      window.Password = await AsyncStorage.getItem('key:Password');
      this.setState({
        loadedpass:window.Password
      });
      window.access_token = await AsyncStorage.getItem('key:Token');
      this.fetchsave_productList(window.access_token);
      responseJson = JSON.parse(await AsyncStorage.getItem('key:Products'));
      
      
      if(responseJson !== null) {
        var countType = Object.keys(responseJson.message).length;
          for(let i = 0; i < countType; i++){
            var countTitle = Object.keys(responseJson.message[i].families).length;
            for(let j = 0; j <countTitle; j++) {
              if(responseJson.message[i].type == 'چراغ') {
                global.dataArray_light.push({
                  title: responseJson.message[i].families[j].title,
                  content: responseJson.message[i].families[j].content
                });
                global.products_light[j] = responseJson.message[i].families[j].products;
                global.products_lightid[j] = responseJson.message[i].families[j].id; 
                global.dataArray_lightIMG[j] = responseJson.message[i].families[j].imageURL;
              }
              else {
                global.dataArray_lamp.push({
                  title: responseJson.message[i].families[j].title,
                  content: responseJson.message[i].families[j].content
                });
                global.products_lamp[j] = responseJson.message[i].families[j].products;
                global.products_lampid[j] = responseJson.message[i].families[j].id;
                global.dataArray_lampIMG[j] = responseJson.message[i].families[j].imageURL;
              }
            }
          }
          this.setState({
            dataArray : global.dataArray_lamp,dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
              }).cloneWithRows([
              'sela'
              ]),loading:false
          });    
      }else{
        if(this.props.navigation.getParam('test') != 'true'){
          this.fetch_productList(window.access_token);
        }
      }
      
      if(window.access_token !== null) {
        // this.props.navigation.navigate('MainPage');
      }
     } catch (error) {
       // Error retrieving data
     }
  }


  _storeProducts = async (products) => {
    try {
      await AsyncStorage.setItem('key:Products', JSON.stringify(products));
    } catch (error) {
      // Error saving data
    }
  }

componentWillMount() {
  setTimeout(() => {
    this.setState({loading:false});
  }, 2000);
  this._retrieveData();
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    this.props.navigation.navigate('MainPage',{goback : 'yes'});
    return true;
  });
}

  fetch_productList(access_token) {
      fetch(API_URL + '/auth/getProductFamilies' , {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        variable = responseJson + '';
        if(variable != 'undefined'){
          var countType = Object.keys(responseJson.message).length;
          for(let i = 0; i < countType; i++){
            var countTitle = Object.keys(responseJson.message[i].families).length;
            for(let j = 0; j <countTitle; j++) {
              if(responseJson.message[i].type == 'چراغ') {
                global.dataArray_light.push({
                  title: responseJson.message[i].families[j].title,
                  content: responseJson.message[i].families[j].content
                });
                global.products_light[j] = responseJson.message[i].families[j].products;
                global.products_lightid[j] = responseJson.message[i].families[j].id; 
                global.dataArray_lightIMG[j] = responseJson.message[i].families[j].imageURL;
              }
              else {
                global.dataArray_lamp.push({
                  title: responseJson.message[i].families[j].title,
                  content: responseJson.message[i].families[j].content
                });
                global.products_lamp[j] = responseJson.message[i].families[j].products;
                global.products_lampid[j] = responseJson.message[i].families[j].id;
                global.dataArray_lampIMG[j] = responseJson.message[i].families[j].imageURL;
              }
            }
          }
          this.setState({
            dataArray : global.dataArray_lamp,dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
              }).cloneWithRows([
              'sela'
              ]),loading:false
          });     
        }
      })
      .catch((error) => {
          Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
      });     
}

fetchsave_productList(access_token) {
  fetch(API_URL + '/auth/getProductFamilies' , {
    method: 'GET',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + access_token,
    },
  }).then((response) => response.json())
  .then((responseJson) => {
    variable = responseJson + '';
    if(variable != 'undefined'){
      this._storeProducts(responseJson);
    }
  })
  .catch((error) => {
      Toast.show({        text: 'اختلال در اتصال به شبکه',       textStyle: { textAlign: "right",color:'red' },       duration: 3000     });
  });     
}

_renderHeader(content, isActive) {
  return (
    <View
      style={{ height:Dimensions.get('window').height*1/15,flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#b7daf8" }}
    >
      {isActive
        ? <Icon style={{ fontSize:Dimensions.get('window').width*1/20 }} name="remove-circle" />
        : <Icon style={{ fontSize:Dimensions.get('window').width*1/20  }} name="add-circle" />}
        <Text style={{ fontSize:Dimensions.get('window').width*1/25,fontWeight: "600" }}>
        {" "}{content.title}
      </Text>
    </View>
  );
}


  _renderContent = (content) => {
    myproducts = [];
    myproductsid = 0;
    myproductIMG = 0;
    myproductrender = [];

    if(this.state.bulb=="ios-bulb" && global.products_light[content.content]){
      myproducts = global.products_light[content.content];
      myproductsid = global.products_lightid[content.content];
      myproductIMG = global.dataArray_lightIMG[content.content][0];
    }else if(this.state.bulb=="ios-bulb-outline"){
      myproducts = global.products_lamp[content.content];
      myproductsid = global.products_lampid[content.content];
      myproductIMG = global.dataArray_lampIMG[content.content][0];
      }
      // alert(myproductsid);
      // alert(myproducts + JSON.stringify(global.products_lamp) + this.state.bulb);

      for(let i = 0; i < Object.keys(myproducts).length; i++){
        myproductrender[i] = i;
      }

    return (
    <ListView
        ref="ListView"
        style={styles.container}

        dataSource ={ new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
          }).cloneWithRows(myproductrender)
        }
        
        renderRow={(rowData) => (
          <View>

          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ProductSeries",{route:"ProductLists",name : myproducts[rowData],id : myproductsid[rowData],family : content.title, imageURL : myproductIMG})}}>
            <Text
            style={{height:Dimensions.get('window').height*1/15,alignSelf:'flex-end',direction:'rtl',textAlign:'right',fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40, padding: 10,paddingLeft:20 }}
            >
            {
              myproducts[rowData]
            }
            </Text>
          </TouchableOpacity>
        
          </View>
         )}
    />
    );
  }
  
  render() {
    const { onScroll = () => {} } = this.props;

    return (
    <Container style={{backgroundColor:'#00ccff'}}>
        <Header hasSegment style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
        <Left>
          <Button transparent onPress={()=>{this.props.navigation.openDrawer();}}>
          <Image source={require('../home/001.png')} style={{width:Dimensions.get('window').height*1/23,height:Dimensions.get('window').height*1/23}} />
          </Button>
        </Left>
        
        <Body>
            <Button rounded first style={{width:'30%',aspectRatio:1,justifyContent:'center',backgroundColor:'#336799'}} onPress={()=>{
                // alert(JSON.stringify(window.access_token));
                if(this.state.bulb=="ios-bulb"){
                    this.setState({
                        bulb:"ios-bulb-outline",
                        type: "لامپ های",
                        dataArray:dataArray_lamp,
                        dataSource : new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2
                          }).cloneWithRows([
                            'eli'
                          ]),
                        dataSourceProduct :global.products_lamp
                    });
                }else if(this.state.bulb=="ios-bulb-outline"){
                    this.setState({
                        bulb:"ios-bulb",
                        type: "چراغ های",
                        dataArray:dataArray_light,
                        dataSource : new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2
                          }).cloneWithRows([
                            'sela'
                          ]),
                        dataSourceProduct :global.products_light
                    });
                }
                }}><Icon name={this.state.bulb} style={{color:'white',width:Dimensions.get('window').width*1/5,height:Dimensions.get('window').width*1/15,alignSelf:'center',textAlign:'center',fontSize:Dimensions.get('window').width*1/15}}/></Button>
        </Body>
        <Right>
        <Button badge vertical style={{marginTop:0,backgroundColor:'#'}} //-8
        onPress={()=>{this.props.navigation.navigate('basket')}}>
              {/* <Badge success style={{top:8}}><Text>2</Text></Badge> */}
              <Icon name="ios-basket" style={{color:"white",fontSize:Dimensions.get('window').width*1/15,width:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15}} />
            </Button>
        </Right>
      </Header>

        <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'لطفا صبر کنید...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />


      <ListView
        removeClippedSubviews={false}
        ref="ListView"
        style={styles.container}
        //dataSource={ this.state.dataSource }
        dataSource ={this.state.dataSource}
        
        renderRow={(rowData) => (
            <View>
              <Accordion
                  dataArray={this.state.dataArray}
                  headerStyle={{backgroundColor: "#b7daf8",direction:'rtl'}}
                  renderContent={this._renderContent}
                  renderHeader={this._renderHeader}
              />
          {/* <TouchableHighlight
          onPress={()=> {this.setState({height:60});}}>
          <View key={rowData} style={ styles.row }>
            <Text>
              { rowData }
            </Text>
          </View>
          </TouchableHighlight> */}

          </View>
         )}

        renderScrollComponent={props => (
          <ParallaxScrollView
            onScroll={onScroll}
            backgroundColor="#b7daf8"
            headerBackgroundColor="#b7daf8"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}

            renderBackground={() => (
              <View key="background">
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: '#b7daf8',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
            )}

            renderForeground={() => (
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={
                  require('./0031.png')
                } style={{width: '100%',height:'100%',aspectRatio:1}}/>
                <Text style={ styles.sectionSpeakerText  }>
                 فروش محصولات شرکت بروکس
                </Text>
                <Text style={ styles.sectionTitleText }>
                  معرفی {this.state.type} شرکت بروکس
                </Text>
              </View>
            )}

            renderStickyHeader={() => (
              <View key="sticky-header" style={{
                height: STICKY_HEADER_HEIGHT,
                width: 300,
                justifyContent: 'flex-end'}}>
            <Text style={{color: 'white',
                fontSize: 20,
                margin: 10}}>محصولات شرکت بروکس</Text>
              </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={{
                position: 'absolute',
                bottom: 10,
                right: 10}}>
                <Icon style={styles.fixedSectionText} name="ios-arrow-dropup"
                      onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                </Icon>
              </View>
            )}

            />
        )}
      />
      </Container>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 220;
const ROW_HEIGHT = 600;
const PARALLAX_HEADER_HEIGHT = Dimensions.get('window').width;
const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    
  },
  fixedSection: {
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 30
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 2
  },
  avatar: {
    // opacity:0,
    marginBottom: 10,
    // borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    top:Dimensions.get('window').width*1/2,
    position:'absolute',
    fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',
    color: 'white',
    fontSize:Dimensions.get('window').height*1/45,lineHeight:Dimensions.get('window').height*1/40,
    paddingVertical: 5
  },
  sectionTitleText: {
    top:Dimensions.get('window').width*23/40,
    position:'absolute',
    fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',
    color: 'white',
    fontSize:Dimensions.get('window').height*1/50,lineHeight:Dimensions.get('window').height*1/45,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default withNavigation(productLists);