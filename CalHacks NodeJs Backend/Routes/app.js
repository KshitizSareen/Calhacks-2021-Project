const express =require('express');
const {Router}=express;


const ServiceAccount = require('../ServiceAccountKey.json');

const firebase = require('firebase-admin'); 
const router=Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const twilioClient = require('twilio')(accountSid,authToken);


firebase.initializeApp({
    credential: firebase.credential.cert(ServiceAccount)
})
const firestoredb=firebase.firestore();
router.get('/data', async (req,res)=>{
 const data = await firestoredb.collection('Data').get();
 res.json(data.docs);
})

router.post('/Send/Sms',(req,res)=>{
    twilioClient.messages.create({
        body: 'Test Message',
        to: req.body.PhoneNo,
        messagingServiceSid: 'MG3330496f0b8cfcc9723842e2516dd8fd'
    }).then(message=>{
        res.send(message.sid);
    })
})

module.exports={
    router
}