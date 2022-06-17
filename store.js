import myIpAddress from "./myIpAddress.js";

export const BACKEND_URL = process.env.BACKEND_URL || `http://${myIpAddress}:3004`;