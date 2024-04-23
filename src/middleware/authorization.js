const jwt = require('jsonwebtoken')
require('dotenv').config()
const {LocalStorage} = require('node-localstorage')
  localStorage = new LocalStorage('./scratch')

const verifyTokenAccess = (req,res,next) =>{
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token){
        return res.render('tokenRequired',{})
    }
    const BearerToken = token.split(' ')
    const authToken = BearerToken[1] 
    jwt.verify(authToken,process.env.SecretKey,(err,payload)=>{
        if(err){
            return res.render('tokenRequired',{})
        }
        req.payload = payload
        next()
    })
}

let token = localStorage.getItem('token')
const BearerToken = token.split(' ')
const authToken = BearerToken[1]
const decoded =jwt.decode(authToken)
const Id = decoded.id


module.exports ={
    verifyTokenAccess,
    Id
}
