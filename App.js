console.disableYellowBox = true;

import React from 'react';

import SignInScreen from './screens/SignInScreen';
import MapScreen from './screens/MapScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MonumentScreen from './screens/MonumentScreen';
import PlanScreen from './screens/PlanScreen';
import QuizzScreen from './screens/QuizzScreen';
import WinScreen from './screens/WinScreen';
import ListBadgeScreen from './screens/ListBadgeScreen';
import AccountScreen from './screens/AccountScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import List from "./screens/ListScreen";
import ResaPasséesScreen from './screens/ResaPasséesScreen';
import ChatScreen from './screens/ChatScreen';


import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import token from './reducers/token';
import score from './reducers/score';
import typeVisit from './reducers/typeVisite';
import idMonument from './reducers/idMonument';
import saveId from "../Guidance-Frontend/reducers/saveId"



const store = createStore(combineReducers({token, score, typeVisit, idMonument,saveId}));



var StackNavigator = createStackNavigator ({
  SignIn: SignInScreen,
  Map: MapScreen,
  MyBadges:ListBadgeScreen,
  SignUp: SignUpScreen,
  Favorites: FavoritesScreen,
  Visit: MonumentScreen,
  Reserve: ResaPasséesScreen,
  List:List,
  Account: AccountScreen,
  Quizz: QuizzScreen,
  Win: WinScreen,
  Plan: PlanScreen,
  Chat: ChatScreen
},{headerMode:"none"})

const Navigation = createAppContainer(StackNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
 }

