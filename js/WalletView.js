/*
    돈에 관련된 view를 담당합니다.
    - 지갑에 있는 동전,지폐의 갯수와 총 금액, 자판기에 넣은 돈의 view에 보여줍니다.
    - 지갑에 있는 돈을 자판기에 넣는 동작을 수행합니다.
    - 돈을 반환하는 동작을 수행합니다.
*/
export default class WalletView {

  constructor(delayTime) {
    this.inputMoneyHandler = null;
    this.returnMoneyHandler = null;
    this.insertCoinHandler = null;
    this.showNoMoneyHandler = null;
    this.delayReturnMoneyId = 0;
    this.delayTime = delayTime;
    this.clickCoinBtns();
  }

  setMoneyData({ inputMoney, yourMoney, coinCount }) {
    this.inputMoney = inputMoney;
    this.yourMoney = yourMoney;
    this.coinCount = coinCount;
  }

  walletView() {
    document.querySelector(".your-money").innerText = this.yourMoney + "원";
  }

  inputMoneyView() {
    document.querySelector(".input-money").innerText = this.inputMoney + "원";
    this.inputMoneyHandler();
  }

  walletCoinView() {
    let insertCoinBtn = document.querySelectorAll(".insert-coin-button");
    insertCoinBtn.forEach(v => {
      v.nextElementSibling.innerHTML = this.coinCount[v.dataset.coin] + "개";
    })
  }

  moneyView() {
    this.walletView();
    this.inputMoneyView();
    this.walletCoinView();
  }

  clickCoinBtns() {
    const currentCoins = document.querySelector(".wallet > ul");
    currentCoins.addEventListener("click", ({ target }) => {

      if (!target.getAttribute("data-coin")) return;
      this.stopReturnMoney()

      const coin = +(target.getAttribute("data-coin"));
      if (!this.coinCount[coin]) {
        this.showNoMoneyHandler(coin);
        return;
      }
      this.insertCoinHandler(coin);
      this.moneyView();
    })
  }

  returnMoney() {
    this.delayReturnMoneyId = setTimeout(() => {
      this.returnMoneyHandler();
      this.moneyView();
    }, this.delayTime);
  }

  stopReturnMoney() {
    clearTimeout(this.delayReturnMoneyId);
  }
}