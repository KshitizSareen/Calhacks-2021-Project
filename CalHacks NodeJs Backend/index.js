require('dotenv').config()

const express = require('express');
const app = express();

const {router} = require('./Routes/app');

const ServiceAccount = require('./ServiceAccountKey.json');

const firebaseadmin = require('firebase-admin');

const bodyParser = require('body-parser');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const cors=require('cors');
app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',router);

app.get('/',(req,res)=>{
    res.send("Hello From Cal Hakcs");
})



// Initialize Firebase
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
})

module.exports={

}