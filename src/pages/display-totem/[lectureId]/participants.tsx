import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useLinkEntityToCollectionMutation } from '@/store/api'
import { useGetCurrentUserQuery } from '@/store/auth/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useListUsersQuery } from '@/store/users/api'

const Totem: NextPage = () => {
  const router = useRouter()
  const { lectureId } = router.query

  const getLectureIdFromRouter = () => {
    if (!router.isReady || !lectureId || Array.isArray(lectureId)) {
      return skipToken
    }

    const parsedLectureId = parseInt(lectureId, 10)
    return isNaN(parsedLectureId) ? skipToken : parsedLectureId
  }

  const getParticipantsUrl = () => {
    const lectureId = getLectureIdFromRouter()
    if (lectureId === skipToken) {
      return skipToken
    }

    return process.env.NEXT_PUBLIC_API_URL + `/lectures/${lectureId}/participants`
  }

  const { data: participants } = useListUsersQuery(
    getParticipantsUrl(),
    { pollingInterval: 1000 }
  )

  useEffect(() => {
    console.log(participants)
  }, [participants])

  return (
    <div className={style.login_body}>
      <h1 style={{ color: 'black' }}>CHECK-IN CONCLUIDO!</h1>
    </div>
  )
}

export default Totem
