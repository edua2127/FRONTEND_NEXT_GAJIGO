import type { NextPage } from 'next'

import style from '@/styles/User.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useListUsersQuery } from '@/store/users/api'
import Tabs from '@mui/material/Tabs'
import { LinkTab } from '@/utils/LinkTab'
import { convertQueryToNumberOrSkip } from '@/utils'
import { DisplayTotemTab } from '../DisplayTotemTab'

const Totem: NextPage = () => {
  const router = useRouter()
  const { lectureId } = router.query

  const getParticipantsUrl = () => {
    const id = convertQueryToNumberOrSkip(router, lectureId)
    if (id === skipToken) {
      return skipToken
    }

    return process.env.NEXT_PUBLIC_API_URL + `/lectures/${id}/participants`
  }

  const { data: participants } = useListUsersQuery(getParticipantsUrl(), { pollingInterval: 1000 })

  useEffect(() => {
    console.log(participants)
  }, [participants])

  const tabUrls = [`/display-totem/${lectureId}`, `/display-totem/${lectureId}/participants`]

  const handleTab = (_: React.SyntheticEvent, newValue: number) => {
    router.push(tabUrls[newValue])
  }

  return (
    <section className={style.lecture_section} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <article className={style.participants_article_tabs} style={{ paddingBottom: '3em', width: '100%' }}>
        <DisplayTotemTab lectureId={lectureId} defaultTab={1}/>
      </article>
      <article className={style.lecture_article_table} style={{ width: '90%' }}>
        <table className={style.room_table}>
          <thead className={style.room_table_thead}>
            <tr className={style.room_table_tr}>
              <th className={style.room_table_th}>Nome</th>
              <th className={style.room_table_th}>Username</th>
              <th className={style.room_table_th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {participants &&
              participants.length > 0 &&
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
