const express = require('express');
const {getProviders , getPendingProviders, getApprovedProviders, addProvider, updateProvider, deleteProvider} = require('../controllers/providers');
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
 *      Provider:
 *        type: object
 *        required:
 *          - _id
 *          - user
 *          - name
 *          - contact
 *          - address
 *          - picture
 *          - citizenCard
 *          - citizenCertificate
 *        properties:
 *          _id:
 *            type: string
 *            format: uuid
 *            description: The auto-generated id of the provider
 *          user:
 *            type: string
 *            format: uuid
 *            description: Id from the user id who register to be provider
 *          name:
 *            type: string
 *            description: Name-Surname of provider
 *          contact:
 *            type: string
 *            description: Contact of Provider
 *          address:
 *            type: string
 *            description: Address of provider
 *          picture:
 *            type: string
 *            description: Google drive link
 *          citizenCard:
 *            type: string
 *            description: Google drive link
 *          citizenCertificate:
 *            type: string
 *            description: Google drive link
 *          status:
 *            type: string
 *            description: Default is pending
 *        example: 
 *          _id: 661a9a474b69e5348d61f872
 *          user: 65e360e069bdc99270f4ef9c
 *          name: "Test2"
 *          address: "Test"
 *          contact: "Test"
 *          picture: "https://drive.google.com/uc?export=view&id=1p4h7Wp6OWZPueQtBnlGP-ny_ZPceqIK-"
 *          citizenCard: "https://drive.google.com/uc?export=view&id=1CW_QyxSLL9RdSltcjEGpMMhypUAOgvx2"
 *          citizenCertificate: "https://drive.google.com/uc?export=view&id=1VLRYRcaKa1_dM1wmaYDj71qN7hnAXj85"
 *          status: "pending"
 */
/**
 * @swagger
 * tags:
 *   name: Provider
 *   description: The provider managing API
 */
/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Returns the list of all the providers
 *     tags: [Provider]
 *     responses:
 *       200:
 *         description: The list of the providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /providers/pending:
 *   get:
 *     summary: Returns the list of all the provider requests
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the provider requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /providers/approved:
 *   get:
 *     summary: Returns the list of all the provider requests that approved
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the provider requests that approved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Create a provider request
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Provider'
 *     responses:
 *       201:
 *         description: The provier request is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /providers/{id}:
 *   put:
 *     summary: Update a provider's infomation
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Provider'
 *     responses:
 *       201:
 *         description: The provider's infomation was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       401:
 *         description: User {id} is not authorized to update this provider's information
 *       404:
 *         description: The provider was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *     summary: Delete the provider's infomation
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     responses:
 *       200:
 *         description: The provider's infomation was deleted
 *       401:
 *         description: User {id} is not authorized to update this provider's information
 *       404:
 *         description: The provider was not found
 *       500:
 *         description: Some server error
 */


router.route('/pending').get(protect, authorize('user','admin'),getPendingProviders)
router.route('/approved').get(protect, authorize('user','admin'),getApprovedProviders)
router.route('/').get(getProviders).post(protect, authorize('user','admin'), addProvider)
router.route('/:id').put(protect, authorize('user','admin'), updateProvider).delete(protect, authorize('user','admin'), deleteProvider)

module.exports=router;