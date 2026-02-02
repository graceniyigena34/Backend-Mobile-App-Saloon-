import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 */
router.get('/', getUsers);
router.post('/', createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 */ 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;