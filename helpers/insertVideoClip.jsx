/**
 *
 * @param {*} sequenceIndex the index of the sequence we are working with
 * @param {*} trackIndex the index of the track to add the sequence to
 * @param {*} seconds the seconds to add the clip to (the start of the clip will be at this second)
 * @param {*} binIndex each index of the bin contains the contents needed for one edit
 * @param {*} clipIndex The index of the clip in the bin
 */
function insertVideoClip(
  sequenceIndex,
  trackIndex,
  insertionSecond,
  binIndex,
  clipIndex
) {
  var time = new Time();
  time.seconds = insertionSecond;

  $.write(sequenceIndex);
  $.write(app.project.sequences[sequenceIndex]);

  app.project.sequences[sequenceIndex].videoTracks[trackIndex].insertClip(
    app.project.rootItem.children[binIndex].children[clipIndex],
    time
  );
}
