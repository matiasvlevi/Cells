function start(rulestr) {
  if (typeof rulestr === 'string') {
    cells = {}
    ruleset = {}
    let rules = parseRule(rulestr);
    console.log('Here is the compiled version of your ruleset.')
    console.log(rules);
    console.log(' You can modify more information (color, heartbeat, perception radius, cell acceleration, cell velocity) with that format');
    console.log(' You can load that file with start(your_compiled_ruleset)')
    reset(rules);
    return rules;
  } else {
    reset(rulestr);
    return undefined;
  }
}
