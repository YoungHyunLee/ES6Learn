# Functions


어떤 프로그래밍 언어에서도 함수는 매우 중요한 부분이야.
ES 6 이전에, JS 함수들은 JS가 만들어진 이후로 큰 변화를 가지지 않았어.
이제까지 JS는 여러 문제들을 처리하지 못하고 쌓아두며,
미묘한 행동으로 인해 쉽게 실수들을 만들어 내기도 하고,
매우 기본적인 행동들을 해내기 위해 종종 더 많은 코드를 요구할 때도 있었지. 

ES 6의 함수들은 큰 도약을 하기 위해, JS 개발자들의 불만사항들에 대한 이유와 요구사항들에 대해 몇 년간 얘기해왔어. 
이 덕분에 ES 5의 함수들보다 애러가 덜 발생하고, 이전보다 더 효율적으로 사용하기 위해 많은 부분이 개선됐지.
  

## Functions with Default Parameters


JS 에서 함수를 선언할 때, 매개변수를 얼마든지 넘길 수 있도록 허용되는 건 특별한 점이야.
매개변수를 제공하지 않았을 때 기본값으로 체울 수 있도록 하는 경우처럼,
우리는 매개변수의 개수가 서로 다른 경우에 이것을 다룰 수 있는 함수를 선언할 수 있지.

### Simulating Default Parameters in ECMAScript 5


ES 5 이전의 JS에서, 우리는 함수를 생성할 때 아래 예제와 같은 형태로 선언했어. 

```js
function makeRequest(url, timeout, callback) {

    timeout = timeout || 2000;
    callback = callback || function() {};

    // the rest of the function

};

// 예시로 만든 함수 실행.
makeRequest('https://github.com/nzakas')
```

이 예제에서, 함수 선언문에서 두 개의 매개변수(timeout, callback)에 기본값을 지정하고 있기 때문에,
이 함수를 실행할 때 이 두 인자를 넘기는 것은 선택적이야. 즉, 넘겨도 되고 안 넘겨도 되는 거지.
논리연산자 OR은 (`||`) 좌피연산자(좌변값)가 `false`일 경우 항상 우피연산자(우변값)의 실행한 값을 반환해.
이 함수가 실행될 때 `url`을 제외한 남은 2개의 매개변수를 넘기지 않았기 때문에, 이 둘은 `undefined`으로 지정되고,
흔히 논리연산자 OR은 이와같이 매개변수를 넘기지 않았을 때, 기본값을 지정하기 위해 사용해.

하지만 위의 예제는 `timeout`값으로 `0`을 넘겼을 때, `0`은 `false`로 취급하기 때문에 timeout에는 `0`이 아닌 `2000`이 할당되는 문제점이 있어.
이런 경우를 위해, 아래의 예제처럼 안전한 대안으로, `typeof`를 사용해서 인자의 타입을 체크하는 방법을 사용해볼 수 있어. 

```js
function makeRequest(url, timeout, callback) {

    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};

    // the rest of the function

}
```

이러한 방법은 안전하지만, 이런 방법은 매우 기본적인 연산자를 위해 많은 추가적인 코드를 요구해.
이런 일반적인 패턴을 표현하기 위해, 인기있는 JS 라이브러리들은 유사한 패턴들로 채우도록 설계되어 있어.


### Default Parameters in ECMAScript 6


ES 6는 함수의 매개변수가 넘겨지지 않았을 때, 매개변수의 초기값을 지정하는 방법으로 쉽게 기본값을 제공할 수 있어.

```js
function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}
```

이 함수는 1번째 매개변수를 항상 넘길 것으로 예상하고 작성된 함수야.
다른 2개의 매개변수는 기본값들을 가지며, 
이렇게 작성된 함수의 내부에는 추가적인 어떤 코드도 필요하지 않아.

`makeRequest()` 메소드를 3개의 인자와 함게 호출될 때, 이전에 정의했던 기본값을 사용되지 않아.

```js
// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});
```

ES 6는 `url`이 필수로 있어야한다고 간주하니, 그 때문에 `makeRequest()`의 3번의 실행문 모두 `"/foo"`를 넘겨. 
남은 두 개의 매개변수들은 기본값이 선택적으로 고려돼.
즉, 넘기면 넘긴값 없으면 기본값을 사용한다는 뜻이야.

함수 선언문에서 어떤 인자들이라도 기본값을 명시하는 것은 가능해.
그것이 2번째거나, 1번째이거나 상관없이...!!

```js
function makeRequest(url, timeout = 2000, callback) {

    // the rest of the function

}
```

이 경우에, `timeout`의 기본값은 2번째 인자가 넘겨지지 않거나, undefined 타입인 `undefined`로 넘겨지는 경우에만
`2000`으로 지정돼.

```js
// uses default timeout
makeRequest("/foo", undefined, function(body) {
    doSomething(body);
});

// uses default timeout
makeRequest("/foo");

// doesn't use default timeout
makeRequest("/foo", null, function(body) {
    doSomething(body);
});
```

기본 매개변수 값의 경우, 3번째로 호출하는 `makeRequest()`의 2번째 인자인 `null`은 유효한 값으로 간주되기 때문에,
`timeout`의 기본값은 사용되지 않아.


### How Default Parameters Affect the arguments Object


기본 매개변수들이 존재할 때, `arguments` 객체의 행동은 달라.
ES 5 비strict 모드의 경우, `arguments` 객체는 각 인자들이 변경되면 그 값으로 반영돼.

```js
function mixArgs(first, second) {
    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true
    first = "c";
    second = "d";
    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true
}

mixArgs("a", "b");
```

비strict 모드에서 항상 `arguments` 객체는 값이 변경되면 반영해.
따라서, `first`와 `second`는 새로운 값으로 할당되고,
`arguments[0]` 와 `arguments[1]`은 그에 맞춰 업데이트 되고, 모든 `===` 비교 연산자는 `true`를 반환하지.

그렇지만 ES 5의 strict 모드는 `arguments` 객체의 이런 혼란스러운 측면을 제거했어.
strict 모드에서, `arguments` 객체는 인자의 변경을 반영하지 않아.
아래의 예제를 봐봐.

```js
function mixArgs(first, second) {
    "use strict";

    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]); // false
    first = "c";
    second = "d";
    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]); // false
}

mixArgs("a", "b");
```

이렇게 `first`와 `second`의 값을 변경해도 `arguments` 객체에 영향을 주지는 못 해.
그래서 보통 우리가 예상하는 그 값을 출력해.

함수 안의 `arguments` 객체는 ES 6의 기본 매개변수를 사용하지만,
함수의 실행이 strict 모드거나 아니거나 개의치 않고, 항상 ES 5 strict 모드와 같은 방식으로 동작해.
기본 매개변수들의 존재는 `arguments` 객체가 선언한 매개변수로부터 분리된 상태를 유지하기위해 trigger 돼.
이것은 미묘하지만, 세부적으로 `arguments` 객체가 사용되는 방법이기 때문에 중요해.

* 역자 주 : 아래의 예제를 현재(2015.12.23)는 firefox에서만 실행이 됩니다.
또한 그 결과도 파폭은 좀 다르네요...`true, false, true, false`를 출력합니다.
일단은 자카스횽이 말하는 결과로 가정하면서 번역하겠습니다.
(물론 Babel 같은 것을 사용하시면 사용하실 수 있습니다)

```js
// not in strict mode
function mixArgs(first, second = "b") {
    console.log(arguments.length); // 1
    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // false
    first = "c";
    second = "d";
    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]); // false
}

mixArgs("a");
```

이 예제에서, 함수를 실행할 때 인자는 `"a"` 하나만 넘겼기 때문에 `arguments.length` 메소드는 1을 반환해.
또한 `arguments[1]`은 `undefined`를 의미하고, 이건 우리가 기대했던 값이야.
그러니 `first`는 `arguments[0]`과 같지.
우리가 `first`와 `second`를 바꿔도 `arguments` 객체에는 영향을 주지 않아.
이런 동작은 strict 모드에 상관없이 발생하고,
따라서 우리는 이런 함수의 초기 실행 상태를 항상 반영하려면 `arguments` 객채를 의존할 수 있어.


### Default Parameter Expressions


