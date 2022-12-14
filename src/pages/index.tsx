import type { NextPage } from 'next'
import AppLayout from '@/layout/AppLayout'
import jwt from "jsonwebtoken"

const Home: NextPage = () => {
  const METABASE_SITE_URL = "https://metabase.gajigo.tk";
  const METABASE_SECRET_KEY = "a16e042710b6bb076496975e7630a7da98d23576758c8263c32c5b195b03768b";

  const payload = {
      resource: { dashboard: 1 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#theme=transparent&bordered=true&titled=true";

  return (
    <AppLayout title='Pagina Home'>
      <div>
        <iframe
          src={iframeUrl}
          frameBorder="0"
          width="100%"
          height="800"
        ></iframe>
      </div>
    </AppLayout>
  )
}

export default Home
