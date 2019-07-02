import React from 'react';
import LoginPage from "../login/login.js";
import RegisterPage from "../register/register.js";
import MainPage from "./main.js";
import WarrantyPage from '../Warranty/warranty.js'
import ShowWarranty from '../Warranty/showwarranty.js';
import ProductPage from '../product/product.js'
import { DrawerNavigator } from "react-navigation"; 
import photonPage from '../photon/photon.js';
import pdfPage from '../photon/pdf.js';
import NewsPage from '../news/news.js';
import ProductSeries from '../Products/productSeries.js';
import ProductLists from '../Products/productLists.js';
import basket from '../Basket/basket.js';
import starter from '../login/starter.js';
import SideBar from '../sidebar/sidebar.js';
import orders from '../orders/orders.js';
import catalogue from '../catalogue/catalogue.js';
import cataloguepage from '../catalogue/cataloguepage.js';
import aboutus from '../Aboutus/aboutus.js';
import Khadamat from '../Aboutus/khadamat.js';
import Ertebat from '../Aboutus/ertebat.js';
import Game from '../Game/game.js';
import Update from '../Game/update.js';
import cataloguepdf from '../catalogue/cataloguepdf.js';
import { Root } from "native-base";
import { Dimensions } from 'react-native';

const Home = DrawerNavigator(
  { 
    starter: { screen: starter},
    RegisterPage: { screen: RegisterPage},
    LoginPage: { screen: LoginPage},
    MainPage: { screen: MainPage},
    orders: { screen: orders},
    catalogue: { screen: catalogue},
    cataloguepage: { screen: cataloguepage},
    photonPage: { screen: photonPage},
    ProductLists: { screen: ProductLists},
    ProductPage : { screen: ProductPage},
    ProductSeries: { screen: ProductSeries},
    NewsPage: { screen: NewsPage},
    basket: { screen: basket},
    pdfPage: { screen: pdfPage},
    aboutus: {screen : aboutus},
    WarrantyPage: { screen: WarrantyPage},
    ShowWarranty: {screen : ShowWarranty},
    Khadamat: {screen : Khadamat},
    Ertebat: {screen : Ertebat},
    Game : {screen : Game },
    cataloguepdf : {screen : cataloguepdf},
    Update:{screen : Update}
  }
  ,
  {
    contentComponent: props => <SideBar {...props} />,
    drawerPosition : 'left',
    drawerWidth: Dimensions.get('window').width*8/10,
    drawerLockMode : 'locked-closed',
    drawerBackgroundColor: "transparent ",
  }
  
);
export default () =>
  <Root>
    <Home />
  </Root>;