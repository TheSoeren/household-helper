import AuthLayout from '@/layouts/Auth'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export default function Custom404() {
  const { t } = useTranslation('404')

  return (
    <div className="relative mx-16 sm:mx-40 md:mx-72">
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-slate-50 mb-2">{t('title')}</h1>
        <p className="text-xl text-slate-300 mb-5">{t('subtitle')}</p>
        <p className="text-xl text-slate-300 mb-8">{t('go-back')}</p>
        <div className="w-full flex">
          <Link href="/">
            <a className="mx-auto text-9xl text-slate-200">
              <i className="fa-brands fa-first-order"></i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

Custom404.layout = AuthLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = locale
    ? await serverSideTranslations(locale, ['404'])
    : {}

  return {
    props: translations,
  }
}
