import PrismaClient from '../prisma'
class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await PrismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {  //retorna as informacoes do user pela relacao com message
        user: true
      }
    });

    return message;
  }
}

export { CreateMessageService }