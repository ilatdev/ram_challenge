/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Test API RAM', () => {
  before(function () {
    cy.request('/api/ram').its('body').as('response')

    cy.get('@response').its('length').should('eq', 2)
    cy.get('@response').its(0).as('exerciseOne')
    cy.get('@response').its(1).as('exerciseTwo')

    cy.get('@exerciseOne').should(
      'have.all.keys',
      'exercise_name',
      'in_time',
      'results',
      'time'
    )

    cy.get('@exerciseTwo').should(
      'have.all.keys',
      'exercise_name',
      'in_time',
      'results',
      'time'
    )
  })

  describe('Test Suits by Excersice', () => {
    it('Testing Excersice One', function () {
      cy.wrap(this.exerciseOne)
        .its('exercise_name')
        .should('eq', 'Char counter')
      cy.wrap(this.exerciseOne).its('in_time').should('eq', true)
      cy.wrap(this.exerciseOne).its('results').should('have.length', 3)
      cy.wrap(this.exerciseOne)
        .its('results')
        .its(0)
        .should('deep.equal', { char: 'l', count: 82, resource: 'location' })
      cy.wrap(this.exerciseOne)
        .its('results')
        .its(1)
        .should('deep.equal', { char: 'e', count: 88, resource: 'episode' })
      cy.wrap(this.exerciseOne)
        .its('results')
        .its(2)
        .should('deep.equal', { char: 'c', count: 494, resource: 'character' })
    })

    it('Testing Excersice Two', function () {
      cy.wrap(this.exerciseTwo)
        .its('exercise_name')
        .should('eq', 'Episode locations')
      cy.wrap(this.exerciseTwo).its('in_time').should('eq', true)
      cy.wrap(this.exerciseTwo).its('results').should('have.length', 51)
      cy.wrap(this.exerciseTwo)
        .its('results')
        .its(23)
        .should('deep.equal', {
          count: 3,
          episode: 'S03E03',
          locations: [
            'Citadel of Ricks',
            'Earth (Replacement Dimension)',
            'unknown'
          ],
          name: 'Pickle Rick'
        })
    })
  })
})
