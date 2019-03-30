# Strings and Regular Expressions


프로그래밍 언어에서 사용하는 중요한 데이터 타입 중 하나인 문자열은 거의 모든 `higher-level` 언어에서 찾아볼 수 있어.
개발자들이 유용한 프로그램을 만들기 위해 문자열을 필수적으로 사용하지.
정규 표현식과 문자열의 관계를 생각해보면, 개발자들이 문자열을 다룰 수 있어야 더 유용하게 정규 표현식을 다룰 수 있어.
ES6에서 문자열과 정규 표현식을 향상시키기 위해, 새로운 기능과 `long-missing` 기능을 추가했지.
(`long-missing`이 뭘까...)


## Better Unicode Support


ES 6를 하기에 앞서, JS 문자열은 오로지 16-bit 문자 인코딩의 개념을 기반으로 만들어졌어. 
모든 문자열 프로퍼티와 메소드(ex) `length`나 `charAt()` 등...)들은 하나의 문자를 16-bit로 배열하는(표현하는) 이러한 개념을
기반으로 만들어졌지.
(즉, 문자열도 16-bit를 기반으로 하니 프로퍼티나 메소드도 마찬가지로 16-bit를 기반으로 한다는 거야)

ES 5는 JS 엔진이 두 개의 `UCS-2`나 `UTF-16`의 인코딩 방법 중 어느 것을 사용할 것인지 결정할 수 있도록 허용됐어.
(이 두 가지 인코딩 방법은 모두 16-bit 코드 단위를 사용하여 식별할 수 있는 연산자로 만들어졌지) 
세상 모든 문자들이 16-bit 내에서 표현되는(사용하는) 것이 사실화되는 동안, 언제부터인가 더 이상 16-bit를 벗어나는 사례는 없어졌지.

- 역자 주 : 이 파트는 번역이 애매하네요... 하아... 하지만 이 부분은 대충 읽고 아래부터 읽으셔도 지장은 없는 것 같습니다. 하핳


### UTF-16 Code Points


세계의 모든 문자를 16비트를 유지하면서 전역 고유 식별자(globally unique identifier)로 제공하는 것이 유니코드의 명백한 목표였지만 
불가능했대.
이러한 전역 고유 식별자는 코드 포인트(https://en.wikipedia.org/wiki/Code_point)라 불리며, 간단히 숫자 0부터 시작해.
(미묘하게 조금 다르기는 하지만 문자 코드들이라고 생각할 수 있어.)

- 역자 주 : 각 하나의 문자들을 표현하는 숫자의 집합을 코드 포인트라고 생각할 수 있습니다. 
유니코드를 예시로 생각해보면, 0000~FFFF로 총 2^16인 65,536의 코드 포인트를 가질 수 있어요.
이 각각의 코드 포인트가(FFFC, FFFB 등...) 문자 하나씩을 의미합니다.
ex) `가` : AC00, `나` : B098, `A` : 0041, `B` : 0042 등으로 AC00, 0042등이 코드 포인트라고 할 수 있죠.

먼저, UTF-16 안에서는 2^16의 코드 포인트는 하나의 16비트 코드 단위로 표현할 수 있어.
이것을 기본 다국어 평면(Basic Multilingual Plane - 이하 BMP)라고 불러.
이 평면 안에 65,536개의 코드 포인트가 있지. 
BMP를 제외한 모든 모든 평면은 보조 평면(supplementary plane - 이하 SP)이고,
더 이상 16비트로 표현하기 어려운 코드 포인트가 SP 안에 있다고 생각하면 돼.
UTF-16에서는 이러한 문제를 풀기 위해 대응하는 짝을 도입했는데, 이는 하나의 코드 포인트를 두 개의 16비트 코드 단위로 표시하는
것을 의미해.

- 역자 주 : 디테일한 설명으로(아래에 나올 지도 모르겠지만...) 기본적으로 65,536에 해당하는 코드 포인트는 
0000~FFFF로 표현할 수 있는데 이는 BMP를 의미하고, 10000~1FFFF는 1번째 SP, 20000~2FFFF는 두 번째 SP...
해서 100000~10FFFF인 16번째 SP(라고 여기서는 말하지만 실제로는 사용자 정의 영역)으로 총 17개의 평면이 있죠.
따라서 1~10(평면을 알려주는 값) + 0000~FFFF인 두 개의 짝으로 모든 유니코드를 표현할 수 있습니다.

