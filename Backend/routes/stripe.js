const express = require("express")
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const Car = require('../models/Car');
const Booking = require('../models/Bookings');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {

    const isUpdate = req.body.isUpdate
    console.log(isUpdate);
    let bookingData;
    let bookingInformation;
    let carData;
    if(!isUpdate){
      console.log('test1');
      bookingData = req.body.bookingData
      bookingInformation = {
        user : bookingData.user,
        car : {
            _id : bookingData.car.data._id,
            FeePerDay : bookingData.car.data.FeePerDay,
            LicensePlate : bookingData.car.data.LicensePlate,
            provider : bookingData.car.data.provider
        },
        bookingDateFrom : bookingData.bookingDateFrom,
        bookingDateTo : bookingData.bookingDateTo,
        Token: req.body.Token
      }
    }else{
      console.log('test');
      console.log(req.body.bookingData);
      bookingData = req.body.bookingData.data
      carData = await Car.findById(bookingData.car)
      console.log(carData);
      bookingInformation = {
        bookingId : bookingData._id,
        user : bookingData.user,
        car : {
            _id : carData._id,
            FeePerDay : carData.FeePerDay,
            LicensePlate : carData.LicensePlate,
            provider : carData.provider
        },
        bookingDateFrom : bookingData.bookingDateTo,
        bookingDateTo : req.body.dateTo,
        Token: req.body.Token
      }
    }
    

    const customer = await stripe.customers.create({
        metadata: {
            userId : req.body.userId,
            cart : JSON.stringify(bookingInformation),
            isUpdate : isUpdate
        }
    })
    console.log(bookingInformation);
    const amountOfBooking = parseInt(bookingInformation.bookingDateTo.substring(8, 10)) - parseInt(bookingInformation.bookingDateFrom.substring(8, 10));
    console.log(amountOfBooking);

    let session;

    if(!isUpdate){
      console.log('test2');
      console.log(bookingData);
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'promptpay'],
        invoice_creation: {
          enabled: true,
        },
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                images: [bookingData.car.data.PictureCover.replace("amp;", "")],
                name: bookingData.car.data.Brand,
                description : `LicensePlate: ${bookingData.car.data.LicensePlate}`,
                metadata :{
                  id : bookingData.car.data._id
                }
              },
              unit_amount: bookingData.car.data.FeePerDay * 100,
            },
            quantity: amountOfBooking,
          },
        ],
        phone_number_collection : {
          enabled : true,
        },
        customer: customer.id,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['TH'],
        },
        success_url: `http://localhost:5050/api/v1/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/',
      });
    }else{
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'promptpay'],
        invoice_creation: {
          enabled: true,
        },
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                images: [carData.PictureCover.replace("amp;", "")],
                name: carData.Brand,
                description : `LicensePlate: ${carData.LicensePlate}`,
                metadata :{
                  id : carData._id
                }
              },
              unit_amount: carData.FeePerDay * 100,
            },
            quantity: amountOfBooking - 1,
          },
        ],
        phone_number_collection : {
          enabled : true,
        },
        customer: customer.id,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['TH'],
        },
        success_url: `http://localhost:5050/api/v1/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/',
      });
    }
    

    res.send({url : session.url});
  });

  //create payment-history

  const createPaymentHistory = async(customer,data,bookingData,invoice) =>{
    const cart = JSON.parse(customer.metadata.cart);
    console.log(cart);
    let newPayment;
    console.log(customer.metadata.isUpdate);
    let booking;
    let carData;
    if(!customer.metadata.isUpdate){
      console.log('bookingData2');
      newPayment = new Payment({
        bookingId : bookingData.data._id,
        userId : customer.metadata.userId,
        customerId: data.customer,
        car: {
            _id : cart.car._id,
            FeePerDay : cart.car.FeePerDay,
            LincensePlate : cart.car.LincensePlate,
            provider : cart.car.provider,
            quantity : ((data.amount_total/100) / cart.car.FeePerDay)
        },
        total: (data.amount_total/100),
        information: data.customer_details,
        payment_intent: data.payment_intent,
        invoiceId: data.invoice,
        payment_status: data.payment_status,
        reciept: invoice

      });
    }else{
      console.log("please god please");
      booking = await Booking.findById(cart.bookingId)
      console.log(booking);
      if(!booking){
          console.log("error bookingData") 
        return;
      } 
      carData = await Car.findById(booking.car)
      console.log(carData);
      if(!carData){
        console.log("error carData") 
      return;
    } 
      newPayment = new Payment({
        bookingId : booking._id,
        userId : customer.metadata.userId,
        customerId: data.customer,
        car: {
            _id : carData._id,
            FeePerDay : carData.FeePerDay,
            LincensePlate : carData.LincensePlate,
            provider : carData.provider,
            quantity : ((data.amount_total/100) / carData.FeePerDay)
        },
        total: (data.amount_total/100),
        information: data.customer_details,
        payment_intent: data.payment_intent,
        invoiceId: data.invoice,
        payment_status: data.payment_status,
        reciept: invoice

      });
    }
    

    try{

        const savedPayment = await newPayment.save()

        console.log("Processed Payment: ", savedPayment);

    }catch(err){
        console.log(err);
    }
  }

  async function createBooking(booking_date_From, booking_date_To, userId, carId, token) {
    console.log(booking_date_From,booking_date_To,userId,carId,token);
    try {
        const response = await fetch(`http://localhost:5050/api/v1/cars/${carId}/bookings`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                bookingDateFrom: booking_date_From,
                bookingDateTo: booking_date_To,
                user: userId,
                car: carId,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create booking");
        }

        return await response.json();
    } catch (error) {
        throw new Error("Failed to create booking: " + error.message);
    }
}

  //stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

