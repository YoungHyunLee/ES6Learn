'use strict';
(function(){

	
/*
// hoisting Test
function getValue(condition) {
	console.log(value)
    if (condition) {
        var value = "blue";
		console.log(value)
        // other code

        return value;
    } else {
		console.log(value)
        // value exists here with a value of undefined

        return null;
    }
	console.log(value)
    // value exists here with a value of undefined
}

getValue();
getValue('ad');
getValue();
*/

/*
// let Test
// let variable은 호이스팅되지 않고 
function getValue(condition) {
	//console.log(value)
	// value doesn't exist here
    if (condition) {
        let value = "blue";
		console.log(value)

        // other code

        //return value;
    } else {
		console.log(value)

        // value doesn't exist here

        return null;
    }
	//console.log(value)

    // value doesn't exist here
}


getValue('ad');
*/

/*
// access variable `value` 
var condition = 1;

console.log(value);     // "undefined"

if (condition) {
	console.log(typeof value);     // error.
    let value = "blue";
}

*/

/*
// scope test
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push(function() { console.log(i); }); // outputs the number "1~10" one times
    // or 
    funcs.push((function() { console.log(i); })()); // outputs the number "10" ten times
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
*/

})();


/*
// global block scope Test
let RegExp = 'dd';
let undefined = 'dd';
*/
