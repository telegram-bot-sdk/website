import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ExternalMarkdownPage({ url }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(text => setMarkdown(text));
  }, [url]);

  return (
    <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
  );
}

export default ExternalMarkdownPage;
