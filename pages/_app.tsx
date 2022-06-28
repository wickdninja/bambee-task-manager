import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Head } from 'next/document'
import Layout from '../components/Layout'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </LocalizationProvider>
  )
}

export default App
