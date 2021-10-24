/* eslint-disable prettier/prettier */
import { faImages, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image, Alert} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class DisplayPhoneReview extends Component
{

    componentDidMount()
    {

    }
    render()
    {
        const ShowNoMedia=()=>{
            if(this.props.route.params.Review.Photos==0)
            {
            return(
                <Text>No Photos Available</Text>
            )
            }
            return(
                <View style={{
                    width: width,
                    height: 0.5*height
                }}>
                <FlatList pagingEnabled={true} horizontal={true} data={this.props.route.params.Review.Photos} renderItem={(data)=>{
                    return(
                        <Image style={{
                            width: width,
                            height: 0.5*height,
                        }} source={{
                            uri: data.item
                        }}/>
                    )
                }} viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50,
                  }} key={data=>data.item}/>
                </View>
            )
    }  
        return(
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                {
                    ShowNoMedia()
                }
                <Text style={{
                    marginTop: '10%',
                    color: 'black',
                    fontSize: 26,
                    marginLeft: '2.5%'
                }}>{this.props.route.params.Review.Name}</Text>
                <Text style={{
                    marginTop: '1%',
                    color: 'black',
                    fontSize: 26,
                    marginLeft: '2.5%'
                }}>{this.props.route.params.Review.PhoneNo}</Text>
<TouchableOpacity style={{
                    backgroundColor: '#0593ff',
                    width: 0.5*width,
                    height: 0.05*height,
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginLeft: '2.5%'
                }} onPress={()=>{
                    this.props.navigation.navigate("Phone Number Review",{Name: this.props.route.params.Review.Name,PhoneNo: this.props.route.params.Review.PhoneNo});
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Write a Review</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    width: 0.5*width,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: '2.5%',
                    marginTop: '10%'
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 22
                    }}>
                        {this.props.route.params.Review.Rating}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        width: 0.45*width,
                        justifyContent: 'space-between'
                    }}>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.props.route.params.Review.Rating >= 1 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.props.route.params.Review.Rating >= 2 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.props.route.params.Review.Rating >= 3 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.props.route.params.Review.Rating >= 4 ? "gold" : "grey"}/>
                        <FontAwesomeIcon size={26} icon={faStar} color={this.props.route.params.Review.Rating >= 5 ? "gold" : "grey"}/>
                        </View>
                </View>
                <Text style={{
                        color: 'black',
                        fontSize: 22,
                        marginLeft: '2.5%'
                    }}>{this.props.route.params.Review.Description}</Text>
                    <View style={{
                        width: 0.9*width,
                        flexDirection: 'row',
                        marginLeft: '2.5%'
                    }}>
                    {
                        this.props.route.params.Review.Tags.map(tag=>{
                            return(
                                <Text style={{color: 'black',fontSize:22}}>#{tag} </Text>
                            )
                        })
                    }
                    </View>
            </View>
        )
    }
}

export default DisplayPhoneReview;