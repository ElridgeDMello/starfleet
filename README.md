
## Starfleet Evaluator Program

### Steps to run:

1. ```git clone git@github.com:elridgedmello/starfleet.git```
2. ```npm install```
3. ```node starfleetEvaluator.js path/to/fieldfile.ext path/to/scriptfile.ext```

e.g.  ```node starfleetEvaluator.js testFiles/example1/field.txt testFiles/example1/script.txt```


Requires node v0.10.29 at the least (it may work with earlier versions, but has only been tested with this version)

### Unit Testing

Unit tests exist for some of the source.  To run the unit test, use jasmine-node

``` jasmine-node spec/ ```