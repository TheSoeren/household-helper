import i18next from 'i18next'
import { toast } from 'react-hot-toast'

function t(key: string) {
  return i18next.t(`http-requests: ${key}`)
}

export function getRequest(url: string) {
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
  }).then((res) => {
    if (!res.ok) {
      toast.error(t('create-error'))
      throw new Error(`${res.status}: ${res.statusText}`)
    }

    if (showSuccess) toast.success(t('create-success'))
    return res.json()
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
  }).then((res) => {
    if (!res.ok) {
      toast.error(t('update-error'))
      throw new Error(`${res.status}: ${res.statusText}`)
    }

    if (showSuccess) toast.success(t('update-success'))
    return res.json()
  })
}

export function deleteRequest(url: string, showSuccess: boolean = true) {
  return fetch(url, { method: 'DELETE' }).then((res) => {
    if (!res.ok) {
      toast.error(t('delete-error'))
      throw new Error(`${res.status}: ${res.statusText}`)
    }

    if (showSuccess) toast.success(t('delete-success'))
    return res.json()
  })
}
