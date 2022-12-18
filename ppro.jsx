// const { dirname } = require('path');

// var projectItem = project.rootItem;

// const PROJECT_INDEXES = {
//   mainVideo: 0,
//   endScreen: 1,
//   introScreen: 2,
// };

var directory = new File($.fileName).parent;

function printEntireObject(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object") {
      $.writeln(key + ": ");
      printEntireObject(obj[key]); // Recursion
      continue;
    }

    if (typeof obj[key] === "string") {
      $.writeln(key + ': "' + obj[key] + '"');
      continue;
    }

    $.writeln(key + ": " + obj[key]);
  }
  return;
}

/**
 *
 * @returns boolean - whether the project creation was successful or not
 * @references
 *    newProject - https://ppro-scripting.docsforadobe.dev/application/application.html#app-newproject
 */
function createProject() {
  // https://ppro-scripting.docsforadobe.dev/application/application.html#app-newproject
  var result = app.newProject(
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\output-files\\project-files\\lll"
  );
  return result;
}

/**
 * @references
 *    importFiles - https://ppro-scripting.docsforadobe.dev/general/project.html#project-importfiles
 */
function importFilesIntoProject() {
  targetBin = app.project.rootItem.createBin("1");

  const myFiles = [
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\input-files\\Videos\\test.mp4",
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\input-files\\Intros\\end-screen.mov",
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\input-files\\Intros\\intro-screen.mov",
  ];

  var result = app.project.importFiles(myFiles, true, targetBin);
  return result;
}

/**
 * @references
 *    createNewSequence - https://ppro-scripting.docsforadobe.dev/general/project.html#project-createnewsequence
 */
function createNewSequenceInProject() {
  app.enableQE();

  var result = app.project.newSequence(
    "Test Sequence",
    "C:\\Code\\1-krpcStuff\\krpc-video-editing-script\\input-files\\krpc-script-sequence.sqpreset"
  );

  return result;
}

/**
 *
 */
function insertVideoClip() {
  var time = new Time();
  time.seconds = 2;
  // insertClip(track, time)
}

/**
 * 
 * 
 * 
 * 






 */

function main() {
  // // Create project
  // var isProjectCreationSuccess = createProject();
  // if (!isProjectCreationSuccess) {
  //   $.write("ERROR - Failed to create project... terminating script");
  //   Error.runtimeError(5001, "Failed To Create Project");
  // }

  // // Import files into project
  // var isImportFilesSuccess = importFilesIntoProject();
  // if (!isImportFilesSuccess) {
  //   $.write("ERROR - Failed to import files... terminating script");
  //   Error.runtimeError(5002, "Failed To Import Files");
  // }

  // // Create an empty sequence -- 0 is error value
  // var isCreateNewSequenceSuccess = createNewSequenceInProject();
  // if (!isCreateNewSequenceSuccess) {
  //   $.write("ERROR - Failed to create sequence... terminating script");
  //   Error.runtimeError(5003, "Failed To Create Sequence");
  // }

  printEntireObject(app.project.sequences)



}

main();

function insertVideoClip2(clipNr, trackNr, time) {
  var seq = app.project.activeSequence;
  var videoTrack = seq.videoTracks[trackNr];
  var videoClip = videoTrack.clips[clipNr];
  var projectItem = videoClip.projectItem;

  videoTrack.insertClip(projectItem, time);
}
