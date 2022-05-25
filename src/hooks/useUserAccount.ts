import User from '@/models/User'
import API_KEY from '@/utils/apiKey'
import { putRequest, userFetcher } from '@/utils/httpRequests'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import useSWR from 'swr'

export default function useUserAccount() {
  const { user } = useUser()
  const { data, mutate } = useSWR<User>(
    `${API_KEY.user}?id=${user?.id}`,
    userFetcher
  )

  const updateUser = async (body: User) => {
    mutate(body, false)

    await putRequest(API_KEY.user, JSON.stringify(body))
    mutate()
  }

  return {
    user: data,
    mutateUser: mutate,
    updateUser,
  }
}
