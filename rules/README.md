# Rule sets

Rule sets are json values containing information about the rules of the simulation.



### Creating a rule set
You can either create one with the syntax explained in the main README or directly in js.


#### JS rule set
Change the `rules/rules.js`.
Here is a simple example for `A>B;B<A` (A follows B, B flees A)
```js
let ruleset = {
  A: {
    color: [0, 100, 255],
    heartbeat: [100, 200],
    perception: 64,
    acc: 0.3,
    vel: 1,
    follow: [
      'B'
    ]
  },
  B: {
    color: [255, 100, 0],
    heartbeat: [100, 200],
    perception: 24,
    acc: 0.6,
    vel: 1,
    flee: [
      'A'
    ]
  }
}
```

* `color` is the r,g,b values as an array.
* `heartbeat` is the minimum and maximum heartbeat rate of a cell (bigger value = more agitated).
* `perception` is the vision radius of a cell.
* `acc` is the maximum acceleration a cell can achieve.
* `vel` is the maximum velocity a cell can achieve.

You can parse a ruletext with this method in the browser's console.
```js
let rule = parseRuletext('A>B;');
console.log(rule);
```

<br/>

### Intresting rule sets

Set A:
```
A>A;B>A;E>A;C>B,M;C<D,H;D>B,E;D<C;F>E;F<L;G>F,D;G<E;H>G,I;H<P;M>K;M<N;K>C;I>D,K;J>I,Q;L>H,J;N>K,J;P>J,R;O>L,P;O<N;Q>R;R>N,O;
```
