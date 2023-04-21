import Translate, { translate } from '@docusaurus/Translate';
import {
  useVersions,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { nFormatter } from '@site/src/utils/helpers';
import { getLatestVersionByMajor, getPackagistData } from '@site/src/utils/packagist';
import React, { useEffect, useState } from 'react';

const docsPluginId = undefined; // Default docs plugin instance

export default function statList() {
  const {
    siteConfig: { projectName, customFields }
  } = useDocusaurusContext();

  const versions = useVersions(docsPluginId);
  const latestVersion = versions[1];

  const cacheKey = customFields.cacheKeys.packagistData;
  const vendor = customFields.owner;

  const [installs, setInstalls] = useState('1.8M');
  const [stargazers, setStargazers] = useState('2.6K');
  const [latestStableVersion, setLatestStableVersion] = useState('3.10');

  useEffect(() => {
    getPackagistData(vendor, projectName, cacheKey).then(data => {
      setInstalls(nFormatter(data.downloads.total));
      setStargazers(nFormatter(data.github_stars));

      let latestStableVer = getLatestVersionByMajor(latestVersion.name, data.versions)
        .replace('v', '')
        .replace(/^(\d+\.\d+)\.0$/, '$1');
      setLatestStableVersion(String(latestStableVer));
    });
  }, [latestVersion]);

  return [
    {
      name: <Translate>Since</Translate>,
      stat: '2015',
    },
    {
      name: <Translate>Installs</Translate>,
      stat: installs,
    },
    {
      name: <Translate>Stargazers</Translate>,
      stat: stargazers,
    },
    {
      name: <Translate>Latest Version</Translate>,
      stat: latestStableVersion,
    },
  ];
}
