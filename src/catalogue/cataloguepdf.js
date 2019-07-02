import React, { Component } from 'react';
import { Container, Header, Body, Content, Form, Item, Input, Label, Button, Icon, Right, Left, Title, Card, CardItem, Thumbnail } from 'native-base';
import {WebView,BackHandler,Dimensions,Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class cataloguepdf extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
          loading:true
        };
      }

    componentWillMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('catalogue');
            return true;
          });
          setTimeout(() => {
            this.setState({loading:false});
          }, 5000);
    }

    render() {
    return (
    <Container>

    <Header  style={{height:Dimensions.get('window').height*1/10,borderBottomStartRadius:10,borderBottomEndRadius:10,backgroundColor:'#336799'}}>
    <Left style={{flex:0.3}}>
        <Button transparent
        onPress={()=>{this.props.navigation.navigate('catalogue')}}
        >
        <Icon name='arrow-back'  style={{fontSize:Dimensions.get('window').width*1/15,height:Dimensions.get('window').width*1/15,color: "white",width:'20%'}}/>
        </Button>
    </Left>
    <Right style={{flex:0.7}}>
        <Title style={{fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',fontSize:Dimensions.get('window').height*1/35}}>کاتالوگ</Title>
    </Right>
    </Header>

    <Spinner
          visible={this.state.loading}
          overlayColor={"rgba(0, 0, 0, 0.8)"}
          textContent={'در حال دریافت کاتالوگ...'}
          textStyle={{direction:'rtl',fontFamily:Platform.OS === 'ios' ? 'Mj_Saudi Arabia' : 'mjsaudiarab',color: '#FFF'}}
          />
    
    <WebView onLoadEnd={e => this.setState({loading:false})} onError={e => this.setState({loading:false})}  source={{uri: this.props.navigation.getParam('pdf')}}>
    </WebView>

    </Container>

    )}
}

export default cataloguepdf;