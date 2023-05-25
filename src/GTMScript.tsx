import React from 'react';
import { tagAssistantMain, tagAssistantWorker } from './tagAssistant';

/**
 * The name of the global function declared inside the worker and accessible from
 * the main thread. This should be added to the `forward` array in Partytown.
 */
export const GTM_TAG_ASSISTANT_TUNNEL = '__TAG_ASSISTANT_API_TUNNEL';

/**
 * The name of the global object declared inside the main thread and accessible from
 * the worker. This function should be added to the `mainWindowAccessors` array
 * in Partytown.
 */
export const GTM_TAG_ASSISTANT_FORWARDER = '__TAG_ASSISTANT_FORWARDER';

interface GTMScriptProps {
  gtmId: string;
}

export const GTMScript: React.FC<GTMScriptProps> = (props) => {
  return (
    <>
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `(${tagAssistantMain.toString()})('${GTM_TAG_ASSISTANT_FORWARDER}', '${GTM_TAG_ASSISTANT_TUNNEL}')`
        }}
      />
      <script
        type='text/partytown'
        dangerouslySetInnerHTML={{
          __html: `
            (${tagAssistantWorker.toString()})('${GTM_TAG_ASSISTANT_FORWARDER}', '${GTM_TAG_ASSISTANT_TUNNEL}');

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${props.gtmId}');
          `
        }}
      />
    </>
  );
};
