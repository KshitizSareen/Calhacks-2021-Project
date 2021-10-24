/* eslint-disable prettier/prettier */
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image, Alert} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class PhoneNumberReviews extends Component
{
    constructor()
    {
        super();
        this.state={
            PhoneNo: "",
            NumberOwner: {},
            Reviews: []
        }
    }
    render()
    {
        const ShowAverage = ()=>{
            return(
                <View style={{
                    marginTop: '10%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: 'lightblue',
                    borderRadius: 20,
                    padding: '2%',
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>{this.state.NumberOwner.Name}</Text>
                    <View style={{
                    flexDirection: 'row',
                    width: 0.5*width,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>
                        {Math.ceil(this.state.NumberOwner.AverageRating)}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        width: 0.45*width,
                        justifyContent: 'space-between'
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.NumberOwner.AverageRating >= 1 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.NumberOwner.AverageRating >= 2 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.NumberOwner.AverageRating >= 3 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.NumberOwner.AverageRating >= 4 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.state.NumberOwner.AverageRating >= 5 ? "gold" : "grey"}/>
                        </View>
                </View>
                    <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>{this.state.NumberOwner.NumberOfReviews} Reviews</Text>
                </View>
            )
        }
        return(
            <View style={{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'lightblue',
                    borderRadius: 10,
                    marginTop: '10%'
                }}>
                    <FontAwesomeIcon icon={faSearch} size={26} color="grey" style={{
                        margin: '3%'
                    }}/>
                    <TextInput value={this.state.PhoneNo} placeholder="Search using a phone no." placeholderTextColor="grey" style={{
                        width: 0.7*width,
                        color : 'black',
                        fontSize: 20,
                        textAlignVertical: 'center',
                    }} onChange={(value)=>{
                        this.setState({PhoneNo: value.nativeEvent.text});
                    }} onSubmitEditing={(value)=>{
                        axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/GetPhoneReviews",{
                            PhoneNo: value.nativeEvent.text
                        }).then(result=>{
                            const NumberOwner={};
                            NumberOwner.AverageRating=0;
                            NumberOwner.NumberOfReviews=0;
                            const Reviews=result.data;
                            this.setState({Reviews: Reviews});
                            Reviews.map(Review=>{
                                NumberOwner.Name=Review.Name;
                                NumberOwner.AverageRating+=Review.Rating;
                                NumberOwner.NumberOfReviews+=1;
                            });
                            NumberOwner.AverageRating=NumberOwner.AverageRating/Reviews.length;
                            this.setState({NumberOwner:NumberOwner});
                        })
                    }}/>
                </View>
                {
                    this.state.NumberOwner.Name!=undefined ?
                    ShowAverage() :
                    null
                }
                <View style={{
                    marginTop: '10%',
                    height: 3,
                    backgroundColor: 'black',
                    width: width
                }}/>
                <FlatList data={this.state.Reviews} renderItem={(data)=>{
                    return(
                        <TouchableOpacity style={{
                            backgroundColor: 'lightblue',
                            width: 0.8*width,
                            padding: '2%',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginTop: '10%',
                            borderRadius: 20
                        }} onPress={()=>{
                            this.props.navigation.navigate("Display Phone Review",{Review: data.item});
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                            {
                            data.item.Photos.map((photo,index)=>{
                                if(index<3)
                                {
                                return(
                                    <Image style={{
                                        width: 0.2*width,
                                        height: 0.1*height,
                                        margin: '2%'
                                    }} source={{
                                        uri: photo
                                    }}/>
                                )
                                }
                            })
                            }
                            </View>
                            <Text style={{
                                color: 'black',
                                fontSize: 22,
                                marginTop: '5%'
                            }}>{data.item.User}</Text>
                            <View style={{
                    flexDirection: 'row',
                    width: 0.5*width,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>
                        {data.item.Rating}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        width: 0.45*width,
                        justifyContent: 'space-between'
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={data.item.Rating >= 1 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={data.item.Rating >= 2 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={data.item.Rating >= 3 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={data.item.Rating >= 4 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={data.item.Rating >= 5 ? "gold" : "grey"}/>
                        </View>
                </View>
                <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>{data.item.Description}</Text>
                            </TouchableOpacity>
                    )
                }} key={data=>data.index}/>
            </View>
        )
    }
}

export default PhoneNumberReviews;