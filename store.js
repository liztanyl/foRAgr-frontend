import { myIpAddress } from './secret.js';

// eslint-disable-next-line import/prefer-default-export
export const BACKEND_URL = process.env.BACKEND_URL || `http://${myIpAddress}:3004`;
