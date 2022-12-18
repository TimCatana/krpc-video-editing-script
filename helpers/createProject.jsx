/**
 *
 * @returns boolean - whether the project creation was successful or not
 * @references
 *    newProject - https://ppro-scripting.docsforadobe.dev/application/application.html#app-newproject
 */
function createProject(name) {
  // https://ppro-scripting.docsforadobe.dev/application/application.html#app-newproject
  var result = app.newProject(
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\output-files\\project-files\\" +
      name
  );
  return result;
}
