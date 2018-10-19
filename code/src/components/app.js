import React from "react"
import { exVatToIncVat, incVatToExVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      percentageVat: 25,
      customPercentage: 0,
      incVat: "",
      exVat: "",
      userInputIncVat: false
    }
  }

  handleRadioChange = (event) => {
    const vat = Number(event.target.value)

    if (this.state.userInputIncVat) {
      this.setState({
        percentageVat: vat,
        exVat: incVatToExVat(vat, this.state.incVat).toFixed(2)
      })
    } else {
      this.setState({
        percentageVat: vat,
        incVat: exVatToIncVat(vat, this.state.exVat).toFixed(2)
      })
    }
  }

  handleIncVatChange = (event) => {
    const incVat = Number(event.target.value)
    this.setState({
      incVat,
      exVat: incVatToExVat(this.state.percentageVat, incVat).toFixed(2),
      userInputIncVat: true
    })
  }

  handleExVatChange = (event) => {
    const exVat = Number(event.target.value)
    this.setState({
      incVat: exVatToIncVat(this.state.percentageVat, exVat).toFixed(2),
      exVat,
      userInputIncVat: false
    })
  }

  setCustomPercentage = (event) => {
    const customPercentage = Number(event.target.value)
    this.setState({
      customPercentage,
      percentageVat: customPercentage
    })
    this.handleRadioChange(event)
  }

  handleFocus = (event) => {
    event.target.select()
  }

  render() {
    return (
      <div className="app">
        <h1>Momskalkylator</h1>
        <form>
          <div className="radio-container">
            <input
              id="option1"
              type="radio"
              value="25"
              checked={this.state.percentageVat === 25}
              onChange={this.handleRadioChange} />
            <label htmlFor="option1">25%</label>
          </div>

          <div className="radio-container">
            <input
              id="option2"
              type="radio"
              value="12"
              checked={this.state.percentageVat === 12}
              onChange={this.handleRadioChange} />
            <label htmlFor="option2">12%</label>
          </div>

          <div className="radio-container">
            <input
              id="option3"
              type="radio"
              value="6"
              checked={this.state.percentageVat === 6}
              onChange={this.handleRadioChange} />
            <label htmlFor="option3">6%</label>
          </div>

          <div className="radio-container">
            <input
              id="option4"
              type="radio"
              value={`${this.state.customPercentage}`}
              checked={this.state.percentageVat === Number(`${this.state.customPercentage}`)}
              onChange={this.handleRadioChange}
              onClick={this.setCustomPercentage} />
            <label htmlFor="option3">
              <input
                id="customPercentage"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="0"
                value={this.state.customPercentage}
                onChange={this.setCustomPercentage}
                onFocus={this.handleFocus} />
            </label>
          </div>

          <div className="text-container">
            <label htmlFor="incVat">Inklusive moms (kr)</label>
            <input
              id="incVat"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="0"
              value={this.state.incVat}
              onChange={this.handleIncVatChange}
              onFocus={this.handleFocus} />
          </div>

          <div className="text-container">
            <label htmlFor="exVat">Exklusive moms (kr)</label>
            <input
              id="exVat"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="0"
              value={this.state.exVat}
              onChange={this.handleExVatChange}
              onFocus={this.handleFocus} />
          </div>

          <div className="text-container">
            <label htmlFor="vat">Momssumma (kr)</label>
            <input
              id="vat"
              type="text"
              readOnly="readonly"
              value={(this.state.incVat - this.state.exVat).toFixed(2)} />
          </div>

        </form>
      </div>
    )
  }

}

export default App
