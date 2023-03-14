import axios from 'axios'

import { useDomainStore } from '../../store/domain'

interface sendFormPropsTypes {
  body: object
  key?: string
}

export const sendForm = async (props: sendFormPropsTypes) => {
  const { body, key } = props

  const urlConnection = useDomainStore.getState().urlConnection
  const domain = useDomainStore.getState().domain

  const result = { data: null, error: null }
  const keyQuery = key ? `&key=${key}` : ''

  if (!domain) {
    throw new Error(`Domain need to be set first, Please setup your domain first by using initDomain()`)
  }

  await axios
    .post(`${urlConnection}/contact-us?domainName=${domain}${keyQuery}`, body)
    .then((response) => {
      result.data = response.data.contactMessage
    })
    .catch((err) => {
      result.error = err.response.data
    })

  return result
}
