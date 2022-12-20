const configInfo = {
  API_KEY: process.env.API_KEY,
  BASE_API_URL: "https://www.googleapis.com/youtube/v3",
  SCOPES: ["https://www.googleapis.com/auth/youtube.upload"],
  TOKEN_PATH: "../secrets/client_oauth_token.json",
};

module.exports = configInfo;
