/** -Fluxo-
 * Recer code(string)
 * Recuperar access_token do github para acessar as infos do user
 * Verificar se usuário existe no DB, caso sim gere token, caso nao cria no DB e gera um token
 * Retornar o token com as infos do user logado.
 */
import axios from 'axios';
//faz connection com o BD
import prismaClient from '../prisma';

import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    //url, body(nulo), params
    //seta o nome do que vier no data como accessTokenResponse
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    //chama a api do github passando o header de auth com o codigo do gitub
    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, id, avatar_url, name } = response.data;

    //verifica na table/model de user existe usuario com a mesma id do github 
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    //primerio param o payload(o que quero que ele tenha acesso, ou informacoes do user)
    //segundo secret para criar e validar o Token(gera no md5generator)
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        },
        process.env.JWT_SECRET,

      })

    return response.data;
  }
}

export { AuthenticateUserService }