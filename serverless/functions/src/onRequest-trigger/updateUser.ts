import * as functions from 'firebase-functions';
import { User } from '../models/user';
import { updateUserDataDB } from '../utils/firestore';

// TODO - hide info from request
export const updateUser = functions.https.onRequest(async (request, response) => {
    try {
        const { username, password, money, biggest_win, draws, loses, money_record, total_games, wins } = request.body;
        const user: User = { username, password, money, statistics: { biggest_win, wins, loses, draws, money_record, total_games } }
        await updateUserDataDB(user);
        response.status(200).send({ msg: `User ${user.username} updated!`, success: true });
    } catch (error) {
        response.status(500).send({ msg: `Error happened while updating user..`, success: false });
    }
});
