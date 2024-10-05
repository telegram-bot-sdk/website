import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function TallyEmbedScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Configure Tally
    window.TallyConfig = {
      "formId": "me7Avl",
      "popup": {
        "emoji": {
          "text": "👋",
          "animation": "wave"
        },
        "open": {
          "trigger": "scroll",
          "scrollPercent": 3
        },
        "autoClose": 0,
        "doNotShowAfterSubmit": true
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default function TallyFormEmbed() {
  return (
    <BrowserOnly>
      {() => <TallyEmbedScript />}
    </BrowserOnly>
  );
}
