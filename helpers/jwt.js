const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY


const tokenGenerator = (user) => {
    const { id, username, name, password, image, role } = user
    return jwt.sign({
        id,
        username, 
        name,
        image,
        role
    }, secretKey)
}

const tokenVerifier = (access_token) => {
    return jwt.verify(access_token,secretKey)
}

module.exports = {
    tokenGenerator, tokenVerifier
}