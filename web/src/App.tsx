import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'
import { Guard } from '@authing/react-ui-components'

import '@authing/react-ui-components/lib/index.min.css'

import LogRocket from 'logrocket'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import userStore from './stores/user.store'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'

Sentry.init({
  dsn: 'https://1eac5e122e794c03b5033109d142c28b@o540966.ingest.sentry.io/6418210',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

LogRocket.init('mini-habits/mini-habits')

const authAppId = '628851c00d24fdb6d36c648b'

const App = () => {
  const onLogin = (userInfo) => {
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo))

    action(() => {
      userStore.userInfo = userInfo
    })

    LogRocket.identify(userInfo.id, {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
    })
  }

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      {userStore.isLogin ? (
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </RedwoodProvider>
      ) : (
        <Guard appId={authAppId} onLogin={onLogin} />
      )}
    </FatalErrorBoundary>
  )
}

export default observer(App)
