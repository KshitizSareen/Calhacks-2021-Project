/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Login extends Component
{
    constructor()
    {
        super();
        this.state={
            Email: "",
            Password: "",
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
                }}>Login</Text>
                <View style={{
                    marginTop: '10%',
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
                    marginTop: '10%',
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
                <TouchableOpacity style={{
                    backgroundColor: '#0593ff',
                    width: 0.8*width,
                    height: 0.05*height,
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50
                }} onPress={()=>{
                    auth().signInWithEmailAndPassword(this.state.Email.toLowerCase().trim(),this.state.Password)
                    .then(res=>
                        {
                            this.props.navigation.navigate("OTPPage");
                        })
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Login</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:'10%'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 17
                    }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("Signup");
                    }}>
                        <Text style={{
                            color: '#0593ff',
                            textDecorationLine: 'underline',
                            fontSize: 17
                        }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Login;
