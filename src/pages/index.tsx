import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  FeaturesContainer,
  HeroContainer,
  StatsContainer,
  TweetsContainer
} from '@site/src/components/Home';
import Layout from '@theme/Layout';
import React from 'react';
import TallyFormEmbed from '@site/src/components/TallyFormEmbed';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.tagline}
      description={siteConfig.tagline}>
      <HeroContainer />
      <main>
        <TallyFormEmbed />
        <StatsContainer />
        <FeaturesContainer />
        <TweetsContainer />
      </main>
    </Layout>
  );
}
