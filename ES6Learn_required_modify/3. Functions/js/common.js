//'use strict';

function myFunc(a1){
    var d1 = (a1, a2) => console.log(this, arguments, a1);
    d1(2, 3);
    console.log(this, arguments);
};


var func = new myFunc(1);

function myFunc2(a, a, c){
    console.log(a, a, c);
   // var d2 = (a1, a1) => console.log(this, arguments, a1, a1);
    //d2(4, 5)
}

myFunc2(1,2,3);


var f1 = a => {
    console.log(2);
    return 1
}
console.log(f1(1));
























































