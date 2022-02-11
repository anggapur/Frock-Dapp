import React, { createRef, useEffect } from 'react';

import clsx from 'clsx';
import lottie from 'lottie-web';

import LogoBlackJson from '../../assets/animations/logo-black.json';
import LogoRedJson from '../../assets/animations/logo-red.json';
import LogoWhiteJson from '../../assets/animations/logo-white.json';
import styles from './loading.module.scss';

export default function Loading({ variant, text, size = 43 }) {
  const logoRef = createRef();

  useEffect(() => {
    let animationData = null;
    switch (variant) {
      case 'primary':
        animationData = LogoRedJson;
        break;

      case 'light':
        animationData = LogoWhiteJson;
        break;

      default:
        animationData = LogoBlackJson;
    }

    const logoAnim = lottie.loadAnimation({
      container: logoRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => logoAnim.destroy();
  }, []);

  return (
    <div className={clsx(styles.wrapper, styles[variant])} role="status">
      <div ref={logoRef} style={{ height: `${size}px` }} />
      {text && <p>{text}</p>}
    </div>
  );
}
