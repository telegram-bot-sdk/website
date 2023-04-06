import React, { Children } from 'react';
import Tabs from '@theme-original/Tabs';
import TabItem from '@theme/TabItem';
import clsx from 'clsx';
import LaravelLogo from '/img/laravel.svg';
import PHPLogo from '/img/php.svg';
import styles from './styles.module.css';

const languages = {
  php: { label: 'Standalone', logo: <PHPLogo className={clsx(styles.codeTabLogo, styles.logoPhp)} /> },
  laravel: { label: 'Laravel', logo: <LaravelLogo className={clsx(styles.codeTabLogo, styles.logoLaravel)} /> },
};

function Logo({ name }) {
  return (
    <div className={styles.codeTabLabel}>
      {languages[name].logo}
      <span>{languages[name].label}</span>
    </div>
  );
}

export default function CodeTabs(props) {
  const values = Object.keys(languages).map(name => ({
    label: <Logo name={name} />,
    value: name,
    attributes: { className: styles[name] },
  }));

  // const tabItemss = Object.keys(languages).map((name, index) => {
  //   return (
  //     <TabItem value={name}>
  //       {props.children[index]}
  //     </TabItem>
  //   );
  // });

  const tabItems = Children.map(props.children, (child, index) => {
    const language = Object.keys(languages)[index];

    return (
      <TabItem value={language}>
        {child}
      </TabItem>
    );
  });

  return (
    <Tabs
      groupId='language'
      defaultValue='php'
      queryString
      key='language'
      values={values}
      {...props}
    >
      {tabItems}
    </Tabs>
  );
}
