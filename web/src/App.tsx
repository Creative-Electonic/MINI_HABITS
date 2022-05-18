import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

import LogRocket from 'logrocket'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://1eac5e122e794c03b5033109d142c28b@o540966.ingest.sentry.io/6418210',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

LogRocket.init('mini-habits/mini-habits')

LogRocket.identify('1', {
  name: 'Peter',
  email: 'jamesmorrison@example.com',
})

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
