/**
 * @references
 *    createNewSequence - https://ppro-scripting.docsforadobe.dev/general/project.html#project-createnewsequence
 */
function createNewSequence(bin, rootDir, currentIndex) {
  var sequenceName = "Sequence " + currentIndex.toString();

  var sequence = app.project.newSequence(
    sequenceName,
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\files\\inputs\\krpc-script-sequence.sqpreset"
  );

  if (!sequence) {
    return false;
  }

  //
  for (var i = 0; i < app.project.rootItem.children.numItems; i++) {
    if (app.project.rootItem.children[i].name.indexOf(sequenceName) != -1) {
      app.project.rootItem.children[i].moveBin(bin);
      break;
    }
  }

  return true;
}
