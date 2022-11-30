import * as React from 'react'
import { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/utils/createEmotionCache'
import lightThemeOptions from '@/styles/theme/lightTheme'
import '@/styles/globals.css'

import { Provider } from 'react-redux'
import store from '@/store'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const defaultTheme = createTheme(lightThemeOptions)

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
