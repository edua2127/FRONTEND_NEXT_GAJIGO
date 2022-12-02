import Tab from '@mui/material/Tab'

export interface LinkTabProps {
  label?: string
  href?: string
}

export const LinkTab = (props: LinkTabProps) => (
  <Tab
    component='a'
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event?.preventDefault()
    }}
    {...props}
  />
)
