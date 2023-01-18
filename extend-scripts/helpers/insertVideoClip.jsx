/**
 *
 * @param {*} binIndex each index of the bin contains the contents needed for one edit
 * @param {*} trackIndex the index of the track to add the sequence to
 * @param {*} clipIndex The index of the clip in the bin
 * @param {*} insertionSecond the seconds to add the clip to (the start of the clip will be at this second)
 */
function insertVideoClip(binIndex, trackIndex, clipIndex, insertionSecond) {
  var time = new Time();
  time.seconds = insertionSecond;
  
  app.project.activeSequence.videoTracks[trackIndex].insertClip(
    app.project.rootItem.children[binIndex].children[clipIndex],
    time
  );
}
