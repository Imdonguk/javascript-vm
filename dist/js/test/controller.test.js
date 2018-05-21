const { $qs, $qsa, $on } = require('../helpers');
const VMController = require('../controller');
const VMView = require('../views');

describe('check methods in controller scripts files', () => {

  beforeAll(() => {
    document.body.innerHTML = `
    <div class="selector__status__wrapper">
      <p class="selector__status__coin">0</p>
      <button id="selector__button__confirm">버튼</button>
    </div>

    <ul class="selector__buttons__lists">
      <li class="selector__buttons__items">
        <button id="1">1</button>
      </li>
    </ul>
    `
  });

  test('activate button TEST', () => {
    // Given
    const vmView = new VMView();
    const vmControl = new VMController(vmView);
    const testResult = true;
    

    // When
    const testCode = vmControl.activateBtn();
    
    
    // Then
    expect(testCode).toBe(testResult);
  })
  test('select button TEST', () => {
    // Given
    const vmView = new VMView();
    const vmControl = new VMController(vmView);


    // When
    const ul = $qs('.selector__buttons__lists');
    const testCode = vmControl.selectBtns(ul)


    // then
    expect(testCode).toBeUndefined();
  })
});