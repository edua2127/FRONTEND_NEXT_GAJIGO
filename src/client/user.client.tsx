import { AbstractClient } from '@/client/abstract.client'
import { User, UserCollection } from '@/types/user.types'
import { FormRegister } from '@/types/auth.types'
import UserService from '@/services/user.service'

export class UserClient extends AbstractClient<User, UserCollection> {
  constructor() {
    super('users')
  }

  public login(username: string, password: string): Promise<any> {
    return this.fetchEndpoint('/login', { username, password }, {}, 'POST')
  }

  public register(user: FormRegister): Promise<any> {
    return this.fetchEndpoint('/register', user, {}, 'POST')
  }

  public getCurrentUser(): Promise<any> {
    const token: string = UserService.getAuthenticatedToken()

    return this.fetchFromURL(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {},
      { Authorization: `Bearer ${token}` },
      'GET',
    )
  }
}
