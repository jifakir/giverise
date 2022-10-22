import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from '../contexts/AuthProvider';
import { store } from '../store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <AuthProvider>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Giverise 2.0</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
