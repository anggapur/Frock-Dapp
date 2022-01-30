import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import SuspenseLoading from './components/suspense-loading/suspense-loading'

const Home = lazy(() => import('./screens/home/home'))
const PublicSale = lazy(() => import('./screens/sale/public/public-sale'))
const CommunitySale = lazy(() =>
  import('./screens/sale/community/community-sale')
)

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="public-sale" element={<PublicSale />} />
          <Route path="community-sale" element={<CommunitySale />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
