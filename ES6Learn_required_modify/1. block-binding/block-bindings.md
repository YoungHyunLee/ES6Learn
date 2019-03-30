
# Block Bindings

Traditionally, the way variable declarations work has been one tricky part of programming in JavaScript.
In most C-based languages, variables (or bindings) are created at the spot where the declaration occurs.
In JavaScript, however, this is not the case. Where your variables are actually created depends on how you declare them,
and ECMAScript 6 offers options to make controlling scope easier.
This chapter demonstrates why classic var declarations can be confusing,
introduces block-level bindings in ECMAScript 6, and then offers some best practices for using them.

예전부터, 변수 선언문들의 작동 방식은 자바스크립트(이하 JS) 프로그래밍의 까다로운 부분이었어.
C를 기반으로 만들어진 대부분의 언어들에서, 변수들(아니면 바인딩들)은 선언이 일어났던 그 위치에서 생성돼.
하지만 JS에서는 그렇지 않아. 변수들이 실제로 생성되는 건 선언된 방법에 의존하니까,
ECMAScript 6(이하 ES6 - ES2015라고도 합니다만 여기서는 ES6로 말하겠습니다)는 스코프를 컨트롤하기 쉽게 옵션을 제공하고 있어.
이 주제에서는

1. 'var' 선언법들이 혼란스러울 수 있는 이유.
2. ES6의 block-level 바인딩.

위의 내용들 그리고 이들을 사용할 때 필요할 중요한 예시를 다룰거야.


## Var Declarations and Hoisting

Variable declarations using `var` are treated as if they are at the top of the function
(or global scope, if declared outside of a function) regardless of where the actual declaration occurs; this is called *hoisting*.
For a demonstration of what hoisting does, consider the following function definition:

`var`를 사용하는 변수 선언법들은 실제 선언문이 존재했던 위치에 상관없이 함수의 최상단(함수 밖이라면 global scope)으로 취급해.
우리는 이것을 *호이스팅(hoisting)*이라 부르지.
호이스팅이 무엇인지, 아래의 함수 선언을 통해 생각해보자.

```js
function getValue(condition) {

    if (condition) {
        var value = "blue";

        // other code

        return value;
    } else {

        // value exists here with a value of undefined

        return null;
    }

    // value exists here with a value of undefined
}
```

If you are unfamiliar with JavaScript, 
then you might expect the variable `value` to only be created if `condition` evaluates to true. 
In fact, the variable `value` is created regardless. 
Behind the scenes, the JavaScript engine changes the `getValue` function to look like this:

네가 JS에 익숙하지 않다면, 이 코드에서 `condition`이 true로 평가될 때만 변수 `value`가 생성될 것으로 예상할 수도 있을 거야.
사실 변수 `value`는 위 조건에 상관없이 생성돼.
보이지 않는 곳인 JS 엔진은 위의 `getValue` 함수를 아래의 예제처럼 변경해.

```js
function getValue(condition) {

    var value;

    if (condition) {
        value = "blue";

        // other code

        return value;
    } else {

        return null;
    }
}
```

The declaration of `value` is hoisted to the top, while the initialization remains in the same spot. 
That means the variable `value` is actually still accessible from within the `else` clause. 
If accessed from there, the variable would just have a value of `undefined` because it hasn't been initialized.

`value`의 선언이 초기화를 위해 같은 곳에 위치할 수 있도록 위로 끌어올려졌어(hoisted).
그 의미는 변수 `value`를 `else` 절 내부에서 실제로 계속 접근할 수 있도록 하기 위해서야.
`else` 절 내부에서 접근한다면, 그 변수는 이미 초기화가 됐기 때문에, `undefined` 값을 얻을 수 있어.

It often takes new JavaScript developers some time to get used to declaration hoisting,
and misunderstanding this unique behavior can end up causing bugs.
For this reason, ECMAScript 6 introduces block level scoping options to make the controlling a variable's lifecycle a little more powerful.

이것은 종종 새로운 JS 개발자들이 호이스팅 선언을 사용하는데 약간의 시간이 필요하고,
이 독특한 동작을 오해하여 버그가 생길 수 있지.
이런 이유로, ES6에서 소개하는 block level scope의 옵션들을 사용하면 변수들의 생명주기(lifecycle)를 쉽고 강력하게 컨트롤할 수 있어.

* 역자 주 : 호이스팅의 잘못된 사용법에 대해 더 쉽게 이해하는 방법으로 
여러 개의 변수가 함수 내부 어딘가에 각각 따로 선언되어 있다고 생각해보세요.
변수가 많을수록 무슨 변수가 있는지 이해하기 어렵습니다. 만류귀종이라고.. 컴퓨터도 똑같다고 생각하면 편합니다.


## Block-Level Declarations

Block-level declarations are those that declare variables that are inaccessible outside of a given block scope. 
Block scopes, also called lexical scopes, are created:

1. Inside of a function
1. Inside of a block (indicated by the `{` and `}` characters)

Block scoping is how many C-based languages work, 
and the introduction of block-level declarations in ECMAScript 6 is intended to bring that same flexibility (and uniformity) to JavaScript.

