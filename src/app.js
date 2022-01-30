import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import SuspenseLoading from './components/suspense-loading/suspense-loading'

const Home = lazy(() => import('./screens/home/home'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
