import React from "react"
import { exVatToIncVat, incVatToExVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      percentageVat: 25,
      inkVat: "",
      exkVat: "",
      userInputInkVat: false
    }
  }

  handleRadioChange = (event) => {
    const vat = Number(event.target.value)
    if (this.state.userInputInkVat) {
      this.setState({
        percentageVat: vat,
        exkVat: incVatToExVat(vat, this.state.inkVat)
      })
    } else {
      this.setState({
        percentageVat: vat,
        inkVat: exVatToIncVat(vat, this.state.exkVat)
      })
    }
  }

  handleInkVatChange = (event) => {
    const inkVat = Number(event.target.value)
    this.setState({
      inkVat,
      exkVat: incVatToExVat(this.state.percentageVat, inkVat).toFixed(2),
      userInputInkVat: true
    })
  }

  handleExkVatChange = (event) => {
    const exkVat = Number(event.target.value)
    this.setState({
      inkVat: exVatToIncVat(this.state.percentageVat, exkVat).toFixed(2),
      exkVat,
      userInputInkVat: false
    })
  }

  render() {
    return (
      <div className="App">
        <form>
          <div>
            <input
              id="option1"
              type="radio"
              value="25"
              checked={this.state.percentageVat === 25}
              onChange={this.handleRadioChange} />
            <label htmlFor="option1">25%</label>
          </div>

          <div>
            <input
              id="option2"
              type="radio"
              value="12"
              checked={this.state.percentageVat === 12}
              onChange={this.handleRadioChange} />
            <label htmlFor="option2">12%</label>
          </div>

          <div>
            <input
              id="option3"
              type="radio"
              value="6"
              checked={this.state.percentageVat === 6}
              onChange={this.handleRadioChange} />
            <label htmlFor="option3">6%</label>
          </div>

          <label htmlFor="ink">Inklusive moms (kr)</label>
          <input id="ink" type="number" value={this.state.inkVat} onChange={this.handleInkVatChange} />

          <label htmlFor="exk">Exklusive moms (kr)</label>
          <input id="exk" type="number" value={this.state.exkVat} onChange={this.handleExkVatChange} />

          <label htmlFor="moms">Momssumma (kr)</label>
          <input id="moms" type="number" readOnly="readonly" value={(this.state.inkVat - this.state.exkVat).toFixed(2)} />

        </form>
      </div>
    )
  }

}

export default App
