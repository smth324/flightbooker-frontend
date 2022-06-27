import React, { useState, useContext } from 'react'

export const FormDataContext = React.createContext()
export const FormDataUpdateContext = React.createContext()

export const useFormData = () => useContext(FormDataContext)
export const useFormDataUpdate = () => useContext(FormDataUpdateContext)

const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    child: 0,
    adult: 1,
    origin: null,
    destination: null,
    departureDate: new Date().toISOString(),
    newDepartureDate: new Date().toISOString(),
    returnDate: new Date().toISOString(),
    cabinClass: null,
  })

  return (
    <FormDataContext.Provider value={formData}>
      <FormDataUpdateContext.Provider value={setFormData}>
        {children}
      </FormDataUpdateContext.Provider>
    </FormDataContext.Provider>
  )
}

export default FormDataProvider
