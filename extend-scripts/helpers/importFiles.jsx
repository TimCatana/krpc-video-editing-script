/**
 * @references
 *    importFiles - https://ppro-scripting.docsforadobe.dev/general/project.html#project-importfiles
 */
function importFiles(bin, filesDir, inputFile, titleCardFile) {
  const myFiles = [
    filesDir.toString() + "\\Videos\\" + inputFile,
    filesDir.toString() + "\\Intros\\end-screen.mov",
    filesDir.toString() + "\\Intros\\intro-screen.mov",
    filesDir.toString() + "\\Names\\" + titleCardFile,
  ];

  var result = app.project.importFiles(myFiles, true, bin);

  return result;
}