Block-level(이하 BL - Boys Lov...아닙니다!) 선언들은 변수들을 선언한 block scope 밖에서는 접근할 수 없어.
Block scope는 또한 렉시컬 스코프(= 어휘적 환경 = 어휘적 범위 다 같은 말이라고 보면 됩니다)라고 말할 수 있는데 아래의 방법으로 만들 수 있어.

1. 함수 내부
2. block 내부(중괄호(`{}` 내부))

Block scoping은 C를 기반으로 하는 많은 언어들의 작동 방식이기도 한데,
ES6에서 BL 선언들의 도입은 JS에도 동일한 유연성(또는 균일함)을 가져올 수 있도록 만들어졌어.


### Let Declarations

The `let` declaration syntax is the same as the syntax for `var`. 
You can basically replace `var` with `let` to declare a variable, 
but limit the variable's scope to only the current code block (there are a few other subtle differences discussed a bit later, as well). 
Since `let` declarations are not hoisted to the top of the enclosing block, 
you may want to always place `let` declarations first in the block, so that they are available to the entire block. Here's an example:

`let` 선언문의 문법은 `var`의 문법과 같아. 기본적으로 `var`로 선언하는 것을 `let`으로 교체할 수도 있지만,
변수들의 스코프가 오직 현재의 코드 블락(여기에는 약간 다른 미묘한 차이점이 존재하지만 잠시 후에 다루도록 하자)이라는 제한이 있어.
`let` 선언문들을 사용한 후에는 블락으로 둘러싸인 영역의 최상단으로 호이스팅되지 않고,
네가 항상 `let` 선언문들을 블락 상단에 작성하면, 블락 전체에서 사용할 수 있어. 다음은 그 예제야.

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

This version of the `getValue` function behaves much closer to how you'd expect it to in other C-based languages. 
Since the variable `value` is declared using `let` instead of `var`, 
the declaration isn't hoisted to the top of the function definition, 
and the variable `value` is no longer accessible once execution flows out of the `if` block. 
If `condition` evaluates to false, then `value` is never declared or initialized.

이 예시에서 `getValue` 함수의 형태는 다른 C 기반 언어에서 기대했던 방식에 더 가깝게 동작해.
`var` 대신에 `let`을 사용해서 변수 `value`를 선언했기 때문에,
이 변수 선언은 함수 최상단으로 호이스팅되지 않아.
그리고 `if` 블락이 실행된 후 변수 `value`에 더 이상 접근할 수도 없어.
만약 `condition`이 false로 평가됐을 때에는 변수 `value`는 절대 선언되지도 않고 초기화되지도 않게 돼.


### No Redeclaration

If an identifier has already been defined in a scope, 
then using the identifier in a `let` declaration inside that scope causes an error to be thrown. For example:

혹여나 같은 스코프 안에서 이미 동일한 식별자가 선언이 됐다면,
아래의 예시처럼, 그 스코프 안에서 `let` 선언을 통해 동일한 식별자가 사용됐으니까 에러를 던지게 돼.

```js
var count = 30;

// Syntax error
let count = 40;
```

In this example, `count` is declared twice: once with `var` and once with `let`. 
Because `let` will not redefine an identifier that already exists in the same scope, the `let` declaration will throw an error. 
On the other hand, no error is thrown if a `let` declaration creates a new variable with the same name as a variable in its containing scope, 
as demonstrated in the following code:

이 예시에서 `count` 변수는 각각 `var`, `let` 선언을 통해 두 번 선언이 되었어.
`let` 선언은 같은 스코프상에서 이미 존재하는 식별자가 있을 경우 다시 재정의하지 않기 때문에, `let` 선언은 에러를 던지게 돼.
반면에(너무나 당연하게도), `let` 선언으로 동일한 이름의 변수를 생성하더라도 스코프를 포함시킨다면 에러를 던지지 않아.
아래 예시에서 보여지듯이말야.

```js
var count = 30;

// Does not throw an error
if (condition) {

    let count = 40;

    // more code
}
```

This `let` declaration doesn't throw an error because it creates a new variable called `count` within the `if` statement, 
instead of creating `count` in the surrounding block. 
Inside the `if` block, this new variable shadows the global `count`, preventing access to it until execution leaves the block.

블락 근처(여기서는 `if`문 외부)에서 `count` 변수를 생성하는 대신에,
`if`문 내부에서 `count` 변수를 새로 생성하게 되면, 이 `let` 선언은 에러를 던지지 않아.
`if`문 안에서는 이 새로운 변수로 인해 전역 변수 `count`는 가려지게 되고, 
그 블락에서 벗어날 때까지 접근이 차단 돼.


### Constant Declarations

You can also define variables in ECMAScript 6 with the `const` declaration syntax. 
Variables declared using `const` are considered *constants*, meaning their values cannot be changed once set. 
For this reason, every `const` variable must be initialized on declaration, as shown in this example:

또한 너는 ES6의 `const`라는 문법을 통해 변수 선언을 할 수도 있어.
`const` 사용한 변수들의 선언은 *constants*(상수- 변하지 않는 값)로 생각해볼 수 있는데, 
이는 그 변수의 값들이 한번 설정되면 변경할 수 없다는 뜻이야.
이런 이유로 아래 예시처럼, 모든 `const` 변수는 반드시 선언할 때 초기화가 되어야 해.

