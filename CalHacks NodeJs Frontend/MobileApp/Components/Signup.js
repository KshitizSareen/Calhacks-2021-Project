/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faEnvelope, faLock, faPhone, faPhoneAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Signup extends Component
{

    constructor()
    {
        super();
        this.state={
            Email: "",
            Username: "",
            Password: "",
            PhoneNo: "",
        }
    }

    render()
    {
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Image style={{
                    width: (392/453)*0.15*height,
                    height: 0.15*height,
                    alignSelf: 'flex-end',
                    marginRight: '2.5%'
                }} source={require('../Static/Logo.jpeg')}/>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                    alignSelf: 'flex-start',
                    marginLeft: '2.5%'
                }}>Signup</Text>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.95*width,
                }}>
                <FontAwesomeIcon icon={faEnvelope}/>
                <TextInput value={this.state.Email} placeholder="Email" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Email: value.nativeEvent.text});
                }}/>
                </View>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.95*width,
                }}>
                <FontAwesomeIcon icon={faUser}/>
                <TextInput value={this.state.Username} placeholder="Username" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Username: value.nativeEvent.text});
                }}/>
                </View>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.95*width,
                }}>
                <FontAwesomeIcon icon={faLock}/>
                <TextInput value={this.state.Password} placeholder="Password" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} secureTextEntry={true} onChange={(value)=>{
                this.setState({Password: value.nativeEvent.text});
                }}/>
                </View>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.95*width,
                }}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <TextInput value={this.state.PhoneNo} placeholder="Phone Number" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({PhoneNo: value.nativeEvent.text});
                }}/>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: '#0593ff',
                    width: 0.8*width,
                    height: 0.05*height,
                    marginTop: '5%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50
                }} onPress={()=>{
                    axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/createaccount",{
                        Email: this.state.Email,
                        Username: this.state.Username,
                        Password: this.state.Password,
                        PhoneNo: this.state.PhoneNo
                    }).then(res=>{
                    })
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Signup</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:'5%'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 17
                    }}>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("Login");
                    }}>
                        <Text style={{
                            color: '#0593ff',
                            textDecorationLine: 'underline',
                            fontSize: 17
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Signup;
