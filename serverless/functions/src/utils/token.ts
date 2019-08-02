import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user";

const config = functions.config();

export function verifyToken(authHeader: string) {
  const bearerHeader: string = authHeader;
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return false;
  }
  const token: string = bearerHeader.split(" ")[1];
  try {
    jwt.verify(token, functions.config().poker.apikey);
  } catch (tokenError) {
    console.error("Token invalid");
    console.error(tokenError);
    return false;
  }
  return true;
}

export function generateToken(user: User) {
  const token: string = jwt.sign(
    { username: user.username },
    config.poker.apikey,
    {
      issuer: config.poker.appid,
      expiresIn: config.poker.tokentimelimit,
      subject: config.poker.tokensubject
    }
  );
  return token;
}
