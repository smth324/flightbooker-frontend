import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import InfoBox from './InfoBox'

test('InfoBox renders content correctly', () => {
  const msg = (
    <div>
      hello does this work lol
    </div>
  )

  render(<InfoBox message={msg} />)

  const infoBox = screen.getByText('hello does this work lol')
  expect(infoBox).toHaveTextContent(
    'hello does this work lol',
  )
})
