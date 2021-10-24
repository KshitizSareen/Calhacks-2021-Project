/* eslint-disable prettier/prettier */
import axios from 'axios';
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class OTPPage extends Component
{
    constructor()
    {
        super();
        this.state={
            Digit1: "",
            Digit2: "",
            Digit3: "",
            Digit4: "",
            OTP: "0000",
        }
    }
    componentDidMount()
    {
        this.SendOTP();
    }

    SendOTP=()=>{
        axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/Send/OTP",{
            PhoneNo: auth().currentUser.phoneNumber
        }).then(res=>{
            this.setState({OTP: res.data});
        });
    }
    render()
    {
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <Text style={{
                    fontSize: 26,
                    color: 'black',
                    textAlign: 'center',
                }}>Please enter the OTP sent to the number associated with this account</Text>
                <View style={{
                    marginTop: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 0.7*width,
                    alignItems: 'center'
                }}>
                        <TextInput style={{
                            borderRadius: 50,
                            width: 0.15*width,
                            height: 0.15*width,
                            backgroundColor: 'lightblue',
                            textAlign: 'center',
                            fontSize: 26
                        }} keyboardType="number-pad" value={this.state.Digit1} maxLength={1} onChange={(value)=>{
                            this.setState({Digit1: value.nativeEvent.text});
                        }}/>
                        
                        <TextInput style={{
                            borderRadius: 50,
                            width: 0.15*width,
                            height: 0.15*width,
                            backgroundColor: 'lightblue',
                            textAlign: 'center',
                            fontSize: 26
                        }} keyboardType="number-pad" value={this.state.Digit2} maxLength={1} onChange={(value)=>{
                            this.setState({Digit2: value.nativeEvent.text});
                        }}/>
                       
                        <TextInput style={{
                            borderRadius: 50,
                            width: 0.15*width,
                            height: 0.15*width,
                            backgroundColor: 'lightblue',
                            textAlign: 'center',
                            fontSize: 26
                        }} keyboardType="number-pad" value={this.state.Digit3} maxLength={1} onChange={(value)=>{
                            this.setState({Digit3: value.nativeEvent.text});
                        }}/>
                        
                        <TextInput style={{
                            borderRadius: 50,
                            width: 0.15*width,
                            height: 0.15*width,
                            backgroundColor: 'lightblue',
                            textAlign: 'center',
                            fontSize: 26
                        }} keyboardType="number-pad" value={this.state.Digit4} maxLength={1} onChange={(value)=>{
                            this.setState({Digit4: value.nativeEvent.text});
                        }}/>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: '#0593ff',
                    width: 0.8*width,
                    height: 0.05*height,
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50
                }} onPress={()=>{
                    const InputOTP = this.state.Digit1+this.state.Digit2+this.state.Digit3+this.state.Digit4;
                    if(InputOTP==this.state.OTP)
                    {
                        this.props.navigation.navigate("HomePage");
                    }
                    else
                    {
                        Alert.alert("","OTP Unverified");
                    }
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default OTPPage;