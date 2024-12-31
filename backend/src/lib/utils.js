import jwt from "jsonwebtoken";
export const generateJWT = (userId, res) => {
  /* this function generates a jwt token and sets it as a cookie in the response */
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  }); //generate jwt token
  res.cookie("jwt", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevents client side js from accessing the cookie, only server can access (XSS attacks)
    sameSite: "strict", //prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development", //prevents cookie from being sent over http
  }); //set jwt token as a cookie
  return token;
};
