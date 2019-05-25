import * as functions from 'firebase-functions';
import { hashPassword } from '../utils/bcrypt';
import { User } from '../models/user';
import { addUserToDB, getUserDataDB } from '../utils/firestore';

export const createUser = functions.https.onRequest(async (request, response) => {
    try {
        const { username, password } = request.body;
        const foundUser = await getUserDataDB(username);
        if (foundUser) response.status(500).send({ msg: `Username already exists..`, success: false });
        const hashed = await hashPassword(password);
        const user: User = { money: 50, username, password: hashed, statistics: { biggest_win: 0, wins: 0, loses: 0, draws: 0, money_record: 0, total_games: 0 } }
        await addUserToDB(user);
        response.status(200).send({ msg: `User ${user.username} created!`, success: true });
    } catch (error) {
        response.status(500).send({ msg: `Error happened while creating new user..`, success: false });
    }
});
