const jwt = require('jsonwebtoken')



function authenticate(req,res,next){
       const authheaders = req.headers["authorization"]
        if (authheaders) {
            let token = authheaders.split(' ')[1]
            try {
                const decoded = jwt.verify(token, 'SECRETKEY')
                console.log(decoded)
                if (decoded) {
                    const username = decoded.username
                    const persistedUser = users.find((user)=>user.username == username)
                    if (persistedUser) {
                        next()//carry on with the original request
                    }else{
                        res.json({success:false, message: "User does not exist"})
                }
                }else{
                    res.status(401).json({success:false, message: "no auth heaers found"})            
                }
            } catch (error) {
                res.status(401).json({success:false, message: "token has benn tempered"})       
            }   
        }else{
            res.status(401).json({success:false, message: "no auth headers found"})
        }
    
     
}

module.exports = authenticate