const fs = require("fs");
const readline = require("readline/promises");
const { configInfo } = require("../constants");
const open = require("open");

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = async (oauth2Client) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: configInfo.SCOPES,
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "\nNOTE - A new window should have opened. Please login and grant access to the script. Don't worry about the 'not verified' warnings. That is because this script is not published. Once you login you will be given a code\n"
  );
  open(authUrl);

  const result = await rl.question(
    "Enter the code from that page here. make sure there are no stray spaces: "
  );
  return result;
};

module.exports = getNewToken;
