import React from 'react';
import { Toaster } from 'react-hot-toast';

import FireworkAnimation from '../firework-animation/firework-animation';
import Header from '../header/header';

export default function Layout({ children }) {
  const styles = {
    paddingTop: '40px',
    paddingBottom: '40px',
  };

  return (
    <>
      <Toaster />
      <FireworkAnimation />
      <Header />
      <main style={styles}>{children}</main>
    </>
  );
}