아마도 가장 흥미있는 기본 매개변수의 값들의 특징으로는
기본값이 항상 초기값일 필요는 없다는 거야.
우리는 기본 매개변수를 검색하는 함수를 아래의 예제처럼 실행해볼 수 있어.

```js
function getValue() {
    return 5;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
```

만약 마지막 인자가 제공되지 않았을 때, `getValue()`가 적절한 기본값을 찾기위해 호출.
기억해야할 것은 `getValue()`는 함수가 선언되고 파싱될 때도 실행하지 않고,
오직 2번째 인자가 없는 `add()` 함수가 호출돼야 실행돼.
그 의미는 만약 `getValue()`가 다르게 정의되면, `add()`는 다른 값을 반환할 가능성이 있다는 거지!
아래 예제처럼~

```js
let value = 5;

function getValue() {
    return value++;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
console.log(add(1));        // 7
```

이 예제에서 `value`의 기본값은 5이고 `getValue()`가 호출될 때마다 1씩 늘어나.
첫 번째로 호출된 `add(1)`의 반환값은 6이고,
두 번째로 호출된 `add(1)`의 반환값은 7인데 이는 `value`가 증가됐기 때문이야.
이렇게 `second`의 기본값은 오직 함수가 호출될 때만 평가되기 때문에,
언제라도 그 값은 변경될 수 있어.

또 하나의 흥미로운 것이 있는데,
이전에 사용한 매개변수를 이후의 매개변수의 기본값으로도 사용할 수 있어.

```js
function add(first, second = first) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 2
```

이 코드에서, `second` 매개변수에게 `first`의 값을 기본값으로 줬어.
즉, 딱 한 개의 인자를 넘기면 두 인자들은 같은 값으로 된다는 거야.
그래서 `add(1)`과 `add(1, 1)`은 2를 반환해.
아래의 예제처럼 한 단계 더 나아가면...

```js
function getValue(value) {
    return value + 5;
}

function add(first, second = getValue(first)) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 7
```

이 예제에서 `getValue(first)`의 반환된 값과 동일하게 `second`도 동일하게 설정돼.
그래서 `add(1, 1)`는 여전히 2를 반환하고, `add(1)`은 7(1+6)을 반환해.

매개변수들의 참조하는 능력은 이전 인자들이 기본 매개변수로 배지돼야 작동될 수 있어.
그래서 앞의 인자들은 그 이후의 인자들에게 접근할 수 없지.

```js
function add(first = second, second) {
    return first + second;
}
// 원문에서는 두 번째 add 함수의 실행에는 인자가 1 하나밖에 없어서 undefined를 추가했습니다.
console.log(add(1, 1));     // 2
console.log(add(undefined, 1));        // throws error
```

`add(1)`이 호출되면 error를 던지는데, 그 이유는 `second`는 `first` 이후에 정의됐으니
기본값으로는 사용할 수 없기 때문이야.
왜 이런 일이 일어나는지 이해하려면 이전에 배운 TDZ를 다시 생각해야 해.


### Default Parameter Temporal Dead Zone


1장에서 소개한 TDZ(temporal dead zone)는 `let`과 `const`와 관계가 있고,
기본 매개변수또한 TDZ를 가지고 있기 때문에 매개변수에는 접근이 불가능해.
`let` 선언과 유사점은, 각각의 매개변수가 생성될 때마다 새로운 식별자가 바인딩되기 때문에
초기화 전에는 참조할 수 없어.
함수가 호출됐을 떄 매개변수의 초기화가 일어나면, 매개변수는 값으로 넘겨지거나 기본 매개변수의 값으로 사용될 수 있어.

기본 매개변수 TDZ는 이전 주제인 "Default Parameter Expressions"의 예제로 간주할 수 있으니...
우리 한 번 탐구해보자!(오글오글... 보글보글...?!)

```js
function getValue(value) {
    return value + 5;
}

function add(first, second = getValue(first)) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 7
```

`add(1, 1)`와 `add(1)` 호출은 사실상 아래의 코드처럼 실행해.

```js
// JavaScript representation of call to add(1, 1)
let first = 1;
let second = 1;

// JavaScript representation of call to add(1)
let first = 1;
let second = getValue(first);
```

`add()` 함수가 처음 호출될 때, 바인딩된 `first`와 `second`는 명시된 매개변수 TDZ
(이때 TDZ는 `let`과 유사하게 동작해)에 추가돼.
그래서 `first`는 항상 `second` 앞에서 초기화가 됐기 때문에, `second`는 `first`의 값으로도 초기화될 수 있어.
반대로는 불가능하고...
자, 그러면 `add()` 함수를 아래처럼 재정의를 해보면...

```js
function add(first = second, second) {
    return first + second;
}

console.log(add(1, 1));         // 2
console.log(add(undefined, 1)); // throws error
```

`add(1, 1)`와 `add(undefined, 1)`의 호출은 아래의 코드처럼 매핑될 수 있어.

```js
// JavaScript representation of call to add(1, 1)
let first = 1;
let second = 1;

// JavaScript representation of call to add(undefined, 1)
let first = second;
let second = 1;
```

이 예제에서, `add(undefined, 1)` 호출은 `first`를 초기화할 때 `second`가 아직 초기화되지 않았기 때문에
error를 던지게 돼.
`first`를 초기화할 때, `second`는 TDZ 안에 있으니, 그러므로 `second`를 참조할 수 없지.
참조하려고 한다면 error를 던지게 되겠지?
1장에서 했던 `let` 바인딩의 행동과 매우 흡사해.

* 메모 : 함수의 매개변수들은 함수 내부의 scope와 분리된 자신만의 scope와 TDZ를 각각 갖는다.

* 역자 주 : 지금까지 잘 정리되셨나요? 하핳 어려운 점 있으면 메일로 언제든지 연락..!! 주세요~~~


## Working with Unnamed Parameters


지금까지의 예제들은 매개변수들이 함수 선언 안에서 이름을 가진 경우들만 해당됐어.
그러나 JS의 함수들은 매개변수의 한계가 없기 때문에, 함수를 실행할 때, 
선언할 당시의 매개변수 개수보다 더 많아도 됐었지.
우리가 항상 함수를 실행할 때, 함수를 선언할 당시 명시된 매개변수보다 더 많거나 적게 넘겨도 됐었어.
즉, 실행할 때 넘기는 인자의 개수는 상관이 없었다는 거지.
기본 매개변수는 함수가 더 적은 매개변수들을 받아들일 수 있으면 있을수록 더 명확해지고, 
ES 6뿐만 아니라, 함수에 정의된 매개변수보다 더 많은 매개변수들을 넘기게 하는 문제들을 찾았지.


### Unnamed Parameters in ECMAScript 5


초기에는 JS의 `arguments` 객체에 각각의 매개변수마다 꼭 정의하지 않아도 
모든 함수의 매개변수들을 검사할 수 있는 방법이 제공됐었어.
대부분의 경우 `arguments` 객체를 검사하는 건 잘 동작하지만,
이 객체와 함께 사용하는 경우에, 조금 번거로울 수 있지.
예를 들면, 아래의 예제에서 `arguments` 객체를 검사하는 경우를 말해.

```js
function pick(object) {
    let result = Object.create(null);

    // start at the second parameter
    for (let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = object[arguments[i]];
    }

    return result;
}

let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};

let bookData = pick(book, "author", "year");

console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2015
```

`pick()`이라는 함수는 *Underscore.js* 라이브러리에서 
원래 객체 그리고 원래 객체의 프로퍼티들의 부분집합이 명시된 것을 그대로 복사한 객체를 반환하는 
메소드를 흉내냈어.
이 함수에서는 하나의 인자만 선언하고 그 첫 번째 인자는 복사할 프로퍼티를 담은 객체일 것이라 생각하며 작성됐어. 
그리고 넘겨질 다른 인자들은 `result`에 복사될 속성의 이름들이야.

