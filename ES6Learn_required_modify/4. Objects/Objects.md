# Objects


ES 6에서는 객체의 유틸리티를 개선시키기 위해서 많은 부분에 집중하고 있어.
이러한 집중으로 JS 안에서 사용되는 거의 모든 값들은 객체의 몇 가지 타입을 대신해서 의미를 주고 있지. 
추가적으로, 평균적으로 JS 프로그렘에서 사용되는 객체의 개수는 계속 증가하고 있고,
이 의미는 개발자들이 아주 많은 시간을 객체를 작성하는데 쓰고 있다는 거야.
이 많은 객체들을 더욱 효과적으로 사용할 필요성이 생기고 있지.

ES 6는 간단한 문법으로 조각하고 객체와 소통하는 많은 새로운 방법들로 객체를 향상시켰지.


## Object Categories


ES 6의 명세에서 객체의 종류를 구별하는 데 도움이 되는 몇 개의 새로운 용어를 소개했어.
JS는 브라우저와 같이 실행 환경에서 추가되는 것과는 다르게,
표준에서 객체를 찾기 위해 이를 서술할 때 사용되는 용어의 혼합으로 인해 오래동안 산재했어.
ES 6는 객체의 유형별로 알기 쉽게 정의하는 시간을 줄이고,
전체적으로 언어를 잘 이해하려면 이러한 용어를 이해하는 것은 중요해.

객체의 종류는 다음과 같아.

* *보통 객체(Ordinary objects)* : JS 안에서 객체의 기본적인 동작을 모두 가진 객체.
* *외래 객체(Exotic objects)* : 어떤 방법이든지 기본 동작과는 다른 것을 기본으로 가진 객체. 
* *표준 객체(Standard objects)* : ES 6에 의해서 정의됐고, `Array`나 `Date`등과 같은 객체를 의미하며,
 표준 객체는 보통 또는 외래 객체일 수 있다.
* *내장 객체(Built-in objects)* : 현재 JS 실행 환경안에서 스크립트의 실행이 시작될 때,
모든 표준 객체들은 내장 객체.

이러한 용어들은 ES 6에 의해 정의된 다양한 객체들을 설명하기 위해서 이 글 내부에서 자주 사용될 거야.

* 역자 주 : 저는 이렇게 객체를 표현하는 것을 다양한 방법으로 작성해본 적은 없어서..
지금은 크게 공감가지는 않지만(즉, 전 아직도 시니어가 될려면 멀었다는 거..ㅠ)
읽다보면 왜 이렇게 돼야만 하는지 이해가 될 것 같습니다.
후훟 열공!(하지만 요즘 TypeScript가 땡깁... @_ @ )


## Object Literal Extensions


JS 안에서 가장 인기있는 패턴 중 하나는 객체 리터럴이야.
이것의 문법은 JSON 안에 내장되어 있고 인터넷에 있는 거의 모든 JS 파일안에서 볼 수 있지.
분명한 인기의 이유는 객체 생성을 위한 문법이 간결하기 때문이고,
그렇지 않으면 생성하기 위한 코드가 몇 줄이나 필요하지.
ES 6는 객체 리터럴의 인기를 인정하고
여러 방법으로 문법을 확장해서 더 간결하고 더 강력한 객체 리터럴을 만들었지.

 
### Property Initializer Shorthand


ES 5 이전에, 객체 리터럴은 이름-값으로 된 간단한 집합이었어.
속성값이 초기화될 때 몇몇은 중복될 수 있다는 것을 의미해.

```js
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
```

`createPerson()` 함수는 매개변수명과 동일한 이름을 가진 프로퍼티를 생성했어.
그 결과로 `name`과 `age`가 복제된 것처럼 나타나지만, 이 둘의 프로세스의 측면에서는 달라(실제 동작하는 결과는 달라).
반환된 객체의 키 `name`은 변수 `name`이 포함된 값이 할당됐고,
반환된 객체의 키 `age`은 변수 `age`이 포함된 값이 할당됐어.

* 역자 주 : 표현은 조금 어렵게 된 것 같지만... 우리가 아는 그것으로 생각하면 됩니다.
매개변수 `name`이 반환된 객체의 `name` 프로퍼티의 값으로 할당됐습니다(`age`도 동일).

