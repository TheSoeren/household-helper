import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'

import PageChange from '@/components/PageChange/PageChange'
import { appWithTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'

import '@/setups/dayjs'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/styles/globals.css'
import '@/styles/tailwind.css'
import Dashboard, { DashboardProps } from '@/layouts/Dashboard'

type CustomAppProps = AppProps & {
  Component: {
    layout?: (props: any) => JSX.Element
  }
}

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  document.body.classList.add('body-page-transition')
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  )
})
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLElement
  )
  document.body.classList.remove('body-page-transition')
})
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLElement
  )
  document.body.classList.remove('body-page-transition')
})

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
      <UserProvider supabaseClient={supabaseClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  )
}

export async function getInitialProps({ Component, router, ctx }: any) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default appWithTranslation(MyApp)
