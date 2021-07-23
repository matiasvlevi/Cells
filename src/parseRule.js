function toArray(str) {
  let split = str.split(',');
  let ans = [];
  for (let i = 0; i < split.length; i++) {
    ans.push(split[i]);
  }
  return ans;
}

function removeEmpty(arr) {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length !== 0) {
      ans.push(arr[i]);
    }
  }
  return ans;
}

const parseRuletext = (rulestr) => {

  let data = {}
  let len = rulestr.length;
  // Get different expressions
  let expression = rulestr.split(':');
  let byRule = [];
  for (let i = 0; i < expression.length; i++) {
    let v = expression[i].split(';');
    v = removeEmpty(v);
    byRule = byRule.concat(v);
  }

  for (let i = 0; i < byRule.length; i++) {
    let elem = byRule[i];
    let name;
    let spec;
    let action;
    let split;
    let actions = ['<', '>'];

    for (let j = 0; j < actions.length; j++) {
      if (elem.indexOf(actions[j]) !== -1) {
        split = elem.split(actions[j]);
        name = split[0];
        spec = toArray(split[1]);
        action = actions[j];
      }
    }

    if (data[name] === undefined) {
      let obj = {
        heartbeat: [240, 360],
        perception: 32,
        acc: 0.4,
        vel: 1
      }
      for (let j = 0; j < spec.length; j++) {
        if (data[spec[j]] === undefined) {
          data[spec[j]] = {
            heartbeat: [240, 360],
            perception: 32,
            acc: 0.4,
            vel: 1
          };
        }
        if (action === '>') {
          if (obj['follow'] === undefined) {
            obj['follow'] = [];
          }
          obj['follow'].push(spec[j]);
        } else if (action === '<') {
          if (obj['flee'] === undefined) {
            obj['flee'] = [];
          }
          obj['flee'].push(spec[j]);
        }
      }
      data[name] = obj;


    } else {

      for (let j = 0; j < spec.length; j++) {
        if (data[spec[j]] === undefined) {
          data[spec[j]] = {
            heartbeat: [240, 360],
            perception: 32,
            acc: 0.4,
            vel: 1
          };
        }
        if (action === '>') {
          if (data[name]['follow'] === undefined) {
            data[name]['follow'] = [];
          }
          data[name]['follow'].push(spec[j]);


        } else if (action === '<') {
          if (data[name]['flee'] === undefined) {
            data[name]['flee'] = [];
          }
          data[name]['flee'].push(spec[j]);

        }
      }


    }
  }

  return data;
}

const brow = typeof process !== 'object';
if (!brow) {
  module.exports = parseRuletext;
}