```js
// Valid constant
const maxItems = 30;

// Syntax error: missing initialization
const name;
```

The `maxItems` variable is initialized, so its `const` declaration should work without a problem. 
The `name` variable, however, would cause a syntax error if you tried to run the program containing this code, because `name` is not initialized.

변수 `maxItems`는 초기화 되었으니 `const` 선언을 사용했을 때 문제없이 동작해.
하지만 변수 `name`은 초기화가 되지 않았으니, 이 코드를 포함한 프로그램에서 실행을 시도하게되면 오류의 원인이 돼.

* 역자 주 : 여기서 `프로그램`은 크게 보면 웹 서비스, 작게 보면 js 파일 하나 또는 script 태그 하나 정도로 볼 수 있습니다.
또한 `실행`한다는 의미는 JS 엔진에 해당 JS 소스를 '실행'한다고 이해하시면 되겠습니다.


#### Constants vs Let Declarations

Constants, like `let` declarations, are block-level declarations. 
That means constants are no longer accessible once execution flows out of the block in which they were declared, 
and declarations are not hoisted, as demonstrated in this example:

`let` 선언처럼 상수들은 BL이야(잊지마세요. block-level이지 Boys lov...가 아닙니다).
그 뜻은 상수들도 한번 실행된 블락 스코프를 벗어나면 더 이상 접근할 수 없고,
아래 예시처럼, 변수 선언들이 호이스팅 되지도 않지.

```js
if (condition) {
    const maxItems = 5;

    // more code
}

// maxItems isn't accessible here
```

In this code, the constant `maxItems` is declared within an `if` statement. 
Once the statement finishes executing, `maxItems` is not accessible outside of that block.

이 코드에서, 상수 `maxItems`은 `if`문 안에서 선언됐어.
이 문장의 실행이 한번 끝나게 되면, 블락 외부에서는 `maxItems` 변수에 접근할 수 없지.

In another similarity to `let`, a `const` declaration throws an error when made with an identifier for an already-defined variable in the same scope. 
It doesn't matter if that variable was declared using `var` (for global or function scope) or `let` (for block scope). 
For example, consider this code:

`let` 선언과 또 다른 유사점이 있는데, 동일한 스코프상에서 이미 선언된 변수 식별자가 있을 때, `const` 선언은 에러를 던지게 돼.
아래 예시처럼, 변수가 `var`(global or function 스코프) 아니면 `let`(블락 스코프)을 사용하여 변수가 선언된지는 전혀 중요하지 않아.

* 역자 주 : 그냥 식별자가 겹치면 다 에러를 던진다고 이해하시면 됩니다.

```js
var message = "Hello!";
let age = 25;

// Each of these would throw an error.
const message = "Goodbye!";
const age = 30;
```

The two `const` declarations would be valid alone, but given the previous `var` and `let` declarations in this case, neither will work as intended.

두 개의 `const` 선언문이 따로 있었으면 유효했겠지만, 
이 경우에는 이전에 `var` 그리고 `let` 선언문이 주어졌기 때문에(선언된 식별자가 `const` 선언문과 겹쳤기 때문에), 
그 어느 것도 제대로 동작하지 않아.

Despite those similarities, there is one big difference between `let` and `const` to remember. 
Attempting to assign a `const` to a previously defined constant will throw an error, in both strict and non-strict modes:

이러한 유사점들이 있지만, `let`과 `const` 사이에 꼭 기억해야할 하나의 큰 차이점이 있어.
`strict mode`에 상관없이 이전에 `const`을 통해 선언된 상수에 할당을 시도하면 에러를 던진다는 점이야.

* 역자 주 : ES5에서 추가된 `strict mode`를 말합니다.

```js
const maxItems = 5;

maxItems = 6;      // throws error
```

Much like constants in other languages, the `maxItems` variable can't be assigned a new value later on. 
However, unlike constants in other languages, the value a constant holds may be modified if it is an object.

다른 언어들의 상수들과 비슷하게, 이 `maxItems` 변수는 나중에 새로운 값을 할당할 수 없어(= 재할당할 수 없음).
하지만 다른 언어들과 상수들과 다른 점은, 객체라면 수정할 수 있다는 점이야.

* 역자 주 : 이후에 나오겠지만, `const` 선언문을 통한 객체의 프로퍼티를 변경할 수 있다는 뜻입니다.
객체 자체를 바꾸거나 다른 타입으로 재할당은 불가합니다.


#### Declaring Objects with Const

A `const` declaration prevents modification of the binding and not of the value itself. 
That means `const` declarations for objects do not prevent modification of those objects. For example:

`const` 선언문은 값 자체가 아니라 할당된 바인딩의 수정을 방지하는 거야.
즉, `const`을 통해 객체들을 선언하면 이러한 객체들의 수정을 막지는 못 해.

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

