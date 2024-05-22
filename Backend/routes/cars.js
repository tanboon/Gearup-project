const express = require('express');
const multer = require("multer");
const { getCars, getCar, updateCar, getCarRentals, getProviderCars } = require('../controllers/cars');
const { createCar, deleteCar } = require('../controllers/jestcars')
const { uploads } = require('../controllers/upload');



//Include other resource routers
const bookingRouter = require('./bookings');
const reviewRouter = require('./reviews');

const router = express.Router();
const upload = multer();

const { protect, authorize } = require('../middleware/auth');

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Car:
 *        type: object
 *        required:
 *          - _id
 *          - Brand
 *          - Model
 *          - Year
 *          - Color
 *          - FeePerDay
 *          - LicensePlate
 *          - provider
 *        properties:
 *          _id:
 *            type: string
 *            format: uuid
 *            description: The auto-generated id of the car
 *          Brand:
 *            type: string
 *            description: Car Brand
 *          Model:
 *            type: string
 *            description: Car Model
 *          Year:
 *            type: string
 *            description: Car Year
 *          Color:
 *            type: string
 *            description: Car Color
 *          FeePerDay:
 *            type: number
 *            description: Fee per day of the car
 *          provider:
 *            type: string
 *            format: uuid
 *            description: Id from the provider id who add the car
 *          PictureCover:
 *            type: string
 *            description: Google drive link
 *          Picture1:
 *            type: string
 *            description: Google drive link
 *          Picture2:
 *            type: string
 *            description: Google drive link
 *          Picture3:
 *            type: string
 *            description: Google drive link
 *          Picture4:
 *            type: string
 *            description: Google drive link
 *        example: 
 *          _id: 6627e2aad6210a749af93b69
 *          Brand: "Lamborghini"
 *          Model: "Huracan"
 *          Year: "2021"
 *          Color: "Rosso Mars"
 *          FeePerDay: 650000
 *          LicensePlate: "1กก 1111"
 *          provider: 661da29002e461dc8545fc86
 *          PictureCover: "https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6s…"
 *          Picture1: "https://drive.google.com/uc?export=view&amp;id=1XmS6IlNzG5f2wxE0EglQl_…"
 *          Picture2: "https://drive.google.com/uc?export=view&amp;id=15hejJXL7ev2iCd6CP--Zjc…"
 *          Picture3: "https://drive.google.com/uc?export=view&amp;id=1n1uOAXTOoLryihFJxUm-YT…"
 *          Picture4: "https://drive.google.com/uc?export=view&amp;id=1JSyxH76pJ21lkNp2i4jCDg…"
 */
/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: The cars managing API
 */
/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Returns the list of all the cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: The list of the cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Returns the car by car id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: The car was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /cars/provider/{id}:
 *   get:
 *     summary: Returns the list of all the cars by provider id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     responses:
 *       200:
 *         description: The car description by provider id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: The car was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The car was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       401:
 *         description: Not authorize to access this route
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update the own car by car id
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The car was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       401:
 *         description: User {id} is not authorized to update this car
 *       404:
 *         description: The car was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete the own car by car id
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car was deleted
 *       401:
 *         description: User {id} is not authorized to delete this car
 *       404:
 *         description: The car was not found
 *       500:
 *         description: Some server error
 */

//Re-route into other resource routers
router.use('/:carId/bookings', bookingRouter);
router.use('/:carId/reviews', reviewRouter);

router.route('/carRental').get(getCarRentals);
router.route('/').get(getCars).post(protect, authorize('provider', 'admin'), createCar);
router.route('/:id').get(getCar).put(protect, authorize('provider', 'admin'), updateCar).delete(protect, authorize('provider', 'admin'), deleteCar);
router.route('/upload').post(protect, authorize('provider', 'admin', 'user'), upload.single('image'), uploads)
router.route('/provider/:id').get(getProviderCars);

module.exports = router;
