import * as functions from "firebase-functions";
// import * as jwt from "jsonwebtoken";
import { getUserDataDB } from "../utils/firestore";
import { User } from "../models/user";
import { checkIsPasswordValid } from "../utils/bcrypt";

const cors = require("cors")({
  origin: true
});
// const config = functions.config();

export const getUser = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      response.header("Access-Control-Allow-Origin", "*");
      const { username, password } = request.body;
      const foundUser: User = await getUserDataDB(username);
      if (foundUser) {
        if (await checkIsPasswordValid(password, foundUser.password)) {
          // const token: string = jwt.sign(
          //     { username: foundUser.username },
          //     config.poker.apikey,
          //     {
          //         issuer: config.poker.appid,
          //         expiresIn: config.poker.tokentimelimit,
          //         subject: config.poker.tokensubject
          //     }
          // );
          // response.status(200).set('Authorization', 'Bearer ' + token).send({ user: foundUser, success: true });
          response.status(200).send({
            user: foundUser,
            msg: `Welcome back ${foundUser.username}!`,
            success: true
          });
        }
      }
      response
        .status(401)
        .send({ msg: `Invalid username or password..`, success: false });
    } catch (error) {
      response.status(500).send({ msg: `Server error..`, success: false });
    }
  });
});
