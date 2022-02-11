import React, { createRef, useEffect } from 'react';

import lottie from 'lottie-web';

import fireworkJson from '../../assets/animations/firework.json';
import { useFirework } from '../../hooks/useFirework';
import styles from './firework-animation.module.scss';

export default function FireworkAnimation() {
  const { active, setActive } = useFirework();
  const fireworkRef = createRef();

  useEffect(() => {
    const fireworkAnim = lottie.loadAnimation({
      name: 'firework',
      container: fireworkRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: fireworkJson,
    });

    fireworkAnim.onComplete = function () {
      setActive(false);
    };

    return () => lottie.destroy('firework');
  }, []);

  useEffect(() => {
    if (active) {
      lottie.play('firework');
    } else {
      lottie.stop('firework');
    }
  }, [active]);

  return (
    <div
      className={styles.wrapper}
      style={{ display: active ? 'block' : 'none' }}
      onClick={() => setActive(false)}
    >
      <div ref={fireworkRef} />
    </div>
  );
}
