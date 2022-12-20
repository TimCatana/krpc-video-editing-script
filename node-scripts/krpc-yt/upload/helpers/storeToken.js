const fs = require("fs");
const { configInfo } = require("../constants");

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = async (token) => {
  fs.writeFile(configInfo.TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
  });
};

module.exports = storeToken;
