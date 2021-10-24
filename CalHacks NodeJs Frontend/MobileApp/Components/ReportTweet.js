/* eslint-disable prettier/prettier */
import { faSearch, faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image, Alert} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ReportTweet extends Component
{
    constructor()
    {
        super();
        this.state={
            Comment: "",
            Tags: "",
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
                }}>{this.props.route.params.Tweet.text}</Text>
                <TextInput value={this.state.Comment} placeholder="Add a comment for this tweet" placeholderTextColor="grey" style={{
                    width: 0.8*width,
                    height: 0.25*height,
                    borderWidth: 3,
                    borderRadius: 20,
                    marginTop: '5%',
                    textAlignVertical: 'top',
                    padding: '5%',
                    fontSize: 16,
                    backgroundColor: 'white',
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Comment: value.nativeEvent.text});
                }}/>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                    width: 0.8*width,
                    marginTop: '3%'
                }}>Add Tags</Text>
                <TextInput value={this.state.Tags} placeholder="Tags" placeholderTextColor="grey" style={{
                    width: 0.8*width,
                    height: 0.15*height,
                    borderWidth: 3,
                    borderRadius: 10,
                    marginTop: '5%',
                    textAlignVertical: 'top',
                    padding: '5%',
                    fontSize: 16,
                    backgroundColor: 'white',
                    color: 'black'
                }} onChange={(value)=>{
                    this.setState({Tags: value.nativeEvent.text});
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
                    axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/AddTweetReview",{
                    UserID: this.props.route.params.UserID,
                    TweetID: this.props.route.params.Tweet.id,    
                    Tweet: this.props.route.params.Tweet.text,
                    Comment: this.state.Comment,
                    Tags: this.state.Tags.split("#").filter(tag=>tag!="")
                    }).then(res=>{
                        Alert.alert("",res.data);
                    })
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default ReportTweet;