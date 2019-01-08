import ButtonView from '../js/ButtonView.js'

document.body.innerHTML = `
<div data-name='콜라' data-id=1 data-price=500 class = 'items-box' ></div>
<div data-name='사이다' data-id=2 data-price=1000 class = 'items-box' ></div>
<div data-name='마이구미' data-id=12 data-price=800 class = 'items-box' ></div>

<div class="select-button-part"><ul>
<li class="basic-button select-button">1</li>
<li class="basic-button select-button">2</li>
</ul></div>
`

let buttonView = new ButtonView('3000');
const target = document.querySelectorAll('.select-button');
const items = document.querySelectorAll('.items-box');
beforeEach(() => {
  buttonView = new ButtonView();
  buttonView.lackItemHandler = jest.fn();
  buttonView.selectItemHandler = jest.fn();
  buttonView.stopReturnMoneyHandler = jest.fn();
})
describe('ButtonView unit test', () => {

  beforeEach(() => {
    buttonView.resetItemId();
  })

  test('아이템번호를 합쳐주고 저장해준다.', () => {
    //when
    buttonView.combineItemId(target[0]);
    buttonView.combineItemId(target[1]);
    //then
    expect('12').toBe(buttonView.itemId);
  })
  test('아이템번호를 리셋한다.', () => {
    //given
    buttonView.itemId = '10';
    //when
    buttonView.resetItemId();
    //then
    expect('').toBe(buttonView.itemId);
  })
  test('해당번호의 아이템의 이름과 가격을 찾는다', () => {
    //given
    buttonView.itemId = '1';
    //when
    const result = buttonView.searchItem(items);
    //then
    expect({ itemId: '1', itemName: '콜라', itemPrice: '500' }).toEqual(result);
  })
  test('해당번호의 아이템이 없을 때 true가 반환되고 이벤트핸들러 함수가 발생한다.', () => {
    //given
    const resetHandlerSpy = jest.spyOn(buttonView, 'resetItemId');
    buttonView.itemId = '150';
    //when
    const result = buttonView.lackItem(items);
    //then
    expect(resetHandlerSpy).toBeCalled();
    expect(buttonView.lackItemHandler).toBeCalled();
    expect(true).toBe(result);
  })
  describe('아이템을 선택할 때 이벤트핸들러 함수가 발생한다.(setTimeout의 callback함수)', () => {

    test('없는 번호의 아이템일 경우 이벤트핸들러 함수가 발생하지 않는다.', () => {
      //given
      buttonView.itemId = '200';
      //when
      buttonView.delayRun();
      //then
      expect(buttonView.selectItemHandler).not.toBeCalled();
    })
    test('자판기에 있는 번호를 입력할 경우 정상적으로 동작한다.', () => {
      //given
      buttonView.itemId = '1';
      const resetHandlerSpy = jest.spyOn(buttonView, 'resetItemId');
      //when
      buttonView.delayRun();
      //then
      expect(buttonView.selectItemHandler).toBeCalled();
      expect(buttonView.selectItemHandler).
        toBeCalledWith({ itemId: '1', itemName: '콜라', itemPrice: '500' })
      expect(resetHandlerSpy).toBeCalled();
    })
  })
  test('tagName이 LI가 아니면 동작이 일어나지 않는다.', () => {
    //given
    const evt = new Event('click', { bubbles: true });
    const itemBtn = document.querySelector('.select-button-part>ul');
    itemBtn.insertAdjacentHTML('beforeend', '<div></div>');
    //when
    itemBtn.querySelector('div').dispatchEvent(evt);
    //then
    expect(buttonView.stopReturnMoneyHandler).not.toBeCalled();
  })
})