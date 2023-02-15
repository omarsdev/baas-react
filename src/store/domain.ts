import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { URL_PROD, URL_QA } from '../config'

interface domainStorePropTypes {
  domain: string
  passAnalysis: boolean
  connectToProd: boolean
  urlConnection: string
  isSSR: boolean
}
interface initDomainPropsTypes {
  domain: string
  passAnalysis?: boolean
  connectToProd?: boolean
  isSSR?: boolean
}
interface newDomainStorePropTypes {
  domain: string
  passAnalysis?: boolean
  connectToProd?: boolean
  urlConnection?: string
  isSSR?: boolean
}

const domainStore = devtools(() => ({
  domain: '',
  passAnalysis: false,
  connectToProd: true,
  urlConnection: URL_PROD,
  isSSR: false,
}))

export const useDomainStore = create<domainStorePropTypes>()(domainStore)

export const initDomain = (props: initDomainPropsTypes) => {
  let newData: newDomainStorePropTypes = { ...props }

  if (props.connectToProd !== undefined) {
    newData = { ...newData, urlConnection: props.connectToProd ? URL_PROD : URL_QA }
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    newData = { ...newData, passAnalysis: true }
  }

  if (props.isSSR !== undefined && props.isSSR) {
    newData = { ...newData, passAnalysis: true }
  }

  useDomainStore.setState(newData)
}
