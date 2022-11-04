// describe('Blog app', function() {
//   it('front page can be opened', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('blogs')
//     cy.contains('lew666')
//   })
// })

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.get('#loginform').within(() => {
      // at first both input elements are invalid
    //   cy.get('input:invalid').should('have.length', 2)
      cy.get('#username')
        .get('#password')
    })
  })

  describe('Login',function() {

    beforeEach(function() {
      cy.user({ username: 'llewellyn666' , name: 'lew' , password: '1234' })
      window.localStorage.removeItem('loggedNoteappUser')
    })
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'llewellyn666' , password: '1234' }).then(({ body }) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
        .contains('logged-in')
    })

    it('fails with wrong credentials',  function() {
      cy.login({ username: 'llewellyn667' , password: '1234' }).then((resp) => {
        expect(resp.status).to.eq(401)
      })
      //   cy.get('.error').should('contain', 'wrong credentials')
    })
  })


  describe('logged in',function(){
    beforeEach(function() {
      cy.user({ username: 'llewellyn666' , name: 'lew' , password: '1234' })
      window.localStorage.removeItem('loggedNoteappUser')
      cy.login({ username: 'llewellyn666' , password: '1234' }).then(({ body }) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(body))

      })
    })

    it('A blog can be created when logged in', function() {
      cy.createBlog({
        title: 'papie',
        author: 'linja',
        url: 'kaja.io',
        likes: 5 }).
        then(({ body }) => {
          expect(body.title).to.eq('papie')
          cy.visit('http://localhost:3000')
        })
    })

    it('user can like blog', async function() {
      const likes = 5
      cy.createBlog({
        title: 'papie',
        author: 'linja',
        url: 'kaja.io',
        likes: likes }).then(b => {
        cy.visit('http://localhost:3000')
        cy.contains('papie')
          .get('#blog')
          .get('#show').click()
          .get('#like').click()
        cy.contains('papie has been likel')

      })



    })
  })





})


