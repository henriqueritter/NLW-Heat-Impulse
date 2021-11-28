import { Request, Response } from 'express';
import { GetLast3MessagesService } from '../services/GetLast3MessagesService'
class Get3LastMessagesController {
  async handle(request: Request, response: Response) {
    const getMessageService = new GetLast3MessagesService();

    const result = await getMessageService.execute();

    response.json(result);
  }
}

export { Get3LastMessagesController }