import Cookie from 'universal-cookie'
import Router from 'next/router'
import { FormLogin, FormRegister, TokenResponse } from '@/types/auth.types'
import { AbstractService } from '@/services/abstract.service'
import { User, UserCollection } from '@/types/user.types'
import { UserClient } from '@/client/user.client'
import type {RootState} from '../store/store'

import {useDispatch, useSelector} from 'react-redux';
import {editaUsername, editaPassword } from '../slice/geralSlice'

class UserService extends AbstractService<User, UserCollection> {
    
    
    constructor() {
        super(new UserClient())
    }

    public getAuthenticatedToken() {
        const cookies = new Cookie()
        return cookies.get('token')
    }

    public login(login: FormLogin) {
        return new UserClient()
            .login(login.username, login.password)
            .then((user: TokenResponse) => {
                const cookies = new Cookie()
                cookies.set('token', user.access_token)
                return user
            })
    }
  
    public getCorrentUser() {
        return new UserClient().getCorrentUser().then((user: User) => {
            console.log(user)
            return user
        })
    }

    public register(user: FormRegister) {
        return new UserClient().register(user).then((user: FormRegister) => {
            return user
        })
    }

    public logout() {
        // remove user from local storage, publish null to user subscribers and redirect to login page
        const cookies = new Cookie()
        cookies.remove('token')
        Router.push('/auth/login')
    }
}

export default new UserService()