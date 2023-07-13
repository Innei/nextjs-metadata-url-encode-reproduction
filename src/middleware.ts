import { NextRequest, NextResponse } from 'next/server'
import {
  REQUEST_PATHNAME,
  REQUEST_QUERY,
  REQUEST_GEO,
  REQUEST_IP,
  REQUEST_HOST,
} from './const'

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  let { geo } = req
  const { headers } = req
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set(REQUEST_PATHNAME, pathname)
  requestHeaders.set(REQUEST_QUERY, search)
  requestHeaders.set(REQUEST_GEO, geo?.country || 'unknown')

  requestHeaders.set(REQUEST_HOST, headers.get('host') || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
