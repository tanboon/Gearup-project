const express = require('express');
const {getBookings, getBooking, addBooking, updateBooking, deleteBooking} = require('../controllers/bookings');
const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth');

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Booking:
 *        type: object
 *        required:
 *          - _id
 *          - user
 *          - car
 *          - provider
 *          - bookingDateFrom
 *          - bookingDateTo
 *        properties:
 *          _id:
 *            type: string
 *            format: uuid
 *            description: The auto-generated id of the provider
 *          user:
 *            type: string
 *            format: uuid
 *            description: Id from the user id who register to booking
 *          car:
 *            type: string
 *            format: uuid
 *            description: Id from the car id that has been booked
 *          provider:
 *            type: string
 *            format: uuid
 *            description: Id from the provider id of the car that has been booked
 *          bookingDateFrom:
 *            type: date
 *            description: Date that start use the car
 *          bookingDateTo:
 *            type: date
 *            description: Date that return the car
 *          citizenCard:
 *            type: string
 *            description: Google drive link
 *          citizenCertificate:
 *            type: string
 *            description: Google drive link
 *          createdAt:
 *            type: date
 *            description: The auto-generated date and time of creation
 *        example: 
 *          _id: 662156d171ff97b4f08222cf
 *          user: 661da26b02e461dc8545fc83
 *          car: 6627e2aad6210a749af93b69
 *          provider: 661da29002e461dc8545fc86
 *          bookingDateFrom: 2024-04-19T17:00:00.000+00:00
 *          bookingDateTo: 2024-04-27T17:00:00.000+00:00
 *          createdAt: 2024-04-18T17:22:25.765+00:00
 */
/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: The booking managing API
 */
/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Returns the list of all the bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User:The list of his bookings,
 *                      Provider:The list of bookings that booked his car,
 *                      Admin:The list of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorize to access this route
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Returns the booking by booking id
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: The car was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update the booking by booking id
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: User {id} is not authorized to update this booking
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete the booking by booking id
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking was deleted
 *       401:
 *         description: User {id} is not authorized to delete this booking
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some server error
 */






router.route('/').get(protect, getBookings).post(protect,authorize('admin','user'),addBooking);
router.route('/:id').get(protect,getBooking).put(protect,authorize('admin','user'),updateBooking).delete(protect,authorize('admin','user'),deleteBooking);

module.exports=router;