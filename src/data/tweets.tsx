/* eslint-disable @docusaurus/no-untranslated-text */

import React from 'react';

import type { Props as Tweet } from '../components/Tweet';

export type TweetItem = Tweet & {
  showOnHomepage: boolean;
};

const TWEETS: TweetItem[] = [
  // {
  //   url: 'https://twitter.com/johndoe/status/123456',
  //   handle: 'johndoe',
  //   name: 'John Doe',
  //   date: 'Mar 24, 2023',
  //   content: (
  //     <>
  //       Fantastic SDK
  //     </>
  //   ),
  //   showOnHomepage: true,
  //   githubUsername: 'johndoe',
  // },
];

export default TWEETS;
