import * as functions from "firebase-functions";
// import * as jwt from "jsonwebtoken";
import { getUserDataDB } from "../utils/firestore";
import { User } from "../models/user";
import { checkIsPasswordValid } from "../utils/bcrypt";
import { generateToken } from "../utils/token";

const cors = require("cors")({
  origin: true
});
// const config = functions.config();

export const getUser = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const { username, password } = request.body;
      const foundUser: User = await getUserDataDB(username);
      if (foundUser) {
        if (await checkIsPasswordValid(password, foundUser.password)) {
          const token: string = generateToken(foundUser);
          response
            .set("Authorization", "Bearer " + token)
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Authorization")
            .set("Access-Control-Expose-Headers", "Authorization")
            .status(200)
            .send({
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
