import React from 'react';
import tagAssistantMain from './snippets/tagAssistantMain';
import tagAssistantWorker from './snippets/tagAssistantWorker';
// @ts-ignore
import gtmSnippet from './snippets/gtmSnippet';

/**
 * The name of the global function declared inside the worker and accessible from
 * the main thread. This should be added to the `forward` array in Partytown.
 */
export const GTM_TAG_ASSISTANT_ACCESSOR = '__TAG_ASSISTANT_ACCESSOR';

/**
 * The name of the global object declared inside the main thread and accessible from
 * the worker. This function should be added to the `mainWindowAccessors` array
 * in Partytown.
 */
export const GTM_TAG_ASSISTANT_FORWARDER = '__TAG_ASSISTANT_FORWARDER';

interface GTMScriptProps {
  gtmId: string;
  skipPartytown?: boolean;
}

export const GTMScript: React.FC<GTMScriptProps> = (props) => {
  if (props.skipPartytown === true) {
    return (
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `(${gtmSnippet})('${props.gtmId}')`
        }}
      />
    );
  }

  return (
    <>
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `(${tagAssistantMain})('${GTM_TAG_ASSISTANT_FORWARDER}', '${GTM_TAG_ASSISTANT_ACCESSOR}')`
        }}
      />
      <script
        type='text/partytown'
        dangerouslySetInnerHTML={{
          __html: `(${tagAssistantWorker})('${GTM_TAG_ASSISTANT_FORWARDER}', '${GTM_TAG_ASSISTANT_ACCESSOR}');(${gtmSnippet})('${props.gtmId}')`
        }}
      />
    </>
  );
};
