/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faImages, faPhoneAlt, faPhotoVideo, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class PhoneNumberReview extends Component
{
    constructor()
    {
        super();
        this.state={
            Name: "",
            PhoneNo: "",
            Rating: 1,
            Description: "",
            Photos: [],
            tags: "",
        }
    }

    componentDidMount()
    {
        if(this.props.route.params!=null)
        {
            this.setState({Name: this.props.route.params.Name});
        }
        if(this.props.route.params!=null)
        {
            this.setState({PhoneNo: this.props.route.params.PhoneNo})
        }
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
                    color: 'black',
                    fontSize: 26,
                    width: 0.8*width,
                    marginTop: '5%'
                }}>Write A Review</Text>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.8*width,
                }}>
                <FontAwesomeIcon icon={faUser}/>
                <TextInput value={this.state.Name}  placeholder="Name" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Name: value.nativeEvent.text});
                }}/>
                </View>
                <View style={{
                    marginTop: '5%',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 0.8*width,
                }}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <TextInput value={this.state.PhoneNo}  placeholder="Phone Number" placeholderTextColor="grey" style={{
                    fontSize: 22,
                    width: 0.9*width,
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({PhoneNo: value.nativeEvent.text});
                }}/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: 0.8*width,
                    justifyContent: 'space-between',
                    marginTop: '5%'
                }}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({Rating: 1});
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.Rating >= 1 ? "gold" : "grey"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({Rating: 2});
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.Rating >= 2 ? "gold" : "grey"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({Rating: 3});
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.Rating >= 3 ? "gold" : "grey"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({Rating: 4});
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.Rating >= 4 ? "gold" : "grey"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({Rating: 5});
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.Rating >= 5 ? "gold" : "grey"}/>
                    </TouchableOpacity>
                </View>
                <TextInput value={this.state.Description} placeholder="Description" placeholderTextColor="grey" style={{
                    width: 0.8*width,
                    height: 0.1*height,
                    borderWidth: 3,
                    borderRadius: 20,
                    marginTop: '5%',
                    textAlignVertical: 'top',
                    padding: '5%',
                    fontSize: 16,
                    backgroundColor: 'white',
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Description: value.nativeEvent.text});
                }}/>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    width: 0.42*width,
                    marginTop: '5%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} onPress={()=>{
                    ImagePicker.openPicker({
                        multiple: true,
                        mediaType: 'photo'
                    }).then(res=>{
                        this.setState({Photos: res});
                    });
                }}>
                    <FontAwesomeIcon icon={faImages} size={26}/>
                    <Text style={{
                        fontSize: 26,
                        color: 'black'
                    }}>Add Photos</Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                    width: 0.8*width,
                    marginTop: '3%'
                }}>Add New Tag</Text>
                <TextInput value={this.state.tags} placeholder="Tags" placeholderTextColor="grey" style={{
                    width: 0.8*width,
                    height: 0.1*height,
                    borderWidth: 3,
                    borderRadius: 10,
                    marginTop: '5%',
                    textAlignVertical: 'top',
                    padding: '5%',
                    fontSize: 16,
                    backgroundColor: 'white',
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({tags: value.nativeEvent.text});
                }}/>
                <TouchableOpacity style={{
                    backgroundColor: '#0593ff',
                    width: 0.5*width,
                    height: 0.05*height,
                    marginTop: '5%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                }} onPress={()=>{
                    let Paths = [];
                    this.state.Photos.map(Photo=>
                        {
                            console.log(Photo.path);
                    const ref=storage().ref("Images/"+uuid.v4().toString());
                    const task =ref.putFile(Photo.path);
                    task.then(async (res)=>{
                        Paths.push(await ref.getDownloadURL());
                        if(Paths.length==this.state.Photos.length)
                        {
                            axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/AddPhoneReview",{
                                Name: this.state.Name,
                                PhoneNo: this.state.PhoneNo,
                                Rating: this.state.Rating,
                                Description: this.state.Description,
                                Paths: Paths,
                                tags: this.state.tags.split("#").filter(tag=>tag!=""),
                                displayName: auth().currentUser.displayName
                            }).then((res)=>{
                                Alert.alert("",res.data);
                            })
                        }
                    })
                        }
                    )
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PhoneNumberReview;