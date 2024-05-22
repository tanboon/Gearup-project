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