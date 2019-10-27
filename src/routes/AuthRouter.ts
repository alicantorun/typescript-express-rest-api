import * as jwtConfig from '@/config/middleware/jwtAuth';
import { AuthComponent } from '@/components';
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/signup
 * @swagger
 * /auth/signup/:
 *  post:
 *    description: Register user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: user successfuly signed up
 *        content:
 *          appication/json:
 *            example:
 *              message: You have signed up successfully
 *      400:
 *        description: sign up failed
 *        content:
 *          application/json:
 *            example:
 *              message: Email already exists
 */
router.post('/signup', AuthComponent.signup);

/**
 * POST method route
 * @example http://localhost:PORT/login
 *
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Login user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: user successfuly logged in
 *        headers:
 *          Authorization:
 *            schema:
 *              type: string
 *            description: JWT token
 *        content:
 *          appication/json:
 *            example:
 *              message: Login Success!
 *      401:
 *        description: Not logged in, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              message: Invalid credentials
 */
router.post('/login', AuthComponent.login);

/**
 * GET method route
 * @example http://localhost:PORT/user
 *
 * @swagger
 * /auth/user/:
 *  get:
 *    description: Get authenticated user
 *    tags: ["auth"]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: return authenticated user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 *      default:
 *        description: unexpected error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.get('/user', jwtConfig.isAuthenticated, AuthComponent.user);

/**
 * @export {express.Router}
 */
export default router;