endpointSecret = "whsec_35689721ca32fba97c890f868f6f6be48df4c0bad086321e4d2097684b69f62e";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

    let data;
    let eventType;

  if(endpointSecret){

    let event;
    
    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
        console.log("Webhook verified");
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    data = event.data.object;
    eventType = event.type
  }else{
    data = request.body.data.object;
    eventType = request.body.type
  }

  

  // Handle the event

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer)
        .then(async (customer) => {
            const cart = JSON.parse(customer.metadata.cart);
            console.log(cart);
            let bookingData;
            if(!customer.metadata.isUpdate){
              bookingData = await createBooking(cart.bookingDateFrom, cart.bookingDateTo, cart.user, cart.car._id, cart.Token);
              console.log('test');
            }
            return { customer, bookingData };
        })
        .then(({ customer, bookingData }) => {
          console.log(data);
            return stripe.invoices.sendInvoice(data.invoice)
                .then((invoice) => {
                    return { customer, bookingData, invoice };
                });
        })
        .then(async ({ customer, bookingData, invoice }) => {
            console.log('test');
            const cartData = await JSON.parse(customer.metadata.cart)
            console.log(cartData);
            if(customer.metadata.isUpdate){
              let updateBooking = await Booking.findByIdAndUpdate(
                cartData.bookingId, 
                { bookingDateTo: cartData.bookingDateTo }
              );
              console.log(updateBooking);
              
            }
            createPaymentHistory(customer, data, bookingData, invoice.hosted_invoice_url)
            .then(async (req, res) => {
              if(!customer.metadata.isUpdate){
                  const car = await Car.findById(bookingData.data.car);
            
                //config transporter
                let config = {
                    service: 'gmail',
                    auth : {
                        user: 'ratchapolkunthong13@gmail.com', //Put Admin email in here !!!
                        pass: 'dsrqcnbewtwhhigf' //Put Admin password for application in here !!!
                    }
                }
            
                //create transporter
                let transporter = nodemailer.createTransport(config);
            
                //create theme for email
                let MailGenerator = new Mailgen({
                    theme: 'default',
                    product: {
                        name: "Mailgen",
                        link: "https://mailgen.js"
                    }
                });
            
                const date = new Date(bookingData.data.createdAt);
                const generalDate = date.toLocaleString();
            
                const DateForm = bookingData.data.bookingDateFrom.toString();
                const DateTo = bookingData.data.bookingDateTo.toString();
                const quantity = parseInt(DateTo.substring(8, 10)) - parseInt(DateForm.substring(8, 10));
                
                let response = {
                    body: {
                        name: "Gearup's Rental",
                        intro: `Dear ${data.customer_details.name} <br> Email : ${data.customer_details.email} <br> Address : ${data.customer_details.address.city}, ${data.customer_details.address.state}, ${data.customer_details.address.country} ${data.customer_details.address.postal_code} <br> Date : ${generalDate}`,
                        table: {
                            data: [
                                {
                                    Item: car.Brand + " " + car.Model,
                                    Quantity: quantity,
                                    Price: "฿" + car.FeePerDay,
                                    "": "Unit",
                                    Total: "฿" + (quantity * car.FeePerDay)
                                },
                                {
                                    Description: "Tax",
                                    Quantity: "",
                                    Price: "",
                                    "": "",
                                    Total: "0%"
                                },
                                {
                                    Description: "Total",
                                    Quantity: "",
                                    Price: "",
                                    "": "",
                                    Total: "฿" + (quantity * car.FeePerDay) * (1)
                                }
                            ]
                        },
                        outro: "Thank you for choosing our services. We hope you had a pleasant experience with us and look forward to serving you again in the future. Please feel free to contact us for any inquiries.",
                        action: {
                            instructions: "For any further assistance or clarification, please don't hesitate to contact us.",
                            button: {
                                color: "#22BC66",
                                text: "Contact Customer Support",
                                link: "mailto:gearup@gmail.com"
                            }
                        }
                    }
                }
                
            
                let mail = MailGenerator.generate(response);
            
                let message = {
                    from: 'ratchapolkunthong13@gmail.com', // sender address
                    to: data.customer_details.email, // list of receivers
                    subject: "Testing 1", // Subject line
                    html: mail // html body
                };
            
                transporter.sendMail(message)
                console.log("sent");
              }
              
          })
        })
        .catch((err) => {
            console.log(err.message);
        });
};
  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


router.post("/create-refund", async (req, res) => {
    try {

      const bookingId = await Booking.findById(req.body.bookingId)
      const payments = await Payment.find({ bookingId: bookingId._id });
      console.log(payments);
      console.log(payments.length);

      let i = 0;
      let paymentData = []
      for (const payment of payments) {
        paymentData[i] = payment;
        ++i;
      }
      for(let i=0; i < payments.length; ++i){
        // Make a refund
        const refund = await stripe.refunds.create({
            payment_intent: paymentData[i].payment_intent,
        });
    
        // Update the payment status to 'refunded'
        const updateData = await Payment.findByIdAndUpdate(paymentData[i]._id, { payment_status: 'refunded' }, {
            new: true,
            runValidators: true
        });
        
        console.log('Refund processed and payment updated:', updateData);
      }
        

      res.json({ success: true });
    } catch (error) {
      console.error("Error creating refund:", error);
      res.status(500).json({ error: "Error creating refund" });
    }
  });


  module.exports = router;
  