`pick()` 함수에 대해 우리가 주목할 점이 몇 가지 있어.
첫째, 이 함수는 두 개 이상의 매개변수들이 있으면 이 함수가 제대로 다룰 수 있는지 확실해보이진 않았어.
우리는 몇몇의 더 많은 매개변수들을 선언할 수 있지만,  
항상 이 함수가 얼마든지 매개변수를 가질 수 있음을 나타내기에는 부족해보일 거야.
(위 예제에서 복사할 객체를 2개 이상 쓰고 싶으면 `for` 문을 수정해야겠지...!!)
둘째, 첫 번째 매개변수는 이미 이름이 있으면서 직접적으로 사용되기 때문에, 
우리가 복사하고 싶은 속성들을 보려고할 때,
우린 `arguments` 객체 안에서 항상 인덱스 0번 대신에 인덱스 1번으로 시작해야만 해.
`arguments` 객체에서 적절한 인덱스들을 사용하기 위해 기억해야할 것이 절대 어려운 것은 아니지만, 
인덱스 0번 또는 다른 것을 위해 고려해야할 코드 한 줄이 더 추가되는 거지.

ES 6는 이러한 이슈를 돕기 위해 나머지 매개변수(`rest parameters`)라는 것을 소개하고 있어.


### Rest Parameters


*나머지 매개변수*(이하 RP)는 지정된 매개변수 앞에 점 3개를(`...`) 붙임으로써 사용할 수 있어.
함수에 넘겨진 그 매개변수(아래의 예제에서 `keys`)는 배열이고, 남는 매개변수들을 그 안에 다 포함시켜.
`rest parameters`는 나머지의 `rest`에서 비롯됐지.

```js
function pick(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}
```

이 예제에서, `keys`는 RP이고, `object` 인자 뒤에 넘겨지는 모든 매개변수들을 포함해.
(물론 `arguments` 객체는 `object`까지 포함한 인자 전체를 말해)
그 의미는 우리가 `keys` 배열을 처음부터 끝까지 걱정없이 반복할 수 있다는 뜻이야.
즉, 우리는 이 함수가 "매개변수들이 얼머든지 오더라도 다룰 수 있어"라고 알려줄 수 있다는 거지!! 
그것도 자신있게! 당당하게~!

* 중요 : 나머지 매개변수는 함수의 `length` 프로퍼티에 영향을 주지 않습니다.
따라서 `pick()`의 `length` 프로퍼티의 값은 위의 예제에서는 1이고,
오직 `object`만 셌을 뿐이지요.


### Rest Parameter Restrictions


RP는 2가지의 제한사항이 있어.
첫 번째 제한사항은 RP는 오직 1개만 사용할 수 있고, RP는 반드시 마지막에 있어야 해.

```js
// Syntax error: Can't have a named parameter after rest parameters
function pick(object, ...keys, last) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}
```

위 예제에서 `last`는 RP인 `keys` 뒤에 있네요... 자연스럽게 syntax error를 출력합니다.

두 번째 제한사항은 객체 리터럴의 setter에서는 RP를 사용할 수 없어.

```js
// 아래에 사용된 이 함수는 set(){~~~} ES 6의 문법입니다. 04.object 문서에 나온 내용입니다.
// ES 5 이전의 문법이라면 set : function(){~~~} 같은 거랍니다~!
let object = {

    // Syntax error: Can't use rest param in setter
    set(...value) {
        // do something
    }
};
```

RP는 정의될 때 무한대의 인자를 가질 수 있음을 뜻하고,
객체 리터럴의 setter에는 하나의 인자만 사용할 수 있도록 제한됐기 때문에...
위 예제의 컨텍스트에서는 허용되지 않습니다.


### How Rest Parameters Affect the arguments Object


ES(ECMAScript... 혹시나 해서...)에서 RP는 `arguments`를 대체하도록 설계됐어.
원래 ES 4에서는 RP를 `arguments`와는 분리시켰고,
함수에게 무제한으로 인자를 넘길 수 있도록 RP를 허용했었지.
하지만 ES 4는 세상에 나오지 못 했지만, 이 개념은 유지되어 ES 6에서 다시 소개하게 된거야.
`arguments` 객체가 ES 6에서 제거되지 않았음에도 불가하고 말이지!

함수가 호출됐을 때, 그 함수에게 넘겨진 인자들이 RP에게 전부 반영된다면(즉, 선언당시 인자는 RP 1개일 때),
`arguments` 객체는 RP와 동일하게 동작해.

```js
function checkArgs(...args) {
    console.log(args.length); // 2
    console.log(arguments.length); // 2
    console.log(args[0], arguments[0]); // a a
    console.log(args[1], arguments[1]); // b b
}

checkArgs("a", "b");
```

`arguments` 객체는 함수안에서 RP 사용여부와 상관없이 항상 정확하게 넘겨진 인자를 반영해.

다음 장부터는 spread operator(전개 연산자)와 함께 매개변수에 대해 얘기해보고,
이것은 RP와 밀접한 관계가 있기 때문에 시작하기 전에 RP에 대해서 제대로 이해하고 넘어갔으면 해! 


## Increased Capabilities of the Function Constructor


`Function` 생성자는 우리가 JS에서 동적으로 새로운 함수를 생성하도록 허용할 경우에나 드물게 사용돼.
생성자의 인자는 모두 문자열로 넘기고, 함수 그리고 함수 내부의 매개변수로 사용할 수 있지.

```js
var add = new Function("first", "second", "return first + second");

console.log(add(1, 1));     // 2
```

ES 6에서 함수 생성자의 인자로 사용될 경우, 기본 매개변수와 RP를 사용할 수 있어.
아래의 예제를 보면, 우리는 더하는 용도로 사용할 경우에는 
등호(equals sign)와 매개변수의 이름들말고는 특별히 필요한 것이 없지.

```js 
var add = new Function("first", "second = first",
        "return first + second");

console.log(add(1, 1));     // 2
console.log(add(1));        // 2
```

인자가 1개만 넘겨질 때, `second`는 `first`의 값이 할당돼.
이 문법으로는 `Function`을 사용하지 않는 함수 선언과 동일해.
(그냥 function(first, second = first){ return first + second; };와 문법이 같다는 뜻!)

RP를 사용한다면, 마지막 매개변수 이전에 `...`을 추가해서 사용할 수 있지.

```js
var pickFirst = new Function("...args", "return args[0]");

console.log(pickFirst(1, 2));   // 1
```

이 코드에서 함수를 생성할 때 하나의 RP만 사용했고 넘겨진 1번째 인자만 반환하고 있어. 

`Function`의 기본 그리고 나머지 매개변수의 추가는 함수 선언문의 선언적 형태와 동일한 능력을 보장해.

* 역자 주 : 즉, 앞의 예제처럼 `Function`안에서 매개변수들을 사용하면,
function(){~~~}와 동일한 효과를 가진다는 뜻입니다. 그냥 같다는 거죠! 형태만 다를뿐...


## The Spread Operator 


RP와 전개 연산자(spread operator)는 밀접한 관계가 있어.
RP가 독립된 여러 개의 인자들을 하나의 배열 안에 합치는 용도로 사용된다면,
전개 연산자는 배열안에 있는 인자들을 분리하고 분리된 인자들을 함수에게 넘겨.
`Math.max()`는 인자를 얼마든지 받을 수 있고 그 인자들 중에 가장 큰 값 하나를 반환하는... 
이 메소드를 가지고 생각해보자. 

```js
let value1 = 25,
    value2 = 50;

console.log(Math.max(value1, value2));      // 50
```

이 예제에서 우리가 두 개의 값만 사용한다고 생각해보면, `Math.max()`는 사용하기 매우 쉬워.
 두 개의 값이 넘겨지면, 가장 큰 값을 반환하겠지.
 하지만 우리가 어떤 연속적인 값을 가진 배열을 가지고, 그 안에서 가장 큰 값을 찾기를 원할 때,
 `Math.max()` 메소드는 배열을 넘기는 것을 허용하지 않기 때문에, ES 5 이전까지는
 그 배열 안의 값에서 제일 큰 값을 직접 찾거나, `apply()` 메소드를 사용해야만 했지.
 
```js
// apply()를 사용할 경우의 예제.
let values = [25, 50, 75, 100];

console.log(Math.max.apply(Math, values));  // 100
```

이러한 문제 해결법 작동하지만, `apply()` 메소드를 사용하는 이러한 방식은 조금의 혼란을 줄 수 있어.
이것은 실제로 코드에 추가적인 문법과 함께, 실제 의미를 혼란스럽게 만들고 있어.
 
ES 6의 전개 연산자는 위 경우를 간단하게 만들 수 있어.
`apply()`를 호출하는 것 대신에, 우리는 `Math.max()`에게 배열앞에 접두사로
 `...`을 붙여서 넘길 수 있어.(앞에서 사용했던 RP와 유사한 패턴)
 JS 엔진이 이 코드를 해석할 때, 그 배열을 개별 인자들로 분리하고 그 인자들을 넘겨.
 
