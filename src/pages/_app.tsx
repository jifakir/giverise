import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from '../contexts/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Giverise 2.0</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
