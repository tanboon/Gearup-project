const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');
const router = express.Router();
const {protect} = require('../middleware/auth');

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          _id:
 *            type: string
 *            format: uuid
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: Name-Surname
 *          tel:
 *            type: string
 *            description: Phone number
 *          email:
 *            type: string
 *            description: Email
 *          password:
 *            type: string
 *            description: Password must be at least 6 characters long
  *          status:
 *            type: string
 *            description: Default is user
 *          createdAt:
 *            type: date
 *            description: The auto-generated date and time of creation
 *        example: 
 *          {
 *            "_id": "661da1d802e461dc8545fc81",
 *            "name": "testAdmin",
 *            "tel": "01234567",
 *            "email": "testAdmin@gmail.com",
 *            "role": "admin",
 *            "password": "$2a$10$mUf55VjaqoMxx1F2UZgvF.tD2ocjOKvoPCP2Qh/LLRvOGdSsIQ9eG",
 *            "createdAt": "2024-04-13T12:33:28.654Z",
 *            "__v": 0
 *          }
 */ 
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The authentication API
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user account
 *     tags: [Authentication]
 *     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to user account
 *     tags: [Authentication]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully login to account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Please provide email and password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user account
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logout account
 */
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user account
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully get current logged in user account
 *       500:
 *         description: Unauthorized
 */


router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;