/**
 * Modified version from the official repo of docusaurus.
 *
 * Supports Changlog version with the .x format: 1.x -> 1.0.0
 *
 * Modified by @irazasyed.
 */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useVersions,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { getLatestVersionByMajor, getPackagistData } from '@site/src/utils/packagist';

const docsPluginId = undefined; // Default docs plugin instance

function DocumentationLabel() {
  return (
    <Translate id="versionsPage.versionEntry.link">📖 Documentation</Translate>
  );
}

function ReleaseNotesLabel() {
  return (
    <Translate id="versionsPage.versionEntry.releaseNotes">
      📝 Release Notes
    </Translate>
  );
}

export default function Version(): JSX.Element {
  const {
    siteConfig: { organizationName, projectName, customFields }
  } = useDocusaurusContext();
  const cacheKey = customFields.cacheKeys.packagistData;
  const vendor = customFields.owner;

  const [packagistVersions, setPackagistVersions] = useState({});

  useEffect(() => {
    getPackagistData(vendor, projectName, cacheKey).then(data => {
      setPackagistVersions(data['versions']);
    });
  }, [vendor, projectName, cacheKey]);



  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  const currentVersion = versions.find(
    (version) => version.name === 'current',
  )!;

  let pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  ).map((version) => {
    version.tag = getLatestVersionByMajor(version.name, packagistVersions);

    return version;
  });

  const stableVersionTag = getLatestVersionByMajor(latestVersion.name, packagistVersions);
  latestVersion.tag = stableVersionTag;

  const repoUrl = `https://github.com/${organizationName!}/${projectName!}`;

  return (
    <Layout
      title="Versions"
      description="Telegram Bot SDK Versions page listing all documented site versions">
      <main className="container margin-vert--lg">
        <Heading as="h1">
          <Translate id="versionsPage.title">
            🗄️ Telegram Bot SDK documentation versions
          </Translate>
        </Heading>

        <div className="margin-bottom--lg">
          <Heading as="h3" id="next">
            <Translate id="versionsPage.current.title">
              Current version (Stable)
            </Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.current.description">
              Here you can find the documentation for current released version.
            </Translate>
          </p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>
                    <DocumentationLabel />
                  </Link>
                </td>
                <td>
                  {(latestVersion.tag && <Link to={`${repoUrl}/releases/tag/${latestVersion.tag}`}>
                    <ReleaseNotesLabel />
                  </Link>) || 'To Be Released'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="latest">
              <Translate id="versionsPage.next.title">
                Next version (Unreleased)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.next.description">
                Here you can find the documentation for work-in-process
                unreleased version.
              </Translate>
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(pastVersions.length > 0) && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="archive">
              <Translate id="versionsPage.archived.title">
                Past versions (Not maintained anymore)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.archived.description">
                Here you can find documentation for previous versions of
                Telegram Bot SDK.
              </Translate>
            </p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>
                        <DocumentationLabel />
                      </Link>
                    </td>
                    <td>
                      <Link href={`${repoUrl}/releases/tag/${version.tag}`}>
                        <ReleaseNotesLabel />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}
