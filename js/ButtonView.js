/*
    자판기에서 원하는 메뉴를 뽑기위한 버튼을 담당하는 view입니다.
    - 버튼을 클릭해서 메뉴를 고르게 되면 3초후에 선택한 메뉴가 나오게 됩니다.
*/
export default class ButtonView {
  constructor(delayTime) {
    this.itemId = "";
    this.lackItemHandler = null;
    this.selectItemHandler = null;
    this.stopReturnMoneyHandler = null;
    this.delayTime = delayTime;
    this.clickItemIdBtn();
  }
  clickItemIdBtn() {
    const itemIdBtn = document.querySelector('.select-button-part > ul');
    let delaySelectItemId = 0;

    itemIdBtn.addEventListener('click', ({ target }) => {
      if (target.tagName !== "LI") return;

      this.stopReturnMoneyHandler();
      clearTimeout(delaySelectItemId);
      this.combineItemId(target);

      delaySelectItemId = setTimeout(this.delayRun.bind(this), this.delayTime)
    })
  }
  delayRun() {
    const items = document.querySelectorAll('.items-box');
    if (this.lackItem(items)) return;

    this.selectItemHandler(this.searchItem(items));
    this.resetItemId();
  }
  lackItem(items) {
    if (items.length < this.itemId || this.itemId[0] === '0') {
      this.lackItemHandler();
      this.resetItemId();
      return true;
    }
  }
  searchItem(items) {
    const itemEl = items[this.itemId - 1];
    const itemName = itemEl.getAttribute('data-name');
    const itemPrice = itemEl.getAttribute('data-price');
    return { itemId: this.itemId, itemName: itemName, itemPrice: itemPrice }
  }
  resetItemId() {
    this.itemId = "";
  }
  combineItemId(target) {
    this.itemId += target.innerHTML;
  }
}