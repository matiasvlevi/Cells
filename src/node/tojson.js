const Rtxt = require('./rtxt');
console.log(Rtxt)

let name = process.argv[2] || 'set_a';
let file = ('./rules/ruletext_samples/' + name + '.rtxt');

let jsonRule = Rtxt.fileToJSON(file);
console.log(jsonRule);