ES 6에서, 우리는 주위의 프로퍼티명이 존재하거나 프로퍼티 초기화에 사용된 지역 변수들의 중복을 없앨 수 있어.
객체의 프로퍼티명이 지역 변수명과 같을 때,
우리는 콜론과 값 없이 이름만 포함시킬 수 있어.

```js
function createPerson(name, age) {
    return {
        name,
        age
    };
}
```

객체 리터럴 안의 프로퍼티가 이름만 있고 값이 없을 때,
JS 엔진은 주위의 이름이 같은 변수를 찾아.
찾았다면, 객체 리터럴 안에 같은 이름을 가진 프로퍼티에 그 값을 할당하지.
그래서 이 예제에서는, 객체 리터럴의 프로퍼티 `name`이 지역 변수 `name`의 값이 할당된 거야.

이러한 확장의 목적은 객체 리터럴 초가화도 더 간단하게 그리고 네이밍 에러를 없애기 위해서야.
지역 변수와 동일한 이름을 가진 프로퍼티의 할당은(위 예제와 같은 경우)
JS 안에서 매우 흔한 패턴이야 그래서 이런 확장을 환명하며 추가했지.


### Concise Methods


ES 6는 또한 객체 리터럴의 메소드 할당을 위한 문법을 개선했어.
ES 5 이전에는, 우리는 반드시 이름을 명시해야 했고, 
그때 객체의 메소드를 위한 전체 함수 선언을 추가해야 했어.

```js
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};
```

ES 6에서, 이 문법을 더 간단하게 만들기 위해 `function` 키워드와 콜론을 제거했어.

```js
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```

이런 약칭(shorthand) 문법은 간결한 메소드(concise method) 문법이라고도 불리고,
이전 예제에서 했던 것처럼 `person` 객체에서 메소드를 생성할 수 있어.
`sayName()` 프로퍼티는 익명 함수 표현식이 할당되고 
이전 예제에서 정의된 함수와 동일한 효과를 가지고 있지.
하나의 다른 점은 간결한 메소드는 `super`(이후에 다룸)를 사용할 수 있고
간결한 메소드가 아니라면 사용할 수 없어.

I>  메소드 생성에 사용한 약칭 문법의 `name` 프로퍼티는 괄호 이전에 사용된 이름입니다.
이전 예제에서, `person.sayName()`의 `name` 프로퍼티는 `"sayName"`죠.


### Computed Property Names


JS 객체는 점 표기법 대신에 대괄호를 사용을 통해서 객체의 인스턴스의 프로퍼티 명에 접근할 수 있었어.
대괄호는 변수와 문자열 리터럴(문자를 포함할 수 있음)을 사용하여 프로퍼티 이름을 명시할 수 있고,
이를 식별자에 사용된다면 문법 에러가 될 수 있어.

```js
var person = {},
    lastName = "last name";

person["first name"] = "Nicholas";
person[lastName] = "Zakas";

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

이 예제에서, 프로퍼티명에 띄어쓰기가 있는 이 두 개의 프로퍼티는
점 표기법에서는 이러한 이름 참조는 사용할 수 없어.
그렇지만 대괄호 표기법은 프로퍼티명에 사용된 어떠한 문자열 값이라도 상관없이 허용해. 

ES 5 에서, 우리는 객체 리터럴 안에서 프로퍼티명에 문자열 리터럴을 사용할 수도 있어. 

```js
var person = {
    "first name": "Nicholas"
};

console.log(person["first name"]);      // "Nicholas"
```

이 패턴은 앞서 했던 것처럼 문자열 리터럴로 대체할 수 있으며 잘 작동해.
그러나 변수에 포함되어 있거나 계산될 수 있는(계산식이 있는) 프로퍼티명이라면,
객체 리터럴을 사용해서 프로퍼티를 정의하는 방법은 없어.

* 역자 주 : 이 2가지 경우에 대해서는 아래에 바로 나옵니다.

ES 6는 대괄호 표기법을 객체 리터럴의 프로퍼티명에서 사용할 수 있도록 문법이 추가됐어.
객체 인스턴스에서 이 표기법 안에 사용한 코드를 처리하여(계산하여) 처리된 값을 참조로 사용할 수 있지.

```js
var lastName = "last name";

