/**
 *
 */
function encodeResult(currentIndex, directoryName, outputName) {
  var result = app.encoder.encodeSequence(
    app.project.activeSequence,
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\files\\outputs\\final-results\\" +
      directoryName +
      "\\" +
      outputName,
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\files\\inputs\\krpc-video-encoding.epr",
    2,
    0
  );

  return result;
}
