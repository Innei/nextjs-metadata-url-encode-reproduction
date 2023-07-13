Next.js metadata url will encodeURLComponent unexpectedly.


```ts

export const generateMetadata = async (): Promise<Metadata> => {
  const ogUrl = new URL('http://localhost:3000/og.png')

  ogUrl.searchParams.set('title', 'Nextjs')
  ogUrl.searchParams.set('description', 'description - Nextjs')

  return {
    title: 'Nextjs',
    openGraph: {
      images: ogUrl,
    },
  }
}
```

and generate the code of `<meta>` tag.


```
<meta property="og:image" content="http://localhost:3000/og.png?title=Nextjs&amp;description=description+-+Nextjs"/>
```

The `&` will encode to `&amp;` unexpected.