Here, the binding `person` is created with an initial value of an object with one property. 
It's possible to change `person.name` without causing an error because this changes what `person` contains and doesn't change the value that `person` is bound to. 
When this code attempts to assign a value to `person` (thus attempting to change the binding), an error will be thrown. 
This subtlety in how `const` works with objects is easy to misunderstand. 
Just remember: `const` prevents modification of the binding, not modification of the bound value.

여기, `person`이 생성될 때 초기값으로 하나의 프로퍼티가 있는 객체가 바인딩됐어.
`person`에 바인딩만 바꾸지 않는다면 `person`에 포함된 그 어떤 것도 바꿀 수 있으니까,
오류없이 `person.name`을 변경하는 건 충분히 가능해.
이 예제 코드에서 `person`의 값을 재할당하려할 때(= 바인딩의 변경을 시도하려할 때)에는 에러를 던지게 되겠지.
이 미묘함때문에 `const`의 초기값을 이러한 객체들로 사용하면 쉽게 오해하게 만들어.
`const` 선언문은 바인딩의 수정을 막을 뿐, 그 바인딩된 값의 수정을 막는 것이 아니라는 점만 기억해.

* 역자 주 : 어찌보면 말장난같고 뭐 이리 장황하게 적었나 싶지만,
그만큼 `const`과 `let`의 차이가 중요하고 알아둬야 용도에 맞게 사용할 수 있다는 점입니다.
간단한 예시를 생각해보면 변수에 '재할당이 단 한번이라도 일어날 수 있다'를 고려해야 한다면,
`const` 선언문을 통해서는 Boolean, Integer, String, NaN 등의 타입은 사용하지 않는다는 것입니다.
이 경우, 재할당이 될 수 있다면 `let`을 쓴다고 보시면 됩니다.


### The Temporal Dead Zone

A variable declared with either `let` or `const` cannot be accessed until after the declaration. 
Attempting to do so results in a reference error, even when using normally safe operations such as the `typeof` operation in this example:

하나의 변수를 선언할 때 `let` or `const` 어느 하나를 사용했다면, 
선언되기 전까지 해당 변수에 접근할 수 없어.
아래 예제처럼 보통 사용되는 안전한 연산자인 `typeof`를 사용한다 하더라도 reference 에러를 보게 될거야.

```js
if (condition) {
    console.log(typeof value);  // ReferenceError!
    let value = "blue";
}
```

Here, the variable `value` is defined and initialized using `let`, but that statement is never executed because the previous line throws an error. 
The issue is that `value` exists in what the JavaScript community has dubbed the *temporal dead zone* (TDZ). 
The TDZ is never named explicitly in the ECMAScript specification, 
but the term is often used to describe why `let` and `const` declarations are not accessible before their declaration. 
This section covers some subtleties of declaration placement that the TDZ causes, 
and although the examples shown all use `let`, note that the same information applies to `const`.

이 예시에서, 변수 `value`는 `let`을 사용하여 선언 및 초기화되지만, 
그 문장 전에 이미 에러가 던져졌기때문에 실행되지 못 했어.
이 문제는 JS 커뮤니티에서 *temporal dead zone* (TDZ)라고 불리는 것이 있는데 앞서 얘기한 `value` 같은 경우가 포함될 수 있어.
이 TDZ라는 단어는 ECMAScript 명세에 나온 정식 용어는 아니지만,
왜 `let`과 `const` 선언문들이 각각 "선언하기 전에는 접근할 수 없는지"를 설명할 때, 이 용어를 보통 언급하기도 해.
이번 절에서(= The Temporal Dead Zone)는 TDZ의 원인이 될 수 있는 선언문 위치대해 다룰 거고,
아래의 나올 예시에서는 모두 `let`을 사용하지만 `const`도 동일하게 적용되니 참고해.

* 역자 주 : 말이 참 진짜 어렵습니다. TDZ를 아주 간단히 얘기하면 이전까지는 호이스팅이 되어 변수명을 써도 참조가 됐었는데요(대신 아직 선언이 나오지 않았으므로 undefined지만),
`let`이나 `const`를 사용했을 때에는 선언문을 진짜 실행하기 전에는 참조도(접근도) 되지 않는다는 뜻입니다.
이리 되면 undefined도 아니므로 error를 던지겠죠!
내부적으로는 다르지만 겉으로는 비슷한 예시로는 아직 선언하지 않은 변수를 호출 했을 때, "myVariable is not defined" 처럼 에러를 던지는데요.
이 에러도 Reference 에러고, 개념은 좀 비슷한 면이 있습니다.
가능하면 개인 의견(알든 모르든 제가 가진 지식)을 서술하지 않으려 했으나, 조금씩은 들어가게 되네요.
처음 공부할 때도 그랬지만 짜증나게 설명이 깁니다. 그래서 더 공부하기 부담스럽긴 했는데...!!!
알고 나면 너무나 당연해보이고 쉬운 내용이므로 크게 부담은 없으면 좋을 것 같습니다.
이해를 돕기 위해 잠깐 TDZ를 설명했지만, 실제 개념은 저 내용이 아니므로 이후의 글을 꼭 읽어주시길 바랍니다.


