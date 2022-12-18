/**
 *
 */
function readCSVFile(rootDir, filename) {
  var inputs = [];

  var csvFile = File(
    rootDir + "\\" + filename
  );


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
