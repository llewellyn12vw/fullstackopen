Cypress.Commands.add('user', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username, name, password
  }).then(({ body }) => {
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({ method: 'POST', url: 'http://localhost:3003/api/login', failOnStatusCode: false ,body: {
    username, password
  } })
})

Cypress.Commands.add('createBlog', ( { title,auhtor,url,likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,auhtor,url,likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })
})