ES 5에서는 모든 연산자는 16비트 단위로 동작하도록 유지됐는데,
SP에 해당하는 문자를 사용하게 된다면 이는 예상하지 못한 결과를 얻을 수 있어.

```js
var text = "𠮷";

console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // ""
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
```

이 예제에서, 하나의 유니코드 문자(`𠮷`)는 SP영역에 있는 문자를 표현하고 있어,
그리고 이와 같이, JS의 문자열 연산자는 두 개의 16비트 문자를 가지는 문자열로 취급해.

* 길이가 2.
* 정규 표현식은 하나의 문자가 매칭되는지 시도했지만 실패해서 false를 리턴.
* `charAt()` 은 유효한 문자열을 반환하지 못 해.

`charCodeAt()` 메소드는 적절한 16비트의 코드 단위를 반환하는데,
그 값으로 ES 5 안에서 가장 가까운 실수를 얻을 수 있어.  

ES 6 에서는 문자열 인코딩을 UTF-16안에서 시행해.
문자 인코딩의 표준화는 언어에서 SP의 값을 명확하게 표한할 수 있도록 설계된 기능(메소드)이 지원한다는 의미지.


### The codePointAt() Method


`codePoinAt()` 메소드는 UTF-16을 완벽히 지원해.
이 메소드는 문자열에서 주어진 위치를 넘기면 매핑되는 유니코드 코드 포인트를 얻을 수 있어.
즉, 이 메소드는 코드 단위의 위치값(index 값)을 넘기면 정수형의 값을 반환하지.

```js
var text = "𠮷a";

console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97

console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97
```

`codePointAt()`은 BMP에 해당하는 문자라면 `charCodeAt()`과 동일하게 동작해.
첫 번째 문자(`𠮷`)는 BMP에 있는 문자가 아니니까 두 개의 코드 단위를 가졌다고 생각할 수 있어.
이 말은 전체 문자의 길이는 2보다 큰 3이라는 뜻이지.
`charCodeAt()` 메소드는 1번째 코드 단위에 해당하는 값만 반환할 수 있고, 
`codePointAt()` 메소드는 모든 코드 단위들의 값을 반환해.
이 두 메소드는 `𠮷a` 중 1번째(index상 0번째 위치) 값만 다르고 남은 2번째 3번째 문자에 대한 값은 동일하게 반환해.

* 역자 주 : 왜 `𠮷`의 두 번째 위치의 값이 왜 `57271`인지는 모르겠네요... 좀 더 봐야할 것 같습니다.

아래의 메소드를 사용하면 인자로 넘기는 문자가 두 개의 코드 포인트(SP영역의 코드)를 가지는지 쉽게 판단할 수 있어.

```js
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

console.log(is32Bit("𠮷"));         // true
console.log(is32Bit("a"));          // false
```

16비트의 문자보다 큰지(BMP를 초과하는지) 알 수 있는 경계라고 하면 16진수인 `FFFF`라고 생각할 수 있어.
그래서 모든 코드 포인트가 이 `FFFF`보다 위에 있다면(크다면) 두 개의 코드 포인트를 가진다고 생각할 수 있지.


### String.fromCodePoint()


우리가 무엇을 하려고 하는 방법을 ES가 제공할 때(메소드를 정의할 때),
ES는 반대의 방법을 제공하려고 하는 경향이 있어.
우리가 `codePointAt()`을 사용하여 문자열 안에서 원하는 위치에 해당하는 문자의 코드 포인트를 검색한다면,
`String.fromCodePoint()`는 코드 포인트를 넘기면 넘긴 값에 해당하는 단일 문자를 반환해. 예를 들면 :

```js
console.log(String.fromCodePoint(134071));  // "𠮷"
```

우리는 `String.fromCodePoint()`는 `String.fromCharCode()`보다 더 완성된 버전이라고 생각할 수 있어.
각각의 메소드는 BMP 안이라면 같은 결과를 반환하지만 그것을 넘어서는 영역에서는 다른 값을 반환하지.


## Escaping Non-BMP Characters


ES 5는 16비트의 유니코드 문자들을 포함하는 이스케이프 시퀀스 문자열을 허용해.
이 이스케이프 시퀀스는 `\u`인데, 그 옆으로 4개의 16진수 값들과 함께 쓸 수 있어. 
예를 들면, 이스케이프 시퀀스 `\u0061`은 문자 `"a"`를 표현할 수 있지.

