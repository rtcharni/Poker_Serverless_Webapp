import * as functions from "firebase-functions";
import { getStatisticsDataDB } from "../utils/firestore";

const cors = require("cors")({
  origin: true
});

export const getToplist = functions.https.onRequest(
  async (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    return cors(request, response, async () => {
      try {
        const toplist = await getStatisticsDataDB();
        response.send({ toplist, msg: `Toplist fetched..`, success: true });
      } catch (error) {
        response.status(500).send({ msg: `Server error...`, success: false });
      }
    });
  }
);
