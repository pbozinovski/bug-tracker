const jwt = require('jsonwebtoken')
const { createError } = require('./error')

const verifyToken = (req, res, next) => {
    console.log("called token verify")
    const token = req.cookies.token
    if(!token){
        return next(createError(403, "Forbidden, no token"))
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if( err) return next(createError(403, "Invalid token!"))
        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    console.log('called user verify')
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "Not authorized!"))
        }
}

const verifyAdmin = (req, res, next) => {
    console.log('called admin verify')
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "Not authorized!"))
        }
}




module.exports = {verifyToken, verifyAdmin, verifyUser}