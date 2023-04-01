import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  FeaturesContainer,
  HeroContainer,
  StatsContainer,
  TweetsContainer
} from '@site/src/components/Home';
import Layout from '@theme/Layout';
import React from 'react';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HeroContainer />
      <main>
        <StatsContainer />
        <FeaturesContainer />
        <TweetsContainer />
      </main>
    </Layout>
  );
}
