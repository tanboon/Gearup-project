describe('Testing story US1-3 : Provider edit car', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("providercypress@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("ProviderCypress69")
    cy.get('button').click()
    cy.visit('http://localhost:3000/info')
    cy.get('#edit').click()
  })
  
  it('TC3-1 : Brand is missing', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //brand
    cy.get('#brand').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC3-2 : Model is missing', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //model
    cy.get('#model').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   
   ////////////////////////////////////////////////////////////////////////

   it('TC3-3 : Year is missing', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //year
    cy.get('#year').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC3-4 : Color is missing', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //color
    cy.get('#color').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC3-5 : Fee Per Day is missing', () => {

    //feeperday
    cy.get('#feeperday').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC3-6 : Cover Picture is missing', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //coverpicture
    cy.get('#cover').clear()

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Cover Picture is missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC3-7 : Edit Car Successful', () => {
    //feeperday
    cy.get('#feeperday').clear().type("80,000")

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Good job!')
   })
})