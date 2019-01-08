import WalletView from '../js/WalletView.js'
document.body.innerHTML = `
<div class='input-money'></div>
<div class='your-money'></div>
<div class='wallet'><ul>
    <li>
        <div data-coin="100" class="insert-coin-button">100원</div>
        <div class="current-coin-count"></div>
    </li>
</ul></div>
`
let walletView = new WalletView();
const initMoneyData = {
  yourMoney: 30000,
  inputMoney: 0,
  coinCount: { 10000: 1, 5000: 2, 1000: 5, 500: 8, 100: 10 }
}

function initialize() {
  walletView = new WalletView();
  walletView.inputMoneyHandler = jest.fn();
  walletView.returnMoneyHandler = jest.fn();
  walletView.insertCoinHandler = jest.fn();
  walletView.showNoMoneyHandler = jest.fn();
  walletView.setMoneyData(initMoneyData);
}

beforeEach(initialize);
afterAll(() => {
  jest.useRealTimers();
})
describe("WalletView Unit TEST", () => {

  test('총액 30000원이 view에 30000만원이 잘 있는 지 확인한다.', () => {
    //when
    walletView.walletView();
    const yourMoney = document.querySelector('.your-money').innerText;
    //then
    expect('30000원').toBe(yourMoney);
  })
  test('자판기에 넣은 금액이 0원인지 확인한다.', () => {
    //when
    walletView.inputMoneyHandler = jest.fn();
    walletView.inputMoneyView();
    const inputMoney = document.querySelector('.input-money').innerText;
    //then
    expect('0원').toBe(inputMoney);
  })
  test('자판기의 동전의 갯수가 맞는지 확인한다.', () => {
    //when
    walletView.walletCoinView();
    const firstCoinCount = document.querySelector('.current-coin-count').innerHTML;
    //then
    expect(firstCoinCount).toBe('10개');
  })
})

describe('금액 반환 시 TEST', () => {
  //given
  jest.useFakeTimers();

  test('금액 반환시에 setTimeout이 호출된다.', () => {
    //when
    walletView.returnMoney();
    //then
    expect(setTimeout).toBeCalled();
  })
  test('금액 반환을 멈추고 싶을 때 clearTimeout이 호출된다.', () => {
    //when
    walletView.stopReturnMoney();
    //then
    expect(clearTimeout).toBeCalled();
  })
  test('금액 반환시에 이벤트핸들러함수가 호출된다', () => {
    //given
    const walletViewSpy = jest.spyOn(walletView, 'walletView');
    walletView.returnMoneyHandler = jest.fn();
    //when
    walletView.returnMoney();
    jest.runAllTimers();
    //then
    expect(walletViewSpy).toBeCalled();
    expect(walletView.returnMoneyHandler).toBeCalled();
  })
  test('동전버튼이 아닌 것을 click하면 콜백함수안에 있는 함수가 호출되지 않는다.', () => {
    //given
    const spy = jest.spyOn(walletView, 'stopReturnMoney');
    const evt = new Event('click', { bubbles: true });
    //when
    document.querySelector(".current-coin-count").dispatchEvent(evt);
    //then
    expect(spy).not.toBeCalled();
  })
})