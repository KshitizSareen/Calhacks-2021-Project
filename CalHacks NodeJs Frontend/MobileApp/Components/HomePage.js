/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PhoneNumberReview from './PhoneNumberReview';
import Options from './Options';
import PhoneNumberReviews from './PhoneNumberReviews';
import TwitterReviews from './TwitterReviews';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhoneAlt, faRetweet } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();


class HomePage extends Component
{
    render()
    {
        return(
            <Tab.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Tab.Screen  name="Phone Number Reviews" component={PhoneNumberReviews} options={{
                    tabBarIcon: ()=>{
                        return(
                            <FontAwesomeIcon icon={faPhoneAlt} size="22" color="#0593ff"/>
                        )
                    },
                    tabBarLabel: ()=>{
                        return <Text style={{
                            color: 'black'
                        }}>Phone Number Reviews</Text>
                    }
                }}/>
                <Tab.Screen name="Twitter Reviews" component={TwitterReviews} options={{
                    tabBarIcon: ()=>{
                        return(
                           <Image source={require('../Static/Twitter.jpeg')} style={{
                               width: 30,
                               height: 30,
                           }} />
                        )
                    },
                    tabBarLabel: ()=>{
                        return <Text style={{
                            color: 'black'
                        }}>Tweet Reviews</Text>
                    }
                }}/>
            </Tab.Navigator>
        )
    }
}
export default HomePage;