When a JavaScript engine looks through an upcoming block and finds a variable declaration, 
it either hoists the declaration to the top of the function or global scope (for `var`) or places the declaration in the TDZ (for `let` and `const`). 
Any attempt to access a variable in the TDZ results in a runtime error.
That variable is only removed from the TDZ, and therefore safe to use, once execution flows to the variable declaration.

JS 엔진이 다음 블락을 해석하는 중에 변수 선언문을 찾으면,
그 선언문을 상단으로 끌어올려 해석하는데, 함수나 전역 스코프(`var`) 아니면 TDZ안에 그 선언문을 놓고 해석 해(`let` 또는 `const`).
TDZ에서 어떤 방법을 쓰든 변수에 접근을 시도하면 런타임 에러를 보게 될거야.
그 변수는 오직 TDZ로부터 제거되고, 변수 선언문 이후로 실행이 넘어가게되면 안전하게 사용할 수 있어.

This is true anytime you attempt to use a variable declared with `let` or `const`  before it's been defined. 
As the previous example demonstrated, this even applies to the normally safe `typeof` operator. 
You can, however, use `typeof` on a variable outside of the block where that variable is declared, though it may not give the results you're after. Consider this code:

`let`이나 `const`으로 선언한 변수를 정의되기 전에 사용하려 한다면 언제든지 동일한 결과를 얻을 거야(방금 위에서 말한 것으로 에러를 뜻함).
앞서 예제로 이러한 사실을 증명했지만, 보통은 안전한 `typeof` 연산자도 동일해.
하지만 네가 변수가 선언된 블락밖에서 `typeof`에 변수를 사용할 수는 있는데, 대신 네가 생각했던 결과가 나오지는 않을 수 있지. 아래 코드를 보자.

```js
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}
```

The variable `value` isn't in the TDZ when the `typeof` operation executes because it occurs outside of the block in which `value` is declared. 
That means there is no `value` binding, and `typeof` simply returns `"undefined"`.

`typeof` 연산자를 실행할 때에는 `value`가 선언된 블락밖에서 존재했기 때문에, 변수 `value`는 TDZ안에 있지 않아.
그 의미는 `value` 바인딩이 거기엔 없다는 뜻이니 `typeof`는 간단히 `"undefined"`를 리턴해.

The TDZ is just one unique aspect of block bindings. Another unique aspect has to do with their use inside of loops.

TDZ는 블락 바인딩에서 한 가지 독특한 면이 있고, 또 다른 특이한 점으로는 루프 안에서 사용하는 것과 연관이 있지.

* 역자 주 : 루프도 결국 중괄호(`{}` 내부)가 있다는 점을 기억하시면, "아 루프도 비슷하겠구나"라는 생각이 들지 않을까 합니다.


## Block Binding in Loops

Perhaps one area where developers most want block level scoping of variables is within `for` loops, 
where the throwaway counter variable is meant to be used only inside the loop. 
For instance, it's not uncommon to see code like this in JavaScript:

개발자들이 변수의 블락 레벨 스코프를 가장 원하는 영역은 `for` 루프 안이라고 생각되는데,
이는 일회용으로 쓰는 카운터용 변수는 루프 안에서만 쓰길 원했던 것에서부터 오지 않았을까 싶어.
예시로, JS에서 이와 같은 코드를 자주 볼 수 있어.

```js
for (var i = 0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);                     // 10
```

In other languages, where block level scoping is the default, this example should work as intended, 
and only the `for` loop should have access to the `i` variable. 
In JavaScript, however, the variable `i` is still accessible after the loop is completed because the `var` declaration gets hoisted. 
Using `let` instead, as in the following code, should give the intended behavior:

다른 언어에서는, 블락 레벨 스코프는 기본이고, 변수 `i`는 `for` 루프 안에서만 접근할 수 있도록 예시에서 의도한 대로 동작해야 해.
하지만 JS에서는, 변수 `i`는 `var` 선언을 통해 위로 끌어올려졌기 때문에(호이스팅) 루프가 끝나도 여전히 접근할 수 있어.
대신 `let`을 사용한다면, 아래의 코드처럼, 의도한 대로 동작하게 될거야.

```js
for (let i = 0; i < 10; i++) {
    process(items[i]);
}

// i is not accessible here - throws an error
console.log(i);
```

In this example, the variable `i` only exists within the `for` loop. Once the loop is complete, the variable is no longer accessible elsewhere.

이 예제에서, 변수 `i`는 `for` 루프 안에서만 존재해. 한번 루프가 끝나면, 그 변수는 더 이상 어디에서도 접근할 수 없어.


### Functions in Loops

The characteristics of `var` have long made creating functions inside of loops problematic, 
because the loop variables are accessible from outside the scope of the loop. Consider the following code:

`var`의 특성은 오랫동안 루프 안에서 함수를 생성할 때 믄제가 있었는데,
이는 루프의 변수들이 루프의 범위 밖에서도 접근할 수 있었기 때문이야. 아래의 코드로 생각해보자.

```js
var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
```

