import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useRouter } from 'next/router'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import QRCode from 'react-qr-code'
import Link from 'next/link'
import Tabs from '@mui/material/Tabs'
import { LinkTab } from '@/utils/LinkTab'
import { convertQueryToNumberOrSkip } from '@/utils'
import { DisplayTotemTab } from './DisplayTotemTab'
import { LectureClient } from '@/client/lecture.client'

const Totem: NextPage = () => {
  const router = useRouter()
  const { lectureId } = router.query

  // TODO add details to display totem page using this data
  const { data: lecture } = useGetLectureByIdQuery(convertQueryToNumberOrSkip(router, lectureId))

  return (
    <div className={style.login_body} style={{ justifyContent: 'flex-start' }}>
      <DisplayTotemTab lectureId={lectureId} defaultTab={0} />

      {router.isReady && (
        <QRCode value={process.env.NEXT_PUBLIC_FRONTEND_URL + 'totem/' + lectureId} size={350} style={{ marginTop: 'auto', marginBottom: 'auto' }} />
      )}
    </div>
  )
}

export default Totem