```js
let values = [25, 50, 75, 100]

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```

`Math.max()`가 호출된 부분을 보면 조금 더 평범해 보이고 
간단한 수학적인 연산에 `this`-바인딩 지정의 복잡합을 피할 수 있지
(이전 예제에서 사용한 `Math.max.apply()`의 첫 번째 인자).

* 역자 주 : apply나 call을 사용하실 때 사용하려는 컨텍스트를 지정할 수 있는데,
이전 예제에서는 그 컨텍스트로 `Math`를 사용하니, 간단한 연산도 복잡하게 보이게 되니까 문제라는 겁니다!
물론... 이런 방법을 많이 사용해서 코드 해석에 익숙한 분들은 이 예제들이 크게
차이가 난다고 느끼시지는 않겠지만 말입니다. 하하핳 부럽돠...

우리는 전개 연산자를 사용하면서 다른 인자들과 함께 결합할 수도 있어.
아래 예제처럼 우리가 원하는 숫자가 0을 반환하기를 원한다고 가정해보면,
 인자들을 직접 분리해서 넘길 수도 있고, 
여전히 다른 인자들을 위해 전개 연산자를 사용할 수도 있어.

```js
let values = [-25, -50, -75, -100]

console.log(Math.max(...values, 0));        // 0
```

이 예제에서, `Math.max()`의 마지막 인자로 `0`을 넘겼는데, 
전개 연산자는 그 뒤에 다른 인자들을 넘길 수가 있어(RP와는 다르게!).

전개 연산자는 배열의 인자들을 함수의 인자들로 넘기는 것은 쉬워.
 우리는 대부분의 상황들에서 `apply()` 메소드보다 적합할 것 같은 대체방법을 찾을 거야
(앞서 했던 이유와 동일해. 복잡하고 혼란을 줄 수 있으니까).

지금까지 기본 그리고 나머지 매개변수(RP)의 사용법에 더해서, 
ES 6에서 우리는 JS의 `Function` 생성자에게 이 두 가지 타입도 사용할 수 있게 됐지.

* 역자 주 : 마지막 문장은 이미 위에서 `Function` 생성자에서 두 가지를 다 사용할 수 있다고 
설명했었는데... 자카스횽이 여기서 또 얘기하는 것을 보면, 강조하고 싶어서 그런 것 같습니다.
잊지 말아요. `Function` 생성자에서도 둘 다 사용할 수 있다는 것을!


## ECMAScript 6's name Property


JS 내에서 함수를 정의하는 방법은 매우 다양하게 있어.
익명 함수 표현법은 이미 널리 퍼졌기 때문에, 
이러한 함수 표현법은 디버깅을 할 때 조금 더 어려움을 만들고 있지.
게다가 어떤 함수 하나를 읽기위해 쌓이는 스텍을 추적해서 결과를 내는 과정까지,
읽기 그리고 판독하기가 어려울 때가 종종 있어.
그래서 지금도 도전 의식을 가지고, 어떤 함수인지 쉽게 식별하는 방법을 만들고 있지. 
이런 이유들로, ES 6는 `name` 프로퍼티를 모든 함수들에게 추가했지.


### Choosing Appropriate Names


ES 6 프로그램 안에 있는 모든 함수들은 전부 `name` 프로퍼티에 적절한 값을 가지고 있어.
아래의 예제를 보면, 함수와 함수 표현식이 보이고, 그 둘의 `name` 프로퍼티를 출력했지.

```js
function doSomething() {
    // ...
}

var doAnotherThing = function() {
    // ...
};

console.log(doSomething.name);          // "doSomething"
console.log(doAnotherThing.name);       // "doAnotherThing"
```

이 코드에서, `doSomething()`은 함수 선언문이기 때문에 `name` 프로퍼티의 값으로 `doSomething`을 가지고 있어.
 익명 함수 표현식 `doAnotherThing()`은 변수에 할당된 함수이기 때문에,
 `name` 값으로 변수명인 `doAnotherThing`을 가지고 있지.


### Special Cases of the name Property


함수 선언문 그리고 함수 표현식의 이름을 찾는 건 쉽게 찾을 수 있었어.
ES 6에서는 더 멀리까지 미칠 수 있도록 모든 함수들은 적절한 이름을 가질 수 있도록 했지.

```js
var doSomething = function doSomethingElse() {
    // ...
};

var person = {
    get firstName() {
        return "Nicholas"
    },
    sayName: function() {
        console.log(this.name);
    }
}

console.log(doSomething.name);      // "doSomethingElse"
console.log(person.sayName.name);   // "sayName"
console.log(person.firstName.name); // "get firstName"
```

이 예제에서 `doSomething.name`은 함수 표현 자체에서 이미 이름을 가지고 있고,
 함수의 이름이 이 함수가 할당된 변수명보다 우선시되기 때문에 `doSomethingElse`을 가지게 되는 거야.
 `person.sayName()`의 `name` 프로퍼티의 값은 `sayName`이고, 
 이는 객체 리터럴식으로 부터 해석된 값이야.
 비슷하게 `person.firstName`은 getter function 이니까 조금 다르게 나타나기는 하지만 `get firstName`을 가지고,
 setter function도 마찬가지로 동일하지만 앞에 `set`이 온다는 것만 달라.  

아래에는 함수의 이름에 대해서 두 가지 특별한 경우가 있어.
`bind()` 메소드를 사용하면 함수가 생성되고 그 함수의 이름은 앞에 `bound`가 붙어.
`Function` 생성자를 사용하면 함수가 생성되고 그 함수의 이름은 `anonymous`가 돼.

```js
var doSomething = function() {
    // ...
};

console.log(doSomething.bind().name);   // "bound doSomething"
console.log((new Function()).name);     // "anonymous"
```

`bind()`로 생성된 함수의 이름은 항상 앞에 `"bound "`가 함수의 `name`값 앞에 붙게 되고,
 그래서 `bound soSomething`을 출력해.
 
지금까지 했던 것처럼, 어떤 함수의 `name` 값으로 반드시 동일한 이름의 변수을 참조로 하지는 않아.
 `name` 프로퍼티는 디버깅에 도움을 주기 위해 유용하게 사용될 수는 있지만,
 단지 `name`의 값으로 함수의 참조를 얻는 방법은 없다는 것을 기억해야 해.
 

## Clarifying the Dual Purpose of Functions


ES 5 이전에는, 함수들은 `new`를 사용하거나 사용하지 않아도 호출할 수 있도록 두 가지 목적을 가지고 있었지.
 `new`와 함께 사용했을 때, 함수 안에서 사용된 `this`의 값은 새로 만들어진 객체고, 그 객체를 반환했어.
 
```js 
function Person(name) {
    this.name = name;
}

var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");

console.log(person);        // "[Object object]"
console.log(notAPerson);    // "undefined"
```

`notAPerson`를 생성할 때 `Person()`을 `new`없이 호출했기 때문에 그 결과로 `undefinded` 가 반환됐어
(그리고 비 strict 모드라면 전역 객체에 `name` 프로퍼티를 만들었을거야).
알고 있듯이, JS에서 생성자 함수라면 그 함수명은 대문자로 시작해서 `Person`으로 함수를 만들어.
이러한 혼란이 있어서 ES 6에서는 일부 변경이 됐지.

ES 6는 함수의 내부에서만 사용할 수 있는 두 개의 다른 메소드(`[[Call]]`, `[[Construct]]`)를 정의했지.
 함수가 `new`없이 호출됐을 때, `[[Call]]` 메소드는 실행되고, 함수 내부를 실행해.
 `new`와 함께 함수가 호출됐을 때, `[[Construct]]` 메소드가 호출돼. 
 이 `[[Construct]]` 메소드는 *new target*(`new.target`)이 호출될 때, 새로운 객체의 생성을 위해 반응하고,
 그때 `this`와 함께 함수 내부가 실행되면서 이를 새 대상으로 설정해(person에 할당된다는 거지!).
 함수는 `[[Construct]]` 메소드를 가지고, 이는 *constructor*로 불려. 

