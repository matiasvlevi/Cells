# Cellular Automata

This is a web application that simulates fauna with singular cells & simple rules.
Rules can be modified.


<br/><br/>

## Run

* Open `index.html` or click [this link](https://raw.githack.com/matiasvlevi/Cells/master/index.html)

<br/>

## Ruleset
The cells follow a certain ruleset to enable their behaviour. Rules can be broken down into two behaviors, follow or flee.
Cells can follow one or multiple cells and Cells can also flee one or multiple cells.

<br/>

## Create rules

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

<br/>

## Use your rules

Open the browser console and type
```js
start('your_string_ruleset_here');
```

example
```js
start('A>B;B<A');
```