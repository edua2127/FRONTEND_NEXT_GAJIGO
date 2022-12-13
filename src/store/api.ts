import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import Cookie from 'universal-cookie'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
    credentials: 'same-origin',
    mode: 'cors',
    prepareHeaders: (headers) => {
      const cookies = new Cookie()
      const token = cookies.get('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      console.log(token)

      return headers
    },
  }),
  endpoints: () => ({}),
})

const commonMethods = baseApi.injectEndpoints({
  endpoints: (build) => ({
    linkEntityToCollection: build.mutation<null, { url: string; entityLink: string }>({
      query: ({ url, entityLink }) => ({
        url,
        body: entityLink,
        method: 'PATCH',
        headers: {
          'Content-Type': 'text/uri-list',
        },
      }),
    }),

    linkIndividualEntity: build.mutation<null, { url: string; resource: string; entity: string }>({
      query: ({ url, resource, entity }) => ({
        url,
        body: { [resource]: entity },
        method: 'PATCH',
      }),
    }),
  }),
})

export const { useLinkEntityToCollectionMutation, useLinkIndividualEntityMutation } = commonMethods

export const injectGetById = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T, number>({
        query: (id) => ({ url: endpoint + '/' + id }),
      }),
    }),
  })

  return entityApi
}

export const injectGetByUrl = <T>(name: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T, string>({
        query: (url) => ({ url }),
      }),
    }),
  })

  return entityApi
}

export const injectGetAll = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T[], string | null>({
        query: (url) => ({ url: url || endpoint }),
        transformResponse: (response: { _embedded: { [entityCollection: string]: T[] } }) =>
          response._embedded[endpoint],
      }),
    }),
  })

  return entityApi
}

export const injectUpdate = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<T, { id: number; body: Partial<T> }>({
        query: ({ id, body }) => ({ url: endpoint + '/' + id, method: 'PATCH', body }),
      }),
    }),
  })

  return entityApi
}

export const injectCreate = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<T, Partial<T>>({
        query: (body) => ({ url: endpoint, body, method: 'POST' }),
      }),
    }),
  })

  return entityApi
}

export const injectDelete = (name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<null, number>({
        query: (id) => ({ url: endpoint + '/' + id, method: 'DELETE' }),
      }),
    }),
  })

  return entityApi
}
