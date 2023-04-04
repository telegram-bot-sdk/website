import Tabs from '@theme-original/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';
import clsx from 'clsx';
import LaravelLogo from '/img/laravel.svg';
import PHPLogo from '/img/php.svg';
import styles from './styles.module.css';

const logos = {
  php: { label: 'Standalone', logo: <PHPLogo className={clsx(styles.codeTabLogo, styles.logoPhp)} /> },
  laravel: { label: 'Laravel', logo: <LaravelLogo className={clsx(styles.codeTabLogo, styles.logoLaravel)} /> },
};

function Logo({ name }) {
  return (
    <div className={styles.codeTabLabel}>
      {logos[name].logo}
      <span>{logos[name].label}</span>
    </div>
  );
}

export function CodeTabs(props) {
  const values = Object.keys(logos).map(name => ({
    label: <Logo name={name} />,
    value: name,
    attributes: { className: styles[name] },
  }));

  return (
    <Tabs groupId="language" defaultValue="php" queryString values={values} {...props} />
  );
}

export function TabPHP({ children }) {
  return (
    <TabItem value="php">
      {children}
    </TabItem>
  );
}

export function TabLaravel({ children }) {
  return (
    <TabItem value="laravel">
      {children}
    </TabItem>
  );
}
