const fs = require('fs');

class Rtxt {}
Rtxt.stringToJSON = require('../parseRule');
Rtxt.parseToLine = function(path) {
  let data = fs.readFileSync(path, 'utf-8');
  let lines = data.split('\n');
  let readLines = '';
  for (let i = 0; i < lines.length; i++) {
    let line_no_comments = '';
    if (lines[i].indexOf('#') !== -1) {
      line_no_comments = lines[i].split('#')[0];
    } else {
      line_no_comments = lines[i];
    }
    if (line_no_comments.indexOf('\r') !== -1) {
      readLines += line_no_comments.split('\r')[0];
    } else {
      readLines += line_no_comments;

    }
  }
  // Remove all spaces
  readLines = readLines.replace(/  */gm, '');
  return readLines;
}
Rtxt.fileToJSON = function(file) {
  return Rtxt.stringToJSON(Rtxt.parseToLine(file))
}

module.exports = Rtxt;