//@include ./helpers/readCSV.jsx
//@include ./helpers/createProject.jsx
//@include ./helpers/importFiles.jsx
//@include ./helpers/insertVideoClip.jsx
//@include ./helpers/createNewSequence.jsx
//@include ./helpers/getSubClip.jsx
//@include ./helpers/encodeResult.jsx
//@include ./constants/clipIndexes.jsx
//@include ./constants/csvIndexes.jsx

var rootDir = new File($.fileName).parent.parent;
var inputFilesDir = Folder(rootDir.toString() + "\\files\\inputs");
var outputFilesDir = Folder(rootDir.toString() + "\\files\\outputs");
// var rootDir = pwd.toString().replace(/\//g, "\\");

/**
 *
 */
function doTheEdit(binIndex, titleExists) {
  insertVideoClip(binIndex, 1, CLIP_INDEXES.introScreen, 0);

  insertVideoClip(
    binIndex,
    0,
    titleExists
      ? CLIP_INDEXES.editedMainVideo
      : CLIP_INDEXES.editedMainVideo - 1,
    5
  );

  insertVideoClip(
    binIndex,
    1,
    CLIP_INDEXES.outroScreen,
    app.project.activeSequence.videoTracks[0].clips[0].end.seconds - 2
  );

  if (titleExists) {
    insertVideoClip(
      binIndex,
      1,
      CLIP_INDEXES.titleCard,
      app.project.activeSequence.videoTracks[1].clips[0].end.seconds + 7
    );

    insertVideoClip(
      binIndex,
      1,
      CLIP_INDEXES.titleCard,
      app.project.activeSequence.videoTracks[1].clips[2].start.seconds - 14
    );
  }
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
  var inputs = readCSVFile(rootDir, inputFilesDir, "inputs.csv");
  if (!inputs) {
    $.write("ERROR - Failed to read CSV file inputs... terminating script");
    Error.runtimeError(5001, "Failed To Read CSV File");
  }

  /**
   * Create the project
   */
  var isProjectCreationSuccess = createProject("final.prproj");
  if (!isProjectCreationSuccess) {
    $.write("ERROR - Failed to create project... terminating script");
    Error.runtimeError(5002, "Failed To Create Project");
  }

  var sequenceBin = app.project.rootItem.createBin("Sequences");

  // TODO - for loop should start here for multiple edits at once for the future

  for (var i = 0; i < inputs.length; i++) {
    /**
     *
     */
    var isCreateNewSequenceSuccess = createNewSequence(sequenceBin, rootDir, i);
    if (!isCreateNewSequenceSuccess) {
      $.write("ERROR - Failed to create sequence... terminating script");
      Error.runtimeError(5005, "Failed To Create Sequence");
    }

    /**
     * The target bin
     */
    var projectBin = app.project.rootItem.createBin("Bin" + i);
    var projectBinIndex = app.project.rootItem.children.numItems - 1;
    /**
     * Import the files into the project
     */
    var isImportFilesSuccess = importFiles(
      projectBin,
      inputFilesDir,
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
      projectBin,
      projectBinIndex,
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
    doTheEdit(
      projectBinIndex,
      inputs[i][CSV_INDEXES.titleCard] == "none" ? false : true
    );

    /**
     *
     */
    var isEncodingSuccess = encodeResult(
      i,
      inputs[i][CSV_INDEXES.videoType],
      inputs[i][CSV_INDEXES.outputVideoTitle]
    );
    if (!isEncodingSuccess) {
      $.write(
        "ERROR - Failed to encode sequence... terminating script... you can try exporting it yourself"
      );
      Error.runtimeError(5007, "Failed To Export Sequence");
    }
  }

  $.write("SUCCESS - Finished Edits");
}

main();
