import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import CalendarView from './CalendarView'
import FormDataProvider from '../../../../contexts/FormDataContext'

describe('CalendarView', () => {
  const flights = [
    {
      id: 1,
      departureDate: new Date().toISOString(),
      arrivalDate: '2022-07-20T11:20:46.000Z',
      route: {
        id: 1,
        active: true,
        price: 3000,
        origin: {
          id: 1,
          name: 'Iloilo City (ILO) - Philippines',
          active: true,
        },
        destination: {
          id: 2,
          name: 'Manila City (MNL) - Philippines',
          active: true,
        },
      },
      plane: {
        id: 1,
        name: 'PR 240',
        active: true,
        model: {
          id: 1,
          name: 'A380',
          passengerCapacity: 200,
          cargoCapacity: 5000,
          active: true,
        },
      },
      vacant: 200,
      price: 3000,
    },
  ]
  const history = createMemoryHistory()
  let container

  beforeEach(() => {
    container = render(
      <FormDataProvider>
        <Router
          location={history.location}
          navigator={history}
        >
          <CalendarView flights={flights} />
        </Router>
      </FormDataProvider>,
    ).container
    history.push('/selection/select/calendar')
  })
  test('CalendarView renders content correctly', () => {
    const calendarView = container.querySelector('#calendar-view')
    expect(calendarView).toHaveTextContent(
      'Please select departure date',
    )
  })
  test('can select the date', async () => {
    const selected = screen.getByText('3000')
    await userEvent.click(selected)
    const dateBox = container.querySelector('#selected-box')
    dateBox.querySelector('#check-circle')

    const continueButton = container.querySelector('#continue-button')
    await userEvent.click(continueButton)
    expect(history.location.pathname).toBe('/selection/select/times')
  })
})
