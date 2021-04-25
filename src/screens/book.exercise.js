/** @jsx jsx */
import { jsx } from '@emotion/core'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import * as React from 'react'
import { useParams } from 'react-router'
import * as mq from 'styles/media-queries'
// we need to get the "bookId" param from the router
// 🐨 import the useParams hook from 'react-router-dom'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/hooks'


const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function BookScreen({ user }) {
  // 🐨 use the useParams hook. This'll give you back an object with all the
  // params you've specified in the route definition. You should be able to get
  // the bookId from that.
  const { bookId } = useParams()

  // 💣 remove this, we're getting the bookId from useParams instead.
  const { data, run } = useAsync()

  React.useEffect(() => {
    run(client(`books/${bookId}`, { token: user.token }))
  }, [run, bookId, user.token])

  const { title, author, coverImageUrl, publisher, synopsis } =
    data?.book ?? loadingBook

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: '100%', maxWidth: '14rem' }}
        />
        <div>
          <div css={{ display: 'flex', position: 'relative' }}>
            <div css={{ flex: 1, justifyContent: 'space-between' }}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  )
}

export { BookScreen }

