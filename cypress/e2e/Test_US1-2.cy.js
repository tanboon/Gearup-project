import 'cypress-file-upload';

describe('Testing story US1-2 : Provider add car', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("providercypress@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("ProviderCypress69")
    cy.get('button').click()
    cy.visit('http://localhost:3000/addcar')
  })

  it('TC2-1 : Brand is missing', () => {
    //brand
    // cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-2 : Model is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    //cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-3 : Year is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    //cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })
   
   ////////////////////////////////////////////////////////////////////////

   it('TC2-4 : Color is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    //cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-5 : FeePerDay is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    //cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })
  
   ////////////////////////////////////////////////////////////////////////

   it('TC2-6 : Cover Picture is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    // cy.fixture('1970_dodge_charger.png').then(fileContent => {
    //     cy.get('#picturecover').find('#choosefile').attachFile({
    //       fileContent: fileContent,
    //       fileName: '1970_dodge_charger.png', 
    //       mimeType: 'image/png' 
    //     }).trigger('change');
    //   })
    // cy.get('#picturecover').find('#upload').click();

    // cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Cover Picture is missing')
   })
  
   //////////////////////////////////////////////////////////////////////////////////
  
   it('TC2-7 : Cover Picture is not JPEG or PNG', () => {
    //Cover Pictures
    cy.fixture('1970_dodge_charger.gif').then(fileContent => {
      cy.get('#picturecover').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: '1970_dodge_charger.gif', 
        mimeType: 'image/gif' 
      }).trigger('change');
    })
    cy.get('#picturecover').find('#upload').click();
    cy.get('.text-red-600').should('contain', 'Please upload JPG or PNG')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-8 : License Plate Number is missing', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    //cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-9 : License Plate Number is duplicate', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-1234")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'This license plate has already been used')
   })

   ////////////////////////////////////////////////////////////////////////

   it('TC2-10 : Add Car Successful', () => {
    //brand
    cy.get('#brand > .bg-gray-200').type("Dodge")

    //model
    cy.get('#model > .bg-gray-200').type("Charger R/T")

    //year
    cy.get('#year > .bg-gray-200').type("1970")

    //color
    cy.get('#color > .bg-gray-200').type("Black")
  
    //feeperday
    cy.get('#feeperday > .bg-gray-200').type("60,000")

    //licenseplate
    cy.get('#licenseplate > .bg-gray-200').type("test-9999")

    //picturecover
    cy.fixture('1970_dodge_charger.png').then(fileContent => {
        cy.get('#picturecover').find('#choosefile').attachFile({
          fileContent: fileContent,
          fileName: '1970_dodge_charger.png', 
          mimeType: 'image/png' 
        }).trigger('change');
      })
    cy.get('#picturecover').find('#upload').click();

    cy.wait(5000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Good job!')

    cy.visit('http://localhost:3000/info')
    cy.get("#car").should('contain', 'Dodge Charger R/T')
   })
})