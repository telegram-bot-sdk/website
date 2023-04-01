import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Tweets, { type TweetItem } from '@site/src/data/tweets';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export interface Props {
  url: string;
  handle: string;
  name: string;
  content: ReactNode;
  date: string;
  githubUsername: string;
}

function Tweet({
  url,
  handle,
  name,
  content,
  date,
  githubUsername,
}: Props): JSX.Element {
  return (
    <div className={clsx('card', styles.tweet)}>
      <div className="card__header">
        <div className="avatar">
          <img
            alt={name}
            className="avatar__photo"
            src={`https://unavatar.io/twitter/${handle}?fallback=https://github.com/${githubUsername}.png`}
            width="48"
            height="48"
            loading="lazy"
          />
          <div className={clsx('avatar__intro', styles.tweetMeta)}>
            <strong className="avatar__name">{name}</strong>
            <span>@{handle}</span>
          </div>
        </div>
      </div>

      <div className={clsx('card__body', styles.tweet)}>{content}</div>

      <div className="card__footer">
        <Link className={clsx(styles.tweetMeta, styles.tweetDate)} to={url}>
          {date}
        </Link>
      </div>
    </div>
  );
}

export default function TweetsContainer() {
  if (Tweets.length < 1) {
    return (
      <></>
    );
  }

  const tweetColumns: TweetItem[][] = [[], [], []];
  Tweets.filter((tweet) => tweet.showOnHomepage).forEach((tweet, i) =>
    tweetColumns[i % 3]!.push(tweet),
  );

  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={clsx('margin-bottom--lg', 'text--center')}>
          <Translate>Loved by many chatbot creators</Translate>
        </Heading>
        <div className={clsx('row', styles.tweetsSection)}>
          {tweetColumns.map((tweetItems, i) => (
            <div className="col col--4" key={i}>
              {tweetItems.map((tweet) => (
                <Tweet {...tweet} key={tweet.url} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
