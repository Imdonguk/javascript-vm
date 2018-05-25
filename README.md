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
[] 구조적인 문제나 개선사항에 대한 고민 회고하기 
[O] 1차 리팩토링 진행
[O] 네이밍 네이밍 모델 변수 네임은  Model이 안 붙어 있어서 헷갈릴 수도 있다 Model 붙여놓기 -> 굳이 model들이 통일성을 갖추고 있어서 안 바꿔도 될 것 같다.
[] 나왔습니다 다음 알림 자동 없애기 
[] 고장이 나왔습니다 => 고장이면 실행이 안 되도록 설정
[O] 메소드들 중복 된 것들 수정 

매인은 아니지만 바꾸고 싶은 추가사항
[] 디자인 적 수정 
--[] 하이라이트 단순 빨간색 ... => 좀 예쁜 ui좀 찾아봐서 바꿔봐 !!! 
--[] 폰트 수정  

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


작은 범위로 개선 사항 or 설계 고민 

셀렉

### -- 코드 짜면서 이슈


### 순수함수

함수는 주어진 입력으로 계산하는 것 이외에 프로그램의 실행에 영향을 미치지 않아야 하며, 이를 부수 효과(side effect)가 없어야 한다고 한다. 이러한 함수를 순수 함수라고 한다. 이론은 쉬우나 구현은 조금은 다른것 같다.
  





