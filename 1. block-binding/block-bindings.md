# Let Declarations


1. Inside of a function
1. Inside of a block (indicated by the `{` and `}` characters)

let declare variable is not hoisting and using inside of a block `{` and `}`.

let으로 선언하는 변수는 호이스팅되지 않고 블락( `{`와 `}`에 있는 코드)안에서만 사용할 수 있어.

```js
function getValue(condition) {
    if (condition) {
        let value = "blue";
        // other code
        return value;
    } else {
        // value doesn't exist here
        return null;
    }
    // value doesn't exist here
}
```


### No Redeclaration

If you declare identifier are aleary defined in a scope, thrown error.

식별자(변수명)가 이미 한 스코프 내에서 선언이 됐다면 에러를 던져!.

```js
var myVariable = 1;

// throw error
let myVariable = 2;
```

If let declaration inside block(if statement), doesn't throw error.

당연하지만 블락안에 `let` 선언이 있다면, 에러를 던지지 않아.


```js
var myVar = 1;
if(myVar){
	// Doesn't throw error.
	let myVar = 2;
}
```


#Constant Declarations


another variable define way is const declaration syntax.
defined variable is consider constants, and cannot change value. 
Thus only one set and must be variable initalized on declaration.

그니까 상수를 선언하는 var, let 말고 또 다른 방법으로 const가 있는데,
const는 constant(상수- 변하지 않는 값)를 줄인 말이야.
그리고 반드시 선언할 때 값을 할당해야 하고 변경할 수 없지.

`Info` : const도 let과 마찬가지로 block-level 선언이야. 그런데 어차피 아래에 보면 나와.... ㅋ

```js
// Valid constant
const maxItems = 30;

// Syntax error: missing initialization
const name;
```


#Similarities and Differences from Let


const declaration is block-level declaration.
So const and let are not hoisting, When flow out of the block, const and let are destoryed.

const도 let과 같아서, 호이스팅되지 않고 선언된 블락을 지나면 파괴가 돼.

```js
if (condition) {
    const maxItems = 5;
    // more code
}
// maxItems isn't accessible here
```
Also, declared const identifier variable is not using var and let declartion for identifier in same scope.

var로 선언된 변수명과 let의 변수명이 겹치면 안 되듯이,
동일한 scope 안에서 var과 let으로 선언된 변수명은 const와 겹치면 안 된다는 뜻!!!

```js
var message = "Hello!";
let age = 25;

// Each of these would throw an error given the previous declarations
const message = "Goodbye!";
const age = 30;
```


# Declaring Objects with Const


constant is not modify. so const declaration variable is not modify.
because const declaration variable is binding.
but you can change in variable value of const declaration.

앞서 말했듯이... 상수는 변경할 수 없지. 그래서 const로 선언한 변수는 변경할 수 없지.
왜냐하면 const로 선언한 변수는 그 값과 묶여있기 때문이야.
하지만 선언한 값 안에 있는 어떤 값들이라도 변경할 수 있어.
간단한 예를 들면 당신이라는 사람 자체는 바꿀 수 없지만 옷이나 이름같은 그 내부는 바꿀 수 있는 것 처럼 말이야..

```js
const person = {
    name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
person = {
    name: "Greg"
};
```

Understand? person itself is not modify. 
but person inner value can change modify.

Just remember: const prevents modification of the binding, not modification of the bound value.
`- by Nicholas C. Zakas -`

그 자체는 변경할 수 없지만 내부의 값은 변경할 수 있지.
니콜라스 자카스가 말하길...
단지 기억하세요 : 바인딩된 수정과 이미 바인드된 값의 수정은 const가 거부한다고 말하고 있어.


And pre ES6 of `const` implement serveral browsers are allowing overwrite the value.
but only in the global or function scope.

그러니까 ES6 스펙에서는 상수는 덮어쓰기가 안 되는데,
ES6 이전의 일부 브라우저에서는 전역 또는 function scope일 때 덮어쓰기가 가능하다는 거야!.


# The Temporal Dead Zone


`let` and `const` are not hoisting, because cannot access until after declaration.
If you attempt to do so results in a reference error.

