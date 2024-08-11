const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  }
});

UserSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt(10);
  const Npass = await bcrypt.hash(this.password, salt);
 if (!Npass) {
    return next(new Error('Password is required'));
 }
  next();
});

// comparing password
UserSchema.methods.comparePassword = async function (password){
  const Npass = await bcrypt.compare(password, this.password);
  if (!Npass) {
res.status(401).json({message:'Invalid credentials'});
  }
  return Npass;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;