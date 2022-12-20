/**
 * @references
 *    createNewSequence - https://ppro-scripting.docsforadobe.dev/general/project.html#project-createnewsequence
 */
function createNewSequence(rootDir, currentIndex) {
  var result = app.project.newSequence(
    "Sequence " + currentIndex.toString(),
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\files\\inputs\\krpc-script-sequence.sqpreset"
  );

  return result;
}