var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

객체 리터럴의 내부에 있는 대괄호는 그 값을 처리하고,
그 컨텐츠를 문자열로 평가해.
이 뜻은 우리는 또한 내부에 표현식을 사용할 수 있다는 말이야.

```js
var suffix = " name";

var person = {
    ["first" + suffix]: "Nicholas",
    ["last" + suffix]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person["last name"]);       // "Zakas"
```

우리는 대괄호 내부에 어떤 것이라도 넣을 수 있고,
대괄호 표기법을 객체의 인스턴스에서 사용하는 동안
객체 리터럴 내부의 프로퍼티명을 계산하여 작동할 거야.

* 역자 주 : 객체의 인스턴스라고 계속 나오는데...
어렵게 생각하시지 마시고, 이 대괄호 표기법을 객체 리터럴 안에서 사용한다고 했잖아요?
즉, `{}` 안을 객체의 인스턴스 내부라고 할 수 있습니다.
`{}`안에서 `[]`를 사용하면 저런 효과가 나온다는 뜻입니다.


## Object.is()


우리가 두 값을 비교하기를 원할 때,
아마도 항등 연산자(또는 동등 `==`)나 완전 항등 연산자(또는 일치 '===')를 사용했을 거야.
비교하는 동안 강제로 타입 변경을 피하기 위해 후자(`===`)를 많이 좋아하는 편이야.
그러나 일치 연산자(`===`) 마저도 전부 정확하게 판별하지는 못 해.
예를 들면, 값 `+0`과 `-0`은 JS 엔진에서 다르게 묘사하지만 `===`은 같다고 판별해.
또한 `NaN === NaN`은 `false`를 반환하고, `NaN` 프로퍼티를 알아내기 위해 `isNaN()`을 사용하도록 만들지. 

이런 일치 연산자의 특이한 점을 보완하기 위해 ES 6에서 `Object.is()`를 소개했어.
이 메소드는 두 개의 인자를 받고 
두 개의 값이 동일한 타입이고 같은 값을 가졌다면 동일하다고 판단하는데,
동일하다면 `true`를 반환하지.
많은 경우에서, `Object.is()`는 `===`와 동일하게 동작할거야.
단지 다른 점으로는 `+0`과 `-0`은 동일하지 않고 `NaN`과 `NaN`의 비교는 동일하다고 판단하는 거지.

```js
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false
```

`==`와 `===` 아니면 `Object.is()` 이들 중 어떤 것을 사용할 것인지에 대한 선택은 
우리의 코드에서 영향을 줄 수 있는 특별한 경우에 따라 선택하면 돼.
항등 연산자들(`==`, `===`)을 모두 사용을 멈출 필요는 없다는 뜻이야.

* 역자 주 : 아직 이 두 가지 때문에 곤란함을 겪어본 적이 없어서 잘 모르겠지만...
알아두면 좋을 것 같습니다.


## Object.assign()


객체의 성질에서 가장 인기있는 패턴 중 하나는 믹스인(mixin)이고,
이는 하나의 객체에서 다른 객체에게 프로퍼티와 메소드를 받는 것을 말해.  
많은 JS 라이브러리들은 아래의 예제처럼 비슷한 믹스인 메소드를 가지고 있어.

* 역자 주 : 믹스인이라는 단어를 위키에서 보니 개념이 깊습니다...!!
OOP에서 믹스인은 기존에는 다른 클래스에서 사용하는 메소드는 그 부모에서 접근이 가능했으나(아마 자식 클래스도 되겠죠?!),
다른 클래스에서도 사용할 수 있도록 하는 것을 믹스인이라 하는 것 같습니다.
아래의 코드를 보시면 알겠지만, 
JS에서는 a의 메서드를 b에게 이식(?)하는 느낌이네요.
참조 : https://en.wikipedia.org/wiki/Mixin

```js
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });

    return receiver;
}
```

`mixin()` 함수는 `supplier`가 가진 프로퍼티들을 `receiver`에 복사하고 있어(얕은 복사).
이는 상속없이도 `receiver`가 새로운 프로퍼티들을 얻을 수 있도록 허용한다는 거야.

