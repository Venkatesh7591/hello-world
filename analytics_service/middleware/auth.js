const jwt = require ("jsonwebtoken");

module.exports = {
    verifyjwt: async (req, res, next) => {
        const token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token) return res.status(401).json("Unauthorize user");
    console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("JWT", decoded)
    next();
  } catch (e) {
    // console.log("JWT error")
    res.status(400).json("Token not valid");
  }
    }
}

// function verifyjwt(req, res, next) {
// //  console.log('req');
//   const token = req.headers["authorization"] || req.headers["Authorization"];
//   if (!token) return res.status(401).json("Unauthorize user");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     // console.log("JWT", decoded)
//     next();
//   } catch (e) {
//     // console.log("JWT error")
//     res.status(400).json("Token not valid");
//   }
// }