You might ordinarily expect this code to print the numbers 0 to 9, but it outputs the number 10 ten times in a row. 
That's because `i` is shared across each iteration of the loop, meaning the functions created inside the loop all hold a reference to the same variable. 
The variable `i` has a value of `10` once the loop completes, and so when `console.log(i)` is called, that value prints each time.

아마 너는 정상적으로 이 코드가 0~9의 숫자를 출력하길 기대했겠지만, 연속 10번 숫자 10을 출력하게 돼.
그건 루프가 반복할 때마다 `i`가 공유됐기 때문인데, 이 뜻은 함수가 같은 변수를 참조만 하는 상태로 루프 안에서 생성된다는 의미야.
루프가 종료됐을 때 변수 `i`는 10을 가지고 있고, 그렇기 때문에 `console.log(i)`을 호출했을 때마다 그 값을 출력했던 거야.

To fix this problem, developers use immediately-invoked function expressions (IIFEs) inside of loops to force a new copy of the variable they want to iterate over to be created, as in this example:

이러한 문제를 고치기 위해, 개발자들은 즉시 실행 함수 표현식을 루프 안에서 사용함으로써,
아래 예시처럼, 반복하던 중에 함수를 실행함으로써 생성될 때의 변수값을 강제로 복사하는 방법을 썼었어.

* 역자 주 : 즉시 실행 함수 표현식 = IIFEs = IIFE = 즉시 실행 함수 다 같다고 이해하시면 됩니다.
여기서 표현식이라는 단어 하나는 생략해도 될 정도의 의미고, 이해하는데 무리가 없는 수준입니다.

```js
var funcs = [];

for (var i = 0; i < 10; i++) {
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

This version uses an IIFE inside of the loop. The `i` variable is passed to the IIFE, which creates its own copy and stores it as `value`. 
This is the value used by the function for that iteration, so calling each function returns the expected value as the loop counts up from 0 to 9. 
Fortunately, block-level binding with `let` and `const` in ECMAScript 6 can simplify this loop for you.

위 소스에서는 IIFE(다시 말하지만 즉시 실행 함수)를 루프 안에서 사용했어.
변수 `i`는 IIFE에 넘겨졌고, 복사된 자체의 값이 생성되어 `value`에게 저장돼.
이 값은 반복할 때마다 함수에게 사용됐고, 그래서 함수를 호출할 때마다 예상됐던 루프 카운트 값인 0~9를 값을 반환해.
다행히, ES6에서는 `let`과 `const`를 통해 블락 레벨 바인딩을 사용하면 이 루프를 간단히 네가 만들 수 있어.


### Let Declarations in Loops

A `let` declaration simplifies loops by effectively mimicking what the IIFE does in the previous example. 
On each iteration, the loop creates a new variable and initializes it to the value of the variable with the same name from the previous iteration. 
That means you can omit the IIFE altogether and get the results you expect, like this:

`let` 선언은 이전 예제에서 IIFE가 했던 것을 효과적인 모방을 통해 루프를 단순화시킬 수 있어.
반복할 때마다, 이 루프는 새로운 변수를 생성하고 이전 반복으로부터 동일한 이름을 가진 변수의 값으로 초기화 한다는 건데,
다음 예시처럼, 네가 IIFE를 모두 생략할 수 있고 기대한 결과를 얻을 수 있다는 뜻이야.

```js
var funcs = [];

