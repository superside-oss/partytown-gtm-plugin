'use client';
import { Partytown } from '@builder.io/partytown/react';
import {
  GTMScript,
  GTM_TAG_ASSISTANT_ACCESSOR,
  GTM_TAG_ASSISTANT_FORWARDER,
  partytownResolveUrl
} from '@superside-oss/partytown-gtm';

export function ThirdParty() {
  return (
    <>
      <Partytown
        debug={true}
        forward={['dataLayer.push', GTM_TAG_ASSISTANT_FORWARDER]}
        mainWindowAccessors={[GTM_TAG_ASSISTANT_ACCESSOR]}
        resolveUrl={partytownResolveUrl}
      />
      <GTMScript gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </>
  );
}
