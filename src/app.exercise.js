/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as auth from 'auth-provider'
import { FullPageSpinner } from 'components/lib'
import * as React from 'react'
import { useAsync } from 'utils/hooks'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { client } from './utils/api-client'


async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', { token })
    user = data.user
  }

  return user
}

function App() {
  // const [user, setUser] = React.useState(null)
  const { data: user, error, isIdle, isLoading, isSuccess, isError, run, setData: setUser } = useAsync()

  React.useEffect(() => {
    getUser().then(u => setUser(u))
  }, [])

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  console.log(isLoading);
  if (isLoading || isIdle) return <FullPageSpinner />

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export { App }