* 메모 : 모든 함수들이 `[[Construct]]`를 가지지는 않고, 그렇기에 함수들이 `new`와 함께 호출되지는 않습니다.
 예시로 화살표 함수(Arrow function)가 있으며, 해당 파트에서 자세히 다뤄봅시다.


### Determining How a Function was Called in ECMAScript 5


ES 5에서 `new`와 함께 함수가 호출될 경우, 많이 사용되는 인기있는 방법으로 `instanceof`를 사용해.
 
```js
function Person(name) {
    if (this instanceof Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");  // throws error
```

`this`값이 생성자의 인스턴스가 맞는지 확인하고 있고, 만약 맞다면 정상적으로 실행될 거야.
 `this`가 `Person`의 인스턴스가 아니라면, error를 던지겠지.
 그리고 `[[Construct]]` 메소드는 `Person`의 새로운 인스턴스를 생성하기 때문에 작동하고, 그것을 `this`에 할당하지.
 그러나 이러한 접근법은 `new`를 사용하지 않아도 `Person`의 인스턴스가 될 수도 있기 때문에 완벽하게 신뢰할 수는 없는 없어.

```js
function Person(name) {
    if (this instanceof Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");    // works!
```

`Person.call()` 호출은 1번째 인자로 `person` 변수를 넘기는데, 
이는 `this`를 `Person`의 인스턴스인 `person`으로 설정함을 의미하지.
 이 함수는 `new`와 함께 호출되는지 구별할 방법이 없어.


### The new.target MetaProperty


이 문제의 해결법으로, ES 6에서 `new.target` *metaproperty*를 소개했어.
 이 metaproperty는 non-object의 프로퍼티이고, `new`와 같은 이런 대상과 관련된 추가적인 정보를 제공해.
 함수의 `[[Construct]]` 메소드가 호출되면, `new.target`은 그 `new` 연산자의 대상으로 채워지게 돼.
 말 그대로 `new`로 새롭게 생성하려는 그 생성자 함수가 `new.target`에 채워진다는 거야.
 그 대상은 일반적으로 새로 생성된 객체의 인스턴스의 생성자이고, 함수 내부의 `this`이지.
 만약 `[[Call]]`이 실행된다면, `new.target`은 `undefined`일거야.
 
 * 역자 주 : 즉, `new`를 통해 `new.target`이 실행된다면, 이 `new.target`의 값은
 예제에서는 `Person`인 것처럼, 생성자 함수를 가지게 됩니다.
 `new`를 통하지 않으면 `undefined`를 가질 거구요.
 
우리는 이 새로운 `new.target` metaproperty를 사용하면, 함수가 `new`와 함께 호출됐는지 안전하게 알아낼 수 있어.

```js
function Person(name) {
    if (typeof new.target !== "undefined") {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");    // error!
```

`this instanceof Person`대신에 `new.target`을 사용하면,
 `Person` 생성자는 이제 정확히 `new`가 사용되지 않을 때 error를 던질 수 있지.
 
또한 우리는 `new.target`를 이용하여 특정한 생성자가 호출됐는 지를 확인할 수도 있지.

```js
function Person(name) {
    if (typeof new.target === Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

function AnotherPerson(name) {
    Person.call(this, name);
}

var person = new Person("Nicholas");
var anotherPerson = new AnotherPerson("Nicholas");  // error!
```

이 코드에서, `new.target`은 정확한 동작을 위해서는 반드시 `Person`이어야만 해.
 `new AnotherPerson("Nicholas")`가 호출됐을 때, `new.target`은 `AnotherPerson`으로 설정되고,
 그래서 그 이후에 `Person.call(this, name)`를 호출하면, `new.target`이 정의됐다고 하더라도 error를 던질거야.  

* 주의 : `new.target`을 함수 밖에서 사용하면 syntax error가 돼.

추가해서 `new.target`는, 주위에서 얘기하는 ES 6의 함수 호출에 대한 약간의 애매모호함을 명확하게 하기 위해 도움을 주고 있어.  
 ES 6 또한 또 다른 이전에 언어의 애매모호한 부분을 블락안에서 함수를 선하는 것으로 대체했지.


## Block-Level Functions


ES 3이전에는 블락(block-level 함수)안에서 함수 선언의 존재는 엄밀히 따지면 syntax error였지만,
 많은 브라우저들은 아직 지원해.
 아쉽지만 각각의 브라우저들은 조금씩 다른 방법을 문법으로 허용하기 때문에,
 블락 안에서 함수 선언문을 피하는 것이 가장 좋은 방법으로 생각되고 있어
(좋은 대안으로는 함수 표현식을 사용하는 것도 있어) 

이런 공존할 수 없는 행동을 통치하기 위해 시도했고, ES 5의 strict mode에서
 함수 선언문이 블락안에서 사용될 때마다 error를 던지도록 도입했어.

```js
"use strict";

if (true) {

    // Throws a syntax error in ES5, not so in ES6
    function doSomething() {
        // ...
    }
}
```

ES 5에서, 이 코드는 syntax error를 던져.
 ES 6에서, `doSomething()` 함수는 block-level 선언된 것으로 간주되고, 
 정의된 같은 블락 내에서 접근될 수 있고, 호출될 수 있어.  

```js
"use strict";

if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    };
    
    doSomething();
};
console.log(typeof doSomething);            // "undefined"
```

Block level 함수들은 정의된 함수들의 블락 상단으로 hoist 돼.
 그래서 비록 코드안에서 함수 선언문보다 앞에 있는 `typeof doSomething`라도 `"function"`을 반환해.
 `if`문이 한 번의 실행이 끝나면, `doSomething()`은 더 이상 존재하지 않아.
 
* 역자 주 : `if` 또한 block이기 때문에, hoist된 `doSomething()` 함수는 `if`문이 끝나면 제거됩니다.
 이전에 했던 TDZ와 매우 비슷합니다.


### Deciding When to Use Block-Level Functions


Block level 함수들은 `let`을 사용한 함수 표현식과 비슷하며,
 이러한 함수 정의는 한 번 실행하고 정의된 블락을 넘어가면 제거돼.
 이 block level 함수들은 블락 내부의 상단으로 hoist의 여부만이 다르지.
 `let`을 사용한 함수 표현식은 hoist되지 않아.

```js
"use strict";

if (true) {

    console.log(typeof doSomething);        // throws error

    let doSomething = function () {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);
```

`typeof doSomething`가 실행될 때 이 코드는 실행을 멈추는데, 이는 `let`문이 아직 실행되지 않았기 때문이지.
 이런 차이점을 알면, 우리는 이 두 가지의 함수 표현식 중에서, hoist 여부에 따라 원하는 표현식을 선택할 수 있어.
  

### Block-Level Functions in Nonstrict Mode


ES 6에서는 block-level 함수를 non-strict 모드에서도 지원하지만,
 이러한 동작은 조금 다른점이 있어.
 이런 선언문들은(아래의 예시에 나온 선언들) hoisting되어 블락의 최상단까지 올라가는 것 대신에,
 선언문이 포함된 함수가 아니면 global까지 hoist돼.

```js
// ECMAScript 6 behavior
if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);            // "function"
```

이 예제에서, `doSomething()`은 global 스코프까지 hoist 되고 있고, 그래서 `if` 블락 밖에서도 여전히 존재하는 거지.
 ES 6에서는 브라우저마다 이전에 정의됐던 동작을 제거하기 위해서 이런 동작을 표준화했고,
 그래서 모든 ES 6 런타임은 같은 방법으로 동작하게 할 거야.
 
block-level 함수들의 허용은 우리가 JS안에서 함수를 선언하는 능력을 향상시키겠지만,
 ES 6에서 함수를 선언하는 완전히 새로운 방법을 소개했어.
 즉, block-level 말고도 새로운 함수 선언 방법을 소개하면서 다양한 방법으로 함수를 만들 수 있도록 하는 거지!


## Arrow Functions


ES 6의 새로운 부분으로 *arrow function*(화살표 함수라 하며, 이하 AF라 함)이라는 한 가지 매우 흥미있는 것이 있어.
 AF는 이름으로 추측해보면, 
 "arrow"(`=>`)를 사용한 새로운 함수를 정의하는 문법으로 보이지만,
 AF는 전통적인 JS 함수의 중요한 여러 가지 방법들과는 다르게 동작해.
 