```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};

var myObject = {};
mixin(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

이 예제에서, `myObject`는 `EventTarget.prototype`의 프로퍼티를 받아.
따라서 `myObject`는 받은 메소드를 사용하여 이벤트와 관련된 동작을 사용할 수 있지.

이런 패턴의 충분한 인기 때문에 ES 6에서 `Object.assign()`이 추가됐고,
이것은 같은 방법으로 동작해.
이름에서 차이가 있는 건, 실제 동작을 반영했기 때문이야.
`mixin()` 메소드는 할당 연산자(`=`)를 사용하기 때문에,
이것은 *접근자 프로퍼티*를 받는 객체의 접근자 프로퍼티로는 복사할 수 없다는 거지.
`Object.assign()`의 이름이 선택된 건 이런 특별함이 반영됐기 때문이야.

* 역자 주 : 접근자 프로퍼티라고 하면 getter, setter를 의미합니다.
getter는 읽기전용, setter는 쓰기전용이지요.

I> 다양한 라이브러리들의 비슷한 메소드들은 다른 이름들을 가지고 있어.
동일한 기본 기능을 가진 몇몇 인기있고 번갈아가며 쓰는 이름으로는 `extend()`와 `mix()`가 있어.
또한, 간단히 말하면, ES 6에서 `Object.assign()`에 추가적으로 `Object.mixin()` 메소드가 있어.
주된 차이점으로 `Object.mixin()`는 접근자 프로퍼티들도 복사하지만,
이 메소드는 `super`의 사용때문에 걱정거리가 생길 수 있어서 제거했지.(4장 마지막쯤에서 다룰 예정)

우리는 `mixin()` 함수를 사용하는 것처럼 어디든지 `Object.assign()`을 사용할 수 있어.

```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
}

