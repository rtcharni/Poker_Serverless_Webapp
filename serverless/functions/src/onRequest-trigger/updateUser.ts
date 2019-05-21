import * as functions from 'firebase-functions';
import { User } from '../models/user';
import { updateUserDataDB } from '../utils/firestore';

// TODO - hide info from request
export const updateUser = functions.https.onRequest(async (request, response) => {
    try {
        const user: User = constructUser(request.body);
        await updateUserDataDB(user);
        response.status(200).send({ msg: `User ${user.username} updated!`, success: true });
    } catch (error) {
        response.status(500).send({ msg: `Error happened while updating user..`, success: false });
    }
});

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