```js
console.log("\u0061");      // "a"
```

만약 우리가 `FFFF`보다 큰 숫자를 이스케이프 시퀀스와 함께 사용하려고 한다면,
그것은 곧 BMP를 넘어서는 숫자니까 우리는 놀라운 결과를 얻을 수 있지.

```js
console.log("\u20BB7");     // "₻7"
```

유니코드 이스케이스 시퀀스는 항상 4개의 16진수 값을 갖는 것으로 정의되었기 때문에,
ES는 `\u20BB7` 값을 두개의 문자(`\u20BB`와 `7`)로 평가했어.
따라서 위 예제에서 저런 결과가 나온 이유는 
첫 번째 문자는 의미를 알 수 없는 문자로, 두 번째 값은 7로 해석했기 때문이야. 

ES 6에서는 유니코드 이스케이프 시퀀스 다음에 나오는 16진수를 중괄호로 감싸서 정의하는 것으로,
`FFFF`를 초과하는 수도 사용할 수 있도록 했어.
하나의 문자에 해당하는 어떤 16진수라면 어떤 수를 쓰더라도 사용할 수 있도록 허용했어.

```js
console.log("\u{20BB7}");     // "𠮷"
```

예제에서 사용된 문자열 안에는 확장된 이스케이프 시퀀스를 사용하여 올바른 문자를 사용하고 있어.

우리는 반드시 ES 6 환셩에서만 이 새로운 이스케이프 시퀀스를 사용해야만 해.
다른 모든 환경에서 사용한다면 syntax error를 발생시켜.
우리가 이 기술을 사용할 수 있는 환경인지 체크하길 원한다면, 아래의 함수를 사용하면 돼.
```js
function supportsExtendedEscape() { 
	try { 
		eval("'\u{00FF1}'"); 
		return true;
	} catch (ex) { 
		return false; 
	};
}
```

* 역자 주 : 오우... 저게 함수인 줄도 모르고 원문의 `{lang=js}`에서 삽질하고 있었... 커험험... 


### The normalize() Method

* 역자 주 : 시작하기에 앞서... 와.. 이번 파트 번역이 어렵네요? 처음 유니코드를 접했을 때 보다 더 힘든 것 같아요..ㅠ_ ㅠ...
이 파트의 번역을 봐도 이해하가 어렵다면, 파트 아래 영역에 `역자 주:` 에다가 정리했으니까, 한 번 보셨으면 해요.

유니코드의 또 다른 흥미로운 측면으로는 다른 문자들이 있으면
정렬을 목적으로 하거나 비교를 위한 연산자 때문에 문자들이 동등하게 간주하게 돼.
(즉, 문자들은 서로 다르지만 연산자들 때문에 동일하게 생각된다는 뜻)
이러한 관계를 정의하는 두 가지 방법이 있어.
첫 번째, 동치의 표준(canonical equivalence)으로, 두 개 이상의 코드 포인트를 조합해서 
하나의 동일한 표준의 코드 포인트로 만든다는 뜻을 가진 하나의 방법이 있어.
두 번째, 호환성(compatibility)의 관계인데, 이 뜻은
두 개 이상의 코드 포인트는 다른 모습을 가지지만, 어떤 상황에서는 교환되는 것으로 사용할 수 있어.

이러한 관계 때문에 이것을 이해하는 것은 중요하며, 
두 개의 문자열이 다른 연속적인 코드 포인트를 포함을 하더라도, 근본적으로 동일한 텍스트로 대표할 수 있어. 
예를 들면, 문자 "æ"와 문자열 "ae"는 서로 다른 코드 포인트라고 할지라도 서로 상호 교환적으로 사용될 수 있어.
이러한 두 개의 문자열이 어떠한 방법으로 서로 정규화되지 않는 한, JS 안에서는 이 둘은 동일하지 않아.
(즉, 어떤 두 개의 문자열이 서로 상호 교환적으로 사용될 수는 있지만, 현재까지는 이 둘을 동일하게 만드는 방법이
없기 때문에 이 둘이 동일하지는 않다는 뜻입니다)

