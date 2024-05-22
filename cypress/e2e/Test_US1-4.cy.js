describe('Testing story US1-4 : Provider remove car', () => {

    it('TC4-1 : The car has been booked by the user',() => {
        cy.visit('http://localhost:3000/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type("providercypress2@gmail.com")
        cy.get('#input-password-for-credentials-provider').type("ProviderCypress69")
        cy.get('button').click()
        cy.visit('http://localhost:3000/info')
        cy.get('#remove').click()
        cy.get('.swal2-confirm').click()
        cy.get('#swal2-title').should('contain', 'This car still has a booking')
    })

    it('TC4-2 : The car has not been booked by the user',() => {
        cy.visit('http://localhost:3000/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type("providercypress@gmail.com")
        cy.get('#input-password-for-credentials-provider').type("ProviderCypress69")
        cy.get('button').click()
        cy.visit('http://localhost:3000/info')
        cy.get('#remove').click()
        cy.get('.swal2-confirm').click()
        cy.get('#swal2-title').should('contain', 'Deleted!')
    })
})