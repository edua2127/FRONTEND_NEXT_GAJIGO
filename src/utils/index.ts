import { skipToken } from '@reduxjs/toolkit/dist/query'
import { NextRouter } from 'next/router'

export const convertQueryToNumberOrSkip = (
  router: NextRouter,
  query: string | string[] | undefined,
) => {
  if (!router.isReady || !query || Array.isArray(query)) {
    return skipToken
  }

  const parsedQuery = parseInt(query, 10)
  return isNaN(parsedQuery) ? skipToken : parsedQuery
}
