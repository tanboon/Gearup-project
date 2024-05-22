const express = require('express');
const { getPayments, updatePayment } = require('../controllers/payments')
const router = express.Router({ mergeParams:true });
const { protect } = require('../middleware/auth');

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Payment:
 *        type: object
 *        required:
 *          - _id
 *          - bookingId
 *          - userId
 *          - total
 *          - information
 *          - payment_intent
 *          - invoiceId
 *          - payment_status
 *          - reciept
 *        properties:
 *          _id:
 *            type: string
 *            description: The ID of the booking
 *          userId:
 *            type: string
 *            description: The ID of the user who made the booking
 *          customerId:
 *            type: string
 *            description: The ID of the customer
 *          car:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: The ID of the car
 *              FeePerDay:
 *                type: integer
 *                description: The fee per day for renting the car
 *              provider:
 *                type: string
 *                description: The ID of the car provider
 *              quantity:
 *                type: integer
 *                description: The quantity of cars booked
 *          total:
 *            type: integer
 *            description: The total cost of the booking
 *          information:
 *            type: object
 *            properties:
 *              address:
 *                type: object
 *                properties:
 *                  city:
 *                    type: string
 *                  country:
 *                    type: string
 *                  line1:
 *                    type: string
 *                  line2:
 *                    type: string
 *                  postal_code:
 *                    type: string
 *                  state:
 *                    type: string
 *              email:
 *                type: string
 *              name:
 *                type: string
 *              phone:
 *                type: string
 *              tax_exempt:
 *                type: string
 *              tax_ids:
 *                type: array
 *                items:
 *                  type: string
 *          status:
 *            type: string
 *            description: The status of the booking
 *          payment_intent:
 *            type: string
 *            description: The payment intent ID
 *          invoiceId:
 *            type: string
 *            description: The ID of the invoice
 *          payment_status:
 *            type: string
 *            description: The status of the payment
 *          reciept:
 *            type: string
 *            description: URL to the payment receipt
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: The timestamp when the booking was created
 *          updatedAt:
 *            type: string
 *            format: date-time
 *            description: The timestamp when the booking was last updated
 *        example:
 *          {
 *             "_id": "662e6838bb6fb3afe65b842b",
 *             "userId": "6621e7cf51843c79bec7a770",
 *             "customerId": "cus_Q0adxJImCCH5v5",
 *             "car": {
 *               "_id": "6627e2b2d6210a749af93b6c",
 *               "FeePerDay": 65000,
 *               "provider": "661da29002e461dc8545fc86",
 *               "quantity": 1
 *             },
 *             "total": 65000,
 *             "information": {
 *               "address": {
 *                 "city": "อยุธยา",
 *                 "country": "TH",
 *                 "line1": "อยุธยา",
 *                 "line2": null,
 *                 "postal_code": "13000",
 *                 "state": "พระนครศรีอยุธยา"
 *               },
 *               "email": "tanboon.top3837@gmail.com",
 *               "name": "TANBOON TIANGTUT",
 *               "phone": "+66869863837",
 *               "tax_exempt": "none",
 *               "tax_ids": []
 *             },
 *             "status": "refundable",
 *             "payment_intent": "pi_3PAZSL03ZUzibF3K1tul99nS",
 *             "invoiceId": "in_1PAZSO03ZUzibF3KHjErehaU",
 *             "payment_status": "paid",
 *             "reciept": "https://invoice.stripe.com/i/acct_1P5Q9D03ZUzibF3K/test_YWNjdF8xUDVROUQwM1pVemliRjNLLF9RMGFkSEhTU1FuallGcmRNYkJSSUJ4Mm1Ma0FNbzk5LDEwNDg1ODE3Mg0200wxTy7qgL?s=ap",
 *             "createdAt": "2024-04-30T12:56:08.472Z",
 *             "updatedAt": "2024-04-30T12:56:08.472Z",
 *                 }
 */
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The payment managing API
 */
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Returns the list of all the payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the payment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: The payment was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       401:
 *         description: User {id} is not authorized to update this payment
 *       404:
 *         description: The payment was not found
 *       500:
 *         description: Some server error
 */

router.route('/').get(protect, getPayments);
router.route('/:id').put(protect, updatePayment)



module.exports = router;