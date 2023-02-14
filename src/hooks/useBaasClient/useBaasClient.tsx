import { useState, useEffect } from 'react'
import axios from 'axios'

import { useDomainStore } from '../../store/domain'

import { useBaasClientPropTypes } from './useBaasClientPropTypes'

const useBaasClient = (props: useBaasClientPropTypes) => {
  const { route, pageNumber = 1 } = props
  const { domain, passAnalysis, urlConnection } = useDomainStore()

  if (!domain) throw new Error(`Domain need to be set first, Please setup your domain first by using initDomain()`)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `${urlConnection}/page?route=${route}&domain=${domain}&pass=${passAnalysis}&page=${pageNumber}&referrer=${document.referrer}`,
        )
        .then((response) => {
          setData(response.data)
        })
        .catch((err) => {
          setError(err.response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchData()
  }, [route, pageNumber, urlConnection, passAnalysis, domain])

  return { data, loading, error }
}

export default useBaasClient
