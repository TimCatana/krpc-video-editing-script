const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Code: ${req.query.code}`);
});

const fs = require("fs");
const assert = require("assert");
const { videoFiles, categoryIds } = require("./constants");
const {
  authorize,
  doUpload,
  getNewToken,
  storeToken,
  readClientSecret,
} = require("./helpers");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

/**
 *
 * @param {*} auth
 * @param {*} title
 * @param {*} description
 * @param {*} tags
 */
const uploadVideo = async (auth, title, description, tags) => {
  /**
   * Make sure that the video directories exist
   */

  assert(fs.existsSync(videoFiles.SERMONS));
  assert(fs.existsSync(videoFiles.MUSIC));
  assert(fs.existsSync(videoFiles.SHORTS));

  /**
   * Get the names of the files to upload
   */

  const sermonFiles = await fs.promises.readdir(videoFiles.SERMONS);
  if (!sermonFiles) {
    console.log(
      "there was an error reading the sermon files... terminating..."
    );
    return;
  }
  const musicFiles = await fs.promises.readdir(videoFiles.MUSIC);
  if (!musicFiles) {
    console.log("there was an error reading the music files... terminating...");
    return;
  }
  const shortsFiles = await fs.promises.readdir(videoFiles.SHORTS);
  if (!shortsFiles) {
    console.log(
      "there was an error reading the shorts files... terminating..."
    );
    return;
  }

  /**
   * Read the client_secrets
   */

  const content = await readClientSecret();
  if (!content) {
    return;
  }

  const clientSecret = content.web.client_secret;
  const clientId = content.web.client_id;
  const redirectUrl = content.web.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  /**
   * authorize and do upload
   */

  const token = await authorize(content);

  if (!token) {
    const code = await getNewToken(oauth2Client);
    const newToken = await oauth2Client.getToken(code);

    if (!newToken) {
      console.log("Error while trying to retrieve access token");
    } else {
      console.log("successfully got access token");
      oauth2Client.setCredentials({
        access_token: token.tokens.access_token,
        refresh_token: token.tokens.refresh_token,
        scope: token.tokens.scope,
        token_type: token.tokens.token_type,
        expiry_date: token.tokens.expiry_date,
      });
      await storeToken(newToken);

      console.log("TASK - Uploading sermons... this may take a while...");
      batchUpload(
        oauth2Client,
        videoFiles.SERMONS,
        sermonFiles,
        "a video description",
        categoryIds.EDUCATION,
        ["tag 1", ["tag 2"]]
      );
    }
  } else {
    oauth2Client.setCredentials({
      access_token: token.tokens.access_token,
      refresh_token: token.tokens.refresh_token,
      scope: token.tokens.scope,
      token_type: token.tokens.token_type,
      expiry_date: token.tokens.expiry_date,
    });

    console.log("TASK - Uploading sermons... this may take a while...");
    batchUpload(
      oauth2Client,
      videoFiles.SERMONS,
      sermonFiles,
      "a video description",
      categoryIds.EDUCATION,
      ["tag 1", ["tag 2"]]
    );
  }
};

/**
 *
 * @param {*} auth
 * @param {*} directory
 * @param {*} filesNames
 * @param {*} description
 * @param {*} categoryId
 * @param {*} tags
 */

const batchUpload = (
  auth,
  directory,
  filesNames,
  description,
  categoryId,
  tags
) => {
  for (const fileName of filesNames) {
    if (fileName != "README.md") {
      doUpload(
        auth,
        `${directory}/${fileName}`,
        categoryId,
        fileName,
        description,
        tags
      );
    }
  }
};

uploadVideo();
