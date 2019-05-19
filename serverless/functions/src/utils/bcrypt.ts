import bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const hashed: string = await bcrypt.hash(password, saltRounds);
  return hashed;
}

export const checkIsPasswordValid = async (password: string, hashedPassword: string) => {
  const same: boolean = await bcrypt.compare(password, hashedPassword);
  return same;
}