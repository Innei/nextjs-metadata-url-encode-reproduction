import type { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'
import { headers } from 'next/dist/client/components/headers'
import { REQUEST_HOST } from '@/const'

const getHost = () => {
  const header = headers()
  const host = header.get(REQUEST_HOST)

  return host
}
const isDev = process.env.NODE_ENV === 'development'

export const getOgUrl = (title: string, subtitle: string) => {
  const ogUrl = new URL(`${isDev ? 'http' : 'https'}://${getHost()}/api/og`)
  ogUrl.searchParams.set('title', title)
  ogUrl.searchParams.set('subtitle', subtitle)
  return ogUrl
}

const fontNormal = fetch(
  new URL('./MYuppy-Bold-DDC.ttf', import.meta.url),
).then((res) => res.arrayBuffer())
export const runtime = 'edge'

export const revalidate = 60 * 60 * 24 // 24 hours
export const GET = async (req: NextRequest) => {
  try {
    const fontData = await fontNormal

    const { searchParams } = req.nextUrl

    const titlePost = searchParams.get('title')
    const subtitlePost = searchParams.get('subtitle')

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',

            background:
              'linear-gradient(37deg, #66BDB3 47.82%, #C0E3DD 79.68%, #F2F9F5 100%)',

            fontFamily: 'Xiaolai',

            padding: '5rem',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flexDirection: 'column',
              textAlign: 'right',
            }}
          >
            <h1
              style={{
                color: 'rgba(255, 255, 255, 0.92)',

                fontSize: '4.2rem',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 1,
                lineClamp: 1,
              }}
            >
              {titlePost?.slice(0, 20)}
            </h1>
            <h2
              style={{
                color: 'rgba(230, 230, 230, 0.85)',
                fontSize: '3rem',
              }}
            >
              {subtitlePost}
            </h2>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: 'Xiaolai',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    )
  } catch (e: any) {
    return new Response(`Failed to generate the OG image. Error ${e.message}`, {
      status: 500,
    })
  }
}
