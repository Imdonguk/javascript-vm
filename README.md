# javascript-vm
레벨3
### MVC 패턴 설계 하기 
 Model 

VendingMachineModel
WalletModel
View

vendingMachineView 

### todo 체크리스트 

[O] mvc나 구조적인 부분에서 질문 하기 
[O] 구조적인 문제나 개선사항에 대한 고민 회고하기 계속하기  
[O] 1차 리팩토링 진행
[O] 네이밍 네이밍 모델 변수 네임은  Model이 안 붙어 있어서 헷갈릴 수도 있다 Model 붙여놓기 -> 굳이 model들이 통일성을 갖추고 있어서 안 바꿔도 될 것 같다.

[O] 고장이 나왔습니다 => 고장이면 실행이 안 되도록 설정
[O] 메소드들 중복 된 것들 수정 

추가 나왔습니다 알림 
[O] 나왔습니다 다음 알림  시간 지난 후 자동 없애기 

### 체크리스트 추가

[O] 버튼 블락 알림은 세자릿수를 클릭했을 떄 블락되고 알림을 나오도록 수정 => 
[O] 뷰에 다른 뷰에서도 쓸 수 있는 메소드들 유틸로 분리하기! 
[O] spread활용하여 Array.prototype -> 이런 부분 줄이기 
[O] '선택' '취소' 등 뷰에서 텍스트에 바인딩 되지 않고 좀 더 재사용성 있게 하도록 이런 부분들 찾아보고 수정
[O] 선택 버튼 클릭시 0이 선택 되었을 때는 아무것도 선택하지 않았다는 알림 
[O] 버튼 블락 없이 입력될 따 마다 마지막 자리수가 앞으로 땡겨지고 두자리수로만 기록하는 형식으로 수정  
[O] 버튼 포인터가 나오도록 추가 
...

[] html 메타 태그 크롱 링크 보고 반영해서 수정 
[참고](https://sympli.io/blog/2017/07/13/which-meta-tags-should-you-be-using-in-2017/)
[] 돈 입력된 로그도 몇 초 후에 사라지도록 
[] 돈 반환 기능 추가 
[] notify 추가 메시지 가운데 정렬이 안되고 있음 ! 
[] 변화가 일어날 때 하이라이트 추가 
...

* 체크리스트가 -> 테스트코드랑 비슷하도록 



### 추가 구현

[] 정적 테이터 모델 클래스로 빼서 받아오는 형태로 수정 

매인은 아니지만 바꾸고 싶은 추가사항
[] 선택 키보드 입력도 받도록 수정 
[] 디자인 적 수정 
--[] 하이라이트 단순 빨간색 ... => 좀 예쁜 ui좀 찾아봐서 바꿔봐 !!! 
--[] 폰트 수정  
[] 유틸 네이밍 크기 단축표기로 수정

### 추추가 구현 

* three.js사용 3d 자판기 만들어보기 
* 완성 후에 도전 해볼 것 !

### 구조적인 문제나 개선사항에 대한 고민 회고하기

지금 구조 
- 정적  data 
- View, Controller, Model
- vendingMachine.js -> asset 
1. dom contentRoad될 때 렌더링 및 이벤트 바인드

- M,V 를 어떻게 의존하지 않고 잘 나눌것인가?

지금과 같이 중간에서 비둘기 처럼 전달해주는 역할을 하는 컨트롤러를 만들어서 의존성을 줄일 수 있다. 
지금과 같은 구조인 경우 ui만 달라지고 기능이 비슷한 처리를 하는 경우 대체로 많은 수정 없이 재사용성이 가능할 것이라고 봅니다.

- 각각 테스트 가능한 코드를 만들려면 어떻게 해야할까? 내가 만든 구조가 테스트 가능한가?

순수한 함수 및 기능이 한 가지만 하는 함수여야 한다 !
- 순수함수인지 
- 한 가지 기능만 하는 함수들인지 
-- 컨트롤러 메소드들은 단순히 넘겨주기 때문에 한 가지 일들만 한다.

- 가장 변화가 심할 예정인 부분은 무엇인가? 그것은 다른 클래스(mvc끼리나 v끼리등)를 의존하지 않고 있어서 수정이 용이한가?
-- 가장 변화가 심한 부분은 상품을 선택할 때 
데이터 변동도 많고 버튼 / 타이머 등 컨트롤 해주는 부분이 많기 때문에 

- 또 다른 부분 구조 분석 해서 찾아보기 

* 순수 함수 알아보고 공부하기 input -> output 원본을 변화시키지 않고 새로운 값을 가져다 주는 함수?
배열 정보를 변화시킬 때 concat 이랑 slice를 이용해서 새로운 것을 가져다 넣은 점과 
각각의 처리가 그래도 분리가 되어 있는 것 같다.


### 발견된 이슈 

[O] 돈 버튼 갯수 span 클릭 했을 때 콘솔에 뜨는 에러 `view.js:42 Uncaught TypeError: Cannot read property 'dataset' of null` => if(!==) if(!el==) 조건을 잘 못 사용함 !
[]막 누르다가 간혹 번호들이 다 로그창으로 들어가는 경우가 있는데 원인을 찾지 못하겠다.
### 디버깅 

* brakpoint 조건문을 걸을 수 있다 ! 조건 발동시 debugger




* 막상 여러번 테스트를 해보니까 굳이 버튼 블락기능을 할 필요가 없었을 것 같다. 
그정도는 알아서 파악도 쉽게 가능한면도 있고, 오히려 블락이 되니 사용자 입장에서도 막는 느낌이 있어서 블락이 아니라 기존 번호에 마지막으로 계속 업데이트 되도록 하는 편이 훨씬 나을 것 같다. 
-> 만든 것을 여러가지 동작 시켜보자... 

### 순수함수

함수는 주어진 입력으로 계산하는 것 이외에 프로그램의 실행에 영향을 미치지 않아야 하며, 이를 부수 효과(side effect)가 없어야 한다고 한다. 이러한 함수를 순수 함수라고 한다. 이론은 쉬우나 구현은 조금은 다른것 같다.







### 오늘의 링크 줍줍 

[포트폴리오](https://youtu.be/rquI6w4gLIs)

포플은 단순 통과용 => 면접에서 얼마나 인상을 잘 줄지에 대해서 더 신경을 쓰라 
질문이 오갔을 때 핑퐁 하며 답변으로 날 매력+ 실력있는 사람이란 것을 잘 표현 
내 생각을 묻는 과정 




