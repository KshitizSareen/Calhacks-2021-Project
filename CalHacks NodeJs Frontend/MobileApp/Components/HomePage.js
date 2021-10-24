/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PhoneNumberReview from './PhoneNumberReview';
import Options from './Options';
import PhoneNumberReviews from './PhoneNumberReviews';

const Tab = createBottomTabNavigator();


class HomePage extends Component
{
    render()
    {
        return(
            <Tab.Navigator screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Options" component={Options}/>
                <Tab.Screen name="Phone Number Reviews" component={PhoneNumberReviews}/>
            </Tab.Navigator>
        )
    }
}
export default HomePage;