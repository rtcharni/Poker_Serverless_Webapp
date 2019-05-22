import * as admin from 'firebase-admin';
import { User } from '../models/user';
import { ToplistUser } from '../models/toplist';

const DB = admin.firestore();

export const addUserToDB = async (user: User) => {
    const userDoc = await DB.collection('users').doc(user.username).set(user);
    return userDoc;
}

export const updateUserDataDB = async (user: User) => {
    // Update whole user at one time ? or construct manually ? check if works !
    const userDoc = await DB.collection('users').doc(user.username).update(user);
    return userDoc;
}

export const getUserDataDB = async (username: string) => {
    const userDoc = await DB.collection('users').doc(username).get();
    return <User>userDoc.data();
}

export const deleteUserDataDB = async (username: string) => {
    const userDoc = await DB.collection('users').doc(username).delete();
    return userDoc;
}

export const resetUserDataDB = async (username: string) => {
    const emptyUser: User = { money: 50, statistics: { biggest_win: 0, wins: 0, loses: 0, draws: 0, money_record: 0, total_games: 0 } }
    const userDoc = await DB.collection('users').doc(username).update(emptyUser);
    return userDoc;
}

export const getStatisticsDataDB = async () => {
    const statisticsDoc = await DB.collection('toplists').doc('toplist').get();
    return statisticsDoc.data();
}

export const updateStatisticsDataDB = async (user: User) => {
    const updateObj: any = {}
    const money = `${user.username}.money`;
    const wins = `${user.username}.wins`;
    const biggest_win = `${user.username}.biggest_win`;
    updateObj[money] = user.money;
    updateObj[wins] = user.statistics.wins;
    updateObj[biggest_win] = user.statistics.biggest_win;
    const statisticsDoc = await DB.collection('toplists').doc('toplist').update(updateObj);
    return statisticsDoc;
}

export const updateStatisticsDataDB2 = async (toplistUser: ToplistUser) => {
    const statisticsDoc = await DB.collection('toplists').doc('toplist').update(toplistUser);
    return statisticsDoc;
}