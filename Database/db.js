const mongoose = require('mongoose');

const connectdb = async ()=>{
  await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Database connected`);
  }).catch((err)=>{
    console.log(`Database not connected`, err);
  })
}

module.exports = connectdb;