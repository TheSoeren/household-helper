import i18next from 'i18next'
import { toast } from 'react-hot-toast'
import {
  dbChoresToChores,
  dbEventsToEvents,
  DBUser,
  dbUserToUser,
} from '@/utils/dataConverter'

function t(key: string) {
  return i18next.t(`common: ${key}`)
}

export function getRequest<T = any>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`)
    }

    return res.json()
  })
}

export function postRequest(
  url: string,
  body: string,
  showSuccess: boolean = true
) {
  return fetch(url, {
    method: 'POST',
    body,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`)
      }

      if (showSuccess) toast.success(t('create-success'))
      return res.json()
    })
    .catch((e: Error) => {
      toast.error(e.message)
    })
}

export function putRequest(
  url: string,
  body: string,
  showSuccess: boolean = true
) {
  return fetch(url, {
    method: 'PUT',
    body,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`)
      }

      if (showSuccess) toast.success(t('update-success'))
      return res.json()
    })
    .catch((e: Error) => {
      toast.error(e.message)
    })
}

export function deleteRequest(url: string, showSuccess: boolean = true) {
  return fetch(url, { method: 'DELETE' })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`)
      }

      if (showSuccess) toast.success(t('delete-success'))
      return res.json()
    })
    .catch((e: Error) => {
      toast.error(e.message)
    })
}

export function choreFetcher(url: string) {
  return getRequest(url).then((response) =>
    dbChoresToChores(JSON.parse(response))
  )
}

export function eventFetcher(url: string) {
  return getRequest(url).then((response) =>
    dbEventsToEvents(JSON.parse(response))
  )
}

export function userFetcher(url: string) {
  return getRequest<DBUser>(url).then((response) => dbUserToUser(response))
}