`let` 과 `const` 로 정의한 변수는 hoisting되지 않아.
이유는 이미 앞에서 말하기는 했지만 선언하기 전까지는 접근할 수 없기 때문이지.
아래와 같은 시도를 한다면, reference 에러를 던질 거야.

```js
if (condition) {
    console.log(typeof value);  // ReferenceError!
    let value = "blue";
}
```

For this reason, this issue in what has become known as the `temporal dead zone`(TDZ) in the JS Community. 
The TDZ is never named in the spectification, and the TDZ mean this cause.

이런 현상을 TDZ라 불러(자카스횽... 무슨 JS 커뮤니티인지 알려줘야져 ㅇ_ ㅠ... 
즉, `let`과 `const`로 선언된 코드 블락을 TDZ라고 해)

스펙 문서에 나온 용어는 아니구, 커뮤니티에서 부르는 용어야.


When JS engine through a upcoming block and find variable declaration,
it hoist the declaration(ex) `var`) or place the declaration in the TDZ(ex) `let` and `const`)

JS 엔진이 따라오는 블락을 통해서 변수 선언문을 찾을 때,
무엇을 찾냐면 hoist 선언(`var`)이나 TDZ가 선언된 장소(`let` and `const`)를 찾아!.


If JS engine find a variable outside of TDZ or variable declaration block, the normally safe `typeof` operator, 
and `typeof` operator is return `'undefined'`.

JS 엔진이 TDZ 아니면 변수 선언 밖에서 변수를 찾을 때, 보통은 `typeof` 연산자를 사용하는게 안전해.
이것을 사용하면 `'undefined'`를 리턴하거든!. 위처럼 에러를 던지지 않고!!

```js
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}
```
The `value` is not in TDZ.
It's mean variable `value` not binding, and `typeof` operator return `undefined`.
Until now the TDZ is one unique aspect. Another aspect is their use inside of loop.

변수 `value`는 TDZ 안에 있지 않아
그래서 `value`는 binding 되지 않았으니까 `typeof` 연산자는 `undefined`를 반환해.
여기까지가 TDZ의 한 가지 특이한 점이야.
또 다른 한 가지는 루프 안에서 사용될 때 볼 수 있어!.


# Block Binding in Loops


Well... I think... if you use counter variable in `for` loop, you use only inside `for` loop.

음... 보통 여러 분들이 사용하는 카운터용 변수(아래 예제에서 `i`에 해당)를 
`for` 루프 안에서만 사용하실 겁니다. 

```js
for (var i=0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);                     // 10
```

In JavaScript, the variable `i` is still accessible after `for` loop because `var` declaration is hoisted.
Other languages, the variable is not accessible. This is block-level scope and it's default. 

자바스크립트에서는 `var`로 정의된 변수 `i`는 hoist 됐기 때문에 `for` 루프 밖에서도 접근할 수 있어.
Block-level scope가 기본으로 적용된 다른 언어들은 `for` 루프 안에서만 변수 `i`에 접근할 수 있어.
아래의 예제가 block-level scope가 적용된 예제야!

```js
for (let i=0; i < 10; i++) {
    process(items[i]);
}

// i is not accessible here - throws an error
console.log(i);
```
In this example, if the loop is complete, the variable is destoryed.
so no longer accessible.

`for`루프 또한 하나의 코드 block으로 생각해보면 `let`으로 선언한 변수를
왜 밖에서 접근할 수 없는지 쉽게 이해할 수 있을 거예요.
루프가 끝난 이후에는 파.괴.됐기 때문이져.


# Functions in Loops


`var` declaration variable(ex) `i`) is accessible from outside of the loop.
so... When create functions use `var` declaration variable inside of loop, it can made problem. 

보통 루프 안에서 사용하는 `i` 변수는 루프 밖에서도 접근할 수 있어.
루프 안에서 함수를 생성할 때 `var`로 선언한 변수를 사용하면 문제가 생길 수 있지. 

```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
```

In this example, usually you think this code to print 0 to 9.
Sure. it's wrong. This code outputs the number 10 ten times too!.
funcs inner functions are use `i` and when the loop complete, variable `i` has a value of 10.
so when console.log(i) is called, variable `i` of value output each time.