* **`this`, `super`, `arguments` 그리고 `new.target` 바인딩** :
 `this`, `super`, `arguments`, `new.target`의 값은 함수의 내부에서 AF를 포함하고 AF가 아닌 가까운 함수를 참조해.
(`super`는 4장에서 다룰 거야!)
* **`new`와 함께 호출될 수 없습니다.** :
 AF는 `[[Construct]]` 메소드를 가지고 있지 않으니까 생성자로서 사용될 수 없어.
 AF는 `new`와 함께 사용됐을 때, error를 던질거야.
* **prototype이 없다.** :
 AF가 `new`와 함께 사용할 수 없다는 것은 prototype이 필요하지 않다는 뜻이야.
 AF의 `prototype` 프로퍼티는 존재하지 않아.
* **`this`를 바꿀 수 없다.** :
 함수 안에서 `this`의 값은 바꿀 수 없어.
 `this`는 함수의 전체 lifecycle 전까지 동일하게 유지될거야. 
* **`arguments` 객체가 없다.** :
 AF는 `arguments` 객체를 가지지 않으니, 우리는 반드시 AF를 감싼 함수의 인자들에게 의존해야만 해.
* **중복된 이름을 가진 인자를 사용할 수 없다.** :
 AF는 strict 모드에 상관없이 중복된 인자를 가질 수 없지만,
 반대로 AF가 아닌 함수는 오직 strict 모드에서만 중복된 인자를 가질 수 없어.

* 역자 주 : 마지막 `중복된 이름을 가진 인자를 사용할 수 없다.`을 더 설명한다면,
 함수의 인자에 `(a, a, c)`처럼 strict 모드가 아니라면 가질 수 있지만,
 AF는 strict 모드에 상관없이 가질 수 없다는 뜻입니다.

이런 차이점들에 대한 몇 가지 이유가 있어.
첫 번째, `this`의 바인딩은 JS안에서 오류의 흔한 원인이야.
 이것은 함수 안에서 `this`값의 추적을 끊게되면, 의도하지 않은 프로그램의 동작을 만들어낼 수 있으니,
 AF은 이러한 혼란을 제거했어.
 (`this`가 현재의 컨텍스트마다 값이 달라지는데, 이것을 임의로 변경한다고 생각해보세요... 끔찍하네요...@_ @..) 
두 번째, AF는 단 하나의 `this`값으로 코드의 실행을 단순하도록 제한했고,(`arguments`, `prototype`등이 없이)
 JS 엔진은 이러한 연산을 더 쉽게 최적화를 할 수 있으며, 
 규칙적은 함수들처럼 생성자로 사용되거나 수정되는 것과는 달라.

* 역자 주 : 결국 이 AF는 함수 표현식을 좀 더 단순화한 거라고 생각하시면 됩니다.
 따라서 일반적인 함수들의 기능을 제한하니, JS 엔진이 더 쉽게 최적화가 가능하다는 겁니다.
 왜냐면 단순하니까요! 

또한 집중적으로 error와 AF안에서의 애매함을 줄이려고 했지.
그렇게 함으로써, JS 엔진은 더욱 더 AF 실행을 좋게 만들거야.

* 메모 : AF는 `name` 프로퍼티를 가지며, 이는 다른 함수들처럼 동일한 룰을 가집니다.


### Arrow Function Syntax


AF의 문법은 우리가 무언가를 완벽하게 만들기 위해 했었던 많은 플래버스(flavors)에 의존했던 것에서 생겨났어.
 이 모든 변화는 함수의 인자로부터 시작됐고, 뒤이어 화살표(`=>`), 그리고 함수의 내부에 이르렀지.
 인자 그리고 함수의 내부는 우리가 어떻게 사용하냐에 따라 달라질 수 있어.

* 역자 주 : 플래버스라고 하면 OOP을 위한 언어 또는 언어의 시스템이라고 할 수 있습니다.
 위에 나온 문장을 조금 더 자세히 풀면,
 어떤 하나의 프로그램을 개발하기 위해 OOP라는 개념이 처음 나왔을 때부터 지금까지 계속 발전해왔고,
 그런 발전을 기반으로 JS의 AF의 문법이 만들어졌다는 것으로 생각하시면 될 것 같습니다.
 
```js
var reflect = value => value;

// effectively equivalent to:

var reflect = function(value) {
    return value;
};
```

AF에 인자가 오직 1개만 있다면, 어떠한 문법도 더 필요하지 않고 직접 사용할 수 있어( 예)`()`으로 묶지 않는 것).
 그 다음에 화살표(`=>`)가 오고, 이 화살표의 우측에 오는 표현식은 실행되며 반환하게 돼.
 비록 명확하지 않게 `return`문을 서술하지 않아도, 위 예제의 AF는 첫 번째 인자를 반환할거야.
 
* 역자 주 : AF에서 `return`을 표현할 때는(아래에 나올거지만...) 중괄호(`{}`)에 구문을 감싸면 되지만,
 중괄호를 사용하지 않을 경우 화살표 옆에 사용한 표현식을 `return`문으로 처리합니다.

우리가 2개 이상의 인자를 AF에 넘기고 싶다면, 인자들을 괄호 안에 포함시켜야 해.

```js
var sum = (num1, num2) => num1 + num2;

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

`sum()` 함수는 간단하게 두 개의 인자를 더하고, 그 결과를 반환하고 있어.
 위 예제에서 사용된 `reflect()`와 `sum()` 함수는 '인자들을 괄호에 묶었냐'의 단 한 가지의 차이점만 있어.

* 역자 주 : 설마 여기서 "`,`도 있는데... 두 가지가 다른 거 아닙니까?" 라고 하시면 곤란합니다...껄껄

혹시라도 AF에 인자를 넘기지 않는 경우가 있다면, 반드시 화살표 좌측에 빈 괄호로 인자가 없다는 것을 표현해줘야 해. 

```js
var getName = () => "Nicholas";

// effectively equivalent to:

var getName = function() {
    return "Nicholas";
};
```

우리가 전통적으로 사용했던 함수의 내부를 AF에 제공하고 싶을 때(아마... 하나의 표현식보다 더 많을 경우로 생각되는데), 
 함수 내부를 중괄호로 감싸고, 명확하게 반환값을 정의할 수 있지. 
 
```js
var sum = (num1, num2) => {
    return num1 + num2;
};

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

`arguments`를 사용할 수 없다는 것만 제외하면,
 우리가 일반적인 함수를 사용했던 것처럼 중괄호안에 더 많이 아니면 더 적게 구문을 넣을 수 있어.
 
아무것도 하지않는 함수를 만들고 싶다면, 인자와 비슷하게 중괄호를 사용하면 돼.

```js
var doNothing = () => {};

// effectively equivalent to:

var doNothing = function() {};
```

지금까지 우리가 봤던 경우들은, 중괄호로 함수의 내부를 표현한다면 잘 동작할 거야.
 하지만 AF에서 객체 리터럴식을 반환하고 싶다면, 그 리터럴식을 괄호(`()`)로 감싸야만 해.

```js
var getTempItem = id => ({ id: id, name: "Temp" });

// effectively equivalent to:

var getTempItem = function(id) {

    return {
        id: id,
        name: "Temp"
    };
};
```

괄호로 객체 리터럴식을 감싸는 것은,
 함수 내부를 뜻하는 중괄호가 아니라 객체 리터럴식을 의미하는 중괄호라고 알리게 되는 거야.


### Creating Immediately-Invoked Function Expressions


JS 안에서 한 가지 함수의 사용법으로 즉시 실행 함수가 있어(immediately-invoked function expressions - IIFEs).
 즉시 실행 함수는 익명 함수를 정의하고 참조를 저장하지 않고 즉시 호출하는 것을 허용해.
 이런 패턴은 우리가 손쉽게 scope를 생성하길 원하는 것으로 부터 시작됐고,
 프로그램의 나머지로 부터 보호돼.
  
* 역자 주 : 즉, 즉시 실행 함수는 외부의 다른 것들과 scope가 분리되도록 작성하길 원하던 것으로 시작됐습니다.
 그런 개발자들의 수요가 있었기에 지금의 IIFE가 있다는 뜻입니다.

```js
let person = function(name) {

    return {
        getName: function() {
            return name;
        }
    };

}("Nicholas");

console.log(person.getName());      // "Nicholas"
```

