import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';

dotenv.config();

export const SECRETS_KEY: string = process.env.secrets_key || functions.config().env.secrets_key;