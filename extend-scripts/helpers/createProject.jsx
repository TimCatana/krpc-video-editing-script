/**
 * Deletes any old project files and creates a new one
 * @returns boolean - whether the project creation was successful or not
 * @references
 *    remove - https://extendscript.docsforadobe.dev/file-system-access/file-object.html#remove
 *    newProject - https://ppro-scripting.docsforadobe.dev/application/application.html#app-newproject
 */
function createProject(name) {
  var randomNum = Math.floor(Math.random() * 100000 + 0);

  var result = app.newProject(
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\files\\outputs\\project-files\\" +
      name +
      "-" +
      randomNum.toString()
  );

  return result;
}
