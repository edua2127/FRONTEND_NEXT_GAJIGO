import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useLinkEntityToCollectionMutation } from '@/store/api'
import { useGetCurrentUserQuery } from '@/store/auth/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import QRCode from 'react-qr-code'
import Link from 'next/link'

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

  const { data: lecture, isSuccess: foundLecture } = useGetLectureByIdQuery(
    getLectureIdFromRouter(),
  )

  return (
    <div className={style.login_body}>
      {router.isReady && (
        <QRCode value={process.env.NEXT_PUBLIC_FRONTEND_URL + 'totem/' + lectureId} />
      )}
      <Link href={`/display-totem/${lectureId}/participants`}>PARTICIPANTES</Link>
    </div>
  )
}

export default Totem
