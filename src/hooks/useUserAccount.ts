import User from '@/models/User'
import { getRequest } from '@/utils/httpRequests'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import useSWR from 'swr'

export default function useUserAccount() {
  const { user } = useUser()
  const { data } = useSWR<User>(`/api/user?id=${user?.id}`, getRequest)

  return {
    user: data,
  }
}
