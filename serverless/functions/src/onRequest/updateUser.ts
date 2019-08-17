import * as functions from "firebase-functions";
// import * as jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { updateUserDataDB } from "../utils/firestore";
import { verifyToken, generateToken } from "../utils/token";
import { setTokenAndAuthorizationHeaders } from "../utils/headers";
import { verifyId } from "../utils/bcrypt";

const cors = require("cors")({
  origin: true
});

export const updateUser = functions.https.onRequest(
  async (request, response) => {
    return cors(request, response, async () => {
      try {
        const user: User = constructUser(request.body);

        const tokenSuccess = await verifyToken(request.headers['authorization']);
        const idSuccess = await verifyId(user.money, user.statistics.wins, user.statistics.loses, request.body.id);

        if (!tokenSuccess || !idSuccess) {
          response.redirect('/');
          return Promise.resolve();
        }
      
        const newToken = generateToken(user);

        setTokenAndAuthorizationHeaders(response, newToken);
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
