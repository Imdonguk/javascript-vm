// static data  snackList , vmButtonTextList , myMoney

const snackList = [
  { "id": 1, "name": "콜라", "price": 500, "working": true },
  { "id": 2, "name": "사이다", "price": 1000, "working": true },
  { "id": 3, "name": "파인애플맛 환타", "price": 400, "working": true },
  { "id": 4, "name": "포도맛 환타", "price": 300, "working": true },
  { "id": 5, "name": "레몬에이드", "price": 900, "working": true },
  { "id": 6, "name": "봉봉", "price": 1200, "working": true },
  { "id": 7, "name": "코코아주스", "price": 1000, "working": true },
  { "id": 8, "name": "콜라제로", "price": 1000, "working": true },
  { "id": 9, "name": "파워에이드", "price": 2000, "working": true },
  { "id": 10, "name": "초코우유", "price": 1000, "working": true },
  { "id": 11, "name": "초코우유2", "price": 700, "working": true },
  { "id": 12, "name": "초코우유3", "price": 600, "working": true },
  { "id": 13, "name": "딸바우유", "price": 1000, "working": true },
  { "id": 14, "name": "바나나우유", "price": 500, "working": true },
  { "id": 15, "name": "커피우유", "price": 1000, "working": true },
  { "id": 16, "name": "알로에", "price": 1200, "working": true },
  { "id": 17, "name": "콘칩", "price": 1000, "working": true },
  { "id": 18, "name": "새우깡", "price": 1000, "working": true },
  { "id": 19, "name": "감자칩", "price": 2000, "working": true },
  { "id": 20, "name": "칸쵸", "price": 1000, "working": true },
  { "id": 21, "name": "아몬드", "price": 450, "working": true },
  { "id": 22, "name": "다크초콜릿", "price": 1500, "working": true },
  { "id": 23, "name": "가나초콜릿", "price": 1200, "working": true },
  { "id": 24, "name": "견과류", "price": 900, "working": true },
  { "id": 25, "name": "육포", "price": 1000, "working": true },
  { "id": 26, "name": "오징어포", "price": 900, "working": true },
  { "id": 27, "name": "미니땅콩", "price": 4000, "working": true },
  { "id": 28, "name": "오징어", "price": 2300, "working": true },
  { "id": 29, "name": "{고장}", "price": 1000, "working": false },
  { "id": 30, "name": "신라면", "price": 700, "working": true },
  { "id": 31, "name": "진라면", "price": 800, "working": true },
  { "id": 32, "name": "포도맛 환타", "price": 1000, "working": true }
]

const buttonTextList = [1,2,3,4,5,6,7,8,9,0,"선택","취소"]

const myMoney = {
  100: 5,
  500: 5,
  1000: 5,
  5000: 2,
  10000: 2,
}

// class Wallet, vendingMachine, View

