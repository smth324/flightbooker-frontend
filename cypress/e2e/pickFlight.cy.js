describe('test login', () => {
  it('test', () => {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const admin = {
      username: 'testUser',
      email: 'testEmail@gmail.com',
      password: 'testPassword',
    }
    cy.request('POST', 'http://localhost:3002/api/testing/admins', admin)

    cy.request('POST', 'http://localhost:3002/api/testing/places', { name: 'Iloilo (ILO) - Philippines' })
    cy.request('POST', 'http://localhost:3002/api/testing/places', { name: 'Manila (MNL) - Philippines' })

    cy.request('POST', 'http://localhost:3002/api/testing/routes', {
      originId: 1,
      destinationId: 2,
      price: 1000,
    })
    cy.visit('http://localhost:3000')
    cy.contains('Book Flight')
    cy.contains('Search Flight')
    cy.wait(2000)
    cy.get('#origin').type('Iloilo')
    cy.contains('Iloilo (ILO) - Philippines').click()
    cy.get('#destination').type('Manila')
    cy.contains('Manila (MNL) - Philippines').click()
    cy.get('#cabinClass').type('Premium Economy')
    cy.contains(/^Premium Economy$/).click()
    cy.contains('Search Flight').click()
    cy.contains('1. SELECT - DATES')
  })
})
