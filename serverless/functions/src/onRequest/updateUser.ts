import * as functions from "firebase-functions";
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
        const idSuccess = await verifyId(user, request.body.id);

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
  if (requestBody.money || requestBody.money === 0) {
    user.money = requestBody.money;
  }
  if (requestBody.biggest_win || requestBody.biggest_win === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.biggest_win = requestBody.biggest_win;
  }
  if (requestBody.draws || requestBody.draws === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.draws = requestBody.draws;
  }
  if (requestBody.loses || requestBody.loses === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.loses = requestBody.loses;
  }
  if (requestBody.money_record || requestBody.money_record === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.money_record = requestBody.money_record;
  }
  if (requestBody.total_games || requestBody.total_games === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.total_games = requestBody.total_games;
  }
  if (requestBody.wins || requestBody.wins === 0) {
    if (!user.statistics) {
      user.statistics = {};
    }
    user.statistics.wins = requestBody.wins;
  }
  return user;
}
