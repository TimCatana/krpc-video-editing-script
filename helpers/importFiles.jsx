/**
 * @references
 *    importFiles - https://ppro-scripting.docsforadobe.dev/general/project.html#project-importfiles
 */
function importFiles(bin, rootDir, inputFile) {
  const myFiles = [
    rootDir.toString() + "\\input-files\\Videos\\" + inputFile,
    rootDir.toString() + "\\input-files\\Intros\\end-screen.mov",
    rootDir.toString() + "\\input-files\\Intros\\intro-screen.mov",
    rootDir.toString() + "\\input-files\\Names\\ABTitle.mov",
  ];

  var result = app.project.importFiles(myFiles, true, bin);

  return result;
}