for (let i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
})
```

This loop works exactly like the loop that used `var` and an IIFE but is, arguably, cleaner. 
The `let` declaration creates a new variable `i` each time through the loop, so each function created inside the loop gets its own copy of `i`. 
Each copy of `i` has the value it was assigned at the beginning of the loop iteration in which it was created. 
The same is true for `for-in` and `for-of` loops, as shown here:

이 루프는 `var`과 IIFE를 사용했던 루프와 정확히 동작하지만, 단언컨대, 더 깔끔해.
이 `let` 선언은 매번 루프를 통해서 새로운 변수를 만들고, 루프 안에 있는 함수는 생성될 때마다 `i`의 복사본을 얻게 돼.
각 `i`의 복사본들은 반복의 첫 시작 시점의 값을 가지고 있어(그냥 중괄호 `{` 시작 시점을 기준으로 각 반복마다 복사본을 가진다라고 이해하시면 됩니다).
이와 마찬가지로 `for-in` 그리고 `for-of` 반복문들도 모두 동일해. 아래 예제를 보자.

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

In this example, the `for-in` loop shows the same behavior as the `for` loop. 
Each time through the loop, a new `key` binding is created, and so each function has its own copy of the `key` variable. 
The result is that each function outputs a different value. If `var` were used to declare `key`, all functions would output `"c"`.

이 예제에서, `for-in` 루프는 `for` 루프와 동일한 행동을 보여주고 있어.
반복할 때마다, 새로운 `key` 바인딩이 생성되고, 각 함수 별로 변수 `key`의 복사본을 가지고 있지.
만약 `var`을 사용해서 `key`를 선언했다면, 모든 함수들은 전부 `"c"`를 출력했겠지만,
앞의 예시의 결과는 각 함수별로 다른 값을 출력하게 될거야.

I> It's important to understand that the behavior of `let` declarations in loops is a specially-defined behavior in the specification 
and is not necessarily related to the non-hoisting characteristics of `let`. 
In fact, early implementations of `let` did not have this behavior, as it was added later on in the process.

* 중요 : 루프 안에서 `let` 선언의 동작이 명세에서 특별히 정의된 점이라는 것을 이해하는 게 매우 중요하긴 한데,
`let`이 호이스팅되지 않는 특성과 반드시 연관이 없다는 뜻은 아냐.
사실 초창기 `let`의 실행 방식에는 이러한 동작이 없었고, 나중에 추가가 됐었어.

* 역자 주 : 지금 이 내용의 이해가 처음에는 안 될 수 있습니다. 그럴 경우, 현재는 앞서 이런 특성이 있다는 점만 알고 넘어가시면 되겠습니다.


### Constant Declarations in Loops

The ECMAScript 6 specification doesn't explicitly disallow `const` declarations in loops; 
however, there are different behaviors based on the type of loop you're using. 
For a normal `for` loop, you can use `const` in the initializer, but the loop will throw a warning if you attempt to change the value. For example:

ES6 명세에서는 루프 안에서 `const` 선언이 오는 것을 허용하지 않았었어.
하지만 네가 루프를 사용하는 방법에 따라 다른 동작을 볼 수 있어.
보통의 `for` 루프에서 초기화할 때 너는 `const`를 사용할 수는 있지만,
예제처럼, 값을 변경하려고 할 때에는 루프에서 에러를 던질 거야.

```js
var funcs = [];

// throws an error after one iteration
for (const i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
```

In this code, the `i` variable is declared as a constant. The first iteration of the loop, where `i` is 0, executes successfully. 
An error is thrown when `i++` executes because it's attempting to modify a constant. 
As such, you can only use `const` to declare a variable in the loop initializer if you are not modifying that variable.

이 코드에서, 변수 `i`는 상수로써 선언이 됐어. 루프에서 처음 반복할 때,
`i`의 값이 0일 때에는, 성공적으로 실행하게될 거야.
하지만 `i++`을 실행할 때 상수를 수정하려고 시도를 했기 때문에 에러를 던지게 돼.
엄밀히 말해서, 너는 루프 초기화할 때에는 `const`로 변수를 수정하지는 못하고 선언하는 용도로만 사용할 수 있어.

When used in a `for-in` or `for-of` loop, on the other hand, a `const` variable behaves the same as a `let` variable. So the following should not cause an error:

반면에 `for-in`이나 `for-of` 루프 안에서 사용될 때, `const` 변수는 `let` 변수와 똑같이 동작하게 되는데,
그래서 아래의 예시는 에러를 발생시키지 않아.

```js
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

This code functions almost exactly the same as the second example in the "Let Declarations in Loops" section. 
The only difference is that the value of `key` cannot be changed inside the loop. 
The `for-in` and `for-of` loops work with `const` because the loop initializer creates a new binding on each iteration through the loop 
rather than attempting to modify the value of an existing binding (as was the case with the previous example using `for` instead of `for-in`).

이 코드의 함수는 "Let Declarations in Loops" 절의 두 번째 예제와 거의 동일하게 동작해.
다른 점이라고는 `key`의 값이 루프 안에서는 변경되지 않는다는 것만 있어.
`for-in`과 `for-of` 루프들이 `const`와 함께 사용될 수 있는데, 이는 루프를 통해 반복할 때마다 루프 초기화 부분에서 새로운 바인딩을 생성하기 때문이야.
이미 바인딩된 값을 수정하려고 하는 게 아니거든(앞의 예제에서 `for-in` 대신에 `for`를 사용해도 마찬가지입니다).

* 역자 주 : 원문에서 정말 장황하게 적어뒀지만 상수의 선언은 바인딩만 변경하지 않으면 되기 때문에
객체 프로퍼티는 변경해도 상관이 없습니다.
결국 `for-in`과 `for-of` 루프들은 객체 프로퍼티의 참조를 key로 가지기 떄문에 
프로퍼티 참조는 백날 변경해도 상관없는 상수로 선언해도 전혀 지장이 없게 되겠죠!


## Global Block Bindings

Another way in which `let` and `const` are different from `var` is in their global scope behavior. 
When `var` is used in the global scope, it creates a new global variable, which is a property on the global object (`window` in browsers). 
That means you can accidentally overwrite an existing global using `var`, such as:

`let`과 `const`는 전역 스코프에서 `var`의 동작과는 또 다른 점이 있어.
`var`을 전역 스코프에서 사용했을 때에는 새로운 전역 변수가 생성되고, 전역 객체의 프로퍼티가 되는데(브라우저라면 `window`),
이것은 아래와 같이, 네가 뜻하지 않게 기존의 전역을 덮어쓸 수 있다는 점이야.

```js
// in a browser
var RegExp = "Hello!";
console.log(window.RegExp);     // "Hello!"

var ncz = "Hi!";
console.log(window.ncz);        // "Hi!"
```

Even though the `RegExp` global is defined on `window`, it is not safe from being overwritten by a `var` declaration. 
This example declares a new global variable `RegExp` that overwrites the original. 
Similarly, `ncz` is defined as a global variable and immediately defined as a property on `window`. 
This is the way JavaScript has always worked.

`window`에 전역으로 정의된 `RegExp`가 있더라도, `var` 선언으로 덮어쓸 수 있기 때문에 안전하지가 않았어.
이 예제에서는 새로운 전역 변수 `RegExp`를 선언하하고 기존의 것을 덮어쓰고 있어.
마찬가지로, 전역 변수로써 `ncz`가 선언되었고 즉시 `window` 프로퍼티로써 정의됐어.
이러한 방식은 JS가 항상 해왔던 방식이야.

If you instead use `let` or `const` in the global scope, a new binding is created in the global scope but no property is added to the global object. 
That also means you cannot overwrite a global variable using `let` or `const`, you can only shadow it. Here's an example:

만약 네가 전역 스코프에서 `let`이나 `const`를 사용했다면, 전역 객체에 프로퍼티로 추가하지는 않고 전역 스코프 안에서 새로운 바인딩을 만드는 거야.
또한 그 의미는 `let`이나 `const`를 사용하면 전역 객체에 덮어쓰기를 할 수 없다는 뜻이야. 아래 예제를 보자.

```js
// in a browser
let RegExp = "Hello!";
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false

const ncz = "Hi!";
console.log(ncz);                       // "Hi!"
console.log("ncz" in window);           // false
```

Here, a new `let` declaration for `RegExp` creates a binding that shadows the global `RegExp`. 
That means `window.RegExp` and `RegExp` are not the same, so there is no disruption to the global scope. 
Also, the `const` declaration for `ncz` creates a binding but does not create a property on the global object. 
This capability makes `let` and `const` a lot safer to use in the global scope when you don't want to create properties on the global object.

여기, 새로운 `let` 선언으로 전역 스코프에 있는 `RegExp`를 가리는 `RegExp`를 만들었어.
이 의미는 `window.RegExp`와 `RegExp`는 다르고, 전역 스코프엔 영향을 주지 않는다는 뜻이야.
또한, `const` 선언으로 `ncz`를 생성하지만 전역 객체의 프로퍼티로는 생성되지 않아.
이런 기능은 전역 객체의 프로퍼티를 생성하지 않으려할 때, `let`과 `const`를 전역 스코프 안에서 더 안전하게 사용할 수 있게 해주고 있어.

I> You may still want to use `var` in the global scope if you have a code that should be available from the global object. 
This is most common in a browser when you want to access code across frames or windows.

* 중요 : 전역 객체에서 사용해야만 하는 코드가 아직 남아있다면 그저 전역 스코프에서 `var`를 사용하기만 하면 돼.
보통 브라우저에서는 내부 프레임이나 창에서(ex) 팝업 등) 부모창에 접근하려는 경우가 일반적이지.

* 역자 주 : 전체적으로 내용이 좀 길지만, 결국 이러한 특성을 이해하기 위해서는 이전 버전에서부터(ES3) 언급됐던 `scope`에 대해서
다시 돌아볼 필요가 있습니다. 막상 공부해보면 어렵지 않은데 처음이 제일 답답하긴 합니다.


## Emerging Best Practices for Block Bindings

While ECMAScript 6 was in development, there was widespread belief you should use `let` by default instead of `var` for variable declarations. 
For many JavaScript developers, `let` behaves exactly the way they thought `var` should have behaved, and so the direct replacement makes logical sense. 
In this case, you would use `const` for variables that needed modification protection.

However, as more developers migrated to ECMAScript 6, an alternate approach gained popularity: use `const` by default and only use `let` when you know a variable's value needs to change. 
The rationale is that most variables should not change their value after initialization because unexpected value changes are a source of bugs. 
This idea has a significant amount of traction and is worth exploring in your code as you adopt ECMAScript 6.

## Summary

The `let` and `const` block bindings introduce lexical scoping to JavaScript. These declarations are not hoisted and only exist within the block in which they are declared. 
This offers behavior that is more like other languages and less likely to cause unintentional errors, as variables can now be declared exactly where they are needed. 
As a side effect, you cannot access variables before they are declared, even with safe operators such as `typeof`. 
Attempting to access a block binding before its declaration results in an error due to the binding's presence in the temporal dead zone (TDZ).

In many cases, `let` and `const` behave in a manner similar to `var`; however, this is not true for loops. 
For both `let` and `const`, `for-in` and `for-of` loops create a new binding with each iteration through the loop. 
That means functions created inside the loop body can access the loop bindings values as they are during the current iteration, 
rather than as they were after the loop's final iteration (the behavior with `var`). 
The same is true for `let` declarations in `for` loops, while attempting to use `const` declarations in a `for` loop may result in an error.

The current best practice for block bindings is to use `const` by default and only use `let` when you know a variable's value needs to change. 
This ensures a basic level of immutability in code that can help prevent certain types of errors.


`## Emerging Best Practices for Block Bindings`
`## Summary`
이 두 가지는 번역하지 않습니다.
앞의 내용들을 보시면 충분한 이해가 될 내용이라서요.
고생하셨습니다.

2장에서 뵙겠습니다.











