import React, { useState } from 'react'
import './PassengerButton.css'

// Makes an input like mui autocomplete but has different popper content

const PassengerInput = ({ passenger, switchHidden }) => (
  <>
    <label data-shrink="true" className="label">
      Passenger Type
    </label>
    <div className="qwe" onClick={switchHidden} role="button" tabIndex={0} onKeyDown={switchHidden}>
      <input style={{ cursor: 'default' }} value={`${parseInt(passenger.adult, 10) + parseInt(passenger.child, 10)} Passenger (s)`} readOnly className="inputer" />
      <div className="svgcont">
        <button type="button" className="svgbutton">
          <svg className="svgasd">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>
    </div>
  </>
)

const PassengerButton = ({ passenger, setPassengers }) => {
  const [hidden, setHidden] = useState(true)

  const switchHidden = () => {
    setHidden(!hidden)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setHidden(true)
  }

  return (
    <div className="MuiAutocomplete-root MuiAutocomplete-hasPopupIcon css-16awh2u-MuiAutocomplete-root main-book-form-input">
      <div className="asd">
        <PassengerInput passenger={passenger} switchHidden={switchHidden} />
        <div hidden={hidden} className="MuiAutocomplete-popper css-bckmzb-MuiAutocomplete-popper book-form-passenger-input-popper">
          <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper book-form-passenger-input-popper-contents">
            <div>
              <p>
                You can select a maximum of
                <strong> 9 passengers </strong>
                in all classes.
              </p>
            </div>
            <div>
              <label>Adult (12y +)</label>
              <select style={{ float: 'right', marginRight: 20 }} value={passenger.adult} onChange={(event) => (parseInt(event.target.value, 10) + parseInt(passenger.child, 10) < 9 ? setPassengers({ ...passenger, adult: parseInt(event.target.value, 10) }) : setPassengers({ ...passenger, adult: 9 - parseInt(passenger.child, 10) }))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div>
              <label>Children (2y - 11y)</label>
              <select style={{ float: 'right', marginRight: 20 }} value={passenger.child} onChange={(event) => (parseInt(event.target.value, 10) + parseInt(passenger.adult, 10) < 9 ? setPassengers({ ...passenger, child: parseInt(event.target.value, 10) }) : setPassengers({ ...passenger, child: 9 - parseInt(passenger.adult, 10) }))}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div>
              <button type="submit" onClick={handleSubmit} className="book-form-passenger-input-submit">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengerButton
