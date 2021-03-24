describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      name: 'Alpo Panula',
      username: 'alpo-p',
      password: 'alpo-p'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.reload()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alpo-p')
      cy.get('#password').type('alpo-p')
      cy.get('#login-button').click()
      cy.contains('Alpo Panula logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vaaratunnus')
      cy.get('#password').type('vaarasalasana')
      cy.get('#login-button').click()
      cy.contains('Incorrect username or password!')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.reload()
      cy.login({ username: 'alpo-p', password: 'alpo-p' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('otsikko')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('nettisivu')
      cy.get('#create-button').click()
      cy.contains('otsikko')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'otsikko',
          author: 'kirjoittaja',
          url: 'nettisivu'
        })
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('user can delete their blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'otsikko')
      })
    })

    describe('and multiple blogs exist with different amount of likes', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blogi1',
          author: 'kirjoittaja1',
          url: 'sivu1',
          likes: 42
        })
        cy.createBlog({
          title: 'blogi2',
          author: 'kirjoittaja2',
          url: 'sivu2',
          likes: 7
        })
        cy.createBlog({
          title: 'blogi3',
          author: 'kirjoittaja3',
          url: 'sivu3',
          likes: 49
        })
      })

      it('blog with most likes is first', function() {
        cy.get('#blog').contains('blogi3')
      })

    })

  })

})