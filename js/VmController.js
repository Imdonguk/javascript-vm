/*
    ###controller의 역할
    지금까지 구현한 view클래스들과 model클래스는 독립적으로도 동작이 가능한 코드입니다. 
    각각 역할에 맞는 기능을 가지고 있습니다.
    하지만 각각 클래스는 서로에게 영향을 미치진 않지만 웹자판기 프로젝트는 
    한가지 기능을 실행하면 그 동작만 일어나는 게 아니라 연쇄로 여러가지 기능이 동작합니다.
    예를 들면 자판기에 금액을 insert하면 지갑의 돈이 줄어들고 자판기에 넣은 금액은 증가합니다.
    넣은 금액이 증가하면 구매 가능한 음료수가 표시됩니다.
    
    그래서 독립적인 기능들을 연결해줄 수 있는 역할이 필요한데
    그것이 컨트롤러에 역할이라고 생각합니다!
 */
export default class VmController {
  constructor(menuView, model, walletView, logView, ButtonView) {
    this.menuView = menuView;
    this.model = model;
    this.walletView = walletView;
    this.logView = logView;
    this.ButtonView = ButtonView;
  }
  initializeView() {
    this.walletView.setMoneyData(this.model.getMoneyData());
    this.walletView.moneyView();
  }
  initializeConnection() {
    this.walletView.insertCoinHandler = this.insertCoinHandler.bind(this);
    this.walletView.inputMoneyHandler = this.inputMoneyHandler.bind(this);
    this.walletView.returnMoneyHandler = this.returnMoneyHandler.bind(this);
    this.walletView.showNoMoneyHandler = this.showNoMoneyHandler.bind(this);

    this.ButtonView.selectItemHandler = this.selectItemHandler.bind(this);
    this.ButtonView.lackItemHandler = this.lackItemHandler.bind(this);
    this.ButtonView.stopReturnMoneyHandler = this.stopReturnMoneyHandler.bind(this);
  }
  insertCoinHandler(coin) {
    this.model.insertCoin(coin);
    this.walletView.setMoneyData(this.model.getMoneyData());
    this.logView.showMessage('INSERT_MONEY', coin);
  }
  inputMoneyHandler() {
    this.menuView.highlightMenu(this.model.getInputMoney());
  }
  showNoMoneyHandler(coin) {
    this.logView.showMessage('LACK_MONEY', coin);
  }
  selectItemHandler({ itemId, itemName, itemPrice }) {
    if (this.model.getInputMoney() < itemPrice) {
      this.logView.showMessage('LACK_INPUTMONEY');
      this.walletView.returnMoney();
      return;
    }
    this.model.selectItem(itemPrice);

    this.walletView.setMoneyData(this.model.getMoneyData());
    this.walletView.inputMoneyView();
    this.walletView.returnMoney();

    this.logView.showMessage('SELECT_ITEM', itemId, itemName);
  }
  lackItemHandler() {
    this.logView.showMessage('LACK_ITEM');
    this.walletView.returnMoney();
  }
  returnMoneyHandler() {
    const inputMoney = this.model.getInputMoney();
    if (inputMoney <= 0) return;
    this.logView.showMessage('RETURN_MONEY', inputMoney);
    this.model.returnMoney();
    this.walletView.setMoneyData(this.model.getMoneyData());
  }
  stopReturnMoneyHandler() {
    this.walletView.stopReturnMoney();
  }
}