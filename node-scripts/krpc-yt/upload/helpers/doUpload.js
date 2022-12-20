const fs = require("fs");
const { google } = require("googleapis");
const { videoFiles } = require("../constants");

/**
 * Upload the video file.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const doUpload = (auth, path, categoryId, title, description, tags) => {
  const service = google.youtube("v3");

  service.videos.insert(
    {
      auth: auth,
      part: "snippet,status",
      requestBody: {
        snippet: {
          title,
          tags,
          categoryId,
          defaultLanguage: "en",
          defaultAudioLanguage: "en",
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(path),
      },
    },
    function (err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        console.log(auth);
        return;
      } else {
        console.log(`SUCCESSFULLY UPLOADED SERMON ${response.snippet.title}`);
        console.log(response.data);
        return;
      }
    }
  );

  return;
};

module.exports = doUpload;
