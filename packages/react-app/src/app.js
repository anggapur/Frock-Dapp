import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/layout';
import SuspenseLoading from './components/suspense-loading/suspense-loading';

const Calculator = lazy(() => import('./screens/calculator/calculator'));
const PublicSale = lazy(() => import('./screens/sale/public/public-sale'));
const CommunitySale = lazy(() =>
  import('./screens/sale/community/community-sale'),
);
const Dashboard = lazy(() => import('./screens/dashboard/dashboard'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="public-sale" element={<PublicSale />} />
          <Route path="community-sale" element={<CommunitySale />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
