import WalletView from '../js/WalletView.js'
import ButtonView from '../js/ButtonView.js'
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

test('자판기에 동전을 넣을 시에 이벤트가 발생한다.', () => {

  //given
  let walletView = new WalletView();
  const initMoneyData = {
    yourMoney: 30000,
    inputMoney: 0,
    coinCount: { 10000: 1, 5000: 2, 1000: 5, 500: 8, 100: 10 }
  }
  walletView.inputMoneyHandler = jest.fn();
  walletView.insertCoinHandler = jest.fn();
  const stopReturnSpy = jest.spyOn(walletView, 'stopReturnMoney');
  const walletViewSpy = jest.spyOn(walletView, 'walletView');
  const evt = new Event('click', { bubbles: true });

  //when
  walletView.setMoneyData(initMoneyData);
  document.querySelector('.insert-coin-button').dispatchEvent(evt);

  //   //then
  expect(walletViewSpy).toBeCalled();
  expect(stopReturnSpy).toBeCalled();
  expect(walletView.insertCoinHandler).toBeCalled();
  expect(walletView.insertCoinHandler).toBeCalledWith(100);
  expect(true).toBe(true);
})

test('setTimeout과 clearTimeout 돈을 반환하지 않게하는 함수가 호출된다.', () => {

  //given
  document.body.innerHTML = `
  <div class="select-button-part"><ul>
  <li class="basic-button select-button">1</li>
  <li class="basic-button select-button">2</li>
  </ul></div>`
  const buttonView = new ButtonView('3000');
  buttonView.stopReturnMoneyHandler = jest.fn();
  const evt = new Event('click', { bubbles: true });

  //when
  jest.useFakeTimers();
  document.querySelector('.select-button').dispatchEvent(evt);

  //then
  expect(setTimeout).toBeCalled();
  expect(clearTimeout).toBeCalled();
  expect(buttonView.stopReturnMoneyHandler).toBeCalled();
})