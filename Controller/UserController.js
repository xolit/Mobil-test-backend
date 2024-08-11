const User = require('../Database/UserSchema');
const jwt = require('jsonwebtoken');

const genToken= (id)=>{
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  if (!token) {
      new Error('Token is required');
  }
  return token;
}

// signup
module.exports.signup_post= async (req,res)=>{
  const {name,email,password, mobile} = req.body;
  try {
    const user = new User({name,email,password, mobile});
    const savedUser = await user.save();
    const token = genToken(savedUser._id);
    res.status(201).json(token);
  } catch (error) {
res.status(500).json({message:error.message});
  }
}

// login
module.exports.login_post = async (req,res)=>{
  const {email,password} = req.body;
  try {
     const user = await User.findOne({email});
    const isMatch = await User.comparePassword(password);
     if(!user || !isMatch){
       return res.status(401).json({message:'Invalid credentials'});
     }
    const token = genToken(user._id);
    res.status(200).json(token);
  } catch (error) {
res.status(500).json({message:error.message});
  }
}

//logout
module.exports.logout_get = async (req,res)=>{
  try {
     const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
res.status(200).json({message:'Logged out'});
  } catch (error) {
res.status(500).json({message:error.message});
  }
}

// my profile
module.exports.my_profile_get = async (req,res)=>{
  try {
     const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.status(200).json(user);
  } catch (error) {
res.status(500).json({message:error.message});
  }
}

// all users
module.exports.all_users_get = async (req,res)=>{
  try {
    const allUsers = await User.find();   res.status(200).json(allUsers);
  } catch (error) { res.status(500).json({message:error.message});
  }
}

// update profile 
module.exports.update_profile_put = async (req,res)=>{
  try {
     const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const {name,email,password, mobile} = req.body;
    if(name){
      user.name = name;
    }
    if(email){
      user.email = email;
    }
    if(password){
      user.password = password;
    }
    if(mobile){
      user.mobile = mobile;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
res.status(500).json({message:error.message});
  }
}

// delete profile
module.exports.delete_my_profile = async (req,res)=>{
  try {
     const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    await user.remove();
    res.status(200).json({message:'Profile deleted'});
  } catch (error) {
res.status(500).json({message:error.message});
  }
}