class WalletModel {
  constructor(myMoney){
    this.myMoney=myMoney;
    this.controller = null;
  }
  get totalMoney(){
    return Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
  }
  useMoney(data){
    if(this.myMoney[data.money]){
      this.myMoney[data.money]-=1;
      data.totalMoney = this.totalMoney
      data.moneyCount = this.myMoney[data.money]
      this.emit('reRenderWallet',data)
      return Number(data.money)
    }
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
}

class VendingMachineModel {
  constructor(snackList){
    this.money=0;
    this.snackList= snackList
    this.controller = null;
  }
  insertMoney(data){
    this.money += Number(data.money);
    data.insertedMoney = this.money
    this.emit('reRenderVendingMachineMoney', data)
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
}


// 
const capturedTargetElementName = (e, elementName) => e.target.localName===elementName

const isButton = e=> e.target.localName==='button'

class VendingMachineView {
  constructor(){
    this.snackListEl = this.getSearched('.snack-list')
    this.selectButtonsEl = this.getSearched('.number-buttons')
    this.moneyButtonListEl = this.getSearched('.money-button-list')
    this.myTotalMoneyEl = this.getSearched('.total-my-assets .money')
    this.insertedMoneyEl = this.getSearched('.diplay-inserted-money .money')
    this.controller = null;
  }
  getSearched(selector, target=document){
    return target.querySelector(selector);
  }
  updateText(el,updateText){
    return el.innerText = updateText;
  }
  setAttribute(el, attributesName, attributesValue){
    el.setAttribute(attributesName, attributesValue);
  }
  initRender(template, data){
    const {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate} = template
    const {snackList, buttonTextList, myMoney} = data
    this.snackListEl.insertAdjacentHTML('beforeend', snackTemplate(snackList))
    this.selectButtonsEl.insertAdjacentHTML('beforeend', selectButtonTemplate(buttonTextList))
    this.moneyButtonListEl.insertAdjacentHTML('beforeend', walletMoneyButtonTemplate(myMoney))
    this.myTotalMoneyEl.innerText = Object.keys(myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*myMoney[money]
    },0)
  }
  handleMoneyButtonClicked(e){
    if(!isButton(e)) return;
    const moneyCountEl = e.target.nextElementSibling
    const moneyCount =  Number(moneyCountEl.dataset.count)
    if(!moneyCount) return;
    const eventData = {
      money: e.target.dataset.money,
      moneyCountEl,
      totalMoneyEl: this.myTotalMoneyEl,
      insertedMoneyEl: this.insertedMoneyEl,
    }
    this.emit('useMoney', eventData)
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
  bindEvents(){
    this.selectButtonsEl.addEventListener('click', e =>this.handleSelectButtonClicked(e));
    this.moneyButtonListEl.addEventListener('click', e =>this.handleMoneyButtonClicked(e));
    return this;
  }
  handleSelectButtonClicked(e){
    if(!isButton(e)) return; 
  }
}

class VmController {
  constructor(vendingMachine,wallet,vendingMachineView){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.vendingMachineView = vendingMachineView;
  }
  catch(eventName, data){
    this[eventName](data)
  }
  useMoney(data){
    this.wallet.useMoney(data)
    this.insertMoney(data)
  }
  reRenderWallet(data){
    this.vendingMachineView.updateText(data.moneyCountEl, `${data.moneyCount}개`);
    this.vendingMachineView.setAttribute(data.moneyCountEl,'data-count',data.moneyCount);
    this.vendingMachineView.updateText(data.totalMoneyEl, data.totalMoney);
  }
  insertMoney(data){
    this.vendingMachine.insertMoney(data);
  }
  reRenderVendingMachineMoney(data){
    console.dir(data);
    this.vendingMachineView.updateText(data.insertedMoneyEl, `${data.insertedMoney}`)
  }
}

// template
const template = {
  snackTemplate: (snackList)=>{
    return snackList.reduce((ac,c)=>{
      return ac+=`<li class="snack-list-item">
          <div class="snack-name-container">
              <span class="snak-name">${c.name}</span>
          </div>
          <div class="label-price">
              <span class="snack-number">${c.id}</span>
              <span class="snack-price">${c.price}</span>
          </div>
        </li>`
    },'')
  },
  selectButtonTemplate: (buttonTextList)=> {
    return buttonTextList.reduce((ac,c)=>{
      return ac+=` <li><button class="select-button">${c}</button></li>`
    }, '');
  },
  walletMoneyButtonTemplate: (moneyObj)=> {
    return  Object.keys(moneyObj).reduce((ac,moneyKind)=>{
      return ac+=`<li class="wallet-money-button">
                    <button data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                    <span class="money-count" data-count="${moneyObj[moneyKind]}">${moneyObj[moneyKind]}개</span>
                  </li>`
    },'')
  }
};

//  make Instance

const vendingMachine = new VendingMachineModel(snackList);
const wallet = new WalletModel(myMoney);
const vendingMachineView = new VendingMachineView();
const vendingMachineController = new VmController(vendingMachine,wallet, vendingMachineView);
vendingMachine.controller = vendingMachineController;
wallet.controller = vendingMachineController;
vendingMachineView.controller = vendingMachineController;


// event design






// Rendering

/// event
  
const insertMoney = (e)=>{
  if(!capturedTargetElementName(e,'button')) return;
  const choseMoney =e.target.dataset.money
  const moneyCountElement = e.target.nextElementSibling
  let moneyCount = wallet.myMoney[choseMoney]
  if(moneyCount){
    const willInsertMoney = wallet.useMoney(choseMoney)
    moneyCountElement.innerText=`${wallet.myMoney[choseMoney]}개`
    vendingMachine.insertMoney(willInsertMoney);
    view.updateText('.total-my-assets .money', wallet.totalMoney)
    view.updateText('.diplay-inserted-money .money', vendingMachine.money)
  }
}

/// domLoad

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  // rendering 
  const renderingData = {
    snackList,
    buttonTextList,
    myMoney,
  }
  vendingMachineView.initRender(template, renderingData)
  vendingMachineView.bindEvents()
});

 
// 1. Eventclick된다 거른다
// 2. 보낸다 컨트롤러에게
// 3. 컨트롤러는 받는다 이벤트 이름과 data를 받는다 
// 4. 받은 것에 매칭되는 모델ex  wallet 에게 보내준디 
// 5. 모델은 이벤트를 받고 UseMoney 를 해준다
// 6. Update가 되면









