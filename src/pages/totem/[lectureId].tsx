import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useLinkEntityToCollectionMutation } from '@/store/api'
import { useGetCurrentUserQuery } from '@/store/auth/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const Totem: NextPage = () => {
  const {
    data: currentUser,
    isError: isUnauthenticated,
    isSuccess: isLoggedIn,
  } = useGetCurrentUserQuery()

  const router = useRouter()
  const { lectureId } = router.query

  const getLectureIdFromRouter = () => {
    if (!router.isReady || !lectureId || Array.isArray(lectureId)) {
      return skipToken
    }

    const parsedLectureId = parseInt(lectureId, 10)
    return isNaN(parsedLectureId) ? skipToken : parsedLectureId
  }

  const { data: lecture, isSuccess: foundLecture } = useGetLectureByIdQuery(
    getLectureIdFromRouter(),
  )

  const [linkToCollection] = useLinkEntityToCollectionMutation()

  useEffect(() => {
    if (isUnauthenticated && router.isReady) {
      console.log(router)
      router.push({ pathname: '/auth/login', query: { returnUrl: router.asPath } })
    }
  }, [isUnauthenticated, router.isReady])

  useEffect(() => {
    if (foundLecture && isLoggedIn) {
      const url = lecture._links.self.href + '/participants'
      linkToCollection({ url, entityLink: '/' + currentUser.id })
    }
  }, [foundLecture, isLoggedIn, lecture, currentUser])

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      console.log(currentUser)
    }
  }, [currentUser, isLoggedIn])

  return (
    <div className={style.login_body}>
      <h1 style={{ color: 'black' }}>CHECK-IN CONCLUIDO!</h1>
    </div>
  )
}

export default Totem
