/**
 *
 * @param {*} sequenceIndex the index of the sequence we are working with
 * @param {*} trackIndex the index of the track to add the sequence to
 * @param {*} seconds the seconds to add the clip to (the start of the clip will be at this second)
 * @param {*} binIndex each index of the bin contains the contents needed for one edit
 * @param {*} clipIndex The index of the clip in the bin
 */
function insertVideoClip(binIndex, trackIndex, clipIndex, insertionSecond) {
  var time = new Time();
  time.seconds = insertionSecond;

  $.write(binIndex);
  $.write("\n");

  $.write(trackIndex);
  $.write("\n");

  $.write(clipIndex);
  $.write("\n");

  $.write(insertionSecond);
  $.write("\n");

  $.write(app.project.activeSequence.videoTracks[trackIndex]);
  $.write("\n");

  $.write(app.project.rootItem.children[binIndex].children[clipIndex]);

  app.project.activeSequence.videoTracks[trackIndex].insertClip(
    app.project.rootItem.children[binIndex].children[clipIndex],
    time
  );
}
