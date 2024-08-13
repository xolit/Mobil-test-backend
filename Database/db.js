const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://basitabdul27358:ik43VFmd71qtCrIt@cluster0-mobile.qnjz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-mobile';
const connectdb = async ()=>{
  await mongoose.connect(MONGO_URI).then(()=>{
    console.log(`Database connected`);
  }).catch((err)=>{
    console.log(`Database not connected`, err);
  })
}

module.exports = connectdb;