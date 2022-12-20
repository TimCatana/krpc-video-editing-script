const fs = require("fs");
const { configInfo } = require("../constants");

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const readClientSecret = async () => {
  try {
    const token = JSON.parse(
      await fs.promises.readFile("../secrets/client_secret.json")
    );
    return token;
  } catch (e) {
    console.log(`ERROR - Failed to read client token -- ${e}`);
    return null;
  }
};

module.exports = readClientSecret;
