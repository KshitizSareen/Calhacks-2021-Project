/* eslint-disable prettier/prettier */
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCheck, faGripLines, faSearch, faStar, faThumbsDown, faThumbsUp, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React,{ Component } from 'react';
import {View,Text,Dimensions, TextInput,Image, Alert,StyleSheet} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class TwitterReviews extends Component
{
    constructor()
    {
        super();
        this.state={
            TwitterHandle: "",
            Reviews :[],
            UserID: "",
            SelectedTags: [],
            Tags: [],
            UserReviews: [],
            UserTaggedReviews: [],
        }
    }

    icon = ({ name, size = 18, style }) => {
        // flatten the styles
        const flat = StyleSheet.flatten(style)
        // remove out the keys that aren't accepted on View
        const { color, fontSize, ...styles } = flat
    
        let iconComponent
        // the colour in the url on this site has to be a hex w/o hash
        const iconColor = color && color.substr(0, 1) === '#' ? `${color.substr(1)}/` : ''
    
        const Search = (
            <FontAwesomeIcon icon={faSearch} size={26} color="grey"/>
          )
          const Close = (
            <FontAwesomeIcon icon={faWindowClose} size={26} />
          )
      
          const Check = (
            <FontAwesomeIcon icon={faCheck} size={26} />
          )
          const Cancel = (
            <FontAwesomeIcon icon={faWindowClose} size={26} />
          )
          const Down = (
            <Image
            />
          )
          const Up = (
            <Image
            />
          )
       
    
        switch (name) {
          case 'search':
            iconComponent = Search
            break
          case 'keyboard-arrow-up':
            iconComponent = Up
            break
          case 'keyboard-arrow-down':
            iconComponent = Down
            break
          case 'close':
            iconComponent = Close
            break
          case 'check':
            iconComponent = Check
            break
          case 'cancel':
            iconComponent = Cancel
            break
          default:
            iconComponent = null
            break
        }
        return <View style={{}}>{iconComponent}</View>
      }

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ SelectedTags: selectedItems });
        this.SetFilterOnTags(selectedItems);
      };

      SetFilterOnTags=(selectedItems)=>{
        const TweetIds=[];
        if(selectedItems==0)
        {
            this.setState({Reviews: this.state.UserReviews});
            return;
        }
        selectedItems.forEach(tag=>
          {
              let tagName = this.state.Tags.filter(tagObject=>tagObject.id==tag)[0].name;
              this.state.UserTaggedReviews.forEach(tagReview=>{
                  console.log(tagName);
                  if(tagReview.Tags.includes(tagName))
                  {
                      if(!TweetIds.includes(tagReview.TweetID))
                      {
                      TweetIds.push(tagReview.TweetID);
                      }
                  }
              })
          })
          console.log(TweetIds);
          const Reviews=[];
          TweetIds.map(tweetID=>{
              this.state.UserReviews.forEach(review=>{
                  if(review.id==tweetID)
                  {
                      Reviews.push(review);
                  }
              })
              this.setState({Reviews: Reviews});
          })
    }

      
    render()
    {
       
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
                    <TextInput value={this.state.TwitterHandle} placeholder="Search using a twitter handle" placeholderTextColor="grey" style={{
                        width: 0.7*width,
                        color : 'black',
                        fontSize: 20,
                        textAlignVertical: 'center',
                    }} onChange={(value)=>{
                        this.setState({TwitterHandle: value.nativeEvent.text});
                    }} onSubmitEditing={(value)=>{
                        axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/GetTwitterId",{
                            twitterhandle: value.nativeEvent.text
                        }).then(res=>{
                            this.setState({UserID: res.data.data.id});
                            axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/GetTweets",{
                                twitterid : res.data.data.id
                            }).then(result=>{
                                this.setState({UserReviews: result.data.data});
                                this.setState({Reviews: result.data.data});
                                this.setState({SelectedTags: []});
                                axios.post("https://cal-hacks-2021-project.uc.r.appspot.com/api/GetTags",{
                                    UserID: res.data.data.id
                                }).then(ResultTags=>{
                                    const tags =  [];
                                    let id=1;
                                    this.setState({UserTaggedReviews: ResultTags.data});
                                    ResultTags.data.map(ResultTag=>{
                                        ResultTag.Tags.map(tag=>{
                                            tags.push({name:tag,id: id});
                                            id+=1;
                                        })
                                    })
                                    this.setState({Tags: tags});
                                })
                            })
                        })
                    }}/>
                </View>
                <TouchableOpacity style={{
                    marginTop: '1%',
                    justifyContent: 'center',
                    backgroundColor: 'lightblue',
                    borderRadius: 15,
                    alignItems: 'center',
                    width: 0.8*width
                }}>
                <SectionedMultiSelect
          items={this.state.Tags}
          IconRenderer={this.icon}
          uniqueKey="id"
          renderSelectText={()=>{
              return(
                  <Text style={{
                      color: 'grey',
                      fontSize: 20
                  }}>Select tags to filter....</Text>
              )
          }}
          searchPlaceholderText="Search Tags"
          showDropDowns={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.SelectedTags}
          styles={{
              chipContainer: {
                  width: 0.3*width,
                  justifyContent: 'space-evenly'
              }
          }}
        />
        </TouchableOpacity>
                <View style={{
                    marginTop: '10%',
                    height: 3,
                    backgroundColor: 'black',
                    width: width
                }}/>
                <FlatList data={this.state.Reviews} renderItem={(data)=>{
                    return(
                        <View style={{
                            width: 0.8*width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'lightblue',
                            borderRadius: 10,
                            marginTop: '10%'
                        }}>
                            <TouchableOpacity>
                            <Text style={{
                                color: 'black',
                                fontSize: 26
                            }}>{data.item.text}</Text>
                            </TouchableOpacity>
                            <View style={{
                                width: 0.8*width,
                                height: 3,
                                backgroundColor: 'black'
                            }}/>
                            <View style={{flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        width: 0.8*width,
                        padding: '5%'
                        }}>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faThumbsUp} size={26} color="green"/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faThumbsDown} size={26} color="red"/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                    backgroundColor: '#0593ff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    width: 0.3*width,
                    height: 0.05*height
                }} onPress={()=>{
                    this.props.navigation.navigate("Report Tweet",{Tweet: data.item,UserID: this.state.UserID});
                }}>
                    <Text>Report</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    )
                }} key={data=>data.index}/>
            </View>
        )
    }
    }

export default TwitterReviews;