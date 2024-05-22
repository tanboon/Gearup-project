import 'cypress-file-upload';

describe('Testing story US1-1 : User register to provider', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("vindiesel@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("VinDiesel69")
    cy.get('button').click()
    cy.visit('http://localhost:3000/provider')
  })

  it('TC1-1 : Name is missing', () => {
    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

    //picture
    cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
  })

  ////////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-2 : Address is missing', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

    //picture
    cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
  })

  ////////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-3 : Contact is missing', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //picture
    cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some fields are missing')
  })

  ////////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-4 : Picture is missing', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some documents are missing')
  })
  
  //////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-5 : Picture is not JPEG or PNG', () => {
    //picture
    cy.fixture('picture.gif').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.gif', 
        mimeType: 'image/gif' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();
    cy.get('.text-red-600').should('contain', 'Please upload JPG or PNG')
  })

  ////////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-6 : Citizen Card is missing', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

    //picture
    cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some documents are missing')
  })
  
  ////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-7 : Citizen Card is not JPEG or PNG', () => {
    //citizen
    cy.fixture('citizen_card.gif').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.gif', 
        mimeType: 'image/gif' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();
    cy.get('.text-red-600').should('contain', 'Please upload JPG or PNG')
  })
  
  ////////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-8 : Citizen Certificate is missing', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

    //picture
    cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Some documents are missing')
  })
  
  ////////////////////////////////////////////////////////////////////////////////
  
  it('TC1-9 : Citizen Certificate is not JPEG or PNG', () => {
    //certificate
    cy.fixture('citizen_certificate.gif').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.gif', 
        mimeType: 'image/gif' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();
    cy.get('.text-red-600').should('contain', 'Please upload JPG or PNG')
  })

////////////////////////////////////////////////////////////////////////////////

  it('TC1-10 : Register success', () => {
    //name
    cy.get('#name > .bg-gray-200').type("Dominic Toretto")

    //address
    cy.get('#address > .bg-gray-200').type("Toretto House")

    //contact
    cy.get('#contact > .bg-gray-200').type("0987654321")

  //picture
  cy.fixture('picture.jpg').then(fileContent => {
      cy.get('#picture').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'picture.jpg', 
        mimeType: 'image/jpeg' 
      }).trigger('change');
    })
    cy.get('#picture').find('#upload').click();

    //citizen
    cy.fixture('citizen_card.png').then(fileContent => {
      cy.get('#citizen').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_card.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#citizen').find('#upload').click();

    //certificate
    cy.fixture('citizen_certificate.png').then(fileContent => {
      cy.get('#certi').find('#choosefile').attachFile({
        fileContent: fileContent,
        fileName: 'citizen_certificate.png', 
        mimeType: 'image/png' 
      }).trigger('change');
    })
    cy.get('#certi').find('#upload').click();

    cy.wait(7000);

    //submit
    cy.get('#submit').click();

    //check message
    cy.get('#swal2-title').should('contain', 'Good job!')
    
    //log in as admin
    cy.visit('http://localhost:3000/api/auth/signout')
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("testAdmin@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("12345678")
    cy.get('button').click()
    cy.visit('http://localhost:3000/admin')

    //check that request should exist
    cy.get('#request').within(() => {
      cy.contains('tr', 'Dominic Toretto').should('exist')
    })
  })
})