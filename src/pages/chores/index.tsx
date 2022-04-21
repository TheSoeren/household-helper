import ChoreList from '@/components/Lists/ChoreList'
import ChoresPageSkeleton from '@/components/Skeletons/ChoresPageSkeleton'
import useChores from '@/hooks/useChores'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export default function Chores() {
  const { chores } = useChores([])
  const { t } = useTranslation('chores-page')

  if (!chores) {
    return <ChoresPageSkeleton />
  }

  return <ChoreList title={t('all-chores')} chores={chores} create />
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    const translations = locale
      ? await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'chores-page',
        ])
      : {}

    return {
      props: translations,
    }
  },
})
