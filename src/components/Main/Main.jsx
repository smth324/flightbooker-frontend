import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import SelectionPage from './SelectionPage'
import FormDataProvider from '../../contexts/FormDataContext'
import './Main.css'

const Main = () => {
  const [flights, setFlights] = useState([])

  return (
    <div className="App">
      <FormDataProvider>
        <Routes>
          <Route path="/" element={<MainPage setFlights={setFlights} />} />
          <Route path="/selection/*" element={<SelectionPage flights={flights} setFlights={setFlights} />} />
          <Route
            path="*"
            element={(
              <div>
                Not Found
                <a href="/">back to home</a>
              </div>
            )}
          />
        </Routes>
      </FormDataProvider>
    </div>
  )
}

export default Main
