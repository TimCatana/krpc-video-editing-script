/**
 *
 */
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
