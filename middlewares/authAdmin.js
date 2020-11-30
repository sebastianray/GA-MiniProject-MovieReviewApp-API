const { tokenVerifier } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  console.log("Authentication works!");

  const { access_token } = req.headers;

  // console.log(access_token)
  if (!access_token) {
    return res.status(404).json({
      msg: "Token not found",
    });
  } else {
    try {
      const decode = tokenVerifier(access_token);

      req.userData = decode;
      next();
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

const authorization = (req, res, next) => {
  const role = req.userData.role;
  console.log(role)
  if (role == 'Admin') {
      next();
  } else {
      res.status(403).json("Access denied!");
  }
};

module.exports = {
  authentication, authorization
};