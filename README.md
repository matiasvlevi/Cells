# Cellular Automata

This is a web application that simulates fauna with singular cells & simple rules.
Rules can be modified.


<br/><br/>

## Run

* Open `index.html` or click [this link](https://raw.githack.com/matiasvlevi/Cells/0.0.1/index.html)

<br/>

## Ruleset
The cells follow a certain ruleset to enable their behaviour. Rules can be broken down into two behaviors, follow or flee.
Cells can follow one or multiple cells and Cells can also flee one or multiple cells.

<br/>

## Create rules

Ruletext is a simple language to express cell rules.
A Ruletext file has the `.rtxt` extension.

You can parse such files by placing them in `ruletext/` by running `npm run tojson [name of file]` or `npm run tostr [name of file]`.

Be sure that you installed dependencies with `npm install`. 

### Syntax

* `A>B` means A follows B
* `B<A` means B flees A
* `,` to enumerate multiple cells
* `;` to separate expressions 
* `#` add comment, ignored line  

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

Write the rule in the input element at the top of the page and click `Run`.
You can find the compiled version of your rules in the browser's console, the compiled version allows for more customization.
