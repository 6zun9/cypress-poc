describe('Input Form', () => {
  beforeEach(() => {
    // cy.visit('/');
    // cy.server()
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo');
  })

  it('accepts input', () => {
    const typedText = 'Buy Milk'
    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission', () => {
    it('Adds new todo on submit', () => {
      const itemText = 'Buy eggs';
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false,
      })

      cy.get('.new-todo')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '')

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })
  })

  it.only('Shows an error message on a failed submission', () => {
    cy.route({
      url: 'http://localhost:3030/api/todos',
      method: 'POST',
      status: 500,
      response: {}
    })

    cy.get('.new-todo')
      .type('test')
      .type('{enter}')

    cy.get('.todo-list li')
      .should('not.exist')

    cy.get('.error')
      .should('be.visible')
  })
})