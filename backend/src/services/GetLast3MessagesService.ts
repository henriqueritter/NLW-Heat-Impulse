import prismaClient from '../prisma'
import PrismaClient from '../prisma'

class GetLast3MessagesService {
  async execute() {
    //retorna apenas 3 linhas
    //SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC;
    const messages = await prismaClient.message.findFirst({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      //retorna os usuarios tbm
      include: {
        user: true
      }
    })

    return messages;
  }
}


export { GetLast3MessagesService }