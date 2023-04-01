/**
 * Modified version of the team profile cards based on docusaurus source code.
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

function WebsiteLink({ to, children }: { to: string; children?: ReactNode }) {
  return (
    <Link to={to}>
      {children ?? (
        <Translate id="team.profile.websiteLinkLabel">website</Translate>
      )}
    </Link>
  );
}

type ProfileProps = {
  className?: string;
  name: string;
  children: ReactNode;
  githubUrl: string;
  twitterUrl?: string;
};

function TeamProfileCard({
  className,
  name,
  children,
  githubUrl,
  twitterUrl,
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="card card--full-height">
        <div className="card__header">
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={`${githubUrl}.png`}
              alt={`${name}'s avatar`}
            />
            <div className="avatar__intro">
              <Heading as="h3" className="avatar__name">
                {name}
              </Heading>
            </div>
          </div>
        </div>
        <div className="card__body">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {githubUrl && (
              <Link className="button button--secondary" href={githubUrl}>
                GitHub
              </Link>
            )}
            {twitterUrl && (
              <Link className="button button--secondary" href={twitterUrl}>
                Twitter
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamProfileCardCol(props: ProfileProps) {
  return (
    <TeamProfileCard {...props} className="col col--6 margin-bottom--lg" />
  );
}

export function ActiveTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="Irfaq Syed"
        githubUrl="https://github.com/irazasyed"
        twitterUrl="https://twitter.com/irazasyed">
        <Translate id="team.profile.irazasyed.body">
          Telegram Bot SDK creator, internet entrepreneur, passionate programmer, open-source enthusiast, AI and Web3 aficionado.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Jonathan Williamson"
        githubUrl="https://github.com/jonnywilliamson"
        twitterUrl="https://twitter.com/jonnywilliamson">
        <Translate id="team.profile.jonnywilliamson.body">
          Pilot with a coding passion exploring open-source. Innovating through tech while flying or at desk.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Alies Lapatsin"
        githubUrl="https://github.com/lptn"
        twitterUrl="https://twitter.com/alies_lptn">
        <Translate id="team.profile.lptn.body">
          Programming (mostly 🐘 PHP), making the World a Better Place. Clean coder ✨ (and code cleaner).
        </Translate>
      </TeamProfileCardCol>
    </div>
  );
}

export function ModTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="Roman"
        githubUrl="https://github.com/KielD-01"
        twitterUrl="https://twitter.com/DarkDeveloper95">
        <Translate id="team.profile.KielD-01.body">
          27 y.o.; Senior Laravel Developer; Playing guitar/drums.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Nikita Lidman"
        githubUrl="https://github.com/usmykyta"
        twitterUrl="https://twitter.com/usmykyta">
        <Translate id="team.profile.usmykyta.body">
          PHP Developer.
        </Translate>
      </TeamProfileCardCol>
    </div>
  );
}
