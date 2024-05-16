import jwt from "jsonwebtoken";
import User from "../users/user.model.js";


export const validarJWT = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
  
    if (!token) {
      return res.status(401).send("A token is required for authentication");
    }
  
    try {
      token = token.replace(/^Bearer\s+/, "");
      const decoded = jwt.verify(token, process.env.KEY_SFX_JWT);
      const useradmin = await User.findById(decoded.uid);
  
      req.user = useradmin;
    } catch (e) {
      console.log(e);
      return res.status(401).send("Invalid Token");
    }
  
    return next();
  };
  