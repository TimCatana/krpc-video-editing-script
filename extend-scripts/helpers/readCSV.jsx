//@include ../constants/csvIndexes.jsx
//@include ../constants/videoTypes.jsx

/**
 *
 * @param {*} item
 * @returns
 */
Array.prototype.indexOf = function (item) {
  var length = this.length;

  for (var i = 0; i < length; i++) {
    if (this[i] === item) return i;
  }

  return -1;
};

/* Get full path of file */
File.prototype.getFullPath = function () {
  return this.fsName;
};

/* Get full path of the folder of the file */
File.prototype.getFolderPath = function () {
  var str = this.fsName;
  return str.substring(0, str.lastIndexOf("\\"));
};

/* Get file name */
File.prototype.getFileName = function () {
  var str = this.fsName;
  return str.substring(str.lastIndexOf("\\") + 1, str.lastIndexOf("."));
};

/* Get file extension */
File.prototype.getFileExtension = function () {
  var str = this.fsName;
  return str.substring(str.lastIndexOf(".") + 1);
};

/* Get file name */
File.prototype.getFileNameWithExtension = function () {
  var str = this.fsName;
  return str.substring(str.lastIndexOf("\\") + 1);
};

/**
 *
 */
function readCSVFile(rootDir, inputFilesDir, filename) {
  var inputs = [];

  var csvFile = File(rootDir + "\\extend-scripts\\" + filename);

  if (csvFile.open("r")) {
    var csvContent = csvFile.read();
    csvFile.close();
  } else {
    csvFile.close();
    return null;
  }

  var lines = csvContent.split("\n");

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].split(",");

    if (!isInputValid(inputFilesDir, i + 1, line)) {
      return null;
    }

    if (
      !parseInt(line[0]) ||
      !parseInt(line[1]) ||
      parseInt(line[0]) > parseInt(line[1])
    ) {
      return null;
    }

    inputs.push(lines[i].split(","));
  }

  return inputs;
}

/**
 *
 * @returns
 */
function isInputValid(inputFilesDir, lineNum, input) {
  /**
   * !1) Check if it contains all the needed values
   */
  if (
    !input[CSV_INDEXES.startTime] ||
    !input[CSV_INDEXES.endTime] ||
    !input[CSV_INDEXES.inputVideoTitle] ||
    !input[CSV_INDEXES.outputVideoTitle] ||
    !input[CSV_INDEXES.titleCard] ||
    !input[CSV_INDEXES.videoType]
  ) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- it is either missing an input or you have stray empty lines at the end of the file\n"
    );
    return false;
  }

  /**
   * !2) Check if the start times are valid numbers
   */
  if (
    isNaN(input[CSV_INDEXES.startTime]) ||
    isNaN(input[CSV_INDEXES.endTime])
  ) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- the start or end time is not a valid number\n"
    );
    return false;
  }

  /**
   * !Check to make sure that end time is less than start time
   */
  if (
    parseInt(input[CSV_INDEXES.startTime]) >
    parseInt(input[CSV_INDEXES.endTime])
  ) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- end time comes before start time"
    );
    return false;
  }

  /**
   * !Check to make sure that the video exists in the Videos folder
   */

  var videoFolder = Folder(inputFilesDir + "\\Videos");
  if (!videoFolder.exists) {
    return false;
  } else {
    var videoFiles = videoFolder.getFiles();
  }

  var videoFileNamesArray = [];
  for (var i = 0; i < videoFiles.length; i++) {
    if (videoFiles[i].getFileNameWithExtension() != "README.md") {
      videoFileNamesArray.push(videoFiles[i].getFileNameWithExtension());
    }
  }

  if (videoFileNamesArray.indexOf(input[CSV_INDEXES.inputVideoTitle]) == -1) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- input video needs to be one of:\n"
    );
    $.write(videoFileNamesArray.toString() + "\n");
    return false;
  }

  /**
   * !Check to make sure that the title card exists in the Names folder
   */

  var titleFolder = Folder(inputFilesDir + "\\Names");
  if (!titleFolder.exists) {
    return false;
  } else {
    var nameCardFiles = titleFolder.getFiles();
  }

  var nameCardFileNamesArray = [];
  for (var i = 0; i < nameCardFiles.length; i++) {
    if (nameCardFiles[i].getFileNameWithExtension() != "README.md") {
      nameCardFileNamesArray.push(nameCardFiles[i].getFileNameWithExtension());
    }
  }

  if (nameCardFileNamesArray.indexOf(input[CSV_INDEXES.titleCard]) == -1) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- title card video needs to be one of:\n"
    );
    $.write(nameCardFileNamesArray.toString() + "\n");
    return false;
  }

  /**
   * !Check to make sure that the video type is a valid type
   */
  var videoTypeArray = [];
  for (key in VIDEO_TYPES) {
    videoTypeArray.push(VIDEO_TYPES[key]);
  }

  if (videoTypeArray.indexOf(input[CSV_INDEXES.videoType]) == -1) {
    $.write(
      "Line " +
        lineNum.toString() +
        " contains invalid input -- video type needs to be one of:\n"
    );
    $.write(videoTypeArray.toString() + "\n");
    return false;
  }

  return true;
}