이 코드에서, 즉시 실행 함수는 `getName()` 메소드를 포함한 객체를 생성하기 위해 사용됐어.
 이 메소드는 `name` 인자를 반환값으로 사용했고,
 반환될 객체의 비공개된 맴버 `name`을 효과적으로 만들었어.

우리는 AF를 괄호로 감싸주기만 하면, 위 예제와 동일하게 만들기 위해 AF를 사용할 수도 있지.

```js
let person = ((name) => {

    return {
        getName: function() {
            return name;
        }
    };

})("Nicholas");

console.log(person.getName());      // "Nicholas"
```

* 메모 : 이 괄호는 `("Nicholas")`까지 감싸는 것이 아니라, 오직 AF만 감싸야 합니다.
 이러한 차이는 정식 함수로부터 왔고,
 괄호는 매개변수를 묶거나, 함수를 묶는 등으로 사용될 수 있습니다. 


### No this Binding


JS 안에서 가장 흔한 에러의 영역 중 하나는 함수 내부에서 `this`를 바인딩하는 거야.
 `this`의 값은 함수가 호출된 그 컨텍스트에 의존하여 하나의 함수 내부에서 변경될 수 있지.
 아래 예제에서 `this`를 자세히 봐봐!

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

이 코드에서, `PageHandler` 객체는 page에서 상호작용을 조절할 수 있도록 설계됐어.
 `init()` 메소드는 상호작용을 설정하기 위해 호출되고,
 그 메소드에 `this.doSomething()`를 호출하는 이벤트 핸들러를 등록했지.
 그러나 이 코드는 계획대로 정확하게 동작하지 않아.
 
`The call to this.doSomething()`를 호출하면 `this`는 `PageHandler`가 바인딩되는 게 아니라, 
 대신에 document 객체를 참조하기 때문에 와장창하고 깨지지.
 이 코드를 실행시킨다면, 우리는 이벤트 핸들러가 FIRE!!! 됐을 때,
 `this.doSomething()`는 `document` 객체에 존재하지 않기 때문에 에러를 얻게 되겠지.

우리는 `bind()` 메소드를 사용해서 `this`의 값을 `PageHandler`로 수정할 수 있어. 

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type);     // no error
        }).bind(this), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

이제 이 코드는 예상대로 작동하지만, 아마 조금 이상한 점이 보일거야.
 `bind(this)`를 호출하면, 실제로 새로운 함수가 생성되고 `this`는 현재의 `this`(`PageHandler`)로 바인딩 되겠지.
 추가적인 함수의 생성을 피하기 위해 더 좋은 방법은 이 코드를 AF를 사용하도록 수정하는 거야. 

AF는 `this`를 가지지 않고, 그 의미는 AF 내부에서 `this`의 값은 스코프 체인에 따라 결정돼.
 AF가 Arrow가 아닌 함수 안에 포함됐다면, `this`는 그 함수와 동일한 값을 가지게될 거고,
 그렇지 않으면, `this`는 `undefined`가 되겠지.
 
* 역자 주 : AF의 `this`값에 대한 설명은 이전에 AF에 대해서 설명했었습니다.
 "아차!" 하셨더라면 잠시 위로 다녀오시는 것도 좋습니다.+_

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

이 예제안에 있는 이벤트 핸들러는 AF이며 `this.doSomething()`를 호출해.
 `this`의 값은 `init()` 메소드 안에서 사용되는 `this`의 값과 동일하니까,
 이 코드는 `bind(this)`를 사용한 것과 비슷하게 작동할거야.
 비록 `doSomething()` 메소드가 값을 반환하지 않더라도,
 여전히 함수 내부에 구문만 실행되니까, 거기에는 중괄호가 포함될 필요는 없어. 
 
* 역자 주 : 거기라면 화살표의 우피연산자인 표현식이 되곘죠?

AF는 "throwaway" 함수로부터 설계됐고, 그래서 새로운 타입을 정의할 때는 사용할 수 없어.
 정식 함수는 가진 `prototype` 프로퍼티를 AF는 가지지 않은 것으로 부터 분명하기는 해.
 `new` 연산자를 AF와 함께 사용하려고 한다면, 우리는 에러를 얻게 되겠지!

* 역자 주 : "throwaway" 함수라고 하면, 그냥 한 번 쓰고 버릴 함수라고 생각하시면 됩니다.

```js
var MyType = () => {},
    object = new MyType();  // error - you can't use arrow functions with 'new'
```

이 코드에서, `new MyType()`의 호출은 `MyType`이 AF이며, 그렇기에 `[[Construct]]`를 가지지 않으니 실패하지.
 JS 엔진은 AF가 `new`와 함께 사용되지 않는 것이 더 최적화할 수 있는 것이라는 걸 이미 알고 있을 거야.   

또한, `this` 값이 AF가 정의된 구문을 감싼 함수로부터 확정됐기 때문에,
 이 `this`값을 `call()`, `apply()`, 아니면 `bind()`를 써도 변경할 수 없어.
 

### Arrow Functions and Arrays


AF의 간단한 문법은 배열과 함께 이상적으로 데이터등을 처리할 수 있어.
 예를 들면, 우리가 배열의 정렬을 위해 비교 구문을 만들어 사용한다면, 아래처럼 보통 작성할 거야.

```js
var result = values.sort(function(a, b) {
    return a - b;
});
```

매우 간단한 절차를 위해 많은 문법이 사용되고 있어.
 여기 더 간단하게 AF를 사용해서 만들면 아래와 같아.

```js
var result = values.sort((a, b) => a - b);
```

`sort()`, `map()`과 같은 배열 메소드는 콜백 함수를 받아들이고,
 `reduce()`는 간단한 AF의 문법으로, 겉으로는 복잡해 보이는 과정을 간단한 코드로 바꿀 수 있어.


### No arguments Binding


비록 AF가 자체적인 `arguments` 객체를 가지지는 못 하더라도,
 AF를 감싼 함수의 `arguments`객체에는 접근할 수 있어.
 그 `arguments` 객체는 AF가 나중에 실행되더라도 문제없이 사용할 수 있지.

```js
function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
}

var arrowFunction = createArrowFunctionReturningFirstArg(5);

console.log(arrowFunction());       // 5
```

`createArrowFunctionReturningFirstArg()` 안에 `arguments[0]` 요소는 생성된 AF에 의해 참조됐어.
 `createArrowFunctionReturningFirstArg()` 함수에 넘겨진 첫 번째 인자를 포함한 `arguments`를 참조하고 있지.
 AF가 나중에 실행됐을 때, `createArrowFunctionReturningFirstArg()`에 첫 번째로 넘겨진 5를 반환해. 
 비록 AF가 생성된 그 함수의 스코프 안에 더 이상 존재하지 않더라도,
 `arguments`식별자의 scope 체인의 분해때문에 `arguments` 객체는 접근이 가능해. 
 

### Identifying Arrow Functions


다른 문법에도 불구하고, AF는 여전히 함수이므로, 앞에서 말했던 함수들과 동일한 것으로 인정돼.

```js
var comparator = (a, b) => a - b;

console.log(typeof comparator);                 // "function"
console.log(comparator instanceof Function);    // true
```

출력값을 보면, AF는 다른 함수와 동일하게 취급되고 있어.

또한 다른 함수들과 같이, 우리는 여전히 `call()`, `apply()`, 그리고 `bind()`를 AF에서 사용할 수 있지.
 비록 `this`는 외부에서 바인딩을 하더라도 영향을 받지는 못 해(`this`는 바꿀 수 없으므로).
 
```js
var sum = (num1, num2) => num1 + num2;

console.log(sum.call(null, 1, 2));      // 3
console.log(sum.apply(null, [1, 2]));   // 3

var boundSum = sum.bind(null, 1, 2);

console.log(boundSum());                // 3
```

`sum()` 함수는 `call()`과 `apply()`룰 사용하여 호출됐고, 어떤 함수와 함께 사용하던지 인자를 넘길 수 있어.
 `bind()` 메소드는 `boundSum()`를 생성하는데 사용됐고, 두 개의 인자들을 바인딩했어.
 이미 바인딩이 됐기 때문에, `boundSum()`를 실행할 때는 인자가 필요하지 않은 거지.
 
AF는 현재 익명 함수 표현식이 사용된 곳이라면, 콜백처럼 적절하게 사용할 수 있어.
 다음 장에서는 또 다른 ES 6의 개발에 대해서 중요한 부분을 다뤄볼거야.
 