ES 6에서는 문자열 메소드로 새로 추가된 `normalize()`를 통해서 유니코드 표준화 형태를 지원해.
이 메소드는 옵션으로 유니코드 표준화 형태를 나타내는 하나의 문자열 인자를 받아들이는데, 
이들은 `"NFC"`(기본값), `"NFD"`, `"NFKC"`, `"NFKD"`로 총 4개를 사용할 수 있어.
이 페이지에서 4가지 형태 사이의 차이점을 설명하기는 어렵지만, 잊지 말아야할 것은 
문자열을 비교할 때, 두 문자를 같은 형태로 표준화를 해야만 한다는 것을 잊지 않으면 돼.
예를 들면 :

```js
// 실 예제에는 없으나 values 배열이 ['\u1E9B', '\u0323'] 이런 배열이라고 가정하자. 
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
```

이 코드에서, `values` 안에 들어있는 문자열을 표준화된 형태로 변환하고 그 배열을 적당하게 정렬할 수 있어.
아니면 우리는 아래의 예제처럼, 인자별로 `normalize()` 메소드를 호출해서 원래의 배열의 정렬을 완료할 수도 있어. 

```js
values.sort(function(first, second) {
    var firstNormalized = first.normalize(),
        secondNormalized = second.normalize();

    if (firstNormalized < secondNormalized) {
        return -1;
    } else if (firstNormalized === secondNormalized) {
        return 0;
    } else {
        return 1;
    }
});
```

다시 한 번 강조하지만, 두 값은 반드시 같은 방법으로 표준화를 해야만 해.
지금까지의 예제는 기본값(NFC)을 사용했지만, 그 외의 방법으로 표준화를 하려면 아래처럼 
`.normalize()`의 메소드의 인자로 원하는 옵션을 넘기면 쉽게 표준화할 수 있지.

```js
values.sort(function(first, second) {
    var firstNormalized = first.normalize("NFD"),
        secondNormalized = second.normalize("NFD");

    if (firstNormalized < secondNormalized) {
        return -1;
    } else if (firstNormalized === secondNormalized) {
        return 0;
    } else {
        return 1;
    }
});
```

만약 우리가 유니코드 표준화에 대해서 걱정을 갖지 않았다면, 이러한 메소드들을 많이 사용하지 않았을 거야.
그러나 이러한 방법이 어떤 도움이 될 수 있는 지를 알고 있다면, 
전 세계적으로 사용된 어플리케이션의 작업을 마무리할 수 있을 거야.


* 역자 주 : `string.normalize()` 메소드의 정의를 생각해보면...
반환값으로 유니코드 표준화된 형식의 값을 줍니다.
메소드에서 인자로 넘길 수 있는 값은 `"NFC", "NFD", "NFKC", "NFKD"`이며, 4가지의 뜻은 아래와 같습니다.

1. NFC — Normalization Form Canonical Composition.
1. NFD — Normalization Form Canonical Decomposition.
1. NFKC — Normalization Form Compatibility Composition.
1. NFKD — Normalization Form Compatibility Decomposition.

끝에 D가 들어간 2, 4번째는 분해를 시키고, C가 들어간 1, 3번째는 결합을 시켜요.
그런데 중간에 K가 들어간 3,4번째는 호환되는 다른 것으로 변경을 시킵니다.
아래의 예제를 보시면...

```js
// MDN에 있는 예시를 사용했습니다. 
// 출처 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
var str = '\u1E9B\u0323';
// '\u1E9B' 자체가 s 비슷한 모양과 그 위에 점까지 포함한 유니코드
// '\u0323' 는 아래에 찍히는 작은 점

console.log(str) // ẛ̣
console.log(str.normalize('NFC')) // ẛ̣ 이며'\u1E9B\u0323'
console.log(str.normalize('NFD')) // ẛ̣ 이며 점 두 개와 s비슷한 것을 분해한 총 3개의 유니코드 '\u017F\u0323\u0307' 
console.log(str.normalize('NFKC')) // ṩ 이며 중간에 s비슷한게 s로 변경된 새로운 유니코드 '\u1E69'
console.log(str.normalize('NFKD')) // ṩ 이며 NKFD와 생김세는 같으나, 그 유니코드를 분해한 값. '\u0073\u0323\u0307'

```
대략 이런 메소드입니다.
어때요 참 쉽죠?!


* 역자 주 : 2015.12.19일에 여기까지 번역했으며, 이하는 추후에 번역하고 
더 관심가는 다른 부분들부터 번역하려고 합니다..ㅠ_ ㅠ...
개인 공부가 주 목적인지라... 어쩔 수 없네요 하하핳... 쏘리 맨.


### The Regular Expression u Flag

(추후... 시작할 예정입니다.)
















































