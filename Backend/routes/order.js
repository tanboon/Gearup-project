const express = require('express');
require("dotenv").config();
const router = express.Router()

const stripe = require('stripe')(process.env.STRIPE_KEY);

router.get('/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    const url = `http://localhost:3000/checkout-success/${session.payment_intent}`;
    
    setTimeout(() => {
      res.redirect(url);
  }, 2000)
  });

  module.exports = router;