import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';

export default function DocsHeroImg() {
  const { siteConfig: { title } } = useDocusaurusContext();
  const { colorMode, setColorMode } = useColorMode();
  const imgSrc = colorMode === 'light' ? '/img/hero-banner.png' : '/img/hero-banner-dark.png';

  return (
    <img alt={title}
      src={imgSrc} />
  );
}
