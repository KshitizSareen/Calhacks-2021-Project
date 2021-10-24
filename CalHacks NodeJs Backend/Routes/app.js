const express =require('express');
const {Router}=express;


const ServiceAccount = require('../ServiceAccountKey.json');

const firebase = require('firebase-admin'); 
const router=Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const messagingServiceSid= process.env.TWILIO_MESSAGING_SERVICE_SID;
const TwitterBearerToken=process.env.TWITTER_BEARER_TOKEN;


const twilioClient = require('twilio')(accountSid,authToken);

const axios = require('axios');


firebase.initializeApp({
    credential: firebase.credential.cert(ServiceAccount)
})
const firestoredb=firebase.firestore();
const firestoreAuth=firebase.auth();

router.get('/data', async (req,res)=>{
 const data = await firestoredb.collection('Data').get();
 res.json(data.docs);
})

router.post('/Send/OTP',(req,res)=>{
    const min = Math.ceil(1000);
  const max = Math.floor(9999);
  const OTP = Math.floor(Math.random() * (max - min + 1) + min).toString();
    twilioClient.messages.create({
        body: "Your OTP is "+OTP,
        to: req.body.PhoneNo,
        messagingServiceSid: messagingServiceSid.toString()
    }).then(message=>{
        res.send(OTP);
    })
})

router.post('/CreateAccount',async (req,res)=>{
    firestoreAuth.createUser({
        email: req.body.Email,
        password: req.body.Password,
        phoneNumber: req.body.PhoneNo,
        displayName: req.body.Username
    }).then(user=>{
        res.json(user);
    })
})

router.post('/GetTwitterId',(req,res)=>{
    axios.default.get("https://api.twitter.com/2/users/by/username/"+req.body.twitterhandle,{
        headers:{
            "Authorization" : "Bearer "+TwitterBearerToken
        }
    }).then(results=>{
        res.send(results.data);
    })
})

router.post('/GetTweets',(req,res)=>{
    axios.default.get("https://api.twitter.com/2/users/"+req.body.twitterid+"/tweets?&max_results=100",{
        headers:{
            "Authorization" : "Bearer "+TwitterBearerToken
        }
    }).then(results=>{
        res.json(results.data);
    })
})

router.post('/GetPhoneReviews',(req,res)=>{
    firestoredb.collection('Phone Reviews').where("PhoneNo","==",req.body.PhoneNo).get().then(result=>{
        const resultData=result.docs.map(doc=>doc.data());
        res.json(resultData);
    })
})

router.post('/AddPhoneReview',(req,res)=>{
    firestoredb.collection("Phone Reviews").add({
        Name: req.body.Name,
        PhoneNo: req.body.PhoneNo,
        Rating: req.body.Rating,
        Description: req.body.Description,
        Photos: req.body.Paths,
        Tags: req.body.tags,
        User: req.body.displayName
    }).then(()=>{
        twilioClient.messages.create({
            body: "A review of your phone number has been added on SafeView",
            to: req.body.PhoneNo,
            messagingServiceSid: messagingServiceSid.toString()
        }).then(()=>{
            res.send("Review added");
        })
    })
})

router.post('/AddTweetReview',(req,res)=>{
    firestoredb.collection('Twitter Review').add({
        UserID: req.body.UserID,
        TweetID : req.body.TweetID,
        Tweet: req.body.Tweet,
        Comment: req.body.Comment,
        Tags: req.body.Tags
    }).then(()=>{
        firestoredb.collection('Tweets with Tags').add({
            UserID: req.body.UserID,
        TweetID : req.body.TweetID,
        Tweet: req.body.Tweet,
        Tags: req.body.Tags
        }).then(()=>{
            res.send("Tweet Review Added");
        })
    })
})

router.post('/GetTags',(req,res)=>{
    firestoredb.collection('Tweets with Tags').where("UserID","==",req.body.UserID).get().then((result)=>{
        const Tags= result.docs.map(doc=>doc.data());
        res.json(Tags);
    })
})

module.exports={
    router
}