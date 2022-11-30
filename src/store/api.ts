import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '.'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
    credentials: 'same-origin',
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token.access_token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
