import User from '@/models/User'
import API_KEY from '@/utils/apiKey'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import useSWR from 'swr'

export default function useUserAccount() {
  const { user } = useUser()
  const { data, mutate } = useSWR<User>(`${API_KEY.user}?id=${user?.id}`)

  return {
    user: data,
    mutateUser: mutate,
  }
}
