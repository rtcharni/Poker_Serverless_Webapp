import * as functions from "firebase-functions";
// import * as jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { updateUserDataDB } from "../utils/firestore";

const cors = require("cors")({
  origin: true
});

export const updateUser = functions.https.onRequest(
  async (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    return cors(request, response, async () => {
      try {
        // Verify token
        // const bearerHeader: string = request.headers['authorization'];
        // if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        //     // No token in headers REDIRECT TO LOGIN AGAIN!?
        //     response.status(403).send({ msg: `No auth`, success: false })
        // }
        // const token: string = bearerHeader.split(' ')[1];
        // try {
        //     jwt.verify(token, functions.config().poker.apikey);
        // } catch (tokenError) {
        //     // Token expired or wrong token in headers REDIRECT TO LOGIN AGAIN!?
        //     response.status(403).send({ msg: `No auth`, success: false })
        // }
        const user: User = constructUser(request.body);
        await updateUserDataDB(user);
        response
          .status(200)
          .send({ msg: `User ${user.username} updated!`, success: true });
      } catch (error) {
        response
          .status(500)
          .send({
            msg: `Error happened while updating user..`,
            success: false
          });
      }
    });
  }
);

function constructUser(requestBody: any) {
  const user: User = {};
  if (requestBody.username) {
    user.username = requestBody.username;
  }
  // if (requestBody.password) {
  //     user.password = requestBody.password;
  // }
  if (requestBody.money) {
    user.money = requestBody.money;
  }
  if (requestBody.biggest_win) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.biggest_win = requestBody.biggest_win;
  }
  if (requestBody.draws) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.draws = requestBody.draws;
  }
  if (requestBody.loses) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.loses = requestBody.loses;
  }
  if (requestBody.money_record) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.money_record = requestBody.money_record;
  }
  if (requestBody.total_games) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.total_games = requestBody.total_games;
  }
  if (requestBody.wins) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.wins = requestBody.wins;
  }
  return user;
}
