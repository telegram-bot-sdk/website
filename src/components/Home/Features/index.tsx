import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Features, { type FeatureItem } from '@site/src/data/features';
import Heading from '@theme/Heading';
import React from 'react';
import styles from './styles.module.css';

function Feature({
  feature
}: {
  feature: FeatureItem;
}) {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className='col col--4 text--center'>
      <img
        className={styles.featureImage}
        alt={feature.title}
        src={withBaseUrl(feature.image.src)}
        loading="lazy"
        width="200"
        height="200"
      />
      <Heading as="h3">
        {feature.title}
      </Heading>
      <p className="padding-horiz--md">{feature.text}</p>
    </div>
  );
}

export default function FeaturesContainer() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row margin-bottom--lg">
          {Features.map((feature, idx) => (
            <Feature feature={feature} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
