import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '.'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
      headers.set('Access-Control-Allow-Credentials', 'true')

      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
