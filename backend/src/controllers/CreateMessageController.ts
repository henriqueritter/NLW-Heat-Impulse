import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService'

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
  }
}

export { CreateMessageController }