/**
 *
 */
function encodeResult(currentIndex, outputName) {
  var result = app.encoder.encodeSequence(
    app.project.sequences[currentIndex],
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\output-files\\final-results\\" +
      outputName,
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\input-files\\krpc-video-encoding.epr",
    2,
    0
  );

  return result;
}
