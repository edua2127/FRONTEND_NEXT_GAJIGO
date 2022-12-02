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

  const { data: participants } = useListUsersQuery(getParticipantsUrl(), { pollingInterval: 1000 })

  useEffect(() => {
    console.log(participants)
  }, [participants])

  return (
    <section className={style.lecture_section}>
    <article className={style.lecture_article_table}>
    <table className={style.room_table}>
      <thead className={style.room_table_thead}>
        <tr className={style.room_table_tr}>
          <th className={style.room_table_th}>Nome</th>
          <th className={style.room_table_th}>Username</th>
          <th className={style.room_table_th}>Email</th>
        </tr>
      </thead>
      <tbody>
        {participants && participants.length > 0 &&
          participants.map((participant) => {
            return (
              <tr key={participant.id} className={style.room_table_tr}>
                <td className={style.room_table_td}>{participant.name}</td>
                <td className={style.room_table_td}>{participant.username}</td>
                <td className={style.room_table_td}>{participant.email}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
    </article>
    </section>
  )
}

export default Totem
