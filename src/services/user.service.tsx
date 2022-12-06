import Cookie from 'universal-cookie'
import Router from 'next/router'
import { FormLogin, FormRegister, TokenResponse } from '@/types/auth.types'
import { AbstractService } from '@/services/abstract.service'
import { User, UserCollection } from '@/types/user.types'
import { UserClient } from '@/client/user.client'

class UserService extends AbstractService<User, UserCollection> {
  constructor() {
    super(new UserClient())
  }

  public getAuthenticatedToken() {
    const cookies = new Cookie()
    return cookies.get('token')
  }

  public async login(login: FormLogin) {
    const tokenResponse: TokenResponse = await new UserClient().login(
      login.username,
      login.password,
    )
    const cookies = new Cookie()
    cookies.set('token', tokenResponse.access_token)
    return tokenResponse
  }

  public async getCorrentUser() {
    return await new UserClient().getCurrentUser()
  }

  public async register(user: FormRegister) {
    return await new UserClient().register(user)
  }
}

export default new UserService()
