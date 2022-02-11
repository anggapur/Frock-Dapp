import React from 'react';
import { Toaster } from 'react-hot-toast';

import Header from '../header/header';

export default function Layout({ children }) {
  const styles = {
    paddingTop: '40px',
    paddingBottom: '80px',
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            textAlign: 'center',
          },
        }}
      />
      <Header />
      <main style={styles}>{children}</main>
    </>
  );
}
