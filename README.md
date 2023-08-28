# `@superside-oss/partytown-gtm`

This is a Google Tag Manager (`GTM`) integration for [Partytown 🎉](https://partytown.builder.io/), a performance-focused library that offloads third-party scripts to a web worker.

## Motivation

Our goal was to leverage [Partytown 🎉](https://partytown.builder.io/) to unblock the main thread on [superside.com](https://www.superside.com), while maintaining the ability to debug `GTM` using `Tag Assistant`. Some suggest disabling `Partytown` when a specific query string parameter is detected. This can create a false sense of functionality and may lead to issues for actual users.

By integrating `Partytown` with `GTM Tag Assistant`, we successfully identified and resolved [several issues in the Partytown source code](https://github.com/BuilderIO/partytown/pulls?q=is%3Apr+author%3Aslawekkolodziej+is%3Aclosed).

## Installation

Install this package using your package manager of choice:

npm:
```sh
npm install --save @superside-oss/partytown-gtm
```

yarn:
```sh
yarn add @superside-oss/partytown-gtm
```

## Integrating with React Application

To integrate this module with a React application, import it alongside `Partytown`.

```javascript
import { Partytown } from '@builder.io/partytown/react';
import {
  GTMScript,
  GTM_TAG_ASSISTANT_ACCESSOR,
  GTM_TAG_ASSISTANT_FORWARDER,
  partytownResolveUrl
} from '@superside-oss/partytown-gtm';

function ThirdPartyScripts() {
  return (
    <>
      <Partytown
        forward={[
          'dataLayer.push',
          GTM_TAG_ASSISTANT_FORWARDER
        ]}
        mainWindowAccessors={[
          GTM_TAG_ASSISTANT_ACCESSOR
        ]}
        resolveUrl={partytownResolveUrl}
      />
      <GTMScript gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </>
  );
}

export default ThirdPartyScripts;
```

Steps:
1. Add `GTM_TAG_ASSISTANT_FORWARDER` to Partytown's `forward` array.
2. Add `GTM_TAG_ASSISTANT_ACCESSOR` to Partytown's `mainWindowAccessors`.
3. Set Partytown's `resolveUrl` to `partytownResolveUrl`.

    This resolver takes care of third-party JS scripts missing CORS headers. These files should be proxied through a server endpoint.

4. Add `<GTMScript />` after `<Partytown/>` and set your `gtmId`.

5. Implement a server-side proxy for assets lacking CORS headers. You can find a sample NextJS endpoint implementation in [integration/nextjs](/packages/integration/nextjs/src/app/api/third-party/route.ts).

If you've reached this point, congratulations, you're almost done! 🚀

The final step for `GTM` debugging is to install the [Tag Assistant Companion](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm) browser extension. Navigate to [https://tagassistant.google.com](https://tagassistant.google.com) and click the `Install extension` button in the top-right corner.

Take a look at the sample NextJS integration in [integration/nextjs](/packages/integration/nextjs).
