import * as functions from "firebase-functions";

export function setTokenAndAuthorizationHeaders(
  response: functions.Response,
  token: string
) {
  response
    .set("Authorization", "Bearer " + token)
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Allow-Headers", "Authorization")
    .set("Access-Control-Expose-Headers", "Authorization");

}
