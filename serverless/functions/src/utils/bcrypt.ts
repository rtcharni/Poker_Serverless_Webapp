import bcrypt = require("bcrypt");
import * as functions from "firebase-functions";
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
  newMoney: number,
  newWins: number,
  newLoses: number,
  givenId: string
) => {
  const realId =
    newMoney.toString() +
    newWins.toString() +
    newLoses.toString() +
    config.poker.apikey;

  const same: boolean = await bcrypt.compare(realId, givenId);
  return same;
};
