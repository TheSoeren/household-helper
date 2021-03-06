import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'

import '@/setups/dayjs'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

import 'react-datepicker/dist/react-datepicker.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/styles/tailwind.css'
import '@/styles/globals.css'
import Dashboard, { DashboardProps } from '@/layouts/Dashboard'
import { SWRConfig } from 'swr'
import { getRequest } from '@/utils/httpRequests'

// to prevent "atob is undefined" error
// https://github.com/jeremyBanks/b64-to-blob/issues/4#issuecomment-537616542
global.atob = require('atob')

type CustomAppProps = AppProps & {
  Component: {
    layout?: (props: any) => JSX.Element
  }
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const Layout =
    Component.layout ||
    (({ children }: DashboardProps) => <Dashboard>{children}</Dashboard>) ||
    null

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Toaster position="bottom-left" />
      <SWRConfig value={{ fetcher: getRequest }}>
        <UserProvider supabaseClient={supabaseClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </SWRConfig>
    </>
  )
}

export default appWithTranslation(MyApp)

export async function getInitialProps({ Component, router, ctx }: any) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
