import * as admin from 'firebase-admin';
import { User } from '../models/user';

const DB = admin.firestore();

export const addUserToDB = async (user: User) => {
    const userDoc = await DB.collection('users').doc(user.username).set(user);
}

export const updateUserDataDB = async (user: User) => {
    // Update whole user at one time ? or construct manually ? check if works !
    const userDoc = await DB.collection('users').doc(user.username).update(user);
}

export const getUserDataDB = async (username: string) => {
    const userDoc = await DB.collection('users').doc(username).get();
    return userDoc.data() ? <User>userDoc.data() : null;
}

export const getStatisticsDataDB = async () => {
    const statisticsDoc = await DB.collection('toplists').doc('toplist').get();
    return statisticsDoc.data();
}

export const updateStatisticsDataDB = async (user: User) => {
    const updateObj = {}
    const money = `${user.username}.money`;
    const wins = `${user.username}.wins`;
    const biggest_win = `${user.username}.biggest_win`;
    updateObj[money] = user.money;
    updateObj[wins] = user.statistics.wins;
    updateObj[biggest_win] = user.statistics.biggest_win;

    const statisticsDoc = await DB.collection('toplists').doc('toplist').update(updateObj);

}