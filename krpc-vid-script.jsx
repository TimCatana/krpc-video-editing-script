//@include ./helpers/readCSV.jsx
//@include ./helpers/createProject.jsx
//@include ./helpers/importFiles.jsx
//@include ./helpers/insertVideoClip.jsx
//@include ./helpers/createNewSequence.jsx
//@include ./helpers/getSubClip.jsx
//@include ./helpers/encodeResult.jsx
//@include ./constants/clipIndexes.jsx
//@include ./constants/csvIndexes.jsx

var pwd = new File($.fileName).parent;
var rootDir = pwd.toString().replace(/\//g, "\\");

/**
 *
 */
function doTheEdit(sequenceIndex) {
  insertVideoClip(sequenceIndex, 1, 0, 0, CLIP_INDEXES.introScreen);
  insertVideoClip(sequenceIndex, 0, 5, 0, CLIP_INDEXES.editedMainVideo);
  insertVideoClip(
    sequenceIndex,
    1,
    app.project.activeSequence.videoTracks[0].clips[0].end.seconds - 2,
    0,
    CLIP_INDEXES.outroScreen
  );
  insertVideoClip(
    sequenceIndex,
    1,
    app.project.activeSequence.videoTracks[1].clips[0].end.seconds + 7,
    0,
    CLIP_INDEXES.titleCard
  );
  insertVideoClip(
    sequenceIndex,
    1,
    app.project.activeSequence.videoTracks[1].clips[2].start.seconds - 14,
    0,
    CLIP_INDEXES.titleCard
  );
}

/**
 *
 */
function main() {
  app.enableQE();
  app.encoder.launchEncoder();

  /**
   * Read CSV File for inputs
   */
  var inputs = readCSVFile(rootDir, "inputs.csv");
  if (!inputs) {
    $.write("ERROR - Failed to read CSV file inputs... terminating script");
    Error.runtimeError(5001, "Failed To Read CSV File");
  }

  /**
   * Create the project
   */
  var isProjectCreationSuccess = createProject("Final");
  if (!isProjectCreationSuccess) {
    $.write("ERROR - Failed to create project... terminating script");
    Error.runtimeError(5002, "Failed To Create Project");
  }

  // TODO - for loop should start here for multiple edits at once for the future

  for (var i = 0; i < inputs.length; i++) {
    /**
     * The target bin
     */
    var targetBin = app.project.rootItem.createBin("Bin " + i);

    /**
     * Import the files into the project
     */
    var isImportFilesSuccess = importFiles(
      targetBin,
      rootDir,
      inputs[i][CSV_INDEXES.inputVideoTitle],
      inputs[i][CSV_INDEXES.titleCard]
    );
    if (!isImportFilesSuccess) {
      $.write("ERROR - Failed to import files... terminating script");
      Error.runtimeError(5003, "Failed To Import Files");
    }

    /**
     * Extract the sermon from service
     */
    var isGetSermonSubClipSuccess = getSubClip(
      targetBin,
      parseInt(inputs[i][CSV_INDEXES.startTime]),
      parseInt(inputs[i][CSV_INDEXES.endTime])
    );
    if (!isGetSermonSubClipSuccess) {
      $.write("ERROR - Failed to get sermon sub clip... terminating script");
      Error.runtimeError(5004, "Failed To Get Sermomn Sub Clip");
    }

    /**
     *
     */
    var isCreateNewSequenceSuccess = createNewSequence(rootDir, i);
    if (!isCreateNewSequenceSuccess) {
      $.write("ERROR - Failed to create sequence... terminating script");
      Error.runtimeError(5004, "Failed To Create Sequence");
    }

    /**
     *
     */
    doTheEdit(i);

    /**
     *
     */
    var isEncodingSuccess = encodeResult(
      i,
      inputs[i][CSV_INDEXES.outputVideoTitle]
    );
    if (!isEncodingSuccess) {
      $.write(
        "ERROR - Failed to encode sequence... terminating script... you can try exporting it yourself"
      );
      Error.runtimeError(5004, "Failed To Export Sequence");
    }
  }
}

main();
