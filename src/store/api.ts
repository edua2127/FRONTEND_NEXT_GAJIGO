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

export const injectGetById = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T, number>({
        query: (id) => ({ url: endpoint + id}),
      }),
    }),
  });

  return entityApi;
};

export const injectGetByUrl = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T, string>({
        query: (url) => ({ url }),
      }),
    }),
  });

  return entityApi;
};

export const injectGetAll = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.query<T, string | null>({
        query: (url) => ({ url: url || endpoint }),
      }),
    }),
  });

  return entityApi;
};

export const injectUpdate = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<T, { id: number, body: Partial<T> }>({
        query: ({ id, body }) => ({ url: endpoint + id, method: 'PATCH', body}),
      }),
    }),
  });

  return entityApi;
};

export const injectCreate = <T>(name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<T, Partial<T>>({
        query: (body) => ({ url: endpoint, body}),
      }),
    }),
  });

  return entityApi;
};

export const injectDelete = (name: string, endpoint: string) => {
  const entityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      [name]: build.mutation<null, number>({
        query: (id) => ({ url: endpoint + id, method: 'DELETE'}),
      }),
    }),
  });

  return entityApi;
};