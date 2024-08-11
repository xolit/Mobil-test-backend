const checkUser = (next)=>{
  const cookie = req.cookies.jwt;
  if(!cookie){
res.status(404).json({message:'Cookie Not Found'});
    throw new Error('Cookie Not Found');
  }
  next();
}
module.exports = checkUser;