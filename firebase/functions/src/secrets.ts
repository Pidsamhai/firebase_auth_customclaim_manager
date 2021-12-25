import * as dotenv from "dotenv";
import * as functions from "firebase-functions";

dotenv.config();
const LOCAL = process.env.SECRETS_KEY;
const FUNCTIONS = functions.config().env?.secrets.key;
const SECRETS_KEY: string = LOCAL || FUNCTIONS;
export {SECRETS_KEY};
