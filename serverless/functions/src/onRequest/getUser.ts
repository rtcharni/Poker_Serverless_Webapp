import * as functions from 'firebase-functions';
import { getUserDataDB } from '../utils/firestore';
import { User } from '../models/user';
import { checkIsPasswordValid } from '../utils/bcrypt';

export const getUser = functions.https.onRequest(async (request, response) => {
    try {
        const {username, password} = request.query;
        const foundUser: User = await getUserDataDB(username);
        if (foundUser) {
            if (await checkIsPasswordValid(password, foundUser.password)) {
                response.status(200).send({ user: foundUser, success: true });
            }
        }
        response.send({ msg: `Invalid username or password..`, success: false });
    } catch (error) {
        response.status(500).send({ msg: `Server error...`, success: false});
    }
});
