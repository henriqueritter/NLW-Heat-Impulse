/** -Fluxo-
 * Recer code(string)
 * Recuperar access_token do github para acessar as infos do user
 * Verificar se usuário existe no DB, caso sim gere token, caso nao cria no DB e gera um token
 * Retornar o token com as infos do user logado.
 */
import axios from 'axios';

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    //url, body(nulo), params
    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    return response.data;
  }
}

export { AuthenticateUserService }