이 예제에서 보통 우리는 이 코드의 출력값이 0~9까지라고 생각하지만...
현실은 10만 10번을 출력해.
`funcs` 내부의 함수들은 `i`를 사용하고, 루프가 끝났을 때 변수 `i`는 10의 값을 가져.
그래서 console.log(i)가 호출됐을 때는 이미 `i`는 값이 10이기 때문에 10만 10번을 출력하는 거야.

To solve this problem, developers use immediately-invoked function expressions(IIFEs) like example of under.

이 문제를 해결하기 위해 아래의 예제처럼 개발자들은 즉시 실행 함수를 사용해.
(설명이 조금 더 있는데 귀찮아서 안 쓴 것은 절대 아닙...)

```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});
```

In this case, this code use IIFE inside of the loop. The variable `i` is passed to the IIFE.
When function create, `i` is copy and store to `value` argument.
The value is used by function for that iteration, so calling each function returns 0 to 9.
If you use `let` and `const` in ES6, you can simple the loop.

이 코드에서는 루프 안에서 즉시실행함수(IIFE)를 사용해서 변수 `i`를 함수에 넘겨.
함수가 생성될 때, `i`는 복사되고, 변수를 `value`에 저장을 하지.
결국 함수 실행이 반복될 때 저장된 값을 사용하기 때문에 0~9까지의 값을 출력하는 거야.
어때요, 참 쉽죠?
그런데... 우리가 ES6의 `let`과 `const`를 사용하면 이 루프를 더 간단하게 할 수 있어.


# Let Declarations in Loops


If you use `let` declaration, you can make simply pervious example.
On each iteration, the loop create a new variable and initialize value of this 
variable which use `let` declaration variable.
This mean you can omit the IIFE altogether.

우리가 `let`으로 반복문에 사용되는 변수를 선언한다면, 반복할 때마다 이 루프는 새로운 변수를 생성하고
동시에 그 변수에 `let`으로 이전에 선언한 변수의 값으로 초기화 해.
즉, 굳이 IIFE를 사용하지 않아도 루프를 돌릴 수 있다는 거지!!.

```js
var funcs = [];

for (let i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
})
```

Like upper example, if you use `for-in` and `for-of` loops, that's same result!

`for-in`이나 `for-of`나 같은 결과를 얻을 수 있쪙!.

```js
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

In this example, the `for-in` loop show the same behavior as the `for` loop.
If use `var` declaration instead of `let` declaration, all functions were output `"c"`.

위 예제에서 `for-in` 루프를 사용해도 이전의 예제와 동일한 효과를 보여주고 있어.
즉, `for` 루프냐 `for-in` 루프냐에 상관없이 `let`을 사용하면 된다는 거야.
당연한 말이지만.... `var`로 선언하면 모두 `c`를 출력하겠지...

Like this way, behavior of `let` declaration is important in loop.
because this is a specially-defined in the specification and characteristics of `let` is not necessarily
related to the non-hoisting.

이렇게 루프 안에서 사용되는 `let`의 행동은 특별한-정의라고 스펙에 나와있어.
그리고 이런 `let`의 특성이 반드시 non-hoisting과 관련된 것은 아니야.
즉, hoisting 되지 않을 때 나타나는 특성때문에 반드시 이런 일이 나타나는 것은 아니라는 거지. 
(이 부분이 1장 변수 파트에서 제일 어려운 번역이었어요...)


# Constant Declarations in Loops


As i said before, `const` declaration is not modify.
but  inner value of variable is can modify in ES6.
So if you overwrite value of `const` declaration variable inside of loop, JS engine will throw error.

`const`는 말 그대로 상수이기 때문에, 덮어쓰거나 값 자체를 수정할 수는 없어.
그래서 만약에 `for` 루프에서 `const`로 정의한 변수를 수정하려 한다면(== 초기화) 
JS 엔진은 error를 던질거야.

```js
var funcs = [];

