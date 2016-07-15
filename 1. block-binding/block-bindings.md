# 주의!!!(warrnig)

원문이 변경됨에 따라...
현재 이 파일은 원문과 다를 수 있습니다.
앞에서부터 차례대로 번역을 다시 진행하고 있으니
참고 부탁드립니다.


# Block Bindings

Traditionally, the way variable declarations work has been one tricky part of programming in JavaScript.
In most C-based languages, variables (or bindings) are created at the spot where the declaration occurs.
In JavaScript, however, this is not the case. Where your variables are actually created depends on how you declare them,
and ECMAScript 6 offers options to make controlling scope easier.
This chapter demonstrates why classic var declarations can be confusing,
introduces block-level bindings in ECMAScript 6, and then offers some best practices for using them.

예전부터, 자바스크립트(이하 JS) 프로그래밍의 부분으로 변수 선언방법들 중에서 한 가지 까다로운 것이 있어.
C를 기반으로 만들어진 대부분의 언어들에서, 변수들(또는 바인딩들)은 선언이 일어났던 그 위치에서 생성됐어.
하지만 JS에서는 그렇지 않아. 변수들이 실제로 생성되는 건 선언된 방법에 의존하기에
ECMAScript 6(이하 ES6)는 스코프를 컨트롤하기 쉽게 옵션을 제공하고 있어.
이 주제에서는
1. 'var' 선언법들이 왜 혼란스러울 수 있는지
2. ES6의 block-level 바인딩
위의 내용들 그리고 이들을 사용할 때 필요할 중요한 예시를 다룰거야.


## Var Declarations and Hoisting

Variable declarations using `var` are treated as if they are at the top of the function
(or global scope, if declared outside of a function) regardless of where the actual declaration occurs; this is called *hoisting*.
For a demonstration of what hoisting does, consider the following function definition:

'var'를 사용하는 변수 선언법들은 실제 선언문이 존재했던 위치에 상관없이 함수의 최상단(함수 밖이라면 global scope)으로 취급해.
우리는 이것을 *호이스팅(hoisting)*이라 부르지.
무엇이 호이스팅인지 증명하기 위해, 아래의 함수 선언을 생각해보자.

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
then you might expect the variable value to only be created if condition evaluates to true.
In fact, the variable value is created regardless.
Behind the scenes, the JavaScript engine changes the getValue function to look like this:

네가 JS에 익숙하지 않다면, 이 코드에서 'condition'이 true로 평가될 때만 변수 'value'가 생성될 것으로 예상할 수도 있을 거야.
사실 변수 'value'는 위 조건에 상관없이 생성돼.
보이지 않는 곳에서, JS 엔진은 위의 'getValue' 함수를 아래의 예제처럼 변경해.

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

The declaration of value is hoisted to the top, while the initialization remains in the same spot.
That means the variable value is actually still accessible from within the else clause.
If accessed from there, the variable would just have a value of undefined because it hasn't been initialized.

'value'의 선언이 초기화를 위해 같은 곳에 위치할 수 있도록 위로 끌어올려졌어(hoisted).
그 의미는 변수 'value'를 'else' 절 내부에서 실제로 계속 접근할 수 있도록 하기 위해서야.
'else' 절 내부에서 접근한다면, 그 변수는 이미 초기화가 됐기 때문에, 'undefined' 값을 얻을 수 있어.

* 역자 주 : 끌어올림을 더 쉽게 이해하는 방법으로 여러 개의 변수가 함수 내부 어딘가에 각각 따로 선언되어 있다고 생각해보세요.
변수가 100개쯤 있으면 이해하기 어렵습니다. 만류귀종이라고.. 컴퓨터도 똑같다고 생각하면 편합니다.

It often takes new JavaScript developers some time to get used to declaration hoisting,
and misunderstanding this unique behavior can end up causing bugs.
For this reason, ECMAScript 6 introduces block level scoping options to make the controlling a variable's lifecycle a little more powerful.

이것은 종종 새로운 JS 개발자들이 호이스팅 선언을 사용하는데 약간의 시간이 필요하고,
이 독특한 동작을 오해하여 버그가 생길 수 있지.
이런 이유로, ES6에서 소개하는 block level scope의 옵션들을 사용하면 변수들의 생명주기(lifecycle)를 쉽고 강력하게 컨트롤할 수 있어.


## Block-Level Declarations








































