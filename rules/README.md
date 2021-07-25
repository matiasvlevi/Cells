# Rule sets

Rule sets are set of rules that define the behaviour of a simulation.


### Creating a rule set
 
You can either write one with Ruletext or JSON.


<br/><br/>

### Ruletext


Ruletext is a simple language to express cell rules.
A Ruletext file has the `.rtxt` extension.

You can parse such files by placing them in `rules/ruletext_samples` by running `npm run tojson [name of file]` or `npm run tostr [name of file]`.

Be sure that you installed dependencies with `npm ci`. 

#### Syntax

Rules
* `A>B` means A follows B
* `B<A` means B flees A
* `A+B` means A creates B
* `A-B` means A eats B
* `,` to enumerate multiple cells

Values
* `A$100` set A population to 100
* `E?64` set E perception radius to 100

Other
* `;` to separate expressions 
* `#` add comment, ignored line  

Here is an example for the ruleset `A follows B, B follows C, C follows A, C flees B`
```
A>B;B>C;C>A;C<B;
```

Here is another example for the ruleset `A follows B, A eats B, B follows C and A, C creates B`
```
A>B;A-B;B>C,A;C+B;
```

<br/>

#### Use your rules

Write the rule in the input element at the top of the page and click `Run`.
You can find the compiled version of your rules in the browser's console, the compiled version allows for more customization.


### JS rule set

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

<br/>
You can start a simulation with a certain ruletext like so

```js
// Run simulation with rules A follows B
start('A>B;');
```

You can parse a ruletext file or string with this method to a JSON for more customization.
```js
let ruleset = parseRuletext('A>B;');
start(ruleset);
```

<br/><br/><br/>

### Interesting rule sets

Set A:
```
A>A;B>A;E>A;C>B,M;C<D,H;D>B,E;D<C;F>E;F<L;G>F,D;G<E;H>G,I;H<P;M>K;M<N;K>C;I>D,K;J>I,Q;L>H,J;N>K,J;P>J,R;O>L,P;O<N;Q>R;R>N,O;
```
Set B:
```
A>A;B>A;B<J;E>A;E<L;F>E;C>B,D;C<I;D>B,E;H>C,K;H<P;I>F,H,L;J>D,L;R>R,U;R<F;U>M;U<R;M>F,N;N>P;N<J;P>Q;L>K,P;K>I,O;S>V;S<H;T>S;T<O;V>T,Q;Q>Q;
```
Set C:
```
A>B;B>C,A;C>D,B;B<D;A<C;D<A;
```
