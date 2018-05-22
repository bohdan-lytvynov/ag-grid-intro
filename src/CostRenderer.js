export default class {
  init({value}) {
    this.eGui = document.createElement('div')

    this.eGui.innerHTML = `
      <img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/dollar_money_cash_investment-512.png" style="width:20px"/>
      <span>${value}</span>
    `
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
  }
}
