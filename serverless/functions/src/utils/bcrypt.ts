import bcrypt = require('bcryptjs');
import * as functions from "firebase-functions";
import { User } from '../models/user';
const config = functions.config();

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const hashed: string = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const checkIsPasswordValid = async (
  password: string,
  hashedPassword: string
) => {
  const same: boolean = await bcrypt.compare(password, hashedPassword);
  return same;
};

export const verifyId = async (
  user: User,
  givenId: string
) => {
  const realId =
    `${user.username}${user.money}${user.statistics.wins}${
      user.statistics.loses
    }${user.statistics.draws}${user.statistics.biggest_win}${
      user.statistics.money_record
    }${user.statistics.total_games}${config.poker.apikey}`

  const same: boolean = await bcrypt.compare(realId, givenId);
  return same;
};