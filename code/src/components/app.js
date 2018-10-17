import React from "react"
import { exVatToIncVat, incVatToExVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      percentageVat: 25,
      incVat: "",
      exkVat: "",
      userInputIncVat: false
    }
  }

  handleRadioChange = (event) => {
    const vat = Number(event.target.value)
    if (this.state.userInputIncVat) {
      this.setState({
        percentageVat: vat,
        exkVat: incVatToExVat(vat, this.state.incVat).toFixed(2)
      })
    } else {
      this.setState({
        percentageVat: vat,
        incVat: exVatToIncVat(vat, this.state.exkVat).toFixed(2)
      })
    }
  }

  handleIncVatChange = (event) => {
    const incVat = Number(event.target.value)
    this.setState({
      incVat,
      exkVat: incVatToExVat(this.state.percentageVat, incVat).toFixed(2),
      userInputIncVat: true
    })
  }

  handleExkVatChange = (event) => {
    const exkVat = Number(event.target.value)
    this.setState({
      incVat: exVatToIncVat(this.state.percentageVat, exkVat).toFixed(2),
      exkVat,
      userInputIncVat: false
    })
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

          <div className="text-container">
            <label htmlFor="incVat">Inklusive moms (kr)</label>
            <input
              id="incVat"
              type="number"
              value={this.state.incVat}
              onChange={this.handleIncVatChange} />
          </div>

          <div className="text-container">
            <label htmlFor="exVat">Exklusive moms (kr)</label>
            <input
              id="exVat"
              type="number"
              value={this.state.exkVat}
              onChange={this.handleExkVatChange} />
          </div>

          <div className="text-container">
            <label htmlFor="vat">Momssumma (kr)</label>
            <input
              id="vat"
              type="number"
              readOnly="readonly"
              value={(this.state.incVat - this.state.exkVat).toFixed(2)} />
          </div>

        </form>
      </div>
    )
  }

}

export default App
