import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function Brand() {
  const { t } = useTranslation('dashboard-layout')

  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <a
          href="#pablo"
          className="text-left my-2 text-slate-600 whitespace-nowrap text-md uppercase font-bold"
        >
          {t('brand')}
        </a>
      </Link>
    </div>
  )
}
