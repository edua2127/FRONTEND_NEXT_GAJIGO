import type { NextPage } from 'next'
import style from '@/styles/Login.module.css'
import { useRouter } from 'next/router'
import { useGetLectureByIdQuery } from '@/store/lectures/api'
import QRCode from 'react-qr-code'
import Link from 'next/link'
import Tabs from '@mui/material/Tabs'
import { LinkTab } from '@/utils/LinkTab'
import { convertQueryToNumberOrSkip } from '@/utils'

const Totem: NextPage = () => {
  const router = useRouter()
  const { lectureId } = router.query

  // TODO add details to display totem page using this data
  const { data: lecture } = useGetLectureByIdQuery(convertQueryToNumberOrSkip(router, lectureId))

  const tabUrls = [`/display-totem/${lectureId}`, `/display-totem/${lectureId}/participants`]

  const handleTab = (_: React.SyntheticEvent, newValue: number) => {
    router.push(tabUrls[newValue])
  }

  return (
    <div className={style.login_body}>
      <Tabs value={0} onChange={handleTab}>
        <LinkTab label='TOTEM' href={tabUrls[0]} />
        <LinkTab label='PARTICIPANTS' href={tabUrls[1]} />
      </Tabs>

      {router.isReady && (
        <QRCode value={process.env.NEXT_PUBLIC_FRONTEND_URL + 'totem/' + lectureId} />
      )}
      <Link href={`/display-totem/${lectureId}/participants`}>PARTICIPANTES</Link>
    </div>
  )
}

export default Totem
