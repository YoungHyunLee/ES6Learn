
(function(){
'use strict';
	

/*
var text = "𠮷a";

console.log(text.length)

console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97

console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97


var text2 = "a";

console.log(text2.length, text2.codePointAt(0))

console.log(typeof text.codePointAt(0))



console.log(String.fromCodePoint(134071)); 
console.log(String.fromCodePoint(57270)); 




function supportsExtendedEscape() { 
	try { 
		eval("'\u{00FF1}'"); 
		return true;
	} catch (ex) { 
		return false; 
	};
}

var wow = supportsExtendedEscape();
console.log(wow)

*/

/*
console.log("\u0073\u0323\u0307")


var str = '\u1E9B\u0323\u0307';

console.log(str.normalize('NFKC'))


var normalized = values.map(function(text) {
    return text.normalize();
});

normalized.sort(function(first, second) {
    if (first < second) {
        return -1;
    } else if (first === second) {
        return 0;
    } else {
        return 1;
    }
});
*/

var str = "\u1E9B\u0323"
console.log(str)
console.log(str.normalize('NFC'))
console.log(str.normalize('NFD'))
console.log(str.normalize('NFKC'))
console.log(str.normalize('NFKD'))

var str2 = '1'

console.log(str2)
console.log(str2.normalize('NFC'))
console.log(str2.normalize('NFD'))
console.log(str2.normalize('NFKC'))
console.log(str2.normalize('NFKD'))

console.log('\u1E9B'.normalize())

})();




























































