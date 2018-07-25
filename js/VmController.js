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
class VmController{
    constructor(model, coinCountView, moneyView){
        this.model = model;
        this.coinCountView = coinCountView;
        this.moneyView = moneyView;
        this.coinCountView.insertCoinHandler = this.insertCoinHandler.bind(this);
    }
    insertCoinHandler(coin){
        this.model.insertCoin(coin);
        this.moneyView.yourMoney = this.model.getYourMoney();
        this.moneyView.inputMoney = this.model.getInputMoney();
        this.moneyView.walletView();
        this.moneyView.inputMoneyView();
    }
}