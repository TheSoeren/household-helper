import ChoreList from '@/components/Lists/ChoreList'
import ChoresPageSkeleton from '@/components/Skeletons/ChoresPageSkeleton'
import useChores from '@/hooks/useChores'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'

export default function Chores() {
  const { chores } = useChores()
  const { t } = useTranslation('chores-page')

  return (
    <div className="px-4 md:px-10">
      {!chores ? (
        <ChoresPageSkeleton />
      ) : (
        <ChoreList title={t('all-chores')} chores={chores} create />
      )}
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    if (!locale) return { props: {} }

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'chores-page',
        ])),
      },
    }
  },
})
