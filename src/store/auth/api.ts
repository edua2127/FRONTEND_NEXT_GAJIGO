import { FormRegister } from '@/types/auth.types'
import { User } from '@/types/user.types'
import { baseApi } from '../api'
import { login, logout } from './slice'

export const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: `users/me`,
      }),
      keepUnusedDataFor: 0.0001,
    }),

    login: build.mutation<User, { username: string; password: string }>({
      query: (body) => ({
        url: `users/login`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        try {
          const { data } = await queryFulfilled
          dispatch(login(data))
        } catch (err) {
          console.error(err)
          dispatch(logout())
        }
      },
    }),

    signUp: build.mutation<User, FormRegister>({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetCurrentUserQuery, useLoginMutation, useSignUpMutation } = api
