import * as dotenv from "dotenv";
import * as functions from "firebase-functions";

dotenv.config();

const LOCAL = process.env.secrets_key;
const FUNCTIONS = functions.config().env?.secrets_key;
const SECRETS_KEY: string = LOCAL || FUNCTIONS;
export {SECRETS_KEY};
