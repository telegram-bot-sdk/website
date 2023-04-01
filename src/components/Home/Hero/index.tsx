import React from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HeroContainer() {
  const { siteConfig } = useDocusaurusContext();
  const GITHUB_REPO = siteConfig.customFields.GITHUB_PATHS.FORMER_REPO;

  return (
    <>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container z-1">
          <img
            alt={siteConfig.title}
            src={useBaseUrl('/img/hero-logo.png')}
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            {siteConfig.tagline}
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              <Translate>Get Started</Translate>
            </Link>
            <Link
              className={styles.githubStars}
              href={`https://github.com/${GITHUB_REPO}`}>
              <img
                alt={translate({ message: 'GitHub Stars' })}
                src={`https://img.shields.io/github/stars/${GITHUB_REPO}?style=social`}
              />
            </Link>
          </div>
        </div>
      </header>
      <span className={styles.heroBg}></span>
    </>
  );
}
