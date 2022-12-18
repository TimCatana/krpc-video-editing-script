/**
 *
 * @references
 *    createSubClip - https://ppro-scripting.docsforadobe.dev/item/projectitem.html?highlight=createSubClip#projectitem-createsubclip
 */
function getSubClip(bin, startSeconds, endSeconds) {
  var startTime = new Time();
  var endTime = new Time();

  startTime.seconds = startSeconds;
  endTime.seconds = endSeconds;

  const subClip = app.project.rootItem.children[0].children[0].createSubClip(
    "main.mp4",
    startTime,
    endTime,
    1,
    1,
    1
  );

  if (!subClip) {
    return false;
  }

  subClip.moveBin(bin);
  return true;
}