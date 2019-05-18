import bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = (password: string, cb: Function) => {
  bcrypt.hash(password, saltRounds, (err: Error, hash: string) => {
    if (err) {
      return err; //TODO handleerror
    } else {
      cb(hash);
    }
  });
}

export const checkIsPasswordValid = (password: string, hashedPassword: string, cb: Function) => {
  bcrypt.compare(password, hashedPassword, (err: Error, same: boolean) => {
    if (err) return err; //TODO handleerror
    else cb(same);
  })
}