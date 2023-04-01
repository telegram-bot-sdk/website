import React from 'react';
import Tabs from '@theme-original/Tabs';

export default function CodeTabs(props) {
  return (
    <>
        <Tabs
            groupId="platform"
            defaultValue="standalone"
            values={[
                {label: 'Standalone', value: 'standalone'},
                {label: 'Laravel', value: 'laravel'},
            ]}
            {...props}
        />
    </>
  );
}
