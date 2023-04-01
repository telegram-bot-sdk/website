import Translate from '@docusaurus/Translate';
import statList from '@site/src/data/stats';
import React from 'react';
import styles from './styles.module.css';

function Stat({ name, stat }) {
  return (
    <div className={styles.stat}>
      <p className={styles.statNumber}>{stat}</p>
      <span className={styles.statName}>{name}</span>
    </div>
  );
}

export default function StatsContainer() {
  const StatList = statList();

  return (
    <div className={styles.statContainer}>
      <section className={styles.statSection}>
        <div className={styles.statStack}>
          {StatList.map((props, idx) => (
            <Stat key={idx} {...props} />
          ))}
        </div>
      </section>
    </div>
  )
}
