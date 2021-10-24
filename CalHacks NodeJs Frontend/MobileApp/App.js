/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './Components/Signup';
import OTPPage from './Components/OTPPage';
import HomePage from './Components/HomePage';
import PhoneNumberReview from './Components/PhoneNumberReview';
import DisplayPhoneReview from './Components/DIsplayPhoneReview';

const Stack = createStackNavigator();
class App extends Component
{
  componentDidMount()
  {

  }
  render()
  {
    return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="OTPPage" component={OTPPage}/>
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen name="Phone Number Review" component={PhoneNumberReview}/>
        <Stack.Screen name="Display Phone Review" component={DisplayPhoneReview}/>
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;