## Tail Call Optimization


아마도 ES 6 안에서 가장 흥미있는 함수의 변화는 엔진 최적화이고, 그것은 꼬리 호출(tail call) 시스템의 변화지.
 이런 꼬리 호출은 또 다른 함수 안에서 마지막 구문에서 함수가 호출되는 것을 말해.

```js
function doSomething() {
    return doSomethingElse();   // tail call
}
```

ES 5엔진에서 꼬리 호출이 시행되면 새로운 스텍 프레임이 생성되고,
 함수 호출을 나타내는 것을 콜 스텍에 푸시해.
 그 의미는 모든 이전의 스텍 프레임은 메모리 안에 저장되고,
 콜 스텍이 너무 큰 것을 얻게 되면, 문제가 생길 수 있어.

* 역자 주 : 먼저 스텍이라고 하면, 예를 들어서 우리가 A라는 함수 안에
 B, C, D라는 함수를 호출한다고 가정해봅니다.
 그러면 코드는 대략 아래처럼 되겠네요!

```js
function A(){
    B();
    C();
    D();
};

A();
```

이 예제는 A라는 함수 안에서 B,C,D를 각각 호출합니다. 
A의 실행을 끝내기 위해 순서대로 B,C,D 함수의 실행을 끝내야 하므로,
큰 틀에 차곡차곡 B, C, D가 쌓이는 겁니다. B가 끝나면 C를, 그리고 D를 실행하는 거죠.
이렇게 쌓인 것을 콜 스텍이라고 하며, 
스텍 프레임은 B, C, D 각각 하나를 뜻합니다.
자세한 것은 아래의 위키를 보시면 됩니다. 

* 콜 스텍 : https://ko.wikipedia.org/wiki/%EC%BD%9C_%EC%8A%A4%ED%83%9D
* 스텍 : https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%83%9D


### What's Different?


ES 6는 strict 모드에서 어떤 꼬리 호출의 콜 스텍 크기를 줄이려고 노력해.(nonstrict 모드에서 꼬리 호출은
 크기를 줄이지 않고 처음 상태로 남아있어)
 꼬리 호출에 대한 새로운 스텍 프레임을 생성하는 대신에,
 현재의 스텍 프레임을 비우고 아래의 조건 중에서 더 오래 사용되면 그것을 재사용하는 방식으로 최대한 활용하고 있어.

1. 현재 스텍 프레임 안에서 꼬리 호출이 변수의 접근을 요구하지 않는 경우(의미는 함수는 클로저가 아님).
1. 함수가 꼬리 호출을 실행하여 추가 작업을 가지지 않는 경우.
1. 꼬리 호출의 결과로 함수값을 반환할 경우.

이 예제에서, 세 개의 모든 조건을 만족하기 때문에 쉽게 최적화가 돼.

```js
"use strict";

function doSomething() {
    // optimized
    return doSomethingElse();
}
```

이 함수는 꼬리 호출로 `doSomethingElse()`을 실행하고, 결과가 즉시 반환되며,
 지역 scope 내에서 어떤 변수에도 접근하지 않아.
 한 가지 작은 변화를 주면, 그 결과를 반환하지 않으면, 최적화되지 않은 함수를 결과로 얻게 되지.

```js
"use strict";

function doSomething() {
    // not optimized - no return
    doSomethingElse();
}
```

비슷하게, 우리가 함수의 꼬리 호출에서 반환된 후에 추가적인 연산을 수행할 경우, 함수는 최적화되지 않지.

```js
"use strict";

function doSomething() {
    // not optimized - must add after returning
    return 1 + doSomethingElse();
}
```

이 예제는 `doSomethingElse()`의 결과를 값이 반환되기 전에 1과 함께 더하고,
 그것 때문에 최적화가 취소되는 건 충분하지.

또 다른 최적화가 취소되는 흔한 방법으로 함수 호출의 결과를 변수에 저장했을 때 그것을 반환할 경우에 일어나.

```js
"use strict";

function doSomething() {
    // not optimized - call isn't in tail position
    var result = doSomethingElse();
    return result;
}
```

이 예제에서, `doSomethingElse()`의 값을 즉시 반환하지 않았기 때문에 최적화를 할 수 없어.

클로저가 포함된 scope에서 변수에 접근을 하기 때문에,
 아마도 클로저를 사용하지 않는 건 피하기 어려운 상황이고, 결국 꼬리 호출 최적화는 취소될거야.

```js
"use strict";

function doSomething() {
    var num = 1,
        func = () => num;

    // not optimized - function is a closure
    return func();
}
```

클로저 `func()`은 예제에서 지역 변수 `num`에 접근하고 있어.
 비록 `func()`을 반환의 결과로 즉시 호출되지만,
 변수 `num`을 참조로 인해 최적화를 할 수 없어.


### How to Harness Tail Call Optimization


관례상, 꼬리 호출 최적화는 보이지 않는 곳에서 일어나고, 우리는 함수 최적화를 시도하지 않는 경우라면
 이것에 대해 생각할 필요는 없어.
 기본적으로 최적화를 하면 가장 영향이 큰 경우는, 반복되는 함수(재귀 함수) 안에서 꼬리 호출이 사용되는 경우야.
 
```js
function factorial(n) {

    if (n <= 1) {
        return 1;
    } else {

        // not optimized - must multiply after returning
        return n * factorial(n - 1);
    }
}
```

함수를 해석해보면, `factorial()`의 반복 호출 이후에 곱셈을 계산하기 때문에 최적화를 할 수 없어.
 `n`이 매우 큰 숫자라면, 콜 스텍의 크기가 커질 거지다가 스텍이 넘칠 수 있는 경우가 생길 수도 있지.

함수의 최적화를 위해, 우리는 반드시 마지막 함수 호출 이후에 곱셈을 하지 않도록 해야할 필요가 있어.
 이렇게 하려면, 우리는 `return`문 밖으로 곱셈 연산자를 이동시켜서 기본 매게변수를 사용하도록 하면 되겠지.
 함수의 결과를 임시로 변수 result에 할당해두고 그 변수를 가진 같은 함수를 생성해서 동작하도록 하게 하면 돼.
 하지만 이것은 ES 6 엔진에서 최적화가 되는 방법이야.
 
```js
function factorial(n, p = 1) {

    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;

        // optimized
        return factorial(n - 1, result);
    }
}
```

개정된 `factorial()`를 해석하면, 두 번째 인자 `p`는 기본값 1을 가진 매개변수로 추가되어 있어.
 `p` 매개변수는 이전에 곱한 결과를 가지고 있기 때문에 다음의 결과를 또 다른 함수의 호출없이도 계산할 수 있지.
 `n`이 1보다 클 때, 1번째 인자와 2번째 인자를 곱셈하도록 되어 있어.
 ES 6 엔진에서는 이런 방법으로 반복되는 호출의 최적화를 인정하고 있지.

꼬리 호출 최적화는 언제든지 우리가 어떤 반복되는 함수를 작성한다면 생각해볼 수 있고,
 특히 무거운 함수가 적용될 때, 중요한 성능 향상을 위해 제공될 수 있지.  


# 마치며...


드디어 제 3장 `Functions`이 끝났습니다.
 요약하는 부분이 조금 남기는 하지만...
 과감히 패스합니다. 핫핫...

12월 20일 부터 3장을 시작했으니...
 대략 3주 걸렸네요...
 1일에 4시간쳐서 대략 80시간이 걸렸습니다.
 와웅... 엄청 오래 걸리네요...@_ @...

여러분! 영어 공부가 이렇게 어렵습니다!! ㅠㅠㅠ
 조금씩 늘어가는 느낌은 드는데... 너무 조금씩 늘어가는 것 같아서 속으로는 좀 불안하기는 합니다.ㅠㅠ..

금일(2016.1.12)부터 슬슬 스터디 때문에 시간을 더 투자해야할 것 같아서...
 번역 속도가 더 느려질 것 같아요 ㅠ_ ㅠ...
 이러다 정말 1년 걸리겠움!!!>.
 그래도 3장보다 더 큰 문서는 없다는 게 다행이라면 다행이네요 헣헣...
 

올해도 복 많이 받으시길 바라며...
 병신년 새해에 돈 많이 버시길 바랍니다.


- 숫자놀이 올림.

