import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const router = Router();

//passamos o controller como middleware 
router.post("/authenticate", new AuthenticateUserController().handle)

export { router }