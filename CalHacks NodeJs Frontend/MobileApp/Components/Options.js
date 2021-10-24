/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Options extends Component
{
    render()
    {
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("Phone Number Review");
                }}>
                    <Text style={{color: 'black'}}> Add Phone Review</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Options;