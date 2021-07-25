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
    let action_types = ['simple', 'simple', 'detailed', 'detailed', 'value', 'value'];
    let actions = ['flee', 'follow', 'create', 'kill', 'perception', 'population'];
    let actions_keys = ['<', '>', '+', '-', '?', '$'];

    // Iterate through action keys to set default variables. (Name, argument, split, action key)
    for (let j = 0; j < actions_keys.length; j++) {
      if (elem.indexOf(actions_keys[j]) !== -1) {
        split = elem.split(actions_keys[j]);
        name = split[0];
        spec = toArray(split[1]);
        action = actions_keys[j];
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
        for (let a = 0; a < actions.length; a++) {
          if (action !== '?' && action !== '$') {
            if (data[spec[j]] === undefined) {
              data[spec[j]] = {
                heartbeat: [240, 360],
                perception: 32,
                acc: 0.4,
                vel: 1
              };
            }
          }
          if (action === actions_keys[a]) {
            let action_name = actions[a];
            if (obj[action_name] === undefined) {
              obj[action_name] = [];
            }
            if (action_types[a] === 'detailed') {
              let rate = 1500;
              if (action_name === 'kill') {
                rate = 400;
              }
              let details = {
                type: spec[j],
                rate: rate
              }
              obj[action_name].push(details);
            } else if (action_types[a] === 'simple') {
              obj[action_name].push(spec[j]);
            } else if (action_types[a] === 'value') {
              obj[action_name] = +spec[j];
            }

          }
        }
      }
      data[name] = obj;


    } else {
      let obj = data[name];
      for (let j = 0; j < spec.length; j++) {

        for (let a = 0; a < actions.length; a++) {
          //
          if (action !== '?' && action !== '$') {
            if (data[spec[j]] === undefined) {
              data[spec[j]] = {
                heartbeat: [240, 360],
                perception: 32,
                acc: 0.4,
                vel: 1
              };
            }
          }
          if (action === actions_keys[a]) {
            let action_name = actions[a];
            if (obj[action_name] === undefined) {
              obj[action_name] = [];
            }
            if (action_types[a] === 'detailed') {
              let rate = 1500;
              if (action_name === 'kill') {
                rate = 400;
              }
              let details = {
                type: spec[j],
                rate: rate
              }
              obj[action_name].push(details);
            } else if (action_types[a] === 'simple') {
              obj[action_name].push(spec[j]);
            } else if (action_types[a] === 'value') {
              obj[action_name] = +spec[j];
            }

          }
        }
      }
      data[name] = obj;

    }
  }

  return data;
}

const brow = typeof process !== 'object';
if (!brow) {
  module.exports = parseRuletext;
}