var myObject = {}
Object.assign(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

`Object.assign()`는 얼마든지 공급자들(위 예제에서 EventTarget.prototype)을 받을 수 있고,
수취자(myObject)는 명시된 공급자들의 순서대로 프로퍼티들을 받을 수 있지.
그 의미는 두 번째 공급자는 수취자가 받은 첫 번째 공급자의 값을 덮어쓰기가 가능하다는 뜻이야.

```js
var receiver = {};

Object.assign(receiver,
    {
        type: "js",
        name: "file.js"
    },
    {
        type: "css"
    }
);

console.log(receiver.type);     // "css"
console.log(receiver.name);     // "file.js"
```

두 번째 공급자가 첫 번째 값을 덮어쓰기 헀기 때문에 `receiver.type`의 값은 `"css"`가 됐어.

`Object.assign()` 메소드는 ES 6에서 대단하게 추가된 것이 아니고,
다른 JS 라이브러리들에서 흔하게 찾을 수 있는 함수를 형식화한 것 뿐이지.


* 역자 주 : 하다보니 이 assign에 조금 특이한 점을 찾았네요.

```js
var supObj = {
	1 : 1
};
var reObj = {
	a : "받는 객체얌"
};

// 1. 이미 알던 형태. 리시버객체에 공급자 객체를 할당합니다. 즉, 둘 다 프로퍼티로 들어가는 거죠.
var assObj1 = Object.assign(reObj, supObj);
// 2. 이렇게 하면 supObj를 프로퍼티로 가지고 create안에 들어간 빈객체를 프로토타입으로 가집니다. 
var assObj2 = Object.assign(Object.create({}), supObj);
// 3. 2번과 개념은 동일합니다. supObj를 프로퍼티로 가지고 reObj를 프로토타입으로 갖습니다.
var assObj3 = Object.assign(Object.create(reObj), supObj);
```

이런 특별함(?)이 있습니다.
Object.create()로 reObj를 프로토타입으로 만들었으니,
reObj는 프로토타입에 위치하고 supObj는 프로퍼티로 들어가는 거겠쥬!


### Working with Accessor Properties


* 역자 주 : 이 파트는 원문에서 오류가 있는 것 같아서 제가 수정합니다.
(제보해야징~~~ 잇힝!) 원문은 아래 남기겠습니다.

`Object.assign()`는 공급자가 접근자 프로퍼티를 가지고 있다고 해도
수취자에게 접근자 프로퍼티를 생성하지 않아.
`Object.assign()`는 할당 연산자를 사용하기 때문에,
공급자에 있는 접근자 프로퍼티는 수취자에게는 데이터 프로퍼티로 될거야.

* 역자 주 : 데이터 프로퍼티라고 하면 이런 접근자 프로퍼티가 아닌 일반적인 프로퍼티를 말합니다.

```js
var receiver = {}, 
supplier = { 
	get name() { 
		return "file.js" 
	} 
}; 

Object.assign(receiver, supplier); 
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name"); 

console.log(descriptor.value); // "file.js" 
console.log(descriptor.get); // undefined
```

이 코드에서, `supplier`는 `name`이라는 이름의 접근자 프로퍼티를 가지고 있어.
`Object.assign()`을 사용한 이후, 
`receiver.name`은 `"file.js"`의 값을 가진 데이터 프로퍼티로 존재할 거야.
그 이유는 `supplier.name`이 `Object.assign()`이 호출됐을 때 `"file.js"`을 반환하기 때문이야.

W> `Object.assign()`는 symbols의 key 값에 해당하는 프로퍼티는 복사하지 않아.(6장에서 다룰 예정)

* 역자 주 : Object.getOwnPropertyDescriptor는... 껄껄 제가 이거 설명해드릴 줄 알았죠?!
자자, 여러분들 잠 깹시다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
보고 오시면 되겠습니다.


## Duplicate Object Literal Properties


ES 5 strict 모드에서는 객체 리터럴의 프로퍼티가 중복된 것이 있는지 확인하는데,
있을 경우, 에러를 던질거야.
그 예제는 다음과 같은데, 이 코드는 문제가 많아.

```js
"use strict";

var person = {
    name: "Nicholas",
    name: "Greg"        // syntax error in ES5 strict mode
};
```

ES 5 strict 모드에서 이 코드를 실행할 때, 두 번째 `name` 프로퍼티는 syntax 애러의 원인이 될거야.
하지만 ES 6에서는 프로퍼티의 중복체크를 제거했어.
strict나 nonstrict 모드, 둘 다 더 이상 프로퍼티의 중복체크를 하지 않아.
대신에, 이름이 중복된 마지막으로 선언한 프로퍼티를 실제값으로 사용되고 있어.
즉, 덮어쓴다는 거지!

```js
"use strict";

var person = {
    name: "Nicholas",
    name: "Greg"        // no error in ES6 strict mode
};

console.log(person.name);       // "Greg"
```

이 예제에서, `person.name`의 값은 마지막으로 선언한 프로퍼티의 값을 할당하니까 `"Greg"`가 되겠지.


## Own Property Enumeration Order


ES 5는 객체 프로퍼티의 열거 순서를 정의하지 않았고,
JS 엔진 제조사들까지 이것을 넘겨버렸어(크게 신경쓰지 않았어).
하지만 ES 6는 엄격하게 객체가 가진 프로퍼티 순서 그대로 정의하고, 
열거될 때, 반드시 순서 그대로 반환돼.
이것은 `for-in` 루프, `Object.keys()`, `Object.getOwnPropertyNames()` 메소드, `Reflect.ownKeys`(12장에서 다룸)들을 사용해서
프로퍼티를 반환하는 경우에 영향을 주고 있어.
또한 `Object.assign()`과 `JSON.stringify()`를 사용해서 처리했을 경우, 프로퍼티들의 순서에도 영향을 줄거야.

객체가 가진 프로퍼티를 열거할 때 기본적인 순서는 다음과 같아.

1. 모든 숫자형태의 key는 앞에 위치한다.
1. 모든 문자열 key는 객체에 추가됐던 그대로의 순서를 가진다.
1. 모든 symbol key는(6장에서 다룸) 2번과 마찬가지로 그대로의 순서를 가진다.

```js
var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
};

obj.d = 1;

console.log(Object.keys(obj).join(""));     // "012acbd"
```

`Object.keys()` 메소드는 `obj`에 있는 프로퍼티를 `0, 1, 2, a, c, b, d`의 순서로 반환해.
비록 숫자 key들은 객체 리터럴 안에서의 순서를 벗어나더라도, 함께 묶이게 되고 정렬돼. 
문자열 key들은 숫자 key 뒤에 위치하고, 이 key들이 `key` 객체에 추가됐던 순서 그대로 나타나고 있어.
객체 리터럴 안의 이 key들이 먼저 오고, 나중에 추가된 동적 key들은 그 뒤에 추가되고 있지.(이 예제에서는 `d`) 

`for-in` 루프를 사용할 때, 이것은 프로토타입 프로퍼티도 포함시키고, 
아래 예제처럼 자신의 프로퍼티를 처음에 놓고, 프로토타입 프로퍼티들을 그 이후에 배치시키고 있어.

```js
var parent = {
    z: 1,
    9: 1,
    y: 1,
    8: 1
};

var obj = Object.assign(Object.create(parent), {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
});

var result = [];

for (var key in obj) {
    result.push(key);
}

console.log(result.join(""));     // "012acb89zy"
```

`obj` 객체의 프로토타입 체인으로 `parent`를 가지고, 그 프로퍼티 key들은 `for-in` 루프 내부에서 열거되는데,
`obj` 자신의 프로퍼티로 시작하고 계속해서 `parent`에 의해 제공된 프로토타입 프로퍼티들을 열거하고 있어.  
각각의 프로퍼티 그룹은 숫자 key를 오름차순으로 하고, 따라오는 문자열 key는 추가한 순서 그대로 정렬하고 있지.

열거 순서는 JS 작동법에 미묘한 변화가 있지만, 
올바르게 작동하도록 명확한 열거 순서에 의존하는 프로그램은 흔하게 찾을 수 있어.
ES 6는 열거 순서를 정의함으로 인해, JS 코드가 열거에 의존하면 어디서 실행하든지 상관하지 않고 정확하게 동작할 거야.


## More Powerful Prototypes


JS 에서 프로토타입은 상속을 기반으로 하고, ES 6는 계속해서 더 강력하게 만들었어.
JS의 초기 버전에서는 프로토타입을 함께 사용하는 것을 조금씩 제한했었어.
그러나 언어가 발달하고 프로토타입의 작동법을 개발자들이 더 익숙해짐에 따라,
개발자들이 프로토타입에 대해서 더 컨트롤하고 더 쉽게 사용하는 방법을 원하게 됐어. 
그 결과로, ES 6는 프로토타입의 향상된 몇몇을 소개했지.

 
### Changing an Object's Prototype


보통, 객체의 프로토타입은 생성자나 `Object.create()` 메소드를 통해서, 객체가 생성될 때 지정돼.
객체의 프로토타입은 인스턴스화 된 이후로는 변경되지 않는다는 이 생각은
ES 5 이긴 하지만 JS 프로그래밍에서 가장 큰 추정들 중 하나였어.
ES 5에서, 주어진 어떤 객체라도 프로토타입을 검색하는 `Object.getPrototypeOf()` 메소드가 추가됐지만,
이것은 인스턴스화 이후의 객체의 프로토타입을 변경하는 표준화된 방법은 아직도 부족해.

ES 6는 `Object.setPrototypeOf()` 메소드를 추가하여, 
우리는 주어진 어떤 객체의 프로토타입을 변경할 수 있도록 허용되었고,
이로 인해 그런 추정을 변화시켰지.
`Object.setPrototypeOf()` 메소드는 두 개의 인자들을 받는데,
1번째 인자에는 프로토타입을 변경하고 싶은 객체,
2번째 인자에는 1번째 인자의 프로토타입이 되고 싶은 객체를 넘길 수 있어.

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

이 코드는 두 개의 기본 객체(`person`, `dog`)를 정의하고 있어.
두 객체는 문자열을 반환하는 `getGreeting()` 메소드를 가지고 있어.
처음에 `friend` 객체는 `getGreeting()`을 호출하면 `"hello"`를 출력하는 `person`으로 부터 상속받았어.
이 프로토타입이 `dog` 객체로 됐을 때, 원래있던 `person`과의 관계는 끊어졌기 때문에 `person.getGreeting()`은 `"woof"`를 출력할 거야.


The actual value of an object's prototype is stored in an internal-only property called

... coming...





















































