// throws an error after one iteration
for (const i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
```

In this code, when `i++` execute, throw an error. because it's attempting to modify a constant.

이 코드에서, `i++`를 실행한다는 건 상수로 선언된 `i`가 변경돼야 한다는 뜻이니까, 에러를 던져!.

```js
// This code is almost same as the second example in the "Let Declarations in Loops" section.
// "Let Declarations in Loops"의 2번째 예제와 거의 동일!
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

When `const` variable is used in a `for-in` or `for-of` loop, this variable is such behavior as `let` declaration variable.
If the `for-in` and `for-of` loops work with `const`, the loop initializer creates a new binding on each iteration.
so, the loop initializer is not modify the value of `const' declaration variable of an existing binding.

`const` 변수가 `for-in`과 `for-of` 루프에서 사용되면, 이 변수는 `let` 변수와 동일한 행동을 보여줘.
`for-in`과 `for-of` 루프에서 `const`가 사용되면, 루프가 반복할 때마다 초기화때 새로운 바인딩을 생성해.
루프 초기화때, 이미 존재했던 binding된 변수의 값을 변경하지 않아.  
그래서 에러를 던지지 않지.
어때요 참 쉽죠?


# Global Block Bindings


Not usually use `let` or `const` in global scope. because the global object has predefined properties. 
Thus, there is potential for naming collisions.
Global object properties are accessed as non-qualified identifiers(ex) `name` or `location` and so on...),
and it is global object properties(== non-qualified identifiers).
If use `let` or `const` declaration variable name as global object properties name, 
JS engine throw an error because global object properties may be nonconfigurable.
Block binding is not allow redefinition of an identifier in the same scope because global properties is nonconfigurable.
so attempting to do this, it's error.

보통은 전역 scope에서 `let`과 `const`는 사용하지 않아,
전역 객체는 미리 정의된 프로퍼티들을 가지고 있어서 변수를 선언할 때 프로퍼티 이름으로 하게 되면 naming 충돌이 일어날 가능성이 있어.
전역 객체의 프로퍼티(이하 `전객프`...ㅋ)들은 식별자 앞에 `window` 를 사용하지 않아도 접근할 수 있어.
우리가 `전객프`의 이름으로 `const`나 `let` 을 이용해서 변수를 선언하게 되면,
JS 엔진은 우리에게 error을 던지겠지. 아마... 사용한 `전객프`는 nonconfigurable일 것이기 때문이지!(아래를 참고)
같은 scope 안에서 block-binding은 nonconfiguarble인 식별자의 재정의를 허용하지 않아.

nonconfigurable은 ES5를 보면 알 수 있는데(생각해보니... ES5는 이미 알 수도 있을 것 같은데... 뻘짓은 아니겠지)
말 그대로 '설정할 수 없는' 이라는 뜻이야. 해당 속성을 삭제할 수도 없고, 변경할 수도 없게 되는 거지!
변경할 수 없다는 건 마치 `const` 처럼 상수화 된다는 거고, 삭제할 수 없다는 건.... delete할 수 없다는 거지!
(더 이상의 자세한 설명은 생략한다.)

```js
let RegExp = "Hello!";          // ok
let undefined = "Hello!";       // throws error
```

It is mean that RegExp is `configurable = true`, undefined is `configurable = false`. 

RegExp는 configurable 값이 true라서 그렇고 undefined는 configurable 값이 false라서 그래.
어때요 참 쉽죠?


# 마치며...


드디어 제 1장 `block-binding`이 끝났습니다.
실제로는 `Emerging Best Practices for Block Bindings`와 `Summary`가 남아 있었지만
이 부분은 넘어가기로 결정했어요.
필요하신 분은 원문의 마지막 2파트를 보시면 되겠습니다.

작문을 한다는 게 쉽지가 않더라구요.
덕분에 시간이 2배이상 걸린 것 같습니다.
하지만 영어 공부를 해야 앞으로 많은 문서를 볼 수 있고,
기회가 된다면 제대로 번역을 해볼 수도 있기에 작문도 힘들지만 꾸역꾸역 하려고 합니다.
지금 하다보니 서평 이벤트에 당첨이 돼서 웹 앱에 대한 책 한 권을 받게됐어요.
그래서 중간에 2주 이상은 그 부분을 공부해야할 것 같아서 멈춰야할 것 같습니다.
그럼 즐거운 하루 보내시고 치맥도 드시면서 하세요.

- 숫자놀이 올림.







