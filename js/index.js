import { itemData } from './itemData.js'
import LogView from './LogView.js'
import MenuView from './MenuView.js'
import WalletView from './WalletView.js'
import ButtonView from './ButtonView.js'
import { templateItemList } from './Template.js'
import VmController from './VmController.js'
import VmModel from './VmModel.js'

const walletData = {
  10000: 1,
  5000: 2,
  1000: 5,
  500: 8,
  100: 10
}

function init() {
  const logingBox = document.querySelector('.print-action');
  const itemList = templateItemList(itemData);
  const menuView = new MenuView(itemList);
  const vmModel = new VmModel(walletData);
  const walletView = new WalletView('3000');
  const logView = new LogView(logingBox);
  const buttonView = new ButtonView('3000');
  const vmController = new VmController(menuView, vmModel, walletView, logView, buttonView);
  vmController.initializeConnection();
  vmController.initializeView();
}
document.addEventListener('DOMContentLoaded', init);