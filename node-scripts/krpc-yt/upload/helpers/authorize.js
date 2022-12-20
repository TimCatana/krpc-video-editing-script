const fs = require("fs");
const getNewToken = require("./getNewToken");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { configInfo } = require("../constants");

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = async () => {
  try {
    const token = JSON.parse(await fs.promises.readFile(configInfo.TOKEN_PATH));
    return token;
  } catch (e) {
    console.log("No token... preparing to generate one");
    return null;
  }
};

module.exports = authorize;
