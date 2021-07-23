# Cellular Automata

This is a web application that simulates fauna with singular cells & simple rules.
Rules can be modified.


#### Create rules

Here is the syntax:
* `A>B` means A follows B
* `B<A` means B flees A
* use `,` to enumerate multiple cells
* use `;` to separate expressions  



Here is an example for the ruleset `A follows B, B follows C, C follows A, C flees B`
```
A>B;B>C;C>A;C<B;
```

Here is another example for the ruleset `A follows B, B follows C and A, C follows A, C flees B, D follows A and C`
```
A>B;B>C,A;C>A;C<B;D>A,C;
```