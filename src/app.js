import { lazy, Suspense } from 'react'
import Layout from './components/layout/layout'
import SuspenseLoading from './components/suspense-loading/suspense-loading'

const Home = lazy(() => import('./screens/home/home'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseLoading />}>
        <Home />
      </Suspense>
    </Layout>
  )
}
