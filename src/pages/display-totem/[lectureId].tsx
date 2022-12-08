import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useRouter } from 'next/router'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import QRCode from 'react-qr-code'
import { convertQueryToNumberOrSkip } from '@/utils'
import { DisplayTotemTab } from '../../components/DisplayTotemTab'

const Totem: NextPage = () => {
  const router = useRouter()
  const { lectureId } = router.query

  // TODO add details to display totem page using this data
  const { data: lecture } = useGetLectureByIdQuery(convertQueryToNumberOrSkip(router, lectureId))

  return (
    <div className={style.login_body} style={{ justifyContent: 'flex-start' }}>
      <DisplayTotemTab lectureId={lectureId} defaultTab={0} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 'auto',
          marginBottom: 'auto',
          gap: '5em',
          alignItems: 'center',
        }}
      >
        {router.isReady && (
          <QRCode
            value={process.env.NEXT_PUBLIC_FRONTEND_URL + 'totem/' + lectureId}
            size={350}
            style={{}}
          />
        )}
        {lecture && (
          <div>
            <h1 style={{ fontSize: '3em' }}>{lecture.name}</h1>
            <p style={{ fontSize: '2em', color: '#505050' }}>{lecture.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Totem
