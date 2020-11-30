const { Review } = require('../models')
const {tokenVerifier} = require('../helpers/jwt')

const authentication = (req, res, next) => {
    console.log("Authentication works!")
    
    const { access_token } = req.headers;
    // console.log(access_token)
    if(!access_token){
        res.status(404).json({
            msg : "Token not found"
        })
    }else {
        try {
            const decode = tokenVerifier(access_token)
            // console.log(decode)
            req.userData = decode
            next();
        }catch (err) {
            res.status(400).json(err)
        }
    }
}

const authorization = (req,res,next) => {
    console.log("Authorization works!");
    const id = req.params.id;
    const UserId = req.userData.id
    
    Review.findOne({
        where : {
            id
        }
    }).then(review=>{
        console.log(review)
        if(review){
            if(review.UserId === UserId){
                // res.status(200).json(review)
                next();
            }else{
                throw {
                    status : 403,
                    msg : "User doesn't have any access"
                }
            }
        }else{
            throw {
                status : 404,
                msg : "Review not found" 
            }
        }

    }).catch(err=>{
        res.status(500).json(err)
    })
}

module.exports = {
    authentication,authorization
}