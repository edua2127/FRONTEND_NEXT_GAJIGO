import { LinkTab } from '@/utils/LinkTab'
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs'

type DisplayTotemTabProps = {
  lectureId: string | string[] | undefined
  defaultTab: number
}

export function DisplayTotemTab({ lectureId, defaultTab }: DisplayTotemTabProps) {
  const router = useRouter()
  const tabUrls = [`/display-totem/${lectureId}`, `/display-totem/${lectureId}/participants`]

  const handleTab = (_: React.SyntheticEvent, newValue: number) => {
    router.push(tabUrls[newValue])
  }

  return (
    <Tabs
      value={defaultTab}
      onChange={handleTab}
      variant='fullWidth'
      style={{ width: '100%', justifySelf: 'flex-start' }}
      centered
    >
      <LinkTab label='TOTEM' href={tabUrls[0]} />
      <LinkTab label='PARTICIPANTES' href={tabUrls[1]} />
    </Tabs>
  )
}
